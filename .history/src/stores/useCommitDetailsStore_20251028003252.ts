// src/stores/useCommitDetailsStore.ts
import { defineStore } from "pinia"
import type { GithubCommitDetails } from "@/types/github"

type LoadStatus = "idle" | "loading" | "success" | "error"

interface State {
  details: GithubCommitDetails | null
  detailsStatus: LoadStatus
  detailsError: string
}

const GITHUB_BASE = "https://api.github.com"

export const useCommitDetailsStore = defineStore("commitDetails", {
  state: (): State => ({
    details: null,
    detailsStatus: "idle",
    detailsError: "",
  }),

  actions: {
    reset() {
      this.details = null
      this.detailsStatus = "idle"
      this.detailsError = ""
    },

    async fetchCommitDetails(username: string, repo: string, sha: string) {
      this.detailsStatus = "loading"
      this.detailsError = ""
      this.details = null

      try {
        const url = `${GITHUB_BASE}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/commits/${encodeURIComponent(sha)}`

        const headers: Record<string, string> = { Accept: "application/vnd.github+json" }
        // Optional: if you have a token, Vite env var: import.meta.env.VITE_GITHUB_TOKEN
        const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
        if (token) headers.Authorization = `Bearer ${token}`

        const res = await fetch(url, { headers })

        if (!res.ok) {
          let reason = `${res.status} ${res.statusText}`
          // Try to read message body for clearer error
          try {
            const j = await res.json()
            if (j?.message) reason = j.message
          } catch {}
          throw new Error(reason)
        }

        const data = (await res.json()) as GithubCommitDetails
        // GitHub returns files/stats only for the single-commit endpoint (which we used).
        // Keep the payload as-is; your view already reads .files, .stats, .html_url, etc.
        this.details = data
        this.detailsStatus = "success"
      } catch (err: any) {
        this.detailsStatus = "error"
        this.detailsError = err?.message || "Failed to load commit details."
      }
    },
  },
})