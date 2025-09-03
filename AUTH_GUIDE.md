# AlfaSearch Google 登录模块使用指南

## 功能概述

AlfaSearch 现在已经集成了 Google Sign-In 认证系统，包括：

- ✅ Google 账户登录
- ✅ 自动认证状态管理
- ✅ 本地存储支持
- ✅ 登出功能
- ✅ 认证守卫（自动重定向）
- ✅ 跨设备同步支持

## Google Sign-In 配置

### 1. Google Cloud Console 设置

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API 和 Google Sign-In API
4. 创建 OAuth 2.0 客户端 ID：
   - **Web 应用程序类型**（用于 webClientId）
   - **iOS 应用程序类型**（用于 iosClientId，Bundle ID: `com.alfasearch.app`）
   - **Android 应用程序类型**（用于 Android，包名: `com.alfasearch.app`）

### 2. 下载配置文件

- **iOS**: 下载 `GoogleService-Info.plist` 并放置在项目根目录
- **Android**: 下载 `google-services.json` 并放置在项目根目录

### 3. 更新配置

编辑 `config/googleSignIn.ts` 文件，将示例客户端 ID 替换为您的真实 ID：

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  // ... 其他配置
});
```

## 使用流程

### 1. 首次使用
- 应用启动时会自动检查 Google 登录状态
- 如果未登录，会自动跳转到登录页面

### 2. Google 登录
- 在登录页面点击"使用 Google 账户登录"按钮
- 系统会打开 Google 登录界面
- 选择或输入您的 Google 账户信息
- 授权应用访问基本信息
- 登录成功后会自动跳转到主页

### 3. 登出
- 在主页右上角点击登出图标
- 确认登出后会从 Google 账户登出并返回到登录页面

## 技术实现

### 核心文件结构
```
├── types/auth.ts                         # 认证相关类型定义
├── contexts/AuthContext.tsx              # 认证上下文和状态管理
├── config/googleSignIn.ts                # Google Sign-In 配置
├── components/auth/
│   ├── AuthGuard.tsx                    # 认证守卫组件
│   └── GoogleSignInButton.tsx           # Google 登录按钮组件
├── app/auth/
│   └── login.tsx                        # Google 登录页面
└── app/_layout.tsx                      # 根布局（集成认证）
```

### 主要特性

1. **Google 集成**: 使用官方 @react-native-google-signin/google-signin 包
2. **状态管理**: 使用 React Context + useReducer 进行状态管理
3. **本地存储**: 使用 AsyncStorage 持久化认证状态
4. **自动重定向**: AuthGuard 组件自动处理登录状态重定向
5. **响应式设计**: 支持深色/浅色主题
6. **错误处理**: 完善的错误提示和处理
7. **跨平台**: 支持 iOS、Android 和 Web

### Google Sign-In 集成

应用使用 Google Sign-In SDK 提供以下功能：

- **安全认证**: 使用 Google 的 OAuth 2.0 认证流程
- **用户信息**: 自动获取用户的基本信息（姓名、邮箱、头像）
- **Token 管理**: 自动处理访问令牌和刷新令牌
- **登出管理**: 完整的登出流程，包括撤销访问权限

## 开发说明

### 开发模式测试

当前配置使用示例客户端 ID，仅用于开发测试。在登录页面点击"查看 Google Sign-In 配置指南"可以查看完整的配置说明。

### 添加新的认证功能

1. 在 `types/auth.ts` 中添加新的类型定义
2. 在 `AuthContext.tsx` 中添加新的方法
3. 在相应的组件中使用 `useAuth()` hook

### 自定义样式

所有认证相关组件都支持主题切换，可以通过修改 `constants/Colors.ts` 来自定义颜色主题。

## 安全注意事项

⚠️ **重要**: 在生产环境中请确保：

1. **正确配置 Google Cloud Console**
   - 设置正确的 Bundle ID 和包名
   - 配置授权的重定向 URI
   - 启用必要的 API

2. **保护客户端 ID**
   - 不要在代码中硬编码敏感信息
   - 使用环境变量管理配置

3. **后端验证**
   - 在服务器端验证 Google ID Token
   - 实现适当的用户会话管理

4. **权限管理**
   - 只请求必要的用户权限
   - 遵循最小权限原则

## 故障排除

### 常见问题

1. **Google 登录失败**
   - 检查 Google Cloud Console 配置
   - 确认客户端 ID 是否正确
   - 检查 Bundle ID 和包名是否匹配

2. **"DEVELOPER_ERROR" 错误**
   - 检查 SHA-1 证书指纹是否正确配置
   - 确认 google-services.json 文件是否正确放置

3. **"SIGN_IN_CANCELLED" 错误**
   - 用户取消了登录流程，这是正常行为

4. **"PLAY_SERVICES_NOT_AVAILABLE" 错误**
   - 在 Android 设备上安装 Google Play Services
   - 更新到最新版本的 Google Play Services

5. **登录后仍然显示登录页面**
   - 检查 AsyncStorage 权限
   - 清除应用数据重试

6. **页面跳转异常**
   - 检查 expo-router 配置
   - 确认路由文件命名正确

### 调试技巧

1. **查看控制台日志**: 检查详细的错误信息
2. **测试网络连接**: 确保设备可以访问 Google 服务
3. **清除缓存**: 删除应用数据并重新安装
4. **检查配置**: 使用应用内的配置指南检查设置

如有其他问题，请检查控制台错误信息或参考 [Google Sign-In 官方文档](https://developers.google.com/identity/sign-in/android/troubleshooting)。
