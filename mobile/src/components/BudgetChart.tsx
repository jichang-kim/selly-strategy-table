import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

type Props = {
  labels: string[];
  values: number[];
};

export default function BudgetChart({ labels, values }: Props) {
  const screenWidth = Dimensions.get('window').width - 48;
  return (
    <View style={styles.chartBox}>
      <BarChart
        data={{ labels, datasets: [{ data: values }] }}
        width={screenWidth}
        height={260}
        yAxisLabel=""
        fromZero
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => '#F25C05',
          labelColor: () => '#8C8276',
          style: { borderRadius: 14 },
        }}
        yAxisSuffix=""
        style={{ borderRadius: 14 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartBox: { marginTop: 24, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#ebe5da', backgroundColor: '#fff' },
});
