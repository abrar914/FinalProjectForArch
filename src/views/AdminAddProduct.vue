<!-- src/views/AdminAddProduct.vue -->
<template>
  <div class="container mt-5">
    <h3 class="mb-4">Add New Product</h3>
    <form @submit.prevent="addProduct">
      <div class="mb-3">
        <label class="form-label">Product Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Price</label>
        <input v-model.number="price" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Quantity</label>
        <input v-model.number="quantity" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="description" class="form-control" rows="4" required></textarea>
      </div>
      <button class="btn btn-success">Add Product</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminAddProduct',
  data() {
    return {
      name: '',
      price: 0,
      quantity: 0,
      description: ''
    };
  },
  methods: {
    addProduct() {
      const products = JSON.parse(localStorage.getItem('products')) || [];

      const newProduct = {
        id: Date.now(),
        name: this.name,
        price: this.price,
        quantity: this.quantity,
        description: this.description
      };

      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));

      alert('Product added!');
      this.name = '';
      this.price = 0;
      this.quantity = 0;
      this.description = '';
    }
  }
};
</script>

