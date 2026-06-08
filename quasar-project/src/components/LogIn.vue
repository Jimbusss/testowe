<template>
  <q-card class="login-card q-pa-lg shadow-2">
    <q-card-section class="text-center">
      <div class="text-h5 text-weight-bold text-primary">Logowanie</div>
      <div class="text-grey-6 text-subtitle2">Zaloguj się do swojego konta</div>
    </q-card-section>

    <q-card-section class="q-gutter-md">
      <q-input
        v-model="store.email"
        label="Adres E-mail"
        type="email"
        outlined
        lazy-rules
        :rules="[
          val => !!val || 'Email jest wymagany',
          val => isValidEmail(val) || 'Wprowadź poprawny adres email'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input
        v-model="store.password"
        label="Hasło"
        :type="isPasswordVisible ? 'text' : 'password'"
        outlined
        lazy-rules
        :rules="[val => !!val || 'Hasło jest wymagane']"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordVisible = !isPasswordVisible"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions class="justify-between q-mt-sm">
      <q-btn
        label="Wyczyść"
        color="grey-7"
        flat
        @click="store.resetForm"
      />
      
      <q-btn
        label="Zaloguj się"
        color="primary"
        unelevated
        :loading="isLoading"
        @click="handleLogin"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar'; 
import { useLoginStore } from 'src/stores/LoginStore';
import { useRouter } from 'vue-router';

const $q = useQuasar(); 
const store = useLoginStore();
const router = useRouter();

const isLoading = ref(false);
const isPasswordVisible = ref(false); 

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function isValidEmail(val: string) {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(val);
}

async function handleLogin() {
  if (!store.email || !store.password || !isValidEmail(store.email)) {
    $q.notify({
      type: 'negative',
      message: 'Wprowadź poprawne dane logowania!',
      position: 'top',
    });
    return;
  }

  isLoading.value = true;
  await delay(1500); // Skróciłem delikatnie czas dla lepszego UX
  isLoading.value = false;

  // 1. Zapisujemy stan w Pinia Store
  store.isLoggedIn = true;

  // 2. Synchronizacja z routerem - ustawiamy flagę, na którą czeka Navigation Guard
  localStorage.setItem('is_logged_in', 'true');

  $q.notify({
    type: 'positive',
    message: 'Pomyślnie zalogowano!',
    position: 'top',
  });
  
  void router.push('/');
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
}
</style>