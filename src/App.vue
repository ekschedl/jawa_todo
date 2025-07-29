<template>
  <v-app>
    <MenuBar />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import MenuBar from '@/components/MenuBar.vue';
</script>
