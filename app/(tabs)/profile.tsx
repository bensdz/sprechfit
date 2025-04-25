import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import {
  ChevronRight,
  Star,
  Bell,
  User,
  Settings,
  Globe,
  CircleHelp as HelpCircle,
  LogOut,
} from 'lucide-react-native';
import LevelBadge from '@/components/ui/LevelBadge';
import { saveUserLevel } from '@/utils/userPreferences';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [userLevel, setUserLevel] = useState('B1');
  const [isPremium, setIsPremium] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const handleLevelChange = async (level: string) => {
    setUserLevel(level);
    await saveUserLevel(level);
  };

  const handleUpgrade = () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Upgrade to Premium',
        'Access all premium features for $3.99/month or $29.99/year.',
        [
          { text: 'Not Now', style: 'cancel' },
          {
            text: 'Subscribe',
            onPress: () => console.log('User would subscribe'),
          },
        ]
      );
    } else {
      console.log('User would subscribe on web platform');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JS</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Smith</Text>
            <Text style={styles.profileEmail}>john.smith@example.com</Text>
          </View>
        </View>

        {/* <View style={styles.premiumBanner}>
          <View style={styles.premiumInfo}>
            <Text style={styles.premiumTitle}>
              {isPremium ? 'You are a Premium Member' : 'Upgrade to Premium'}
            </Text>
            <Text style={styles.premiumDesc}>
              {isPremium
                ? 'Enjoy all premium features and content'
                : 'Unlock advanced topics, detailed analysis, and more'}
            </Text>
          </View>

          {!isPremium && (
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgrade}
            >
              <Star size={18} color={Colors.common.white} />
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          )}
        </View> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Settings</Text>

        <View style={styles.levelSelection}>
          <Text style={styles.levelLabel}>Your Current Level:</Text>
          <View style={styles.levelOptions}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelOption,
                  userLevel === level && styles.levelOptionSelected,
                ]}
                onPress={() => handleLevelChange(level)}
              >
                <Text
                  style={[
                    styles.levelOptionText,
                    userLevel === level && styles.levelOptionTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell
              size={20}
              color={Colors.text.primary}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>Daily Reminders</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.grey[300], true: Colors.primary.main }}
            thumbColor={Colors.common.white}
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe
              size={20}
              color={Colors.text.primary}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>App Language</Text>
          </View>
          <View style={styles.settingAction}>
            <Text style={styles.settingValue}>English</Text>
            <ChevronRight size={20} color={Colors.grey[500]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle
              size={20}
              color={Colors.text.primary}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>Help & FAQ</Text>
          </View>
          <ChevronRight size={20} color={Colors.grey[500]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Settings
              size={20}
              color={Colors.text.primary}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>Feedback</Text>
          </View>
          <ChevronRight size={20} color={Colors.grey[500]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, styles.logoutItem]}
          onPress={() =>
            Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Sign Out',
                onPress: () => router.replace('/home'),
              },
            ])
          }
        >
          <View style={styles.settingInfo}>
            <LogOut
              size={20}
              color={Colors.error.main}
              style={styles.settingIcon}
            />
            <Text style={[styles.settingLabel, styles.logoutText]}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>SprechFit v1.0.0</Text>
        <Text style={styles.footerText}>
          Speak confidently. Anytime, anywhere.
        </Text>
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
  profileCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    margin: 20,
    shadowColor: Colors.common.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.common.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  profileEmail: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.light,
    borderRadius: 12,
    padding: 16,
  },
  premiumInfo: {
    flex: 1,
  },
  premiumTitle: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.medium,
    color: Colors.secondary.dark,
    marginBottom: 4,
  },
  premiumDesc: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.secondary.dark,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeButtonText: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.small,
    color: Colors.common.white,
    marginLeft: 4,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  levelSelection: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
  },
  levelLabel: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  levelOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  levelOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
    backgroundColor: Colors.background.light,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  levelOptionSelected: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  levelOptionText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  levelOptionTextSelected: {
    color: Colors.primary.contrast,
    ...Fonts.bodyBold,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    marginBottom: 10,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingLabel: {
    ...Fonts.body,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  logoutItem: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.error.main,
  },
  logoutText: {
    color: Colors.error.main,
  },
  footer: {
    marginTop: 16,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
});
