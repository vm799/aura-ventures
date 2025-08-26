<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <!-- Welcome Header -->
      <div class="mb-12">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-serif font-bold text-white mb-2">
              Welcome back, {{ user.firstName }}
            </h1>
            <p class="text-xl text-white/70">
              Your {{ user.tier }} experience awaits
            </p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-gold-400">{{ user.experiencesRemaining }}</div>
            <div class="text-white/60 text-sm">Experiences Remaining</div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-gold-400 mb-2">{{ stats.totalExperiences }}</div>
          <div class="text-white/60 text-sm">Total Experiences</div>
        </div>
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-sapphire-400 mb-2">{{ stats.countriesVisited }}</div>
          <div class="text-white/60 text-sm">Countries Visited</div>
        </div>
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-green-400 mb-2">${{ stats.totalSpent.toLocaleString() }}</div>
          <div class="text-white/60 text-sm">Lifetime Value</div>
        </div>
        <div class="luxury-card text-center">
          <div class="text-3xl font-bold text-purple-400 mb-2">{{ stats.conciergeHours }}</div>
          <div class="text-white/60 text-sm">Concierge Hours</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content Area -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Upcoming Experiences -->
          <div class="luxury-card">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-serif font-bold text-white">Upcoming Experiences</h2>
              <router-link to="/itinerary" class="text-gold-400 hover:text-gold-300 text-sm font-medium">
                View All
              </router-link>
            </div>

            <div class="space-y-4">
              <div v-for="experience in upcomingExperiences" :key="experience.id" 
                   class="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors duration-300">
                <div class="flex items-start space-x-4">
                  <img :src="experience.image" :alt="experience.title" 
                       class="w-16 h-16 rounded-lg object-cover" />
                  <div class="flex-1">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="text-lg font-semibold text-white mb-1">{{ experience.title }}</h3>
                        <p class="text-white/60 text-sm mb-2">{{ experience.location }}</p>
                        <div class="flex items-center space-x-4 text-sm text-white/50">
                          <span>{{ formatDate(experience.date) }}</span>
                          <span>{{ experience.guests }} guests</span>
                          <span class="text-gold-400">{{ experience.status }}</span>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-lg font-bold text-gold-400">${{ experience.value.toLocaleString() }}</div>
                        <button class="text-sapphire-400 hover:text-sapphire-300 text-sm mt-2">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="upcomingExperiences.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="text-lg font-semibold text-white mb-2">No Upcoming Experiences</h3>
              <p class="text-white/60 mb-4">Ready to plan your next luxury adventure?</p>
              <router-link to="/experiences" class="btn-primary">
                Browse Experiences
              </router-link>
            </div>
          </div>

          <!-- AI Recommendations -->
          <div class="luxury-card">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-2xl font-serif font-bold text-white">AI-Curated for You</h2>
                <p class="text-white/60 text-sm">Based on your preferences and travel history</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-sapphire-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span class="text-sm font-medium">94% Accuracy</span>
                </div>
                <button @click="showAIInsights = !showAIInsights" class="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors">
                  {{ showAIInsights ? 'Hide' : 'View' }} AI Insights
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <router-link v-for="rec in recommendations" :key="rec.id"
                           :to="`/experience/${rec.id}`"
                           class="group block">
                <div class="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-sapphire-500/50 transition-all duration-300">
                  <img :src="rec.image" :alt="rec.title" class="w-full h-32 object-cover" />
                  <div class="p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs px-2 py-1 bg-sapphire-500 text-white rounded-full">{{ rec.matchScore }}% Match</span>
                      <span class="text-xs text-white/60">{{ rec.tier }}</span>
                    </div>
                    <h3 class="text-white font-semibold mb-1 group-hover:text-sapphire-400 transition-colors">{{ rec.title }}</h3>
                    <p class="text-white/60 text-sm">{{ rec.location }}</p>
                    <div class="text-gold-400 font-bold mt-2">${{ rec.price.toLocaleString() }}</div>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- AI Insights Panel -->
            <div v-if="showAIInsights" class="border-t border-white/20 pt-6">
              <AIPersonalization />
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="luxury-card">
            <h2 class="text-2xl font-serif font-bold text-white mb-6">Recent Activity</h2>
            
            <div class="space-y-4">
              <div v-for="activity in recentActivities" :key="activity.id" 
                   class="flex items-center space-x-4 py-3 border-b border-white/10 last:border-b-0">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  activity.type === 'booking' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'completion' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'recommendation' ? 'bg-gold-500/20 text-gold-400' :
                  'bg-purple-500/20 text-purple-400'
                ]">
                  <component :is="getActivityIcon(activity.type)" class="w-5 h-5" />
                </div>
                <div class="flex-1">
                  <p class="text-white">{{ activity.description }}</p>
                  <p class="text-white/50 text-sm">{{ formatRelativeTime(activity.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Quick Actions -->
          <div class="luxury-card">
            <h3 class="text-xl font-serif font-semibold text-white mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <router-link to="/concierge" 
                           class="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <svg class="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span class="text-white">Contact Concierge</span>
              </router-link>
              
              <router-link to="/experiences" 
                           class="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <svg class="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="text-white">Browse Experiences</span>
              </router-link>
              
              <router-link to="/profile" 
                           class="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <svg class="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-white">Account Settings</span>
              </router-link>
            </div>
          </div>

          <!-- Membership Status -->
          <div class="luxury-card">
            <h3 class="text-xl font-serif font-semibold text-white mb-4">Membership Status</h3>
            
            <div class="text-center mb-4">
              <div :class="[
                'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3',
                user.tier === 'Platinum' ? 'bg-gradient-to-br from-gold-400 to-gold-600' :
                user.tier === 'Gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                'bg-gradient-to-br from-gray-400 to-gray-600'
              ]">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white">{{ user.tier }} Member</h4>
              <p class="text-white/60 text-sm">Since {{ user.memberSince }}</p>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-white/60">Renewal Date</span>
                <span class="text-white">{{ user.renewalDate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/60">Monthly Limit</span>
                <span class="text-white">{{ user.monthlyLimit === 'unlimited' ? 'Unlimited' : user.monthlyLimit }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-white/60">Used This Month</span>
                <span class="text-white">{{ user.usedThisMonth }}</span>
              </div>
            </div>

            <div class="mt-4">
              <router-link to="/subscription" class="btn-secondary w-full text-center">
                Manage Subscription
              </router-link>
            </div>
          </div>

          <!-- Concierge Contact -->
          <div class="luxury-card">
            <h3 class="text-xl font-serif font-semibold text-white mb-4">Your Concierge</h3>
            
            <div class="flex items-center space-x-3 mb-4">
              <img src="https://images.unsplash.com/photo-1494790108755-2616c527644c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                   alt="Concierge" class="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 class="text-white font-semibold">{{ user.concierge.name }}</h4>
                <p class="text-white/60 text-sm">{{ user.concierge.title }}</p>
              </div>
            </div>

            <p class="text-white/70 text-sm mb-4">
              "{{ user.concierge.message }}"
            </p>

            <div class="space-y-2">
              <button class="w-full btn-primary py-2">
                Message {{ user.concierge.name }}
              </button>
              <p class="text-white/50 text-xs text-center">
                Available {{ user.concierge.availability }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import AIPersonalization from '@/components/AIPersonalization.vue'

const showAIInsights = ref(false)

// Mock user data
const user = ref({
  firstName: 'Vaishali',
  tier: 'Platinum',
  experiencesRemaining: 'Unlimited',
  memberSince: 'March 2023',
  renewalDate: 'March 15, 2025',
  monthlyLimit: 'unlimited',
  usedThisMonth: 3,
  concierge: {
    name: 'Isabella Chen',
    title: 'Senior Concierge',
    message: 'I\'m here to make your luxury travel dreams a reality. How may I assist you today?',
    availability: '24/7'
  }
})

const stats = ref({
  totalExperiences: 47,
  countriesVisited: 23,
  totalSpent: 485000,
  conciergeHours: 127
})

const upcomingExperiences = ref([
  {
    id: 'upcoming-1',
    title: 'Private Michelin Chef Experience',
    location: 'Tuscany, Italy',
    date: new Date('2024-02-15'),
    guests: 4,
    status: 'Confirmed',
    value: 45000,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'upcoming-2',
    title: 'Arctic Aurora Private Jet',
    location: 'Northern Norway',
    date: new Date('2024-03-08'),
    guests: 2,
    status: 'Pending Confirmation',
    value: 65000,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  }
])

const recommendations = ref([
  {
    id: '7',
    title: 'Safari & Vineyard Pairing',
    location: 'South Africa',
    price: 35000,
    tier: 'Platinum',
    matchScore: 95,
    image: 'https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '8',
    title: 'Private Island Retreat',
    location: 'Maldives',
    price: 55000,
    tier: 'Platinum',
    matchScore: 89,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
])

const recentActivities = ref([
  {
    id: 'activity-1',
    type: 'booking',
    description: 'Confirmed booking for Private Michelin Chef Experience',
    timestamp: new Date('2024-01-10T14:30:00')
  },
  {
    id: 'activity-2',
    type: 'completion',
    description: 'Completed Helicopter Wine Tour Napa Valley',
    timestamp: new Date('2024-01-08T18:00:00')
  },
  {
    id: 'activity-3',
    type: 'recommendation',
    description: 'New AI recommendations based on your preferences',
    timestamp: new Date('2024-01-07T09:15:00')
  },
  {
    id: 'activity-4',
    type: 'upgrade',
    description: 'Membership upgraded to Platinum tier',
    timestamp: new Date('2024-01-05T16:20:00')
  }
])

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const getActivityIcon = (type: string) => {
  const icons = {
    booking: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' })
    ]),
    completion: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 13l4 4L19 7' })
    ]),
    recommendation: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' })
    ]),
    upgrade: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ])
  }
  
  return icons[type] || icons.booking
}
</script>
