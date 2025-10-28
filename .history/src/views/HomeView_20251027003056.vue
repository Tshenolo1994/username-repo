<template>
    <section class="home container">
      <LandingHero @submit="go" />
      <FeatureCards />
      <TrendingRow />
    </section>
  </template>
  
  <style scoped>
  .home { display: grid; gap: 3.5rem; padding-bottom: 4rem; }
  </style>
  