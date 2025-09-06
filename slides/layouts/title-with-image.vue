<template>
  <div class="slidev-layout title-with-image w-full h-full relative !text-left" style="background: #1e1e1e;">
    <!-- Left side text content -->
    <div class="absolute left-16 top-1/2 transform -translate-y-1/2 z-10">
      <h1 class="text-6xl font-bold text-gray-100 mb-4">
        {{ $frontmatter.title || 'Title' }}
      </h1>
      <div class="text-lg text-gray-400 mb-8 max-w-md">
        {{ $frontmatter.description || 'Description' }}
      </div>
      <div 
        @click="$slidev.nav.next" 
        class="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg inline-block cursor-pointer transition-colors text-white font-semibold"
      >
        {{ $frontmatter.buttonText || 'Get Started' }} 
        <carbon:arrow-right class="inline ml-2" />
      </div>
    </div>

    <!-- Right side framed image -->
    <div class="absolute right-16 top-1/2 transform -translate-y-1/2">
      <div class="relative">
        <div class="border-4 border-blue-500 rounded-lg p-6">
          <!-- Slot for additional content if needed -->
          <slot />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.title-with-image {
  background: #1e1e1e;
}
</style>
