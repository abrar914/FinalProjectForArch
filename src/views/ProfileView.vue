<template>
  <div class="container mt-5 mb-5" style="max-width: 600px">
    <h2 class="mb-4">My Profile</h2>

    <form @submit.prevent="saveProfile" class="needs-validation" novalidate>
      <!-- Email (not editable) -->
      <div class="mb-3">
        <label class="form-label">Email (cannot be changed)</label>
        <input type="email" class="form-control" :value="user.email" disabled />
      </div>

      <!-- Username -->
      <div class="mb-3">
        <label class="form-label">Username *</label>
        <input
          v-model="username"
          class="form-control"
          required
          placeholder="Enter your username"
        />
      </div>

      <!-- Full Name -->
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input
          v-model="fullName"
          class="form-control"
          placeholder="Enter your full name"
        />
      </div>

      <!-- Phone Number -->
      <div class="mb-3">
        <label class="form-label">Phone Number *</label>
        <input
          v-model="phone"
          class="form-control"
          required
          pattern="\\d{10}"
          title="Phone number must be exactly 10 digits"
          placeholder="e.g., 0412345678"
        />
      </div>

      <!-- Address -->
      <div class="mb-3">
        <label class="form-label">Address</label>
        <input
          v-model="address"
          class="form-control"
          placeholder="Street address"
        />
      </div>

      <!-- City -->
      <div class="mb-3">
        <label class="form-label">City</label>
        <input v-model="city" class="form-control" placeholder="City" />
      </div>

      <!-- Postcode -->
      <div class="mb-3">
        <label class="form-label">Postcode</label>
        <input
          v-model="postcode"
          class="form-control"
          pattern="\\d{4,6}"
          title="Postcode should be 4 to 6 digits"
          placeholder="e.g., 3000"
        />
      </div>

      <!-- Save + Navigation Buttons -->
      <div class="d-flex flex-wrap gap-2">
        <button type="submit" class="btn btn-primary">Save Profile</button>
        <router-link to="/my-orders" class="btn btn-outline-secondary">My Orders</router-link>
        <router-link to="/cart" class="btn btn-outline-success">Go to Cart</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      username: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      postcode: ''
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.user = storedUser;
        this.username = storedUser.username || '';
        this.fullName = storedUser.fullName || '';
        this.phone = storedUser.phone || '';
        this.address = storedUser.address || '';
        this.city = storedUser.city || '';
        this.postcode = storedUser.postcode || '';
      }
    },
    saveProfile() {
      if (!/^\d{10}$/.test(this.phone)) {
        alert('Phone number must be exactly 10 digits.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex(u => u.email === this.user.email);

      if (index !== -1) {
        // Update the user in the list
        users[index] = {
          ...users[index],
          username: this.username,
          fullName: this.fullName,
          phone: this.phone,
          address: this.address,
          city: this.city,
          postcode: this.postcode
        };

        // Update localStorage
        localStorage.setItem('users', JSON.stringify(users));

        const updatedUser = {
          ...this.user,
          username: this.username,
          fullName: this.fullName,
          phone: this.phone,
          address: this.address,
          city: this.city,
          postcode: this.postcode
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = updatedUser;

        alert('Profile updated successfully.');
      } else {
        alert('User not found.');
      }
    }
  }
};
</script>
