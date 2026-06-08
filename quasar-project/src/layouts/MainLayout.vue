<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Quasar App </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Nawigacja </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const linksList = [
  {
    title: 'Mapa',
    caption: 'Przeglądaj mapę i poligony',
    icon: 'map',
    to: '/',
  },
  {
    title: 'Formularz',
    caption: 'Zarządzaj lokalizacjami',
    icon: 'location_city',
    to: '/formularz', 
  },
  {
    title: 'Logowanie',
    caption: 'Zaloguj sie tutaj',
    icon: 'login',
    to: '/login', 
  },
  {
    title: 'Podstrona1',
    caption: 'Konfiguracja aplikacji',
    icon: 'settings',
    to: '/ustawienia',
  },
  {
    title: 'Podstrona2',
    caption: 'Konfiguracja aplikacji',
    icon: 'settings',
    to: '/ustawienia',
  },
  {
    title: 'Podstrona3',
    caption: 'Konfiguracja aplikacji',
    icon: 'settings',
    to: '/ustawienia',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>