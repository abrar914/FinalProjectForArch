// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views
const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const ProductsView = () => import('../views/ProductsView.vue')
const CartView = () => import('../views/CartView.vue')
const CheckoutView = () => import('../views/CheckoutView.vue')
const ReceiptView = () => import('../views/ReceiptView.vue')
const MyOrdersView = () => import('../views/MyOrdersView.vue')

const AdminDashboard = () => import('../views/AdminDashboard.vue')
const AdminAddProduct = () => import('../views/AdminAddProduct.vue')
const ManageInventory = () => import('../views/ManageInventory.vue')
const SalesReport = () => import('../views/SalesReport.vue') // ✅ NEW
const ProfileView = () => import('../views/ProfileView.vue');
const CustomerDashboard = () => import('../views/CustomerDashboard.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/products', name: 'Products', component: ProductsView },
    { path: '/cart', name: 'Cart', component: CartView, meta: { requiresAuth: true, role: 'customer' } },
    { path: '/checkout', name: 'Checkout', component: CheckoutView, meta: { requiresAuth: true, role: 'customer' } },
    { path: '/receipt', name: 'Receipt', component: ReceiptView, meta: { requiresAuth: true, role: 'customer' } },
    { path: '/my-orders', name: 'MyOrders', component: MyOrdersView, meta: { requiresAuth: true, role: 'customer' } },

    { path: '/admin', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
    { path: '/admin/add-product', name: 'AdminAddProduct', component: AdminAddProduct, meta: { requiresAuth: true, role: 'admin' } },
    { path: '/admin/manage-inventory', name: 'ManageInventory', component: ManageInventory, meta: { requiresAuth: true, role: 'admin' } },
    { path: '/admin/sales-report', name: 'SalesReport', component: SalesReport, meta: { requiresAuth: true, role: 'admin' } }, // ✅
    { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true, role: 'customer' } },
    { path: '/customer', name: 'CustomerDashboard', component: CustomerDashboard, meta: { requiresAuth: true, role: 'customer' } },
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth) {
    if (!user) {
      alert('Please login first')
      return next('/login')
    }
    if (to.meta.role && user.role !== to.meta.role) {
      alert('Access denied')
      return next('/')
    }
  }
  next()
})

export default router
