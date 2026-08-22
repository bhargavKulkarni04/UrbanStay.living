import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingWelcome({ onContinue }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header: Stacked Logo */}
      <View style={styles.headerZone}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoUrban}>Urban</Text>
          <Text style={styles.logoStay}>Stay</Text>
        </View>
      </View>

      {/* Center Hero Content */}
      <View style={styles.contentZone}>
        <Text style={styles.headlineRegular}>One App that</Text>
        <Text style={styles.headlineRegular}>handles everything your</Text>
        <Text style={styles.headlineAccent}>PG needs.</Text>

        <Text style={styles.subtitle}>
          Manage rooms, tenants, rent collection, maintenance, notices and
          analytics—all from one intuitive platform
        </Text>
      </View>

      {/* Bottom Footer: Progress Dots & Continue Button */}
      <View style={styles.footerZone}>
        {/* Step Indicator (1 of 4) */}
        <View style={styles.stepsRow}>
          <View style={[styles.stepDot, styles.stepDotActive]} />
          <View style={styles.stepDot} />
          <View style={styles.stepDot} />
          <View style={styles.stepDot} />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.88}
          onPress={onContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  headerZone: {
    paddingTop: 16,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  logoUrban: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00C22B',
    lineHeight: 32,
    letterSpacing: -0.8,
  },
  logoStay: {
    fontSize: 32,
    fontWeight: '800',
    color: '#080A09',
    lineHeight: 32,
    letterSpacing: -0.8,
  },
  contentZone: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  headlineRegular: {
    fontSize: 38,
    fontWeight: '600',
    color: '#080A09',
    lineHeight: 42,
    letterSpacing: -1.2,
  },
  headlineAccent: {
    fontSize: 38,
    fontWeight: '800',
    color: '#00C22B',
    lineHeight: 44,
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 15.5,
    fontWeight: '400',
    color: '#71767B',
    lineHeight: 24,
    letterSpacing: -0.2,
    maxWidth: width * 0.85,
  },
  footerZone: {
    paddingBottom: 24,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#DFE2E0',
  },
  stepDotActive: {
    width: 24,
    backgroundColor: '#00C22B',
  },
  continueButton: {
    width: '100%',
    height: 58,
    borderRadius: 18,
    backgroundColor: '#00C22B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#00A825',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
