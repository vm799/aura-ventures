<template>
  <div class="space-y-8">
    <!-- AI Insights Header -->
    <div class="luxury-card">
      <div class="p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-sapphire-500 to-sapphire-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-serif font-bold text-white">AI Travel Intelligence</h3>
              <p class="text-white/60 text-sm">Powered by machine learning and behavioral analysis</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-sapphire-400">{{ aiInsights.accuracyScore }}%</div>
            <div class="text-white/60 text-sm">Prediction Accuracy</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Travel Personality Profile -->
    <div class="luxury-card">
      <div class="p-6">
        <h3 class="text-xl font-serif font-bold text-white mb-6">Your Travel Personality</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Behavioral Traits</h4>
            <div class="space-y-3">
              <div v-for="trait in personalityTraits" :key="trait.name" class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-white/80 text-sm">{{ trait.name }}</span>
                  <span class="text-sapphire-400 text-sm font-medium">{{ trait.score }}%</span>
                </div>
                <div class="w-full bg-white/20 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-sapphire-500 to-sapphire-400 h-2 rounded-full transition-all duration-1000"
                    :style="{ width: `${trait.score}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Travel Preferences</h4>
            <div class="space-y-4">
              <div v-for="preference in travelPreferences" :key="preference.category" class="bg-white/5 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-white font-medium">{{ preference.category }}</span>
                  <span class="text-gold-400 text-sm">{{ preference.confidence }}% confidence</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="item in preference.items" :key="item" 
                        class="px-2 py-1 bg-sapphire-500/20 text-sapphire-300 rounded text-xs">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Predictive Recommendations -->
    <div class="luxury-card">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-serif font-bold text-white">AI-Predicted Experiences</h3>
          <div class="flex items-center space-x-2 text-sm text-white/60">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Updated every 24 hours</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="prediction in predictiveRecommendations" :key="prediction.id" 
               class="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-sapphire-500/50 transition-all duration-300 group cursor-pointer">
            <div class="relative">
              <img :src="prediction.image" :alt="prediction.title" class="w-full h-32 object-cover" />
              <div class="absolute top-2 left-2 bg-sapphire-500 text-white px-2 py-1 rounded text-xs font-medium">
                {{ prediction.matchScore }}% Match
              </div>
              <div class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {{ prediction.predictedMonth }}
              </div>
            </div>
            
            <div class="p-4">
              <h4 class="text-white font-semibold mb-2 group-hover:text-sapphire-400 transition-colors">
                {{ prediction.title }}
              </h4>
              <p class="text-white/60 text-sm mb-3">{{ prediction.reason }}</p>
              
              <div class="flex items-center justify-between">
                <span class="text-gold-400 font-bold">${{ prediction.price.toLocaleString() }}</span>
                <button class="bg-sapphire-500 hover:bg-sapphire-600 text-white px-3 py-1 rounded text-xs transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Behavioral Insights -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Booking Patterns -->
      <div class="luxury-card">
        <div class="p-6">
          <h3 class="text-xl font-serif font-bold text-white mb-6">Booking Patterns</h3>
          
          <div class="space-y-6">
            <div>
              <h4 class="text-white font-semibold mb-3">Optimal Booking Time</h4>
              <div class="bg-white/5 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-white/80">Peak Booking Hours</span>
                  <span class="text-sapphire-400 font-medium">{{ behaviorInsights.peakBookingHours }}</span>
                </div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-white/80">Preferred Days</span>
                  <span class="text-sapphire-400 font-medium">{{ behaviorInsights.preferredDays.join(', ') }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-white/80">Average Decision Time</span>
                  <span class="text-sapphire-400 font-medium">{{ behaviorInsights.avgDecisionTime }}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-white font-semibold mb-3">Spending Patterns</h4>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-white/80 text-sm">Average Experience Value</span>
                  <span class="text-white font-medium">${{ behaviorInsights.avgSpending.toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-white/80 text-sm">Seasonal Variation</span>
                  <span class="text-white font-medium">{{ behaviorInsights.seasonalSpending }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prediction Confidence -->
      <div class="luxury-card">
        <div class="p-6">
          <h3 class="text-xl font-serif font-bold text-white mb-6">AI Model Performance</h3>
          
          <div class="space-y-6">
            <div>
              <h4 class="text-white font-semibold mb-3">Model Accuracy</h4>
              <div class="space-y-4">
                <div v-for="model in modelPerformance" :key="model.name" class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-white/80 text-sm">{{ model.name }}</span>
                    <span class="text-sapphire-400 text-sm font-medium">{{ model.accuracy }}%</span>
                  </div>
                  <div class="w-full bg-white/20 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                      :style="{ width: `${model.accuracy}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-white font-semibold mb-3">Learning Progress</h4>
              <div class="bg-white/5 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-white/80">Data Points Analyzed</span>
                  <span class="text-sapphire-400 font-medium">{{ learningProgress.dataPoints.toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-white/80">Model Updates</span>
                  <span class="text-sapphire-400 font-medium">{{ learningProgress.modelUpdates }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-white/80">Last Training</span>
                  <span class="text-sapphire-400 font-medium">{{ learningProgress.lastTraining }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seasonal Predictions -->
    <div class="luxury-card">
      <div class="p-6">
        <h3 class="text-xl font-serif font-bold text-white mb-6">Seasonal Travel Predictions</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="season in seasonalPredictions" :key="season.season" class="text-center">
            <div :class="[
              'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
              season.color
            ]">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="season.icon" />
              </svg>
            </div>
            <h4 class="text-white font-semibold mb-2">{{ season.season }}</h4>
            <p class="text-white/60 text-sm mb-3">{{ season.prediction }}</p>
            <div class="text-sapphire-400 font-bold">${{ season.budgetPrediction.toLocaleString() }}</div>
            <div class="text-white/50 text-xs">Predicted budget</div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Training Feedback -->
    <div class="luxury-card">
      <div class="p-6">
        <h3 class="text-xl font-serif font-bold text-white mb-6">Help Improve Your AI</h3>
        <p class="text-white/70 mb-6">
          Your feedback helps our AI better understand your preferences and provide more accurate recommendations.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-white font-semibold mb-4">Rate Recent Recommendations</h4>
            <div class="space-y-3">
              <div v-for="rec in recentRecommendations" :key="rec.id" 
                   class="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div class="text-white font-medium text-sm">{{ rec.title }}</div>
                  <div class="text-white/60 text-xs">{{ rec.date }}</div>
                </div>
                <div class="flex items-center space-x-1">
                  <button v-for="star in 5" :key="star"
                          @click="rateRecommendation(rec.id, star)"
                          :class="[
                            'w-4 h-4 transition-colors',
                            star <= (rec.rating || 0) ? 'text-gold-400' : 'text-white/30'
                          ]">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Preference Updates</h4>
            <div class="space-y-3">
              <button class="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg text-left transition-colors">
                <div class="font-medium text-sm">Update Travel Interests</div>
                <div class="text-white/60 text-xs">Refine your experience categories</div>
              </button>
              <button class="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg text-left transition-colors">
                <div class="font-medium text-sm">Seasonal Preferences</div>
                <div class="text-white/60 text-xs">Update timing and weather preferences</div>
              </button>
              <button class="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg text-left transition-colors">
                <div class="font-medium text-sm">Budget Adjustments</div>
                <div class="text-white/60 text-xs">Update spending patterns and limits</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const aiInsights = ref({
  accuracyScore: 94
})

const personalityTraits = ref([
  { name: 'Adventure Seeking', score: 85 },
  { name: 'Luxury Preference', score: 96 },
  { name: 'Cultural Interest', score: 78 },
  { name: 'Spontaneity', score: 62 },
  { name: 'Exclusivity Desire', score: 91 },
  { name: 'Comfort Priority', score: 88 }
])

const travelPreferences = ref([
  {
    category: 'Destinations',
    confidence: 92,
    items: ['Mediterranean', 'Alps', 'Tropical Islands', 'Historic Cities']
  },
  {
    category: 'Activities', 
    confidence: 88,
    items: ['Fine Dining', 'Cultural Tours', 'Spa & Wellness', 'Private Events']
  },
  {
    category: 'Accommodations',
    confidence: 95,
    items: ['Luxury Hotels', 'Private Villas', 'Boutique Properties', 'Historic Estates']
  },
  {
    category: 'Transportation',
    confidence: 89,
    items: ['Private Jets', 'Luxury Cars', 'Yacht Charters', 'First Class']
  }
])

const predictiveRecommendations = ref([
  {
    id: 'pred-1',
    title: 'Tuscany Wine Harvest Experience',
    reason: 'Based on your fall travel patterns and culinary interests',
    matchScore: 96,
    predictedMonth: 'October',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pred-2',
    title: 'Private Antarctic Expedition',
    reason: 'Adventure seeking trait + exclusive destination preference',
    matchScore: 91,
    predictedMonth: 'December',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pred-3',
    title: 'Monaco Grand Prix VIP',
    reason: 'Matches your exclusive events and luxury transportation interests',
    matchScore: 88,
    predictedMonth: 'May',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
])

const behaviorInsights = ref({
  peakBookingHours: '2-4 PM',
  preferredDays: ['Tuesday', 'Wednesday'],
  avgDecisionTime: '3.2 days',
  avgSpending: 67000,
  seasonalSpending: '+35% in Winter'
})

const modelPerformance = ref([
  { name: 'Destination Prediction', accuracy: 94 },
  { name: 'Budget Estimation', accuracy: 89 },
  { name: 'Timing Prediction', accuracy: 92 },
  { name: 'Activity Matching', accuracy: 96 }
])

const learningProgress = ref({
  dataPoints: 15847,
  modelUpdates: 23,
  lastTraining: '2 hours ago'
})

const seasonalPredictions = ref([
  {
    season: 'Spring',
    prediction: 'European cultural tours with focus on art and history',
    budgetPrediction: 45000,
    color: 'bg-green-500',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    season: 'Summer',
    prediction: 'Mediterranean yacht charters and coastal luxury',
    budgetPrediction: 85000,
    color: 'bg-yellow-500',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    season: 'Fall',
    prediction: 'Wine harvest experiences and culinary adventures',
    budgetPrediction: 55000,
    color: 'bg-orange-500',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    season: 'Winter',
    prediction: 'Arctic adventures and alpine luxury retreats',
    budgetPrediction: 95000,
    color: 'bg-blue-500',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  }
])

const recentRecommendations = ref([
  { id: '1', title: 'Private Chef Tuscany', date: '3 days ago', rating: 0 },
  { id: '2', title: 'Monaco Yacht Charter', date: '1 week ago', rating: 0 },
  { id: '3', title: 'Arctic Aurora Flight', date: '2 weeks ago', rating: 0 }
])

const rateRecommendation = (id: string, rating: number) => {
  const rec = recentRecommendations.value.find(r => r.id === id)
  if (rec) {
    rec.rating = rating
  }
  console.log(`Rated recommendation ${id} with ${rating} stars`)
  // In a real app, this would send feedback to the AI system
}
</script>
