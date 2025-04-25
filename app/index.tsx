import { Redirect, Href } from 'expo-router';
import React from 'react';

export default function Index() {
  const isSignedIn = true;

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/' as Href} />;
  }
  return <Redirect href={'/(auth)/home' as Href} />;
}
