<!-- MenuBar.vue -->
<template>
  <v-app-bar
    scroll-behavior="elevate fade-image"
    scroll-threshold="0"
  >
    <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>

    <v-menu v-model="menu" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="goTo('todo')">
          <v-list-item-title>Todo</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('contact')">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
export default {
  name: 'MenuBar',
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    goTo(page) {
      alert(`Navigiere zu ${page}`);
      this.menu = false;
    },
  },
};
</script>
