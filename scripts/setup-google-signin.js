#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取项目根目录
const projectRoot = process.cwd();

console.log('🔧 Google Sign-In 设置助手');
console.log('================================\n');

// 检查配置文件是否存在
const configFiles = [
  { name: 'GoogleService-Info.plist', platform: 'iOS' },
  { name: 'google-services.json', platform: 'Android' }
];

console.log('📋 检查配置文件状态：');
configFiles.forEach(file => {
  const filePath = path.join(projectRoot, file.name);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅ 已存在' : '❌ 缺失';
  console.log(`  ${file.platform}: ${file.name} - ${status}`);
});

console.log('\n📝 配置步骤：');
console.log('1. 前往 Google Cloud Console: https://console.cloud.google.com/');
console.log('2. 创建或选择项目');
console.log('3. 启用 Google Sign-In API');
console.log('4. 创建 OAuth 2.0 客户端 ID');
console.log('5. 下载配置文件并放置在项目根目录');

console.log('\n🔑 需要配置的客户端 ID：');
console.log('- Web 客户端 ID (webClientId)');
console.log('- iOS 客户端 ID (iosClientId)');
console.log('- Android 客户端 ID (自动从 google-services.json 读取)');

console.log('\n📱 应用标识符：');
console.log('- iOS Bundle ID: com.alfasearch.app');
console.log('- Android 包名: com.alfasearch.app');

console.log('\n🔑 Android 调试密钥信息：');
console.log('- SHA-1 指纹: 79:AF:AC:48:14:4C:FD:06:CF:B1:7F:B5:B1:8C:78:35:03:50:3E:C0');
console.log('- 密钥库路径: ~/.android/debug.keystore');

console.log('\n⚠️  重要提醒：');
console.log('- 当前使用示例配置，仅用于开发测试');
console.log('- 生产环境必须使用真实的 Google Cloud Console 配置');
console.log('- 请勿在代码中硬编码敏感信息');

console.log('\n📖 详细文档：');
console.log('- 查看 GOOGLE_CLOUD_SETUP.md 获取完整配置指南');
console.log('- 查看 AUTH_GUIDE.md 了解功能说明');
console.log('- 参考 config/googleSignIn.ts 更新客户端 ID');

console.log('\n🚀 完成配置后运行: npm start');
console.log('================================\n');
