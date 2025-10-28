import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { GithubCommitListItem } from "@/types/github"
import type { CommitState, LoadStatus, SortOrder } from "@/types/store"

function parseLink(link: string | null) {
  let hasNext = false, hasPrev = false
  if (!link) return { hasNext, hasPrev }
  for (const part of link.split(",")) {
    const rel = /rel="([^"]+)"/.exec(part)?.[1]
    if (rel === "next") hasNext = true
    if (rel === "prev") hasPrev = true
  }
  return { hasNext, hasPrev }
}

export const useCommitStore = defineStore("commits", () => {
  const commits = ref<CommitState["commits"]>([])
  const commitStatus = ref<LoadStatus>("idle")
  const commitError = ref<string>("")

  const page = ref<CommitState["page"]>(1)
  const perPage = ref<CommitState["perPage"]>(10)
  const sort = ref<CommitState["sort"]>("newest")

  const hasNext = ref(false)
  const hasPrev = ref(false)

  const cache = new Map<string, GithubCommitListItem[]>()

  const sorted = computed(() => {
    const list = [...commits.value]
    list.sort((a, b) => {
      const da = new Date(a.commit.author.date).getTime()
      const db = new Date(b.commit.author.date).getTime()
      return sort.value === "newest" ? db - da : da - db
    })
    return list
  })

  async function fetchCommits(username: string, repo: string, toPage?: number) {
    const u = username.trim(), r = repo.trim()
    if (!u || !r) return
    if (typeof toPage === "number") page.value = Math.max(1, toPage)

    const key = `${u}/${r}/${page.value}`
    if (cache.has(key)) {
      commits.value = cache.get(key) || []
      commitStatus.value = "success"
      commitError.value = ""
      hasPrev.value = page.value > 1
      hasNext.value = commits.value.length === perPage.value
      return
    }

    commitStatus.value = "loading"
    commitError.value = ""
    commits.value = []
    hasPrev.value = page.value > 1
    hasNext.value = false

    try {
      const url = `https://api.github.com/repos/${encodeURIComponent(u)}/${encodeURIComponent(r)}/commits?per_page=${perPage.value}&page=${page.value}`
      const res = await fetch(url)

      if (res.status === 403) throw new Error("API rate limit exceeded (403). Try again later.")
      if (res.status === 404) throw new Error("Repository or user not found (404).")
      if (!res.ok) throw new Error(`Failed to fetch commits (${res.status}).`)

      const data = (await res.json()) as GithubCommitListItem[]
      commits.value = data
      cache.set(key, data)

      const { hasNext: n, hasPrev: p } = parseLink(res.headers.get("Link"))
      hasNext.value = n
      hasPrev.value = p

      commitStatus.value = "success"
    } catch (e: any) {
      commitStatus.value = "error"
      commitError.value = e?.message || "Unknown error"
    }
  }

  function setSort(next: SortOrder) {
    sort.value = next

  }

  async function nextPage(username: string, repo: string) {
    if (!hasNext.value) return
    page.value += 1
    await fetchCommits(username, repo, page.value)
  }
  async function prevPage(username: string, repo: string) {
    if (!hasPrev.value) return
    page.value = Math.max(1, page.value - 1)
    await fetchCommits(username, repo, page.value)
  }
  function resetPaging() {
    page.value = 1
    hasNext.value = false
    hasPrev.value = false
  }

  return {
    // state
    commits, commitStatus, commitError,
    page, perPage, sort, hasNext, hasPrev,
   
    sorted,

    fetchCommits, nextPage, prevPage, setSort, resetPaging,
  }
})