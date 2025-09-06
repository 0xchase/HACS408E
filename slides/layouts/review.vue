<template>
  <div class="slidev-layout review w-full h-full relative !text-left" style="background: #1e1e1e;">
    <!-- Header -->
    <div class="absolute top-8 left-16 right-16">
      <h1 class="text-4xl font-bold text-gray-100 mb-4 text-left">
        {{ $frontmatter.title || 'Week Review' }}
      </h1>
      <div class="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-6"></div>
    </div>

    <!-- Timeline - Full Width -->
    <div class="absolute top-28 left-16 right-16 mb-8">
      <CourseTimeline :weekNumber="$frontmatter.weekNumber" />
    </div>

    <!-- Week Overview - Side by Side -->
    <div class="absolute top-48 left-16 right-16 bottom-16">
      <WeekComparison 
        :lastWeekSummary="$frontmatter.lastWeekSummary"
        :lastWeekHomework="$frontmatter.lastWeekHomework"
        :thisWeekSummary="$frontmatter.thisWeekSummary"
        :thisWeekHomework="$frontmatter.thisWeekHomework"
      />
    </div>



    <!-- Slot for additional content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
// Import the new components
import CourseTimeline from '../components/CourseTimeline.vue'
import WeekComparison from '../components/WeekComparison.vue'
</script>

<style scoped>
.review {
  background: #1e1e1e !important;
}
</style>
