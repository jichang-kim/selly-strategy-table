import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const CATEGORY_CONFIG = {
  competitors: {
    title: '경쟁사·플랫폼',
    queries: ['식봄 when:180d', 'CJ프레시웨이 식봄 when:180d', '오더히어로 when:180d', '오더히어로 식자재 when:180d', '푸드팡 식자재 when:180d', '식자재 플랫폼 when:180d'],
    includeKeywords: ['식봄', '오더히어로', '푸드팡', '식자재', 'CJ프레시웨이'],
    coverageNote: '최근 6개월 공개 기사 기준으로는 식봄 관련 노출이 가장 많고, 오더히어로·푸드팡은 공개 기사량이 제한적이어서 현장 영업 정보와 함께 교차 확인이 필요합니다.',
    summaryLead: '식자재 플랫폼과 외식업 운영 SaaS 경쟁 구도는 프로모션보다 거래 잠금과 운영 데이터 장악 경쟁으로 이동하는 흐름이 보입니다.',
    dynamics: [
      '경쟁사 기사 다수가 제휴, 상품 확장, 운영 효율화 메시지에 집중되면 플랫폼들이 단순 입점보다 거래 반복성과 발주 습관을 선점하려는 국면으로 해석할 수 있습니다.',
      '보도량이 많지 않더라도 특정 회사명 기사군이 반복되면 실제 시장 영향보다 PR 집중도가 높을 수 있으므로, 거래처 현장 반응과 함께 교차 검증이 필요합니다.',
    ],
    actions: [
      '주요 경쟁사별 제휴/상품/물류/금융 기능 확장 여부를 월 단위로 표준 시트에 누적한다.',
      '가맹본부와 점주 관점에서 우리 서비스의 재발주 락인 포인트를 경쟁사 대비 문장으로 다시 정의한다.',
    ],
  },
  market: {
    title: '외식업·자영업',
    queries: ['외식업 경기 when:180d', '자영업 when:180d', '외식물가 when:180d', '배달앱 수수료 when:180d', '소상공인 외식업 when:180d'],
    includeKeywords: ['외식', '자영업', '음식점', '배달', '소상공인'],
    summaryLead: '최근 6개월 외식업·자영업 보도는 소비 회복보다 비용 부담과 업태 재편, 생존형 운영 효율화 압력에 더 무게가 실립니다.',
    dynamics: [
      '자영업 기사군이 폐업, 채무, 소비 위축, 배달 수수료 압박을 반복하면 점주 의사결정의 기준이 성장보다 손익 보전으로 이동하고 있음을 시사합니다.',
      '외식 경기 회복 기사와 비용 부담 기사가 동시에 나오면 매출 반등이 있더라도 원가·임차·인건비 압박으로 체감 개선은 제한적일 가능성이 큽니다.',
    ],
    actions: [
      '점주가 체감하는 절감 포인트를 발주 단가, 배송 안정성, 폐기 감소 관점에서 재정리한다.',
      '취약 업종과 회복 업종을 분리해 업종별 제안 메시지와 프로모션 구조를 차등화한다.',
    ],
  },
  logistics: {
    title: '물류·3PL·4PL',
    queries: ['콜드체인 when:180d', '풀필먼트 when:180d', '3PL 물류 when:180d', '4PL 물류 when:180d', '저온물류센터 when:180d'],
    includeKeywords: ['콜드체인', '풀필먼트', '3PL', '4PL', '저온물류', '물류센터'],
    summaryLead: '물류 보도는 저온물류, 풀필먼트 고도화, 3PL/4PL 확대처럼 운영 효율과 네트워크 통합 역량이 경쟁력의 핵심으로 이동하는 신호를 보여줍니다.',
    dynamics: [
      '3PL/4PL 기사군이 반복되면 단순 운송보다 재고·센터·IT를 묶은 통합 오퍼레이션 역량이 valuation과 수주 경쟁에 영향을 주는 국면입니다.',
      '저온물류와 콜드체인 이슈는 외식 식자재 플랫폼에서 배송 품질과 폐기율 관리가 곧 원가 경쟁력임을 다시 확인시켜 줍니다.',
    ],
    actions: [
      '지역 물류 파트너별 SLA와 냉장·냉동 품질 지표를 월별로 수집하는 운영 시트를 만든다.',
      '직영과 제3자 물류를 혼합할 때 어떤 구간에서 서비스 품질이 흔들리는지 선행지표를 정의한다.',
    ],
  },
  agriculture: {
    title: '농산물시장',
    queries: ['농산물 가격 when:180d', '가락시장 when:180d', '채소 가격 when:180d', '배추 가격 when:180d', '양파 가격 when:180d'],
    includeKeywords: ['농산물', '가락시장', '채소', '배추', '양파', '도매시장'],
    summaryLead: '농산물시장 보도는 작황과 날씨, 도매시장 가격 변동, 산지 수급 불안이 외식 식자재 조달 전략에 직접 연결되는 환경을 보여줍니다.',
    dynamics: [
      '채소류 가격 기사와 도매시장 이슈가 이어지면 단기 매입 판단보다 산지 수급 변화의 방향성과 변동성 폭을 읽는 능력이 중요해집니다.',
      '가격 하락 기사도 공급 안정의 신호가 아니라 일시적 출하 집중일 수 있으므로 발주 정책은 주간 시세와 품질 편차를 함께 봐야 합니다.',
    ],
    actions: [
      '주요 채소 품목의 도매가·행사가·평균판매가를 주간 단위로 겹쳐 보는 내부 지표를 만든다.',
      '산지 리스크가 큰 품목은 대체 품목 제안과 행사 캘린더를 함께 설계한다.',
    ],
  },
};

