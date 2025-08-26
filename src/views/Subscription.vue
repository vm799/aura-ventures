<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <!-- Hero Section -->
    <section class="relative py-32 px-6 lg:px-8">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Luxury lifestyle"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-midnight-900/95 via-midnight-800/90 to-midnight-700/95"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <h1 class="text-display-lg font-serif font-bold text-white mb-6">
          Choose Your Journey
        </h1>
        <p class="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
          Select the membership tier that matches your lifestyle and unlocks the luxury experiences you deserve
        </p>

        <!-- Current Tier Display -->
        <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full px-6 py-3 mb-8">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-white font-semibold">Current: {{ currentTier }} Member</span>
        </div>
      </div>
    </section>

    <!-- Subscription Tiers -->
    <section class="pb-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Billing Toggle -->
        <div class="flex items-center justify-center mb-16">
          <div class="bg-white/10 rounded-full p-1 flex">
            <button 
              @click="billingCycle = 'monthly'"
              :class="[
                'px-6 py-2 rounded-full transition-all duration-300 font-medium',
                billingCycle === 'monthly' ? 'bg-gold-500 text-white' : 'text-white/70 hover:text-white'
              ]"
            >
              Monthly
            </button>
            <button 
              @click="billingCycle = 'annual'"
              :class="[
                'px-6 py-2 rounded-full transition-all duration-300 font-medium relative',
                billingCycle === 'annual' ? 'bg-gold-500 text-white' : 'text-white/70 hover:text-white'
              ]"
            >
              Annual
              <span class="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <!-- Tier Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div v-for="tier in subscriptionTiers" :key="tier.name" :class="[
            'relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105',
            tier.featured ? 'ring-2 ring-gold-500 shadow-2xl shadow-gold-500/20' : '',
            tier.name === currentTier ? 'bg-gradient-to-br from-gold-900/20 to-gold-800/20 border border-gold-500/50' : 'luxury-card'
          ]">
            <!-- Featured Badge -->
            <div v-if="tier.featured" class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div class="bg-gradient-to-r from-gold-500 to-gold-400 text-white px-6 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>

            <!-- Current Tier Badge -->
            <div v-if="tier.name === currentTier" class="absolute top-4 right-4 z-10">
              <div class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Current Plan
              </div>
            </div>

            <div class="p-8">
              <!-- Tier Header -->
              <div class="text-center mb-8">
                <div :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  tier.name === 'Silver' ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                  tier.name === 'Gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-br from-gold-400 to-gold-600'
                ]">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                
                <h3 class="text-2xl font-serif font-bold text-white mb-2">{{ tier.name }}</h3>
                <p class="text-white/70">{{ tier.description }}</p>
              </div>

              <!-- Pricing -->
              <div class="text-center mb-8">
                <div class="text-4xl font-bold text-white mb-2">
                  ${{ billingCycle === 'monthly' ? tier.monthlyPrice.toLocaleString() : tier.annualPrice.toLocaleString() }}
                  <span class="text-lg font-normal text-white/60">
                    /{{ billingCycle === 'monthly' ? 'month' : 'year' }}
                  </span>
                </div>
                <div v-if="billingCycle === 'annual'" class="text-green-400 text-sm">
                  Save ${{ (tier.monthlyPrice * 12 - tier.annualPrice).toLocaleString() }} annually
                </div>
              </div>

              <!-- Features -->
              <div class="space-y-4 mb-8">
                <div v-for="feature in tier.features" :key="feature" class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-white/80 text-sm">{{ feature }}</span>
                </div>
              </div>

              <!-- Experience Limits -->
              <div class="bg-white/5 rounded-lg p-4 mb-8">
                <h4 class="text-white font-semibold mb-3">Experience Access</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-white/70">Monthly Experiences</span>
                    <span class="text-white font-medium">{{ tier.monthlyExperiences === 'unlimited' ? 'Unlimited' : tier.monthlyExperiences }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/70">Concierge Hours</span>
                    <span class="text-white font-medium">{{ tier.conciergeHours === 'unlimited' ? '24/7' : tier.conciergeHours + ' hours' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/70">Advance Booking</span>
                    <span class="text-white font-medium">{{ tier.advanceBooking }} days</span>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <button 
                @click="selectTier(tier)"
                :disabled="tier.name === currentTier"
                :class="[
                  'w-full py-4 rounded-lg font-semibold transition-all duration-300',
                  tier.name === currentTier 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : tier.featured
                      ? 'btn-primary'
                      : 'btn-secondary'
                ]"
              >
                {{ tier.name === currentTier ? 'Current Plan' : tier.cta }}
              </button>

              <!-- Upgrade/Downgrade info -->
              <div v-if="tier.name !== currentTier" class="text-center mt-4">
                <p class="text-white/60 text-xs">
                  {{ isUpgrade(tier.name) ? 'Immediate access' : 'Changes at next billing cycle' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Comparison Table -->
        <div class="mt-24">
          <h2 class="text-3xl font-serif font-bold text-white mb-12 text-center">
            Detailed Feature Comparison
          </h2>
          
          <div class="luxury-card overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-white/20">
                    <th class="text-left py-4 px-6 text-white font-semibold">Features</th>
                    <th class="text-center py-4 px-6 text-white font-semibold">Silver</th>
                    <th class="text-center py-4 px-6 text-white font-semibold">Gold</th>
                    <th class="text-center py-4 px-6 text-white font-semibold">Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="comparison in featureComparison" :key="comparison.feature" class="border-b border-white/10">
                    <td class="py-4 px-6 text-white/80 font-medium">{{ comparison.feature }}</td>
                    <td class="py-4 px-6 text-center">
                      <component :is="getFeatureIcon(comparison.silver)" :class="getFeatureClass(comparison.silver)" />
                    </td>
                    <td class="py-4 px-6 text-center">
                      <component :is="getFeatureIcon(comparison.gold)" :class="getFeatureClass(comparison.gold)" />
                    </td>
                    <td class="py-4 px-6 text-center">
                      <component :is="getFeatureIcon(comparison.platinum)" :class="getFeatureClass(comparison.platinum)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-24">
          <h2 class="text-3xl font-serif font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div class="max-w-4xl mx-auto space-y-6">
            <div v-for="faq in faqs" :key="faq.question" class="luxury-card">
              <button 
                @click="toggleFaq(faq.id)"
                class="w-full text-left flex items-center justify-between p-6"
              >
                <h3 class="text-lg font-semibold text-white">{{ faq.question }}</h3>
                <svg 
                  :class="['w-5 h-5 text-gold-400 transition-transform duration-300', openFaq === faq.id ? 'rotate-180' : '']" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaq === faq.id" class="px-6 pb-6">
                <p class="text-white/70">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentTier = ref('Platinum') // This would come from user data
const billingCycle = ref<'monthly' | 'annual'>('annual')
const openFaq = ref<number | null>(null)

const subscriptionTiers = ref([
  {
    name: 'Silver',
    description: 'Perfect for occasional luxury travelers',
    monthlyPrice: 2500,
    annualPrice: 24000,
    monthlyExperiences: 2,
    conciergeHours: 5,
    advanceBooking: 30,
    featured: false,
    cta: 'Start Silver',
    features: [
      'Access to curated Silver experiences',
      'Basic concierge support (5 hours/month)',
      'Standard booking priority',
      'Mobile app access',
      'Monthly travel newsletter',
      'Basic customer support'
    ]
  },
  {
    name: 'Gold',
    description: 'For frequent luxury travelers who demand more',
    monthlyPrice: 5000,
    annualPrice: 48000,
    monthlyExperiences: 5,
    conciergeHours: 15,
    advanceBooking: 60,
    featured: true,
    cta: 'Upgrade to Gold',
    features: [
      'All Silver benefits included',
      'Access to exclusive Gold experiences',
      'Enhanced concierge (15 hours/month)',
      'Priority booking and upgrades',
      'Complimentary cancellations',
      'Quarterly luxury gift packages',
      'Access to member-only events',
      'Premium customer support'
    ]
  },
  {
    name: 'Platinum',
    description: 'Ultimate luxury for the most discerning travelers',
    monthlyPrice: 10000,
    annualPrice: 96000,
    monthlyExperiences: 'unlimited',
    conciergeHours: 'unlimited',
    advanceBooking: 120,
    featured: false,
    cta: 'Experience Platinum',
    features: [
      'All Gold benefits included',
      'Unlimited access to all experiences',
      'Dedicated personal concierge (24/7)',
      'Bespoke experience creation',
      'Guaranteed availability',
      'Complimentary companion experiences',
      'Annual luxury retreat invitation',
      'White-glove service and support',
      'AI-powered predictive recommendations'
    ]
  }
])

const featureComparison = ref([
  { feature: 'Monthly Experiences', silver: '2', gold: '5', platinum: 'Unlimited' },
  { feature: 'Concierge Support', silver: '5 hrs', gold: '15 hrs', platinum: '24/7' },
  { feature: 'Advance Booking', silver: '30 days', gold: '60 days', platinum: '120 days' },
  { feature: 'Cancellation Policy', silver: '48hrs', gold: 'Free', platinum: 'Free' },
  { feature: 'Experience Customization', silver: false, gold: 'Limited', platinum: true },
  { feature: 'AI Recommendations', silver: false, gold: 'Basic', platinum: 'Advanced' },
  { feature: 'Member Events', silver: false, gold: true, platinum: true },
  { feature: 'Luxury Gifts', silver: false, gold: 'Quarterly', platinum: 'Monthly' },
  { feature: 'Priority Support', silver: false, gold: true, platinum: true }
])

const faqs = ref([
  {
    id: 1,
    question: 'Can I change my subscription tier at any time?',
    answer: 'Yes, you can upgrade your tier immediately for instant access to enhanced benefits. Downgrades take effect at your next billing cycle to ensure you receive full value for your current subscription period.'
  },
  {
    id: 2,
    question: 'What happens to unused experiences at the end of the month?',
    answer: 'Gold and Platinum members can roll over up to 2 unused experiences to the following month. Silver tier experiences do not roll over, encouraging regular use of your benefits.'
  },
  {
    id: 3,
    question: 'Are there any additional fees for experiences?',
    answer: 'Your tier includes access to experiences within your tier level. Some ultra-premium experiences may have additional fees, which will be clearly disclosed before booking.'
  },
  {
    id: 4,
    question: 'How does the concierge service work?',
    answer: 'Your dedicated concierge team is available via phone, email, or in-app messaging. Platinum members receive 24/7 access with a dedicated personal concierge who learns your preferences over time.'
  },
  {
    id: 5,
    question: 'Is there a cancellation policy?',
    answer: 'Gold and Platinum members enjoy flexible cancellation policies. Silver members have a 48-hour cancellation window. All tiers include protection against unforeseen circumstances.'
  }
])

const isUpgrade = (tierName: string): boolean => {
  const tiers = ['Silver', 'Gold', 'Platinum']
  const currentIndex = tiers.indexOf(currentTier.value)
  const targetIndex = tiers.indexOf(tierName)
  return targetIndex > currentIndex
}

const selectTier = (tier: any) => {
  if (tier.name === currentTier.value) return
  
  // In a real app, this would handle the subscription change
  console.log('Selecting tier:', tier.name)
  
  // For demo, navigate to a checkout or confirmation page
  router.push(`/booking/subscription-${tier.name.toLowerCase()}`)
}

const toggleFaq = (id: number) => {
  openFaq.value = openFaq.value === id ? null : id
}

const getFeatureIcon = (value: any) => {
  if (value === true || value === 'Advanced' || value === 'Free' || value === '24/7' || value === 'Unlimited') {
    return 'svg' // CheckIcon
  } else if (value === false) {
    return 'svg' // XIcon  
  } else {
    return 'span' // Text value
  }
}

const getFeatureClass = (value: any) => {
  if (value === true || value === 'Advanced' || value === 'Free' || value === '24/7' || value === 'Unlimited') {
    return 'w-5 h-5 text-green-400'
  } else if (value === false) {
    return 'w-5 h-5 text-red-400'
  } else {
    return 'text-white/80 text-sm'
  }
}
</script>
