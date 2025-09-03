import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContextType, AuthState, User, GoogleUser } from '@/types/auth';
import { configureGoogleSignIn } from '@/config/googleSignIn';

// 认证状态管理
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 存储键
const AUTH_STORAGE_KEY = '@alfasearch_auth_token';
const USER_STORAGE_KEY = '@alfasearch_user_data';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 初始化 Google Sign-In 配置
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signInWithGoogle = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // 检查 Google Play Services 是否可用
      await GoogleSignin.hasPlayServices();
      
      // 执行 Google 登录
      const googleUser: GoogleUser = await GoogleSignin.signIn();
      
      // 转换 Google 用户信息为应用用户格式
      const user: User = {
        id: googleUser.user.id,
        email: googleUser.user.email,
        name: googleUser.user.name || googleUser.user.email,
        avatar: googleUser.user.photo || undefined,
        givenName: googleUser.user.givenName || undefined,
        familyName: googleUser.user.familyName || undefined,
      };
      
      // 存储认证信息
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, googleUser.idToken || 'google_token');
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      console.error('Google 登录失败:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // 从 Google 登出
      await GoogleSignin.signOut();
      
      // 清除存储的认证信息
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('登出失败:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // 检查是否已经登录 Google
      const isSignedIn = await GoogleSignin.isSignedIn();
      
      if (isSignedIn) {
        // 获取当前用户信息
        const googleUser = await GoogleSignin.getCurrentUser();
        
        if (googleUser) {
          const user: User = {
            id: googleUser.user.id,
            email: googleUser.user.email,
            name: googleUser.user.name || googleUser.user.email,
            avatar: googleUser.user.photo || undefined,
            givenName: googleUser.user.givenName || undefined,
            familyName: googleUser.user.familyName || undefined,
          };
          
          // 更新本地存储
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_USER', payload: null });
        }
      } else {
        // 检查本地存储的用户数据
        const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_USER', payload: null });
        }
      }
    } catch (error) {
      console.error('检查认证状态失败:', error);
      dispatch({ type: 'SET_USER', payload: null });
    }
  };

  // 应用启动时检查认证状态
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    signInWithGoogle,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context;
};
