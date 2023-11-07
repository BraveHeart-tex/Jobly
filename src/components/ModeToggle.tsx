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
      className="bg-transparent hover:bg-facebook-400 hover:text-white text-white  transition-all"
      variant="ghost"
      onClick={() => {
        setTheme(isDarkTheme ? "light" : "dark");
      }}
    >
      {isDarkTheme ? <FaSun /> : <FaMoon />}
    </Button>
  );
};
export default ModeToggle;
