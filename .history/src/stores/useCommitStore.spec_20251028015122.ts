it("sort switching updates order", async () => {
    const store = useCommitStore();
  
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
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
          author: null,
          committer: null,
        },
        {
          sha: "new",
          html_url: "#",
          commit: {
            message: "new",
            author: { name: "B", email: "", date: "2025-12-31T00:00:00Z" },
            committer: { name: "B", email: "", date: "2025-12-31T00:00:00Z" },
          },
          author: null,
          committer: null,
        },
      ],
    });
  
    await store.fetchCommits("u", "r", 1);
  
    expect(store.sorted[0]?.sha).toBe("new");
  
    store.setSort("oldest");
    expect(store.sort).toBe("oldest");
    expect(store.sorted[0]?.sha).toBe("old");
  
    store.setSort("newest");
    expect(store.sorted[0]?.sha).toBe("new");
  });