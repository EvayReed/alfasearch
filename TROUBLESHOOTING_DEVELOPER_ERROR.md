# 🔧 解决 DEVELOPER_ERROR 问题

## 🚨 错误信息
```
ERROR Google 登录失败: [Error: DEVELOPER_ERROR: Follow troubleshooting instructions at https://react-native-google-signin.github.io/docs/troubleshooting]
```

## 🔍 问题分析

`DEVELOPER_ERROR` 通常是由以下原因造成的：

### 1. 客户端 ID 配置问题 ❌
- Web 客户端 ID 不正确
- iOS 客户端 ID 不匹配
- 使用了错误的客户端类型

### 2. SHA-1 指纹不匹配 ❌
- 开发密钥库指纹与 Google Console 配置不符
- 配置文件中的证书哈希不正确

### 3. 包名/Bundle ID 不匹配 ❌
- Android 包名配置错误
- iOS Bundle ID 配置错误

## 🛠️ 解决方案

### 步骤 1: 验证客户端 ID 配置

我已经更新了配置，请确认以下信息：

**当前配置**:
```typescript
// Web 客户端 ID (client_type: 3)
webClientId: '306494201348-8gvsvr5o3v8ob5068a7rflimn6ihdlk8.apps.googleusercontent.com'

// iOS 客户端 ID
iosClientId: '306494201348-n16r4cv88omcp9ds9alfbc10t9h9m8kd.apps.googleusercontent.com'
```

### 步骤 2: 验证 SHA-1 指纹

**您的调试密钥指纹**:
```
79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0
```

**配置文件中的指纹**:
```
79afac48144cfd06cfb17fb5b18c783503503ec0
```

✅ **指纹匹配** (忽略大小写和冒号)

### 步骤 3: 验证应用标识符

**配置的标识符**:
- Android 包名: `com.alfasearch.app`
- iOS Bundle ID: `com.alfasearch.app`

✅ **标识符正确**

### 步骤 4: 检查 Google Cloud Console 配置

请前往 [Google Cloud Console](https://console.cloud.google.com/) 验证：

1. **Android 应用配置**:
   - 包名: `com.alfasearch.app`
   - SHA-1 指纹: `79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0`

2. **iOS 应用配置**:
   - Bundle ID: `com.alfasearch.app`

3. **Web 应用配置**:
   - 确保存在 Web 应用类型的客户端

## 🔄 额外排查步骤

### 方法 1: 清除缓存并重新构建

```bash
# 清除 Expo 缓存
npx expo start --clear

# 或者清除 npm 缓存
npm start -- --reset-cache
```

### 方法 2: 检查 Google Play Services

如果在 Android 模拟器上测试：
1. 确保模拟器安装了 Google Play Services
2. 登录 Google 账户
3. 更新 Google Play Services 到最新版本

### 方法 3: 使用真实设备测试

在真实设备上测试通常比模拟器更可靠：
1. 扫描 QR 码在手机上打开应用
2. 确保手机已登录 Google 账户
3. 测试 Google 登录功能

### 方法 4: 检查网络连接

确保设备可以访问 Google 服务：
- 检查网络连接
- 确认没有防火墙阻止
- 尝试在浏览器中访问 Google

## 🧪 测试步骤

### 1. 重新启动应用
```bash
npm start
```

### 2. 在不同平台测试
- iOS 模拟器
- Android 模拟器 (确保有 Google Play Services)
- 真实设备

### 3. 查看详细错误日志
在开发者工具中查看完整的错误堆栈，寻找更具体的错误信息。

## 🆘 如果问题仍然存在

### 临时解决方案: 使用开发模式

如果您只是想测试应用的其他功能，可以临时修改认证逻辑：

```typescript
// 在 AuthContext.tsx 中添加开发模式
const signInWithGoogle = async () => {
  try {
    // 开发模式: 跳过 Google 登录，使用模拟用户
    if (__DEV__) {
      const mockUser: User = {
        id: 'dev_user_001',
        email: 'developer@example.com',
        name: '开发者测试账户',
        avatar: undefined,
      };
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'dev_token');
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      dispatch({ type: 'SET_USER', payload: mockUser });
      return;
    }
    
    // 正常的 Google 登录流程
    dispatch({ type: 'SET_LOADING', payload: true });
    await GoogleSignin.hasPlayServices();
    const googleUser: GoogleUser = await GoogleSignin.signIn();
    // ... 其余代码
  } catch (error) {
    // ... 错误处理
  }
};
```

### 联系支持

如果问题持续存在，请提供：
1. 完整的错误日志
2. 使用的设备类型 (iOS/Android, 模拟器/真机)
3. Google Cloud Console 的配置截图

## 📞 下一步

1. **立即测试**: 重新启动应用并测试 Google 登录
2. **查看日志**: 注意控制台中的任何新错误信息
3. **尝试真实设备**: 如果模拟器有问题，在真实设备上测试

---

**💡 提示**: DEVELOPER_ERROR 通常在第一次配置时出现，按照上述步骤通常可以解决问题。
