import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import RepoView from "@/views/RepoView.vue"
import CommitView from "@/views/CommitView.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/repos/:username", name: "repos", component: RepoView, props: true },
    { path: "/repos/:username/:repo", name: "commits", component: CommitView, props: true },
{ path: "/repos/:username/:repo/:sha", name: "commitDetails", component: () => import("@/views/CommitDetailsView.vue"), props: true },

  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
