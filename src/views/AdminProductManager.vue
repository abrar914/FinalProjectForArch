<template>
  <div class="admin-product-manager container mt-4">
    <h2>Manage Products</h2>

    <form @submit.prevent="addProduct" class="row g-3 mb-4">
      <div class="col-md-3">
        <input v-model="newProduct.name" type="text" class="form-control" placeholder="Name" required />
      </div>
      <div class="col-md-3">
        <input v-model="newProduct.price" type="number" class="form-control" placeholder="Price" required />
      </div>
      <div class="col-md-3">
        <input v-model="newProduct.description" type="text" class="form-control" placeholder="Description" required />
      </div>
      <div class="col-md-3">
        <input v-model="newProduct.image" type="text" class="form-control" placeholder="Image URL" />
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary w-100">Save Product</button>
      </div>
    </form>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th><th>Price</th><th>Description</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="edit(index)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="remove(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminProductManager',
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: '',
        description: '',
        image: ''
      },
      editingIndex: null
    }
  },
  mounted() {
    const stored = localStorage.getItem('products')
    this.products = stored ? JSON.parse(stored) : []
  },
  methods: {
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    addProduct() {
      if (this.editingIndex !== null) {
        this.products[this.editingIndex] = { ...this.newProduct }
        this.editingIndex = null
      } else {
        this.products.push({ ...this.newProduct })
      }
      this.saveProducts()
      this.resetForm()
    },
    edit(index) {
      this.editingIndex = index
      this.newProduct = { ...this.products[index] }
    },
    remove(index) {
      this.products.splice(index, 1)
      this.saveProducts()
    },
    resetForm() {
      this.newProduct = { name: '', price: '', description: '', image: '' }
    }
  }
}
</script>

<style scoped>
table {
  margin-top: 2rem;
}
</style>

