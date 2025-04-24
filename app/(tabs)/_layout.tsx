import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Home, // Use the non-deprecated Home icon
  BarChart3, // Keep the alias for ChartBar if you prefer
  BookType,
  User,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import React from 'react';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary.main,
          tabBarInactiveTintColor: Colors.grey[500],
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Practice',
            // Add types for color and size
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            // Add types for color and size
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <BookType size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            // Add types for color and size
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            // Add types for color and size
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: Colors.background.paper,
    borderRadius: 25,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,

    marginLeft: 18,
    marginRight: 18,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: Colors.common.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontFamily: Fonts.body.fontFamily, // Keep fontFamily
    fontWeight: Fonts.body.fontWeight as
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900', // Cast fontWeight
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
  },
});
