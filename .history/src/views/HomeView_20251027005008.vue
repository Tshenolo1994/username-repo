<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search, LineChart, Flag } from "lucide-vue-next";

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
          <input
            v-model="username"
            placeholder="Search GitHub repositories..."
            class="search-input"
          />
          <button @click="search" class="search-btn">Search</button>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="section-header">
        <h2>Features</h2>
      </div>

      <div class="grid">
        <div class="card glass">
          <Search class="icon" :size="32" />
          <h3>Advanced Search</h3>
          <p>
            Find repositories by name, language, stars, and more using GitHub's powerful search API.
          </p>
        </div>

        <div class="card glass">
          <LineChart class="icon" :size="32" />
          <h3>Repository Analytics</h3>
          <p>
            View detailed repository statistics including stars, forks, and watcher counts.
          </p>
        </div>

        <div class="card glass">
          <Flag class="icon" :size="32" />
          <h3>Issue Tracking</h3>
          <p>
            Browse repository issues, filter by state, and visualize open vs. closed ratios.
          </p>
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
  background: linear-gradient(to bottom, #1a1a2e 0%, #0f0f1a 50%, #0a0a0f 100%);
  color: #f4f4f5;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.gradient-ball {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #5b21b6 0%, #7c3aed 30%, transparent 70%);
  opacity: 0.4;
  filter: blur(100px);
  z-index: 0;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, 0) scale(1);
  }
  25% {
    transform: translate(-30%, -20px) scale(1.1);
  }
  50% {
    transform: translate(-70%, 20px) scale(0.9);
  }
  75% {
    transform: translate(-40%, -10px) scale(1.05);
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
  color: #9ca3af;
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
  background: rgba(30, 30, 40, 0.8);
  color: #f4f4f5;
  border: 1px solid rgba(139, 92, 246, 0.3);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #8b5cf6;
  background: rgba(30, 30, 40, 0.95);
}

.search-input::placeholder {
  color: #6b7280;
}

.search-btn {
  background: #10b981;
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.search-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

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
  color: #f4f4f5;
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
  background: rgba(30, 30, 45, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem 0 0.75rem;
  color: #f4f4f5;
}

.card p {
  color: #9ca3af;
  font-size: 0.95rem;
  line-height: 1.6;
}

.icon {
  color: #a78bfa;
  margin: 0 auto;
}

/* Trending Repo cards */
.repo-card {
  text-align: left;
}

.repo-name {
  color: #a78bfa;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  transition: color 0.2s;
}

.repo-card:hover .repo-name {
  color: #c084fc;
}

.repo-desc {
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.repo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #9ca3af;
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

.star {
  width: 16px;
  height: 16px;
  color: #fbbf24;
}
</style>