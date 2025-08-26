<template>
  <div v-if="experience" class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <!-- Hero Gallery Section -->
    <section class="relative h-screen overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          :src="currentImage" 
          :alt="experience.title"
          class="w-full h-full object-cover transition-all duration-1000"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-transparent to-midnight-900/60"></div>
      </div>

      <!-- Gallery Navigation -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div class="flex space-x-2">
          <button 
            v-for="(image, index) in experience.gallery" 
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300',
              currentImageIndex === index ? 'border-gold-400' : 'border-white/30 hover:border-white/60'
            ]"
          >
            <img :src="image" :alt="`Gallery ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="absolute inset-0 z-10 flex items-end">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full">
          <div class="max-w-4xl">
            <div class="flex items-center space-x-4 mb-6">
              <span :class="[
                'px-4 py-2 rounded-full text-sm font-medium',
                experience.tier === 'Platinum' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' :
                experience.tier === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white' :
                'bg-gradient-to-r from-gray-500 to-gray-400 text-white'
              ]">
                {{ experience.tier }} Experience
              </span>
              <span :class="[
                'px-3 py-1 rounded text-sm font-medium',
                experience.availability === 'Available' ? 'bg-green-500 text-white' :
                experience.availability === 'Limited' ? 'bg-orange-500 text-white' :
                'bg-red-500 text-white'
              ]">
                {{ experience.availability }}
              </span>
            </div>
            
            <h1 class="text-display-lg font-serif font-bold text-white mb-6">
              {{ experience.title }}
            </h1>
            
            <p class="text-xl text-white/90 mb-8 leading-relaxed">
              {{ experience.description }}
            </p>

            <div class="flex flex-wrap items-center gap-6 text-white/80">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ experience.duration }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ experience.location }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-gold-400">{{ experience.rating }}</span>
                <span class="text-white/60">({{ experience.reviews }} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Details -->
    <section class="py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Description -->
            <div>
              <h2 class="text-3xl font-serif font-bold text-white mb-6">Experience Overview</h2>
              <p class="text-lg text-white/80 leading-relaxed">
                {{ experience.longDescription }}
              </p>
            </div>

            <!-- Highlights -->
            <div>
              <h3 class="text-2xl font-serif font-semibold text-white mb-6">Experience Highlights</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="highlight in experience.highlights" :key="highlight" class="flex items-start space-x-3">
                  <svg class="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-white/80">{{ highlight }}</span>
                </div>
              </div>
            </div>

            <!-- What's Included -->
            <div>
              <h3 class="text-2xl font-serif font-semibold text-white mb-6">What's Included</h3>
              <div class="space-y-3">
                <div v-for="item in experience.includes" :key="item" class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-white/80">{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- Exclusive Features -->
            <div>
              <h3 class="text-2xl font-serif font-semibold text-white mb-6">Exclusive {{ experience.tier }} Features</h3>
              <div class="space-y-3">
                <div v-for="exclusive in experience.exclusives" :key="exclusive" class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-white/80">{{ exclusive }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Sidebar -->
          <div class="lg:col-span-1">
            <div class="luxury-card sticky top-32">
              <div class="text-center mb-6">
                <div class="text-4xl font-bold text-gold-400 mb-2">
                  ${{ experience.price.toLocaleString() }}
                </div>
                <div class="text-white/60">per experience</div>
              </div>

              <!-- Quick Booking Form -->
              <form @submit.prevent="handleBooking" class="space-y-6">
                <div>
                  <label class="block text-white font-medium mb-2">Preferred Date</label>
                  <input 
                    v-model="bookingForm.date" 
                    type="date" 
                    :min="minDate"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label class="block text-white font-medium mb-2">Number of Guests</label>
                  <select 
                    v-model="bookingForm.guests" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select guests</option>
                    <option v-for="n in 12" :key="n" :value="n">{{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-white font-medium mb-2">Special Requests</label>
                  <textarea 
                    v-model="bookingForm.notes" 
                    rows="3" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                    placeholder="Any special requirements or preferences..."
                  ></textarea>
                </div>

                <div class="space-y-3">
                  <button 
                    type="submit" 
                    :disabled="experience.availability === 'Waitlist'"
                    class="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ experience.availability === 'Waitlist' ? 'Join Waitlist' : 'Reserve Experience' }}
                  </button>
                  
                  <router-link 
                    to="/concierge" 
                    class="w-full btn-secondary py-4 text-lg font-semibold block text-center"
                  >
                    Speak with Concierge
                  </router-link>
                </div>
              </form>

              <!-- Contact Information -->
              <div class="mt-8 pt-6 border-t border-white/20 text-center text-white/60 text-sm">
                <p>Questions about this experience?</p>
                <p class="text-gold-400 font-medium">+1 (555) 123-LUXURY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Experiences -->
    <section class="py-24 px-6 lg:px-8 bg-gradient-to-r from-midnight-800/50 to-midnight-700/50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-serif font-bold text-white mb-12 text-center">
          Similar Experiences
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link 
            v-for="related in relatedExperiences" 
            :key="related.id"
            :to="`/experience/${related.id}`"
            class="block group"
          >
            <div class="luxury-card">
              <div class="aspect-w-16 aspect-h-9 mb-4 relative overflow-hidden rounded-xl">
                <img 
                  :src="related.image" 
                  :alt="related.title"
                  class="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute top-3 right-3">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    related.tier === 'Platinum' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' :
                    related.tier === 'Gold' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white' :
                    'bg-gradient-to-r from-gray-500 to-gray-400 text-white'
                  ]">
                    {{ related.tier }}
                  </span>
                </div>
              </div>
              
              <h3 class="text-lg font-serif font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                {{ related.title }}
              </h3>
              
              <p class="text-white/60 text-sm mb-3">{{ related.location }}</p>
              
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gold-400">
                  ${{ related.price.toLocaleString() }}
                </span>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-gold-400 text-sm">{{ related.rating }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <!-- Experience Not Found -->
  <div v-else class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-serif font-bold text-white mb-4">Experience Not Found</h1>
      <p class="text-white/70 mb-8">The experience you're looking for doesn't exist.</p>
      <router-link to="/experiences" class="btn-primary">
        Browse All Experiences
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useExperiences } from '@/composables/useExperiences'

const route = useRoute()
const router = useRouter()
const { getExperienceById, allExperiences } = useExperiences()

const experience = ref(getExperienceById(route.params.id as string))
const currentImageIndex = ref(0)

const currentImage = computed(() => {
  return experience.value?.gallery[currentImageIndex.value] || ''
})

const relatedExperiences = computed(() => {
  if (!experience.value) return []
  
  return allExperiences.value
    .filter(exp => 
      exp.id !== experience.value!.id && 
      (exp.category === experience.value!.category || exp.tier === experience.value!.tier)
    )
    .slice(0, 3)
})

// Booking form
const bookingForm = ref({
  date: '',
  guests: '',
  notes: ''
})

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const handleBooking = () => {
  if (!experience.value) return
  
  // Navigate to booking page with pre-filled data
  router.push({
    name: 'Booking',
    params: { experienceId: experience.value.id },
    query: {
      date: bookingForm.value.date,
      guests: bookingForm.value.guests,
      notes: bookingForm.value.notes
    }
  })
}

// Auto-cycle through gallery images
let galleryInterval: number | null = null

onMounted(() => {
  if (experience.value?.gallery.length > 1) {
    galleryInterval = setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % experience.value!.gallery.length
    }, 5000)
  }
})

// Clean up interval
onUnmounted(() => {
  if (galleryInterval) {
    clearInterval(galleryInterval)
  }
})
</script>
