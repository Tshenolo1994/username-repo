<template>
    <section style="padding:1rem">
      <h1>Home (stub)</h1>
      <p>Landing page UI comes in Phase 4 (hero + search + theme toggle).</p>
  
 
      <router-link :to="{ name: 'repos', params: { username: 'octocat' } }">
        Go to /repos/octocat →
      </router-link>
    </section>
  </template>
  
  <script setup lang="ts"></script>
  