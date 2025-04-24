/**
 * Topic data structure for German speaking practice
 */

export type Topic = {
  id: string;
  textDe: string; // German text
  textEn: string; // English translation
  level: string;
  category: string;
  isPremium: boolean;
  grammarFocus?: string[];
  keyVocabulary?: string[];
};

export const topics: Topic[] = [
  // A1 Level Topics (Beginner)
  {
    id: 'a1-1',
    textDe: 'Beschreibe deine Familie',
    textEn: 'Describe your family',
    level: 'A1',
    category: 'Alltag',
    isPremium: false,
    grammarFocus: ['Possessivpronomen', 'Präsens'],
    keyVocabulary: ['die Familie', 'die Eltern', 'die Geschwister', 'der Bruder', 'die Schwester'],
  },
  {
    id: 'a1-2',
    textDe: 'Erzähle von deinem Tagesablauf',
    textEn: 'Talk about your daily routine',
    level: 'A1',
    category: 'Alltag',
    isPremium: false,
    grammarFocus: ['Trennbare Verben', 'Zeitangaben'],
    keyVocabulary: ['aufstehen', 'frühstücken', 'arbeiten', 'schlafen gehen'],
  },
  
  // A2 Level Topics (Elementary)
  {
    id: 'a2-1',
    textDe: 'Was sind deine Hobbys?',
    textEn: 'What are your hobbies?',
    level: 'A2',
    category: 'Freizeit',
    isPremium: false,
    grammarFocus: ['Modalverben', 'Akkusativ'],
    keyVocabulary: ['Hobby', 'Sport treiben', 'lesen', 'Musik hören', 'reisen'],
  },
  
  // B1 Level Topics (Intermediate)
  {
    id: 'b1-1',
    textDe: 'Vor- und Nachteile von sozialen Medien',
    textEn: 'Advantages and disadvantages of social media',
    level: 'B1',
    category: 'Technologie',
    isPremium: false,
    grammarFocus: ['Nebensätze mit weil/dass', 'Komparativ'],
    keyVocabulary: ['soziale Medien', 'Kommunikation', 'Datenschutz', 'Abhängigkeit'],
  },
  
  // B2 Level Topics (Upper Intermediate)
  {
    id: 'b2-1',
    textDe: 'Klimawandel und Umweltschutz',
    textEn: 'Climate change and environmental protection',
    level: 'B2',
    category: 'Umwelt',
    isPremium: true,
    grammarFocus: ['Konjunktiv II', 'Passiv'],
    keyVocabulary: ['Klimawandel', 'Umweltschutz', 'nachhaltig', 'Ressourcen'],
  },
  
  // C1 Level Topics (Advanced)
  {
    id: 'c1-1',
    textDe: 'Die Rolle der künstlichen Intelligenz in der modernen Gesellschaft',
    textEn: 'The role of artificial intelligence in modern society',
    level: 'C1',
    category: 'Technologie',
    isPremium: true,
    grammarFocus: ['Nominalisierung', 'Partizipialkonstruktionen'],
    keyVocabulary: ['künstliche Intelligenz', 'Automatisierung', 'Ethik', 'Entwicklung'],
  },
  
  // Add more topics as needed...
];

export const categories = [
  { id: '1', name: 'Alltag', icon: '🏠', nameEn: 'Daily Life' },
  { id: '2', name: 'Reisen', icon: '✈️', nameEn: 'Travel' },
  { id: '3', name: 'Beruf', icon: '💼', nameEn: 'Career' },
  { id: '4', name: 'Bildung', icon: '🎓', nameEn: 'Education' },
  { id: '5', name: 'Essen', icon: '🍽️', nameEn: 'Food' },
  { id: '6', name: 'Kultur', icon: '🎭', nameEn: 'Culture' },
  { id: '7', name: 'Technologie', icon: '💻', nameEn: 'Technology' },
  { id: '8', name: 'Gesundheit', icon: '🏥', nameEn: 'Health' },
];