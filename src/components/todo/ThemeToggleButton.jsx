import React from "react";
import { Button } from "antd";

import { useTheme } from "../../context/ThemeContext";

const ThemeToggleButton = () => {
  console.log("ThemeToggleButton render");

  const { isDark, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} style={{ marginLeft: "auto" }}>
      切換 {isDark ? "Light" : "Dark"} 模式
    </Button>
  );
};

export default React.memo(ThemeToggleButton);
