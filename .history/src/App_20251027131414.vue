<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"



</script>

<template>
  <div id="app-shell">
    <Header />

    <main class="page">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
#app-shell {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto; 
  background: var(--bg);
  color: var(--text);
}
.page {
  padding: 24px 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
