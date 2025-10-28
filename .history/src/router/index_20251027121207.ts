import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import RepoView from "@/views/RepoView.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  { path: "/repos/:username", name: "repos", component: RepoView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
