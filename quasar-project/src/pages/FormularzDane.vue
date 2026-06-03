<template>
  <div class="q-pa-md">
    <q-field square outlined label="Square outlined" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          To jest formularz do wpisywania danych.
        </div>
      </template>
    </q-field>

    <ClearButton @czysc="store.resetujFormularz" />

    <q-checkbox 
      v-model="store.zaakceptowano" 
      label="Jestem robotem" 
    />

    <div class="q-mt-md">
      Stan w pamięci: <strong>{{ store.zaakceptowano }}</strong>
    </div>

    <q-badge color="secondary">
      Model: {{ store.standard.min }} to {{ store.standard.max }} (0 to 50)
    </q-badge>

    <q-range v-model="store.standard" :min="0" :max="50" />
  </div>
</template>

<script setup lang="ts">
import ClearButton from 'src/components/ClearButton.vue'
import { useNewStore } from 'src/stores/new-store'


const store = useNewStore()
</script>