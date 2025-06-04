<!-- src/views/ReceiptView.vue -->
<template>
  <div class="container mt-5" v-if="receipt">
    <h2>Order Receipt</h2>
    <p><strong>Order ID:</strong> {{ receipt.id }}</p>
    <p><strong>Date:</strong> {{ receipt.date }}</p>
    <p><strong>Name:</strong> {{ receipt.fullName }}</p>
    <p><strong>Address:</strong> {{ receipt.address }}</p>

    <h4 class="mt-4">Items:</h4>
    <ul class="list-group">
      <li
        v-for="item in receipt.items"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          {{ item.name }} <span class="text-muted">(x{{ item.quantity || 1 }})</span>
        </div>
        <div>
          ${{ (item.price * (item.quantity || 1)).toFixed(2) }}
        </div>
      </li>
    </ul>

    <p class="mt-3"><strong>Total:</strong> ${{ totalAmount }}</p>
  </div>

  <div v-else class="text-center mt-5">
    <p>No recent receipt found.</p>
  </div>
</template>

<script>
export default {
  name: 'ReceiptView',
  data() {
    return {
      receipt: null
    };
  },
  computed: {
    totalAmount() {
      if (!this.receipt || !this.receipt.items) return '0.00';
      return this.receipt.items
        .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
        .toFixed(2);
    }
  },
  created() {
    this.receipt = JSON.parse(localStorage.getItem('lastReceipt'));
  }
};
</script>




