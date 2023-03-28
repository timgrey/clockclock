<script setup lang="ts">
defineProps({
  handPositions: {
    type: Array,
    required: true,
  }
})

const handStyles = (handPosition: number) => {
  return {
    transform: `rotate(${handPosition}deg)`,
    background: `${[225, -135].includes(handPosition) ? 'white' : '#555'}`
  }
}
</script>

<template>
  <div class="analog-clock">
    <div class="dot" />
    <div class="hand" :style="handStyles(Number(handPositions[0]))" />
    <div class="hand small" :style="handStyles(Number(handPositions[1]))" />
  </div>
</template>

<style lang="scss" scoped src="./styles.scss"></style>
