import { ref, computed } from 'vue'

export interface Experience {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  gallery: string[]
  tier: 'Silver' | 'Gold' | 'Platinum'
  price: number
  duration: string
  location: string
  category: 'Transport' | 'Accommodation' | 'Dining' | 'Entertainment' | 'Wellness' | 'Adventure'
  highlights: string[]
  includes: string[]
  exclusives: string[]
  availability: 'Available' | 'Limited' | 'Waitlist'
  rating: number
  reviews: number
}

const experiences = ref<Experience[]>([
  {
    id: '1',
    title: 'Private Aegean Yacht Charter',
    description: 'Explore the Greek islands aboard a 120ft luxury yacht with personal chef and crew. Seven days of pure indulgence.',
    longDescription: 'Embark on the ultimate Mediterranean adventure aboard our meticulously appointed 120-foot luxury yacht. This seven-day journey through the pristine waters of the Aegean Sea offers unparalleled access to Greece\'s most exclusive islands and hidden coves. Your dedicated crew of eight includes a Michelin-trained chef, sommelier, and experienced captain who knows every secret anchorage.',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da4821b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540946485063-a40da4821b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'Platinum',
    price: 85000,
    duration: '7 days',
    location: 'Greek Islands',
    category: 'Transport',
    highlights: [
      'Private 120ft luxury yacht with full crew',
      'Michelin-trained personal chef',
      'Access to exclusive island moorings',
      'Helicopter transfers available'
    ],
    includes: [
      'Full yacht charter with crew',
      'All meals and premium beverages',
      'Water sports equipment',
      'Ground transportation on islands'
    ],
    exclusives: [
      'Private island dinner on Folegandros',
      'Sunset wine tasting with master sommelier',
      'Exclusive access to Amanzoe resort facilities'
    ],
    availability: 'Limited',
    rating: 4.9,
    reviews: 127
  },
  {
    id: '2',
    title: 'Helicopter Wine Tour Napa Valley',
    description: 'Private helicopter tour of Napa Valley with exclusive tastings at renowned vineyards and Michelin-starred dining.',
    longDescription: 'Soar above California\'s most prestigious wine region in your private helicopter, accessing vineyards and experiences unavailable to the public. This full-day immersion includes private tastings with renowned winemakers, a multi-course lunch at a three-Michelin-starred restaurant, and helicopter transfers between venues.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1474092251832-5c1c1dae14c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'Gold',
    price: 15000,
    duration: '8 hours',
    location: 'Napa Valley, California',
    category: 'Adventure',
    highlights: [
      'Private helicopter with experienced pilot',
      'Exclusive vineyard access',
      'Three-Michelin-starred dining',
      'Vintage wine library tour'
    ],
    includes: [
      'Round-trip helicopter transportation',
      'Private tastings at 3 premier wineries',
      'Michelin-starred lunch with wine pairings',
      'Professional sommelier guide'
    ],
    exclusives: [
      'Behind-scenes tour of Opus One winery',
      'Private collection tasting with founder',
      'Custom wine blend creation session'
    ],
    availability: 'Available',
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    title: 'Private Opera Box Vienna',
    description: 'Exclusive box seats at Vienna State Opera with backstage access and private dinner with renowned performers.',
    longDescription: 'Experience the pinnacle of cultural refinement with exclusive access to Vienna\'s most prestigious opera house. Your private box offers the finest views of world-class performances, complemented by backstage tours, meet-and-greets with principal performers, and an intimate dinner prepared by the opera house\'s executive chef.',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'Platinum',
    price: 8500,
    duration: '1 evening',
    location: 'Vienna, Austria',
    category: 'Entertainment',
    highlights: [
      'Private box at Vienna State Opera',
      'Backstage tour with director',
      'Meet principal performers',
      'Private dinner in opera house'
    ],
    includes: [
      'Premium box seats for up to 6 guests',
      'Champagne service during intermissions',
      'Backstage access and guided tour',
      'Three-course dinner with wine pairings'
    ],
    exclusives: [
      'Private rehearsal viewing opportunity',
      'Signed memorabilia from performers',
      'Custom opera program with your name'
    ],
    availability: 'Waitlist',
    rating: 4.9,
    reviews: 156
  },
  {
    id: '4',
    title: 'Private Chef Tuscany Villa',
    description: 'World-renowned chef creates a personalized culinary journey in your private Tuscan villa.',
    longDescription: 'Immerse yourself in Italian culinary excellence with a week-long residency by a Michelin three-star chef at your private Tuscan villa. This bespoke experience includes daily cooking classes, market tours, wine cellar experiences, and evening dinners prepared exclusively for your party.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'Platinum',
    price: 45000,
    duration: '7 days',
    location: 'Tuscany, Italy',
    category: 'Dining',
    highlights: [
      'Michelin three-star chef residency',
      'Private cooking classes',
      'Exclusive market tours',
      'Wine cellar masterclasses'
    ],
    includes: [
      'Chef and assistant for full week',
      'All meals and premium ingredients',
      'Daily cooking classes',
      'Premium wine pairings'
    ],
    exclusives: [
      'Private truffle hunting experience',
      'Vintner dinner at century-old winery',
      'Personalized recipe collection'
    ],
    availability: 'Limited',
    rating: 4.9,
    reviews: 73
  },
  {
    id: '5',
    title: 'Arctic Aurora Private Jet',
    description: 'Chase the Northern Lights aboard a private jet with luxury accommodation and expert aurora guides.',
    longDescription: 'Embark on the ultimate arctic adventure with optimal Aurora Borealis viewing from your private jet and exclusive ice hotel. This three-day expedition combines luxury air travel, expert aurora prediction, and unparalleled access to the most remote viewing locations.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'Platinum',
    price: 65000,
    duration: '3 days',
    location: 'Northern Norway',
    category: 'Adventure',
    highlights: [
      'Private jet with panoramic windows',
      'Expert aurora prediction team',
      'Luxury ice hotel accommodation',
      'Dog sledding with champion teams'
    ],
    includes: [
      'Private jet transportation',
      'All accommodation and meals',
      'Professional photography service',
      'Arctic gear and equipment'
    ],
    exclusives: [
      'Flight path adjustments for optimal viewing',
      'Private northern lights photography session',
      'Meeting with indigenous Sami people'
    ],
    availability: 'Limited',
    rating: 4.8,
    reviews: 45
  },
  {
    id: '6',
    title: 'Exclusive Fashion Week Access',
    description: 'Behind-the-scenes access to Paris Fashion Week with front-row seats and designer meet-and-greets.',
    longDescription: 'Gain unprecedented access to the world\'s most exclusive fashion events with front-row seats at major shows, private designer studio visits, and exclusive after-parties. This week-long experience includes personal styling consultations and access to runway pieces.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'Gold',
    price: 25000,
    duration: '1 week',
    location: 'Paris, France',
    category: 'Entertainment',
    highlights: [
      'Front-row seats at major shows',
      'Private designer studio tours',
      'Exclusive after-party access',
      'Personal styling consultation'
    ],
    includes: [
      'All show tickets and transportation',
      'Luxury hotel accommodation',
      'Personal fashion consultant',
      'Exclusive shopping access'
    ],
    exclusives: [
      'Meet-and-greet with top designers',
      'Access to by-invitation-only events',
      'Custom piece commissioning opportunity'
    ],
    availability: 'Available',
    rating: 4.7,
    reviews: 112
  }
])

