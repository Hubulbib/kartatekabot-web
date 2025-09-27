export type Themes = "light" | "dark";

export const ThemeStorageKey = "features-color-theme";

export const getTheme = (): Themes => {
  let theme = localStorage.getItem(ThemeStorageKey) as Themes;

  if (!theme) {
    localStorage.setItem(ThemeStorageKey, "light");
    theme = "light";
  }

  return theme;
};
