<template>
  <div class="course-timeline flex items-center">
    <!-- Schedule Label -->
    <div class="mr-4 text-sm text-gray-300 font-medium text-right flex items-center">Schedule</div>
    
    <!-- Timeline Container -->
    <div class="flex-1">
      <!-- Timeline with grouped weeks and labels -->
      <div class="flex justify-center items-end space-x-1">
      <!-- Weeks 1-2: Code -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">Code</div>
        <div class="flex space-x-0.5 p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            v-for="week in [1, 2]" 
            :key="week"
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(week)"
          >
            {{ week }}
          </div>
        </div>

      </div>

      <!-- Weeks 3-4: Binaries -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">Binaries</div>
        <div class="flex space-x-0.5 p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            v-for="week in [3, 4]" 
            :key="week"
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(week)"
          >
            {{ week }}
          </div>
        </div>

      </div>

      <!-- Week 5: Protocols -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">Protocols</div>
        <div class="flex p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(5)"
          >
            5
          </div>
        </div>

      </div>

      <!-- Weeks 6-8: Malware -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">Malware</div>
        <div class="flex space-x-0.5 p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            v-for="week in [6, 7, 8]" 
            :key="week"
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(week)"
          >
            {{ week }}
          </div>
        </div>

      </div>

      <!-- Weeks 9-10: Exploits -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">Exploits</div>
        <div class="flex space-x-0.5 p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            v-for="week in [9, 10]" 
            :key="week"
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(week)"
          >
            {{ week }}
          </div>
        </div>

      </div>

      <!-- Weeks 11-13: Other -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">Other</div>
        <div class="flex space-x-0.5 p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            v-for="week in [11, 12, 13]" 
            :key="week"
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(week)"
          >
            {{ week }}
          </div>
        </div>

      </div>

      <!-- Week 14: CTF -->
      <div class="flex flex-col items-center">
        <div class="text-xs text-gray-500 mb-1">CTF</div>
        <div class="flex p-1 bg-gray-800 rounded border border-gray-600">
          <div 
            class="w-4 h-4 rounded flex items-center justify-center text-xs transition-all"
            :class="getTimelineClass(14)"
          >
            14
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props for current week
const props = defineProps<{
  currentWeek?: number
  weekNumber?: string
}>()

// Get current week number from props or parse from weekNumber string
const currentWeekNumber = computed(() => {
  if (props.currentWeek) return props.currentWeek
  
  const weekStr = props.weekNumber || ''
  const match = weekStr.match(/(\d+)/)
  return match ? parseInt(match[1]) : 1
})

// Timeline styling function
const getTimelineClass = (week: number) => {
  const current = currentWeekNumber.value
  const last = current - 1
  
  if (week === current) {
    return 'bg-blue-500 border border-blue-400 text-white'
  } else if (week === last && last > 0) {
    return 'bg-green-500 border border-green-400 text-white'
  } else if (week < current) {
    return 'text-gray-300'
  } else {
    return 'text-gray-400'
  }
}
</script>

<style scoped>
.course-timeline {
  width: 100%;
}
</style>
