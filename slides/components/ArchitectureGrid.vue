<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props needed
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
</style>
