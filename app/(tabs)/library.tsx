import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Search, Filter, Star } from 'lucide-react-native';
import TopicCategoryCard from '@/components/library/TopicCategoryCard';
import { topics } from '@/data/topics';

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  const levels = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  const categories = [
    { id: '1', name: 'Everyday Life', icon: '🏠', count: 24, isPremium: false },
    { id: '2', name: 'Travel', icon: '✈️', count: 18, isPremium: false },
    { id: '3', name: 'Business', icon: '💼', count: 15, isPremium: true },
    { id: '4', name: 'Academic', icon: '🎓', count: 20, isPremium: true },
    { id: '5', name: 'Food', icon: '🍽️', count: 16, isPremium: false },
    { id: '6', name: 'Culture', icon: '🎭', count: 22, isPremium: false },
    { id: '7', name: 'Technology', icon: '💻', count: 17, isPremium: true },
    { id: '8', name: 'Health', icon: '🏥', count: 14, isPremium: false },
  ];

  const featuredTopics = [
    { id: '1', title: 'Your Dream Vacation', level: 'B1', isPremium: false },
    { id: '2', title: 'Technology in Everyday Life', level: 'B2', isPremium: false },
    { id: '3', title: 'Climate Change Solutions', level: 'C1', isPremium: true },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Topic Library</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.grey[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.grey[500]}
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <Text style={styles.filterLabel}>Filter by level:</Text>
          <FlatList
            data={levels}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.levelFilter,
                  selectedLevel === item && styles.levelFilterSelected,
                ]}
                onPress={() => setSelectedLevel(item)}
              >
                <Text
                  style={[
                    styles.levelFilterText,
                    selectedLevel === item && styles.levelFilterTextSelected,
                  ]}
                >
                  {item === 'all' ? 'All Levels' : item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Topics</Text>
          <FlatList
            data={featuredTopics}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.featuredTopic}>
                <View style={styles.featuredTopicHeader}>
                  <Text style={styles.featuredTopicLevel}>{item.level}</Text>
                  {item.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Star size={12} color={Colors.common.white} />
                    </View>
                  )}
                </View>
                <Text style={styles.featuredTopicTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.featuredTopicsContainer}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((item) => (
              <TopicCategoryCard
                key={item.id}
                name={item.name}
                icon={item.icon}
                count={item.count}
                isPremium={item.isPremium}
              />
            ))}
          </View>
        </View>
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
    ...Fonts.heading,
    fontSize: Fonts.sizes.xxxl,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.paper,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    ...Fonts.body,
    flex: 1,
    paddingVertical: 12,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  levelFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.background.paper,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  levelFilterSelected: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  levelFilterText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.primary,
  },
  levelFilterTextSelected: {
    color: Colors.primary.contrast,
    ...Fonts.bodyBold,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  featuredTopicsContainer: {
    paddingRight: 20,
  },
  featuredTopic: {
    width: 220,
    backgroundColor: Colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  featuredTopicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featuredTopicLevel: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.small,
    color: Colors.secondary.main,
  },
  premiumBadge: {
    backgroundColor: Colors.warning.main,
    borderRadius: 4,
    padding: 4,
  },
  featuredTopicTitle: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});