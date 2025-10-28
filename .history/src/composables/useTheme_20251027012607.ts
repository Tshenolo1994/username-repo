import { ref, onMounted, watch } from 'vue';

export const darkTheme = {
  background: '#010409',
  surface: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  secondaryText: '#8b949e',
  buttonBg: '#161b22',
  buttonAccent: '#3fb950',
  linkColor: '#7656FE',
  errorText: '#ff7b72',
  errorBackground: 'rgba(248, 81, 73, 0.1)',
  emptyStateBackground: 'rgba(13, 17, 23, 0.5)',
};

export const lightTheme = {
  background: '#f6f6f6',
  surface: '#fbfefb',
  border: '#d0d7de',
  text: '#24292f',
  secondaryText: '#57606a',
  buttonBg: '#f6f8fa',
  buttonAccent: '#3fb950',
  linkColor: '#7656FE',
  errorText: '#cf222e',
  errorBackground: 'rgba(248, 81, 73, 0.05)',
  emptyStateBackground: 'rgba(246, 248, 250, 0.5)',
};

type Theme = typeof darkTheme;

const isDark = ref(true);

export function useTheme() {
  const theme = ref<Theme>(darkTheme);

  const applyTheme = (themeObj: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--bg', themeObj.background);
    root.style.setProperty('--bg-elev', themeObj.surface);
    root.style.setProperty('--border', themeObj.border);
    root.style.setProperty('--text', themeObj.text);
    root.style.setProperty('--muted', themeObj.secondaryText);
    root.style.setProperty('--button-bg', themeObj.buttonBg);
    root.style.setProperty('--button-accent', themeObj.buttonAccent);
    root.style.setProperty('--link', themeObj.linkColor);
    root.style.setProperty('--error-text', themeObj.errorText);
    root.style.setProperty('--error-bg', themeObj.errorBackground);
    root.style.setProperty('--empty-state-bg', themeObj.emptyStateBackground);
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    theme.value = isDark.value ? darkTheme : lightTheme;
    applyTheme(theme.value);
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    } else {
      isDark.value = true;
    }
    theme.value = isDark.value ? darkTheme : lightTheme;
    applyTheme(theme.value);
  };

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    theme,
    toggleTheme,
  };
}