function parseArgs(argv) {
  const options = { days: 7, date: new Date().toISOString().slice(0, 10), overwrite: false, categories: Object.keys(CATEGORY_CONFIG) };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--days') options.days = Number(argv[++index]);
    else if (arg === '--date') options.date = argv[++index];
    else if (arg === '--overwrite') options.overwrite = true;
    else if (arg === '--categories') options.categories = argv[++index].split(',').map(item => item.trim()).filter(Boolean);
  }
  return options;
}

function decodeHtml(input) {
  return input
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function stripTags(input) {
  return decodeHtml(input).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTag(block, tagName) {
  const match = block.match(new RegExp(`<${tagName}(?: [^>]*)?>([\\s\\S]*?)</${tagName}>`, 'i'));
  return match ? match[1].trim() : '';
}

function parseRss(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const block = match[1];
    const title = stripTags(extractTag(block, 'title'));
    const link = stripTags(extractTag(block, 'link'));
    const pubDate = stripTags(extractTag(block, 'pubDate'));
    const description = stripTags(extractTag(block, 'description'));
    const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
    const source = sourceMatch ? stripTags(sourceMatch[1]) : '';
    return { title, link, pubDate, description, source };
  });
}

function normalizeTitle(title) {
  return title
    .replace(/\s+-\s+[^-]+$/, '')
    .replace(/\[[^\]]+\]\s*/g, '')
    .replace(/[“”"'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function asDate(value) {
  return new Date(value);
}

function filterRecent(items, days, endDate) {
  const end = new Date(`${endDate}T23:59:59Z`);
  const start = new Date(end.getTime() - (days * 24 * 60 * 60 * 1000));
  return items.filter((item) => {
    const date = asDate(item.pubDate);
    return !Number.isNaN(date.getTime()) && date >= start && date <= end;
  });
}

function groupItems(items) {
  const groups = new Map();
  items.forEach((item) => {
    const key = normalizeTitle(item.title);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return [...groups.entries()].map(([normalizedTitle, groupedItems]) => ({
    normalizedTitle,
    primary: groupedItems[0],
    duplicates: groupedItems.slice(1),
    all: groupedItems,
  })).sort((left, right) => {
    const leftDate = new Date(left.primary.pubDate).getTime();
    const rightDate = new Date(right.primary.pubDate).getTime();
    return rightDate - leftDate;
  });
}

function matchesKeywords(item, keywords) {
  if (!keywords?.length) return true;
  const haystack = `${item.title} ${item.description}`.toLowerCase();
  return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
}

function uniqueItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.title}::${item.link}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSummary(groups, categoryKey) {
  const config = CATEGORY_CONFIG[categoryKey];
  const topTitles = groups.slice(0, 3).map((group) => group.normalizedTitle);
  const tail = topTitles.length ? `대표 이슈는 ${topTitles.join(' / ')}입니다.` : '의미 있는 기사군이 충분하지 않아 추가 확인이 필요합니다.';
  return `${config.summaryLead} ${tail}`;
}

function buildFindings(groups) {
  if (!groups.length) {
    return ['- 최근 기간에 수집된 유의미한 기사군이 부족했습니다. 검색어 보정 또는 카테고리 확장이 필요합니다.'];
  }

  return groups.slice(0, 6).map((group, index) => {
    const date = group.primary.pubDate ? new Date(group.primary.pubDate).toISOString().slice(0, 10) : '날짜 확인 필요';
    const sources = [group.primary.source, ...group.duplicates.map((item) => item.source)].filter(Boolean);
    const uniqueSources = [...new Set(sources)].join(', ');
    const note = group.primary.description || group.primary.title;
    return `- ${index + 1}. ${group.normalizedTitle} (${date}, ${uniqueSources || '출처 확인 필요'})\n  기사 리드 기준 메모: ${note}`;
  });
}

function buildFootnotes(groups) {
  if (!groups.length) return ['- 수집 기사 없음'];

  const lines = [];
  groups.slice(0, 6).forEach((group, index) => {
    const number = index + 1;
    lines.push(`- [${number}] ${group.primary.title} — ${group.primary.source || '출처 미상'} (${group.primary.pubDate})`);
    lines.push(`  URL: ${group.primary.link}`);
    group.duplicates.forEach((item, duplicateIndex) => {
      const suffix = String.fromCharCode(97 + duplicateIndex);
      lines.push(`- [${number}${suffix}] 유사 기사: ${item.title} — ${item.source || '출처 미상'} (${item.pubDate})`);
      lines.push(`  URL: ${item.link}`);
    });
  });
  return lines;
}

function buildMarkdown(categoryKey, date, groups, days) {
  const config = CATEGORY_CONFIG[categoryKey];
  const title = days >= 180
    ? `${config.title} 최근 6개월 회고 (${date})`
    : `${config.title} 주간 뉴스 브리프 (${date})`;
  const findings = buildFindings(groups).join('\n');
  const dynamics = config.dynamics.map((line) => `- ${line}`).join('\n');
  const actions = config.actions.map((line) => `- [ ] ${line}`).join('\n');
  const footnotes = buildFootnotes(groups).join('\n');
  const sources = [...new Set(groups.slice(0, 6).flatMap((group) => group.all.map((item) => item.link)))];
  const coverageNote = config.coverageNote ? `- ${config.coverageNote}\n` : '';

  return `---
type: news
title: ${title}
date: ${date}
author: 김지창 (CSO)
status: draft
category: ${categoryKey}
sources:
${sources.map((source) => `  - ${source}`).join('\n') || '  -'}
layout: default
grand_parent: News
parent: ${config.title}
---

# ${title}

> 자동 수집 초안입니다. 기사 제목과 리드 기준으로 묶은 회고 메모이며, 주요 수치와 해석은 검토 후 보강이 필요합니다.

## 1. 한 줄 요약
> ${buildSummary(groups, categoryKey)}

## 2. 이슈 묶음 요약
${findings}

## 3. 현시점 동태 파악
${dynamics}

## 4. CSO 관점 해석
${coverageNote}- 이 카테고리는 개별 기사 건수보다 **반복되는 메시지**가 중요합니다. 반복 키워드가 가격, 물류, 수익성, 운영 효율 중 어디에 몰리는지 보는 것이 우선입니다.
- 식자재쿡은 기사 단건 대응보다 **발주 반복성, 배송 품질, 가격 신뢰, 운영 데이터 축적** 중 어느 축에서 우위를 쌓는지 연결해서 읽어야 합니다.
- 보도량이 적은 경쟁사라도 특정 기능 확장이나 제휴가 반복 보도되면 현장 세일즈 메시지 변화 가능성이 있으므로 영업·운영 현장 피드백으로 교차 확인이 필요합니다.

## 5. 대응 메모
${actions}

## 6. 출처 및 유사 기사 각주
${footnotes}
`;
}

function outputPathFor(categoryKey, date, days) {
  const suffix = days >= 180 ? '최근-6개월-회고' : '주간-뉴스-브리프';
  return path.join(repoRoot, 'news', categoryKey, `${date}-${suffix}.md`);
}

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function fetchCategory(categoryKey, days, date) {
  const { queries, includeKeywords } = CATEGORY_CONFIG[categoryKey];
  const queryResults = await Promise.all(queries.map(async (query) => {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;
    const response = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; SellyStrategyNewsBot/1.0)',
      },
    });
    if (!response.ok) {
      throw new Error(`${categoryKey} RSS fetch failed: ${response.status}`);
    }
    const xml = await response.text();
    return parseRss(xml);
  }));

  const merged = uniqueItems(queryResults.flat());
  const recent = filterRecent(merged, days, date).filter((item) => matchesKeywords(item, includeKeywords));
  return groupItems(recent);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  for (const categoryKey of options.categories) {
    if (!CATEGORY_CONFIG[categoryKey]) {
      throw new Error(`Unknown category: ${categoryKey}`);
    }

    const outputPath = outputPathFor(categoryKey, options.date, options.days);
    if (!options.overwrite) {
      try {
        await fs.access(outputPath);
        continue;
      } catch {
        // File does not exist; continue.
      }
    }

    const groups = await fetchCategory(categoryKey, options.days, options.date);
    const markdown = buildMarkdown(categoryKey, options.date, groups, options.days);
    await ensureDirectory(outputPath);
    await fs.writeFile(outputPath, markdown, 'utf8');
    console.log(`generated ${path.relative(repoRoot, outputPath)}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});