import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppThemeColors, useAppTheme } from "@/context/app-theme";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { HIMNOS } from "../../constants/himnos";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      const favoritesIds = savedFavorites ? JSON.parse(savedFavorites) : [];
      const favoriteHymns = HIMNOS.filter((h) => favoritesIds.includes(h.id));
      setFavorites(favoriteHymns);
    } catch (error) {
      console.log("Error cargando favoritos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Favoritos</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="heart-broken"
            size={60}
            color={colors.textMuted}
          />
          <Text style={styles.emptyText}>Aun no tienes himnos favoritos.</Text>
          <Text style={styles.emptySubtext}>
            Toca el corazon en un himno para guardarlo aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.item, pressed && { opacity: 0.55 }]}
              onPress={() => router.push(`/${item.id}`)}
            >
              <View style={styles.circle}>
                <Text style={styles.numero}>{item.numero}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text numberOfLines={1} style={styles.preview}>
                  {item.letra.split("\n")[0]}...
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

function createStyles(colors: AppThemeColors, isDark: boolean) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      backgroundColor: colors.surface,
      paddingTop: 50,
      paddingBottom: 15,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      elevation: isDark ? 0 : 2,
    },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: colors.text },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
    },
    emptyText: {
      fontSize: 18,
      color: colors.text,
      marginTop: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: "center",
      marginTop: 10,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      backgroundColor: colors.surface,
      marginHorizontal: 15,
      marginBottom: 8,
      marginTop: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: isDark ? 0 : 1,
    },
    circle: {
      width: 45,
      height: 45,
      borderRadius: 25,
      backgroundColor: colors.dangerSoft,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    numero: { color: colors.danger, fontWeight: "bold", fontSize: 18 },
    textContainer: { flex: 1 },
    titulo: { fontSize: 16, fontWeight: "600", color: colors.text },
    preview: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  });
}
