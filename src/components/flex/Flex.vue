<template>
  <div
    class="flex"
    :class="{
      rowReverse,
      column,
      columnReverse,
      justifyCenter,
      justifySpaceAround,
      justifySpaceBetween,
      justifyFlexEnd,
      alignCenter,
      alignFlexEnd
    }"
    :style="`gap: ${gap}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  rowReverse: Boolean,
  column: Boolean,
  columnReverse: Boolean,
  justifyCenter: Boolean,
  justifySpaceAround: Boolean,
  justifySpaceBetween: Boolean,
  justifyFlexEnd: Boolean,
  alignCenter: Boolean,
  alignFlexEnd: Boolean,

  /**
   * CSS Gap Property String
   */
  gap: {
    type: String,
    default: '0',
  }
})
</script>

<style lang="scss" scoped src="./styles.scss"></style>
