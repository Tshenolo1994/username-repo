// src/stores/useFavesStore.ts
import { defineStore } from "pinia";

export interface FaveCommit {
  sha: string;
  repoFullName: string; 
  message: string;
  authorName: string;
  date: string;        
}

interface FavesState {
  items: FaveCommit[];
}

const LS_KEY = "commit-explorer:faves";

export const useFavesStore = defineStore("faves", {
  state: (): FavesState => ({
    items: [],
  }),
  getters: {
    isFaved: (state) => (sha: string) => state.items.some(f => f.sha === sha),
  },
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        this.items = raw ? JSON.parse(raw) : [];
      } catch {
        this.items = [];
      }
    },
    persist() {
      localStorage.setItem(LS_KEY, JSON.stringify(this.items));
    },
    add(f: FaveCommit) {
      if (!this.items.some(x => x.sha === f.sha)) {
        this.items.unshift(f);
        this.persist();
      }
    },
    remove(sha: string) {
      this.items = this.items.filter(x => x.sha !== sha);
      this.persist();
    },
    toggle(f: FaveCommit) {
      this.isFaved(f.sha) ? this.remove(f.sha) : this.add(f);
    },
    clearRepo(repoFullName: string) {
      this.items = this.items.filter(x => x.repoFullName !== repoFullName);
      this.persist();
    },
  },
});