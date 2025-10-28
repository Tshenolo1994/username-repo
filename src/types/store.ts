import type { GithubRepo, GithubCommitListItem, GithubCommitDetails } from "./github"

export type LoadStatus = "idle" | "loading" | "success" | "error"
export type SortOrder = "newest" | "oldest"

export interface RepoState {
  repos: GithubRepo[]
  repoStatus: LoadStatus
  repoError: string
  cache: Record<string, GithubRepo[]>
}

export interface CommitState {
  commits: GithubCommitListItem[]
  commitStatus: LoadStatus
  commitError: string
  page: number
  perPage: number
  sort: SortOrder
}

export interface CommitDetailsState {
  details: GithubCommitDetails | null
  detailsStatus: LoadStatus
  detailsError: string
}

export interface FaveCommit {
  sha: string
  repoFullName: string
  message: string
  authorName: string
  date: string
}
