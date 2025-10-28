<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCommitDetailsStore } from "@/store/useCommitDetailsStore"
const route = useRoute()
const router = useRouter()
const store = useCommitDetailsStore()

const username = computed(() => route.params.username as string)
const repo = computed(() => route.params.repo as string)
const sha = computed(() => route.params.sha as string)

onMounted(() => {
  if (username.value && repo.value && sha.value) {
    store.fetchCommitDetails(username.value, repo.value, sha.value)
  }
})

const isLoading = computed(() => store.detailsStatus === "loading")
const isError   = computed(() => store.detailsStatus === "error")
const errorMsg  = computed(() => store.detailsError)
const commit    = computed(() => store.details)
const shortSha  = computed(() => sha.value.slice(0, 7))
const isFav     = computed(() => store.isFavourite(sha.value))

function goBack() {
  router.push({ name: "commits", params: { username: username.value, repo: repo.value } })
}
function viewOnGithub() {
  if (commit.value?.html_url) window.open(commit.value.html_url, "_blank", "noopener,noreferrer")
}
function toggleFavourite() {
  if (!commit.value) return
  if (isFav.value) {
    store.removeFavourite(sha.value)
  } else {
    store.addFavourite({
      sha: sha.value,
      repoFullName: `${username.value}/${repo.value}`,
      message: commit.value.commit.message,
      authorName: commit.value.commit.author.name,
      date: commit.value.commit.author.date,
    })
  }
}
</script>

<template>
  <div class="details">
    <header class="heading">
      <button class="btn ghost" @click="goBack">← Back to commits</button>
      <h1 class="title">
        Commit <span class="accent">{{ shortSha }}</span>
        <span class="muted">in</span>
        <span class="accent">{{ repo }}</span>
      </h1>
      <div class="actions">
        <button class="btn" @click="viewOnGithub">View on GitHub ↗️</button>
        <button class="btn accent" @click="toggleFavourite">
          {{ isFav ? "Remove favourite" : "Add to favourites" }}
        </button>
      </div>
    </header>

    <div v-if="isLoading" class="status">Loading commit details…</div>
    <div v-else-if="isError" class="status error">{{ errorMsg }}</div>
    <div v-else-if="!commit" class="status">No details available.</div>

    <div v-else class="content">
      <section class="card glass">
        <h2 class="message">{{ commit.commit.message }}</h2>
        <p class="meta">
          Author: <strong>{{ commit.commit.author.name }}</strong>
          <span class="sep">•</span>
          {{ new Date(commit.commit.author.date).toLocaleString() }}
        </p>

        <div class="stats">
          <span class="chip added">+{{ commit.stats?.additions ?? 0 }} additions</span>
          <span class="chip removed">-{{ commit.stats?.deletions ?? 0 }} deletions</span>
          <span class="chip neutral">{{ commit.stats?.total ?? 0 }} total changes</span>
        </div>
      </section>

      <section class="card glass">
        <div class="section-head">
          <h3 class="section-title">
            Files changed <span class="badge">{{ commit.files?.length ?? 0 }}</span>
          </h3>
        </div>

        <div v-if="!commit.files?.length" class="empty">No files in this commit.</div>

        <ul v-else class="files">
          <li v-for="f in commit.files" :key="f.filename" class="file">
            <div class="file-main">
              <span class="filename">{{ f.filename }}</span>
              <span class="status-badge" :class="f.status">{{ f.status }}</span>
            </div>

            <div class="file-meta">
              <span class="additions">+{{ f.additions }}</span>
              <span class="deletions">-{{ f.deletions }}</span>
              <span class="changes">{{ f.changes }} changes</span>
              <span v-if="f.previous_filename" class="renamed">renamed from {{ f.previous_filename }}</span>
            </div>

            <details v-if="f.patch" class="diff">
              <summary>Show patch</summary>
              <pre><code>{{ f.patch }}</code></pre>
            </details>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.details { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; color: var(--text); }
.heading { display: grid; grid-template-columns: 1fr auto; gap: 1rem; align-items: center; margin-bottom: 1.25rem; }
.title { grid-column: 1 / -1; text-align: center; font-size: 1.8rem; font-weight: 800; margin: .25rem 0 .75rem; }
.actions { grid-column: 1 / -1; display: flex; justify-content: center; gap: .6rem; flex-wrap: wrap; }
.accent { color: var(--link); } .muted { color: var(--muted); margin: 0 .35rem; }

.status { text-align: center; color: var(--muted); padding: 2rem 0; }
.status.error { color: var(--error-text); }

.card { border: 1px solid var(--border); background: rgba(255,255,255,.05); backdrop-filter: blur(14px) saturate(160%); border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; }

.message { margin: 0 0 .35rem 0; font-size: 1.15rem; font-weight: 700; }
.meta { color: var(--muted); margin: 0 0 .75rem 0; }
.sep { margin: 0 .35rem; color: var(--muted); }

.stats { display: flex; flex-wrap: wrap; gap: .5rem; }
.chip { padding: .35rem .6rem; border-radius: 999px; font-size: .85rem; font-weight: 700; border: 1px solid var(--border); background: var(--bg-elev); }
.chip.added { color:#34d399; border-color:#065f46; } .chip.removed { color:#f87171; border-color:#7f1d1d; } .chip.neutral { color: var(--text); }

.section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom: .75rem; }
.section-title { margin: 0; font-weight: 800; }
.badge { margin-left:.5rem; padding:.15rem .5rem; border:1px solid var(--border); border-radius:999px; font-size:.8rem; color:var(--muted); }

.empty { color: var(--muted); text-align: center; padding: .75rem 0; }

.files { list-style:none; padding:0; margin:0; display:grid; gap:.75rem; }
.file { border:1px solid var(--border); border-radius:10px; padding:.9rem 1rem; background: rgba(255,255,255,.04); }
.file-main { display:flex; align-items:center; gap:.6rem; margin-bottom:.35rem; }
.filename { font-weight:700; color:var(--text); }

.status-badge { text-transform:capitalize; font-size:.8rem; border-radius:999px; padding:.15rem .5rem; border:1px solid var(--border); color:var(--muted); }
.status-badge.added { color:#34d399; border-color:#065f46; }
.status-badge.modified { color:#60a5fa; border-color:#1e3a8a; }
.status-badge.removed { color:#f87171; border-color:#7f1d1d; }
.status-badge.renamed { color:#fbbf24; border-color:#92400e; }

.file-meta { display:flex; flex-wrap:wrap; gap:.6rem; color:var(--muted); font-size:.85rem; margin-bottom:.35rem; }
.additions { color:#34d399; } .deletions { color:#f87171; } .renamed { color:#fbbf24; }

.diff summary { cursor:pointer; color:var(--link); font-weight:700; margin-top:.35rem; }
.diff pre { margin:.5rem 0 0; padding:.75rem; border-radius:8px; background:#0a0f16; color:#c9d1d9; overflow:auto; line-height:1.35; border:1px solid var(--border); }

.btn { background:var(--bg-elev); color:var(--text); border:1px solid var(--border); padding:.55rem .9rem; border-radius:8px; font-weight:700; cursor:pointer; transition:all .15s ease; }
.btn:hover { background:var(--border); }
.btn.ghost { background:transparent; }
.btn.accent { background:var(--link); color:#fff; border-color:transparent; }
.btn.accent:hover { filter:brightness(.95); }
</style>