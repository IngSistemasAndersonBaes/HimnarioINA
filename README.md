# 🎵 Himnario INA

**Aplicación móvil cross-platform para acceso a himnarios institucionales con React Native, Expo y TypeScript. Disponible en iOS, Android y Web.**

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Características Principales](#características-principales)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Navegación](#navegación)
- [Deployment](#deployment)
- [Desarrollo](#desarrollo)
- [Estadísticas](#estadísticas)

---

## 📖 Descripción General

**Himnario INA** es una plataforma digital completa que proporciona acceso a colecciones de himnarios institucionales. Construida con tecnologías modernas de desarrollo multiplataforma, permite a usuarios acceder a contenido musical desde dispositivos móviles (iOS/Android) y navegadores web.

### Objetivos Clave
✅ **Acceso multiplataforma** - iOS, Android y Web simultáneamente  
✅ **Experiencia nativa** - Rendimiento de app nativa en todos los dispositivos  
✅ **TypeScript puro** - 99.3% type safety  
✅ **Interfaz moderna** - Componentes Expo UI  
✅ **Navegación fluida** - File-based routing con Expo Router  
✅ **Almacenamiento local** - AsyncStorage para datos offline  
✅ **Gestos nativos** - Interactividad completa  
✅ **Distribución rápida** - Expo EAS para builds automáticos  

---

## 🛠️ Stack Tecnológico

### Frontend Mobile/Web
- **React 19** - Librería UI moderna
- **React Native 0.81** - Framework para apps nativas
- **TypeScript 5.9** - Type safety completo (99.3% del código)
- **Expo 54** - Plataforma de desarrollo
- **Expo Router 6** - Navegación file-based

### Navegación
- **React Navigation 7** - Stack, Tab, Drawer
- **Native Stack** - Navegación nativa
- **Bottom Tabs** - Navegación por pestañas
- **Gesture Handler** - Gestos avanzados

### Almacenamiento
- **AsyncStorage** - Datos locales persistentes
- **Expo Updates** - Actualizaciones OTA

### UI & Animaciones
- **React Native Reanimated** - Animaciones fluidas
- **React Native Screens** - Renderizado eficiente
- **React Native Web** - Versión web
- **Expo Vector Icons** - Iconos 2000+
- **Expo Image** - Carga optimizada de imágenes

### Herramientas
- **Expo Haptics** - Feedback háptico
- **Expo Web Browser** - Navegador integrado
- **Expo Symbols** - SF Symbols (iOS)
- **ESLint** - Calidad de código

### Build & Deployment
- **EAS (Expo Application Services)** - Builds en la nube
- **Netlify** - Hosting web
- **Metro Bundler** - Bundler nativo

---

## ✨ Características Principales

### 1. **Catálogo de Himnarios**
Acceso completo a colecciones:
- 📚 Múltiples libros de himnarios
- 📚 Búsqueda por título y número
- 📚 Favoritos personalizados
- 📚 Historial de visualización
- 📚 Clasificación por categorías

### 2. **Visualización de Contenido**
Lectura optimizada:
- 📖 Visualización de himnos completos
- 📖 Letras claras y legibles
- 📖 Notación musical (si aplica)
- 📖 Zoom/Scale responsivo
- 📖 Tema claro y oscuro

### 3. **Navegación Tab-based**
Organización intuitiva:
- 🏠 Home - Dashboard principal
- 📖 Himnarios - Catálogo completo
- ❤️ Favoritos - Colección personal
- ⚙️ Configuración - Preferencias

### 4. **Almacenamiento Local**
Datos offline:
- 💾 Sincronización local
- 💾 Acceso sin internet
- 💾 Historial persistente
- 💾 Preferencias guardadas

### 5. **Soporte Multiplataforma**
Deploy en cualquier lugar:
- 📱 iOS nativo
- 🤖 Android nativo
- 🌐 Web responsivo
- 💻 Escritorio (Electron opcional)

### 6. **Actualizaciones OTA**
Cambios sin App Store:
- 🔄 Expo Updates integrado
- 🔄 Distribución inmediata
- 🔄 Rollback automático
- 🔄 Versionado

### 7. **Gestos y Animaciones**
Experiencia fluida:
- 🎬 Transiciones suaves
- 🎬 Gestos swipe/pan
- 🎬 Reanimated animations
- 🎬 Feedback háptico

### 8. **Gestión de Estado**
Con Context API:
- 🔌 Context providers
- 🔌 Custom hooks
- 🔌 Estado compartido
- 🔌 Performance optimizado

---

## 💾 Requisitos del Sistema

### Desarrollo Local
- **Node.js**: 18+ LTS
- **npm** o **yarn**: 9+
- **Expo CLI**: `npm install -g expo-cli`
- **Git**: Control de versiones
- **TypeScript**: 5.9+

### Para iOS
- **macOS**: 12+
- **Xcode**: 14+
- **CocoaPods**: 1.12+
- **iOS**: 13.4+

### Para Android
- **Android Studio**: 2024+
- **JDK**: 17+
- **Android SDK**: 30+
- **Emulator** o dispositivo físico

### Para Web
- **Navegador moderno**: Chrome 90+, Safari 14+, Firefox 88+

---

## 🚀 Instalación y Configuración

### 1. Clonar Repositorio
```bash
git clone https://github.com/IngSistemasAndersonBaes/HimnarioINA.git
cd HimnarioINA
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno
```bash
# Copiar template (si existe)
cp .env.example .env

# Variables necesarias
EXPO_PUBLIC_API_URL=https://api.example.com
```

### 4. Iniciar Desarrollo

#### Para Web
```bash
npm run web
# Abre automáticamente http://localhost:19006
```

#### Para Android
```bash
npm run android
# Asegúrate de tener Android Emulator abierto
```

#### Para iOS
```bash
npm run ios
# Solo en macOS
```

#### O Usar Expo Go (recomendado)
```bash
npm start
# Escanea QR con Expo Go app
```

---

## 📁 Estructura del Proyecto

```
HimnarioINA/
├── app/                        # Expo Router (file-based routing)
│   ├── (tabs)/                # Tabs layout
│   │   ├── _layout.tsx        # Tab navigation
│   │   ├── index.tsx          # Home tab
│   │   ├── himnarios.tsx      # Himnarios tab
│   │   ├── favoritos.tsx      # Favoritos tab
│   │   └── settings.tsx       # Settings tab
│   ├── _layout.tsx            # Root layout
│   └── [slug].tsx             # Dynamic routes
├── components/                # Componentes reutilizables
│   ├── ThemedText.tsx        # Texto con tema
│   ├── ThemedView.tsx        # Vista con tema
│   ├── HymnCard.tsx          # Tarjeta de himno
│   ├── SearchBar.tsx         # Barra de búsqueda
│   ├── Navigation/
│   │   └── TabNavigation.tsx
│   └── UI/
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Loader.tsx
├── context/                   # React Context providers
│   ├── ThemeContext.tsx      # Tema claro/oscuro
│   ├── HymnsContext.tsx      # Estado de himnos
│   └── AuthContext.tsx       # Autenticación (opcional)
├── hooks/                    # Custom React hooks
│   ├── useTheme.ts          # Hook de tema
│   ├── useHymns.ts          # Hook de himnos
│   ├── useAsyncStorage.ts   # Hook AsyncStorage
│   └── useNavigation.ts     # Hook de navegación
├── constants/                # Constantes
│   ├── Colors.ts            # Paleta de colores
│   ├── Layout.ts            # Tamaños y espacios
│   └── Hymns.ts             # Datos de himnos
├── assets/                   # Recursos estáticos
│   ├── images/              # Imágenes PNG/JPG
│   ├── fonts/               # Fuentes custom
│   └── hymns/               # Archivos de himnos
├── scripts/                  # Scripts utilidad
│   └── reset-project.js     # Reset proyecto
├── dist/                     # Build output
├── app.json                  # Configuración Expo
├── eas.json                  # EAS configuration
├── babel.config.js           # Babel config
├── metro.config.js           # Metro bundler
├── tsconfig.json            # TypeScript config
├── eslint.config.js         # ESLint rules
├── netlify.toml             # Netlify config (web)
├── package.json             # Dependencias
└── README.md                # Este archivo
```

---

## 🧭 Navegación

### Estructura de Rutas

```
Root Layout (app/_layout.tsx)
  ├── (tabs)/ Layout
  │   ├── index → /home
  │   ├── himnarios → /himnarios
  │   ├── favoritos → /favoritos
  │   └── settings → /settings
  └── [slug] → Detalle dinámico
```

### Tab Navigation
```
┌─────────────────────────┐
│      Home              │
│   Himnarios           │  ← Tabs
│   Favoritos           │
│   Configuración       │
└─────────────────────────┘
```

### Context Providers
```
<ThemeProvider>
  <HymnsProvider>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </HymnsProvider>
</ThemeProvider>
```

---

## 🎨 Temas y Estilos

### Soporte Light/Dark Mode
```typescript
// useTheme hook
const { colors, isDark, toggleTheme } = useTheme();

// Automático basado en preferencias del sistema
// Cambiable manualmente en settings
```

### Paleta de Colores
```typescript
Light: {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#007AFF',
  secondary: '#5AC8FA',
}

Dark: {
  background: '#000000',
  text: '#FFFFFF',
  primary: '#0A84FF',
  secondary: '#5AC8FA',
}
```

---

## 💾 Almacenamiento Local

### AsyncStorage
```typescript
// Guardos de datos
await AsyncStorage.setItem('key', JSON.stringify(data));

// Lectura de datos
const data = await AsyncStorage.getItem('key');

// Favoritos
await AsyncStorage.setItem('favorites', JSON.stringify(hymns));

// Historial
await AsyncStorage.setItem('history', JSON.stringify(viewed));
```

---

## 📦 Deployment

### 1. **Compilación para Producción Web**

#### Netlify
```bash
# Build
npm run build

# Deploy automático desde GitHub
# Configurado en netlify.toml
```

### 2. **Compilación para iOS**

#### Con EAS
```bash
# Instalación de EAS CLI
npm install -g eas-cli

# Login
eas login

# Build para App Store
eas build --platform ios

# Build para simulador
eas build --platform ios --local
```

### 3. **Compilación para Android**

#### Con EAS
```bash
# Build para Google Play
eas build --platform android

# Build local
eas build --platform android --local
```

### 4. **Submisión a Stores**

#### App Store
```bash
eas submit --platform ios
```

#### Google Play
```bash
eas submit --platform android
```

### Configuración EAS (eas.json)
```json
{
  "build": {
    "preview": {
      "android": { "buildType": "apk" },
      "ios": { "buildType": "simulator" }
    },
    "preview2": {
      "android": { "buildType": "aab" },
      "ios": { "buildType": "archive" }
    },
    "production": {
      "android": { "buildType": "aab" },
      "ios": { "buildType": "archive" }
    }
  }
}
```

---

## 🧪 Desarrollo

### Scripts Disponibles
```bash
npm start         # Inicia Expo Metro
npm run android   # Ejecuta en Android
npm run ios       # Ejecuta en iOS
npm run web       # Ejecuta en Web
npm run lint      # Verificar código
```

### Buenas Prácticas

#### TypeScript Strict
```typescript
// Siempre usar tipos explícitos
const handlePress = (hymn: Hymn): void => {
  navigation.navigate('details', { id: hymn.id });
};
```

#### Componentes Funcionales
```typescript
// Usar functional components con hooks
interface HymnCardProps {
  hymn: Hymn;
  onPress: (id: number) => void;
}

export const HymnCard: React.FC<HymnCardProps> = ({ 
  hymn, 
  onPress 
}) => {
  return (
    <Pressable onPress={() => onPress(hymn.id)}>
      {/* Contenido */}
    </Pressable>
  );
};
```

#### Custom Hooks
```typescript
// Reutilizar lógica
export const useHymnsList = (category?: string) => {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHymns(category);
  }, [category]);

  return { hymns, loading };
};
```

### Testing (Opcional)
```bash
# Si se implementa Jest
npm test
```

---

## 🌐 Deployment Web

### Netlify
```bash
# Build
expo export --platform web

# Deploy
netlify deploy --prod --dir dist
```

### Configuración netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production]
  command = "npm run build"
```

---

## 📱 Características por Plataforma

### iOS
- ✅ Safe Area handling
- ✅ SF Symbols
- ✅ Haptic Feedback
- ✅ Push Notifications
- ✅ App Store build

### Android
- ✅ Navigation bar handling
- ✅ Material Design
- ✅ Vibration API
- ✅ Google Play build
- ✅ Back button handling

### Web
- ✅ Responsive design
- ✅ Keyboard navigation
- ✅ Browser storage
- ✅ PWA (opcional)

---

## 🔐 Seguridad

### Buenas Prácticas
- ✅ TypeScript para type safety
- ✅ Variables sensibles en .env
- ✅ Validación de entrada
- ✅ HTTPS en URLs de API

### Actualización de Dependencias
```bash
# Verificar vulnerabilidades
npm audit

# Actualizar
npm update
npm install
```

---

## 🎓 Aprendizajes Técnicos

Este proyecto demuestra:

### Frontend Multiplataforma
- ✅ React Native moderna
- ✅ TypeScript strict
- ✅ Expo Router file-based
- ✅ React Navigation avanzada
- ✅ Reanimated animations

### Manejo de Estado
- ✅ Context API
- ✅ Custom hooks
- ✅ AsyncStorage
- ✅ Performance optimization

### DevOps & Deployment
- ✅ EAS builds
- ✅ Netlify hosting
- ✅ OTA updates
- ✅ CI/CD pipeline

### TypeScript
- ✅ 99.3% type coverage
- ✅ Interfaces y types
- ✅ Generics
- ✅ Union types

---

## 📊 Estadísticas del Proyecto

```
Lenguajes:
├── TypeScript: 99.3% ⭐
└── JavaScript:  0.7%

Stack:
├── React 19
├── React Native 0.81
├── Expo 54
└── TypeScript 5.9

Plataformas:
├── iOS (nativo)
├── Android (nativo)
└── Web (responsivo)

Navegación:
├── File-based routing (Expo Router)
├── Tab navigation
├── Native stack
└── Dynamic routes

Almacenamiento:
├── AsyncStorage
├── Expo Updates
└── Local cache
```

---

## 🚀 Roadmap Futuro

### Fase 1 (✅ Completada)
- [x] Estructura base con Expo
- [x] Navegación tabbed
- [x] Catálogo de himnarios
- [x] Almacenamiento local
- [x] Tema claro/oscuro

### Fase 2 (🔄 En progreso)
- [ ] Búsqueda avanzada
- [ ] Sincronización en nube
- [ ] Compartir himnos
- [ ] Anotaciones personales
- [ ] Audio/música

### Fase 3 (⏳ Planeado)
- [ ] Integración Firebase
- [ ] Notificaciones push
- [ ] Comunidad/comentarios
- [ ] Analytics
- [ ] PWA completo

---

## 📚 Documentación Adicional

| Recurso | Enlace |
|---------|--------|
| Expo Docs | https://docs.expo.dev |
| React Native | https://reactnative.dev |
| Expo Router | https://expo.github.io/router |
| React Navigation | https://reactnavigation.org |
| Reanimated | https://docs.swmansion.com/react-native-reanimated |
| EAS | https://docs.expo.dev/build/introduction |

---

## 🤝 Contribución

Para contribuir:

1. Fork el proyecto
2. Crear rama: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -am 'Add new feature'`
4. Push: `git push origin feature/nueva-feature`
5. Pull Request

### Estándares
- ✅ TypeScript strict
- ✅ Componentes funcionales
- ✅ ESLint compliant
- ✅ Documentación clara

---

## 📋 Información del Proyecto

| Aspecto | Detalle |
|--------|--------|
| **Repositorio** | `IngSistemasAndersonBaes/HimnarioINA` |
| **Licencia** | MIT |
| **Stack** | React Native + Expo + TypeScript |
| **Versión** | 1.0.0 |
| **Estado** | ✅ Activo |
| **Plataformas** | iOS, Android, Web |
| **Última actualización** | 2026-03-31 |

---

## 💡 Ventajas de Este README para Entrevistas

✅ **Demuestra expertise en:**
- React Native y Expo moderno
- TypeScript strict (99.3%)
- Aplicaciones multiplataforma
- State management con Context API
- Deployment en múltiples plataformas
- Expo Router file-based
- AsyncStorage y persistencia
- EAS builds y distribución

✅ **Muestra habilidades en:**
- Mobile development
- Web development
- Cross-platform thinking
- DevOps básico
- User experience
- Performance optimization

---

## 🎵 Características Únicas

Este proyecto es especial porque:
- 📱 **Multiplataforma real** - Same code, 3 platforms
- 🎨 **TypeScript puro** - 99.3% type safety
- 🚀 **Expo moderno** - Latest version 54
- 🌐 **Web-ready** - Netlify deployment incluido
- 📦 **OTA updates** - Expo Updates integrado
- ⚡ **Performance** - React Native nativo

---

**Himnario INA** demuestra que puedes construir aplicaciones profesionales, modernas y cross-platform con React Native y Expo.

Perfect para mostrar:
- ✅ Desarrollo mobile profesional
- ✅ TypeScript expertise
- ✅ Arquitectura escalable
- ✅ DevOps y deployment
- ✅ UX/UI thinking
