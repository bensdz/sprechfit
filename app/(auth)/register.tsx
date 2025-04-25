import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import React from 'react';

import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, UserPlus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    // Basic input validation
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    // Basic email format check (can be more robust)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    // Add password strength check if desired

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement Supabase registration
      console.log('Registering with:', { name, email }); // Placeholder
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (err: unknown) {
      // Type the error
      console.error('Registration failed:', err); // Log the actual error
      // Provide a more specific default error, potentially check err type
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement Google OAuth
      console.log('Attempting Google Sign Up...'); // Placeholder
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err: unknown) {
      // Type the error
      console.error('Google Sign Up failed:', err); // Log the actual error
      setError(
        err instanceof Error ? err.message : 'Failed to sign up with Google.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary.light, Colors.primary.main]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Konto erstellen</Text>
              <Text style={styles.subtitle}>
                Beginnen Sie Ihre Sprachlernreise mit SprechFit
              </Text>
            </View>

            <View style={styles.form}>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <View style={styles.inputContainer}>
                <User size={20} color={Colors.grey[500]} />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Mail size={20} color={Colors.grey[500]} />
                <TextInput
                  style={styles.input}
                  placeholder="E-Mail"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Lock size={20} color={Colors.grey[500]} />
                <TextInput
                  style={styles.input}
                  placeholder="Passwort"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (loading || !name || !email || !password) &&
                    styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={loading || !name || !email || !password}
              >
                <UserPlus size={20} color={Colors.common.white} />
                <Text style={styles.buttonText}>Registrieren</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ODER</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={[styles.googleButton, loading && styles.buttonDisabled]}
                onPress={handleGoogleRegister}
                disabled={loading}
              >
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
                  }}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Mit Google registrieren
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Bereits ein Konto?</Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Anmelden</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontWeight: 700,
    fontSize: Fonts.sizes.xxxl,
    color: Colors.common.white,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    opacity: 0.8,
  },
  form: {
    backgroundColor: Colors.common.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.common.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  errorContainer: {
    backgroundColor: Colors.error.light,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    fontSize: Fonts.sizes.small,
    color: Colors.error.dark,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 12,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  button: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: Colors.grey[400],
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: 600,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey[300],
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    fontSize: Fonts.sizes.small,
    color: Colors.grey[500],
    marginHorizontal: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.common.white,
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.grey[300],
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: 600,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    marginRight: 8,
  },
  footerLink: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: 600,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    textDecorationLine: 'underline',
  },
});
