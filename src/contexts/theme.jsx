import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const themeList = ['light', 'dark'];
const themes = themeList.reduce(
  (prev, current) => ({
    ...prev,
    [current]: current,
  }),
  {},
);

const ThemeContext = createContext({
  theme: themes.light,
  setTheme: () => { throw new Error('Not implemented!'); },
  toggleTheme: () => { throw new Error('Not implemented!'); },
  isLight: true,
  isDark: false,
});

export const useThemeProvider = (defaultTheme = themes.light) => {
  const [theme, setTheme] = useState(defaultTheme);
  /**
   * Guarded version of [setTheme], to protect against setting invalid themes
   */
  const updateTheme = useCallback(
    (newTheme) => {
      if (!themeList.includes(newTheme)) {
        throw new Error(`Invalid theme! (valid: ${themeList.join(', ')})`);
      }
      setTheme(newTheme);
    },
    [setTheme],
  );
  /**
   * Change body class (theme) on theme change
   */
  useEffect(
    () => {
      switch (theme) {
        case themes.light:
          if (document.body.classList.contains(themes.dark)) {
            document.body.classList.remove(themes.dark);
          }
          document.body.classList.add(themes.light);
          break;
        case themes.dark:
          if (document.body.classList.contains(themes.light)) {
            document.body.classList.remove(themes.light);
          }
          document.body.classList.add(themes.dark);
          break;
        default:
          throw new Error(`Invalid theme! (valid: ${Object.keys(themes)})`);
      }
    },
    [theme],
  );
  /**
   * Shorthand for toggling theme
   */
  const toggleTheme = useCallback(
    () => {
      setTheme((oldTheme) => (
        oldTheme === themes.light
          ? themes.dark
          : themes.light
      ));
    },
    [setTheme],
  );
  const isLight = useMemo(
    () => theme === themes.light,
    [theme],
  );
  const isDark = useMemo(
    () => theme === themes.dark,
    [theme],
  );
  return {
    theme,
    toggleTheme,
    isLight,
    isDark,
    setTheme: updateTheme,
  };
};

export const ThemeProvider = ({ children }) => {
  const state = useThemeProvider();
  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);