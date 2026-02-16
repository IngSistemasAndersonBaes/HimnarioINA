import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppThemeColors, useAppTheme } from "@/context/app-theme";
import { Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logoIna = require("../assets/images/logo-ina.png");
const fotoAnderson = require("../assets/images/foto_anderson.jpeg");
const logoBaes = require("../assets/images/logo_creador.png");

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useAppTheme();

  const [menuVisible, setMenuVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [devVisible, setDevVisible] = useState(false);

  const isCompact = width < 380;
  const isLarge = width >= 768;
  const menuWidth = Math.min(Math.max(width * 0.75, 240), 360);

  const styles = useMemo(
    () => createStyles(colors, menuWidth, isCompact, isLarge, isDark),
    [colors, menuWidth, isCompact, isLarge, isDark],
  );

  const goToList = (searchMode: "number" | "title") => {
    router.replace(`/(tabs)/inicio?mode=${searchMode}`);
  };

  const openAbout = () => {
    setMenuVisible(false);
    setTimeout(() => setAboutVisible(true), 200);
  };

  const openDev = () => {
    setMenuVisible(false);
    setTimeout(() => setDevVisible(true), 200);
  };

  const openSettings = () => {
    setMenuVisible(false);
    setTimeout(() => router.push("/configuraciones"), 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable
          onPress={() => setMenuVisible(true)}
          hitSlop={30}
          style={({ pressed }) => [
            styles.menuButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <MaterialCommunityIcons name="menu" size={32} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={logoIna} style={styles.logoMain} resizeMode="contain" />
          <Text style={styles.title}>Himnario</Text>
          <Text style={styles.subtitle}>Nuevo Apostolica</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Text style={styles.instruction}>Como deseas buscar?</Text>

          <Pressable
            style={({ pressed }) => [
              styles.bigButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => goToList("number")}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="numeric"
                size={28}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={styles.buttonTitle}>Por Numero</Text>
              <Text style={styles.buttonSubtitle}>Ej: 125</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.textMuted}
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.bigButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => goToList("title")}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="format-letter-case"
                size={28}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={styles.buttonTitle}>Por Titulo</Text>
              <Text style={styles.buttonSubtitle}>Ej: Gracia...</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.textMuted}
              style={{ marginLeft: "auto" }}
            />
          </Pressable>

        </View>

        <Text style={styles.footer}>by BaEs Soft © 2026</Text>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              <View style={styles.menuHeader}>
                <Image source={logoIna} style={styles.menuLogo} resizeMode="contain" />
                <Text style={styles.menuTitle}>Menu</Text>
              </View>

              <View style={styles.menuItems}>
                <TouchableOpacity style={styles.menuItem} onPress={openSettings}>
                  <MaterialCommunityIcons
                    name="cog-outline"
                    size={24}
                    color={colors.textMuted}
                  />
                  <Text style={styles.menuItemText}>Configuraciones</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={openDev}>
                  <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={24}
                    color={colors.textMuted}
                  />
                  <Text style={styles.menuItemText}>Desarrollador</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={openAbout}>
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={24}
                    color={colors.textMuted}
                  />
                  <Text style={styles.menuItemText}>Acerca de</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.menuFooter}>
                <Text style={styles.versionText}>Version 1.0.0</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={aboutVisible}
        onRequestClose={() => setAboutVisible(false)}
      >
        <View style={styles.overlayCenter}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setAboutVisible(false)}
            >
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <Text style={styles.modalHeaderTitle}>Acerca de</Text>

            <View style={styles.centerContent}>
              <Image source={logoBaes} style={styles.baesLogo} resizeMode="contain" />

              <Text style={styles.orgLabel}>Organizacion que lo desarrollo:</Text>
              <Text style={styles.orgName}>BaEs Soft</Text>

              <View style={styles.divider} />

              <Text style={styles.hymnalTitle}>Himnario Nuevo Apostolico</Text>
              <Text style={styles.missionText}>
                Esperamos que sea un instrumento para alabar y glorificar el
                nombre de Dios.
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={devVisible}
        onRequestClose={() => setDevVisible(false)}
      >
        <View style={styles.overlayCenter}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setDevVisible(false)}
            >
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <Text style={styles.modalHeaderTitle}>Desarrollador</Text>

            <View style={styles.centerContent}>
              <View style={styles.avatarContainer}>
                <Image source={fotoAnderson} style={styles.avatar} />
              </View>

              <Text style={styles.devName}>Anderson Alberto Banos Escobar</Text>
              <Text style={styles.devRole}>Desarrollador Full Stack</Text>

              <View style={styles.techBadges}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>React Native</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Expo</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>TypeScript</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function createStyles(
  colors: AppThemeColors,
  menuWidth: number,
  isCompact: boolean,
  isLarge: boolean,
  isDark: boolean,
) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
    menuButton: { padding: 6 },
    content: {
      flex: 1,
      width: "100%",
      maxWidth: isLarge ? 680 : 520,
      alignSelf: "center",
      paddingHorizontal: isCompact ? 14 : 20,
      justifyContent: "space-between",
      paddingBottom: isCompact ? 14 : 20,
    },
    logoContainer: { alignItems: "center", marginTop: isCompact ? 0 : 10 },
    logoMain: {
      width: isCompact ? 95 : isLarge ? 145 : 120,
      height: isCompact ? 95 : isLarge ? 145 : 120,
      marginBottom: isCompact ? 12 : 20,
    },
    title: {
      fontSize: isCompact ? 28 : 32,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
      fontSize: isCompact ? 17 : 19,
      color: colors.textMuted,
      marginTop: 5,
    },
    buttonsContainer: { marginBottom: 16 },
    instruction: {
      textAlign: "center",
      fontSize: 16,
      color: colors.textMuted,
      marginBottom: 18,
    },
    bigButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surfaceAlt,
      padding: isCompact ? 14 : 20,
      borderRadius: 15,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: isDark ? 0 : 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0 : 0.1,
      shadowRadius: 4,
    },
    iconCircle: {
      width: isCompact ? 45 : 50,
      height: isCompact ? 45 : 50,
      borderRadius: isCompact ? 22 : 25,
      backgroundColor: isDark ? "#1d3557" : "#e3f2fd",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    buttonTitle: { fontSize: 18, fontWeight: "bold", color: colors.primary },
    buttonSubtitle: { fontSize: 14, color: colors.textMuted },
    footer: { textAlign: "center", color: colors.textMuted },
    overlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      flexDirection: "row",
    },
    overlayCenter: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: "center",
      alignItems: "center",
    },
    modalCard: {
      width: "88%",
      maxWidth: 450,
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      elevation: isDark ? 0 : 5,
    },
    closeIcon: {
      alignSelf: "flex-end",
      padding: 5,
      marginTop: -10,
      marginRight: -10,
    },
    modalHeaderTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 20,
      marginTop: -10,
    },
    centerContent: { alignItems: "center", width: "100%" },
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: colors.border,
      marginVertical: 15,
    },
    menuContainer: {
      width: menuWidth,
      backgroundColor: colors.surface,
      height: "100%",
      paddingTop: 50,
      paddingHorizontal: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    menuHeader: {
      alignItems: "center",
      marginBottom: 30,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 20,
    },
    menuLogo: { width: 60, height: 60, marginBottom: 10 },
    menuTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
    menuItems: { flex: 1 },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemText: { fontSize: 15, color: colors.text, marginLeft: 20 },
    menuFooter: { paddingBottom: 20, alignItems: "center" },
    versionText: { color: colors.textMuted, fontSize: 12 },
    baesLogo: { width: 200, height: 150, marginBottom: 10 },
    orgLabel: {
      fontSize: 12,
      color: colors.textMuted,
      textTransform: "uppercase",
      alignSelf: "center",
      flexShrink: 1,
      width: "60%",
      textAlign: "center",
    },
    orgName: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    hymnalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.primary,
      marginBottom: 10,
      textAlign: "center",
    },
    missionText: {
      fontSize: 15,
      color: colors.textMuted,
      textAlign: "center",
      fontStyle: "italic",
      lineHeight: 22,
    },
    avatarContainer: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 3,
      marginBottom: 15,
    },
    avatar: { width: "100%", height: "100%", borderRadius: 55 },
    devName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 5,
    },
    devRole: {
      fontSize: 15,
      color: colors.primary,
      fontWeight: "600",
      marginBottom: 15,
    },
    techBadges: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    badge: {
      backgroundColor: isDark ? "#1d3557" : "#e3f2fd",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      margin: 3,
    },
    badgeText: { color: colors.primary, fontSize: 12, fontWeight: "bold" },
  });
}
