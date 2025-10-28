import { defineStore } from "pinia"
import { ref } from "vue"
import type { GithubCommitDetails } from "@/types/github"
import type { CommitDetailsState, LoadStatus, FaveCommit } from "@/types/store"

const LS_KEY = "commit_faves_v1"

function loadFaves(): FaveCommit[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as FaveCommit[]) : []
  } catch {
    return []
  }
}
function saveFaves(list: FaveCommit[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list))
}

export const useCommitDetailsStore = defineStore("commitDetails", () => {
  const details = ref<CommitDetailsState["details"]>(null)
  const detailsStatus = ref<LoadStatus>("idle")
  const detailsError = ref<string>("")

  const favourites = ref<FaveCommit[]>(loadFaves())

  async function fetchCommitDetails(username: string, repo: string, sha: string) {
    detailsStatus.value = "loading"
    detailsError.value = ""
    details.value = null

    try {
      const url = `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/commits/${encodeURIComponent(sha)}`
      const res = await fetch(url)

      if (res.status === 403) throw new Error("API rate limit exceeded (403). Try again later.")
      if (res.status === 404) throw new Error("Commit not found (404).")
      if (!res.ok) throw new Error(`Failed to fetch commit details (${res.status}).`)

      const data = (await res.json()) as GithubCommitDetails
      details.value = data
      detailsStatus.value = "success"
    } catch (e: any) {
      detailsStatus.value = "error"
      detailsError.value = e?.message || "Unknown error"
    }
  }

  function addFavourite(f: FaveCommit) {
    if (!favourites.value.some(x => x.sha === f.sha)) {
      favourites.value.unshift(f)
      saveFaves(favourites.value)
    }
  }
  function removeFavourite(sha: string) {
    favourites.value = favourites.value.filter(x => x.sha !== sha)
    saveFaves(favourites.value)
  }

  return {
    details, detailsStatus, detailsError,
    favourites, addFavourite, removeFavourite,
    fetchCommitDetails,
  }
})