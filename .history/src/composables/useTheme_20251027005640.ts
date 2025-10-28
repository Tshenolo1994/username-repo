

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
