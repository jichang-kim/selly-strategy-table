import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { findEvent } from '../data/content';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetail'>;

export default function EventDetailScreen({ route }: Props) {
  const event = findEvent(route.params.id);

  if (!event) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>해당 이벤트를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.summary}>{event.summary}</Text>
      <Text style={styles.details}>{event.details}</Text>
      <Pressable style={styles.button} onPress={() => Linking.openURL(event.url)}>
        <Text style={styles.buttonText}>시트 또는 대시보드 보기</Text>
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
