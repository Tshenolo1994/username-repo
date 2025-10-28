import { defineStore } from "pinia";

export type FaveCommit = {
  key: string;
  sha: string;
  repoFullName: string;
  message: string;
  authorName: string;
  date: string;
  html_url: string;
};

type State = {
  items: Record<string, FaveCommit>;
  loaded: boolean;
};

const LS_KEY = "commit-explorer:faves";

export const useFavesStore = defineStore("faves", {
  state: (): State => ({
    items: {},
    loaded: false,
  }),

  getters: {
    list: (s) => Object.values(s.items),
    byRepo: (s) => (repoFullName: string) =>
      Object.values(s.items).filter((x) => x.repoFullName === repoFullName),
    isFaved: (s) => (key: string) => Boolean(s.items[key]),
  },

  actions: {
    load() {
      if (this.loaded) return;
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as FaveCommit[];
          this.items = Object.fromEntries(parsed.map((i) => [i.key, i]));
        }
      } catch {
        // ignore
      } finally {
        this.loaded = true;
      }
    },
    save() {
      const arr = Object.values(this.items);
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    },
    toggle(payload: FaveCommit) {
      if (!this.loaded) this.load();
      if (this.items[payload.key]) {
        delete this.items[payload.key];
      } else {
        this.items[payload.key] = payload;
      }
      this.save();
    },
    remove(key: string) {
      if (!this.loaded) this.load();
      if (this.items[key]) {
        delete this.items[key];
        this.save();
      }
    },
    clearRepo(repoFullName: string) {
      if (!this.loaded) this.load();
      Object.values(this.items).forEach((i) => {
        if (i.repoFullName === repoFullName) delete this.items[i.key];
      });
      this.save();
    },
  },
});
