<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>

    <div v-if="cart.length === 0" class="alert alert-info">Your cart is empty.</div>

    <div v-else>
      <ul class="list-group mb-3">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(item, index) in cart"
          :key="index"
        >
          <div>
            {{ item.name }} (x{{ item.quantity }}) - ${{ item.price }} each
          </div>
          <div>
            ${{ (item.price * item.quantity).toFixed(2) }}
            <button class="btn btn-danger btn-sm ms-2" @click="removeItem(index)">
              Remove
            </button>
          </div>
        </li>
      </ul>

      <p><strong>Total:</strong> ${{ total.toFixed(2) }}</p>
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
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  },
  methods: {
    removeItem(index) {
      if (confirm('Remove this item from your cart?')) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }
};
</script>




