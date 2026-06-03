<template>
  <q-btn 
    color="white" 
    text-color="black" 
    label="Czyść formularz" 
    @click="kliknietoPrzycisk" 
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'czysc'): void
}>()

const kliknietoPrzycisk = () => {
  emit('czysc')
}
</script>