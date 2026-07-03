# React Native 변환 설계서

## 1. 목적

기존 HTML 기반 `야채 타임세일 최저가 캠페인` 자료를 React Native 앱으로 재구현할 때, 화면 구조와 데이터 흐름을 명확히 정리합니다.

## 2. 제안 아키텍처

```
src/
  components/
    HeroSection.tsx
    StrategySection.tsx
    CalendarGrid.tsx
    CalendarCell.tsx
    PriceTable.tsx
    KpiGrid.tsx
    BudgetChart.tsx
    FooterNote.tsx
  screens/
    EventScreen.tsx
    CampaignDetailScreen.tsx
  services/
    sheetService.ts
  types/
    campaign.ts
  navigation/
    AppNavigator.tsx
  utils/
    date.ts
    format.ts
```

## 3. 화면 구성

### 3.1 `EventScreen`
- 캠페인 목록 또는 이벤트 목록을 보여줍니다.
- 각 항목은 `CampaignDetailScreen`으로 이동합니다.
- 빠른 검증용으로 `WebView` 열기 버튼도 추가할 수 있습니다.

### 3.2 `CampaignDetailScreen`
- `HeroSection`
- `StrategySection`
- `CalendarGrid`
- `PriceTable`
- `BudgetChart`
- `KpiGrid`
- `FooterNote`

## 4. 데이터 모델

### 4.1 `types/campaign.ts`

```ts
export type TimelineEntry = {
  id: string;
  orderDate: string; // YYYY-MM-DD
  orderWeekday: '월' | '화' | '수' | '목' | '금' | '토' | '일';
  arrivalDate: string; // YYYY-MM-DD
  arrivalWeekday: '월' | '화' | '수' | '목' | '금' | '토' | '일';
  type: string; // 블록버스터 / 데일리 등
  item: string;
  eventPrice: number | null;
  discount: number | null; // 0.48 같은 소수
  quantity: number | null;
  plannedLoss: number | null;
  status: string; // 예정 / 취소 / 완료
};

export type CampaignSummary = {
  title: string;
  period: string;
  operation: string;
  region: string;
  channel: string;
  discountRate: string;
  entries: TimelineEntry[];
};
```

## 5. 데이터 서비스

### 5.1 `services/sheetService.ts`

```ts
import { TimelineEntry } from '../types/campaign';

const SHEET_ID = '1VX7kVN1upX1qFhitwQw46ukmH6FY-Iu2oAo8llyjAsA';
const GID = '490025442';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

function parseSheetDate(value: string | null): string | null {
  if (!value) return null;
  const match = /Date\((\d+),(\d+),(\d+)\)/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) + 1;
  const day = Number(match[3]);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseRows(rows: any[]): TimelineEntry[] {
  return rows
    .map((row, index) => {
      const cells = row.c || [];
      return {
        id: String(index),
        orderDate: parseSheetDate(cells[1]?.v),
        orderWeekday: cells[2]?.v,
        arrivalDate: parseSheetDate(cells[3]?.v),
        arrivalWeekday: cells[4]?.v,
        type: cells[5]?.v,
        item: cells[6]?.v,
        eventPrice: cells[9]?.v ?? null,
        discount: cells[10]?.v ?? null,
        quantity: cells[12]?.v ?? null,
        plannedLoss: cells[13]?.v ?? null,
        status: cells[19]?.v ?? '예정',
      };
    })
    .filter(entry => entry.item && entry.status !== '취소');
}

export async function fetchCalendarEntries(): Promise<TimelineEntry[]> {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  const match = /google\.visualization\.Query\.setResponse\((.*)\);/s.exec(text);
  if (!match) {
    throw new Error('Google Sheet response parse error');
  }
  const json = JSON.parse(match[1]);
  return parseRows(json.table.rows);
}
```

## 6. 주요 컴포넌트 설계

### 6.1 `HeroSection`
- 타이틀
- 핵심 메시지
- 기간, 운영, 지역, 채널
- KPI 요약 카드

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  stats: { label: string; value: string; accent?: boolean }[];
};

