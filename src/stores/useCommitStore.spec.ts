import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCommitStore } from "./useCommitStore";

describe("useCommitStore", () => {
  setActivePinia(createPinia());

  it("initializes with default values", () => {
    const store = useCommitStore();
    expect(store.commits).toEqual([]);
    expect(store.commitStatus).toBe("idle");
  });
});
