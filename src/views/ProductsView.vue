<!-- src/views/ProductsView.vue -->
<template>
  <div class="container mt-5">
    <h2 class="mb-4">Products</h2>

    <div v-if="products.length === 0">No products available.</div>

    <div v-else class="row">
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">Price: ${{ product.price }}</p>
            <p class="card-text">
              <span v-if="product.quantity === 0" class="text-danger fw-bold">Out of Stock</span>
              <span v-else>In Stock: {{ product.quantity }}</span>
            </p>

            <button
              class="btn btn-primary"
              :disabled="product.quantity === 0"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  data() {
    return {
      products: []
    };
  },
  created() {
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  },
  methods: {
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart.`);
    }
  }
};
</script>






