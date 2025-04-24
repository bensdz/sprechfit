import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

type LevelBadgeProps = {
  level: string;
  size?: 'small' | 'medium' | 'large';
};

export default function LevelBadge({ level, size = 'medium' }: LevelBadgeProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1':
        return { bg: '#e1f5fe', text: '#0288d1' };
      case 'A2':
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'B1':
        return { bg: '#fff8e1', text: '#ffa000' };
      case 'B2':
        return { bg: '#fff3e0', text: '#e64a19' };
      case 'C1':
        return { bg: '#e8eaf6', text: '#3949ab' };
      case 'C2':
        return { bg: '#f3e5f5', text: '#7b1fa2' };
      default:
        return { bg: Colors.grey[200], text: Colors.text.secondary };
    }
  };

  const color = getLevelColor(level);
  
  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return {
          container: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
          text: { fontSize: Fonts.sizes.xs },
        };
      case 'large':
        return {
          container: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16 },
          text: { fontSize: Fonts.sizes.medium },
        };
      case 'medium':
      default:
        return {
          container: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
          text: { fontSize: Fonts.sizes.small },
        };
    }
  };
  
  const sizeStyles = getSizeStyles(size);

  return (
    <View style={[styles.container, { backgroundColor: color.bg }, sizeStyles.container]}>
      <Text style={[styles.text, { color: color.text }, sizeStyles.text]}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {
    ...Fonts.bodyBold,
  },
});