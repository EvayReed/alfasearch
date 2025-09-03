import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // Web 客户端 ID（从 google-services.json 获取）
    webClientId: '306494201348-8gvsvr5o3v8ob5068a7rflimn6ihdlk8.apps.googleusercontent.com',
    
    // iOS 客户端 ID（从 GoogleService-Info.plist 获取）
    iosClientId: '306494201348-n16r4cv88omcp9ds9alfbc10t9h9m8kd.apps.googleusercontent.com',
    
    // 请求的权限范围
    scopes: ['profile', 'email'],
    
    // 其他配置
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
  });
};

// 开发环境提示
export const GOOGLE_SIGNIN_SETUP_INSTRUCTIONS = `
🔧 Google Sign-In 配置说明：

1. 前往 Google Cloud Console (https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API 和 Google Sign-In API
4. 创建 OAuth 2.0 客户端 ID：
   - Web 应用程序类型（用于 webClientId）
   - iOS 应用程序类型（用于 iosClientId）
   - Android 应用程序类型（用于 Android）

5. 下载配置文件：
   - iOS: GoogleService-Info.plist
   - Android: google-services.json

6. 将配置文件放置在项目根目录

7. 更新 config/googleSignIn.ts 中的客户端 ID

注意：当前使用的是示例配置，在生产环境中必须替换为真实的配置。
`;
