# 로컬 미리보기용 (GitHub Pages는 이 Gemfile 없이도 자동 빌드됨)
#
#   bundle install
#   bundle exec jekyll serve
#   → http://localhost:4000/selly-strategy-table/

source "https://rubygems.org"

# GitHub Pages 빌드 환경과 동일하게 맞춤
# (jekyll-remote-theme, jekyll-seo-tag, jekyll-sitemap 포함)
gem "github-pages", group: :jekyll_plugins

# 최신 Ruby에서 로컬 서버 구동에 필요
gem "webrick", "~> 1.8"

# Ruby 3.4+ / 4.0 에서 기본 gem에서 빠진 표준 라이브러리 (로컬 빌드용)
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
