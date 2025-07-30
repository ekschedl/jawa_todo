

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'

// 🟦 Produkt-Typ definieren
interface Product {
  id: number
  title: string
  price: number
  images: string[]
  category: {
    id: number
    name: string
    image: string
  }
}

// 🟦 Kategorie-Typ
interface Category {
  id: number
  name: string
  image: string
}
// 🟦 Store
const cart = useCartStore()

// 🟦 Refs
const products = ref<Product[]>([])
const categories = ref<{ label: string; value: number | 'all' }[]>([])
const selectedCategory = ref<number | 'all'>('all')

const imageDialog = ref(false)
const selectedImage = ref('')

function openImage(imageUrl: string) {
  selectedImage.value = imageUrl
  imageDialog.value = true
}
// 🟦 Produkte laden
const loadProducts = async () => {
  try {
    const url =
      selectedCategory.value === 'all'
        ? 'https://api.escuelajs.co/api/v1/products'
        : `https://api.escuelajs.co/api/v1/categories/${selectedCategory.value}/products`

    const res = await axios.get(url)
    products.value = res.data
  } catch (err) {
    console.error('Fehler beim Laden der Produkte:', err)
  }
}
const loadCategories = async () => {
  try {
    const res = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories')
    categories.value = [
      { label: 'Alle Kategorien', value: 'all' },
      ...res.data.map(cat => ({
        label: cat.name,
        value: cat.id
      }))
    ]
  } catch (err) {
    console.error('Fehler beim Laden der Kategorien:', err)
  }
}

// 🟦 Init
watch(selectedCategory, loadProducts)
onMounted(() => {
  loadCategories()
  loadProducts()
})
</script>

<template>
  <v-container>
    <h1>ShopPlatzi</h1>

    <v-select
      v-model="selectedCategory"
      :items="categories"
      item-title="label"
      item-value="value"
      label="Kategorie auswählen"
      prepend-inner-icon="mdi-filter"
      variant="outlined"
      density="comfortable"
      color="blue"
      class="mb-12 mt-6"
    />

    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12" sm="6" md="4"
      >
        <v-card class="pa-4">
          <v-img
            :src="product.images[0]"
            height="200"
            class="product-img"
            @click="openImage(product.images[0])"
            cover
            style="cursor: pointer"
          />
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="outlined"
              @click="cart.addToCart(product)"
            >
              In den Warenkorb
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="imageDialog" max-width="500">
      <v-card>
        <v-img :src="selectedImage" height="400" class="product-img" cover />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
::v-deep(.product-img .v-img__img),
::v-deep(.product-img .v-img__img--cover) {
  object-fit: contain !important;
  background-color: white;
}
</style>


