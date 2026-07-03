---
title: 홈
layout: default
nav_order: 1
permalink: /
description: "식자재쿡 전략기획부 CSO 관점의 리서치·분석·보고서 아카이브"
---

# 식자재쿡 CSO Journal
{: .fs-9 }

식자재쿡 전략기획부(CSO) 관점의 **리서치 · 분석 · 보고서**를 축적하는 내부 전략 아카이브입니다. 왼쪽 사이드바 또는 상단 검색으로 문서를 찾을 수 있습니다.
{: .fs-6 .fw-300 }

[리포트]({{ '/reports/' | relative_url }}){: .btn .btn-primary .mr-2 }
[리서치]({{ '/research/' | relative_url }}){: .btn .mr-2 }
[사업 컨텍스트]({{ '/company/' | relative_url }}){: .btn }

---

## 섹션 안내

- **[Company]({{ '/company/' | relative_url }})** — 식자재쿡 사업 컨텍스트(전략·제품·지표). 모든 리서치·리포트의 배경 기준.
- **[Reports]({{ '/reports/' | relative_url }})** — CSO 관점 보고서 (요약 → 발견 → 인사이트 → 리스크 → 제언).
- **[Research]({{ '/research/' | relative_url }})** — 시장·경쟁사·트렌드 리서치 (경쟁사 비교표 포함).
- **[Journal]({{ '/journal/' | relative_url }})** — 커리어 일기.

## 작동 방식

1. Claude Desktop 예약작업이 주기적으로 실행
2. 리서치 → 초안 작성 → 폴더 규칙대로 저장 → GitHub 커밋
3. 검토 후 frontmatter의 `status`를 `reviewed` / `final`로 갱신

작성 규칙은 `CLAUDE.md`, 문서 양식은 `templates/`를 따릅니다.
{: .fs-3 .fw-300 }
