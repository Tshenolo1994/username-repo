# Commit Explorer

A Vue 3 + Pinia + TypeScript project that allows users to browse any GitHub user's repositories and commits.

## Features
- View public repositories for any GitHub username
- Browse commits for a selected repository
- Mark commits as favourites (stored in localStorage)
- View a list of favourite commits
- View commit details: files changed and diffs
- Sort commits by date (newest or oldest)
- Pagination for repositories and commits
- Unit tests with Vitest

## Tech Stack
| Tool | Purpose |
|------|---------|
| Vue 3 (Composition API) | Front-end framework |
| Pinia | State management |
| Vue Router | Routing |
| TypeScript | Static typing |
| Vite | Dev/build tooling |
| Vitest | Unit testing |
| lucide-vue-next | Icons |
| GitHub REST API | Data source |

## Getting Started

### Install
npm install

### Dev
npm run dev
# open http://localhost:5173

### Test
npm run test

## Notes
- Favourites are stored in localStorage per repo.
- Unauthenticated GitHub API calls are rate-limited (60/hr). Optional:
  export GITHUB_TOKEN=your_token

## Folder Structure
src/
├─ components/      # UI components
├─ stores/          # Pinia stores
├─ views/           # Route views
├─ types/           # TypeScript interfaces
├─ router/          # Vue Router setup
└─ main.ts          # App entry

## Author
Tshenolo Lobelo — Frontend Developer (Johannesburg, South Africa)

## License
MIT ©️ 2025 Tshenolo Lobelo
