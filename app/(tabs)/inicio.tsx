import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppThemeColors, useAppTheme } from "@/context/app-theme";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HIMNOS } from "../../constants/himnos";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = width > 500 ? 80 : width / 4.5;
const ACTION_BUTTON_SIZE = width > 500 ? 70 : width / 6;

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [search, setSearch] = useState("");

  const mode = (params.mode as "number" | "title") || "number";
  const screenTitle =
    mode === "number" ? "Buscar por Numero" : "Buscar por Titulo";

  const goBack = () => {
    router.replace("/");
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [router]),
  );

  const handleNumberPress = (num: string) => {
    if (search.length < 3) {
      setSearch((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setSearch((prev) => prev.slice(0, -1));
  };

  const handleSearchNumber = () => {
    if (!search) return;

    const himnoEncontrado = HIMNOS.find((h) => h.numero.toString() === search);

    if (himnoEncontrado) {
      router.push(`/${himnoEncontrado.id}`);
      setSearch("");
    } else {
      Alert.alert(
        "No encontrado",
        `El himno numero ${search} no existe en este himnario.`,
      );
    }
  };

  const filteredHimnos =
    mode === "title"
      ? HIMNOS.filter((h) => {
          if (search === "") return true;
          return h.titulo.toLowerCase().includes(search.toLowerCase());
        })
      : [];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.customHeader}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={colors.onPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{screenTitle}</Text>
        <View style={{ width: 28 }} />
      </View>

      {mode === "number" ? (
        <View style={styles.numericContainer}>
          <View style={styles.displayContainer}>
            <Text style={styles.displayText}>{search || "0"}</Text>
            <Text style={styles.displayHint}>Ingresa el numero</Text>
          </View>

          <View style={styles.keypad}>
            {[
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [0, "a", "b"],
            ].map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[styles.keyButton, styles.numericKey]}
                    onPress={() => handleNumberPress(num.toString())}
                  >
                    <Text style={[styles.keyText, styles.numericKeyText]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <View style={[styles.row, styles.actionsRow]}>
              <TouchableOpacity
                style={[styles.keyButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <MaterialCommunityIcons
                  name="backspace-outline"
                  size={32}
                  color={colors.danger}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: search ? colors.primary : colors.border,
                  },
                ]}
                onPress={handleSearchNumber}
                disabled={!search}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    { color: search ? colors.onPrimary : colors.textMuted },
                  ]}
                >
                  VER
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={24}
                  color={search ? colors.onPrimary : colors.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe titulo o letra..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor={colors.textMuted}
              autoFocus={false}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch("")}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={20}
                  color={colors.textMuted}
                />
              </Pressable>
            )}
          </View>

          <FlatList
            data={filteredHimnos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && { opacity: 0.55 },
                ]}
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
        </View>
      )}
    </View>
  );
}

function createStyles(colors: AppThemeColors, isDark: boolean) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    customHeader: {
      backgroundColor: colors.primary,
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      elevation: isDark ? 0 : 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0 : 0.2,
    },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: colors.onPrimary },
    numericContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 40,
      width: "100%",
      maxWidth: 500,
      alignSelf: "center",
    },
    displayContainer: {
      marginBottom: 30,
      alignItems: "center",
    },
    displayText: {
      fontSize: 80,
      fontWeight: "bold",
      color: colors.text,
      letterSpacing: 5,
    },
    displayHint: {
      fontSize: 15,
      color: colors.textMuted,
      marginTop: -5,
      justifyContent: "center",
    },
    keypad: {
      width: "80%",
      maxWidth: 400,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    actionsRow: {
      alignItems: "center",
    },
    keyButton: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      borderRadius: BUTTON_SIZE / 2,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      elevation: isDark ? 0 : 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0 : 0.1,
      shadowRadius: 4,
    },
    numericKey: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    numericKeyText: {
      color: colors.onPrimary,
    },
    deleteButton: {
      backgroundColor: colors.dangerSoft,
      borderColor: colors.dangerSoft,
    },
    keyText: {
      fontSize: 32,
      fontWeight: "600",
      color: colors.text,
      textTransform: "uppercase",
    },
    actionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: ACTION_BUTTON_SIZE,
      marginLeft: 16,
      borderRadius: ACTION_BUTTON_SIZE / 2,
      paddingHorizontal: 14,
    },
    actionButtonText: {
      fontSize: 17,
      fontWeight: "bold",
      marginRight: 8,
      letterSpacing: 1,
    },
    listContainer: { flex: 1 },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      margin: 15,
      paddingHorizontal: 15,
      backgroundColor: colors.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: isDark ? 0 : 2,
      height: 50,
    },
    searchIcon: { marginRight: 10 },
    input: { flex: 1, fontSize: 16, color: colors.text },
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      backgroundColor: colors.surface,
      marginHorizontal: 15,
      marginBottom: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: isDark ? 0 : 1,
    },
    circle: {
      width: 45,
      height: 45,
      borderRadius: 25,
      backgroundColor: isDark ? "#1d3557" : "#e3f2fd",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    numero: { color: colors.primary, fontWeight: "bold", fontSize: 18 },
    textContainer: { flex: 1 },
    titulo: { fontSize: 16, fontWeight: "600", color: colors.text },
    preview: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  });
}
