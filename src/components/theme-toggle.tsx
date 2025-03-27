import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md p-2 hover:bg-accent"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
