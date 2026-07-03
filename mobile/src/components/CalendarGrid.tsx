import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimelineEntry } from '../types/campaign';

type Props = { entries: TimelineEntry[] };

const weekdayOrder = ['월', '화', '수'];

function formatDateLabel(date: string | null) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${Number(month)}/${Number(day)}`;
}

function groupByWeek(entries: TimelineEntry[]) {
  const groups: Record<string, TimelineEntry[]> = {};
  entries.forEach(entry => {
    const weekKey = entry.orderDate?.slice(0, 10) ?? '';
    if (!weekKey) return;
    const groupKey = `${weekKey}`;
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(entry);
  });
  return Object.values(groups);
}

export default function CalendarGrid({ entries }: Props) {
  const grouped = groupByWeek(entries);
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>실행 캘린더</Text>
      <Text style={styles.lead}>월·화·수 주문으로 화·수·목 도착을 채웁니다. 블록버스터는 월요일에 집중합니다.</Text>
      <View style={styles.headerRow}>
        {weekdayOrder.map(day => (
          <Text key={day} style={styles.headerCell}>{day}</Text>
        ))}
      </View>
      {grouped.map((week, index) => (
        <View key={index} style={styles.weekRow}>
          {weekdayOrder.map(day => {
            const entry = week.find(item => item.orderWeekday === day);
            return entry ? <CalendarCell key={entry.id} entry={entry} /> : <View key={day} style={styles.emptyCell} />;
          })}
        </View>
      ))}
    </View>
  );
}

function CalendarCell({ entry }: { entry: TimelineEntry }) {
  const isBlockbuster = entry.type?.includes('블록버스터');
  return (
    <View style={[styles.cell, isBlockbuster && styles.cellHighlight]}>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{formatDateLabel(entry.orderDate)}</Text>
        <Text style={styles.arrivalText}>→{formatDateLabel(entry.arrivalDate)} 도착</Text>
      </View>
      <Text style={styles.itemName}>{entry.item}</Text>
      <Text style={styles.priceText}>{entry.eventPrice ? `₩${entry.eventPrice.toLocaleString()}` : '—'}</Text>
      <Text style={styles.detailText}>한정 {entry.quantity ?? '—'}개 · {entry.discount ? `${Math.round(entry.discount * 100)}%↓` : '—'}</Text>
      {isBlockbuster && <Text style={styles.tag}>블록버스터</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  sectionTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  lead: { color: '#6f675e', fontSize: 15, lineHeight: 22, marginBottom: 14 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  headerCell: { width: '32%', color: '#8c8276', fontWeight: '700', fontSize: 13 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cell: { width: '32%', backgroundColor: '#fff', borderColor: '#ebe5da', borderWidth: 1, borderRadius: 12, padding: 12, minHeight: 120 },
  cellHighlight: { backgroundColor: '#FFF6EF', borderColor: '#F25C05' },
  emptyCell: { width: '32%', minHeight: 120, borderWidth: 1, borderColor: '#ebe5da', borderRadius: 12, backgroundColor: 'transparent' },
  dateRow: { marginBottom: 8 },
  dateText: { color: '#757060', fontSize: 12 },
  arrivalText: { color: '#b7ae9f', fontSize: 11 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#211C15', marginBottom: 6 },
  priceText: { fontSize: 14, fontWeight: '800', color: '#211C15', marginBottom: 4 },
  detailText: { fontSize: 12, color: '#8c8276', marginBottom: 6 },
  tag: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, backgroundColor: '#F25C05', color: '#fff', fontSize: 11, fontWeight: '700' },
});
