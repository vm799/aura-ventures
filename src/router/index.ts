import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy-loaded components for better performance
const Home = () => import('@/views/Home.vue')
const Experiences = () => import('@/views/Experiences.vue')
const ExperienceDetail = () => import('@/views/ExperienceDetail.vue')
const Subscription = () => import('@/views/Subscription.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Itinerary = () => import('@/views/Itinerary.vue')
const Concierge = () => import('@/views/Concierge.vue')
const Events = () => import('@/views/Events.vue')
const Profile = () => import('@/views/Profile.vue')
const Booking = () => import('@/views/Booking.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Aura Ventures - Curated Luxury Travel' }
  },
  {
    path: '/experiences',
    name: 'Experiences',
    component: Experiences,
    meta: { title: 'Luxury Experiences' }
  },
  {
    path: '/experience/:id',
    name: 'ExperienceDetail',
    component: ExperienceDetail,
    meta: { title: 'Experience Details' }
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: Subscription,
    meta: { title: 'Subscription Plans' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Your Dashboard', requiresAuth: true }
  },
  {
    path: '/itinerary',
    name: 'Itinerary',
    component: Itinerary,
    meta: { title: 'Your Itinerary', requiresAuth: true }
  },
  {
    path: '/concierge',
    name: 'Concierge',
    component: Concierge,
    meta: { title: 'Personal Concierge', requiresAuth: true }
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: { title: 'Exclusive Events' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: 'Your Profile', requiresAuth: true }
  },
  {
    path: '/booking/:experienceId',
    name: 'Booking',
    component: Booking,
    meta: { title: 'Complete Booking', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // Simple auth check (in real app, this would check actual auth state)
  if (to.meta.requiresAuth) {
    // For demo purposes, we'll assume user is always authenticated
    // In real app: check if user is logged in, redirect to login if not
  }
  
  next()
})

export default router
