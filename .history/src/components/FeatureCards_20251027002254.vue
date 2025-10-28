<script setup lang="ts">
import { Search, LineChart, Flag } from 'lucide-vue-next'
</script>

<template>
  <section class="features-block">
    <h2 class="section-title">Features</h2>

    <div class="features">
      <article class="card glass">
        <Search class="icon" :size="24" />
        <h3>Advanced Search</h3>
        <p>Find repositories by name, language, stars, and more using GitHub’s API.</p>
      </article>

      <article class="card glass">
        <LineChart class="icon" :size="24" />
        <h3>Repository Analytics</h3>
        <p>View repository statistics including stars, forks, and watchers.</p>
      </article>

      <article class="card glass">
        <Flag class="icon" :size="24" />
        <h3>Issue Tracking</h3>
        <p>Browse repository issues, filter by state, and visualize ratios.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.icon {
  width: 44px; height: 44px; padding: 10px;
  color: #c7c9ff;
  background: rgba(199,201,255,0.06);
  border: 1px solid rgba(199,201,255,0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px) saturate(115%);
  -webkit-backdrop-filter: blur(10px) saturate(115%);
  margin: .25rem auto .75rem;
}
</style>
