<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <div class="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-serif font-bold text-white mb-2">Personal Concierge</h1>
        <p class="text-xl text-white/70">Your dedicated luxury travel assistant</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Chat Interface -->
        <div class="lg:col-span-3">
          <div class="luxury-card h-[700px] flex flex-col">
            <!-- Chat Header -->
            <div class="flex items-center justify-between p-6 border-b border-white/20">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img 
                    :src="activeConcierge.avatar" 
                    :alt="activeConcierge.name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-midnight-800"></div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white">{{ activeConcierge.name }}</h3>
                  <p class="text-white/60 text-sm">{{ activeConcierge.title }} • Online</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <button class="text-white/60 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button class="text-white/60 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button class="text-white/60 hover:text-white transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Messages Area -->
            <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="messagesContainer">
              <div v-for="message in messages" :key="message.id" 
                   :class="[
                     'flex',
                     message.sender === 'user' ? 'justify-end' : 'justify-start'
                   ]">
                <div :class="[
                  'max-w-xs lg:max-w-md px-4 py-3 rounded-2xl',
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white ml-auto' 
                    : 'bg-white/10 text-white border border-white/20'
                ]">
                  <div v-if="message.type === 'text'">
                    <p class="text-sm">{{ message.content }}</p>
                    <div :class="[
                      'text-xs mt-2 opacity-70',
                      message.sender === 'user' ? 'text-white' : 'text-white/60'
                    ]">
                      {{ formatTime(message.timestamp) }}
                    </div>
                  </div>
                  
                  <div v-else-if="message.type === 'experience' && message.experience" class="space-y-3">
                    <p class="text-sm">{{ message.content }}</p>
                    <div class="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div class="flex items-center space-x-3">
                        <SafeImage :src="message.experience.image" :alt="message.experience.title" 
                             class="w-12 h-12 rounded-lg object-cover" 
                             :fallback="fallbackImage" />
                        <div class="flex-1">
                          <h4 class="text-white font-semibold text-sm">{{ message.experience.title }}</h4>
                          <p class="text-white/60 text-xs">{{ message.experience.location }}</p>
                          <p class="text-gold-400 font-bold text-sm">${{ message.experience.price.toLocaleString() }}</p>
                        </div>
                      </div>
                      <button class="w-full mt-3 bg-gold-500 hover:bg-gold-600 text-white text-xs py-2 rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                    <div class="text-xs opacity-70 text-white/60">
                      {{ formatTime(message.timestamp) }}
                    </div>
                  </div>

                  <div v-else-if="message.type === 'quick-actions'" class="space-y-3">
                    <p class="text-sm">{{ message.content }}</p>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        v-for="action in message.actions" 
                        :key="action"
                        @click="sendQuickReply(action)"
                        class="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full transition-colors"
                      >
                        {{ action }}
                      </button>
                    </div>
                    <div class="text-xs opacity-70 text-white/60">
                      {{ formatTime(message.timestamp) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Typing Indicator -->
              <div v-if="isTyping" class="flex justify-start">
                <div class="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 max-w-xs">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="p-6 border-t border-white/20">
              <div class="flex items-end space-x-4">
                <div class="flex-1 relative">
                  <textarea 
                    v-model="currentMessage" 
                    @keypress.enter.prevent="sendMessage"
                    rows="1" 
                    placeholder="Type your message..."
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                  ></textarea>
                  
                  <div class="absolute right-3 top-3 flex items-center space-x-2">
                    <button class="text-white/60 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button 
                  @click="sendMessage"
                  :disabled="!currentMessage.trim()"
                  class="bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <!-- Quick Reply Suggestions -->
              <div v-if="quickReplies.length > 0" class="mt-4 flex flex-wrap gap-2">
                <button 
                  v-for="reply in quickReplies" 
                  :key="reply"
                  @click="sendQuickReply(reply)"
                  class="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded-full transition-colors"
                >
                  {{ reply }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Concierge Profile -->
          <div class="luxury-card">
            <div class="text-center">
              <img 
                :src="activeConcierge.avatar" 
                :alt="activeConcierge.name"
                class="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              />
              <h3 class="text-lg font-semibold text-white mb-1">{{ activeConcierge.name }}</h3>
              <p class="text-white/60 text-sm mb-3">{{ activeConcierge.title }}</p>
              <div class="text-white/70 text-sm space-y-1">
                <p>{{ activeConcierge.experience }} years experience</p>
                <p>{{ activeConcierge.languages.join(', ') }}</p>
                <p class="text-gold-400">{{ activeConcierge.rating }}★ Rating</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="luxury-card">
            <h3 class="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button 
                v-for="action in quickActions" 
                :key="action.id"
                @click="triggerQuickAction(action)"
                class="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 text-left"
              >
                <div :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  action.color
                ]">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
                  </svg>
                </div>
                <div>
                  <div class="text-white font-medium text-sm">{{ action.title }}</div>
                  <div class="text-white/60 text-xs">{{ action.description }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Current Requests -->
          <div class="luxury-card">
            <h3 class="text-lg font-semibold text-white mb-4">Active Requests</h3>
            <div class="space-y-3">
              <div v-for="request in activeRequests" :key="request.id" 
                   class="bg-white/5 rounded-lg p-3 border border-white/10">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="text-white font-medium text-sm">{{ request.title }}</h4>
                    <p class="text-white/60 text-xs mt-1">{{ request.description }}</p>
                    <div class="flex items-center space-x-2 mt-2">
                      <span :class="[
                        'text-xs px-2 py-1 rounded-full',
                        request.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                        request.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      ]">
                        {{ request.status }}
                      </span>
                      <span class="text-white/40 text-xs">{{ request.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Emergency Contact -->
          <div class="luxury-card">
            <h3 class="text-lg font-semibold text-white mb-4">Emergency Contact</h3>
            <div class="space-y-3">
              <a href="tel:+15551234567" 
                 class="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-semibold">Emergency Line</span>
              </a>
              <p class="text-white/60 text-xs text-center">
                Available 24/7 for urgent travel assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import SafeImage from '@/components/SafeImage.vue'

const messagesContainer = ref<HTMLElement>()
const currentMessage = ref('')
const isTyping = ref(false)

const activeConcierge = ref({
  name: 'Isabella Chen',
  title: 'Senior Concierge',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616c527644c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  experience: 12,
  languages: ['English', 'Mandarin', 'French'],
  rating: 4.9
})

const messages = ref([
  {
    id: 1,
    sender: 'concierge',
    type: 'text',
    content: 'Good afternoon, Vaishali! How may I assist you with your luxury travel plans today?',
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: 2,
    sender: 'user',
    type: 'text',
    content: 'Hi Isabella! I\'m looking for something special for my anniversary next month.',
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: 3,
    sender: 'concierge',
    type: 'text',
    content: 'Congratulations on your upcoming anniversary! I have some exquisite experiences in mind. Let me show you a few options that would be perfect for this special occasion.',
    timestamp: new Date(Date.now() - 180000)
  },
  {
    id: 4,
    sender: 'concierge',
    type: 'experience',
    content: 'This private yacht charter in the Greek islands would be absolutely magical for an anniversary celebration:',
    experience: {
      title: 'Private Aegean Yacht Charter',
      location: 'Greek Islands',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: 5,
    sender: 'concierge',
    type: 'quick-actions',
    content: 'Would you like me to check availability or would you prefer to see other romantic options?',
    actions: ['Check Availability', 'See More Options', 'Schedule Call'],
    timestamp: new Date(Date.now() - 60000)
  }
])

const quickReplies = ref([
  'That looks perfect!',
  'Show me more options',
  'What\'s the availability?',
  'Can we customize this?'
])

const quickActions = ref([
  {
    id: 'book-experience',
    title: 'Book Experience',
    description: 'Reserve a luxury experience',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    color: 'bg-gold-500'
  },
  {
    id: 'flight-booking',
    title: 'Flight Booking',
    description: 'Private jet arrangements',
    icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
    color: 'bg-blue-500'
  },
  {
    id: 'accommodation',
    title: 'Accommodation',
    description: 'Luxury hotels & villas',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    color: 'bg-purple-500'
  },
  {
    id: 'dining',
    title: 'Fine Dining',
    description: 'Michelin star reservations',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
    color: 'bg-green-500'
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Luxury car services',
    icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16v-6a1 1 0 00-1-1H4a1 1 0 00-1 1v6h10z',
    color: 'bg-indigo-500'
  },
  {
    id: 'events',
    title: 'Special Events',
    description: 'Exclusive access & tickets',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'bg-pink-500'
  }
])

const activeRequests = ref([
  {
    id: 1,
    title: 'Michelin Restaurant Booking',
    description: 'Le Bernardin, NYC - Table for 2',
    status: 'in-progress',
    date: '2 hours ago'
  },
  {
    id: 2,
    title: 'Private Jet Quote',
    description: 'NYC to Paris, March 15th',
    status: 'pending',
    date: '1 day ago'
  },
  {
    id: 3,
    title: 'Villa Reservation',
    description: 'Tuscany villa with chef',
    status: 'completed',
    date: '3 days ago'
  }
])

const sendMessage = async () => {
  if (!currentMessage.value.trim()) return

  const userMessage = {
    id: Date.now(),
    sender: 'user' as const,
    type: 'text' as const,
    content: currentMessage.value.trim(),
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  currentMessage.value = ''
  
  await scrollToBottom()
  
  // Simulate concierge typing and response
  isTyping.value = true
  setTimeout(async () => {
    isTyping.value = false
    
    const responses = [
      "I understand exactly what you're looking for. Let me pull together some options that would be perfect for this occasion.",
      "Excellent choice! I can definitely arrange that for you. When would you prefer to travel?",
      "I have access to some exclusive experiences that aren't publicly available. Would you like me to share those with you?",
      "Let me check availability and get back to you with the best options and pricing.",
      "That's a wonderful idea! I can customize this experience to make it even more special for your anniversary."
    ]
    
    const conciergeResponse = {
      id: Date.now() + 1,
      sender: 'concierge' as const,
      type: 'text' as const,
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date()
    }
    
    messages.value.push(conciergeResponse)
    await scrollToBottom()
  }, 2000)
}

const sendQuickReply = async (reply: string) => {
  const userMessage = {
    id: Date.now(),
    sender: 'user' as const,
    type: 'text' as const,
    content: reply,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  await scrollToBottom()
  
  // Clear quick replies after use
  quickReplies.value = []
  
  // Simulate concierge response
  setTimeout(async () => {
    const conciergeResponse = {
      id: Date.now() + 1,
      sender: 'concierge' as const,
      type: 'text' as const,
      content: "Perfect! Let me take care of that for you right away. I'll have all the details ready within the hour.",
      timestamp: new Date()
    }
    
    messages.value.push(conciergeResponse)
    await scrollToBottom()
  }, 1500)
}

const triggerQuickAction = async (action: any) => {
  const userMessage = {
    id: Date.now(),
    sender: 'user' as const,
    type: 'text' as const,
    content: `I need help with ${action.title.toLowerCase()}`,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  await scrollToBottom()
  
  // Simulate concierge response based on action
  setTimeout(async () => {
    let response = ''
    switch (action.id) {
      case 'book-experience':
        response = "I'd be delighted to help you book an experience! What type of experience are you interested in, and do you have any specific dates in mind?"
        break
      case 'flight-booking':
        response = "I can arrange private jet travel for you. What are your departure and destination cities, and when would you like to travel?"
        break
      case 'accommodation':
        response = "I have access to the finest luxury accommodations worldwide. Which destination are you considering, and what type of property would you prefer?"
        break
      default:
        response = `Absolutely! I specialize in ${action.description.toLowerCase()}. Let me know your preferences and I'll take care of everything.`
    }
    
    const conciergeResponse = {
      id: Date.now() + 1,
      sender: 'concierge' as const,
      type: 'text' as const,
      content: response,
      timestamp: new Date()
    }
    
    messages.value.push(conciergeResponse)
    await scrollToBottom()
  }, 1500)
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(() => {
  scrollToBottom()
})

const fallbackImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60'
</script>
