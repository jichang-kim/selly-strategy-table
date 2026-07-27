---
title: Reports
layout: default
nav_order: 3
has_children: true
permalink: /reports/
---

# Reports — CSO 보고서
{: .no_toc }

CSO 관점의 분석 보고서 아카이브입니다. 두 갈래로 구분해 관리합니다.

{% assign report_docs = site.pages | where_exp: "p", "p.grand_parent == 'Reports'" | sort: "nav_order" %}

## 정기 리포트

매입·매출·마진·사용자 지표 등을 주기적으로 집계해 업데이트하는 보고서입니다.

{% for p in report_docs %}{% if p.parent == '정기 리포트' %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endif %}{% endfor %}

## 주제·이벤트 분석

특정 주제, 캠페인·이벤트에 대한 단발성 심층 분석입니다.

{% for p in report_docs %}{% if p.parent == '주제·이벤트 분석' %}- [{{ p.title }}]({{ p.url | relative_url }})
{% endif %}{% endfor %}