export function HeroSection({ title, subtitle, meta, stats }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.metaRow}>
        {meta.map(item => (
          <View key={item.label} style={styles.metaItem}>
            <Text style={styles.metaLabel}>{item.label}</Text>
            <Text style={styles.metaValue}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.statsGrid}>
        {stats.map(item => (
          <View key={item.label} style={[styles.stat, item.accent && styles.statAccent]}>
            <Text style={[styles.statLabel, item.accent && styles.statLabelAccent]}>{item.label}</Text>
            <Text style={[styles.statValue, item.accent && styles.statValueAccent]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 34, fontWeight: '800', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#4c463f', marginBottom: 20 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
  metaItem: { marginRight: 12 },
  metaLabel: { color: '#757060', fontSize: 12 },
  metaValue: { fontSize: 14, fontWeight: '700' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: { backgroundColor: '#fff', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#eee', minWidth: 140 },
  statAccent: { backgroundColor: '#F25C05', borderColor: '#F25C05' },
  statLabel: { fontSize: 12, color: '#8c8276' },
  statLabelAccent: { color: '#FFE0CB' },
  statValue: { fontSize: 24, fontWeight: '800', marginTop: 6 },
  statValueAccent: { color: '#fff' },
});
```

### 6.2 `CalendarGrid`
- 3열 레이아웃
- `월/화/수` 주문일
- `블록버스터` 강조

```tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TimelineEntry } from '../types/campaign';

type Props = { entries: TimelineEntry[] };

const weekdayOrder = ['월', '화', '수'];

function groupByWeek(entries: TimelineEntry[]) {
  return entries.reduce<Record<string, TimelineEntry[]>>((acc, entry) => {
    const weekStart = entry.orderDate.slice(0, 8) + '01';
    (acc[weekStart] ||= []).push(entry);
    return acc;
  }, {});
}

export function CalendarGrid({ entries }: Props) {
  const weekGroups = Object.values(groupByWeek(entries));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {weekdayOrder.map(day => (
          <Text key={day} style={styles.headerCell}>{day}</Text>
        ))}
      </View>
      {weekGroups.map((week, index) => (
        <View key={index} style={styles.weekRow}>
          {weekdayOrder.map(day => {
            const item = week.find(entry => entry.orderWeekday === day);
            return item ? <CalendarCell key={item.id} entry={item} /> : <View style={styles.emptyCell} />;
          })}
        </View>
      ))}
    </View>
  );
}

function CalendarCell({ entry }: { entry: TimelineEntry }) {
  const highlight = entry.type?.includes('블록버스터');
  return (
    <View style={[styles.cell, highlight && styles.cellHighlight]}>
      <Text style={styles.dateText}>{entry.orderDate.slice(5).replace('-0', '/')}</Text>
      <Text style={styles.arrivalText}>→ {entry.arrivalDate.slice(5).replace('-0', '/')} 도착</Text>
      <Text style={styles.itemName}>{entry.item}</Text>
      <Text style={styles.priceText}>₩{entry.eventPrice?.toLocaleString() ?? '—'}</Text>
      <Text style={styles.detailText}>한정 {entry.quantity ?? '—'}개 · {entry.discount ? `${Math.round(entry.discount * 100)}%↓` : '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  headerCell: { width: '32%', color: '#8c8276', fontWeight: '700', fontSize: 13 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cell: { width: '32%', backgroundColor: '#fff', borderColor: '#ebe5da', borderWidth: 1, borderRadius: 12, padding: 12, minHeight: 110 },
  cellHighlight: { borderColor: '#F25C05', backgroundColor: '#FFF6EF' },
  emptyCell: { width: '32%', minHeight: 110, borderWidth: 1, borderColor: '#ebe5da', borderRadius: 12, backgroundColor: 'transparent' },
  dateText: { color: '#757060', fontSize: 12, marginBottom: 4 },
  arrivalText: { color: '#b7ae9f', fontSize: 11, marginBottom: 8 },
  itemName: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  priceText: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  detailText: { fontSize: 11, color: '#8c8276' },
});
```

### 6.3 `PriceTable`
- 품목, 기본가, 매입원가, 이벤트가, 할인, 손익/개, 역할

```tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type PriceRow = {
  item: string;
  basePrice: number | string;
  costPrice: number | string;
  eventPrice: number | string;
  discount: string;
  margin: string;
  role: string;
};

type Props = { rows: PriceRow[] };

export function PriceTable({ rows }: Props) {
  return (
    <View style={styles.tableWrapper}>
      <View style={styles.row}> 
        {['품목', '기본가', '매입원가', '이벤트가', '할인', '손익/개', '역할'].map(header => (
          <Text key={header} style={[styles.cell, styles.headerText]}>{header}</Text>
        ))}
      </View>
      <ScrollView style={{ maxHeight: 300 }}>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            <Text style={[styles.cell, styles.itemCell]}>{row.item}</Text>
            <Text style={styles.cell}>{row.basePrice}</Text>
            <Text style={styles.cell}>{row.costPrice}</Text>
            <Text style={styles.cell}>{row.eventPrice}</Text>
            <Text style={styles.cell}>{row.discount}</Text>
            <Text style={[styles.cell, row.margin.includes('−') ? styles.negative : styles.positive]}>{row.margin}</Text>
            <Text style={styles.cell}>{row.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tableWrapper: { borderWidth: 1, borderColor: '#e2d9cc', borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff' },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: '14%', padding: 10, fontSize: 12, color: '#3a3328' },
  itemCell: { width: '22%' },
  headerText: { backgroundColor: '#fbf4ea', color: '#8c8276', fontWeight: '700' },
  negative: { color: '#F25C05', fontWeight: '700' },
  positive: { color: '#2F8F3E', fontWeight: '700' },
});
```

### 6.4 `BudgetChart`
- 주차별 손실 상한 막대 차트
- `react-native-chart-kit` 또는 `victory-native`

```tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

type Props = {
  labels: string[];
  values: number[];
};

export function BudgetChart({ labels, values }: Props) {
  const screenWidth = Dimensions.get('window').width - 48;
  return (
    <View style={styles.chartBox}>
      <BarChart
        data={{ labels, datasets: [{ data: values }] }}
        width={screenWidth}
        height={260}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => '#F25C05',
          labelColor: () => '#8C8276',
          style: { borderRadius: 14 },
        }}
        style={{ borderRadius: 14 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2d9cc', borderRadius: 14, padding: 16 },
});
```

### 6.5 `KpiGrid`
- `신규 유입`, `쩌리 탈피`, `지속성`, `순효과 검증`

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Kpi = { label: string; title: string; description: string };

export function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <View style={styles.grid}>
      {items.map(item => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2d9cc', borderRadius: 14, padding: 16 },
  label: { color: '#F25C05', fontWeight: '700', marginBottom: 6 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  desc: { color: '#6f675e', fontSize: 13 },
});
```

## 7. 샘플 화면 구현

### `screens/CampaignDetailScreen.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { HeroSection } from '../components/HeroSection';
import { StrategySection } from '../components/StrategySection';
import { CalendarGrid } from '../components/CalendarGrid';
import { PriceTable } from '../components/PriceTable';
import { BudgetChart } from '../components/BudgetChart';
import { KpiGrid } from '../components/KpiGrid';
import { fetchCalendarEntries } from '../services/sheetService';

export function CampaignDetailScreen() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalendarEntries()
      .then(data => setEntries(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#F25C05" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeroSection
        title="야채 최저가 타임세일"
        subtitle="낮에 우리부터 발주를 시작하게 만드는 캠페인"
        meta={[
          { label: '기간', value: '2026.06.29 ~ 07.31' },
          { label: '운영', value: '월·화·수 14:00 오픈' },
          { label: '지역', value: '영남권' },
          { label: '채널', value: '인스타 + 앱 푸시' },
        ]}
        stats={[
          { label: '행사일', value: '15일' },
          { label: '월 마케팅 예산', value: '150만원' },
          { label: '평균 할인율', value: '~55%', accent: true },
        ]}
      />
      <StrategySection />
      <CalendarGrid entries={entries} />
      <PriceTable rows={[
        { item: '흙대파 1단', basePrice: 2400, costPrice: 1800, eventPrice: 990, discount: '59%', margin: '−810', role: '데일리' },
        { item: '애호박 1개', basePrice: 900, costPrice: 650, eventPrice: 390, discount: '57%', margin: '−260', role: '미끼' },
      ]} />
      <BudgetChart labels={['6/29~', '7/6~', '7/13~', '7/20~', '7/27~']} values={[273500, 281000, 200500, 300600, 276700]} />
      <KpiGrid items={[
        { label: '신규 유입', title: '가입·첫 발주 수', description: '이벤트 기간 신규 사업자 가입과 첫 발주 전환.' },
        { label: '쩌리 탈피', title: '장바구니 동반구매 객단가', description: '이벤트 품목과 함께 담긴 비이벤트 품목 금액.' },
      ]} />
      <Text style={styles.footer}>
        데이터 기준: 기본판매가·매입원가는 raw 주문 데이터(2026.06.08~06.21) 야채·채소 카테고리.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: { color: '#8c8276', fontSize: 12, marginTop: 24, lineHeight: 18 },
});
```

## 8. 핵심 설계 포인트

- 데이터는 Google Sheets JSON을 파싱해서 `TimelineEntry[]`로 변환
- 일정/캘린더 뷰는 `orderWeekday` 기준 3열 구성
- 블록버스터 항목은 강조 스타일 처리
- 예시 코드에서는 컴포넌트 단위로 분리하여 재사용성을 확보
- 초기 검증 단계에서는 `WebView`로 기존 HTML을 불러오고, 이후 네이티브 화면 전환

## 9. 추가 권장 라이브러리

- `expo` / `react-native-cli`
- `@react-navigation/native`
- `react-native-chart-kit` or `victory-native`
- `react-native-webview` (초기 프로토타이핑)
- `@react-native-async-storage/async-storage`

## 10. 적용 순서

1. `expo init` 또는 `npx react-native init`
2. `react-navigation` 설치
3. `src/services/sheetService.ts` 구현
4. `CampaignDetailScreen`과 핵심 컴포넌트 작성
5. `CalendarGrid` + `BudgetChart` 검증
6. 기존 HTML 템플릿과 데이터 매핑 확인

---

이 문서대로 구성하면, 기존 HTML 보고서를 React Native 네이티브 화면으로 단계적으로 변환할 수 있습니다.