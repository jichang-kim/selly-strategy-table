---
title: 담뿍하루 서비스 소개 웹페이지
layout: default
parent: Other
nav_order: 4
---

# 담뿍하루 서비스 소개 웹페이지
{: .no_toc }

- 원본(Claude Design): [서비스 소개 웹페이지](https://claude.ai/design/p/fdb7d04b-8b5a-40da-9acc-0c646eda755a?file=%EB%8B%B4%EB%BF%8D%ED%95%98%EB%A3%A8%2F%EC%84%9C%EB%B9%84%EC%8A%A4+%EC%86%8C%EA%B0%9C+%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80.html&via=share)

## Figma 변환 상태

- 현재 세션에서는 Claude 공유 링크가 로그인 페이지로 리다이렉트되어 원본 HTML 자동 수집이 불가했습니다.
- 원본 HTML을 `assets/dambbukharu/service-intro-webpage.html`로 저장하면 변환 스크립트로 즉시 SVG 세트를 생성할 수 있습니다.

## 다음 액션

1. Claude Design에서 HTML 내보내기(Export)합니다.
2. `assets/dambbukharu/service-intro-webpage.html`로 저장합니다.
3. `node scripts/export-figma-svg.mjs` 실행 후 생성된 SVG를 Figma에 Import합니다.
