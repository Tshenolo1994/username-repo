
import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useFavesStore } from "./useFavesStore";

describe("useFavesStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds and removes favourites correctly", () => {
    const store = useFavesStore();

    const item = {
      key: "tshenolo/devkit#abc123",
      sha: "abc123",
      repoFullName: "tshenolo/devkit",
      message: "feat: add media kit section",
      authorName: "Tshenolo",
      date: new Date("2025-01-05T10:00:00Z").toISOString(),
      html_url: "https://github.com/tshenolo/devkit/commit/abc123",
    };

    store.toggle(item);
    expect(store.items.size).toBe(1);
    expect(store.isFaved(item.key)).toBe(true);

    store.toggle(item);
    expect(store.items.size).toBe(0);
    expect(store.isFaved(item.key)).toBe(false);
  });
});