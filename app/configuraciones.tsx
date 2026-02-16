import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppThemeColors, useAppTheme } from "@/context/app-theme";
import { Stack } from "expo-router";
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { colors, isDark, mode, setThemeMode } = useAppTheme();
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const styles = useMemo(
    () => createStyles(colors, isDark, isCompact),
    [colors, isDark, isCompact],
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Configuraciones" }} />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Modo de color</Text>
        <Text style={styles.sectionSubtitle}>
          Selecciona como quieres ver la aplicacion.
        </Text>

        <View style={styles.themeRow}>
          <Pressable
            onPress={() => setThemeMode("light")}
            style={[
              styles.themeOption,
              mode === "light" && styles.themeOptionActive,
            ]}
          >
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={20}
              color={mode === "light" ? colors.onPrimary : colors.textMuted}
            />
            <Text
              style={[
                styles.themeOptionText,
                mode === "light" && styles.themeOptionTextActive,
              ]}
            >
              Claro
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setThemeMode("dark")}
            style={[
              styles.themeOption,
              mode === "dark" && styles.themeOptionActive,
            ]}
          >
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={20}
              color={mode === "dark" ? colors.onPrimary : colors.textMuted}
            />
            <Text
              style={[
                styles.themeOptionText,
                mode === "dark" && styles.themeOptionTextActive,
              ]}
            >
              Oscuro
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function createStyles(colors: AppThemeColors, isDark: boolean, isCompact: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: isCompact ? 14 : 20,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: isCompact ? 14 : 18,
      elevation: isDark ? 0 : 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0 : 0.08,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 14,
    },
    themeRow: {
      flexDirection: "row",
      gap: 10,
    },
    themeOption: {
      flex: 1,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceAlt,
      paddingVertical: 11,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    themeOptionActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    themeOptionText: {
      color: colors.textMuted,
      fontWeight: "700",
      fontSize: 13,
    },
    themeOptionTextActive: {
      color: colors.onPrimary,
    },
  });
}
