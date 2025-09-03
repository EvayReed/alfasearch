# 🔧 官方故障排除指南

## 🚨 DEVELOPER_ERROR 根本原因

根据 Google Sign-In 官方文档，`DEVELOPER_ERROR` **总是**由于应用和服务器端设置（Firebase 或 Google Cloud Console）之间的配置不匹配造成的。

## ✅ 官方检查清单

### 1. SHA-1 证书指纹验证
- ✅ **您的 SHA-1**: `79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0`
- ✅ **配置文件中**: `79afac48144cfd06cfb17fb5b18c783503503ec0`
- ✅ **匹配状态**: 正确匹配

### 2. Android 包名验证
- ✅ **应用包名**: `com.alfasearch.app`
- ✅ **配置文件中**: `com.alfasearch.app`
- ✅ **匹配状态**: 正确匹配

### 3. webClientId 验证 ⚠️

**这是最可能的问题所在！**

根据官方文档：
> 如果您在配置对象中传递 webClientId 到 GoogleSignin.configure()，请确保它是正确的，并且类型为 web（不是 Android！）

让我们重新检查 webClientId 配置。

## 🔍 重新检查 Web 客户端 ID

从您的 `google-services.json` 文件中，我看到有两个客户端 ID：

1. **Android 客户端** (client_type: 1): `306494201348-n6ct4ivsniqqcg3jsa99ka1co8hsr86g.apps.googleusercontent.com`
2. **Web 客户端** (client_type: 3): `306494201348-8gvsvr5o3v8ob5068a7rflimn6ihdlk8.apps.googleusercontent.com`

## 🚀 解决方案

### 方案 1: 验证 Google Cloud Console 中的 Web 客户端

请前往 [Google Cloud Console](https://console.cloud.google.com/) → API 和服务 → 凭据，检查：

1. **确认存在 Web 应用程序类型的客户端**
2. **复制正确的 Web 客户端 ID**
3. **确认不是 Android 类型的客户端 ID**

### 方案 2: 重新创建 Web 客户端（推荐）

如果不确定当前的 Web 客户端 ID 是否正确：

1. 在 Google Cloud Console 中删除现有的 Web 客户端
2. 创建新的 Web 应用程序客户端
3. 复制新的客户端 ID
4. 更新应用配置

### 方案 3: 临时移除 webClientId

根据文档，webClientId 是可选的。让我们先尝试移除它：

```typescript
GoogleSignin.configure({
  // 临时注释掉 webClientId
  // webClientId: '306494201348-8gvsvr5o3v8ob5068a7rflimn6ihdlk8.apps.googleusercontent.com',
  
  iosClientId: '306494201348-n16r4cv88omcp9ds9alfbc10t9h9m8kd.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});
```

## 📋 下一步行动计划

1. **首先尝试方案 3**（移除 webClientId）
2. **如果仍然失败，执行方案 2**（重新创建 Web 客户端）
3. **在真实设备上测试**（比模拟器更可靠）

## 🎯 预期结果

移除 webClientId 后，Google Sign-In 应该能够正常工作，因为：
- SHA-1 指纹正确
- Android 包名正确
- iOS Bundle ID 正确
- 配置文件完整

---

**💡 关键提示**: webClientId 的配置错误是 DEVELOPER_ERROR 的最常见原因！
