import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useNewStore = defineStore('newStore', () => {
  
  const zaakceptowano = ref(false)
  const standard = ref({
    min: 10,
    max: 35
  })

  const resetujFormularz = () => {
    zaakceptowano.value = false
    standard.value = {
      min: 10,
      max: 35
    }
  }

  function $reset() {
    resetujFormularz();
  }

  return {
    zaakceptowano,
    standard,
    resetujFormularz,
    $reset
  }
})