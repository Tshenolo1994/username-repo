<script setup lang="ts">
import { Search, LineChart, Flag } from 'lucide-vue-next'
</script>

<template>
  <section class="features-section">
    <h2 class="section-heading">Features</h2>

    <div class="feature-grid">
      <article class="card glass">
        <Search class="icon" :size="26" />
        <h3>Advanced Search</h3>
        <p>Find repositories by name, language, stars, and more using GitHub’s API.</p>
      </article>

      <article class="card glass">
        <LineChart class="icon" :size="26" />
        <h3>Repository Analytics</h3>
        <p>View repository statistics including stars, forks, and watchers.</p>
      </article>

      <article class="card glass">
        <Flag class="icon" :size="26" />
        <h3>Issue Tracking</h3>
        <p>Browse repository issues, filter by state, and visualize ratios.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  display: grid;
  gap: 2rem;
  text-align: center;
  padding: 2rem 0;
}

.section-heading {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(90deg, #c084fc, #a855f7, #7e22ce);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.card {
  width: 100%;
  max-width: 330px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  border-radius: 16px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.icon {
  margin-bottom: 0.75rem;
  color: #c7c9ff;
}
</style>
