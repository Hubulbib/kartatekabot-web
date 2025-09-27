import { createContext } from "react";
import type { Themes } from "../utils/theme";

interface IThemeContext {
  themeSetting?: {
    theme: Themes;
    setTheme: (theme: Themes) => void;
  };
}

export const ThemeContext = createContext<IThemeContext>({});
