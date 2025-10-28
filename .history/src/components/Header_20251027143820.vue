<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import SearchBar from '@/components/SearchBar.vue'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <div class="header-content">
 
      <router-link to="/" class="logo" aria-label="Go to Home">
        <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07
            -.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2
            -.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2
            .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
            0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
            .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        <span class="logo-text">GitHub Explorer</span>
      </router-link>


      <div class="header-search">
        <SearchBar />
      </div>

      <nav class="nav">
        <button
          @click="toggleTheme"
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>

        <a href="https://github.com" target="_blank" rel="noreferrer" class="github-link">
          GitHub.com
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  transition: background 0.3s, border-color 0.3s;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto; 
  align-items: center;
  gap: 0.75rem;
}


.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--text);
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  transition: color 0.2s;
}
.logo:hover { color: var(--link); }
.logo svg { flex-shrink: 0; }
.logo-text { font-weight: 600; }


.header-search {
  min-width: 220px;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}


.nav {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: var(--text);
  transition: all 0.2s;
}
.theme-toggle:hover {
  background: var(--border);
  transform: rotate(15deg);
}

.github-link {
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s;
}
.github-link:hover {
  color: var(--link);
  background: var(--bg-elev);
}


@media (max-width: 900px) {
  .logo-text { display: none; }
  .github-link { display: none; } 
}

@media (max-width: 640px) {
  .header-content {
    grid-template-columns: 1fr auto; 
    grid-template-rows: auto auto;   
  }
  .header-search {
    grid-column: 1 / -1;
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>