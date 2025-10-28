
import { ref, onMounted, watch } from 'vue';

const isDark = ref(true);

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    } else {
      isDark.value = true;
    }
    updateTheme();
  };

  onMounted(() => {
    initTheme();
  });

  watch(isDark, updateTheme);

  return {
    isDark,
    toggleTheme,
  };
}
// import { ref, onMounted } from 'vue'

// type Theme = 'light' | 'dark'
// const KEY = 'commit-explorer:theme'
// const theme = ref<Theme>('dark')

// function apply(t: Theme) {
//   document.documentElement.dataset.theme = t
// }

// export function useTheme() {
//   onMounted(() => {
//     const saved = (localStorage.getItem(KEY) as Theme | null)
//     if (saved === 'light' || saved === 'dark') theme.value = saved
//     else if (window.matchMedia('(prefers-color-scheme: light)').matches)
//       theme.value = 'light'
//     apply(theme.value)
//   })
//   function toggleTheme() {
//     theme.value = theme.value === 'dark' ? 'light' : 'dark'
//     localStorage.setItem(KEY, theme.value)
//     apply(theme.value)
//   }
//   return { theme, toggleTheme }
// }
