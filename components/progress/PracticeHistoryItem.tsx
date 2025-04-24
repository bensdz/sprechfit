import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { ChevronRight } from 'lucide-react-native';
import LevelBadge from '@/components/ui/LevelBadge';

type Practice = {
  id: string;
  date: string;
  topic: string;
  duration: number;
  score: number;
  level: string;
};

type PracticeHistoryItemProps = {
  practice: Practice;
  onPress?: () => void;
};

export default function PracticeHistoryItem({ practice, onPress }: PracticeHistoryItemProps) {
  const getScoreColor = (score: number) => {
    if (score < 70) return Colors.error.main;
    if (score < 85) return Colors.warning.main;
    return Colors.success.main;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{practice.date}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <LevelBadge level={practice.level} size="small" />
          <Text style={[
            styles.score, 
            { color: getScoreColor(practice.score) }
          ]}>
            {practice.score}%
          </Text>
        </View>
        
        <Text style={styles.topic} numberOfLines={2}>
          {practice.topic}
        </Text>
        
        <View style={styles.bottomRow}>
          <Text style={styles.duration}>
            {practice.duration === 30 ? '0:30' : practice.duration === 60 ? '1:00' : '2:00'} min
          </Text>
          <ChevronRight size={16} color={Colors.grey[500]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  dateContainer: {
    backgroundColor: Colors.grey[100],
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  date: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
  content: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  score: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.medium,
  },
  topic: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
});