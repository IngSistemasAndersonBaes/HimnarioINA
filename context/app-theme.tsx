import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

export type AppThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  border: string;
  overlay: string;
  danger: string;
  dangerSoft: string;
  tabInactive: string;
};

const STORAGE_KEY = "app_theme_mode";

const LIGHT_COLORS: AppThemeColors = {
  background: "#f5f5f5",
  surface: "#ffffff",
  surfaceAlt: "#f8f9fa",
  text: "#333333",
  textMuted: "#777777",
  primary: "#0056b3",
  onPrimary: "#ffffff",
  border: "#e5e7eb",
  overlay: "rgba(0,0,0,0.5)",
  danger: "#d32f2f",
  dangerSoft: "#ffebee",
  tabInactive: "#8a94a6",
};

const DARK_COLORS: AppThemeColors = {
  background: "#0f172a",
  surface: "#111827",
  surfaceAlt: "#1f2937",
  text: "#e5e7eb",
  textMuted: "#94a3b8",
  primary: "#60a5fa",
  onPrimary: "#0f172a",
  border: "#334155",
  overlay: "rgba(0,0,0,0.65)",
  danger: "#f87171",
  dangerSoft: "#3f1d1d",
  tabInactive: "#64748b",
};

type AppThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: AppThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined,
);

export function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("light");

  React.useEffect(() => {
    let mounted = true;

    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) return;
        if (savedMode === "dark" || savedMode === "light") {
          setMode(savedMode);
        }
      } catch (error) {
        console.log("No se pudo leer el tema guardado:", error);
      }
    };

    loadTheme();

    return () => {
      mounted = false;
    };
  }, []);

  const setThemeMode = (nextMode: ThemeMode) => {
    setMode(nextMode);
    AsyncStorage.setItem(STORAGE_KEY, nextMode).catch((error) => {
      console.log("No se pudo guardar el tema:", error);
    });
  };

  const toggleTheme = () => {
    setThemeMode(mode === "light" ? "dark" : "light");
  };

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === "dark",
      colors: mode === "dark" ? DARK_COLORS : LIGHT_COLORS,
      setThemeMode,
      toggleTheme,
    }),
    [mode],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme debe usarse dentro de AppThemeProvider");
  }
  return context;
}
