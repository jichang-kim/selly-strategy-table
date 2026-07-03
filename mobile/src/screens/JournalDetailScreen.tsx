import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { findJournal } from '../data/content';

type Props = NativeStackScreenProps<RootStackParamList, 'JournalDetail'>;

export default function JournalDetailScreen({ route }: Props) {
  const journal = findJournal(route.params.id);

  if (!journal) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>해당 저널을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{journal.title}</Text>
      <Text style={styles.summary}>{journal.summary}</Text>
      <Text style={styles.details}>{journal.details}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
