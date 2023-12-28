<script setup lang="ts">
import { getSvg, Muscle, type MuscleAssociation } from '@/svg/human'
import { computed, onMounted, ref } from 'vue'

interface MuscleProps {
  selectColor: string
  bodyColor: string
  muscleColor: string
  outerColor: string
  association: MuscleAssociation[]
}

const props = withDefaults(defineProps<MuscleProps>(), {
  selectColor: 'white',
  bodyColor: '#b2b2b2',
  muscleColor: '#b07f7f',
  outerColor: '#242b38'
})

const selectedMusle = ref<string>()

const svg = computed(() => {
  return getSvg(props.bodyColor, props.muscleColor)
})

const emit = defineEmits(['update:modelValue'])

function addHover() {
  document.querySelectorAll('svg.human g').forEach((item) => {
    var isMuscle = item.id !== 'outer-color' && item.id !== 'inner-color'
    if (isMuscle) {
      item.addEventListener('mouseup', (e) => {
        var finded = props.association.find((x) => x.inner === Muscle[selectedMusle.value ?? ''])
        if (finded != undefined) emit('update:modelValue', finded.outer)
      })
      item.addEventListener('mouseenter', (e) => {
        selectedMusle.value = (e.target as Element).id
        var active = document.querySelector('.human-active-muscle')
        if (active) {
          active.classList.remove('human-active-muscle')
        }
        ;(e.target as Element).classList.add('human-active-muscle')
      })
    }
  })

  document.querySelector('svg.human>g#outer-color')?.addEventListener('mouseout', () => {
    var active = document.querySelector('.human-active-muscle')
    if (active) {
      active.classList.remove('human-active-muscle')
    }
  })
}

onMounted(() => {
  addHover()
})
</script>

<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 439.63 404.91"
      v-html="svg"
      class="human"
      :style="`--outer-color: ${outerColor}; --select-color: ${selectColor}`"
    ></svg>
  </div>
</template>

<style>
svg.human > g#outer-color {
  fill: var(--outer-color);
}

.human-active-muscle > path {
  transition: fill 300ms;
  fill: var(--select-color);
}
</style>
