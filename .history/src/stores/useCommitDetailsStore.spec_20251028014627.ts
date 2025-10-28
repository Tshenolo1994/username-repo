import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCommitDetailsStore } from "./useCommitDetailsStore";

const makeDetails = () => ({
  sha: "abc123",
  html_url: "https://github.com/u/r/commit/abc123",
  commit: {
    message: "feat: add feature",
    author: { name: "Dev A", email: "a@x.com", date: "2025-10-28T12:00:00Z" },
    committer: { name: "Dev A", email: "a@x.com", date: "2025-10-28T12:00:00Z" },
  },
  author: { login: "devA", avatar_url: "", html_url: "" },
  committer: null,
  stats: { total: 12, additions: 10, deletions: 2 },
  files: [
    {
      filename: "src/index.ts",
      status: "modified",
      additions: 8,
      deletions: 2,
      changes: 10,
      patch: "@@ -1,2 +1,4 @@\n- old\n+ new\n",
    },
    {
      filename: "README.md",
      status: "added",
      additions: 2,
      deletions: 0,
      changes: 2,
      patch: "+ docs",
    },
  ],
});

describe("useCommitDetailsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // @ts-expect-error test env
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches commit details successfully", async () => {
    const store = useCommitDetailsStore();
    // @ts-expect-error mock
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => makeDetails(),
    });

    await store.fetchCommitDetails("u", "r", "abc123");

    expect(store.detailsStatus).toBe("success");
    expect(store.details?.sha).toBe("abc123");
    expect(store.details?.stats?.additions).toBe(10);
    expect(store.details?.files?.length).toBe(2);
  });

  it("handles error response", async () => {
    const store = useCommitDetailsStore();
    // @ts-expect-error mock
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    await store.fetchCommitDetails("u", "r", "nope");

    expect(store.detailsStatus).toBe("error");
    expect(store.detailsError).toBeTruthy();
    expect(store.details).toBeNull();
  });
});