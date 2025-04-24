import { topics } from '@/data/topics';

export type TopicResult = {
  textDe: string;
  textEn: string;
  grammarFocus?: string[];
  keyVocabulary?: string[];
};

/**
 * Gets a random topic based on user's language level
 * @param level Language level (A1-C2)
 * @returns A random topic appropriate for the level with both German and English text
 */
export function getRandomTopic(level: string): TopicResult {
  // Filter topics by level
  const filteredTopics = topics.filter(topic => topic.level === level);
  
  // If no topics for the specific level, fallback to any level
  const availableTopics = filteredTopics.length > 0 ? filteredTopics : topics;
  
  // Get a random topic
  const randomIndex = Math.floor(Math.random() * availableTopics.length);
  const topic = availableTopics[randomIndex];
  
  return {
    textDe: topic.textDe,
    textEn: topic.textEn,
    grammarFocus: topic.grammarFocus,
    keyVocabulary: topic.keyVocabulary,
  };
}

/**
 * Gets a list of topics filtered by level and/or category
 * @param level Language level (A1-C2), or 'all' for all levels
 * @param category Optional category to filter by
 * @returns Array of filtered topics
 */
export function getFilteredTopics(level: string, category?: string) {
  let filteredTopics = [...topics];
  
  // Filter by level
  if (level !== 'all') {
    filteredTopics = filteredTopics.filter(topic => topic.level === level);
  }
  
  // Filter by category if provided
  if (category) {
    filteredTopics = filteredTopics.filter(topic => topic.category === category);
  }
  
  return filteredTopics;
}