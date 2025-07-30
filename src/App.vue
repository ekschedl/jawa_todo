<template>
  <v-app>
    <v-layout>
      <AppHeader
        :isDark="isDark"
        :cartSidebar="cartSidebar"
        @toggleDrawer="drawer = !drawer"
        @update:dark="isDark = $event"
      />

      <!--  Sidebar für Warenkorb -->
      <CartSidebar ref="cartSidebar" />

      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            link
            @click="drawer = false"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


      <v-main class="overflow-auto">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import CartSidebar from '@/components/CartSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

// Zustand: Sidebar für Menü und Warenkorb
const drawer = ref(false)
const cartSidebar = ref()

// Zustand: Darkmode
const isDark = ref(false)

// Menüeinträge
const items = [
  { title: '🏠 Home', to: '/' },
  { title: '📝 Todo App', to: '/todo' },
  { title: '🛒 Shop', to: '/shop' },
]
</script>







