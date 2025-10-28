<template>
    <LandingHero @submit="go" />
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import LandingHero from '@/components/LandingHero.vue'
  
  const router = useRouter()
  function go(username: string) {
    router.push({ name: 'repos', params: { username } })
  }
  </script>
  