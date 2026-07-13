#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const minutesRoot = path.join(repoRoot, 'minutes');

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseServiceAccount() {
  const raw = process.env.GCP_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('Missing GCP_SERVICE_ACCOUNT_KEY secret');
  }

  const text = raw.trim().startsWith('{')
    ? raw
    : Buffer.from(raw, 'base64').toString('utf8');

  return JSON.parse(text);
}

function toKstDate(dateLike) {
  const utc = new Date(dateLike).getTime();
  return new Date(utc + KST_OFFSET_MS);
}

function ymd(dateLike) {
  const d = toKstDate(dateLike);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function kstNowLabel() {
  const d = toKstDate(new Date());
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} ${hh}:${mm} KST`;
}

function detectStage(name) {
  if (/(정리본|최종|final)/i.test(name)) {
    return 'final';
  }
  if (/(초안|draft)/i.test(name)) {
    return 'draft';
  }
  return 'unknown';
}

function stripStageSuffix(name) {
  return name
    .replace(/\.(gdoc|docx?|txt|md)$/i, '')
    .replace(/[\s\-_:()\[\]]*(정리본|최종|final|초안|draft)\s*$/i, '')
    .trim();
}

function parseDateFromTitle(name) {
  let m = name.match(/(20\d{2})[.\-/ ](\d{1,2})[.\-/ ](\d{1,2})/);
  if (m) {
    const y = m[1];
    const mo = String(Number(m[2])).padStart(2, '0');
    const d = String(Number(m[3])).padStart(2, '0');
    return `${y}-${mo}-${d}`;
  }

  m = name.match(/\b(\d{2})[.\-/ ](\d{1,2})[.\-/ ](\d{1,2})\b/);
  if (m) {
    const y = `20${m[1]}`;
    const mo = String(Number(m[2])).padStart(2, '0');
    const d = String(Number(m[3])).padStart(2, '0');
    return `${y}-${mo}-${d}`;
  }

  return null;
}

function slugifyTitle(title) {
  return title
    .normalize('NFKC')
    .replace(/\s+/g, '-')
    .replace(/[\\/:*?"<>|#%{}~&]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || '회의록';
}

function yamlQuote(s) {
  return `'${String(s).replace(/'/g, "''")}'`;
}

function normalizeBody(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

function stageScore(stage) {
  if (stage === 'final') return 3;
  if (stage === 'unknown') return 2;
  return 1;
}

function pickBetter(current, candidate) {
  if (!current) return candidate;
  const currentScore = stageScore(current.stage);
  const candidateScore = stageScore(candidate.stage);
  if (candidateScore !== currentScore) {
    return candidateScore > currentScore ? candidate : current;
  }
  return new Date(candidate.modifiedTime) > new Date(current.modifiedTime) ? candidate : current;
}

async function listGoogleDocs(drive, folderId) {
  const docs = [];
  let pageToken;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
      fields: 'nextPageToken, files(id, name, createdTime, modifiedTime, webViewLink)',
      orderBy: 'modifiedTime desc',
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    docs.push(...(res.data.files || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return docs;
}

async function exportAsText(drive, fileId) {
  const res = await drive.files.export(
    {
      fileId,
      mimeType: 'text/plain',
      supportsAllDrives: true,
    },
    {
      responseType: 'text',
    }
  );

  return typeof res.data === 'string' ? res.data : String(res.data || '');
}

function buildMarkdown(docMeta, bodyText) {
  const stageLabel = docMeta.stage === 'final'
    ? '정리본'
    : docMeta.stage === 'draft'
      ? '초안'
      : '일반';

  const lines = [
    '---',
    `title: ${yamlQuote(docMeta.baseTitle)}`,
    'layout: default',
    'parent: 회의록',
    '---',
    '',
    `# ${docMeta.baseTitle}`,
    '{: .no_toc }',
    '',
    `- 회의 일자: ${docMeta.noteDate}`,
    `- 동기화 시각: ${kstNowLabel()}`,
    `- 원본: [Google Docs](${docMeta.webViewLink})`,
    `- 문서 상태: ${stageLabel}`,
    '',
    '---',
    '',
    '## 본문',
    '',
    normalizeBody(bodyText),
    '',
  ];

  return lines.join('\n');
}

async function run() {
  const folderId = process.env.GDRIVE_MINUTES_FOLDER_ID;
  if (!folderId) {
    throw new Error('Missing GDRIVE_MINUTES_FOLDER_ID secret');
  }

  const serviceAccount = parseServiceAccount();
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  ensureDir(minutesRoot);

  const docs = await listGoogleDocs(drive, folderId);
  if (docs.length === 0) {
    console.log('No Google Docs found in target folder');
    return;
  }

  const chosenByPath = new Map();

  for (const d of docs) {
    const rawTitle = (d.name || '').trim();
    if (!rawTitle) continue;

    const stage = detectStage(rawTitle);
    const baseTitle = stripStageSuffix(rawTitle) || rawTitle;
    const noteDate = parseDateFromTitle(baseTitle) || ymd(d.modifiedTime || d.createdTime || new Date());
    const year = noteDate.slice(0, 4);
    const slug = slugifyTitle(baseTitle);
    const outPath = path.join(minutesRoot, year, `${noteDate}-${slug}.md`);

    const candidate = {
      id: d.id,
      rawTitle,
      baseTitle,
      stage,
      noteDate,
      modifiedTime: d.modifiedTime,
      createdTime: d.createdTime,
      webViewLink: d.webViewLink || `https://docs.google.com/document/d/${d.id}/edit`,
      outPath,
    };

    const picked = pickBetter(chosenByPath.get(outPath), candidate);
    chosenByPath.set(outPath, picked);
  }

  let updatedCount = 0;

  for (const docMeta of chosenByPath.values()) {
    const text = await exportAsText(drive, docMeta.id);
    const markdown = buildMarkdown(docMeta, text);
    ensureDir(path.dirname(docMeta.outPath));

    const prev = fs.existsSync(docMeta.outPath)
      ? fs.readFileSync(docMeta.outPath, 'utf8')
      : null;

    if (prev !== markdown) {
      fs.writeFileSync(docMeta.outPath, markdown, 'utf8');
      updatedCount += 1;
      console.log(`synced: ${path.relative(repoRoot, docMeta.outPath)} <- ${docMeta.rawTitle}`);
    }
  }

  console.log(`done: ${updatedCount} files updated, ${chosenByPath.size} meeting notes evaluated`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
