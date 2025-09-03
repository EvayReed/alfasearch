import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const tintColor = useThemeColor({}, 'tint');

  const handleLogout = () => {
    Alert.alert(
      '确认登出',
      '您确定要登出吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '登出', 
          style: 'destructive',
          onPress: logout 
        },
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* 用户信息区域 */}
      <ThemedView style={styles.userContainer}>
        <ThemedView style={styles.userInfo}>
          <ThemedView style={[styles.avatar, { backgroundColor: tintColor }]}>
            <ThemedText style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.userDetails}>
            <ThemedText type="subtitle">欢迎回来，{user?.name}!</ThemedText>
            <ThemedText style={styles.userEmail}>{user?.email}</ThemedText>
          </ThemedView>
        </ThemedView>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <IconSymbol name="arrow.right.square" size={24} color={tintColor} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AlfaSearch</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">功能介绍</ThemedText>
        <ThemedText>
          欢迎使用 AlfaSearch！这是一个现代化的搜索应用，现在已经集成了完整的用户认证系统。
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">开始探索</ThemedText>
        <ThemedText>
          点击 "Explore" 标签页来了解更多功能，或者开始自定义您的搜索体验。
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">开发信息</ThemedText>
        <ThemedText>
          编辑 <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> 来修改此页面。
          按下{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          打开开发者工具。
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
