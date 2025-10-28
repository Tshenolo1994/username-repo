export interface GithubUser {
    login: string
    avatar_url: string
    html_url: string
  }
  
  export interface GithubRepo {
    id: number
    name: string
    full_name: string
    description: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    html_url: string
    owner: GithubUser
  }
  
  export interface GithubCommitListItem {
    sha: string
    html_url: string
    commit: {
      message: string
      author: { name: string; email: string; date: string }
      committer: { name: string; email: string; date: string }
    }
    author: GithubUser | null
    committer: GithubUser | null
  }
  
  export interface GithubCommitDetails extends GithubCommitListItem {
    files?: Array<{
      filename: string
      status: "added" | "removed" | "modified" | "renamed"
      additions: number
      deletions: number
      changes: number
      patch?: string
      previous_filename?: string
    }>
    stats?: { total: number; additions: number; deletions: number }
  }
  ppa