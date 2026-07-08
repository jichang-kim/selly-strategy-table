# 셀리 전략테이블 — 김지창 (식자재쿡 전략기획본부)
식자재쿡 CSO 관점의 **커리어 일기**와 **리서치·분석·보고서**를 주기적으로 축적하는 개인 저장소입니다.
https://jichang-kim.github.io/selly-strategy-table/

## 폴더 안내
| 폴더 | 용도 |
|------|------|
| `company/` | 식자재쿡 사업 컨텍스트 (전략·제품·지표) |
| `journal/` | 커리어 일기 (`YYYY/MM/YYYY-MM-DD.md`) |
| `news/` | 외부 기사·분석자료 기반 뉴스 회고록 |
| `research/` | 시장·경쟁사·트렌드 리서치 |
| `reports/` | CSO 관점 보고서 |
| `templates/` | 일기·리포트·리서치 표준 양식 |
| `assets/` | 기존 Claude Desktop 아티팩트 이관 보관 |

## News 자동화

- `scripts/generate-news.mjs`는 Google News RSS를 기반으로 카테고리별 뉴스 회고 초안을 생성합니다.
- `.github/workflows/news-digest.yml`은 매주 월요일 오전 8시(KST)와 수동 실행 시 최신 뉴스 digest를 커밋합니다.
- 초기 백필(backfill)은 `node scripts/generate-news.mjs --days 180 --date 2026-07-04 --overwrite`로 생성했습니다.

## 로컬 Jekyll 빌드

- GitHub Pages 배포는 기본 `Gemfile` 기준으로 동작합니다.
- 로컬 Ruby 4 환경에서는 `Gemfile.local`을 사용하세요.
- 예시:
	`BUNDLE_GEMFILE=Gemfile.local bundle install`
	`BUNDLE_GEMFILE=Gemfile.local bundle exec jekyll build`

## Claude Design -> Figma 변환

- `scripts/export-figma-svg.mjs`는 `assets/dambbukharu/*.html`에서 `<svg>` 블록을 추출해 Figma import용 `assets/figma/dambbukharu/<slug>/frame-*.svg`를 생성합니다.
- 실행:
	`node scripts/export-figma-svg.mjs`
- 현재 기본 포함 소스:
	`assets/dambbukharu/brand-guide.html`
- 나머지 3개(`app-design-progress.html`, `service-intro-webpage.html`, `wireframe.html`)를 같은 폴더에 추가하면 다음 실행 시 자동 변환됩니다.
