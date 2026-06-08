import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
    const savedData = localStorage.getItem('login_form')
    const initialData = savedData ? JSON.parse(savedData) : { email: '', password: '' }

    const email = ref(initialData.email)
    const password = ref(initialData.password)
    const isLoggedIn = ref(false)

    function logout() {
        isLoggedIn.value = false
        email.value = ''
        password.value = ''
    }
    function resetForm() {
        email.value = ''
        password.value = ''
        localStorage.removeItem('login_form')
    }

    return { email, password, resetForm, isLoggedIn, logout }
}, {
    persist: {
        storage: sessionStorage
    }
})