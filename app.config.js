export default {
  expo: {
    name: 'RedSocial',
    slug: 'RedSocial',
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
    assetBundlePatterns: [
      '**/*'
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      package: 'com.fullchamba.redsocial', // 👈 Usa tu dominio al revés o cualquier identificador único
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },

    web: {
      favicon: './assets/images/favicon.png'
    },
    owner: 'kevin3m', // 
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: 'd916c8be-fc6f-4594-93fd-b25ab6bd928f' // 👈 Agregado aquí
      }
    }
  }
}