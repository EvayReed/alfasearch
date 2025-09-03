# 🧪 Google Sign-In 快速测试指南

## 🔍 当前状态

我已经添加了详细的调试日志来帮助诊断 `DEVELOPER_ERROR` 问题。

### 📋 已完成的修复：

1. ✅ **配置验证**: 确认使用正确的客户端 ID
2. ✅ **调试日志**: 添加详细的错误和配置日志
3. ✅ **缓存清理**: 使用 `--clear` 标志重新启动
4. ✅ **SHA-1 验证**: 确认指纹匹配

## 🚀 测试步骤

### 1. 查看控制台日志

当您尝试 Google 登录时，现在会看到详细的日志：

```
🔧 配置 Google Sign-In...
📋 Google Sign-In 配置: { webClientId: "...", iosClientId: "..." }
✅ Google Sign-In 配置完成
🔧 开始 Google 登录流程...
📋 当前配置: { webClientId: "...", iosClientId: "..." }
🔍 检查 Google Play Services...
```

### 2. 根据错误信息诊断

**如果看到 "Google Play Services 可用"**：
- 问题可能在客户端 ID 配置
- 检查 Google Cloud Console 设置

**如果在 "检查 Google Play Services" 步骤失败**：
- 在 Android 模拟器上：确保安装了 Google Play Services
- 在 iOS 上：这个检查应该会跳过

### 3. 平台特定测试

#### iOS 测试
```bash
# 在 iOS 模拟器中测试
npm run ios
```

#### Android 测试
```bash
# 在 Android 模拟器中测试
npm run android
```

**Android 注意事项**：
- 确保模拟器有 Google Play Services
- 建议使用 Google Play 版本的模拟器镜像

#### 真实设备测试
扫描 QR 码在真实设备上测试（推荐）

## 🔧 常见解决方案

### 方案 1: 重新生成配置文件

如果问题持续，可能需要重新下载配置文件：

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 删除现有的 Android/iOS 客户端
3. 重新创建客户端（确保 SHA-1 和包名正确）
4. 重新下载配置文件

### 方案 2: 使用开发模式

临时跳过 Google 登录进行其他功能测试：

在 `AuthContext.tsx` 的 `signInWithGoogle` 函数开头添加：

```typescript
// 临时开发模式
if (__DEV__ && false) { // 设置为 true 启用
  const mockUser: User = {
    id: 'dev_user',
    email: 'dev@example.com',
    name: '开发测试用户',
  };
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
  dispatch({ type: 'SET_USER', payload: mockUser });
  return;
}
```

### 方案 3: 检查网络和权限

确保：
- 设备有网络连接
- 可以访问 Google 服务
- 应用有必要的权限

## 📱 推荐测试流程

1. **首先在真实设备上测试**（最可靠）
2. **查看完整的控制台日志**
3. **如果是 Android，确保 Google Play Services 可用**
4. **如果是 iOS，确保 Bundle ID 匹配**

## 🆘 如果仍然失败

请提供以下信息：

1. **完整的控制台日志**（包括新的调试信息）
2. **测试平台**（iOS/Android, 模拟器/真机）
3. **错误发生的具体步骤**

## 📞 下一步

1. 重新启动应用并测试
2. 观察控制台中的详细日志
3. 根据日志信息进行进一步诊断

---

**💡 提示**: 现在的调试日志会帮助我们准确定位问题所在！
