import { defineStore } from "pinia"
import { ref } from "vue"
import type { GithubRepo } from "@/types/github"
import type { LoadStatus } from "@/types/store"

function parseLink(link: string | null) {
  let hasNext = false, hasPrev = false
  if (!link) return { hasNext, hasPrev }
  for (const p of link.split(",")) {
    const rel = /rel="([^"]+)"/.exec(p)?.[1]
    if (rel === "next") hasNext = true
    if (rel === "prev") hasPrev = true
  }
  return { hasNext, hasPrev }
}

export const useRepoStore = defineStore("repos", () => {
  const repos = ref<GithubRepo[]>([])
  const repoStatus = ref<LoadStatus>("idle")
  const repoError = ref<string>("")

  const page = ref(1)
  const perPage = ref(10)
  const hasNext = ref(false)
  const hasPrev = ref(false)

  const cache = new Map<string, GithubRepo[]>()

  async function fetchRepos(username: string, toPage?: number) {
    const u = username.trim()
    if (!u) return
    if (typeof toPage === "number") page.value = Math.max(1, toPage)

    const key = `${u}/${page.value}`
    if (cache.has(key)) {
      repos.value = cache.get(key) || []
      repoStatus.value = "success"
      repoError.value = ""
      hasPrev.value = page.value > 1
      hasNext.value = repos.value.length === perPage.value
      return
    }

    repoStatus.value = "loading"
    repoError.value = ""
    repos.value = []
    hasPrev.value = page.value > 1
    hasNext.value = false

    try {
      const url =
        `https://api.github.com/users/${encodeURIComponent(u)}/repos?per_page=${perPage.value}&page=${page.value}&sort=updated`
      const res = await fetch(url)

      if (res.status === 403) throw new Error("API rate limit exceeded (403). Try again later.")
      if (res.status === 404) throw new Error("User not found (404).")
      if (!res.ok) throw new Error(`Failed to fetch repos (${res.status}).`)

      const data = (await res.json()) as GithubRepo[]
      repos.value = data
      cache.set(key, data)

      const { hasNext: n, hasPrev: p } = parseLink(res.headers.get("Link"))
      hasNext.value = n
      hasPrev.value = p

      repoStatus.value = "success"
    } catch (e: any) {
      repoStatus.value = "error"
      repoError.value = e?.message || "Unknown error"
    }
  }

  async function nextPage(username: string) {
    if (!hasNext.value) return
    page.value += 1
    await fetchRepos(username, page.value)
  }
  async function prevPage(username: string) {
    if (!hasPrev.value) return
    page.value = Math.max(1, page.value - 1)
    await fetchRepos(username, page.value)
  }
  function resetPaging() {
    page.value = 1
    hasNext.value = false
    hasPrev.value = false
  }

  return {
    // state
    repos, repoStatus, repoError,
    page, perPage, hasNext, hasPrev,
  =
    fetchRepos, nextPage, prevPage, resetPaging,
  }
})