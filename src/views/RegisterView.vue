<template>
  <div class="register mt-5">
    <h2 class="text-center mb-4">Register</h2>
    <form @submit.prevent="handleRegister" class="register-form mx-auto">
      <div class="form-group mb-3">
        <label>Username</label>
        <input v-model="username" class="form-control form-control-lg" required />
      </div>

      <div class="form-group mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control form-control-lg" required />
      </div>

      <div class="form-group mb-3">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control form-control-lg" required />
      </div>

      <div class="form-group mb-4">
        <label>Role</label>
        <select v-model="role" class="form-select form-select-lg" required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
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
      password: '',
      email: '',
      role: ''
    };
  },
  methods: {
    handleRegister() {
      const newUser = {
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role
      };

      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert(`Registered successfully as ${newUser.role}. Please log in.`);
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








