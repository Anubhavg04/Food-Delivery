import React, { createContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Load theme from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme + save to localStorage + smooth fade animation
  useEffect(() => {
    const html = document.documentElement;

    // ⚡ Smooth fade transition for background + text
    html.classList.add('transition-colors');
    html.style.transitionDuration = '250ms';

    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // small css fade overlay (cleaner than creating elements manually)
    const fade = document.createElement('div');
    fade.style.position = 'fixed';
    fade.style.inset = '0';
    fade.style.zIndex = '9999';
    fade.style.background = 'var(--bg)';
    fade.style.opacity = '0';
    fade.style.pointerEvents = 'none';
    fade.style.transition = 'opacity 200ms ease';

    document.body.appendChild(fade);

    requestAnimationFrame(() => (fade.style.opacity = '0.85'));

    setTimeout(() => {
      setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

      setTimeout(() => (fade.style.opacity = '0'), 50);

      setTimeout(() => fade.remove(), 250);
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
