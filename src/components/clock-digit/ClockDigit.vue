<script setup lang="ts">
import clockHandPositionsReference from './constants';
import { ref } from 'vue'
import Flex from '../../components/flex/Flex.vue';
import AnalogClock from '../../components/analog-clock/AnalogClock.vue';


defineProps({
  digit: {
    type: Number,
    required: true,
  }
})

const clockHandPositions = ref(clockHandPositionsReference);
</script>

<template>
  <Flex column>
    <Flex>
      <AnalogClock :handPositions="clockHandPositions.topLeft[digit]" />
      <AnalogClock :handPositions="clockHandPositions.topRight[digit]" />
    </Flex>

    <Flex>
      <AnalogClock :handPositions="clockHandPositions.middleLeft[digit]" />
      <AnalogClock :handPositions="clockHandPositions.middleRight[digit]" />
    </Flex>

    <Flex>
      <AnalogClock :handPositions="clockHandPositions.bottomLeft[digit]" />
      <AnalogClock :handPositions="clockHandPositions.bottomRight[digit]" />
    </Flex>
  </Flex>
</template>
