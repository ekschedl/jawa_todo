

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'

// 🟦 Produkt-Typ definieren
interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}

// 🟦 Store
const cart = useCartStore()

// 🟦 Refs
const products = ref<Product[]>([])
const categories = ref<{ label: string; value: string }[]>([])
const selectedCategory = ref<string>('all')

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
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory.value}`

    const res = await axios.get(url)
    products.value = res.data
  } catch (err) {
    console.error('Fehler beim Laden der Produkte:', err)
  }
}

// 🟦 Kategorien übersetzen
const categoryMap: Record<string, string> = {
  "men's clothing": 'Herrenbekleidung',
  "women's clothing": 'Damenbekleidung',
  "jewelery": 'Schmuck',
  "electronics": 'Elektronik',
}

// 🟦 Kategorien laden
const loadCategories = async () => {
  try {
    const res = await axios.get('https://fakestoreapi.com/products/categories')
    categories.value = [
      { label: 'Alle Kategorien', value: 'all' },
      ...res.data.map((cat: string) => ({
        label: categoryMap[cat] || cat,
        value: cat,
      })),
    ]
  } catch (err) {
    console.error('Fehler beim Laden der Kategorien:', err)
  }
}


// 🟦 Watch & Init
watch(selectedCategory, () => {
  loadProducts()
})

onMounted(() => {
  loadCategories()
  loadProducts()
})
</script>

<template>
  <v-container>
    <h1>Shop</h1>

    <!-- Kategorie-Auswahl -->
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

    <!-- Produktliste -->
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12" sm="6" md="4"
      >
        <v-card class="pa-4">
          <v-img
            :src="product.image"
            height="200"
            class="product-img"
            @click="openImage(product.image)"
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

    <!-- Dialog für großes Bild -->
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
