import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Todo from "@/pages/todo.vue";
import Shop from "@/pages/shop.vue";

const routes = [
  {path: '/', component: Index},
  {path: '/todo', component: Todo},
  {path: '/shop', component: Shop},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
