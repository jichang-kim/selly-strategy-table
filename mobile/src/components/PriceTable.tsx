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

export default function PriceTable({ rows }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>가격 산정</Text>
      <Text style={styles.lead}>우리 raw 기본판매가 대비 47~71% 할인. 손실은 마케팅비로 보며, 한정수량 기준 상한을 고정합니다.</Text>
      <View style={styles.headerRow}>
        {['품목', '기본가', '매입원가', '이벤트가', '할인', '손익/개', '역할'].map(header => (
          <Text key={header} style={[styles.cell, styles.headerCell]}>{header}</Text>
        ))}
      </View>
      <ScrollView style={styles.body}>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            <Text style={[styles.cell, styles.itemCell]}>{row.item}</Text>
            <Text style={styles.cell}>{row.basePrice}</Text>
            <Text style={styles.cell}>{row.costPrice}</Text>
            <Text style={styles.cell}>{row.eventPrice}</Text>
            <Text style={styles.cell}>{row.discount}</Text>
            <Text style={[styles.cell, row.margin.startsWith('−') ? styles.negative : styles.positive]}>{row.margin}</Text>
            <Text style={styles.cell}>{row.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, borderWidth: 1, borderColor: '#ebe5da', borderRadius: 14, backgroundColor: '#fff', overflow: 'hidden' },
  sectionTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8, paddingHorizontal: 16, paddingTop: 16 },
  lead: { color: '#6f675e', fontSize: 15, lineHeight: 22, marginBottom: 12, paddingHorizontal: 16 },
  headerRow: { flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1, borderColor: '#ebe5da', paddingHorizontal: 16, paddingBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderColor: '#f6efe4' },
  body: { maxHeight: 240 },
  cell: { width: '15%', fontSize: 12, color: '#3a3328' },
  itemCell: { width: '30%' },
  headerCell: { color: '#8c8276', fontWeight: '700' },
  negative: { color: '#F25C05', fontWeight: '700' },
  positive: { color: '#2F8F3E', fontWeight: '700' },
});
