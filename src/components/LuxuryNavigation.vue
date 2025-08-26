<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-midnight-900/95 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-12 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-serif font-bold text-lg">AV</span>
            </div>
            <h1 class="text-xl font-serif font-semibold text-white">Aura Ventures</h1>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/experiences" class="text-white/80 hover:text-white transition-colors duration-200 font-medium">Experiences</router-link>
          <router-link to="/itinerary" class="text-white/80 hover:text-white transition-colors duration-200 font-medium">Itinerary</router-link>
          <router-link to="/events" class="text-white/80 hover:text-white transition-colors duration-200 font-medium">Events</router-link>
          <router-link to="/concierge" class="text-white/80 hover:text-white transition-colors duration-200 font-medium">Concierge</router-link>
        </div>

        <!-- User Profile & Actions -->
        <div class="flex items-center space-x-4">
          <div class="hidden sm:flex items-center space-x-3">
            <div class="px-3 py-1 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full text-xs font-medium text-white">
              Platinum
            </div>
          </div>
          
          <router-link to="/profile" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </router-link>

          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-white/10">
        <div class="flex flex-col space-y-4">
          <router-link to="/experiences" class="text-white/80 hover:text-white transition-colors duration-200 font-medium" @click="mobileMenuOpen = false">Experiences</router-link>
          <router-link to="/itinerary" class="text-white/80 hover:text-white transition-colors duration-200 font-medium" @click="mobileMenuOpen = false">Itinerary</router-link>
          <router-link to="/events" class="text-white/80 hover:text-white transition-colors duration-200 font-medium" @click="mobileMenuOpen = false">Events</router-link>
          <router-link to="/concierge" class="text-white/80 hover:text-white transition-colors duration-200 font-medium" @click="mobileMenuOpen = false">Concierge</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>
