<template>
  <div class="countdown-timer" :class="timerStatusClass">
    <div class="timer-display">
      <div class="time-unit">
        <div class="time-value">{{ totalMinutes }}</div>
        <div class="time-label">Minutes</div>
      </div>
    </div>
    
    <!-- Time adjustment buttons -->
    <div class="timer-controls">
      <button @click="adjustTime(-5)" class="time-btn minus-btn" title="Subtract 5 minutes">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13H5v-2h14v2z"/>
        </svg>
      </button>
      <button @click="adjustTime(5)" class="time-btn plus-btn" title="Add 5 minutes">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
    <div class="timer-target">
      Ends at {{ formatTime(destHour, destMinute) }}
      <span v-if="timeOffset !== 0" class="time-offset">
        {{ timeOffset > 0 ? '+' : '' }}{{ timeOffset }} min
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  destHour: number
  destMinute: number
}

const props = defineProps<Props>()

// Make destination time reactive so it can be adjusted
const destHour = ref(props.destHour)
const destMinute = ref(props.destMinute)

// Store the original target time and the offset
const originalTargetTime = ref<Date | null>(null)
const timeOffset = ref(0) // minutes offset from original time

const totalMinutes = ref(0)
let interval: NodeJS.Timeout | null = null

// Determine timer status class based on remaining time
const timerStatusClass = computed(() => {
  if (totalMinutes.value <= 5) {
    return 'timer-warning-critical'
  } else if (totalMinutes.value <= 15) {
    return 'timer-warning-low'
  }
  return ''
})

const formatTime = (hour: number, minute: number) => {
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  const displayMinute = minute.toString().padStart(2, '0')
  return `${displayHour}:${displayMinute} ${period}`
}

const updateTimer = () => {
  const now = new Date()
  
  // If we don't have an original target time, set it
  if (!originalTargetTime.value) {
    const target = new Date()
    target.setHours(destHour.value, destMinute.value, 0, 0)
    
    // If it's already past the target time, set target to tomorrow
    if (now > target) {
      target.setDate(target.getDate() + 1)
    }
    originalTargetTime.value = target
  }
  
  // Calculate time remaining including the offset
  const adjustedTarget = new Date(originalTargetTime.value.getTime() + (timeOffset.value * 60 * 1000))
  const diff = adjustedTarget.getTime() - now.getTime()
  
  if (diff > 0) {
    const totalSeconds = Math.floor(diff / 1000)
    totalMinutes.value = Math.floor(totalSeconds / 60)
  } else {
    // Time's up!
    totalMinutes.value = 0
  }
}

const adjustTime = (minutes: number) => {
  console.log('Button clicked! Adjusting time by:', minutes, 'minutes')
  console.log('Current offset:', timeOffset.value, 'minutes')
  
  // Update the offset
  timeOffset.value += minutes
  
  console.log('New offset:', timeOffset.value, 'minutes')
  
  // Update timer immediately
  updateTimer()
}

onMounted(() => {
  updateTimer()
  interval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.countdown-timer {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.countdown-timer.timer-warning-low {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.5);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
}

.countdown-timer.timer-warning-critical {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
  }
  100% {
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
  }
}

.timer-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.timer-icon {
  font-size: 20px;
}

.timer-title {
  font-size: 14px;
  font-weight: 500;
  color: rgba(156, 163, 175, 0.9);
}

.timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.time-unit {
  text-align: center;
}

.time-value {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
}

.time-label {
  font-size: 10px;
  color: rgba(156, 163, 175, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.time-separator {
  font-size: 20px;
  font-weight: 700;
  color: rgba(156, 163, 175, 0.5);
  margin-top: -8px;
}

.timer-target {
  font-size: 11px;
  color: rgba(156, 163, 175, 0.6);
  font-style: italic;
}

.time-offset {
  font-size: 10px;
  color: rgba(156, 163, 175, 0.7);
  margin-left: 5px;
}

.timer-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.time-btn {
  background-color: rgba(75, 85, 99, 0.6);
  color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  padding: 4px 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.time-btn:hover {
  background-color: rgba(75, 85, 99, 0.8);
  color: rgba(255, 255, 255, 0.9);
}

.minus-btn {
  transform: rotate(180deg);
}
</style>
