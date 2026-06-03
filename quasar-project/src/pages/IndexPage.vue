<template>
  <q-page class="column items-center justify-start q-pa-md">
    
    <open-layers :city="wybraneMiasto" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OpenLayers from 'src/components/OpenLayers.vue'

const wybraneMiasto = ref('')
</script> 