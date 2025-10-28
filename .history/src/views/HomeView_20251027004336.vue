<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search, LineChart, Flag } from "lucide-vue-next";


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

   
    <section class="hero">
      <div class="max-w-3xl mx-auto mt-16 text-center">
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
            placeholder="e.g. octocat"
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
          <Search class="icon" :size="26" />
          <h3>Advanced Search</h3>
          <p>
            Find repositories by name, language, stars, and more using GitHub’s
            API.
          </p>
        </div>

        <div class="card glass">
          <LineChart class="icon" :size="26" />
          <h3>Repository Analytics</h3>
          <p>
            View repository statistics including stars, forks, and watchers.
          </p>
        </div>

        <div class="card glass">
          <Flag class="icon" :size="26" />
          <h3>Issue Tracking</h3>
          <p>
            Browse repository issues, filter by state, and visualize ratios.
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
  background-color: #0b0b0f;
  color: #f4f4f5;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.gradient-ball {
  position: absolute;
  top: -250px;
  left: -150px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #5b21b6, transparent 70%);
  opacity: 0.3;
  filter: blur(120px);
  z-index: 0;
}

/* Hero Section */
.hero-title {
  font-size: 2rem;
  font-weight: 800;
}
.gradient-text {
  background: linear-gradient(to right, #8b5cf6, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-sub {
  color: #a1a1aa;
  margin-bottom: 1.5rem;
}
.search-box {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.search-input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  width: 250px;
  background: #18181b;
  color: #f4f4f5;
  border: 1px solid #27272a;
}
.search-btn {
  background: #8b5cf6;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.search-btn:hover {
  background: #7c3aed;
}

/* Shared Section Styling */
.section {
  display: grid;
  gap: 1.75rem;
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
  z-index: 10;
}
.section-header {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  margin: 0 auto 1.25rem;
}
.section-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
}
.view-all {
  color: #a78bfa;
  font-size: 0.9rem;
  text-decoration: none;
}
.view-all:hover {
  opacity: 0.85;
}

/* Grid + Cards */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  justify-items: center;
}
@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  width: 100%;
  max-width: 340px;
  padding: 1.5rem 1.25rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
}

/* Glass look */
.glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(120%);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
}

.icon {
  color: #c7c9ff;
  margin-bottom: 0.6rem;
}

/* Trending Repo cards */
.repo-name {
  color: #b79bff;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.repo-desc {
  color: #a1a1aa;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
}
.repo-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #a1a1aa;
}
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.3rem;
}
.star {
  width: 14px;
  height: 14px;
  margin-right: 0.3rem;
}
</style>
