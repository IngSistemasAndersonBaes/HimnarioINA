import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

// Asegúrate de que estas imágenes existen en tu carpeta 'assets'
// Si tu archivo está en la raíz, quita los "../"
const LOGO_CREADOR = require('../assets/images/logo_creador.png'); 
const FOTO_ANDERSON = require('../assets/images/foto_anderson.jpeg');

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* TARJETA DE LA ORGANIZACIÓN */}
        <View style={styles.card}>
          <Image source={LOGO_CREADOR} style={styles.orgLogo} resizeMode="contain" />
          <Text style={styles.orgName}>Iglesia Nueva Apostólica</Text>
          <Text style={styles.appTitle}>Himnario</Text>
          <View style={styles.divider} />
          <Text style={styles.missionText}>
            Esperamos que sea un instrumento para alabar y glorificar el nombre de Dios.
          </Text>
        </View>

        {/* TARJETA DEL DESARROLLADOR */}
        <View style={styles.devContainer}>
          <Text style={styles.devLabel}>Desarrollado por:</Text>
          <View style={styles.avatarContainer}>
            <Image source={FOTO_ANDERSON} style={styles.avatar} />
          </View>
          <Text style={styles.devName}>Anderson Alberto Baños Escobar</Text>
          <Text style={styles.devRole}>Desarrollador Full Stack</Text>
          <Text style={styles.devTech}>React Native • Expo • TypeScript</Text>
        </View>

        <Text style={styles.version}>Versión 1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  card: {
    backgroundColor: 'white', borderRadius: 15, padding: 25, width: '100%',
    alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginBottom: 30,
  },
  orgLogo: { width: 80, height: 80, marginBottom: 15 },
  orgName: { fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5, textAlign: 'center' },
  appTitle: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  divider: { height: 1, width: '60%', backgroundColor: '#eee', marginBottom: 15 },
  missionText: { fontSize: 15, color: '#555', textAlign: 'center', fontStyle: 'italic', lineHeight: 22 },
  devContainer: { alignItems: 'center', width: '100%' },
  devLabel: { fontSize: 14, color: '#888', marginBottom: 15, fontWeight: '600' },
  avatarContainer: {
    marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 5, elevation: 5,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'white' },
  devName: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 5 },
  devRole: { fontSize: 14, color: '#007AFF', fontWeight: '500', marginBottom: 5 },
  devTech: { fontSize: 12, color: '#999' },
  version: { marginTop: 40, color: '#ccc', fontSize: 12 }
});