<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Manage Inventory</h2>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price ($)</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editProduct(index)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div v-if="editingIndex !== null" class="border p-4 mt-4 bg-light">
      <h4>Edit Product</h4>
      <div class="mb-2">
        <label>Name:</label>
        <input v-model="editedProduct.name" class="form-control" />
      </div>
      <div class="mb-2">
        <label>Price:</label>
        <input type="number" v-model.number="editedProduct.price" class="form-control" />
      </div>
      <div class="mb-2">
        <label>Quantity:</label>
        <input type="number" v-model.number="editedProduct.quantity" class="form-control" />
      </div>
      <button class="btn btn-success" @click="saveEdit">Save</button>
      <button class="btn btn-secondary ms-2" @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageInventory',
  data() {
    return {
      products: [],
      editedProduct: {},
      editingIndex: null
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.products = JSON.parse(localStorage.getItem('products')) || [];
    },
    deleteProduct(index) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(this.products));
      }
    },
    editProduct(index) {
      this.editingIndex = index;
      this.editedProduct = { ...this.products[index] }; // clone
    },
    saveEdit() {
      if (this.editingIndex !== null) {
        this.products.splice(this.editingIndex, 1, this.editedProduct);
        localStorage.setItem('products', JSON.stringify(this.products));
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.editingIndex = null;
      this.editedProduct = {};
    }
  }
};
</script>
