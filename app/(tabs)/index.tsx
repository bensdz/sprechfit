import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Mic } from 'lucide-react-native';
import TopicCard from '@/components/practice/TopicCard';
import RecordingModal from '@/components/practice/RecordingModal';
import LevelBadge from '@/components/ui/LevelBadge';
import { getRandomTopic, TopicResult } from '@/utils/topicsGenerator';
import { getUserLevel } from '@/utils/userPreferences';
import React from 'react';

export default function PracticeScreen() {
  const [currentTopic, setCurrentTopic] = useState<TopicResult | null>(null);
  const [userLevel, setUserLevel] = useState<string>('B1');
  const [selectedTime, setSelectedTime] = useState<number>(60);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [streakCount] = useState<number>(3); // setStreakCount was unused

  useEffect(() => {
    const loadUserLevel = async () => {
      const level = await getUserLevel();
      if (level) setUserLevel(level);
    };

    loadUserLevel();
    generateNewTopic();
  }, [userLevel]);

  const generateNewTopic = () => {
    const topic = getRandomTopic(userLevel);
    setCurrentTopic(topic);
  };

  const handleStartPractice = () => {
    setModalVisible(true);
  };

  const timeOptions = [
    { value: 30, label: '30s' },
    { value: 60, label: '1m' },
    { value: 120, label: '2m' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[Colors.primary.main, Colors.primary.dark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Bereit zum Üben?</Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Dein Niveau: </Text>
            <LevelBadge level={userLevel} />
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>{streakCount} Tage Serie! 🔥</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {currentTopic && (
          <TopicCard
            topicDe={currentTopic.textDe}
            topicEn={currentTopic.textEn}
            grammarFocus={currentTopic.grammarFocus}
            keyVocabulary={currentTopic.keyVocabulary}
            onRefresh={generateNewTopic}
          />
        )}

        <View style={styles.timeSelectionContainer}>
          <Text style={styles.sectionTitle}>Übungsdauer</Text>
          <View style={styles.timeOptions}>
            {timeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.timeOption,
                  selectedTime === option.value && styles.timeOptionSelected,
                ]}
                onPress={() => setSelectedTime(option.value)}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    selectedTime === option.value &&
                      styles.timeOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartPractice}
        >
          <Mic size={24} color={Colors.primary.contrast} />
          <Text style={styles.startButtonText}>Aufnahme starten</Text>
        </TouchableOpacity>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>Tipp des Tages</Text>
          <Text style={styles.tipText}>
            Verwenden Sie beschreibende Adjektive und vermeiden Sie Füllwörter
            wie "äh" und "ähm".
          </Text>
        </View>
      </View>

      <RecordingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        topic={currentTopic?.textDe || ''}
        // grammarFocus={currentTopic.grammarFocus || []}
        // keyVocabulary={currentTopic.keyVocabulary || []}
        durationSeconds={selectedTime}
      />
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
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  welcomeText: {
    ...Fonts.heading,
    fontWeight: 'bold', // Ensure fontWeight is a valid TextStyle value
    fontSize: Fonts.sizes.xxxl,
    color: Colors.primary.contrast,
    marginBottom: 10,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.primary.contrast,
  },
  streakContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  streakText: {
    ...Fonts.bodyBold,
    fontWeight: 'bold',
    fontSize: Fonts.sizes.small,
    color: Colors.primary.contrast,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    ...Fonts.subheading,
    fontWeight: 'bold',
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  timeSelectionContainer: {
    marginBottom: 24,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeOption: {
    flex: 1,
    backgroundColor: Colors.background.paper,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  timeOptionSelected: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.main,
  },
  timeOptionText: {
    ...Fonts.body,
    fontWeight: 'normal',
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  timeOptionTextSelected: {
    ...Fonts.bodyBold,
    fontWeight: 'bold',
    color: Colors.primary.dark,
  },
  startButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: Colors.common.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  startButtonText: {
    ...Fonts.bodyBold,
    fontWeight: 'bold',
    fontSize: Fonts.sizes.large,
    color: Colors.primary.contrast,
    marginLeft: 8,
  },
  tipContainer: {
    marginLeft: 8,
    backgroundColor: Colors.background.paper,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  tipTitle: {
    ...Fonts.bodyBold,
    fontWeight: 'bold',
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  tipText: {
    ...Fonts.body,
    fontWeight: 'normal',
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
