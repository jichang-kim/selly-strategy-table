import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MetaItem = { label: string; value: string };
type StatItem = { label: string; value: string; accent?: boolean };

type Props = {
  title: string;
  subtitle: string;
  meta: MetaItem[];
  stats: StatItem[];
};

export default function HeroSection({ title, subtitle, meta, stats }: Props) {
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
  container: { paddingVertical: 24 },
  title: { fontSize: 34, fontWeight: '800', color: '#211C15', marginBottom: 10 },
  subtitle: { fontSize: 16, lineHeight: 24, color: '#3a3328', marginBottom: 18 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  metaItem: { marginRight: 16 },
  metaLabel: { color: '#8c8276', fontSize: 12 },
  metaValue: { color: '#211C15', fontSize: 14, fontWeight: '700' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ece3d9', borderRadius: 14, padding: 16 },
  statAccent: { backgroundColor: '#F25C05', borderColor: '#F25C05' },
  statLabel: { color: '#8c8276', fontSize: 12 },
  statLabelAccent: { color: '#FFE0CB' },
  statValue: { fontSize: 24, fontWeight: '800', color: '#211C15', marginTop: 6 },
  statValueAccent: { color: '#fff' },
});
