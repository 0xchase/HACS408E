<template>
  <div class="directory-tree">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props needed - just a container
</script>

<style scoped>
.directory-tree {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  background-color: rgb(var(--slidev-theme-secondary-bg-light));
  border: 1px solid rgb(var(--slidev-theme-secondary-bg-light-outline));
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
}
</style>
