import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function ProgressChart() {
  // Mock data for the chart - in a real app, this would come from the user's history
  const weeklyData = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 0 }, // No practice
    { day: 'Thu', score: 78 },
    { day: 'Fri', score: 0 }, // No practice
    { day: 'Sat', score: 81 },
    { day: 'Sun', score: 78 },
  ];
  
  const maxScore = 100; // Maximum possible score
  
  const getBarColor = (score: number) => {
    if (score === 0) return Colors.grey[300];
    if (score < 70) return Colors.error.main;
    if (score < 85) return Colors.warning.main;
    return Colors.success.main;
  };

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {weeklyData.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${item.score}%`,
                    backgroundColor: getBarColor(item.score),
                  }
                ]} 
              />
            </View>
            <Text style={styles.dayLabel}>{item.day}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.success.main }]} />
          <Text style={styles.legendText}>Great (85-100%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.warning.main }]} />
          <Text style={styles.legendText}>Good (70-84%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.error.main }]} />
          <Text style={styles.legendText}>Needs Work (0-69%)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    marginBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    width: 20,
    height: 150,
    backgroundColor: Colors.grey[200],
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 10,
  },
  dayLabel: {
    ...Fonts.body,
    fontSize: Fonts.sizes.xs,
    color: Colors.text.secondary,
    marginTop: 8,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.xs,
    color: Colors.text.secondary,
  },
});