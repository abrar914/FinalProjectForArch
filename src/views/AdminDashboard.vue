<template>
  <div class="container mt-5 text-center">
    <h2>Welcome, Admin</h2>
    <p class="text-muted mt-2">Manage your store using the options below.</p>

    <div class="mt-4 d-flex flex-column align-items-center gap-3">
      <router-link to="/admin/add-product" class="btn btn-success w-50">
        ➕ Add New Product
      </router-link>
      <router-link to="/admin/manage-inventory" class="btn btn-warning w-50">
        🛠️ Manage Inventory
      </router-link>
      <router-link to="/products" class="btn btn-primary w-50">
        🔍 View All Products
      </router-link>
      <router-link to="/admin/sales-report" class="btn btn-info w-50">
        📊 View Sales Report
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>





