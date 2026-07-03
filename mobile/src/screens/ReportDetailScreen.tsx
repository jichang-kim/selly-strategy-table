import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { findReport } from '../data/content';

type Props = NativeStackScreenProps<RootStackParamList, 'ReportDetail'>;

export default function ReportDetailScreen({ route, navigation }: Props) {
  const report = findReport(route.params.id);

  if (!report) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>해당 리포트를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>
      <Text style={styles.category}>{report.category}</Text>
      <Text style={styles.summary}>{report.summary}</Text>
      <Text style={styles.details}>{report.details}</Text>
      <Pressable style={styles.button} onPress={() => Linking.openURL(report.dashboardPath)}>
        <Text style={styles.buttonText}>대시보드 보기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFDF8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFDF8',
  },
  emptyText: {
    fontSize: 16,
    color: '#B4430A',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  category: {
    fontSize: 13,
    color: '#9d8d7a',
    marginBottom: 18,
  },
  summary: {
    fontSize: 16,
    color: '#5f564e',
    marginBottom: 18,
  },
  details: {
    fontSize: 15,
    color: '#5f564e',
    lineHeight: 22,
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#F25C05',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
