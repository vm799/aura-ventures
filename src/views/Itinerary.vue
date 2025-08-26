<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="flex items-center justify-between mb-12">
        <div>
          <h1 class="text-4xl font-serif font-bold text-white mb-2">My Itinerary</h1>
          <p class="text-xl text-white/70">Manage your luxury travel experiences</p>
        </div>
        <div class="flex items-center space-x-4">
          <button 
            @click="exportItinerary"
            class="btn-secondary px-6 py-3 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m6 5a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 012-2h1l10 0h1a2 2 0 012 2z" />
            </svg>
            <span>Export</span>
          </button>
          <router-link to="/experiences" class="btn-primary px-6 py-3">
            Book New Experience
          </router-link>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300',
            activeFilter === filter.value 
              ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' 
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          ]"
        >
          {{ filter.label }}
          <span class="ml-2 text-sm opacity-75">({{ filter.count }})</span>
        </button>
      </div>

      <!-- Calendar View Toggle -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <button 
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === 'list' ? 'bg-gold-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button 
              @click="viewMode = 'calendar'"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === 'calendar' ? 'bg-gold-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <span class="text-white/60">{{ viewMode === 'list' ? 'List View' : 'Calendar View' }}</span>
        </div>

        <div class="flex items-center space-x-4">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search experiences..."
            class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <!-- List View -->
      <div v-if="viewMode === 'list'" class="space-y-8">
        <div v-for="group in groupedExperiences" :key="group.title" class="luxury-card">
          <h2 class="text-2xl font-serif font-bold text-white mb-6 flex items-center">
            <span>{{ group.title }}</span>
            <span class="ml-3 text-lg text-white/60">({{ group.experiences.length }})</span>
          </h2>
          
          <div class="space-y-4">
            <div v-for="experience in group.experiences" :key="experience.id" 
                 class="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              
              <div class="flex items-start space-x-6">
                <!-- Experience Image -->
                <div class="relative">
                  <img :src="experience.image" :alt="experience.title" 
                       class="w-24 h-24 rounded-lg object-cover" />
                  <div class="absolute -top-2 -right-2">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusBadgeClass(experience.status)
                    ]">
                      {{ experience.status }}
                    </span>
                  </div>
                </div>

                <!-- Experience Details -->
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-xl font-serif font-semibold text-white mb-2">{{ experience.title }}</h3>
                      <p class="text-white/70 mb-3">{{ experience.location }}</p>
                      
                      <div class="flex items-center space-x-6 text-sm text-white/60 mb-4">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{{ formatDate(experience.date) }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{{ experience.duration }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{{ experience.guests }} guests</span>
                        </div>
                      </div>

                      <!-- Experience Description -->
                      <p class="text-white/60 text-sm leading-relaxed mb-4">
                        {{ experience.description }}
                      </p>

                      <!-- Special Notes -->
                      <div v-if="experience.notes" class="bg-gold-500/10 border border-gold-500/30 rounded-lg p-3 mb-4">
                        <div class="flex items-start space-x-2">
                          <svg class="w-4 h-4 text-gold-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <div>
                            <p class="text-gold-400 text-sm font-medium">Special Notes</p>
                            <p class="text-white/80 text-sm">{{ experience.notes }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons & Price -->
                    <div class="text-right space-y-3">
                      <div class="text-2xl font-bold text-gold-400 mb-2">
                        ${{ experience.price.toLocaleString() }}
                      </div>
                      
                      <div class="flex flex-col space-y-2">
                        <button 
                          v-if="experience.status === 'upcoming' || experience.status === 'confirmed'"
                          @click="viewDetails(experience)"
                          class="bg-sapphire-500 hover:bg-sapphire-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                        
                        <button 
                          v-if="experience.status === 'upcoming'"
                          @click="modifyBooking(experience)"
                          class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Modify
                        </button>
                        
                        <button 
                          v-if="experience.status === 'completed'"
                          @click="rebookExperience(experience)"
                          class="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Book Again
                        </button>
                        
                        <button 
                          v-if="experience.status === 'completed'"
                          @click="leaveReview(experience)"
                          class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Leave Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Progress Timeline for Upcoming Experiences -->
              <div v-if="experience.status === 'upcoming' && experience.timeline" class="mt-6 pt-6 border-t border-white/10">
                <h4 class="text-white font-semibold mb-4">Experience Timeline</h4>
                <div class="space-y-3">
                  <div v-for="(step, index) in experience.timeline" :key="index" class="flex items-center space-x-3">
                    <div :class="[
                      'w-3 h-3 rounded-full',
                      step.completed ? 'bg-green-500' : step.current ? 'bg-gold-500' : 'bg-white/30'
                    ]"></div>
                    <div class="flex-1">
                      <div :class="[
                        'text-sm',
                        step.completed ? 'text-green-400' : step.current ? 'text-gold-400' : 'text-white/60'
                      ]">
                        {{ step.title }}
                      </div>
                      <div class="text-xs text-white/50">{{ step.description }}</div>
                    </div>
                    <div class="text-xs text-white/40">{{ step.date }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div v-else class="luxury-card">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-serif font-bold text-white">
              {{ currentMonth }} {{ currentYear }}
            </h2>
            <div class="flex items-center space-x-2">
              <button @click="previousMonth" class="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button @click="nextMonth" class="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1">
            <!-- Day Headers -->
            <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
                 :key="day" 
                 class="p-3 text-center text-white/60 font-medium">
              {{ day }}
            </div>
            
            <!-- Calendar Days -->
            <div v-for="date in calendarDays" :key="`${date.month}-${date.day}`" 
                 :class="[
                   'p-2 min-h-[80px] border border-white/10 hover:border-white/20 transition-colors',
                   date.isCurrentMonth ? 'bg-white/5' : 'bg-white/1',
                   date.isToday ? 'bg-gold-500/20' : ''
                 ]">
              <div :class="[
                'text-sm mb-1',
                date.isCurrentMonth ? 'text-white' : 'text-white/30',
                date.isToday ? 'font-bold text-gold-400' : ''
              ]">
                {{ date.day }}
              </div>
              
              <div v-for="experience in date.experiences" :key="experience.id" 
                   class="bg-gold-500 text-white text-xs p-1 rounded mb-1 cursor-pointer hover:bg-gold-600 transition-colors"
                   @click="viewDetails(experience)">
                {{ experience.title.substring(0, 20) }}...
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-green-400 mb-2">{{ stats.completed }}</div>
          <div class="text-white/60 text-sm">Completed Experiences</div>
        </div>
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-gold-400 mb-2">{{ stats.upcoming }}</div>
          <div class="text-white/60 text-sm">Upcoming Experiences</div>
        </div>
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-sapphire-400 mb-2">{{ stats.countries }}</div>
          <div class="text-white/60 text-sm">Countries Visited</div>
        </div>
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-purple-400 mb-2">${{ stats.totalValue.toLocaleString() }}</div>
          <div class="text-white/60 text-sm">Total Experience Value</div>
        </div>
      </div>
    </div>

    <!-- Experience Detail Modal -->
    <div v-if="selectedExperience" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="closeModal">
      <div class="luxury-card max-w-2xl w-full max-h-[80vh] overflow-y-auto" @click.stop>
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-2xl font-serif font-bold text-white">{{ selectedExperience.title }}</h3>
            <button @click="closeModal" class="text-white/60 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <img :src="selectedExperience.image" :alt="selectedExperience.title" 
               class="w-full h-64 object-cover rounded-lg mb-4" />
          
          <div class="space-y-4">
            <p class="text-white/80">{{ selectedExperience.description }}</p>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-white/60">Date:</span>
                <span class="text-white ml-2">{{ formatDate(selectedExperience.date) }}</span>
              </div>
              <div>
                <span class="text-white/60">Duration:</span>
                <span class="text-white ml-2">{{ selectedExperience.duration }}</span>
              </div>
              <div>
                <span class="text-white/60">Guests:</span>
                <span class="text-white ml-2">{{ selectedExperience.guests }}</span>
              </div>
              <div>
                <span class="text-white/60">Status:</span>
                <span :class="[
                  'ml-2 px-2 py-1 rounded text-xs',
                  getStatusBadgeClass(selectedExperience.status)
                ]">
                  {{ selectedExperience.status }}
                </span>
              </div>
            </div>

            <div v-if="selectedExperience.confirmationNumber" class="bg-white/5 rounded-lg p-4">
              <h4 class="text-white font-semibold mb-2">Booking Information</h4>
              <div class="text-sm space-y-1">
                <div class="flex justify-between">
                  <span class="text-white/60">Confirmation #:</span>
                  <span class="text-white font-mono">{{ selectedExperience.confirmationNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-white/60">Booked Date:</span>
                  <span class="text-white">{{ formatDate(selectedExperience.bookedDate) }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex space-x-4 pt-4">
              <router-link :to="`/concierge`" class="btn-primary flex-1 text-center">
                Contact Concierge
              </router-link>
              <button 
                v-if="selectedExperience.status === 'upcoming'"
                @click="modifyBooking(selectedExperience)"
                class="btn-secondary flex-1"
              >
                Modify Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const activeFilter = ref('all')
const viewMode = ref<'list' | 'calendar'>('list')
const searchQuery = ref('')
const selectedExperience = ref<any>(null)
const currentDate = ref(new Date())

const filters = ref([
  { label: 'All Experiences', value: 'all', count: 12 },
  { label: 'Upcoming', value: 'upcoming', count: 3 },
  { label: 'Confirmed', value: 'confirmed', count: 2 },
  { label: 'Completed', value: 'completed', count: 7 },
  { label: 'Cancelled', value: 'cancelled', count: 0 }
])

const experiences = ref([
  {
    id: 'exp-1',
    title: 'Private Michelin Chef Experience',
    location: 'Tuscany, Italy',
    date: new Date('2024-02-15'),
    bookedDate: new Date('2024-01-10'),
    duration: '7 days',
    guests: 4,
    price: 45000,
    status: 'upcoming',
    confirmationNumber: 'AV12345678',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'A week-long culinary journey with a Michelin three-star chef in a private Tuscan villa.',
    notes: 'Vegetarian meal options requested for 2 guests. Airport transfer arranged.',
    timeline: [
      { title: 'Booking Confirmed', description: 'Payment processed and reservation secured', date: 'Jan 10', completed: true, current: false },
      { title: 'Travel Documents', description: 'Passport verification and travel arrangements', date: 'Jan 25', completed: true, current: false },
      { title: 'Pre-Experience Briefing', description: 'Call with chef and final menu planning', date: 'Feb 10', completed: false, current: true },
      { title: 'Experience Begins', description: 'Arrival in Tuscany and villa welcome', date: 'Feb 15', completed: false, current: false }
    ]
  },
  {
    id: 'exp-2',
    title: 'Arctic Aurora Private Jet',
    location: 'Northern Norway',
    date: new Date('2024-03-08'),
    bookedDate: new Date('2024-01-15'),
    duration: '3 days',
    guests: 2,
    price: 65000,
    status: 'confirmed',
    confirmationNumber: 'AV12345679',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Chase the Northern Lights aboard a private jet with luxury accommodation.',
    notes: 'Cold weather gear provided. Special photography equipment arranged.',
    timeline: [
      { title: 'Booking Confirmed', description: 'Initial reservation and payment', date: 'Jan 15', completed: true, current: false },
      { title: 'Weather Monitoring', description: 'Aurora forecast and optimal timing', date: 'Feb 20', completed: false, current: true },
      { title: 'Final Preparations', description: 'Jet preparation and crew briefing', date: 'Mar 5', completed: false, current: false },
      { title: 'Departure', description: 'Private jet departure for Norway', date: 'Mar 8', completed: false, current: false }
    ]
  },
  {
    id: 'exp-3',
    title: 'Helicopter Wine Tour Napa',
    location: 'Napa Valley, California',
    date: new Date('2023-12-05'),
    bookedDate: new Date('2023-11-10'),
    duration: '8 hours',
    guests: 2,
    price: 15000,
    status: 'completed',
    confirmationNumber: 'AV12345677',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Private helicopter tour with exclusive vineyard tastings and Michelin dining.',
    notes: 'Weather was perfect. Pilot provided excellent commentary on wine regions.'
  },
  {
    id: 'exp-4',
    title: 'Private Opera Box Vienna',
    location: 'Vienna, Austria',
    date: new Date('2023-11-20'),
    bookedDate: new Date('2023-10-15'),
    duration: '1 evening',
    guests: 6,
    price: 8500,
    status: 'completed',
    confirmationNumber: 'AV12345676',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Exclusive box seats with backstage access and private dinner.',
    notes: 'Met the principal performers. Unforgettable experience!'
  },
  {
    id: 'exp-5',
    title: 'Private Yacht Mediterranean',
    location: 'French Riviera',
    date: new Date('2023-09-10'),
    bookedDate: new Date('2023-07-15'),
    duration: '10 days',
    guests: 8,
    price: 120000,
    status: 'completed',
    confirmationNumber: 'AV12345675',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da4821b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Luxury yacht charter exploring the Mediterranean coastline.',
    notes: 'Perfect weather throughout. Crew was exceptional.'
  }
])

const filteredExperiences = computed(() => {
  let filtered = experiences.value

  // Filter by status
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(exp => exp.status === activeFilter.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(exp => 
      exp.title.toLowerCase().includes(query) ||
      exp.location.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

const groupedExperiences = computed(() => {
  const groups = [
    { title: 'Upcoming Experiences', experiences: [] as any[] },
    { title: 'Confirmed Experiences', experiences: [] as any[] },
    { title: 'Completed Experiences', experiences: [] as any[] }
  ]

  filteredExperiences.value.forEach(exp => {
    if (exp.status === 'upcoming') {
      groups[0].experiences.push(exp)
    } else if (exp.status === 'confirmed') {
      groups[1].experiences.push(exp)
    } else if (exp.status === 'completed') {
      groups[2].experiences.push(exp)
    }
  })

  // Sort experiences by date within each group
  groups.forEach(group => {
    group.experiences.sort((a, b) => {
      if (group.title.includes('Upcoming') || group.title.includes('Confirmed')) {
        return a.date.getTime() - b.date.getTime() // Ascending for future
      } else {
        return b.date.getTime() - a.date.getTime() // Descending for past
      }
    })
  })

  return groups.filter(group => group.experiences.length > 0)
})

const stats = computed(() => {
  const completed = experiences.value.filter(exp => exp.status === 'completed').length
  const upcoming = experiences.value.filter(exp => exp.status === 'upcoming' || exp.status === 'confirmed').length
  const countries = new Set(experiences.value.map(exp => exp.location.split(',').pop()?.trim())).size
  const totalValue = experiences.value.reduce((sum, exp) => sum + exp.price, 0)

  return { completed, upcoming, countries, totalValue }
})

const currentMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long' })
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const currentDay = new Date(startDate)
  
  for (let i = 0; i < 42; i++) {
    const dayExperiences = experiences.value.filter(exp => {
      const expDate = new Date(exp.date)
      return expDate.toDateString() === currentDay.toDateString()
    })
    
    days.push({
      day: currentDay.getDate(),
      month: currentDay.getMonth(),
      year: currentDay.getFullYear(),
      isCurrentMonth: currentDay.getMonth() === month,
      isToday: currentDay.toDateString() === new Date().toDateString(),
      experiences: dayExperiences
    })
    
    currentDay.setDate(currentDay.getDate() + 1)
  }
  
  return days
})

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-500 text-white'
    case 'confirmed':
      return 'bg-green-500 text-white'
    case 'completed':
      return 'bg-gray-500 text-white'
    case 'cancelled':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const viewDetails = (experience: any) => {
  selectedExperience.value = experience
}

const closeModal = () => {
  selectedExperience.value = null
}

const modifyBooking = (experience: any) => {
  console.log('Modify booking for:', experience.title)
  // In a real app, this would open a modification modal or navigate to edit page
}

const rebookExperience = (experience: any) => {
  console.log('Rebook experience:', experience.title)
  // In a real app, this would navigate to booking page with pre-filled data
}

const leaveReview = (experience: any) => {
  console.log('Leave review for:', experience.title)
  // In a real app, this would open a review modal
}

const exportItinerary = () => {
  console.log('Export itinerary')
  // In a real app, this would generate and download a PDF or calendar file
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

onMounted(() => {
  // Initialize any calendar-specific logic
})
</script>
