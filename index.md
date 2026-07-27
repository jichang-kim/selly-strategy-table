---
title: 홈
layout: default
nav_order: 1
permalink: /
description: "전략기획본부 CSO 관점의 리서치·분석·보고서를 축적하는 전략 아카이브이자 포트폴리오"
---

{% assign report_docs = site.pages | where_exp: "p", "p.dir contains '/reports/'" | where_exp: "p", "p.name != 'index.md'" %}
{% assign research_docs = site.pages | where_exp: "p", "p.dir contains '/research/'" | where_exp: "p", "p.name != 'index.md'" %}
{% assign news_docs = site.pages | where_exp: "p", "p.dir contains '/news/'" | where_exp: "p", "p.name != 'index.md'" %}
{% assign minutes_docs = site.pages | where_exp: "p", "p.dir contains '/minutes/'" | where_exp: "p", "p.name != 'index.md'" %}

<section class="selly-hero" id="selly-hero">
  <div class="selly-hero__inner">
    <h1 class="selly-hero__title">전략을 기록하고,<br>기록으로 <em>증명합니다</em></h1>
    <p class="selly-hero__lead">
      식자재쿡 전략기획본부 CSO 관점의 리서치·분석·보고서를 축적하는 전략 아카이브이자,
      사업운영의 의사결정 과정을 그대로 담아낸 포트폴리오입니다.
    </p>
    <div class="selly-hero__cta">
      <a href="{{ '/reports/' | relative_url }}" class="btn btn-primary">리포트 보기</a>
      <a href="{{ '/company/' | relative_url }}" class="btn">회사 소개</a>
      <a href="{{ '/journal/' | relative_url }}" class="btn">저널</a>
    </div>
    <div class="selly-hero__stats">
      <div class="selly-stat">
        <div class="selly-stat__num" data-count="{{ report_docs | size }}">0</div>
        <div class="selly-stat__label">리포트</div>
      </div>
      <div class="selly-stat">
        <div class="selly-stat__num" data-count="{{ research_docs | size }}">0</div>
        <div class="selly-stat__label">리서치</div>
      </div>
      <div class="selly-stat">
        <div class="selly-stat__num" data-count="{{ news_docs | size }}">0</div>
        <div class="selly-stat__label">뉴스 회고</div>
      </div>
      {% assign minutes_count = minutes_docs | size %}{% if minutes_count > 0 %}
      <div class="selly-stat">
        <div class="selly-stat__num" data-count="{{ minutes_count }}">0</div>
        <div class="selly-stat__label">회의록</div>
      </div>
      {% endif %}
    </div>
  </div>
  <span class="selly-hero__scroll" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </span>
</section>

<h2 class="selly-sections__title selly-reveal" id="sections">아카이브 둘러보기</h2>
<p class="selly-sections__sub selly-reveal">리포트부터 저널까지, 카테고리별로 정리된 기록입니다.</p>

<div class="selly-grid">
  <a class="selly-card selly-reveal" href="{{ '/reports/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg></span>
    <span class="selly-card__title">Reports</span>
    <p class="selly-card__desc">매입·매출 등 정기 집계 리포트와 주제·이벤트별 심층 분석 보고서.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>

  <a class="selly-card selly-reveal" href="{{ '/research/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>
    <span class="selly-card__title">Research</span>
    <p class="selly-card__desc">경쟁사 주요 이슈, 시장 트렌드, 진행 중인 이벤트 분석.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>

  <a class="selly-card selly-reveal" href="{{ '/news/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg></span>
    <span class="selly-card__title">News</span>
    <p class="selly-card__desc">식자재·유통·자영업·외식업·물류 이슈를 카테고리별 회고록으로 정리.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>

  <a class="selly-card selly-reveal" href="{{ '/minutes/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg></span>
    <span class="selly-card__title">회의록</span>
    <p class="selly-card__desc">주간회의의 논의 흐름과 의사결정 기록.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>

  <a class="selly-card selly-reveal" href="{{ '/event/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>
    <span class="selly-card__title">Event</span>
    <p class="selly-card__desc">진행 중인 캠페인·이벤트 운영 시트 모음.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>

  <a class="selly-card selly-reveal" href="{{ '/journal/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg></span>
    <span class="selly-card__title">Journal</span>
    <p class="selly-card__desc">평소의 아카이빙, 커리어 일기, 회고록.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>

  <a class="selly-card selly-reveal" href="{{ '/company/' | relative_url }}">
    <span class="selly-card__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg></span>
    <span class="selly-card__title">Company</span>
    <p class="selly-card__desc">식자재쿡·브랜드쿡 사업 소개와 회사·사업아이템 기본 정보.</p>
    <span class="selly-card__arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
  </a>
</div>

<script>
(function () {
  document.documentElement.classList.add('selly-js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) 히어로 포인터 글로우 — 마우스를 따라 빛이 흐름
  var hero = document.getElementById('selly-hero');
  if (hero && !reduced) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
    });
  }

  // 2) 아카이브 지표 카운트업
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduced) { el.textContent = target; return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var stats = document.querySelectorAll('.selly-stat__num');
  if ('IntersectionObserver' in window) {
    var statSeen = false;
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !statSeen) {
          statSeen = true;
          stats.forEach(countUp);
          statObs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (stats.length) statObs.observe(stats[0]);
  } else {
    stats.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  // 3) 스크롤 리빌
  var reveals = document.querySelectorAll('.selly-reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          revObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // 4) 카드 3D 틸트 (데스크톱 포인터 환경에서만)
  if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.selly-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(700px) rotateX(' + (-py * 6).toFixed(2) + 'deg)' +
          ' rotateY(' + (px * 6).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }
})();
</script>
