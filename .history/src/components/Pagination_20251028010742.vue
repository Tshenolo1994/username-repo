<script setup lang="ts">
const props = defineProps<{
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  loading?: boolean;
}>();
const emit = defineEmits<{ (e: "next"): void; (e: "prev"): void }>();
</script>

<template>
  <div class="pager">
    <button class="btn" :disabled="!hasPrev || loading" @click="$emit('prev')">
      ← Previous
    </button>
    <span class="page">Page {{ page }}</span>
    <button class="btn" :disabled="!hasNext || loading" @click="$emit('next')">
      Next →
    </button>
  </div>
</template>

<style scoped>
.pager {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}
.btn {
  background: var(--bg-elev);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 0.5rem 0.9rem;
  border-radius: 0.5rem;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.page {
  color: var(--muted);
  min-width: 80px;
  text-align: center;
}
</style>
