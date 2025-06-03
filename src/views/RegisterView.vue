<!-- src/views/RegisterView.vue -->
<template>
  <div class="register mt-5">
    <h2 class="text-center mb-4">Register</h2>
    <form @submit.prevent="handleRegister" class="register-form mx-auto">
      <div class="form-group mb-3">
        <label>Username</label>
        <input v-model="username" class="form-control form-control-lg" required />
      </div>

      <div class="form-group mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control form-control-lg" required />
      </div>

      <div class="form-group mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control form-control-lg" required />
      </div>

      <button class="btn btn-success btn-lg w-100">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    handleRegister() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Prevent duplicate email registration
      if (users.some(user => user.email === this.email)) {
        alert('This email is already registered.');
        return;
      }

      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: 'customer'
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registered successfully. Please log in.');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 700px;
  margin: auto;
}
.register-form {
  width: 100%;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>












