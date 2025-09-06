<template>
  <div class="week-comparison grid grid-cols-2 gap-8">
    
    <!-- Last Week Section -->
    <div class="bg-gray-800 border border-gray-600 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
        <h2 class="text-xl font-semibold text-gray-200">Last Week</h2>
      </div>
      <div class="space-y-3">
        <p class="text-gray-300 leading-relaxed">
          {{ lastWeekSummary || 'Summary of what was covered last week.' }}
        </p>
        <div class="bg-gray-700 rounded p-3" v-if="lastWeekHomework">
          <div class="text-sm font-medium text-orange-400 mb-1">Homework:</div>
          <div class="text-gray-300 text-sm">
            {{ lastWeekHomework }}
          </div>
        </div>
      </div>
    </div>

    <!-- This Week Section -->
    <div class="bg-gray-800 border border-gray-600 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
        <h2 class="text-xl font-semibold text-gray-200">This Week</h2>
      </div>
      <div class="space-y-3">
        <p class="text-gray-300 leading-relaxed">
          {{ thisWeekSummary || 'What will be covered this week.' }}
        </p>
        <div class="bg-gray-700 rounded p-3" v-if="thisWeekHomework">
          <div class="text-sm font-medium text-blue-400 mb-1">Homework:</div>
          <div class="text-gray-300 text-sm">
            {{ thisWeekHomework }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props for week comparison content
const props = defineProps<{
  lastWeekSummary?: string
  lastWeekHomework?: string
  thisWeekSummary?: string
  thisWeekHomework?: string
}>()
</script>

<style scoped>
.week-comparison {
  width: 100%;
}
</style>
