export type ReportItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  dashboardPath: string;
};

export type ResearchItem = {
  id: string;
  title: string;
  summary: string;
  details: string;
  dashboardPath: string;
};

export type CompanyItem = {
  id: string;
  title: string;
  summary: string;
  details: string;
};

export type EventItem = {
  id: string;
  title: string;
  summary: string;
  details: string;
  url: string;
};

export type JournalItem = {
  id: string;
  title: string;
  summary: string;
  details: string;
};

export const companySections: CompanyItem[] = [
  {
    id: 'overview',
    title: '회사 개요',
    summary: '식자재쿡과 브랜드쿡을 연결하는 외식업 통합 운영 플랫폼입니다.',
    details:
      '부산 기반의 식자재 공급·물류 법인과 IT 플랫폼 법인이 결합하여, 외식업 창업부터 운영까지 AI 기반 전 과정을 지원합니다.',
  },
  {
    id: 'problem',
    title: '문제 인식',
    summary: '외식업 창업의 파편화와 데이터 기반 관리 부재를 해결해야 합니다.',
    details:
      '자영업 시장 불안정, 창업 준비 분절, 재고·발주 관리 미흡이 소상공인과 가맹본부의 성장에 큰 제약이 됩니다.',
  },
  {
    id: 'solution',
    title: '솔루션',
    summary: '통합 발주, 전용상품, AI 운영 지원으로 외식업의 운영 효율을 높입니다.',
    details:
      '식자재쿡과 브랜드쿡을 통해 전용 상품, 자동발주, AI 예측 주문 등으로 소매업자의 물류·구매 비용과 운영 부담을 줄입니다.',
  },
  {
    id: 'positioning',
    title: '경쟁 포지션',
    summary: '자산 보유형 유통과 데이터 SaaS의 결합으로 차별화합니다.',
    details:
      '직접 구매·유통 역량에 플랫폼 데이터 분석을 결합해 가맹본부 전용 상품, 물류, QSC 관리까지 통합 제공하는 점이 경쟁사 대비 핵심 우위입니다.',
  },
  {
    id: 'growth',
    title: '성장 전략',
    summary: '파트너 생태계 확장과 AI 고도화로 외식업 운영 생태계를 강화합니다.',
    details:
      '지역 물류 인프라, 협력사 네트워크, RAG 기반 맞춤형 운영 제안, 가맹사업 인큐베이팅을 통해 비즈니스 확장 전략을 구체화합니다.',
  },
];

export const events: EventItem[] = [
  {
    id: 'planning-fair',
    title: '식자재쿡 기획전 (26년 6월)',
    summary: '26년 6월 식자재쿡 기획전 운영 시트를 확인하고 편집할 수 있는 항목입니다.',
    details:
      'Google 스프레드시트 기반 기획전 운영 시트로, 운영 일정·SKU·성과를 실시간으로 관리할 수 있습니다.',
    url: 'https://docs.google.com/spreadsheets/d/1Az9d9L1KoOp_m0h3gVCITBxOhIjP-4ex5XxdGopHwbc/edit?gid=669107159#gid=669107159',
  },
  {
    id: 'timesale-planning',
    title: '식자재쿡 타임세일 기획전',
    summary: '타임세일 캠페인 운영 시트를 열고 현황을 점검합니다.',
    details:
      '타임세일 전용 Google 스프레드시트로 행사 진행 현황과 판매 데이터를 실시간으로 모니터링합니다.',
    url: 'https://docs.google.com/spreadsheets/d/1VX7kVN1upX1qFhitwQw46ukmH6FY-Iu2oAo8llyjAsA/edit?gid=2136169720#gid=2136169720',
  },
  {
    id: 'veggie-timesale',
    title: '야채 타임세일 최저가 캠페인',
    summary: '야채 타임세일 캠페인 대시보드를 모바일로 쉽게 열람합니다.',
    details:
      '캠페인 실적을 시각화한 대시보드로, 가격 전략과 성과 지표를 한눈에 확인할 수 있습니다.',
    url: '/assets/dashboards/veggie-timesale.html',
  },
];

export const reports: ReportItem[] = [
  {
    id: 'margin-purchase',
    title: '매출·마진·매입 통합분석',
    category: '정기 리포트',
    summary: 'VAT 보정 마진, 매입 구조, 현금흐름(CCC)을 한 화면에서 통합 점검하는 정기 대시보드입니다.',
    details:
      '전사 마진과 매입 구조를 동시에 분석하여 즉시결제 매입처 비중이 만드는 구조적 현금 압력을 함께 살펴봅니다.',
    dashboardPath: '/assets/dashboards/foodcook-margin-purchase.html',
  },
  {
    id: 'user-analysis',
    title: '사용자 분석',
    category: '정기 리포트',
    summary: '가입 사용자 활성·휴면 세그먼트, 재구매·이탈, 시간대별 매출 패턴을 주기적으로 집계합니다.',
    details:
      '신규 가입부터 재구매 전환까지 사용자 행동을 세그먼트별로 분석하며, 이벤트 전후 변화까지 모니터링합니다.',
    dashboardPath: '/assets/dashboards/user-analysis.html',
  },
  {
    id: 'april-campaign',
    title: '4월 기획전 분석',
    category: '주제·이벤트 분석',
    summary: '4월 기획전의 매출 기여, 전월 대비 변화, SKU·기간별 성과를 분석한 이벤트 리포트입니다.',
    details:
      '캠페인 성과를 중심으로 SKU별 판매 트렌드와 기간별 매출 동향을 확인할 수 있는 대시보드입니다.',
    dashboardPath: '/assets/dashboards/april-campaign.html',
  },
];

export const researches: ResearchItem[] = [
  {
    id: 'bm-comparison',
    title: '비즈니스 모델(BM) 비교',
    summary:
      '식자재쿡과 경쟁사의 비즈니스 모델을 자산 보유형 유통 vs 자산 경량 SaaS 관점에서 비교합니다.',
    details:
      '경쟁사의 수익 구조, 플랫폼 차별점, 대체 불가능한 자산 우위 등을 CSO 관점에서 정리합니다.',
    dashboardPath: '/assets/dashboards/bm-comparison.html',
  },
  {
    id: 'yeongnam-analysis',
    title: '영남권 시장분석',
    summary: '영남권 시장 구조, 품목 믹스 변화, 지역별 특성을 분석한 리서치입니다.',
    details:
      '주력 지역인 영남권의 신선·가공 품목 믹스, 경쟁 환경, 지역별 운영 전략까지 함께 살펴봅니다.',
    dashboardPath: '/assets/dashboards/yeongnam-analysis.html',
  },
];

export const journals: JournalItem[] = [
  {
    id: 'business-context-memo',
    title: '사업 컨텍스트 메모',
    summary: '식자재쿡 사업 컨텍스트, CSO 관점 핵심 가치와 운영 방향을 아카이빙합니다.',
    details:
      '부산 기반의 외식업 통합 플랫폼 식자재쿡의 사업 성격, 고객 가치, 경쟁 포지셔닝, 성장 전략을 정리한 컨텍스트 메모입니다.',
  },
];

export const findCompanySection = (id: string) => companySections.find(item => item.id === id);
export const findEvent = (id: string) => events.find(item => item.id === id);
export const findReport = (id: string) => reports.find(report => report.id === id);
export const findResearch = (id: string) => researches.find(research => research.id === id);
export const findJournal = (id: string) => journals.find(journal => journal.id === id);
