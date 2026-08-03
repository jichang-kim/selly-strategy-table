---
title: 담뿍 캡테이블 시뮬레이터
layout: default
parent: 담뿍하루
nav_order: 5
---

# 담뿍 캡테이블 시뮬레이터
{: .no_toc }

설립 지분(대표·CTO·모법인·ESOP)과 TIPS/시드/시리즈 A 라운드 조건을 조정하며 각 주주의 희석과 최종 지분 가치를 시뮬레이션합니다. 라운드 직전 ESOP 확충(프리머니 기준)과 스톡옵션 개별 배분 계산을 포함합니다.

## 웹 시뮬레이터

- [시뮬레이터 바로 열기](/selly-strategy-table/assets/dambbukharu/captable-simulator.html)

## 소스

- React 컴포넌트 원본: [captable-simulator.jsx](https://github.com/jichang-kim/selly-strategy-table/blob/main/assets/dambbukharu/captable-simulator.jsx)
- 웹 버전은 원본 JSX를 classic 런타임으로 사전 컴파일·압축해 React 18 UMD 위에서 구동합니다.

## 기본값

설립 지분 기본값은 [피치덱 25p 캡테이블](/selly-strategy-table/other/dambbukharu-pitch-deck.html)과 동일합니다 — 김지창 51% · 공경섭 39% · ESOP 10%. 모법인(식자재쿡)은 지분·수익 관계가 없으므로([사업기획서 8.2](/selly-strategy-table/other/dambbukharu-business-plan.html)) 0%에서 시작하며, 슬라이더로 가정을 넣어보는 것은 그대로 가능합니다.

라운드 조건(TIPS·시드·시리즈 A 금액과 밸류)은 시나리오 탐색용 기본값이므로 피치덱의 시드 조건(1억 원 · 프리 9억 원)과 다릅니다.

## 참고

- 단순 희석 모델입니다. RCPS 상환·전환조건, 청산우선권, 리픽싱은 반영되어 있지 않습니다.
- 실제 텀시트 검토 시에는 법무·회계 자문을 함께 받으십시오.
