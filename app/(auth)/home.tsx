import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  LogIn,
  UserPlus,
  Target,
  MicVocal,
  BarChart3,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 'welcome',
    image: require('@/assets/images/sprechfit.png'), // Welcome image/icon
    title: 'Willkommen bei SprechFit',
    subtitle: 'Verbessern Sie Ihr Deutsch durch interaktive Sprechübungen.',
  },
  {
    id: 'feature1',
    icon: Target,
    title: 'Personalisiertes Lernen',
    subtitle:
      'Übungen, die genau auf Ihr Sprachniveau von A1 bis C2 zugeschnitten sind.',
  },
  {
    id: 'feature2',
    icon: MicVocal,
    title: 'KI-gestützte Analyse',
    subtitle:
      'Erhalten Sie sofortiges Feedback zu Ihrer Aussprache und Grammatik.',
  },
  {
    id: 'feature3',
    icon: BarChart3,
    title: 'Fortschritt verfolgen',
    subtitle: 'Sehen Sie Ihre Verbesserungen und bleiben Sie motiviert.',
  },
  {
    id: 'actions', // Final step to show actions
    title: 'Bereit loszulegen?',
    subtitle:
      'Erstellen Sie ein Konto oder melden Sie sich an, um zu beginnen.',
  },
];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const renderStepContent = (
    step: (typeof onboardingSteps)[0],
    index: number
  ) => {
    const isActionsStep = step.id === 'actions';
    const IconComponent = step.icon;

    return (
      <View key={step.id} style={styles.stepContainer}>
        <View style={styles.mainContent}>
          {step.image && <Image source={step.image} style={styles.mainImage} />}
          {IconComponent && (
            <View style={styles.iconContainer}>
              <IconComponent size={width * 0.25} color={Colors.common.white} />
            </View>
          )}
          <Text style={[styles.title, isActionsStep && styles.actionsTitle]}>
            {step.title}
          </Text>
          <Text style={styles.subtitle}>{step.subtitle}</Text>
        </View>

        {isActionsStep && (
          <View style={styles.actions}>
            <Link href="/register" asChild>
              <TouchableOpacity style={styles.registerButton}>
                <UserPlus size={20} color={Colors.primary.main} />
                <Text style={styles.registerButtonText}>Konto erstellen</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>
                  Ich habe bereits ein Konto
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.primary.light, Colors.primary.main]} // Brand gradient
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Improve scroll event handling performance
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {onboardingSteps.map(renderStepContent)}
        </ScrollView>

        {/* Pagination Dots - Hide on the last (actions) step */}
        {activeIndex < onboardingSteps.length - 1 && (
          <View style={styles.paginationContainer}>
            {onboardingSteps.slice(0, -1).map(
              (
                _,
                index // Exclude action step from dots
              ) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeIndex === index ? styles.paginationDotActive : {},
                  ]}
                />
              )
            )}
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    // Each step view will have width: width
  },
  stepContainer: {
    width: width, // Each step takes full screen width
    flex: 1,
    justifyContent: 'space-between', // Pushes content up and actions down if present
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 60, // More space at the bottom for pagination/actions
    paddingTop: 40,
  },
  mainContent: {
    flex: 1, // Takes up available space in the middle
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    width: '100%',
    paddingBottom: 40, // Space above pagination/actions
  },
  mainImage: {
    width: width * 0.45, // Responsive image size
    height: width * 0.45,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Subtle background for icons
    borderRadius: (width * 0.25 + 40) / 2, // Make it circular
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontWeight: 700,
    fontSize: Fonts.sizes.xxxl,
    color: Colors.common.white,
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionsTitle: {
    fontSize: Fonts.sizes.xxl, // Slightly smaller for the last step title
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: '90%',
    lineHeight: Fonts.sizes.medium * 1.5,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 30, // Position dots above the bottom edge
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Inactive dot color
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.common.white, // Active dot color
    width: 10, // Slightly larger active dot
    height: 10,
    borderRadius: 5,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
    // Positioned by stepContainer's justifyContent: 'space-between'
  },
  registerButton: {
    backgroundColor: Colors.common.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.common.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  registerButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: 600,
    fontSize: Fonts.sizes.medium,
    color: Colors.primary.main,
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    opacity: 0.8,
  },
});
