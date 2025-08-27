<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <!-- Hero Section -->
    <section class="relative py-32 px-6 lg:px-8">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Luxury experiences"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-midnight-900/95 via-midnight-800/90 to-midnight-700/95"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <h1 class="text-display-lg font-serif font-bold text-white mb-6">
          Luxury Experiences
        </h1>
        <p class="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
          Discover extraordinary journeys curated for the most discerning travelers
        </p>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300 border backdrop-blur-sm',
              activeFilter === filter.value
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white border-gold-400 shadow-lg shadow-gold-500/25'
                : 'bg-white/10 text-white/80 hover:bg-white/20 border-white/20 hover:border-white/40'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Experiences Grid -->
    <section class="pb-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Results Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 class="text-3xl font-serif font-bold text-white mb-2">
              {{ filteredExperiences.length }} {{ activeFilter === 'all' ? 'Experiences' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) + ' Experiences' }}
            </h2>
            <p class="text-white/60 text-sm">Curated for the most discerning travelers</p>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-white/70 text-sm">Sort by:</span>
              <select
                v-model="sortBy"
                class="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Experience Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="experience in sortedExperiences" :key="experience.id" class="group">
            <router-link :to="`/experience/${experience.id}`" class="block h-full">
              <div class="luxury-card h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 hover:-translate-y-1">
                <!-- Image -->
                <div class="relative overflow-hidden">
                  <SafeImage
                    :src="experience.image"
                    :alt="experience.title"
                    class="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    :fallback="fallbackImage"
                    decoding="async"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div class="absolute top-4 left-4">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm',
                      experience.tier === 'Platinum' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' :
                      experience.tier === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white' :
                      'bg-gradient-to-r from-gray-500 to-gray-400 text-white'
                    ]">
                      {{ experience.tier }}
                    </span>
                  </div>
                  <div class="absolute top-4 right-4">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm',
                      experience.availability === 'Available' ? 'bg-green-500/90 text-white' :
                      experience.availability === 'Limited' ? 'bg-orange-500/90 text-white' :
                      'bg-red-500/90 text-white'
                    ]">
                      {{ experience.availability }}
                    </span>
                  </div>

                  <!-- Price overlay -->
                  <div class="absolute bottom-4 right-4">
                    <div class="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                      <div class="text-lg font-bold text-gold-400">${{ experience.price.toLocaleString() }}</div>
                      <div class="text-xs text-white/80">per experience</div>
                    </div>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6 flex-1 flex flex-col">
                  <div class="flex-1">
                    <div class="flex items-start justify-between mb-3">
                      <h3 class="text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors duration-300 leading-tight">
                        {{ experience.title }}
                      </h3>
                      <div class="flex items-center space-x-1 ml-3">
                        <svg class="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-gold-400 text-sm font-semibold">{{ experience.rating }}</span>
                      </div>
                    </div>

                    <p class="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {{ experience.description }}
                    </p>

                    <div class="flex items-center justify-between text-sm text-white/60 mb-4">
                      <div class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ experience.duration }}</span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="truncate">{{ experience.location }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="pt-4 border-t border-white/10">
                    <div class="flex items-center justify-between">
                      <div class="text-white/60 text-sm">
                        <span class="text-white/40">({{ experience.reviews }} reviews)</span>
                      </div>

                      <div class="flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors duration-200 text-sm font-semibold group-hover:translate-x-1 transform transition-transform">
                        <span>View Details</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-16" v-if="filteredExperiences.length > displayLimit">
          <button 
            @click="displayLimit += 6"
            class="btn-primary px-8 py-4"
          >
            Load More Experiences
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SafeImage from '@/components/SafeImage.vue'
import { useExperiences } from '@/composables/useExperiences'

const { allExperiences } = useExperiences()

const activeFilter = ref('all')
const sortBy = ref('rating')
const displayLimit = ref(6)

const filters = [
  { label: 'All Experiences', value: 'all' },
  { label: 'Transport', value: 'Transport' },
  { label: 'Dining', value: 'Dining' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Platinum Only', value: 'Platinum' }
]

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') return allExperiences.value
  if (['Silver', 'Gold', 'Platinum'].includes(activeFilter.value)) {
    return allExperiences.value.filter(exp => exp.tier === activeFilter.value)
  }
  return allExperiences.value.filter(exp => exp.category === activeFilter.value)
})

const sortedExperiences = computed(() => {
  const sorted = [...filteredExperiences.value]

  let result
  switch (sortBy.value) {
    case 'rating':
      result = sorted.sort((a, b) => b.rating - a.rating)
      break
    case 'price-low':
      result = sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result = sorted.sort((a, b) => b.price - a.price)
      break
    case 'duration':
      result = sorted.sort((a, b) => a.duration.localeCompare(b.duration))
      break
    default:
      result = sorted
  }

  return result.slice(0, displayLimit.value)
})

const fallbackImage = 'https://images.unsplash.com/photo-1540946485063-a40da4821b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
</script>
