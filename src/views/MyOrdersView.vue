<template>
  <div class="container mt-5">
    <h2>My Orders</h2>
    <div v-if="myOrders.length === 0">
      <p>You haven't placed any orders yet.</p>
    </div>

    <div v-for="order in myOrders" :key="order.id" class="card my-4 p-3">
      <div :id="'receipt-' + order.id">
        <p><strong>Order ID:</strong> {{ order.id }}</p>
        <p><strong>Date:</strong> {{ order.date }}</p>
        <p><strong>Name:</strong> {{ order.fullName }}</p>
        <p><strong>Address:</strong> {{ order.address }}</p>

        <h5 class="mt-3">Items:</h5>
        <ul class="list-group">
          <li
            v-for="item in order.items"
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

        <p class="mt-2">
          <strong>Total:</strong>
          ${{ order.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2) }}
        </p>
      </div>

      <button class="btn btn-outline-primary mt-2" @click="downloadReceipt(order.id)">Download Receipt (PDF)</button>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

export default {
  name: 'MyOrdersView',
  data() {
    return {
      myOrders: []
    };
  },
  created() {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (currentUser && currentUser.email) {
      this.myOrders = allOrders.filter(order => order.customer === currentUser.email);
    }
  },
  methods: {
    downloadReceipt(orderId) {
      const element = document.getElementById(`receipt-${orderId}`);
      const options = {
        margin:       0.5,
        filename:     `receipt_${orderId}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(options).from(element).save();
    }
  }
};
</script>
