import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { RefreshCw } from 'lucide-react-native';

type TopicCardProps = {
  topicDe: string;
  topicEn: string;
  grammarFocus?: string[];
  keyVocabulary?: string[];
  onRefresh: () => void;
};

export default function TopicCard({ topicDe, topicEn, grammarFocus, keyVocabulary, onRefresh }: TopicCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sprechthema</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <RefreshCw size={20} color={Colors.primary.main} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.topicContainer}>
        <Text style={styles.topicTextDe}>{topicDe}</Text>
        <Text style={styles.topicTextEn}>{topicEn}</Text>
      </View>
      
      {(grammarFocus || keyVocabulary) && (
        <View style={styles.helpSection}>
          {grammarFocus && (
            <View style={styles.helpItem}>
              <Text style={styles.helpTitle}>Grammatik im Fokus:</Text>
              <Text style={styles.helpText}>{grammarFocus.join(', ')}</Text>
            </View>
          )}
          
          {keyVocabulary && (
            <View style={styles.helpItem}>
              <Text style={styles.helpTitle}>Wichtige Vokabeln:</Text>
              <Text style={styles.helpText}>{keyVocabulary.join(', ')}</Text>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>Klicken Sie auf "Aktualisieren" für ein neues Thema.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.common.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
  },
  refreshButton: {
    backgroundColor: Colors.background.light,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  topicContainer: {
    backgroundColor: Colors.accent.light,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.main,
  },
  topicTextDe: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 28,
  },
  topicTextEn: {
    ...Fonts.body,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  helpSection: {
    backgroundColor: Colors.background.light,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  helpItem: {
    marginBottom: 12,
  },
  helpTitle: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.small,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  helpText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
  tipContainer: {
    alignItems: 'center',
  },
  tipText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
});