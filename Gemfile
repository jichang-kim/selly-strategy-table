# 로컬 미리보기용 (GitHub Pages는 이 Gemfile 없이도 자동 빌드됨)
#
#   bundle install
#   bundle exec jekyll serve
#   → http://localhost:4000/selly-strategy-table/

source "https://rubygems.org"

# 로컬 빌드는 Ruby 4 호환성을 위해 Jekyll 4 계열로 유지
# GitHub Pages 배포는 저장소 설정 기준으로 별도 처리됨
gem "jekyll", "~> 4.4"
gem "jekyll-remote-theme", "~> 0.4", group: :jekyll_plugins
gem "jekyll-seo-tag", "~> 2.8", group: :jekyll_plugins
gem "jekyll-sitemap", "~> 1.4", group: :jekyll_plugins
gem "jekyll-include-cache", "~> 0.2.1", group: :jekyll_plugins

# 최신 Ruby에서 로컬 서버 구동에 필요
gem "webrick", "~> 1.8"

# Ruby 3.4+ / 4.0 에서 기본 gem에서 빠진 표준 라이브러리 (로컬 빌드용)
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
