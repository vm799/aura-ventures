<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <!-- Hero Section -->
    <section class="relative py-32 px-6 lg:px-8">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Exclusive events"
          class="w-full h-full object-cover opacity-15"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-midnight-900/95 via-midnight-800/90 to-midnight-700/95"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <h1 class="text-display-lg font-serif font-bold text-white mb-6">
          Exclusive Events & Services
        </h1>
        <p class="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
          Access the world's most exclusive events and luxury services reserved for our discerning members
        </p>

        <!-- Service Categories -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            v-for="category in serviceCategories" 
            :key="category.value"
            @click="activeCategory = category.value"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2',
              activeCategory === category.value 
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon" />
            </svg>
            <span>{{ category.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Events Section -->
    <section v-if="activeCategory === 'all' || activeCategory === 'events'" class="py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Upcoming Exclusive Events
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            Limited-access events curated for our members
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div v-for="event in featuredEvents" :key="event.id" class="luxury-card group cursor-pointer hover:scale-[1.02] transition-all duration-500">
            <div class="relative overflow-hidden rounded-t-2xl">
              <img :src="event.image" :alt="event.title" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute top-4 left-4 flex flex-col space-y-2">
                <span class="bg-gradient-to-r from-gold-500 to-gold-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ event.category }}
                </span>
                <span v-if="event.spotsLeft" class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Only {{ event.spotsLeft }} spots left
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="bg-midnight-900/80 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                  {{ formatEventDate(event.date) }}
                </span>
              </div>
            </div>
            
            <div class="p-8">
              <h3 class="text-2xl font-serif font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                {{ event.title }}
              </h3>
              <p class="text-white/70 mb-4 leading-relaxed">{{ event.description }}</p>
              
              <div class="flex items-center space-x-6 text-sm text-white/60 mb-6">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ event.location }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ event.duration }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{{ event.maxGuests }} max guests</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-3xl font-bold text-gold-400">${{ event.price.toLocaleString() }}</div>
                  <div class="text-white/60 text-sm">per person</div>
                </div>
                <button class="btn-primary px-8 py-3">
                  {{ event.spotsLeft ? 'Reserve Spot' : 'Join Waitlist' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Luxury Services Grid -->
    <section v-if="activeCategory === 'all' || activeCategory !== 'events'" class="py-24 px-6 lg:px-8 bg-gradient-to-r from-midnight-800/50 to-midnight-700/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Premium Services
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            World-class services at your fingertips
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in filteredServices" :key="service.id" class="luxury-card group cursor-pointer">
            <div class="relative overflow-hidden rounded-t-2xl">
              <img :src="service.image" :alt="service.title" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-4 right-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  service.availability === 'Available' ? 'bg-green-500 text-white' :
                  service.availability === 'Limited' ? 'bg-orange-500 text-white' :
                  'bg-red-500 text-white'
                ]">
                  {{ service.availability }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  service.categoryColor
                ]">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.categoryIcon" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-serif font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">
                    {{ service.title }}
                  </h3>
                  <p class="text-white/60 text-sm">{{ service.category }}</p>
                </div>
              </div>
              
              <p class="text-white/70 text-sm mb-4 leading-relaxed">{{ service.description }}</p>
              
              <div class="space-y-2 mb-6">
                <div v-for="feature in service.features.slice(0, 3)" :key="feature" class="flex items-center space-x-2">
                  <svg class="w-3 h-3 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-white/70 text-xs">{{ feature }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xl font-bold text-gold-400">
                    {{ service.priceType === 'from' ? 'From ' : '' }}${{ service.price.toLocaleString() }}
                  </div>
                  <div class="text-white/60 text-xs">{{ service.priceUnit }}</div>
                </div>
                <button class="bg-sapphire-500 hover:bg-sapphire-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Packages -->
    <section v-if="activeCategory === 'all'" class="py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Curated Service Packages
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            Complete experiences combining multiple luxury services
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div v-for="pkg in servicePackages" :key="pkg.id" class="luxury-card">
            <div class="p-8">
              <div class="flex items-start justify-between mb-6">
                <div>
                  <h3 class="text-2xl font-serif font-bold text-white mb-2">{{ pkg.title }}</h3>
                  <p class="text-white/70">{{ pkg.description }}</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-gold-400">${{ pkg.price.toLocaleString() }}</div>
                  <div class="text-white/60 text-sm">{{ pkg.duration }}</div>
                </div>
              </div>

              <div class="space-y-4 mb-8">
                <div v-for="service in (pkg.includedServices || [])" :key="service" class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-white/80">{{ service }}</span>
                </div>
              </div>

              <div class="flex space-x-4">
                <button class="btn-primary flex-1">
                  Book Package
                </button>
                <button class="btn-secondary px-6">
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 px-6 lg:px-8 bg-gradient-to-r from-midnight-800/50 to-midnight-700/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-display-sm font-serif font-bold text-white mb-6">
            Member Experiences
          </h2>
          <p class="text-lg text-white/70 max-w-2xl mx-auto">
            What our members say about our exclusive services
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="luxury-card">
            <div class="p-6">
              <div class="flex items-center space-x-1 mb-4">
                <svg v-for="n in 5" :key="n" class="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <blockquote class="text-white/80 italic mb-6">
                "{{ testimonial.content }}"
              </blockquote>
              
              <div class="flex items-center space-x-3">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div class="text-white font-semibold">{{ testimonial.name }}</div>
                  <div class="text-white/60 text-sm">{{ testimonial.service }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-display-sm font-serif font-bold text-white mb-6">
          Ready to Experience the Extraordinary?
        </h2>
        <p class="text-xl text-white/80 mb-12">
          Our concierge team is standing by to curate the perfect experience for you
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link to="/concierge" class="btn-primary text-lg px-12 py-5">
            Speak with Concierge
          </router-link>
          <router-link to="/experiences" class="btn-secondary text-lg px-12 py-5">
            Browse All Experiences
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const serviceCategories = ref([
  { label: 'All Services', value: 'all', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { label: 'Exclusive Events', value: 'events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Private Chefs', value: 'dining', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4' },
  { label: 'Personal Services', value: 'personal', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { label: 'Transportation', value: 'transport', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
  { label: 'Entertainment', value: 'entertainment', icon: 'M7 4V2a1 1 0 011-1h3a1 1 0 011 1v2h3a1 1 0 011 1v3a1 1 0 01-1 1h-1v9a1 1 0 01-1 1H8a1 1 0 01-1-1V9H6a1 1 0 01-1-1V5a1 1 0 011-1h1z' }
])

const featuredEvents = ref([
  {
    id: 'event-1',
    title: 'Private Fashion Week Access',
    description: 'Exclusive backstage access to Paris Fashion Week with front-row seats at major shows, designer meet-and-greets, and private after-parties.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Fashion',
    date: new Date('2024-03-15'),
    location: 'Paris, France',
    duration: '1 week',
    maxGuests: 6,
    price: 25000,
    spotsLeft: 2
  },
  {
    id: 'event-2',
    title: 'Monaco Grand Prix VIP Experience',
    description: 'Ultimate Formula 1 experience with yacht hospitality, paddock access, driver meet-and-greets, and exclusive Monaco events.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    date: new Date('2024-05-26'),
    location: 'Monaco',
    duration: '4 days',
    maxGuests: 8,
    price: 35000,
    spotsLeft: null
  },
  {
    id: 'event-3',
    title: 'Art Basel Private Preview',
    description: 'Exclusive first access to Art Basel with private gallery tours, collector dinners, and meetings with renowned artists.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Art',
    date: new Date('2024-06-13'),
    location: 'Basel, Switzerland',
    duration: '3 days',
    maxGuests: 12,
    price: 15000,
    spotsLeft: 5
  },
  {
    id: 'event-4',
    title: 'Cannes Film Festival Insider',
    description: 'Red carpet premieres, exclusive after-parties, yacht receptions, and private screenings with A-list celebrities.',
    image: 'https://images.unsplash.com/photo-1489730020748-e325d2c0ea4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Film',
    date: new Date('2024-05-14'),
    location: 'Cannes, France',
    duration: '10 days',
    maxGuests: 4,
    price: 45000,
    spotsLeft: 1
  }
])

const luxuryServices = ref([
  {
    id: 'chef-1',
    title: 'Michelin Star Private Chef',
    category: 'Private Dining',
    categoryIcon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
    categoryColor: 'bg-green-500',
    description: 'World-renowned chefs create personalized culinary experiences in your preferred location.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 5000,
    priceType: 'from',
    priceUnit: 'per evening',
    availability: 'Available',
    features: [
      'Michelin-starred chef selection',
      'Custom menu creation',
      'Premium ingredient sourcing',
      'Professional service staff',
      'Wine pairing expertise'
    ],
    type: 'dining'
  },
  {
    id: 'stylist-1',
    title: 'Celebrity Stylist',
    category: 'Personal Services',
    categoryIcon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    categoryColor: 'bg-purple-500',
    description: 'A-list celebrity stylists provide complete wardrobe consultation and shopping services.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 3000,
    priceType: 'from',
    priceUnit: 'per session',
    availability: 'Limited',
    features: [
      'Red-carpet styling experience',
      'Designer wardrobe access',
      'Personal shopping service',
      'Event styling consultation',
      'Luxury brand partnerships'
    ],
    type: 'personal'
  },
  {
    id: 'jet-1',
    title: 'Private Jet Charter',
    category: 'Transportation',
    categoryIcon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    categoryColor: 'bg-blue-500',
    description: 'On-demand private jet service with luxury aircraft and personalized flight experiences.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 15000,
    priceType: 'from',
    priceUnit: 'per flight hour',
    availability: 'Available',
    features: [
      'Global fleet access',
      'Luxury cabin amenities',
      'Concierge flight planning',
      'Ground transportation',
      'Custom catering options'
    ],
    type: 'transport'
  },
  {
    id: 'artist-1',
    title: 'Private Performance',
    category: 'Entertainment',
    categoryIcon: 'M7 4V2a1 1 0 011-1h3a1 1 0 011 1v2h3a1 1 0 011 1v3a1 1 0 01-1 1h-1v9a1 1 0 01-1 1H8a1 1 0 01-1-1V9H6a1 1 0 01-1-1V5a1 1 0 011-1h1z',
    categoryColor: 'bg-pink-500',
    description: 'Book world-class musicians, performers, and entertainers for intimate private events.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 25000,
    priceType: 'from',
    priceUnit: 'per performance',
    availability: 'By Request',
    features: [
      'A-list performer booking',
      'Intimate venue arrangements',
      'Technical production',
      'Event coordination',
      'VIP meet-and-greet'
    ],
    type: 'entertainment'
  },
  {
    id: 'wellness-1',
    title: 'Wellness Concierge',
    category: 'Personal Services',
    categoryIcon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    categoryColor: 'bg-teal-500',
    description: 'Holistic wellness services including spa treatments, fitness trainers, and meditation guides.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 2000,
    priceType: 'from',
    priceUnit: 'per session',
    availability: 'Available',
    features: [
      'Luxury spa treatments',
      'Personal fitness training',
      'Meditation and mindfulness',
      'Nutritional consultation',
      'Recovery and regeneration'
    ],
    type: 'personal'
  },
  {
    id: 'security-1',
    title: 'Executive Protection',
    category: 'Personal Services',
    categoryIcon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    categoryColor: 'bg-gray-600',
    description: 'Professional security services with trained personnel for high-profile events and travel.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 1500,
    priceType: 'from',
    priceUnit: 'per day',
    availability: 'Available',
    features: [
      'Executive protection officers',
      'Risk assessment and planning',
      'Secure transportation',
      'Event security coordination',
      'Global coverage available'
    ],
    type: 'personal'
  }
])

const servicePackages = ref([
  {
    id: 'package-1',
    title: 'Complete Event Experience',
    description: 'Full-service event planning with chef, entertainment, styling, and transportation.',
    price: 75000,
    duration: '1 week',
    includedServices: [
      'Michelin Star Private Chef (3 dinners)',
      'Celebrity Stylist Consultation',
      'Private Performance Booking',
      'Luxury Transportation Package',
      'Event Coordination & Planning'
    ]
  },
  {
    id: 'package-2',
    title: 'VIP Travel Suite',
    description: 'Luxury travel package with jets, accommodations, dining, and personal services.',
    price: 125000,
    duration: '10 days',
    includedServices: [
      'Private Jet Round-trip',
      'Ultra-luxury Accommodation',
      'Daily Chef Service',
      'Personal Concierge 24/7',
      'Wellness & Spa Services',
      'Executive Protection'
    ]
  }
])

const testimonials = ref([
  {
    id: '1',
    name: 'Alexandra Chen',
    service: 'Private Chef Experience',
    content: 'The chef exceeded all expectations. Every dish was a masterpiece, and the personalized menu was absolutely perfect for our anniversary celebration.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c527644c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: '2',
    name: 'Richard Thompson',
    service: 'Fashion Week VIP',
    content: 'Unparalleled access and service. The behind-the-scenes experiences and meetings with designers made this truly once-in-a-lifetime.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: '3',
    name: 'Isabella Rodriguez',
    service: 'Complete Event Package',
    content: 'Every detail was flawlessly executed. The coordination between all services was seamless, and our guests are still talking about the evening.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  }
])

const filteredServices = computed(() => {
  if (activeCategory.value === 'all' || activeCategory.value === 'events') {
    return luxuryServices.value
  }
  return luxuryServices.value.filter(service => service.type === activeCategory.value)
})

const formatEventDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<script lang="ts">
export default {
  name: 'EventsPage',
}
</script>
