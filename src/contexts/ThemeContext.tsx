
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { value: Theme; label: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  { value: 'light' as Theme, label: 'Light' },
  { value: 'dark' as Theme, label: 'Dark' },
  { value: 'ocean' as Theme, label: 'Ocean Blue' },
  { value: 'forest' as Theme, label: 'Forest Green' },
  { value: 'sunset' as Theme, label: 'Sunset Orange' },
  { value: 'purple' as Theme, label: 'Royal Purple' },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('stocksensei-theme') as Theme;
    if (savedTheme && themes.find(t => t.value === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(t.value));
    
    // Add current theme class
    if (theme !== 'light') {
      root.classList.add(theme);
    }
    
    localStorage.setItem('stocksensei-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
