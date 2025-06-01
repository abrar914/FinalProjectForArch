<!-- src/views/SalesReport.vue -->
<template>
  <div class="container mt-5">
    <h2>Sales Report</h2>

    <div v-if="sales.length === 0" class="alert alert-warning">
      No sales yet.
    </div>

    <div v-else>
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity Sold</th>
            <th>Total Sales ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sales" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4">
        <p><strong>Total Items Sold:</strong> {{ totalItems }}</p>
        <p><strong>Total Revenue:</strong> ${{ totalRevenue.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const sales = ref([]);
const totalItems = ref(0);
const totalRevenue = ref(0);

onMounted(() => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const productSales = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.name]) {
        productSales[item.name] = {
          name: item.name,
          quantity: 0,
          total: 0
        };
      }
      productSales[item.name].quantity += item.quantity || 1;
      productSales[item.name].total += item.price * (item.quantity || 1);
    });
  });

  sales.value = Object.values(productSales);

  totalItems.value = sales.value.reduce((sum, item) => sum + item.quantity, 0);
  totalRevenue.value = sales.value.reduce((sum, item) => sum + item.total, 0);
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
