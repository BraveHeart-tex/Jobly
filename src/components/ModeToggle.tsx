"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { FaMoon, FaSun } from "react-icons/fa";
const ModeToggle = () => {
  const { setTheme, theme, systemTheme } = useTheme();
  const isDarkTheme = theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <Button
      size="icon"
      name="color-mode-toggle"
      aria-label="Toggle color mode between light and dark mode"
      variant="outline"
      onClick={() => {
        setTheme(isDarkTheme ? "light" : "dark");
      }}
    >
      {isDarkTheme ? <FaSun /> : <FaMoon />}
    </Button>
  );
};

export default ModeToggle;
