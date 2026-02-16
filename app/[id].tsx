import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppThemeColors, useAppTheme } from "@/context/app-theme";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HIMNOS } from "../constants/himnos";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const hymnId = Array.isArray(id) ? id[0] : id;
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const [fontSize, setFontSize] = useState(18);
  const [isFavorite, setIsFavorite] = useState(false);

  const himno = HIMNOS.find((h) => h.id === hymnId);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const checkFavoriteStatus = useCallback(async () => {
    if (!hymnId) return;

    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];
      const exists = favoritesArray.includes(hymnId);
      setIsFavorite(exists);
    } catch (error) {
      console.log("Error al leer favoritos:", error);
    }
  }, [hymnId]);

  const toggleFavorite = async () => {
    if (!hymnId) return;

    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((favId: string) => favId !== hymnId);
      } else {
        favoritesArray.push(hymnId);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error al guardar favorito:", error);
    }
  };

  if (!himno) {
    return (
      <View style={styles.containerCentered}>
        <Text style={styles.notFoundText}>Himno no encontrado</Text>
      </View>
    );
  }

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 30));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 14));

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Himno #${himno.numero}`,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons
                name={isFavorite ? "heart" : "heart-outline"}
                size={28}
                color={isFavorite ? colors.danger : colors.textMuted}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>{himno.titulo}</Text>
        {himno.autor && <Text style={styles.autor}>{himno.autor}</Text>}

        <View style={styles.divider} />

        <Text style={[styles.letra, { fontSize }]}>{himno.letra}</Text>
      </ScrollView>

      <View style={styles.controlsContainer}>
        <Pressable style={styles.controlBtn} onPress={decreaseFont}>
          <MaterialCommunityIcons
            name="format-font-size-decrease"
            size={24}
            color={colors.onPrimary}
          />
        </Pressable>
        <View style={styles.separator} />
        <Pressable style={styles.controlBtn} onPress={increaseFont}>
          <MaterialCommunityIcons
            name="format-font-size-increase"
            size={24}
            color={colors.onPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(colors: AppThemeColors, isDark: boolean) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    containerCentered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    notFoundText: { color: colors.text, fontSize: 16 },
    content: { padding: 20, paddingBottom: 80 },
    titulo: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 5,
      textAlign: "center",
    },
    autor: {
      fontSize: 14,
      color: colors.textMuted,
      fontStyle: "italic",
      textAlign: "center",
      marginBottom: 20,
    },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: 20 },
    letra: {
      lineHeight: 30,
      color: colors.text,
      width: "99%",
      alignSelf: "center",
      textAlign: "justify",
      flexShrink: 1,
    },
    controlsContainer: {
      position: "absolute",
      bottom: 30,
      right: 20,
      flexDirection: "row",
      backgroundColor: colors.primary,
      borderRadius: 30,
      elevation: isDark ? 0 : 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0 : 0.25,
      shadowRadius: 3.84,
    },
    controlBtn: { padding: 15, alignItems: "center", justifyContent: "center" },
    separator: {
      width: 1,
      backgroundColor: "rgba(255,255,255,0.35)",
      height: "60%",
      alignSelf: "center",
    },
  });
}
