import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { GOOGLE_SIGNIN_SETUP_INSTRUCTIONS } from '@/config/googleSignIn';

export default function LoginScreen() {
  const { signInWithGoogle, isLoading } = useAuth();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = '登录失败，请重试';
      
      if (error?.code === 'SIGN_IN_CANCELLED') {
        errorMessage = '登录已取消';
      } else if (error?.code === 'IN_PROGRESS') {
        errorMessage = '登录正在进行中...';
      } else if (error?.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Google Play Services 不可用';
      }
      
      Alert.alert('Google 登录', errorMessage);
    }
  };

  const showSetupInstructions = () => {
    Alert.alert(
      'Google Sign-In 配置',
      GOOGLE_SIGNIN_SETUP_INSTRUCTIONS,
      [{ text: '确定' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          {/* Logo 区域 */}
          <View style={styles.logoContainer}>
            <View style={[styles.logo, { backgroundColor: tintColor }]}>
              <Text style={styles.logoText}>AS</Text>
            </View>
            <ThemedText type="title" style={styles.title}>
              欢迎使用 AlfaSearch
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: textColor }]}>
              使用您的 Google 账户快速登录
            </ThemedText>
          </View>

          {/* 登录区域 */}
          <View style={styles.loginSection}>
            <GoogleSignInButton
              onPress={handleGoogleSignIn}
              loading={isLoading}
            />

            {/* 开发提示 */}
            <View style={styles.devHintContainer}>
              <ThemedText style={styles.devHintText}>
                🔧 当前使用开发模式登录
              </ThemedText>
              <ThemedText style={styles.devHintSubtext}>
                点击登录按钮将使用测试账户，无需 Google 账户
              </ThemedText>
              <ThemedText
                style={[styles.setupLink, { color: tintColor }]}
                onPress={showSetupInstructions}
              >
                查看 Google Sign-In 配置指南
              </ThemedText>
            </View>
          </View>

          {/* 功能介绍 */}
          <View style={styles.featuresSection}>
            <ThemedText type="subtitle" style={styles.featuresTitle}>
              为什么选择 Google 登录？
            </ThemedText>
            
            <View style={styles.featureItem}>
              <Text style={[styles.featureIcon, { color: tintColor }]}>🔒</Text>
              <ThemedText style={styles.featureText}>
                安全可靠的身份验证
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={[styles.featureIcon, { color: tintColor }]}>⚡</Text>
              <ThemedText style={styles.featureText}>
                一键快速登录
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={[styles.featureIcon, { color: tintColor }]}>🔄</Text>
              <ThemedText style={styles.featureText}>
                跨设备同步数据
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  loginSection: {
    marginBottom: 40,
  },
  devHintContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  devHintText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 4,
    fontWeight: '600',
  },
  devHintSubtext: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 8,
  },
  setupLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  featuresSection: {
    flex: 1,
  },
  featuresTitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
});
