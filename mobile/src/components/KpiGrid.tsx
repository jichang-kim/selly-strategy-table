import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Kpi = { label: string; title: string; description: string };

type Props = { items: Kpi[] };

export default function KpiGrid({ items }: Props) {
  return (
    <View style={styles.grid}>
      {items.map(item => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.tag}>{item.label}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 24 },
  card: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ebe5da', borderRadius: 14, padding: 16 },
  tag: { color: '#F25C05', fontWeight: '700', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  desc: { fontSize: 13, color: '#6f675e', lineHeight: 20 },
});
