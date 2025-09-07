<template>
  <div class="boundary">
    <div class="boundary-label user-label">{{ userLabel }}</div>
    <div class="boundary-line"></div>
    <div class="boundary-label kernel-label">{{ kernelLabel }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userLabel?: string
  kernelLabel?: string
}>()
</script>

<style scoped>
.boundary {
  position: relative;
  margin: 0.25rem 0;
}

.boundary-line {
  width: 100%;
  height: 2px;
  border-top: 2px dotted #6b7280;
}

.boundary-label {
  position: absolute;
  color: #9ca3af;
  font-size: 0.7rem;
  font-weight: 500;
  right: 0;
  z-index: 10;
  line-height: 1;
}

.user-label {
  top: -1rem;
}

.kernel-label {
  bottom: -1rem;
}
</style>
