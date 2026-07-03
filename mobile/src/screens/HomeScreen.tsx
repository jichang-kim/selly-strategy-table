import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>전략 테이블 모바일</Text>
      <Text style={styles.description}>리포트·리서치·회사 정보를 모바일에서 빠르게 확인하세요.</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Event')}>
        <Text style={styles.buttonText}>Event</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Company')}>
        <Text style={styles.buttonText}>Company</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Reports')}>
        <Text style={styles.buttonText}>Reports</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Research')}>
        <Text style={styles.buttonText}>Research</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Journal')}>
        <Text style={styles.buttonText}>Journal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFDF8',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6f675e',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#F25C05',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
