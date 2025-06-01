<template>
  <div class="container mt-4">
    <h2>All Listed Products</h2>
    <div v-if="products.length === 0" class="alert alert-info">
      No products listed yet.
    </div>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(product, index) in products" :key="index">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"><strong>Price:</strong> ${{ product.price }}</p>
            <p class="card-text"><strong>Stock:</strong> {{ product.quantity }}</p>

            
            <button
              v-if="isCustomer && product.quantity > 0"
              class="btn btn-primary mt-2"
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
  name: 'ViewAllProducts',
  data() {
    return {
      products: [],
      currentUser: null
    }
  },
  computed: {
    isCustomer() {
      return this.currentUser?.role === 'customer';
    }
  },
  mounted() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    this.currentUser = storedUser;
    this.products = storedProducts;
  },
  methods: {
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart.`);
      window.dispatchEvent(new Event('storage')); // update navbar cart count
    }
  }
}
</script>


