import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useFavesStore } from "./useFavesStore";

const makeLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((k: string) => (k in store ? store[k] : null)),
    setItem: vi.fn((k: string, v: string) => {
      store[k] = String(v);
    }),
    removeItem: vi.fn((k: string) => {
      delete store[k];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
};

describe("useFavesStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // mock localStorage
    // @ts-expect-error test env
    global.localStorage = makeLocalStorageMock();
  });

  it("loads empty state by default", () => {
    const faves = useFavesStore();
    faves.load();
    expect(faves.items).toEqual({});
  });

  it("toggle() adds and removes a favourite", () => {
    const faves = useFavesStore();
    faves.load();

    const fav = {
      key: "user/repo#abc123",
      sha: "abc123",
      repoFullName: "user/repo",
      message: "feat: add things",
      authorName: "Tshenolo",
      date: "2025-10-28T10:00:00Z",
      html_url: "https://github.com/user/repo/commit/abc123",
    };

    // add
    faves.toggle(fav);
    expect(faves.items[fav.key]).toBeTruthy();
    expect(faves.isFaved(fav.key)).toBe(true);

    // remove
    faves.toggle(fav);
    expect(faves.items[fav.key]).toBeUndefined();
    expect(faves.isFaved(fav.key)).toBe(false);
  });

  it("byRepo() filters by repoFullName", () => {
    const faves = useFavesStore();
    faves.load();

    const a = {
      key: "alice/app#1",
      sha: "1",
      repoFullName: "alice/app",
      message: "a",
      authorName: "A",
      date: "2025-10-28T10:00:00Z",
      html_url: "https://example/1",
    };
    const b = {
      key: "bob/lib#2",
      sha: "2",
      repoFullName: "bob/lib",
      message: "b",
      authorName: "B",
      date: "2025-10-28T11:00:00Z",
      html_url: "https://example/2",
    };
    faves.toggle(a);
    faves.toggle(b);

    const listA = faves.byRepo("alice/app");
    expect(listA).toHaveLength(1);
    expect(listA[0].key).toBe("alice/app#1");

    const listB = faves.byRepo("bob/lib");
    expect(listB).toHaveLength(1);
    expect(listB[0].key).toBe("bob/lib#2");
  });

  it("persists to localStorage via save()", () => {
    const faves = useFavesStore();
    faves.load();
    const fav = {
      key: "alice/app#1",
      sha: "1",
      repoFullName: "alice/app",
      message: "msg",
      authorName: "A",
      date: "2025-10-28T10:00:00Z",
      html_url: "https://example/1",
    };
    faves.toggle(fav);
    expect(localStorage.setItem).toHaveBeenCalled();
    faves.load(); 
    expect(faves.isFaved("alice/app#1")).toBe(true);
  });
});