import React from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { reports } from '../data/content';

type Props = NativeStackScreenProps<RootStackParamList, 'Reports'>;

export default function ReportsListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <FlatList
        data={reports}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('ReportDetail', { id: item.id })}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardSummary}>{item.summary}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFDF8',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardCategory: {
    marginTop: 6,
    fontSize: 13,
    color: '#9d8d7a',
  },
  cardSummary: {
    marginTop: 10,
    fontSize: 15,
    color: '#5f564e',
    lineHeight: 22,
  },
  divider: {
    height: 16,
  },
});
