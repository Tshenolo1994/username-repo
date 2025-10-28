import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCommitStore } from "./useCommitStore";

const makeCommits = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    sha: `sha-${i + 1}`,
    html_url: `https://github.com/u/r/commit/sha-${i + 1}`,
    commit: {
      message: `commit ${i + 1}`,
      author: { name: "Dev", email: "dev@x.com", date: `2025-10-${20 + i}T10:00:00Z` },
      committer: { name: "Dev", email: "dev@x.com", date: `2025-10-${20 + i}T10:00:00Z` },
    },
    author: null,
    committer: null,
  }));

describe("useCommitStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    global.fetch = vi.fn() as any;
  });

  afterEach(() => vi.restoreAllMocks());

  it("fetches first page and sets hasNext", async () => {
    const store = useCommitStore();
    const per = store.perPage ?? 10;

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => makeCommits(per),
    });

    await store.fetchCommits("user", "repo", 1);

    expect(store.commitStatus).toBe("success");
    expect(store.commits.length).toBe(per);
    expect(store.page).toBe(1);
    expect(store.hasPrev).toBe(false);
    expect(store.hasNext).toBe(true);
  });

  it("nextPage loads page 2 and sets hasPrev", async () => {
    const store = useCommitStore();

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => makeCommits(store.perPage),
    });
    await store.fetchCommits("user", "repo", 1);

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => makeCommits(store.perPage - 3),
    });
    await store.nextPage("user", "repo");

    expect(store.page).toBe(2);
    expect(store.hasPrev).toBe(true);
    expect(store.hasNext).toBe(false);
    expect(store.commits.length).toBeGreaterThan(0);
  });

  it("sort switching updates order", async () => {
    const store = useCommitStore();
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          sha: "old",
          html_url: "#",
          commit: {
            message: "old",
            author: { name: "A", email: "", date: "2025-01-01T00:00:00Z" },
            committer: { name: "A", email: "", date: "2025-01-01T00:00:00Z" },
          },
        },
        {
          sha: "new",
          html_url: "#",
          commit: {
            message: "new",
            author: { name: "B", email: "", date: "2025-12-31T00:00:00Z" },
            committer: { name: "B", email: "", date: "2025-12-31T00:00:00Z" },
          },
        },
      ],
    });

    await store.fetchCommits("u", "r", 1);
    expect(store.sorted[0].sha).toBe("new");

    store.setSort("oldest");
    expect(store.sorted[0].sha).toBe("old");

    store.setSort("newest");
    expect(store.sorted[0].sha).toBe("new");
  });

  it("handles fetch errors", async () => {
    const store = useCommitStore();
    (global.fetch as any).mockResolvedValueOnce({ ok: false, status: 500 });

    await store.fetchCommits("u", "r", 1);

    expect(store.commitStatus).toBe("error");
    expect(store.commitError).toBeTruthy();
    expect(store.commits).toEqual([]);
  });
});