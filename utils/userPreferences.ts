import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const KEYS = {
  USER_LEVEL: '@sprechfit:user_level',
  NOTIFICATION_ENABLED: '@sprechfit:notifications_enabled',
  USER_STATS: '@sprechfit:user_stats',
  PRACTICE_HISTORY: '@sprechfit:practice_history',
};

/**
 * Save user's language level
 * @param level Language level (A1-C2)
 */
export async function saveUserLevel(level: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.USER_LEVEL, level);
  } catch (error) {
    console.error('Error saving user level:', error);
  }
}

/**
 * Get user's language level
 * @returns The user's language level or 'B1' as default
 */
export async function getUserLevel(): Promise<string> {
  try {
    const level = await AsyncStorage.getItem(KEYS.USER_LEVEL);
    return level || 'B1'; // Default to B1 if not set
  } catch (error) {
    console.error('Error getting user level:', error);
    return 'B1'; // Default to B1 if there's an error
  }
}

/**
 * Toggle notifications enabled/disabled
 * @param enabled Whether notifications should be enabled
 */
export async function setNotificationsEnabled(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.NOTIFICATION_ENABLED, JSON.stringify(enabled));
  } catch (error) {
    console.error('Error saving notification settings:', error);
  }
}

/**
 * Check if notifications are enabled
 * @returns Whether notifications are enabled
 */
export async function getNotificationsEnabled(): Promise<boolean> {
  try {
    const enabled = await AsyncStorage.getItem(KEYS.NOTIFICATION_ENABLED);
    return enabled ? JSON.parse(enabled) : true; // Default to true
  } catch (error) {
    console.error('Error getting notification settings:', error);
    return true; // Default to true if there's an error
  }
}

/**
 * Save practice result to history
 * @param practice Practice session details
 */
export async function savePracticeResult(practice: any): Promise<void> {
  try {
    // Get existing history
    const historyJSON = await AsyncStorage.getItem(KEYS.PRACTICE_HISTORY);
    const history = historyJSON ? JSON.parse(historyJSON) : [];
    
    // Add new practice to the beginning
    history.unshift({
      ...practice,
      id: Date.now().toString(), // Use timestamp as ID
      date: new Date().toISOString(),
    });
    
    // Save updated history
    await AsyncStorage.setItem(KEYS.PRACTICE_HISTORY, JSON.stringify(history));
    
    // Update user stats
    await updateUserStats(practice);
  } catch (error) {
    console.error('Error saving practice result:', error);
  }
}

/**
 * Get practice history
 * @param limit Optional limit on number of entries
 * @returns Array of practice sessions
 */
export async function getPracticeHistory(limit?: number): Promise<any[]> {
  try {
    const historyJSON = await AsyncStorage.getItem(KEYS.PRACTICE_HISTORY);
    const history = historyJSON ? JSON.parse(historyJSON) : [];
    
    return limit ? history.slice(0, limit) : history;
  } catch (error) {
    console.error('Error getting practice history:', error);
    return [];
  }
}

/**
 * Update user stats based on practice results
 * @param practice Latest practice session
 */
async function updateUserStats(practice: any): Promise<void> {
  try {
    // Get existing stats
    const statsJSON = await AsyncStorage.getItem(KEYS.USER_STATS);
    const stats = statsJSON ? JSON.parse(statsJSON) : {
      totalPractices: 0,
      totalMinutes: 0,
      averageScore: 0,
    };
    
    // Update stats
    stats.totalPractices += 1;
    stats.totalMinutes += practice.duration / 60; // Convert seconds to minutes
    
    // Recalculate average score
    const totalScore = stats.averageScore * (stats.totalPractices - 1) + practice.score;
    stats.averageScore = totalScore / stats.totalPractices;
    
    // Save updated stats
    await AsyncStorage.setItem(KEYS.USER_STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
}

/**
 * Get user stats
 * @returns User statistics
 */
export async function getUserStats(): Promise<any> {
  try {
    const statsJSON = await AsyncStorage.getItem(KEYS.USER_STATS);
    return statsJSON ? JSON.parse(statsJSON) : {
      totalPractices: 0,
      totalMinutes: 0,
      averageScore: 0,
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return {
      totalPractices: 0,
      totalMinutes: 0,
      averageScore: 0,
    };
  }
}