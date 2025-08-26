<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <div class="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      <!-- Progress Bar -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-serif font-bold text-white">Complete Your Booking</h1>
          <div class="text-white/60">Step {{ currentStep }} of 4</div>
        </div>
        
        <div class="w-full bg-white/20 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-gold-500 to-gold-400 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${(currentStep / 4) * 100}%` }"
          ></div>
        </div>
        
        <div class="flex justify-between mt-2 text-sm">
          <span :class="currentStep >= 1 ? 'text-gold-400' : 'text-white/40'">Details</span>
          <span :class="currentStep >= 2 ? 'text-gold-400' : 'text-white/40'">Guests</span>
          <span :class="currentStep >= 3 ? 'text-gold-400' : 'text-white/40'">Payment</span>
          <span :class="currentStep >= 4 ? 'text-gold-400' : 'text-white/40'">Confirmation</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Booking Form -->
        <div class="lg:col-span-2">
          <div class="luxury-card">
            <!-- Step 1: Experience Details -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Experience Details</h2>
              
              <div v-if="experience" class="bg-white/5 rounded-lg p-6 mb-6">
                <div class="flex items-start space-x-4">
                  <img :src="experience.image" :alt="experience.title" 
                       class="w-24 h-24 rounded-lg object-cover" />
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold text-white mb-2">{{ experience.title }}</h3>
                    <p class="text-white/70 mb-2">{{ experience.location }}</p>
                    <div class="flex items-center space-x-4 text-sm text-white/60">
                      <span>{{ experience.duration }}</span>
                      <span>{{ experience.tier }} Experience</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gold-400">
                      ${{ experience.price.toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-white font-medium mb-2">Preferred Date *</label>
                  <input 
                    v-model="bookingData.date" 
                    type="date" 
                    :min="minDate"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-white font-medium mb-2">Alternative Date</label>
                  <input 
                    v-model="bookingData.alternativeDate" 
                    type="date" 
                    :min="minDate"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label class="block text-white font-medium mb-2">Number of Guests *</label>
                  <select 
                    v-model="bookingData.guests" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                    required
                  >
                    <option value="">Select guests</option>
                    <option v-for="n in 12" :key="n" :value="n">{{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-white font-medium mb-2">Preferred Time</label>
                  <select 
                    v-model="bookingData.time" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="">Any time</option>
                    <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                    <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-white font-medium mb-2">Special Requests</label>
                <textarea 
                  v-model="bookingData.specialRequests" 
                  rows="4" 
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                  placeholder="Dietary restrictions, accessibility needs, special occasions, or any other requests..."
                ></textarea>
              </div>
            </div>

            <!-- Step 2: Guest Information -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Guest Information</h2>
              
              <div class="space-y-6">
                <div v-for="(guest, index) in bookingData.guestDetails" :key="index" 
                     class="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 class="text-lg font-semibold text-white mb-4">
                    {{ index === 0 ? 'Primary Guest (You)' : `Guest ${index + 1}` }}
                  </h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-white/70 text-sm mb-1">First Name *</label>
                      <input 
                        v-model="guest.firstName" 
                        type="text" 
                        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label class="block text-white/70 text-sm mb-1">Last Name *</label>
                      <input 
                        v-model="guest.lastName" 
                        type="text" 
                        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label class="block text-white/70 text-sm mb-1">Email *</label>
                      <input 
                        v-model="guest.email" 
                        type="email" 
                        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label class="block text-white/70 text-sm mb-1">Phone</label>
                      <input 
                        v-model="guest.phone" 
                        type="tel" 
                        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div v-if="requiresPassport">
                      <label class="block text-white/70 text-sm mb-1">Passport Number</label>
                      <input 
                        v-model="guest.passport" 
                        type="text" 
                        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                    <div>
                      <label class="block text-white/70 text-sm mb-1">Dietary Restrictions</label>
                      <input 
                        v-model="guest.dietary" 
                        type="text" 
                        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="None, Vegetarian, Allergies, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Payment Information -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Payment Information</h2>
              
              <!-- Payment Method Selection -->
              <div class="mb-6">
                <label class="block text-white font-medium mb-4">Payment Method</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    @click="bookingData.paymentMethod = method.id"
                    :class="[
                      'p-4 rounded-lg border-2 cursor-pointer transition-all duration-300',
                      bookingData.paymentMethod === method.id 
                        ? 'border-gold-500 bg-gold-500/10' 
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    ]"
                  >
                    <div class="flex items-center space-x-3">
                      <div :class="[
                        'w-4 h-4 rounded-full border-2',
                        bookingData.paymentMethod === method.id 
                          ? 'border-gold-500 bg-gold-500' 
                          : 'border-white/40'
                      ]"></div>
                      <div>
                        <div class="text-white font-medium">{{ method.name }}</div>
                        <div class="text-white/60 text-sm">{{ method.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Credit Card Form -->
              <div v-if="bookingData.paymentMethod === 'card'" class="space-y-4">
                <div>
                  <label class="block text-white font-medium mb-2">Card Number *</label>
                  <input 
                    v-model="bookingData.cardNumber" 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    required
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-white font-medium mb-2">Expiry Date *</label>
                    <input 
                      v-model="bookingData.expiryDate" 
                      type="text" 
                      placeholder="MM/YY"
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white font-medium mb-2">CVV *</label>
                    <input 
                      v-model="bookingData.cvv" 
                      type="text" 
                      placeholder="123"
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-white font-medium mb-2">Cardholder Name *</label>
                  <input 
                    v-model="bookingData.cardholderName" 
                    type="text" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    required
                  />
                </div>
              </div>

              <!-- Billing Address -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-white">Billing Address</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-white/70 text-sm mb-1">Address Line 1 *</label>
                    <input 
                      v-model="bookingData.billingAddress.line1" 
                      type="text" 
                      class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white/70 text-sm mb-1">City *</label>
                    <input 
                      v-model="bookingData.billingAddress.city" 
                      type="text" 
                      class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white/70 text-sm mb-1">Postal Code *</label>
                    <input 
                      v-model="bookingData.billingAddress.postalCode" 
                      type="text" 
                      class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-white/70 text-sm mb-1">Country *</label>
                    <select 
                      v-model="bookingData.billingAddress.country" 
                      class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Confirmation -->
            <div v-if="currentStep === 4" class="text-center space-y-6">
              <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 class="text-3xl font-serif font-bold text-white">Booking Confirmed!</h2>
              <p class="text-xl text-white/80">Your luxury experience has been successfully reserved.</p>
              
              <div class="bg-white/10 rounded-lg p-6 text-left max-w-md mx-auto">
                <h3 class="text-lg font-semibold text-white mb-4">Booking Details</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-white/70">Confirmation #</span>
                    <span class="text-white font-mono">{{ confirmationNumber }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/70">Date</span>
                    <span class="text-white">{{ formatDate(bookingData.date) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/70">Guests</span>
                    <span class="text-white">{{ bookingData.guests }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/70">Total Paid</span>
                    <span class="text-white font-semibold">${{ totalAmount.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <p class="text-white/70">
                  A confirmation email has been sent to your registered email address. 
                  Your concierge will contact you within 24 hours to finalize the details.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <router-link to="/itinerary" class="btn-primary">
                    View Itinerary
                  </router-link>
                  <router-link to="/dashboard" class="btn-secondary">
                    Back to Dashboard
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="luxury-card sticky top-8">
            <h3 class="text-xl font-serif font-semibold text-white mb-6">Booking Summary</h3>
            
            <div v-if="experience" class="space-y-4">
              <div class="flex items-start space-x-3">
                <img :src="experience.image" :alt="experience.title" 
                     class="w-16 h-16 rounded-lg object-cover" />
                <div class="flex-1">
                  <h4 class="text-white font-semibold">{{ experience.title }}</h4>
                  <p class="text-white/60 text-sm">{{ experience.location }}</p>
                </div>
              </div>

              <div class="border-t border-white/20 pt-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-white/70">Base Price</span>
                  <span class="text-white">${{ experience.price.toLocaleString() }}</span>
                </div>
                
                <div v-if="bookingData.guests > 1" class="flex justify-between">
                  <span class="text-white/70">Additional Guests ({{ bookingData.guests - 1 }})</span>
                  <span class="text-white">${{ additionalGuestFee.toLocaleString() }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-white/70">Service Fee</span>
                  <span class="text-white">${{ serviceFee.toLocaleString() }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-white/70">Taxes</span>
                  <span class="text-white">${{ taxes.toLocaleString() }}</span>
                </div>
                
                <div class="border-t border-white/20 pt-2 flex justify-between font-semibold">
                  <span class="text-white">Total</span>
                  <span class="text-gold-400 text-lg">${{ totalAmount.toLocaleString() }}</span>
                </div>
              </div>

              <div v-if="currentStep < 4" class="pt-4 border-t border-white/20 text-xs text-white/60">
                <p>• Secure payment processing</p>
                <p>• Full refund if cancelled 48h+ in advance</p>
                <p>• 24/7 concierge support included</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div v-if="currentStep < 4" class="flex justify-between mt-12">
        <button 
          v-if="currentStep > 1"
          @click="previousStep"
          class="btn-secondary px-8 py-3"
        >
          Previous
        </button>
        <div v-else></div>
        
        <button 
          @click="nextStep"
          :disabled="!canProceed"
          class="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ currentStep === 3 ? 'Complete Booking' : 'Continue' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useExperiences } from '@/composables/useExperiences'

const route = useRoute()
const { getExperienceById } = useExperiences()

const experience = ref(getExperienceById(route.params.experienceId as string))
const currentStep = ref(1)
const confirmationNumber = ref('')

const bookingData = ref({
  date: route.query.date as string || '',
  alternativeDate: '',
  guests: parseInt(route.query.guests as string) || '',
  time: '',
  specialRequests: route.query.notes as string || '',
  guestDetails: [] as any[],
  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  billingAddress: {
    line1: '',
    city: '',
    postalCode: '',
    country: ''
  }
})

const paymentMethods = ref([
  {
    id: 'card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, Amex'
  },
  {
    id: 'wire',
    name: 'Wire Transfer',
    description: 'Bank transfer'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'Bitcoin, Ethereum'
  }
])

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const requiresPassport = computed(() => {
  return experience.value?.category === 'Transport' || 
         experience.value?.location.includes('International')
})

const additionalGuestFee = computed(() => {
  if (!experience.value || !bookingData.value.guests) return 0
  const additionalGuests = Math.max(0, bookingData.value.guests - 1)
  return additionalGuests * Math.floor(experience.value.price * 0.1)
})

const serviceFee = computed(() => {
  if (!experience.value) return 0
  return Math.floor(experience.value.price * 0.05)
})

const taxes = computed(() => {
  if (!experience.value) return 0
  const subtotal = experience.value.price + additionalGuestFee.value + serviceFee.value
  return Math.floor(subtotal * 0.08)
})

const totalAmount = computed(() => {
  if (!experience.value) return 0
  return experience.value.price + additionalGuestFee.value + serviceFee.value + taxes.value
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return bookingData.value.date && bookingData.value.guests
    case 2:
      return bookingData.value.guestDetails.every(guest => 
        guest.firstName && guest.lastName && guest.email
      )
    case 3:
      return bookingData.value.paymentMethod && 
             bookingData.value.billingAddress.line1 &&
             bookingData.value.billingAddress.city &&
             bookingData.value.billingAddress.country
    default:
      return true
  }
})

const initializeGuestDetails = () => {
  const guestCount = bookingData.value.guests || 1
  bookingData.value.guestDetails = Array.from({ length: guestCount }, (_, index) => ({
    firstName: index === 0 ? 'Vaishali' : '',
    lastName: index === 0 ? 'Gor' : '',
    email: index === 0 ? 'vaishali@example.com' : '',
    phone: '',
    passport: '',
    dietary: ''
  }))
}

const nextStep = () => {
  if (!canProceed.value) return
  
  if (currentStep.value === 1) {
    initializeGuestDetails()
  }
  
  if (currentStep.value === 3) {
    // Process payment
    processPayment()
  } else {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const processPayment = () => {
  // Simulate payment processing
  confirmationNumber.value = 'AV' + Date.now().toString().slice(-8)
  currentStep.value = 4
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

onMounted(() => {
  if (!experience.value) {
    // Redirect to experiences page if experience not found
    window.location.href = '/experiences'
  }
})
</script>
