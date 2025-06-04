<template>
  <div class="container mt-4">
    <h2>My Orders</h2>
    <div v-if="myOrders.length === 0" class="alert alert-info">No orders placed yet.</div>
    <div v-else>
      <div class="card mt-3" v-for="(order, index) in myOrders" :key="index">
        <div class="card-body">
          <h5 class="card-title">Order #{{ index + 1 }}</h5>
          <p><strong>Name:</strong> {{ order.fullName }}</p>
          <p><strong>Address:</strong> {{ order.address }}</p>
          <p><strong>Card Ending:</strong> ****{{ order.card?.slice(-4) }}</p>
          <p><strong>Date:</strong> {{ order.date }}</p>
          <p><strong>Items:</strong></p>
          <ul>
            <li v-for="(item, i) in order.items" :key="i">
              {{ item.name }} (x{{ item.quantity || 1 }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyOrdersView',
  data() {
    return {
      allOrders: [],
      myOrders: [],
      currentUser: JSON.parse(localStorage.getItem('user')) || null
    };
  },
  created() {
    this.allOrders = JSON.parse(localStorage.getItem('orders')) || [];

    if (this.currentUser && this.currentUser.email) {
      this.myOrders = this.allOrders.filter(order =>
        order.customer === this.currentUser.email || order.email === this.currentUser.email
      );
    }
  }
};
</script>










