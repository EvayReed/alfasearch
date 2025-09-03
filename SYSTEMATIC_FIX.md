# 🔧 系统性修复 DEVELOPER_ERROR (代码 10)

## 🚨 当前状态

仍然收到 `DEVELOPER_ERROR` 和错误代码 `10`，这表明 Google Cloud Console 配置与应用不匹配。

## 🔍 可能的原因

根据官方文档，错误代码 10 通常由以下原因造成：

1. **SHA-1 指纹不匹配**
2. **包名/Bundle ID 不匹配**  
3. **客户端 ID 配置错误**
4. **Google Cloud Console 项目配置问题**

## 🛠️ 系统性解决方案

### 方案 1: 重新创建 Google Cloud 项目（推荐）

最可靠的解决方案是重新创建整个配置：

#### 步骤 1: 创建新的 Google Cloud 项目
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目：`AlfaSearch-New`
3. 启用 Google Sign-In API

#### 步骤 2: 配置 OAuth 同意屏幕
1. 选择 "外部" 用户类型
2. 填写应用名称：`AlfaSearch`
3. 添加您的邮箱作为开发者联系信息

#### 步骤 3: 创建 OAuth 2.0 客户端 ID

**Android 客户端**：
- 应用类型：Android
- 包名：`com.alfasearch.app`
- SHA-1 指纹：`79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0`

**iOS 客户端**：
- 应用类型：iOS
- Bundle ID：`com.alfasearch.app`

**Web 客户端**：
- 应用类型：Web 应用程序
- 名称：`AlfaSearch Web`

#### 步骤 4: 下载新的配置文件
- 下载新的 `google-services.json` (Android)
- 下载新的 `GoogleService-Info.plist` (iOS)

### 方案 2: 验证当前配置

如果不想重新创建项目，请验证：

#### 检查 Google Cloud Console
1. 确认项目 ID：`alfasearch`
2. 确认 Android 客户端配置：
   - 包名：`com.alfasearch.app`
   - SHA-1：`79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0`
3. 确认 iOS 客户端配置：
   - Bundle ID：`com.alfasearch.app`

#### 重新生成 SHA-1 指纹
```bash
keytool -keystore ~/.android/debug.keystore -list -v -alias androiddebugkey -storepass android -keypass android
```

### 方案 3: 临时使用开发模式

如果您想先测试应用的其他功能：

```typescript
// 在 AuthContext.tsx 中添加开发模式
const signInWithGoogle = async () => {
  // 开发模式：跳过 Google 登录
  if (__DEV__) {
    console.log('🔧 使用开发模式登录');
    const mockUser: User = {
      id: 'dev_user_001',
      email: 'developer@alfasearch.com',
      name: '开发测试用户',
      avatar: 'https://via.placeholder.com/100',
    };
    
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'dev_token');
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
    dispatch({ type: 'SET_USER', payload: mockUser });
    return;
  }
  
  // 正常的 Google 登录流程...
};
```

## 🎯 推荐行动计划

### 立即行动（选择一个）：

**选项 A: 重新创建配置**（最可靠）
- 创建新的 Google Cloud 项目
- 重新配置所有客户端
- 下载新的配置文件

**选项 B: 启用开发模式**（快速测试）
- 临时跳过 Google 登录
- 测试应用的其他功能
- 稍后修复 Google 配置

**选项 C: 深度排查**（如果想保留当前项目）
- 逐项验证 Google Cloud Console 配置
- 重新生成配置文件
- 确保所有参数完全匹配

## 📱 测试建议

无论选择哪个方案，建议按以下顺序测试：

1. **真实 Android 设备**（最可靠）
2. **真实 iOS 设备**
3. **iOS 模拟器**
4. **Android 模拟器**（确保有 Google Play Services）

## 🆘 如果问题持续

如果所有方案都失败，可能的原因：
- 网络连接问题
- Google Services 在您的地区不可用
- 设备时间设置错误
- Google Play Services 版本过旧

---

**💡 建议：先尝试方案 3（开发模式）来测试应用功能，然后再解决 Google 配置问题。**
