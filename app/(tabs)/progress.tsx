import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import {
  Calendar,
  ChartBar as BarChart3,
  SquareCheck as CheckSquare,
} from 'lucide-react-native';
import LevelBadge from '@/components/ui/LevelBadge';
import ProgressChart from '@/components/progress/ProgressChart';
import PracticeHistoryItem from '@/components/progress/PracticeHistoryItem';

export default function ProgressScreen() {
  const [activeTab, setActiveTab] = useState('stats');

  const stats = {
    totalPractices: 32,
    totalMinutes: 84,
    averageScore: 78,
    currentStreak: 3,
    bestStreak: 7,
    wordsUsed: 435,
    commonMistakes: [
      { word: 'pronunciation', count: 7 },
      { word: 'definitely', count: 5 },
      { word: 'receive', count: 4 },
    ],
  };

  const practiceHistory = [
    {
      id: '1',
      date: 'Today',
      topic: 'My Favorite Hobby',
      duration: 60,
      score: 82,
      level: 'B1',
    },
    {
      id: '2',
      date: 'Yesterday',
      topic: 'Technology in Everyday Life',
      duration: 120,
      score: 76,
      level: 'B1',
    },
    {
      id: '3',
      date: '2 days ago',
      topic: 'My Dream Vacation',
      duration: 60,
      score: 79,
      level: 'B1',
    },
    {
      id: '4',
      date: '3 days ago',
      topic: 'Future Career Goals',
      duration: 30,
      score: 73,
      level: 'B1',
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first practice session',
      isCompleted: true,
      icon: '🥇',
    },
    {
      id: '2',
      title: '3-Day Streak',
      description: 'Practice three days in a row',
      isCompleted: true,
      icon: '🔥',
    },
    {
      id: '3',
      title: 'Word Explorer',
      description: 'Use 500 unique words in your practices',
      isCompleted: false,
      progress: 435,
      total: 500,
      icon: '📚',
    },
    {
      id: '4',
      title: 'Pro Speaker',
      description: 'Get a score above 90% in any practice',
      isCompleted: false,
      icon: '🎯',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>

        <FlatList
          data={[
            { id: 'stats', label: 'Statistics', icon: BarChart3 },
            { id: 'history', label: 'History', icon: Calendar },
            { id: 'achievements', label: 'Achievements', icon: CheckSquare },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === item.id && styles.activeTab]}
              onPress={() => setActiveTab(item.id)}
            >
              <item.icon
                size={20}
                color={
                  activeTab === item.id ? Colors.primary.main : Colors.grey[500]
                }
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === item.id && styles.activeTabText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.content}>
        {activeTab === 'stats' && (
          <View style={styles.statsContainer}>
            <View style={styles.summary}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{stats.totalPractices}</Text>
                <Text style={styles.summaryLabel}>Practices</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{stats.totalMinutes}</Text>
                <Text style={styles.summaryLabel}>Minutes</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{stats.averageScore}%</Text>
                <Text style={styles.summaryLabel}>Avg. Score</Text>
              </View>
            </View>

            <View style={styles.chartSection}>
              <Text style={styles.sectionTitle}>Speaking Progress</Text>
              <ProgressChart />
            </View>

            <View style={styles.mistakesSection}>
              <Text style={styles.sectionTitle}>Common Mistakes</Text>
              {stats.commonMistakes.map((mistake, index) => (
                <View key={index} style={styles.mistakeItem}>
                  <Text style={styles.mistakeWord}>{mistake.word}</Text>
                  <Text style={styles.mistakeCount}>{mistake.count} times</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.historyContainer}>
            {practiceHistory.map((practice) => (
              <PracticeHistoryItem key={practice.id} practice={practice} />
            ))}
          </View>
        )}

        {activeTab === 'achievements' && (
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementHeader}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementDetails}>
                    <Text style={styles.achievementTitle}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDesc}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.isCompleted ? (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>Completed</Text>
                    </View>
                  ) : (
                    <View style={styles.pendingBadge}>
                      <Text style={styles.pendingText}>In Progress</Text>
                    </View>
                  )}
                </View>

                {!achievement.isCompleted && achievement.progress && (
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${
                            (achievement.progress / achievement.total) * 100
                          }%`,
                        },
                      ]}
                    />
                    <Text style={styles.progressText}>
                      {achievement.progress}/{achievement.total}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: Colors.background.default,
  },
  title: {
    fontFamily: Fonts.heading.fontFamily,
    fontWeight: '600',
    fontSize: Fonts.sizes.xxxl,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    marginRight: -20, // To offset the last item's right margin
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.primary.light,
  },
  tabText: {
    fontFamily: Fonts.body.fontFamily,
    fontWeight: '400',
    fontSize: Fonts.sizes.small,
    color: Colors.grey[600],
    marginLeft: 8,
  },
  activeTabText: {
    color: Colors.primary.main,
    fontFamily: Fonts.bodyBold.fontFamily,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flex: 1,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.common.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontFamily: Fonts.heading.fontFamily,
    fontWeight: '600',
    fontSize: Fonts.sizes.xxl,
    color: Colors.primary.main,
  },
  summaryLabel: {
    fontFamily: Fonts.body.fontFamily,
    fontWeight: '400',
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
  chartSection: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.subheading.fontFamily,
    fontWeight: '600',
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  mistakesSection: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
  },
  mistakeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  mistakeWord: {
    fontFamily: Fonts.bodyBold.fontFamily,
    fontWeight: '600',
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  mistakeCount: {
    fontFamily: Fonts.body.fontFamily,
    fontWeight: '400',
    fontSize: Fonts.sizes.small,
    color: Colors.error.main,
  },
  historyContainer: {
    flex: 1,
  },
  achievementsContainer: {
    flex: 1,
  },
  achievementCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary.main,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: Fonts.subheading.fontFamily,
    fontWeight: '600',
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  achievementDesc: {
    fontFamily: Fonts.body.fontFamily,
    fontWeight: '400',
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
  completedBadge: {
    backgroundColor: Colors.success.light,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  completedText: {
    fontFamily: Fonts.bodyBold.fontFamily,
    fontWeight: '600',
    fontSize: Fonts.sizes.xs,
    color: Colors.success.dark,
  },
  pendingBadge: {
    backgroundColor: Colors.grey[200],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  pendingText: {
    fontFamily: Fonts.body.fontFamily,
    fontWeight: '400',
    fontSize: Fonts.sizes.xs,
    color: Colors.grey[600],
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.grey[200],
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 4,
  },
  progressText: {
    fontFamily: Fonts.body.fontFamily,
    fontWeight: '400',
    fontSize: Fonts.sizes.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 16,
  },
});
