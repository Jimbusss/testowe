<template>
  <q-page class="column items-center justify-start q-pa-md">
    <div class="q-mb-md q-gutter-sm">
      <q-btn @click="wybraneMiasto = 'Lublin'" label="Lublin" color="primary" />
      <q-btn @click="wybraneMiasto = 'Warszawa'" label="Warszawa" color="secondary" />
      <q-btn @click="wybraneMiasto = 'Kraków'" label="Kraków" color="accent" />
      <q-btn @click="wybraneMiasto = 'Puławy'" label="Puławy" color="red" />
      <q-btn @click="wybraneMiasto = 'Szczecin'" label="Szczecin" color="pink" />
    </div>
    
    <open-layers :city="wybraneMiasto" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OpenLayers from 'src/components/OpenLayers.vue'

const wybraneMiasto = ref('')
</script> 