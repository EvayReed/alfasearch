# 🔧 Google Cloud Console 配置指南

## 📋 您的应用信息

### 应用标识符
- **iOS Bundle ID**: `com.alfasearch.app`
- **Android 包名**: `com.alfasearch.app`

### Android 调试密钥信息
- **SHA-1 指纹**: `79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0`
- **密钥库路径**: `~/.android/debug.keystore`

## 🚀 配置步骤

### 1. 创建 Google Cloud 项目

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 点击 "选择项目" → "新建项目"
3. 输入项目名称：`AlfaSearch` 或您喜欢的名称
4. 点击 "创建"

### 2. 启用必要的 API

1. 在项目中，前往 "API 和服务" → "库"
2. 搜索并启用以下 API：
   - **Google+ API**
   - **Google Sign-In API**

### 3. 配置 OAuth 同意屏幕

1. 前往 "API 和服务" → "OAuth 同意屏幕"
2. 选择 "外部" 用户类型
3. 填写必要信息：
   - **应用名称**: `AlfaSearch`
   - **用户支持电子邮件**: 您的邮箱
   - **开发者联系信息**: 您的邮箱
4. 点击 "保存并继续"

### 4. 创建 OAuth 2.0 客户端 ID

#### 4.1 Web 应用程序客户端
1. 前往 "API 和服务" → "凭据"
2. 点击 "创建凭据" → "OAuth 2.0 客户端 ID"
3. 选择应用类型：**Web 应用程序**
4. 名称：`AlfaSearch Web Client`
5. 点击 "创建"
6. **复制 Web 客户端 ID**（稍后需要用到）

#### 4.2 Android 应用程序客户端
1. 再次点击 "创建凭据" → "OAuth 2.0 客户端 ID"
2. 选择应用类型：**Android**
3. 填写信息：
   - **名称**: `AlfaSearch Android`
   - **包名**: `com.alfasearch.app`
   - **SHA-1 证书指纹**: `79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0`
4. 点击 "创建"

#### 4.3 iOS 应用程序客户端
1. 再次点击 "创建凭据" → "OAuth 2.0 客户端 ID"
2. 选择应用类型：**iOS**
3. 填写信息：
   - **名称**: `AlfaSearch iOS`
   - **软件包 ID**: `com.alfasearch.app`
4. 点击 "创建"
5. **复制 iOS 客户端 ID**（稍后需要用到）

### 5. 下载配置文件

#### 5.1 下载 google-services.json (Android)
1. 在 "凭据" 页面，找到您的 Android 客户端
2. 点击下载图标下载 `google-services.json`
3. 将文件移动到项目根目录：
   ```bash
   mv ~/Downloads/google-services.json /Users/dingyiwei/Documents/work2/alfasearch/
   ```

#### 5.2 下载 GoogleService-Info.plist (iOS)
1. 在 "凭据" 页面，找到您的 iOS 客户端
2. 点击下载图标下载 `GoogleService-Info.plist`
3. 将文件移动到项目根目录：
   ```bash
   mv ~/Downloads/GoogleService-Info.plist /Users/dingyiwei/Documents/work2/alfasearch/
   ```

### 6. 更新应用配置

编辑 `config/googleSignIn.ts` 文件，替换示例客户端 ID：

```typescript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // 替换为您的 Web 客户端 ID
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    
    // 替换为您的 iOS 客户端 ID
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    
    // 其他配置保持不变
    scopes: ['profile', 'email'],
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
  });
};
```

## ✅ 验证配置

完成配置后，运行以下命令检查状态：

```bash
npm run setup-google
```

如果看到配置文件显示为 "✅ 已存在"，说明配置成功！

## 🧪 测试登录

1. 启动应用：
   ```bash
   npm start
   ```

2. 在模拟器或真实设备上测试 Google 登录功能

3. 如果遇到错误，检查：
   - 客户端 ID 是否正确
   - SHA-1 指纹是否匹配
   - 配置文件是否在正确位置

## 🔍 常见问题

### "DEVELOPER_ERROR"
- 检查 SHA-1 指纹是否正确
- 确认包名是否为 `com.alfasearch.app`
- 验证 google-services.json 文件是否正确

### "SIGN_IN_CANCELLED"
- 用户取消登录，这是正常行为

### "PLAY_SERVICES_NOT_AVAILABLE"
- 确保 Android 设备安装了 Google Play Services

## 📞 获取帮助

如果遇到问题：
1. 查看控制台错误日志
2. 参考 [Google Sign-In 官方文档](https://developers.google.com/identity/sign-in/android)
3. 运行 `npm run setup-google` 检查配置状态

---

**🎯 完成以上步骤后，您的 AlfaSearch 应用就可以使用 Google 登录功能了！**
