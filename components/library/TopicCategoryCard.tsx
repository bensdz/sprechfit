import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Star } from 'lucide-react-native';

type TopicCategoryCardProps = {
  name: string;
  icon: string;
  count: number;
  isPremium: boolean;
  onPress?: () => void;
};

export default function TopicCategoryCard({ name, icon, count, isPremium, onPress }: TopicCategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Star size={12} color={Colors.common.white} />
            </View>
          )}
        </View>
        
        <Text style={styles.count}>
          {count} {count === 1 ? 'topic' : 'topics'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: Colors.warning.main,
    borderRadius: 4,
    padding: 4,
    marginLeft: 8,
  },
  count: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
});