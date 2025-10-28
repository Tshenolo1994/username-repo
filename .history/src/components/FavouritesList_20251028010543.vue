<script setup lang="ts">
import { computed } from "vue";
import { useFavesStore } from "@/stores/useFavesStore";
import { ExternalLink, Trash2 } from "lucide-vue-next";

const props = defineProps<{ repoFullName: string }>();
const faves = useFavesStore();

const list = computed(() => faves.byRepo(props.repoFullName));

function remove(key: string) {
  faves.remove(key);
}
</script>

<template>
  <section class="faves">
    <div class="faves__head">
      <h2>Favourites</h2>
      <small class="count" aria-live="polite">{{ list.length }} saved</small>
    </div>

    <div v-if="!list.length" class="state empty">No favourites yet.</div>

    <div v-else class="grid">
      <article v-for="c in list" :key="c.key" class="card glass">
        <h3 class="msg">{{ c.message }}</h3>
        <p class="meta">
          {{ c.authorName }} •
          <time :datetime="c.date">{{
            new Date(c.date).toLocaleString()
          }}</time>
        </p>

        <div class="actions">
          <a
            class="link"
            :href="c.html_url"
            target="_blank"
            rel="noreferrer"
            title="View on GitHub"
          >
            View <ExternalLink :size="14" />
          </a>
          <button
            class="danger"
            type="button"
            @click="remove(c.key)"
            aria-label="Remove favourite"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.faves {
  display: grid;
  gap: 12px;
  margin-top: 4px;
}
.faves__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.count {
  color: var(--muted);
}
.state.empty {
  color: var(--muted);
  background: var(--empty-state-bg);
  padding: 0.7rem 1rem;
  border-radius: 0.6rem;
  text-align: center;
}
.grid {
  display: grid;
  gap: 10px;
}
.card {
  padding: 12px;
  border-radius: 12px;
}
.glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(160%);
}
.msg {
  margin: 0 0 6px;
  font-weight: 700;
}
.meta {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
.actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--link);
  text-decoration: none;
}
.danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid var(--border);
  background: var(--bg-elev);
  color: var(--text);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}
.danger:hover {
  border-color: #ff7b72;
  color: #ff7b72;
}
</style>
