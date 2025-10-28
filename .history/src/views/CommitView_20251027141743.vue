<script setup lang="ts">
import { computed, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCommitStore } from "@/stores/useCommitStore"
import SearchBar from "@/components/SearchBar.vue"
import Pagination from "@/components/Pagination.vue"

const route = useRoute()
const router = useRouter()
const store = useCommitStore()

const username = computed(() => String(route.params.username || ""))
const repo = computed(() => String(route.params.repo || ""))

watchEffect(() => {
  if (!username.value || !repo.value) return
  store.resetPaging()
  store.fetchCommits(username.value, repo.value, 1)
})
</script>

<template>
  <section class="commit-page">
    <div class="bar">
      <button class="back" @click="router.push({ name: 'repos', params: { username } })">← Back</button>
      <h1 class="title">Commits: <code>{{ username }}/{{ repo }}</code></h1>
      <div class="sort">
        <label>Sort:</label>
        <select v-model="store.sort" @change="store.setSort(store.sort)">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>

    <SearchBar />

    <div v-if="store.commitStatus === 'loading'" class="state">Loading commits…</div>
    <div v-else-if="store.commitError" class="state err">{{ store.commitError }}</div>

    <ul v-else-if="store.sorted.length" class="commit-list">
      <li v-for="c in store.sorted" :key="c.sha" class="card glass">
        <div class="top">
          <h3 class="msg">{{ c.commit.message }}</h3>
          <a class="sha" :href="c.html_url" target="_blank" rel="noreferrer">{{ c.sha.slice(0, 7) }}</a>
        </div>
        <div class="meta">
          <span>Author: {{ c.commit.author.name }}</span>
          <span>•</span>
          <time :datetime="c.commit.author.date">{{ new Date(c.commit.author.date).toLocaleString() }}</time>
        </div>
      </li>
    </ul>

    <div v-else class="state empty">No commits found.</div>

    <Pagination
      :page="store.page"
      :hasNext="store.hasNext"
      :hasPrev="store.hasPrev"
      :loading="store.commitStatus === 'loading'"
      @next="store.nextPage(username, repo)"
      @prev="store.prevPage(username, repo)"
    />
  </section>
</template>

<style scoped>
.commit-page { display:grid; gap:16px; }
.bar { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; }
.back { justify-self:start; background:var(--bg-elev); color:var(--text); border:1px solid var(--border); padding:.45rem .7rem; border-radius:.5rem; }
.title { justify-self:center; font-weight:800; }
.sort { justify-self:end; display:flex; gap:.5rem; align-items:center; }
.sort select{ background:var(--bg-elev); color:var(--text); border:1px solid var(--border); padding:.35rem .5rem; border-radius:.4rem; }
.state { color:var(--muted); background:var(--empty-state-bg); padding:.9rem 1rem; border-radius:.6rem; text-align:center; }
.state.err { color:var(--error-text); background:var(--error-bg); }
.commit-list { display:grid; gap:12px; }
.card { padding:14px; border-radius:12px; }
.top { display:flex; justify-content:space-between; gap:12px; }
.msg { margin:0; font-weight:700; }
.sha { color:#b7a7ff; text-decoration:none; font-family:ui-monospace,monospace; }
.meta { color:var(--muted); font-size:13px; margin-top:6px; display:flex; gap:8px; }
.glass{ background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); backdrop-filter:blur(16px) saturate(160%); box-shadow:0 6px 24px rgba(0,0,0,.4); }
</style>