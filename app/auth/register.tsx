import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, isLoading } = useAuth();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = '请输入姓名';
    } else if (name.trim().length < 2) {
      newErrors.name = '姓名至少需要2个字符';
    }
    
    if (!email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!password.trim()) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码至少需要6位字符';
    }
    
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('注册失败', error instanceof Error ? error.message : '未知错误');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
              创建账户
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: textColor }]}>
              加入 AlfaSearch 开始您的搜索之旅
            </ThemedText>
          </View>

          {/* 表单区域 */}
          <View style={styles.form}>
            <AuthInput
              label="姓名"
              placeholder="请输入您的姓名"
              value={name}
              onChangeText={setName}
              error={errors.name}
              autoComplete="name"
              leftIcon="person"
            />

            <AuthInput
              label="邮箱地址"
              placeholder="请输入您的邮箱"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoComplete="email"
              leftIcon="envelope"
            />

            <AuthInput
              label="密码"
              placeholder="请输入密码（至少6位）"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              isPassword
              autoComplete="new-password"
              leftIcon="lock"
            />

            <AuthInput
              label="确认密码"
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              isPassword
              autoComplete="new-password"
              leftIcon="lock"
            />

            <AuthButton
              title="注册"
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />
          </View>

          {/* 底部链接 */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              已有账户？{' '}
              <Link href="/auth/login" style={{ color: tintColor }}>
                立即登录
              </Link>
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
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
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
});
