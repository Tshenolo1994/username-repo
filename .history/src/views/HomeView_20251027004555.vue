<template>
  <section class="home">
    <LandingHero @submit="go" />
    <FeatureCards />
    <TrendingRow />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LandingHero from '@/components/LandingHero.vue'
import FeatureCards from '@/components/FeatureCards.vue'
import TrendingRow from '@/components/TrendingRow.vue'

const router = useRouter()
function go(username: string) {
  router.push({ name: 'repos', params: { username } })
}
</script>

<style scoped>
.home { display:grid; gap:2.25rem; max-width:1100px; margin:0 auto; padding:1.25rem; }
</style>
