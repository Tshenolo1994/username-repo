<script setup lang="ts">
import { ref, watchEffect } from "vue";

interface Props {

  maxHeight?: number;

  collapsed?: boolean;
  /** button labels */
  moreLabel?: string;
  lessLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: 260,
  collapsed: true,
  moreLabel: "See more",
  lessLabel: "See less",
});

const isCollapsed = ref(props.collapsed);
const containerRef = ref<HTMLElement | null>(null);
const needsCollapse = ref(false);

watchEffect(() => {
  if (!containerRef.value) return;
  // Decide if the content actually needs collapsing
  needsCollapse.value =
    containerRef.value.scrollHeight > props.maxHeight + 8; // small buffer
});
</script>

<template>
  <div class="collapsible">
    <div
      ref="containerRef"
      class="inner"
      :style="isCollapsed && needsCollapse ? { maxHeight: props.maxHeight + 'px' } : {}"
      :class="{ clipped: isCollapsed && needsCollapse }"
    >
      <slot />
    </div>

    <div v-if="needsCollapse" class="controls">
      <button class="toggle" type="button" @click="isCollapsed = !isCollapsed">
        {{ isCollapsed ? moreLabel : lessLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.collapsible .inner {
  overflow: hidden;
  transition: max-height 160ms ease;
  position: relative;
}

/* subtle gradient fade when clipped */
.clipped::after {
  content: "";
  position: absolute;
  inset: auto 0 0 0;
  height: 56px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--bg-elev) 70%);
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.toggle {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.toggle:hover {
  background: rgba(255,255,255,0.04);
  border-color: var(--link);
}
</style>