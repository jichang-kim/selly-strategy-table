import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { findCompanySection } from '../data/content';

type Props = NativeStackScreenProps<RootStackParamList, 'CompanyDetail'>;

export default function CompanyDetailScreen({ route }: Props) {
  const section = findCompanySection(route.params.id);

  if (!section) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>해당 항목을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      <Text style={styles.summary}>{section.summary}</Text>
      <Text style={styles.details}>{section.details}</Text>
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
  },
});
