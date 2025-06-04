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
import { ref, onMounted } from 'vue';

const sales = ref([]);
const totalItems = ref(0);
const totalRevenue = ref(0);

onMounted(() => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const productSales = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      const name = item.name || 'Unnamed';
      const quantity = item.quantity ? Number(item.quantity) : 1;
      const price = item.price ? Number(item.price) : 0;

      if (!productSales[name]) {
        productSales[name] = {
          name,
          quantity: 0,
          total: 0
        };
      }

      productSales[name].quantity += quantity;
      productSales[name].total += price * quantity;
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



