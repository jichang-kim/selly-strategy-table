# 셀리 전략테이블 — 김지창 (식자재쿡 전략기획본부)
식자재쿡 CSO 관점의 **커리어 일기**와 **리서치·분석·보고서**를 주기적으로 축적하는 개인 저장소입니다.
https://jichang-kim.github.io/selly-strategy-table/

## 폴더 안내
| 폴더 | 용도 |
|------|------|
| `company/` | 식자재쿡 사업 컨텍스트 (전략·제품·지표) |
| `journal/` | 커리어 일기 (`YYYY/MM/YYYY-MM-DD.md`) |
| `minutes/` | Google Docs 주간회의록 자동 동기화 문서 |
| `news/` | 외부 기사·분석자료 기반 뉴스 회고록 |
| `research/` | 시장·경쟁사·트렌드 리서치 |
| `reports/` | CSO 관점 보고서 |
| `templates/` | 일기·리포트·리서치 표준 양식 |
| `assets/` | 기존 Claude Desktop 아티팩트 이관 보관 |

## News 자동화

- `scripts/generate-news.mjs`는 Google News RSS를 기반으로 카테고리별 뉴스 회고 초안을 생성합니다.
- `.github/workflows/news-digest.yml`은 매주 월요일 오전 8시(KST)와 수동 실행 시 최신 뉴스 digest를 커밋합니다.
- 초기 백필(backfill)은 `node scripts/generate-news.mjs --days 180 --date 2026-07-04 --overwrite`로 생성했습니다.

## 회의록 자동화

- `scripts/sync-meeting-minutes.mjs`는 Google Drive 폴더의 Google Docs 회의록을 `minutes/YYYY/YYYY-MM-DD-제목.md`로 동기화합니다.
- `.github/workflows/meeting-minutes-sync.yml`은 **매일 오전 10시(KST)** 실행되며, 같은 주제의 초안/정리본이 함께 있을 경우 정리본을 우선 반영합니다.
- 이미 같은 파일 경로가 있으면 덮어쓰고, 없으면 신규 생성합니다.

필수 GitHub Secrets:

- `GDRIVE_MINUTES_FOLDER_ID`: 회의록 Google Docs가 저장되는 Drive 폴더 ID
- `GCP_SERVICE_ACCOUNT_KEY`: 서비스 계정 JSON 전체 문자열(또는 base64 인코딩 문자열)

사전 준비:

1. Google Cloud에서 서비스 계정을 만들고 Drive API를 활성화합니다.
2. 서비스 계정 이메일을 회의록 폴더에 Viewer 이상 권한으로 공유합니다.
3. 위 두 값을 GitHub Repository Secrets에 등록합니다.

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
