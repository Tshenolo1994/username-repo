import { describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCommitDetailsStore } from "./useCommitDetailsStore";

describe("useCommitDetailsStore", () => {
  setActivePinia(createPinia());

  it("starts with empty details", () => {
    const store = useCommitDetailsStore();
    expect(store.details).toBeNull();
    expect(store.detailsStatus).toBe("idle");
  });
});
