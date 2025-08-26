<template>
  <div class="min-h-screen bg-gradient-to-br from-midnight-900 via-midnight-800 to-midnight-700">
    <div class="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-serif font-bold text-white mb-2">Account Settings</h1>
        <p class="text-xl text-white/70">Manage your profile and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Settings Navigation -->
        <div class="lg:col-span-1">
          <div class="luxury-card sticky top-8">
            <nav class="space-y-2">
              <button 
                v-for="section in settingSections" 
                :key="section.id"
                @click="activeSection = section.id"
                :class="[
                  'w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 text-left',
                  activeSection === section.id 
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white' 
                    : 'text-white/80 hover:bg-white/10'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="section.icon" />
                </svg>
                <span class="font-medium">{{ section.title }}</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-3">
          <!-- Profile Information -->
          <div v-if="activeSection === 'profile'" class="luxury-card">
            <div class="p-8">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Profile Information</h2>
              
              <!-- Profile Photo -->
              <div class="flex items-center space-x-6 mb-8">
                <div class="relative">
                  <img 
                    :src="profile.avatar" 
                    alt="Profile Photo"
                    class="w-24 h-24 rounded-full object-cover border-4 border-gold-500"
                  />
                  <button class="absolute -bottom-2 -right-2 bg-gold-500 hover:bg-gold-600 text-white p-2 rounded-full transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white">{{ profile.firstName }} {{ profile.lastName }}</h3>
                  <p class="text-white/60">{{ profile.tier }} Member since {{ profile.memberSince }}</p>
                  <p class="text-gold-400 text-sm">{{ profile.email }}</p>
                </div>
              </div>

              <!-- Personal Information Form -->
              <form @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-white font-medium mb-2">First Name *</label>
                    <input 
                      v-model="profile.firstName" 
                      type="text" 
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white font-medium mb-2">Last Name *</label>
                    <input 
                      v-model="profile.lastName" 
                      type="text" 
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white font-medium mb-2">Email Address *</label>
                    <input 
                      v-model="profile.email" 
                      type="email" 
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white font-medium mb-2">Phone Number</label>
                    <input 
                      v-model="profile.phone" 
                      type="tel" 
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white font-medium mb-2">Date of Birth</label>
                    <input 
                      v-model="profile.dateOfBirth" 
                      type="date" 
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-white font-medium mb-2">Time Zone</label>
                    <select 
                      v-model="profile.timezone" 
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">GMT (UTC+0)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+8">Singapore Time (UTC+8)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-white font-medium mb-2">Bio</label>
                  <textarea 
                    v-model="profile.bio" 
                    rows="4" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                    placeholder="Tell us about yourself and your travel preferences..."
                  ></textarea>
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="btn-primary px-8 py-3">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Travel Preferences -->
          <div v-if="activeSection === 'preferences'" class="luxury-card">
            <div class="p-8">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Travel Preferences</h2>
              
              <form @submit.prevent="savePreferences" class="space-y-8">
                <!-- Preferred Experience Types -->
                <div>
                  <label class="block text-white font-medium mb-4">Preferred Experience Types</label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label v-for="type in experienceTypes" :key="type" class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <input 
                        v-model="preferences.experienceTypes" 
                        :value="type" 
                        type="checkbox" 
                        class="w-4 h-4 text-gold-500 bg-white/10 border-white/30 rounded focus:ring-gold-500"
                      />
                      <span class="text-white/80 text-sm">{{ type }}</span>
                    </label>
                  </div>
                </div>

                <!-- Preferred Destinations -->
                <div>
                  <label class="block text-white font-medium mb-4">Preferred Destinations</label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label v-for="destination in destinations" :key="destination" class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <input 
                        v-model="preferences.destinations" 
                        :value="destination" 
                        type="checkbox" 
                        class="w-4 h-4 text-gold-500 bg-white/10 border-white/30 rounded focus:ring-gold-500"
                      />
                      <span class="text-white/80 text-sm">{{ destination }}</span>
                    </label>
                  </div>
                </div>

                <!-- Travel Style -->
                <div>
                  <label class="block text-white font-medium mb-4">Travel Style</label>
                  <div class="space-y-3">
                    <label v-for="style in travelStyles" :key="style.value" class="flex items-start space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <input 
                        v-model="preferences.travelStyle" 
                        :value="style.value" 
                        type="radio" 
                        class="w-4 h-4 text-gold-500 bg-white/10 border-white/30 focus:ring-gold-500 mt-1"
                      />
                      <div>
                        <div class="text-white font-medium">{{ style.label }}</div>
                        <div class="text-white/60 text-sm">{{ style.description }}</div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Budget Range -->
                <div>
                  <label class="block text-white font-medium mb-4">Typical Experience Budget</label>
                  <select 
                    v-model="preferences.budgetRange" 
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="btn-primary px-8 py-3">
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Notifications -->
          <div v-if="activeSection === 'notifications'" class="luxury-card">
            <div class="p-8">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Notification Settings</h2>
              
              <form @submit.prevent="saveNotifications" class="space-y-6">
                <div v-for="category in notificationCategories" :key="category.id" class="border-b border-white/10 pb-6 last:border-b-0">
                  <h3 class="text-lg font-semibold text-white mb-4">{{ category.title }}</h3>
                  <p class="text-white/60 text-sm mb-4">{{ category.description }}</p>
                  
                  <div class="space-y-3">
                    <label v-for="option in category.options" :key="option.id" class="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div class="text-white font-medium">{{ option.label }}</div>
                        <div class="text-white/60 text-sm">{{ option.description }}</div>
                      </div>
                      <div class="flex items-center space-x-4">
                        <label class="flex items-center space-x-2">
                          <input 
                            v-model="notifications[option.id].email" 
                            type="checkbox" 
                            class="w-4 h-4 text-gold-500 bg-white/10 border-white/30 rounded focus:ring-gold-500"
                          />
                          <span class="text-white/80 text-sm">Email</span>
                        </label>
                        <label class="flex items-center space-x-2">
                          <input 
                            v-model="notifications[option.id].sms" 
                            type="checkbox" 
                            class="w-4 h-4 text-gold-500 bg-white/10 border-white/30 rounded focus:ring-gold-500"
                          />
                          <span class="text-white/80 text-sm">SMS</span>
                        </label>
                        <label class="flex items-center space-x-2">
                          <input 
                            v-model="notifications[option.id].push" 
                            type="checkbox" 
                            class="w-4 h-4 text-gold-500 bg-white/10 border-white/30 rounded focus:ring-gold-500"
                          />
                          <span class="text-white/80 text-sm">Push</span>
                        </label>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="btn-primary px-8 py-3">
                    Save Notification Settings
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Payment Methods -->
          <div v-if="activeSection === 'payments'" class="luxury-card">
            <div class="p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-serif font-bold text-white">Payment Methods</h2>
                <button @click="addPaymentMethod" class="btn-primary px-6 py-2">
                  Add Payment Method
                </button>
              </div>
              
              <div class="space-y-4">
                <div v-for="method in paymentMethods" :key="method.id" class="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                        <span class="text-white text-xs font-bold">{{ method.type.toUpperCase() }}</span>
                      </div>
                      <div>
                        <div class="text-white font-semibold">**** **** **** {{ method.lastFour }}</div>
                        <div class="text-white/60 text-sm">Expires {{ method.expiry }}</div>
                      </div>
                      <div v-if="method.isDefault" class="bg-gold-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Default
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <button v-if="!method.isDefault" @click="setDefaultPayment(method.id)" class="text-gold-400 hover:text-gold-300 text-sm">
                        Set as Default
                      </button>
                      <button @click="editPaymentMethod(method.id)" class="text-white/60 hover:text-white text-sm">
                        Edit
                      </button>
                      <button @click="removePaymentMethod(method.id)" class="text-red-400 hover:text-red-300 text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security -->
          <div v-if="activeSection === 'security'" class="luxury-card">
            <div class="p-8">
              <h2 class="text-2xl font-serif font-bold text-white mb-6">Security & Privacy</h2>
              
              <div class="space-y-8">
                <!-- Change Password -->
                <div>
                  <h3 class="text-lg font-semibold text-white mb-4">Change Password</h3>
                  <form @submit.prevent="changePassword" class="space-y-4">
                    <div>
                      <label class="block text-white font-medium mb-2">Current Password</label>
                      <input 
                        v-model="passwordForm.current" 
                        type="password" 
                        class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label class="block text-white font-medium mb-2">New Password</label>
                      <input 
                        v-model="passwordForm.new" 
                        type="password" 
                        class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label class="block text-white font-medium mb-2">Confirm New Password</label>
                      <input 
                        v-model="passwordForm.confirm" 
                        type="password" 
                        class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                        required
                      />
                    </div>
                    
                    <button type="submit" class="btn-primary px-6 py-2">
                      Update Password
                    </button>
                  </form>
                </div>

                <!-- Two-Factor Authentication -->
                <div class="border-t border-white/10 pt-8">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                      <p class="text-white/60 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      @click="toggle2FA"
                      :class="[
                        'px-6 py-2 rounded-lg font-medium transition-colors',
                        security.twoFactorEnabled 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      ]"
                    >
                      {{ security.twoFactorEnabled ? 'Disable' : 'Enable' }} 2FA
                    </button>
                  </div>
                </div>

                <!-- Login History -->
                <div class="border-t border-white/10 pt-8">
                  <h3 class="text-lg font-semibold text-white mb-4">Recent Login Activity</h3>
                  <div class="space-y-3">
                    <div v-for="login in loginHistory" :key="login.id" class="bg-white/5 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="text-white font-medium">{{ login.location }}</div>
                          <div class="text-white/60 text-sm">{{ login.device }} • {{ login.browser }}</div>
                        </div>
                        <div class="text-right">
                          <div class="text-white text-sm">{{ formatLoginDate(login.timestamp) }}</div>
                          <div :class="[
                            'text-xs',
                            login.isCurrent ? 'text-green-400' : 'text-white/60'
                          ]">
                            {{ login.isCurrent ? 'Current Session' : 'Ended' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Management -->
          <div v-if="activeSection === 'account'" class="space-y-8">
            <!-- Subscription Management -->
            <div class="luxury-card">
              <div class="p-8">
                <h2 class="text-2xl font-serif font-bold text-white mb-6">Subscription Management</h2>
                
                <div class="bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-500/30 rounded-lg p-6 mb-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-xl font-semibold text-white">{{ subscription.tier }} Membership</h3>
                      <p class="text-white/70">{{ subscription.description }}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-gold-400">${{ subscription.price }}/month</div>
                      <div class="text-white/60 text-sm">Next billing: {{ subscription.nextBilling }}</div>
                    </div>
                  </div>
                </div>

                <div class="flex space-x-4">
                  <router-link to="/subscription" class="btn-secondary">
                    Change Plan
                  </router-link>
                  <button @click="pauseSubscription" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Pause Subscription
                  </button>
                </div>
              </div>
            </div>

            <!-- Data & Privacy -->
            <div class="luxury-card">
              <div class="p-8">
                <h2 class="text-2xl font-serif font-bold text-white mb-6">Data & Privacy</h2>
                
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 class="text-white font-semibold">Export Account Data</h3>
                      <p class="text-white/60 text-sm">Download a copy of your account data</p>
                    </div>
                    <button @click="exportData" class="btn-secondary px-4 py-2">
                      Download
                    </button>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 class="text-white font-semibold">Delete Account</h3>
                      <p class="text-white/60 text-sm">Permanently delete your account and all data</p>
                    </div>
                    <button @click="showDeleteConfirmation = true" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showDeleteConfirmation = false">
      <div class="luxury-card max-w-md w-full" @click.stop>
        <div class="p-6">
          <h3 class="text-xl font-serif font-bold text-white mb-4">Delete Account</h3>
          <p class="text-white/80 mb-6">
            Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data, bookings, and subscription.
          </p>
          
          <div class="flex space-x-4">
            <button @click="showDeleteConfirmation = false" class="btn-secondary flex-1">
              Cancel
            </button>
            <button @click="deleteAccount" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex-1 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeSection = ref('profile')
const showDeleteConfirmation = ref(false)

const settingSections = ref([
  { id: 'profile', title: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'preferences', title: 'Preferences', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4' },
  { id: 'notifications', title: 'Notifications', icon: 'M15 17h5l-5-5V9.5a6.5 6.5 0 1 0-13 0V12l-5 5h5a3 3 0 1 0 6 0c0-.01 0-.02 0-.03V17H15z' },
  { id: 'payments', title: 'Payment Methods', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'security', title: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { id: 'account', title: 'Account', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
])

const profile = ref({
  firstName: 'Vaishali',
  lastName: 'Gor',
  email: 'vaishali@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  timezone: 'UTC-8',
  bio: 'Passionate about luxury travel and unique experiences. Love discovering new destinations and cultures.',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616c527644c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  tier: 'Platinum',
  memberSince: 'March 2023'
})

const preferences = ref({
  experienceTypes: ['Dining', 'Transportation', 'Entertainment'],
  destinations: ['Europe', 'Asia', 'North America'],
  travelStyle: 'luxury',
  budgetRange: '$50,000 - $100,000'
})

const experienceTypes = ref([
  'Dining', 'Transportation', 'Entertainment', 'Accommodation',
  'Adventure', 'Wellness', 'Cultural', 'Shopping'
])

const destinations = ref([
  'Europe', 'Asia', 'North America', 'South America',
  'Africa', 'Oceania', 'Middle East', 'Caribbean'
])

const travelStyles = ref([
  { value: 'luxury', label: 'Ultra Luxury', description: 'The finest experiences money can buy' },
  { value: 'adventurous', label: 'Luxury Adventure', description: 'High-end experiences with a thrill factor' },
  { value: 'cultural', label: 'Cultural Immersion', description: 'Deep cultural experiences with luxury comfort' },
  { value: 'relaxation', label: 'Pure Relaxation', description: 'Focus on wellness and rejuvenation' }
])

const notifications = ref({
  bookingConfirmation: { email: true, sms: true, push: true },
  experienceReminders: { email: true, sms: false, push: true },
  conciergeMessages: { email: true, sms: true, push: true },
  subscriptionUpdates: { email: true, sms: false, push: false },
  promotionalOffers: { email: false, sms: false, push: false },
  newExperiences: { email: true, sms: false, push: true }
})

const notificationCategories = ref([
  {
    id: 'booking',
    title: 'Booking & Experiences',
    description: 'Notifications about your bookings and upcoming experiences',
    options: [
      { id: 'bookingConfirmation', label: 'Booking Confirmations', description: 'When a booking is confirmed or modified' },
      { id: 'experienceReminders', label: 'Experience Reminders', description: 'Reminders before your experiences' }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Messages and updates from your concierge',
    options: [
      { id: 'conciergeMessages', label: 'Concierge Messages', description: 'Messages from your personal concierge' }
    ]
  },
  {
    id: 'account',
    title: 'Account & Subscription',
    description: 'Account and subscription related notifications',
    options: [
      { id: 'subscriptionUpdates', label: 'Subscription Updates', description: 'Billing and subscription changes' }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing & Offers',
    description: 'Promotional content and new experience announcements',
    options: [
      { id: 'promotionalOffers', label: 'Promotional Offers', description: 'Special deals and exclusive offers' },
      { id: 'newExperiences', label: 'New Experiences', description: 'When new experiences are added' }
    ]
  }
])

const paymentMethods = ref([
  {
    id: '1',
    type: 'visa',
    lastFour: '4242',
    expiry: '12/25',
    isDefault: true
  },
  {
    id: '2',
    type: 'mastercard',
    lastFour: '8888',
    expiry: '03/26',
    isDefault: false
  }
])

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const security = ref({
  twoFactorEnabled: false
})

const loginHistory = ref([
  {
    id: '1',
    location: 'New York, NY',
    device: 'MacBook Pro',
    browser: 'Chrome 120',
    timestamp: new Date(),
    isCurrent: true
  },
  {
    id: '2',
    location: 'Los Angeles, CA',
    device: 'iPhone 15 Pro',
    browser: 'Safari',
    timestamp: new Date(Date.now() - 86400000),
    isCurrent: false
  }
])

const subscription = ref({
  tier: 'Platinum',
  description: 'Unlimited luxury experiences with dedicated concierge',
  price: 10000,
  nextBilling: 'March 15, 2024'
})

const saveProfile = () => {
  console.log('Saving profile...', profile.value)
  // In a real app, this would make an API call
}

const savePreferences = () => {
  console.log('Saving preferences...', preferences.value)
  // In a real app, this would make an API call
}

const saveNotifications = () => {
  console.log('Saving notifications...', notifications.value)
  // In a real app, this would make an API call
}

const addPaymentMethod = () => {
  console.log('Adding payment method...')
  // In a real app, this would open a payment method form
}

const setDefaultPayment = (id: string) => {
  paymentMethods.value.forEach(method => {
    method.isDefault = method.id === id
  })
}

const editPaymentMethod = (id: string) => {
  console.log('Editing payment method:', id)
  // In a real app, this would open an edit form
}

const removePaymentMethod = (id: string) => {
  paymentMethods.value = paymentMethods.value.filter(method => method.id !== id)
}

const changePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('Passwords do not match')
    return
  }
  console.log('Changing password...')
  // In a real app, this would make an API call
  passwordForm.value = { current: '', new: '', confirm: '' }
}

const toggle2FA = () => {
  security.value.twoFactorEnabled = !security.value.twoFactorEnabled
  console.log('2FA:', security.value.twoFactorEnabled ? 'enabled' : 'disabled')
}

const pauseSubscription = () => {
  console.log('Pausing subscription...')
  // In a real app, this would pause the subscription
}

const exportData = () => {
  console.log('Exporting user data...')
  // In a real app, this would generate and download user data
}

const deleteAccount = () => {
  console.log('Deleting account...')
  // In a real app, this would delete the account
  showDeleteConfirmation.value = false
}

const formatLoginDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}
</script>
