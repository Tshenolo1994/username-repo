<!-- src/components/FavouritesList.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Trash2, ExternalLink, Star } from "lucide-vue-next";
import { useFavesStore } from "@/stores/useFavesStore";

const props = defineProps<{
  repoFullName: string; // "username/repo"
}>();

const faves = useFavesStore();
const router = useRouter();

const list = computed(() =>
  faves.items.filter(i => i.repoFullName === props.repoFullName)
);

function openDetails(item: { sha: string }) {
  const [username, repo] = props.repoFullName.split("/");
  router.push({ name: "commitDetails", params: { username, repo, sha: item.sha } });
}
</script>

<template>
  <aside class="faves">
    <header class="faves__bar">
      <h2 class="faves__title">
        <Star :size="16" /> Favourites ({{ list.length }})
      </h2>
      <button
        v-if="list.length"
        class="clear"
        @click="faves.clearRepo(repoFullName)"
        title="Clear favourites for this repo"
      >
        Clear
      </button>
    </header>

    <div v-if="!list.length" class="empty">
      No favourites yet. Click the star on a commit to add it.
    </div>

    <ul v-else class="faves__list">
      <li v-for="f in list" :key="f.sha" class="card glass">
        <button class="msg" @click="openDetails(f)">
          {{ f.message }}
        </button>
        <p class="meta">
          {{ f.authorName }} •
          <time :datetime="f.date">{{ new Date(f.date).toLocaleString() }}</time>
        </p>

        <div class="row">
          <a
            class="sha"
            :href="`https://github.com/${f.repoFullName}/commit/${f.sha}`"
            target="_blank"
            rel="noreferrer"
          >
            {{ f.sha.slice(0,7) }}
            <ExternalLink :size="14" />
          </a>

          <button class="icon-btn danger" @click="faves.remove(f.sha)" title="Remove">
            <Trash2 :size="16" />
          </button>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.faves { display: grid; gap: 12px; }
.faves__bar { display: flex; align-items: center; justify-content: space-between; }
.faves__title { display: inline-flex; gap: 6px; align-items: center; margin: 0; font-size: 1rem; }
.clear {
  background: var(--bg-elev); color: var(--text); border: 1px solid var(--border);
  padding: .35rem .6rem; border-radius: .4rem; cursor: pointer;
}
.empty {
  color: var(--muted);
  background: var(--empty-state-bg);
  padding: .9rem 1rem;
  border-radius: .6rem;
  text-align: center;
}
.faves__list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.card { padding: 12px; border-radius: 12px; }
.glass{ background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(16px) saturate(160%); }
.msg {
  width: 100%; text-align: left; background: transparent; border: none; color: var(--text);
  font-weight: 700; cursor: pointer; padding: 0; margin: 0 0 6px;
}
.meta { color: var(--muted); font-size: 13px; margin: 0 0 8px; }
.row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.sha {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--link); text-decoration: none; font-family: ui-monospace,monospace;
  border: 1px solid var(--border); background: var(--bg-elev);
  padding: .2rem .45rem; border-radius: 6px;
}
.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--bg-elev); color: var(--text);
  cursor: pointer;
}
.icon-btn.danger { border-color: #e5534b; color: #e5534b; }
</style>