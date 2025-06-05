<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <!-- Brand Logo (embedded inline SVG) -->
    <router-link class="navbar-brand d-flex align-items-center" to="/">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100" fill="none" class="me-2">
        <circle cx="50" cy="50" r="48" stroke="white" stroke-width="4"/>
        <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial, sans-serif">AWE</text>
      </svg>
      <span class="fw-bold">AWE Electronics</span>
    </router-link>

    <!-- Mobile Hamburger -->
    <button class="navbar-toggler" type="button" @click="toggleMobileMenu">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Desktop Menu -->
    <div class="d-none d-lg-flex justify-content-between w-100 align-items-center">
      <ul class="navbar-nav flex-row">
        <li v-if="isCustomer" class="nav-item me-3">
          <router-link class="nav-link" to="/products">Shop</router-link>
        </li>
        <li v-if="isCustomer" class="nav-item me-3">
          <router-link class="nav-link" to="/cart">
            Cart <span class="badge bg-success ms-1" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>
        </li>
        <li v-if="isCustomer" class="nav-item me-3">
          <router-link class="nav-link" to="/my-orders">My Orders</router-link>
        </li>
        <li v-if="isCustomer" class="nav-item me-3">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li v-if="isAdmin" class="nav-item me-3">
          <router-link class="nav-link" to="/admin">Admin Panel</router-link>
        </li>
      </ul>

      <ul class="navbar-nav flex-row">
        <li v-if="!user" class="nav-item me-3">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="!user" class="nav-item me-3">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li v-if="user" class="nav-item me-3">
          <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </div>

    <!-- Mobile Slide-Out -->
    <div v-if="mobileMenuOpen" class="d-lg-none position-absolute top-100 start-0 bg-dark w-100 z-3 shadow-sm p-3">
      <ul class="navbar-nav">
        <li v-if="isCustomer" class="nav-item mb-2">
          <router-link class="nav-link" to="/products" @click="closeMobileMenu">Shop</router-link>
        </li>
        <li v-if="isCustomer" class="nav-item mb-2">
          <router-link class="nav-link" to="/cart" @click="closeMobileMenu">
            Cart <span class="badge bg-success ms-1" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>
        </li>
        <li v-if="isCustomer" class="nav-item mb-2">
          <router-link class="nav-link" to="/my-orders" @click="closeMobileMenu">My Orders</router-link>
        </li>
        <li v-if="isCustomer" class="nav-item mb-2">
          <router-link class="nav-link" to="/profile" @click="closeMobileMenu">Profile</router-link>
        </li>
        <li v-if="isAdmin" class="nav-item mb-2">
          <router-link class="nav-link" to="/admin" @click="closeMobileMenu">Admin Panel</router-link>
        </li>
        <li v-if="!user" class="nav-item mb-2">
          <router-link class="nav-link" to="/login" @click="closeMobileMenu">Login</router-link>
        </li>
        <li v-if="!user" class="nav-item mb-2">
          <router-link class="nav-link" to="/register" @click="closeMobileMenu">Register</router-link>
        </li>
        <li v-if="user" class="nav-item mb-2">
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
      cartCount: 0,
      mobileMenuOpen: false
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
      this.mobileMenuOpen = false;
      this.$router.push('/login');
      window.dispatchEvent(new Event('storage'));
    },
    refreshUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartCount = cart.length;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
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

<style scoped>
.navbar-nav .nav-link {
  font-size: 1rem;
}
.navbar-brand span {
  font-size: 1.2rem;
}
</style>
