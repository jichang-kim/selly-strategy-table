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

## 참고

- 단순 희석 모델입니다. RCPS 상환·전환조건, 청산우선권, 리픽싱은 반영되어 있지 않습니다.
- 실제 텀시트 검토 시에는 법무·회계 자문을 함께 받으십시오.
