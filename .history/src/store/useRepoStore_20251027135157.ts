import { defineStore } from 'pinia'
import type { GithubRepo } from '@/types/github'

interface RepoState {
  repos: GithubRepo[]
  repoStatus: 'idle' | 'loading' | 'success' | 'error'
  repoError: string
  cache: Record<string, GithubRepo[]>
}

export const useRepoStore = defineStore('repo', {
  state: (): RepoState => ({
    repos: [],
    repoStatus: 'idle',
    repoError: '',
    cache: {},
  }),

  actions: {
    async fetchRepos(username: string) {
      // ✅ Cache check
      if (this.cache[username]) {
        this.repos = this.cache[username]
        this.repoStatus = 'success'
        return
      }

      this.repoStatus = 'loading'
      this.repoError = ''

      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'User not found' : 'Error fetching repos')
        }

        const data = (await res.json()) as GithubRepo[]
        this.repos = data
        this.repoStatus = 'success'
        this.cache[username] = data
      } catch (err: any) {
        this.repoStatus = 'error'
        this.repoError = err.message || 'Unknown error'
      }
    },
  },
})