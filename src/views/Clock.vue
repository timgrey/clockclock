<script setup lang="ts">
import Flex from '../components/flex/Flex.vue'
import ClockDigit from '../components/clock-digit/ClockDigit.vue'
import ClockSemiColon from '../components/clock-semi-colon/ClockSemiColon.vue'
import { ref, onMounted, onUnmounted } from 'vue';
import { DateTime, Duration } from 'luxon';

//Data
let timeStringHHMMSS = ref('000000');
let clockView = ref('clock');
let timer = ref(300);
let stopwatch = ref(0);
let stopwatchPaused = ref(false);
let clockInterval = ref();


//Methods
const selectView = (view: string) => {
  if (view === clockView.value) { return; }
  switch (view) {
    case 'clock':
      clockView.value = 'clock';
      clearInterval(clockInterval.value);
      tickClock();
      startClock();
      break;
    case 'timer':
      clockView.value = 'timer';
      setTimer();
      break;
    case 'stopwatch':
      clockView.value = 'stopwatch';
      setStopwatch();
      break;
    default:
      break;
  }
}
const formatSeconds= (seconds: number) => {
  return Duration.fromObject({ seconds }).toFormat('hhmmss')
}
const tickClock = () => {
  timeStringHHMMSS.value = DateTime.now().toFormat('hhmmss');
}
const startClock = () => {
  clockInterval.value = setInterval(() => {
    tickClock();
    }, 1000
  );
}
const incrementTimer = () => {
  timer.value += 60;
  timeStringHHMMSS.value = formatSeconds(timer.value);
}

const decrementTimer = () => {
  if (timer.value >= 60) {
    timer.value -= 60;
    timeStringHHMMSS.value = formatSeconds(timer.value);
  }
}
const setTimer = () => {
  clearInterval(clockInterval.value);
  timer.value = 300;
  timeStringHHMMSS.value = '000500';
  clockInterval.value = 0;
}
const startTimer = () => {
  clockInterval.value = setInterval(() => {
    timer.value--
    timeStringHHMMSS.value = formatSeconds(timer.value)
    }, 1000
  );
}
const setStopwatch = () => {
  clearInterval(clockInterval.value);
  stopwatch.value = 0;
  timeStringHHMMSS.value = '000000';
  clockInterval.value = 0;
}
const startStopwatch = () => {
  stopwatchPaused.value = false;
  clockInterval.value = setInterval(() => {
    stopwatch.value++
    timeStringHHMMSS.value = formatSeconds(stopwatch.value)
    }, 1000
  );
}
const pauseStopwatch = () => {
  stopwatchPaused.value = true;
  clearInterval(clockInterval.value)
}

//Lifecycle
onMounted(() => {
  startClock();
})
onUnmounted(() => {
  clearInterval(clockInterval.value)
})

</script>

<template>
  <Flex column justify-center align-center>
    <main>
      <Flex align-center>
        <ClockDigit :digit="Number(timeStringHHMMSS[0])" />
        <ClockDigit :digit="Number(timeStringHHMMSS[1])" />
        <ClockSemiColon />
        <ClockDigit :digit="Number(timeStringHHMMSS[2])" />
        <ClockDigit :digit="Number(timeStringHHMMSS[3])" />
        <ClockSemiColon  />
        <ClockDigit :digit="Number(timeStringHHMMSS[4])" />
        <ClockDigit :digit="Number(timeStringHHMMSS[5])" />
      </Flex>

      <Flex
        v-if="clockView === 'timer'"
        justify-center
        gap="1rem"
        class="clock-controls"
      >
        <button class="incremental" @click="incrementTimer()">+</button>
        <button class="incremental" @click="decrementTimer()">-</button>
        <button v-if="clockInterval !== 0" @click="setTimer()">Reset</button>
        <button v-if="!clockInterval" @click="startTimer()">Start</button>
      </Flex>

      <Flex
        v-if="clockView === 'stopwatch'"
        justify-center
        gap="1rem"
        class="clock-controls"
      >
        <button v-if="!clockInterval" @click="startStopwatch()">Start</button>
        <button v-if="clockInterval !== 0 && !stopwatchPaused" @click="pauseStopwatch()">Stop</button>
        <button v-if="clockInterval && stopwatchPaused" @click="setStopwatch()">Reset</button>
        <button v-if="clockInterval && stopwatchPaused" @click="startStopwatch()">Resume</button>
      </Flex>
    </main>
    <nav>
      <Flex justify-space-around gap="1rem">
        <span
          :class="{ active: clockView === 'clock'}"
          @click="selectView('clock')"
        >
          Clock
        </span>
        <span
          :class="{ active: clockView === 'timer'}"
          @click="selectView('timer')"
        >
          Timer
        </span>
        <span
          :class="{ active: clockView === 'stopwatch'}"
          @click="selectView('stopwatch')"
        >
          Stopwatch
        </span>
      </Flex>
    </nav>
    <!-- <footer>
      <RouterLink to="about" class="about-link">About</RouterLink>
    </footer> -->
  </Flex>
</template>

<style lang="scss" scoped>
button.incremental {
  width: 1.5rem;
}

main {
  margin-left: 1.5vw;
  margin-bottom: 3rem;
  display: relative;

  @media (max-width: 768px) {
    margin-left: 0;
  }

  .clock-controls {
    position: absolute;
    width: 100%;
    bottom: -6rem;
  }
}

nav {
  position: fixed;
  bottom: calc(200px - 9vw);
  font-size: 1.5rem;
  width: 100vw;
  max-width: 500px;

  @media (max-width: 1216px) {
    bottom: calc(100px - 1vw);
  }

  @media (max-width: 768px) {
    bottom: 100px
  }

  span {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.25);
    padding: 0.25rem 1rem 0;
    border-radius: 1rem;
    box-shadow: 0px 6px 20px 20px rgb(255 255 255 / 30%);

    &.active {
      text-decoration: underline;
    }
  }
}
footer > .about-link  {
  position: fixed;
  bottom: 2rem;
  text-decoration: none;
  color: black;
}
</style>
