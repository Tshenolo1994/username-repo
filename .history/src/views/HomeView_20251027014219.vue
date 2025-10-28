<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search, LineChart, Flag } from "lucide-vue-next";

import SearchBar from '@/components/SearchBar.vue';
const features = ref([
  {
    id: 1,
    icon: Search,
    title: "Advanced Search",
    description: "Find repositories by name, language, stars, and more using GitHub's powerful search API.",
  },
  {
    id: 2,
    icon: LineChart,
    title: "Repository Analytics",
    description: "View detailed repository statistics including stars, forks, and watcher counts.",
  },
  {
    id: 3,
    icon: Flag,
    title: "Issue Tracking",
    description: "Browse repository issues, filter by state, and visualize open vs. closed ratios.",
  },
]);

// sample trending repos
const trendingRepos = ref([
  {
    id: 1,
    name: "microsoft/deepspeed",
    stars: 15423,
    description:
      "DeepSpeed is a deep learning optimization library that makes distributed training efficient, effective, and easy.",
    language: "Python",
  },
  {
    id: 2,
    name: "shadcn/ui",
    stars: 34982,
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS.",
    language: "TypeScript",
  },
  {
    id: 3,
    name: "dreamgaussian/dreamgaussian",
    stars: 12354,
    description: "Generating 3D Gaussian Splats from images",
    language: "Python",
  },
]);

const router = useRouter();
const username = ref("");

function search() {
  if (username.value.trim()) {
    router.push(`/repos/${username.value.trim()}`);
  }
}

function getLangColor(lang: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Ruby: "#701516",
  };
  return colors[lang] || "#6e7681";
}
</script>

<template>
  <div class="home-page">
    <div class="gradient-ball"></div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Explore <span class="gradient-text">GitHub</span> Repositories
        </h1>
        <p class="hero-sub">
          Search and browse through millions of open source projects. Discover
          repositories, view details, and track issues all in one place.
        </p>

        <div class="search-box">
            <div class="search-wrapper">
        <SearchBar />
      </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="section-header">
        <h2>Features</h2>
      </div>

      <div class="grid">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="card glass"
        >
          <component :is="feature.icon" class="icon" :size="32" />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Trending -->
    <section class="section">
      <div class="section-header">
        <h2>Trending Repository</h2>
        <a
          href="https://github.com/trending"
          target="_blank"
          rel="noreferrer"
          class="view-all"
        >
          View All ↗
        </a>
      </div>

      <div class="grid">
        <div
          v-for="repo in trendingRepos"
          :key="repo.id"
          class="card glass repo-card"
        >
          <h3 class="repo-name">{{ repo.name }}</h3>
          <p class="repo-desc">{{ repo.description }}</p>
          <div class="repo-meta">
            <div class="lang">
              <span
                class="dot"
                :style="{ backgroundColor: getLangColor(repo.language) }"
              ></span>
              <span>{{ repo.language }}</span>
            </div>
            <div class="stars">
              <svg
                class="star"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
                />
              </svg>
              {{ repo.stars.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  transition: background 0.3s, color 0.3s;
}

.gradient-ball {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle at center, var(--link) 0%, rgba(124, 58, 237, 0.6) 30%, transparent 70%);
  opacity: 0.3;
  filter: blur(100px);
  z-index: 0;
  animation: float 15s ease-in-out infinite;
  transition: background 0.3s;
}

@keyframes float {
  0% {
    transform: translate(-50%, 0) scale(1);
  }
  25% {
    transform: translate(-80%, -40px) scale(1.2);
  }
  50% {
    transform: translate(-20%, 80px) scale(0.85);
  }
  75% {
    transform: translate(-70%, 30px) scale(1.15);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}

/* Hero Section */
.hero {
  padding: 6rem 2rem 4rem;
  position: relative;
  z-index: 10;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  color: var(--muted);
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.search-box {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  flex: 1;
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--link);
  background: var(--bg-elev);
}

.search-input::placeholder {
  color: var(--muted);
}

.search-btn {
  background: var(--button-accent);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

/* .search-btn:hover {
  background: #2ea043;
  transform: translateY(-1px);
} */

/* Shared Section Styling */
.section {
  padding: 4rem 2rem;
  position: relative;
  z-index: 10;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
}

.view-all {
  color: #a78bfa;
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s;
}

.view-all:hover {
  color: #c084fc;
  transform: translateX(2px);
}

/* Grid + Cards */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 2.5rem;
  }
}

.card {
  padding: 2rem 1.75rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
}

/* Glass look */
.glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

[data-theme="light"] .glass {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.glass:hover {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

[data-theme="light"] .glass:hover {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem 0 0.75rem;
  color: var(--text);
}

.card p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.icon {
  color: var(--link);
  margin: 0 auto;
}

/* Trending Repo cards */
.repo-card {
  text-align: left;
  display: flex;
  flex-direction: column;
}

.repo-name {
  color: var(--link);
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  transition: color 0.2s;
  min-height: 1.5rem;
}

.repo-card:hover .repo-name {
  color: var(--link);
  opacity: 0.8;
}

.repo-desc {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  line-height: 1.5;
  flex: 1;
  min-height: 3rem;
}

.repo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--muted);
  margin-top: auto;
}

.lang {
  display: flex;
  align-items: center;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
F
.star {
  width: 16px;
  height: 16px;
  color: #fbbf24;
}
</style>