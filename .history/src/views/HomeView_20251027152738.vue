<script setup lang="ts">
import type { Component } from "vue"
import { ref } from "vue"
import { Search, LineChart, Flag } from "lucide-vue-next"
import SearchBar from "@/components/SearchBar.vue"
import type { FeatureCard, DemoTrendingRepo } from "@/types/ui"


const features = ref<FeatureCard[]>([
  {
    id: 1,
    icon: Search as Component,
    title: "Username → Repositories",
    description:
      "Fetch a user’s public repositories with validation and rate-limit handling (404/403).",
  },
  {
    id: 2,
    icon: LineChart as Component,
    title: "Commits & Sorting",
    description:
      "List commits for a repo, sort by date (newest/oldest), and paginate 10 at a time.",
  },
  {
    id: 3,
    icon: Flag as Component,
    title: "Diffs & Favourites",
    description:
      "Open commit details with additions/deletions & add/remove favourite commits (persisted).",
  },
])


const trendingRepos = ref<DemoTrendingRepo[]>([
  {
    id: 1,
    name: "microsoft/deepspeed",
    stars: 15423,
    description: "Deep learning optimization for distributed training.",
    language: "Python",
  },
  {
    id: 2,
    name: "shadcn/ui",
    stars: 34982,
    description: "Beautiful components built with Radix UI and Tailwind CSS.",
    language: "TypeScript",
  },
  {
    id: 3,
    name: "dreamgaussian/dreamgaussian",
    stars: 12354,
    description: "Generating 3D Gaussian Splats from images.",
    language: "Python",
  },
])

function getLangColor(lang: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Ruby: "#701516",
  }
  return colors[lang] ?? "#6e7681"
}
</script>

<template>
  <div class="home-page">
    <div class="gradient-ball" aria-hidden="true"></div>


    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Explore <span class="gradient-text">GitHub</span> Repositories
        </h1>
        <p class="hero-sub">
          Search and browse open-source projects. Discover repositories, view commits and diffs, and save favourites.
        </p>

        <div class="search-box">
          <div class="search-wrapper">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>


    <section class="section">
      <div class="section-header">
        <h2>Features</h2>
      </div>

      <div class="grid">
        <article v-for="f in features" :key="f.id" class="card glass">
          <component :is="f.icon" :size="32" class="icon" />
          <h3>{{ f.title }}</h3>
          <p>{{ f.description }}</p>
        </article>
      </div>
    </section>

    <!-- DEMO / TRENDING -->
    <section class="section">
      <div class="section-header">
        <h2>Trending Repository</h2>
        <a
          href="https://github.com/trending"
          target="_blank"
          rel="noreferrer"
          class="view-all"
        >View All ↗</a>
      </div>

      <div class="grid">
        <article v-for="repo in trendingRepos" :key="repo.id" class="card glass repo-card">
          <h3 class="repo-name">{{ repo.name }}</h3>
          <p class="repo-desc">{{ repo.description }}</p>
          <div class="repo-meta">
            <div class="lang">
              <span class="dot" :style="{ backgroundColor: getLangColor(repo.language) }"></span>
              <span>{{ repo.language }}</span>
            </div>
            <div class="stars">
              <svg class="star" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
                />
              </svg>
              {{ repo.stars.toLocaleString() }}
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page { background: var(--bg); color: var(--text); min-height: 100vh; width: 100%; overflow-x: hidden; position: relative; transition: background .3s, color .3s; }
.gradient-ball { width: 400px; height: 400px; background: radial-gradient(circle, #6e40c9, #e9bdef); border-radius: 50%; position: absolute; filter: blur(150px); opacity: .6; z-index: 0; animation: moveBall 15s infinite ease-in-out; }
@keyframes moveBall { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(200px,100px) scale(1.2)} 50%{transform:translate(400px,200px) scale(1)} 75%{transform:translate(200px,300px) scale(.8)} 100%{transform:translate(0,0) scale(1)} }

.hero { padding: 6rem 2rem 4rem; position: relative; z-index: 10; }
.hero-content { max-width: 900px; margin: 0 auto; text-align: center; }
.hero-title { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.2; }
.gradient-text { background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-sub { color: var(--muted); font-size: 1.125rem; margin-bottom: 2.5rem; line-height: 1.6; }
.search-box { display: flex; justify-content: center; gap: .75rem; max-width: 600px; margin: 0 auto; }

.section { padding: 4rem 2rem; position: relative; z-index: 10; }
.section-header { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; }
.section-header h2 { font-size: 2rem; font-weight: 700; color: var(--text); }

.view-all { color: #a78bfa; font-size: .9rem; text-decoration: none; display: flex; align-items: center; gap: .25rem; transition: all .2s; }
.view-all:hover { color: #c084fc; transform: translateX(2px); }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
@media (max-width: 980px) { .grid { grid-template-columns: 1fr; } .hero-title { font-size: 2.5rem; } }

.card { padding: 2rem 1.75rem; border-radius: 12px; text-align: center; transition: all .3s ease; }
.card:hover { transform: translateY(-6px); }

.glass { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(20px) saturate(180%); box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1); transition: all .3s ease; }
[data-theme="light"] .glass { background: rgba(255,255,255,.7); border: 1px solid rgba(255,255,255,.3); box-shadow: 0 8px 32px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.5); }

.card h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 .75rem; color: var(--text); }
.card p { color: var(--muted); font-size: .95rem; line-height: 1.6; }
.icon { color: var(--link); margin: 0 auto; }

.repo-card { text-align: left; display: flex; flex-direction: column; }
.repo-name { color: var(--link); font-weight: 600; font-size: 1.1rem; margin: 0 0 .75rem 0; transition: color .2s; min-height: 1.5rem; }
.repo-card:hover .repo-name { opacity: .8; }
.repo-desc { color: var(--muted); font-size: .9rem; margin-bottom: 1.25rem; line-height: 1.5; flex: 1; min-height: 3rem; }
.repo-meta { display: flex; justify-content: space-between; align-items: center; font-size: .875rem; color: var(--muted); margin-top: auto; }
.lang { display: flex; align-items: center; }
.dot { width: 12px; height: 12px; border-radius: 50%; margin-right: .5rem; }
.stars { display: flex; align-items: center; gap: .35rem; }
.star { width: 16px; height: 16px; color: #fbbf24; }
</style>
