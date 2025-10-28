<template>
    <section style="padding:1rem">
      <router-link to="/">← Back</router-link>
      <h1>Repos for <code>{{ username }}</code></h1>
      <p>Repo list, commits, favourites, details, sort & pagination come in later phases.</p>
    </section>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  const props = defineProps<{ username: string }>()  
  const { username } = props
  </script>
  