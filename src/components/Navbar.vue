<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <router-link class="navbar-brand" to="/">OnlineStore</router-link>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="isCustomer" class="nav-item">
          <router-link class="nav-link" to="/products">Shop</router-link>
        </li>
        <li v-if="isCustomer" class="nav-item">
          <router-link class="nav-link" to="/cart">
            Cart
            <span class="badge bg-success ms-1" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>
        </li>
        <li v-if="isCustomer" class="nav-item">
          <router-link class="nav-link" to="/my-orders">My Orders</router-link>
        </li>
        <li v-if="isAdmin" class="nav-item">
          <router-link class="nav-link" to="/admin">Admin Panel</router-link>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto">
        <li v-if="!user" class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="!user" class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li v-if="user" class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      cartCount: 0
    };
  },
  computed: {
    isCustomer() {
      return this.user && this.user.role === 'customer';
    },
    isAdmin() {
      return this.user && this.user.role === 'admin';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      this.user = null;
      this.cartCount = 0;
      this.$router.push('/login');
      window.dispatchEvent(new Event('storage'));
    },
    refreshUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartCount = cart.length;
    }
  },
  mounted() {
    this.refreshUser();
    window.addEventListener('storage', this.refreshUser);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.refreshUser);
  }
};
</script>


