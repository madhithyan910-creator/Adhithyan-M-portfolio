import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const saved = localStorage.getItem('adhithyan_theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (targetTheme: Theme) => {
    const root = document.documentElement;
    if (targetTheme === 'light') {
      root.classList.remove('dark');
    } else if (targetTheme === 'dark') {
      root.classList.add('dark');
    } else {
      // System theme is dark by default
      root.classList.add('dark');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('adhithyan_theme', newTheme);
    applyTheme(newTheme);
  };

  const cycleTheme = () => {
    if (theme === 'system') handleThemeChange('light');
    else if (theme === 'light') handleThemeChange('dark');
    else handleThemeChange('system');
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
      title={`Theme: ${theme} (Click to toggle)`}
      aria-label="Toggle visual theme"
    >
      {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
      {theme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
      {theme === 'system' && <Monitor className="w-4 h-4 text-slate-500" />}
      <span className="hidden sm:inline capitalize text-[11px] text-slate-500 dark:text-slate-400">{theme}</span>
    </button>
  );
}
