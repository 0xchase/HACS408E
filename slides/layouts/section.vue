<template>
  <div class="slidev-layout section w-full h-full relative">
    <!-- Centered title -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-100 mb-4">
          {{ $frontmatter.title || 'Section Title' }}
        </h1>
        <div v-if="$frontmatter.subtitle" class="text-xl text-gray-400 max-w-2xl mx-auto">
          {{ $frontmatter.subtitle }}
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.section {
  background: #1e1e1e;
}
</style>
