import { defineStore } from "pinia";

export interface FaveCommit {
  sha: string;
  repoFullName: string; 
  message: string;
  authorName: string;
  date: string;
}

const STORAGE_KEY = "commit-explorer:faves";

export const useFavesStore = defineStore("faves", {
  state: () => ({
    faves: [] as FaveCommit[],
  }),
  getters: {
    isFaved: (s) => (sha: string) => s.faves.some(f => f.sha === sha),
    byRepo:  (s) => (full: string) => s.faves.filter(f => f.repoFullName === full),
  },
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.faves = raw ? JSON.parse(raw) as FaveCommit[] : [];
      } catch {
        this.faves = [];
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.faves));
    },
    add(f: FaveCommit) {
      if (!this.isFaved(f.sha)) {
        this.faves.unshift(f);
        this.persist();
      }
    },
    remove(sha: string) {
      this.faves = this.faves.filter(x => x.sha !== sha);
      this.persist();
    },
    toggle(f: FaveCommit) {
      this.isFaved(f.sha) ? this.remove(f.sha) : this.add(f);
    },
    clearAll() {
      this.faves = [];
      this.persist();
    },
  },
});