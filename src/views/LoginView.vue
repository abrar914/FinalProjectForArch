<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Role</label>
        <select v-model="role" class="form-select">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="login">Login</button>
    </form>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      role: 'customer',
      error: ''
    };
  },
  methods: {
    login() {
      console.log("Login button clicked");
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const foundUser = users.find(
        u => u.email === this.email && u.password === this.password && u.role === this.role
      );

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        window.dispatchEvent(new Event('storage'));
        this.$router.push(this.role === 'admin' ? '/admin' : '/customer');
      } else {
        this.error = 'Invalid email, password, or role.';
      }
    }
  }
};
</script>












