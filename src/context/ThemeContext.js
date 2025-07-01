import React, { createContext, useState, useContext, useMemo } from "react";
import { ConfigProvider, theme } from "antd";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  console.log("ThemeProvider render");

  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const contextValue = useMemo(
    () => ({
      isDark,
      toggleTheme,
    }),
    [isDark]
  );

  const themeConfig = useMemo(
    () => ({
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
