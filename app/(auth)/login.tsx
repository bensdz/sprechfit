import { useState } from 'react';
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link, router, Href } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, LogIn } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement Supabase login
      router.replace('/(tabs)');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement Google OAuth
    } catch (err) {
      setError('Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary.light, Colors.primary.main]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Willkommen zurück!</Text>
          <Text style={styles.subtitle}>
            Melden Sie sich an, um Ihre Deutschkenntnisse zu verbessern
          </Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

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
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <LogIn size={20} color={Colors.common.white} />
            <Text style={styles.buttonText}>Anmelden</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ODER</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Mit Google fortfahren</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Noch kein Konto?</Text>
          <Link href={'/(auth)/register' as Href} asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Registrieren</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: Fonts.heading.fontFamily,
    fontSize: Fonts.sizes.xxxl,
    color: Colors.common.white,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.body.fontFamily,
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
    fontFamily: Fonts.body.fontFamily,
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
    fontFamily: Fonts.body.fontFamily,
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
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: Fonts.bodyBold.fontFamily,
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
    fontFamily: Fonts.body.fontFamily,
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
    fontFamily: Fonts.bodyBold.fontFamily,
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
    fontFamily: Fonts.body.fontFamily,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    marginRight: 8,
  },
  footerLink: {
    fontFamily: Fonts.bodyBold.fontFamily,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
    textDecorationLine: 'underline',
  },
});
