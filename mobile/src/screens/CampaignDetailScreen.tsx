import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import HeroSection from '../components/HeroSection';
import StrategySection from '../components/StrategySection';
import CalendarGrid from '../components/CalendarGrid';
import PriceTable from '../components/PriceTable';
import BudgetChart from '../components/BudgetChart';
import KpiGrid from '../components/KpiGrid';
import { fetchCalendarEntries } from '../services/sheetService';
import { TimelineEntry } from '../types/campaign';

export default function CampaignDetailScreen() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCalendarEntries()
      .then(data => setEntries(data))
      .catch(err => setError(err.message || '데이터 로드 실패'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#F25C05" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>{error}</Text>
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
          { label: '일평균 집행', value: '8.9만원' },
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
        { label: '지속성', title: 'D+7 / D+14 재발주율', description: '이벤트 구매자가 정상가로 돌아오는지.' },
        { label: '순효과 검증', title: '도착일 DiD', description: '화·수·목 vs 금·토 도착 매출 변화로 순효과 분리.' },
      ]} />
      <Text style={styles.footer}>
        데이터 기준: 기본판매가·매입원가는 raw 주문 데이터(2026.06.08~06.21) 야채·채소 카테고리.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40, backgroundColor: '#FFFDF8' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { color: '#B4430A', fontSize: 16, textAlign: 'center' },
  footer: { color: '#8c8276', fontSize: 12, marginTop: 24, lineHeight: 18 },
});
