import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StrategySection() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>전략</Text>
      <Text style={styles.title}>왜 이 캠페인인가</Text>
      <Text style={styles.lead}>최소주문 0원·자정 마감으로 편의성은 1등이지만, "반드시 우리부터"라는 이유가 약합니다. 그 빈틈을 야채 최저가로 메웁니다.</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>우리의 약점</Text>
          <Text style={styles.cardTag}>현재</Text>
          <Text style={styles.list}>• 점주는 낮에 타 플랫폼·마트에서 메인 발주를 끝냄</Text>
          <Text style={styles.list}>• 우리는 빠뜨린 품목만 늦게 담는 보조 채널 → 낮은 객단가</Text>
          <Text style={styles.list}>• 주문이 흩어져 물류 효율 상승 어려움</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>전환 레버</Text>
          <Text style={styles.cardTag}>목표</Text>
          <Text style={styles.list}>• 경쟁사 마감 이전에 최저가를 먼저 노출</Text>
          <Text style={styles.list}>• 오후 2시 오픈으로 발주 의사결정을 당김</Text>
          <Text style={styles.list}>• 낮엔 우리부터, 밤까지 우리에서</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  eyebrow: { color: '#F25C05', fontSize: 13, fontWeight: '700', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  lead: { color: '#6f675e', fontSize: 15, lineHeight: 22, marginBottom: 18 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', gap: 14 },
  card: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ece3d9', borderRadius: 14, padding: 18 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardTag: { alignSelf: 'flex-start', backgroundColor: '#FCE8D7', color: '#B4430A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, fontSize: 11, fontWeight: '700', marginBottom: 10 },
  list: { fontSize: 14, color: '#3a3328', lineHeight: 20, marginBottom: 6 },
});
