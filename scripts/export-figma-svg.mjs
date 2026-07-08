#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const sourceDir = path.join(repoRoot, 'assets', 'dambbukharu');
const outputRoot = path.join(repoRoot, 'assets', 'figma', 'dambbukharu');

const targets = [
  { slug: 'brand-guide', source: 'brand-guide.html', title: '담뿍하루 브랜드 가이드' },
  { slug: 'app-design-progress', source: 'app-design-progress.html', title: '담뿍하루 앱디자인 프로그레스' },
  { slug: 'service-intro-webpage', source: 'service-intro-webpage.html', title: '담뿍하루 서비스 소개 웹페이지' },
  { slug: 'wireframe', source: 'wireframe.html', title: '담뿍하루 와이어프레임' },
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeSvg(svg) {
  if (!svg.includes('xmlns=')) {
    return svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return svg;
}

function extractSvgBlocks(html) {
  return [...html.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)].map((m) => normalizeSvg(m[0]));
}

function extractSharedSymbolDefs(html) {
  const symbols = [...html.matchAll(/<symbol\b[\s\S]*?<\/symbol>/gi)].map((m) => m[0]);
  return symbols.join('\n');
}

function injectSharedDefs(svg, sharedDefs) {
  if (!sharedDefs || !svg.includes('<use ')) {
    return svg;
  }

  if (svg.includes('<defs>')) {
    return svg.replace('<defs>', `<defs>\n${sharedDefs}\n`);
  }

  return svg.replace(/<svg\b([^>]*)>/i, `<svg$1><defs>\n${sharedDefs}\n</defs>`);
}

function writeIndexMd(dirPath, title, source, svgFiles, skippedReason = null) {
  const lines = [
    '---',
    `title: ${title} SVG Export`,
    'layout: default',
    'nav_exclude: true',
    '---',
    '',
    `# ${title} SVG Export`,
    '',
    `- source: ${source}`,
  ];

  if (skippedReason) {
    lines.push(`- status: ${skippedReason}`);
  } else {
    lines.push(`- exported_svg_count: ${svgFiles.length}`);
    lines.push('');
    lines.push('## Exported Files');
    lines.push('');
    for (const file of svgFiles) {
      lines.push(`- [${file}](./${file})`);
    }
  }

  lines.push('');
  fs.writeFileSync(path.join(dirPath, 'index.md'), lines.join('\n'), 'utf8');
}

function run() {
  ensureDir(outputRoot);

  for (const target of targets) {
    const sourcePath = path.join(sourceDir, target.source);
    const outDir = path.join(outputRoot, target.slug);
    ensureDir(outDir);

    if (!fs.existsSync(sourcePath)) {
      writeIndexMd(outDir, target.title, `assets/dambbukharu/${target.source}`, [], 'source_html_missing');
      console.log(`[skip] ${target.source} not found`);
      continue;
    }

    const html = fs.readFileSync(sourcePath, 'utf8');
    const sharedDefs = extractSharedSymbolDefs(html);
    const svgBlocks = extractSvgBlocks(html);

    if (svgBlocks.length === 0) {
      writeIndexMd(outDir, target.title, `assets/dambbukharu/${target.source}`, [], 'no_svg_found');
      console.log(`[skip] no svg found in ${target.source}`);
      continue;
    }

    const files = [];
    svgBlocks.forEach((svg, index) => {
      const fileName = `frame-${String(index + 1).padStart(3, '0')}.svg`;
      const outPath = path.join(outDir, fileName);
      const hydratedSvg = injectSharedDefs(svg, sharedDefs);
      fs.writeFileSync(outPath, hydratedSvg, 'utf8');
      files.push(fileName);
    });

    writeIndexMd(outDir, target.title, `assets/dambbukharu/${target.source}`, files);
    console.log(`[ok] ${target.source} -> ${files.length} svg files`);
  }
}

run();