export function useExperiences() {
  const allExperiences = computed(() => experiences.value)
  
  const experiencesByTier = computed(() => {
    return {
      Silver: experiences.value.filter(exp => exp.tier === 'Silver'),
      Gold: experiences.value.filter(exp => exp.tier === 'Gold'), 
      Platinum: experiences.value.filter(exp => exp.tier === 'Platinum')
    }
  })
  
  const experiencesByCategory = computed(() => {
    const categories = ['Transport', 'Accommodation', 'Dining', 'Entertainment', 'Wellness', 'Adventure']
    return categories.reduce((acc, category) => {
      acc[category] = experiences.value.filter(exp => exp.category === category)
      return acc
    }, {} as Record<string, Experience[]>)
  })
  
  const getExperienceById = (id: string): Experience | undefined => {
    return experiences.value.find(exp => exp.id === id)
  }
  
  const getFeaturedExperiences = (count: number = 3): Experience[] => {
    return experiences.value
      .filter(exp => exp.rating >= 4.8)
      .slice(0, count)
  }
  
  const getRecommendedExperiences = (userTier: 'Silver' | 'Gold' | 'Platinum', count: number = 4): Experience[] => {
    // Simple recommendation logic based on user tier
    const tierPriority = {
      'Silver': ['Silver', 'Gold'],
      'Gold': ['Gold', 'Silver', 'Platinum'], 
      'Platinum': ['Platinum', 'Gold', 'Silver']
    }
    
    const allowedTiers = tierPriority[userTier]
    return experiences.value
      .filter(exp => allowedTiers.includes(exp.tier))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count)
  }
  
  return {
    allExperiences,
    experiencesByTier,
    experiencesByCategory,
    getExperienceById,
    getFeaturedExperiences,
    getRecommendedExperiences
  }
}
