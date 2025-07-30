import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Todo from "@/pages/todo.vue";
import Shop from "@/pages/shop.vue";
import ShopPlatzi from "@/components/ShopPlatzi.vue";

const routes = [
  {path: '/', component: Index},
  {path: '/todo', component: Todo},
  {path: '/shop', component: Shop},
  {path: '/shopplatzi', component: ShopPlatzi},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
