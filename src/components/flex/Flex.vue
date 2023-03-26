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
  /**
   * Applies styles "flex-direction: row-reverse;
   */
  rowReverse: Boolean,

  /**
   * Applies styles "flex-direction: column;"
   */
  column: Boolean,

  /**
   * Applies styles "flex-direction: column-reverse;"
   */
  columnReverse: Boolean,

  /**
   * Applies styles "justify-content: center;"
   */
  justifyCenter: Boolean,

  /**
   * Applies styles "justify-content: space-around;"
   */
  justifySpaceAround: Boolean,

  /**
   * Applies styles "justify-content: space-between;"
   */
  justifySpaceBetween: Boolean,

  /**
   * Applies styles "justify-content: flex-end;"
   */
  justifyFlexEnd: Boolean,

  /**
   * Applies styles "align-items: center;"
   */
  alignCenter: Boolean,

  /**
   * Applies styles "align-items: flex-end;"
   */
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
