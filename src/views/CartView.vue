<!-- src/views/CartView.vue -->
<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>
    <div v-if="cart.length === 0" class="alert alert-info">Your cart is empty.</div>
    <div v-else>
      <ul class="list-group mb-3">
        <li class="list-group-item" v-for="(item, index) in cart" :key="index">
          {{ item.name }} - ${{ item.price }}
        </li>
      </ul>
      <p><strong>Total:</strong> ${{ total }}</p>
      <router-link to="/checkout" class="btn btn-success">Proceed to Checkout</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },
  mounted() {
    const saved = JSON.parse(localStorage.getItem('cart')) || [];
    this.cart = saved;
  }
};
</script>


