<script setup lang="ts">
import { Heart } from "lucide-vue-next";

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">GitHub Repository Explorer © {{ currentYear }}</p>
      <p class="footer-credits">
        Designed and developed by <a href="#" class="footer-link">Tshenolo</a>
        <Heart :size="16" class="heart-icon" />
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg);
  border-top: 1px solid var(--border);
  padding: 2rem;
  margin-top: auto;
  transition: background 0.3s, border-color 0.3s;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.footer-credits {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
}

.heart-icon {
  color: #a78bfa;
  fill: none;
}

.footer-link {
  color: var(--link);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.footer-link:hover {
  opacity: 0.8;
}

@media (max-width: 640px) {
  .footer {
    padding: 1.5rem 1rem;
  }

  .footer-text,
  .footer-credits {
    font-size: 0.85rem;
  }
}
</style>
