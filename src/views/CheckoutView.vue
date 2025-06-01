<template>
  <div class="container mt-5">
    <h2>Checkout</h2>
    <form @submit.prevent="handleCheckout">
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input v-model="fullName" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Card Number</label>
        <input
  type="text"
  v-model="cardNumber"
  class="form-control"
  required
  pattern="^\d{16}$"
  title="Card number must be exactly 16 digits"
/>

      </div>

      <div class="mb-3">
        <label class="form-label">CVC (3 digits)</label>
        <input
  type="text"
  v-model="cardCVC"
  class="form-control"
  required
  pattern="^\d{3}$"
  title="CVC must be 3 digits"
  maxlength="3"
  @input="cardCVC = cardCVC.replace(/\D/g, '')"
/>

      </div>

      <div class="mb-3">
        <label class="form-label">Address</label>
        <input v-model="address" class="form-control" required />
      </div>

      <button class="btn btn-success">Place Order</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CheckoutView',
  data() {
    return {
      fullName: '',
      cardNumber: '',
      cvc: '',
      address: ''
    };
  },
  methods: {
    handleCheckout() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!user?.email) {
        alert('Please log in to place an order.');
        return;
      }

      // Update inventory
      cart.forEach(cartItem => {
        const productIndex = products.findIndex(p => p.name === cartItem.name);
        if (productIndex !== -1 && products[productIndex].quantity > 0) {
          products[productIndex].quantity -= 1;
        }
      });
      localStorage.setItem('products', JSON.stringify(products));

      // Save order
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: Date.now(),
        customer: user.email, // using email as ID
        fullName: this.fullName,
        address: this.address,
        card: this.cardNumber,
        cvc: this.cvc,
        items: cart,
        date: new Date().toLocaleString()
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem('lastReceipt', JSON.stringify(newOrder));
      localStorage.removeItem('cart');

      this.$router.push('/receipt');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>













