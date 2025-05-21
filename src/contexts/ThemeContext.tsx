import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeColor = 'green' | 'blue' | 'purple' | 'orange' | 'red';

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  themeColor: 'green',
  setTheme: () => null,
  setThemeColor: () => null,
  isDarkMode: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });
  
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem('themeColor') as ThemeColor;
    return savedColor || 'green';
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Update theme in localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const applyTheme = () => {
      const isDark = 
        theme === 'dark' || 
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(isDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    applyTheme();
    
    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);
  
  // Update theme color in localStorage and apply CSS variables
  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    
    // Apply theme color CSS variables
    const root = document.documentElement;
    
    const colors = {
      green: {
        primary: 'rgb(34, 197, 94)',
        primaryDark: 'rgb(22, 163, 74)',
        primaryLight: 'rgb(134, 239, 172)',
      },
      blue: {
        primary: 'rgb(59, 130, 246)',
        primaryDark: 'rgb(37, 99, 235)',
        primaryLight: 'rgb(147, 197, 253)',
      },
      purple: {
        primary: 'rgb(168, 85, 247)',
        primaryDark: 'rgb(147, 51, 234)',
        primaryLight: 'rgb(216, 180, 254)',
      },
      orange: {
        primary: 'rgb(249, 115, 22)',
        primaryDark: 'rgb(234, 88, 12)',
        primaryLight: 'rgb(253, 186, 116)',
      },
      red: {
        primary: 'rgb(239, 68, 68)',
        primaryDark: 'rgb(220, 38, 38)',
        primaryLight: 'rgb(252, 165, 165)',
      },
    };
    
    const selectedColor = colors[themeColor];
    
    root.style.setProperty('--color-primary', selectedColor.primary);
    root.style.setProperty('--color-primary-dark', selectedColor.primaryDark);
    root.style.setProperty('--color-primary-light', selectedColor.primaryLight);
    
  }, [themeColor]);
  
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const setThemeColor = (newColor: ThemeColor) => {
    setThemeColorState(newColor);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColor, setTheme, setThemeColor, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
