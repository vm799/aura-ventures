<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Luxury yacht at sunset"
          class="w-full h-full object-cover opacity-20"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-midnight-900/90 via-midnight-800/80 to-midnight-700/90"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div class="animate-fade-in">
          <h1 class="text-display-xl font-serif font-bold text-white mb-8 leading-tight">
            Curated Journeys for the
            <span class="text-gradient">Discerning Traveler</span>
          </h1>
          <p class="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience ultra-luxury travel with AI-driven personalization and human expertise. 
            From private yachts to exclusive events, every moment is crafted for you.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <router-link to="/experiences" class="btn-primary text-lg px-12 py-5">
              Explore Experiences
            </router-link>
            <router-link to="/concierge" class="btn-secondary text-lg px-12 py-5">
              Speak with Concierge
            </router-link>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Personalized Recommendations -->
    <section class="py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-slide-up">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Curated for You
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            Our AI analyzes your preferences to suggest extraordinary experiences 
            that align with your sophisticated taste.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExperienceCard 
            v-for="experience in featuredExperiences" 
            :key="experience.id"
            :experience="experience"
          />
        </div>

        <div class="text-center mt-12">
          <router-link to="/experiences" class="btn-primary">
            View All Experiences
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick Access Section -->
    <section class="py-24 px-6 lg:px-8 bg-gradient-to-r from-midnight-800/50 to-midnight-700/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Your Luxury Concierge
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            Access your personalized travel dashboard and exclusive services
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link 
            v-for="service in quickServices" 
            :key="service.id" 
            :to="service.route"
            class="luxury-card text-center group cursor-pointer block no-underline"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <LuxuryIcons :name="service.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ service.title }}</h3>
            <p class="text-white/60 text-sm">{{ service.description }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Subscription Tier Benefits -->
    <section class="py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <div class="mb-16">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Platinum Member Benefits
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            Unlock the highest tier of luxury travel experiences
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="benefit in platinumBenefits" :key="benefit.id" class="luxury-card text-center">
            <div class="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LuxuryIcons :name="benefit.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ benefit.title }}</h3>
            <p class="text-white/60 text-sm">{{ benefit.description }}</p>
          </div>
        </div>

        <div class="mt-12">
          <router-link to="/subscription" class="btn-primary">
            View All Plans
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExperienceCard from '@/components/ExperienceCard.vue'
import LuxuryIcons from '@/components/icons/LuxuryIcons.vue'

// Featured experiences for homepage
const featuredExperiences = ref([
  {
    id: '1',
    title: 'Private Aegean Yacht Charter',
    description: 'Explore the Greek islands aboard a 120ft luxury yacht with personal chef and crew. Seven days of pure indulgence.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tier: 'Platinum' as const
  },
  {
    id: '2',
    title: 'Helicopter Wine Tour Napa',
    description: 'Private helicopter tour of Napa Valley with exclusive tastings at renowned vineyards and Michelin-starred dining.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tier: 'Gold' as const
  },
  {
    id: '3',
    title: 'Private Opera Box Vienna',
    description: 'Exclusive box seats at Vienna State Opera with backstage access and private dinner with renowned performers.',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tier: 'Platinum' as const
  }
])

// Quick access services with routes
const quickServices = ref([
  {
    id: '1',
    title: 'My Itinerary',
    description: 'View and manage upcoming experiences',
    icon: 'calendar' as const,
    route: '/itinerary'
  },
  {
    id: '2',
    title: 'Bookings',
    description: 'Reserve exclusive experiences',
    icon: 'booking' as const,
    route: '/experiences'
  },
  {
    id: '3',
    title: 'Concierge',
    description: '24/7 personal assistance',
    icon: 'concierge' as const,
    route: '/concierge'
  },
  {
    id: '4',
    title: 'Events',
    description: 'Exclusive member events',
    icon: 'event' as const,
    route: '/events'
  }
])

// Platinum benefits
const platinumBenefits = ref([
  {
    id: '1',
    title: 'AI Predictive Recommendations',
    description: 'Personalized suggestions based on your preferences and behavior',
    icon: 'ai' as const
  },
  {
    id: '2',
    title: 'Private Concierge',
    description: 'Dedicated personal concierge available 24/7 worldwide',
    icon: 'concierge' as const
  },
  {
    id: '3',
    title: 'Bespoke Experiences',
    description: 'Fully customized luxury experiences designed exclusively for you',
    icon: 'luxury' as const
  }
])
</script>
