<!-- src/views/CustomerDashboard.vue -->
<template>
  <div class="container mt-5 text-center">
    <h2>Welcome, {{ user?.username }}</h2>
    <p class="text-muted mt-2">You can browse products, view your cart, or check your orders using the top menu.</p>
  </div>
</template>

<script>
export default {
  name: 'CustomerDashboard',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    };
  }
};
</script>  


