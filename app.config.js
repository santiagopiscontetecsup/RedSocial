import 'dotenv/config'; // 👈 IMPORTANTE para cargar las variables del archivo .env

export default {
  expo: {
    name: 'Full Chamba',
    slug: 'Full Chamba',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    android: {
      package: 'com.fullChamba.redsocial',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png', // Usa la imagen cuadrada
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
      output: 'static'
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff'
        }
      ]
    ],
    experiments: {
      typedRoutes: false
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: 'd916c8be-fc6f-4594-93fd-b25ab6bd928f'
      }
    }
  }
}
