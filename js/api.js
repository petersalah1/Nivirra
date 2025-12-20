/**
 * ========================================
 * API MANAGER - مبسط وسهل
 * ========================================
 */

// البيانات المؤقتة (Mock Data) - هتشيلها لما الباك يبقى جاهز
const MOCK_DATA = {
  trips: [
    // ========== الرحلات العادية (Explore Our Trips) ==========
    {
      id: 1,
      title: 'Cairo City Tour',
      subtitle: 'Pyramids, Egyptian Museum & Khan El Khalili',
      city: 'Cairo',
      days: 1,
      price: 120,
      img: './images/borj.avif',
      type: 'culture',
      description: 'Explore the wonders of Cairo including the Great Pyramids of Giza, the Sphinx, and the world-renowned Egyptian Museum.',
      highlights: [
        'Visit the Great Pyramids and Sphinx',
        'Explore the Egyptian Museum',
        'Walk through Khan El Khalili bazaar',
        'Traditional Egyptian lunch',
        'Expert Egyptologist guide'
      ]
    },
    {
      id: 2,
      title: 'Luxor & Valley of Kings',
      subtitle: 'Temples, tombs and Nile views',
      city: 'Luxor',
      days: 2,
      price: 180,
      img: './images/moment.jpeg',
      type: 'history',
      large: true,
      description: 'Discover ancient Egyptian civilization at its finest in Luxor, the world\'s greatest open-air museum.',
      highlights: [
        'Visit Valley of the Kings',
        'Karnak Temple Complex',
        'Luxor Temple at night',
        'Hot air balloon ride (optional)',
        'Expert Egyptologist guide'
      ]
    },
    {
      id: 3,
      title: 'Sharm El Sheikh - Diving',
      subtitle: 'Colorful reefs & water sports',
      city: 'Sharm El Sheikh',
      days: 3,
      price: 250,
      img: './images/guilherme-stecanella-_dH-oQF9w-Y-unsplash.jpg',
      type: 'diving',
      description: 'Explore the vibrant underwater world of the Red Sea with crystal clear waters and amazing coral reefs.',
      highlights: [
        'Professional diving instructors',
        'World-class diving sites',
        'All equipment included',
        'Boat trips to coral reefs',
        'Beginner-friendly options'
      ]
    },
    {
      id: 4,
      title: 'Luxury Nile Cruise',
      subtitle: '5 days • Luxor to Aswan',
      city: 'Luxor',
      days: 5,
      price: 450,
      img: 'https://images.unsplash.com/photo-1508264165352-258a6f19f3d6?auto=format&fit=crop&w=1200&q=60',
      type: 'cruise',
      large: true,
      description: 'Embark on an unforgettable journey down the Nile River on a luxury cruise ship.',
      highlights: [
        '5-star luxury cruise ship',
        'All meals included',
        'Guided tours at each stop',
        'Swimming pool on deck',
        'Evening entertainment'
      ]
    },
    {
      id: 5,
      title: 'Desert Safari Adventure',
      subtitle: 'Western Desert Experience',
      city: 'Siwa Oasis',
      days: 3,
      price: 280,
      img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
      type: 'safari',
      description: 'Experience the magic of Egypt\'s Western Desert with 4x4 adventure and camping under the stars.',
      highlights: [
        '4x4 desert adventure',
        'Bedouin camp experience',
        'Traditional BBQ dinner',
        'Stargazing session',
        'Sandboarding activities'
      ]
    },
    {
      id: 6,
      title: 'Alexandria Day Trip',
      subtitle: 'Mediterranean Pearl',
      city: 'Alexandria',
      days: 1,
      price: 95,
      img: 'https://images.unsplash.com/photo-1505691723518-36a4e6a8b9a8?auto=format&fit=crop&w=1200&q=60',
      type: 'culture',
      description: 'Explore Egypt\'s Mediterranean pearl with its unique blend of history and coastal beauty.',
      highlights: [
        'Bibliotheca Alexandrina',
        'Qaitbay Citadel',
        'Corniche seafront walk',
        'Fresh seafood lunch',
        'Roman amphitheater'
      ]
    },
    {
      id: 7,
      title: 'Aswan & Abu Simbel',
      subtitle: 'Nubian Culture & Temples',
      city: 'Aswan',
      days: 2,
      price: 220,
      img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=60',
      type: 'history',
      description: 'Visit the magnificent temples of Abu Simbel and experience authentic Nubian culture.',
      highlights: [
        'Abu Simbel Temples',
        'Philae Temple',
        'Nubian Village visit',
        'Felucca ride on the Nile',
        'High Dam tour'
      ]
    },
    {
      id: 8,
      title: 'Hurghada Red Sea Resort',
      subtitle: '7 days all-inclusive',
      city: 'Hurghada',
      days: 7,
      price: 380,
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60',
      type: 'beach',
      large: true,
      description: 'Relax and unwind at a premium Red Sea resort with unlimited activities and entertainment.',
      highlights: [
        'All-inclusive 5-star resort',
        'Private beach access',
        'Water sports included',
        'Multiple restaurants',
        'Kids club & entertainment'
      ]
    },
    
    // ========== رحلات العروض الخاصة (Special Offers) ==========
    {
      id: 101,
      title: 'Summer Special - Cairo & Luxor',
      subtitle: 'Combined 5-day package with discounts',
      city: 'Cairo',
      days: 5,
      price: 350,
      img: './images/peramids.jpg',
      type: 'combo',
      description: 'Experience the best of Cairo and Luxor in this exclusive summer package. Visit the Pyramids, Egyptian Museum, Valley of Kings, and Karnak Temple all in one amazing journey.',
      highlights: [
        'Pyramids of Giza & Sphinx',
        'Egyptian Museum full tour',
        'Valley of the Kings exploration',
        'Karnak & Luxor Temples',
        '4-star hotels included',
        'All transfers & meals'
      ]
    },
    {
      id: 102,
      title: 'Nile Cruise Discount',
      subtitle: '7 nights with full board - Special price',
      city: 'Luxor',
      days: 7,
      price: 500,
      img: './images/2h-media-syKhsnVTSRw-unsplash.jpg',
      type: 'cruise',
      large: true,
      description: 'Sail the legendary Nile River on a premium cruise from Luxor to Aswan. Enjoy 7 nights of luxury with all meals, guided tours, and entertainment included at a special discounted rate.',
      highlights: [
        '7 nights on 5-star cruise ship',
        'All meals & beverages included',
        'Daily guided shore excursions',
        'Visit 10+ ancient temples',
        'Pool deck & spa facilities',
        'Live music & entertainment nightly'
      ]
    },
    {
      id: 103,
      title: 'Family Package Deal',
      subtitle: 'Luxor adventure for groups 4+',
      city: 'Luxor',
      days: 3,
      price: 800,
      img: './images/background-hero.avif',
      type: 'family',
      description: 'Perfect for families! Explore Luxor together with special group discounts. Kid-friendly activities, family rooms, and experienced guides make this the ideal family vacation.',
      highlights: [
        'Family-friendly itinerary',
        'Hot air balloon ride for all',
        'Interactive museum tours',
        'Valley of Kings exploration',
        'Traditional felucca sailing',
        'Group discount (4+ people)',
        'Family rooms in 4-star hotel'
      ]
    },
    {
      id: 104,
      title: 'Red Sea Diving Package',
      subtitle: '4 nights with diving equipment',
      city: 'Sharm El Sheikh',
      days: 4,
      price: 320,
      img: './images/moment.jpeg',
      type: 'diving',
      description: 'Dive into adventure with our comprehensive Red Sea package. Includes 4 nights accommodation, all diving equipment, boat trips, and professional PADI instructors.',
      highlights: [
        '4 nights beachfront hotel',
        'All diving equipment included',
        '6 guided dives included',
        'PADI certification available',
        'Boat trips to best dive sites',
        'Underwater photography session',
        'Daily breakfast & dinner'
      ]
    },
    {
      id: 105,
      title: 'Desert Safari Special',
      subtitle: '3 days camping adventure',
      city: 'Siwa Oasis',
      days: 3,
      price: 280,
      img: './images/see.jpg',
      type: 'safari',
      description: 'Escape to the desert for an authentic Bedouin experience. Camp under the stars, ride camels, explore ancient ruins, and enjoy traditional cuisine in this unforgettable adventure.',
      highlights: [
        '3 days in the Western Desert',
        'Authentic Bedouin camping',
        '4x4 desert safari adventure',
        'Camel trekking experience',
        'Traditional Bedouin meals',
        'Stargazing & campfire nights',
        'Visit ancient Siwa Oasis'
      ]
    }
  ],
  
  offers: [
    {
      id: 1,
      tripId: 101, // رحلة Summer Special الخاصة
      title: "Summer Special - Cairo & Luxor",
      nights: "5 days package",
      img: "./images/peramids.jpg",
      old: 420,
      discount: 17
    },
    {
      id: 2,
      tripId: 102, // رحلة Nile Cruise الخاصة
      title: "Nile Cruise Discount",
      nights: "7 nights - Full board",
      img: "./images/2h-media-syKhsnVTSRw-unsplash.jpg",
      old: 625,
      discount: 20
    },
    {
      id: 3,
      tripId: 103, // رحلة Family Package الخاصة
      title: "Family Package Deal",
      nights: "Discounts for groups 4+",
      img: "./images/background-hero.avif",
      old: 1140,
      discount: 30
    },
    {
      id: 4,
      tripId: 104, // رحلة Red Sea Diving الخاصة
      title: "Red Sea Diving Package",
      nights: "4 nights with dives",
      img: "./images/moment.jpeg",
      old: 380,
      discount: 16
    },
    {
      id: 5,
      tripId: 105, // رحلة Desert Safari الخاصة
      title: "Desert Safari Special",
      nights: "3 days adventure",
      img: "./images/see.jpg",
      old: 350,
      discount: 20
    }
  ]
};


// ========================================
// دوال API البسيطة
// ========================================

/**
 * جلب كل الرحلات
 */
function getTrips() {
  return MOCK_DATA.trips;
}

/**
 * جلب رحلة واحدة بالـ ID
 */
function getTripById(id) {
  return MOCK_DATA.trips.find(trip => trip.id === parseInt(id));
}

/**
 * جلب أول 3 رحلات (للصفحة الرئيسية) - من الرحلات العادية فقط
 */
function getFeaturedTrips() {
  return MOCK_DATA.trips.filter(trip => trip.id < 100).slice(0, 3);
}

/**
 * جلب كل العروض
 */
function getOffers() {
  return MOCK_DATA.offers;
}

/**
 * جلب الفيدباك من localStorage
 */
function getFeedback() {
  const stored = localStorage.getItem('feedback');
  return stored ? JSON.parse(stored) : [];
}

/**
 * حفظ فيدباك جديد
 */
function saveFeedback(name, comment, rating) {
  const feedback = getFeedback();
  const newFeedback = {
    id: Date.now(),
    name: name,
    comment: comment,
    rating: parseInt(rating),
    date: new Date().toISOString()
  };
  
  feedback.unshift(newFeedback);
  localStorage.setItem('feedback', JSON.stringify(feedback));
  return newFeedback;
}

/**
 * حفظ طلب Tailor Tour
 */
function saveTailorTourRequest(data) {
  const requests = JSON.parse(localStorage.getItem('tailorRequests') || '[]');
  const newRequest = {
    id: Date.now(),
    ...data,
    date: new Date().toISOString()
  };
  
  requests.push(newRequest);
  localStorage.setItem('tailorRequests', JSON.stringify(requests));
  
  console.log('Tailor Tour Request Saved:', newRequest);
  return newRequest;
}

/**
 * جلب كل طلبات Tailor Tour (للباك إند فيما بعد)
 */
function getTailorTourRequests() {
  return JSON.parse(localStorage.getItem('tailorRequests') || '[]');
}

// ========================================
// Helper Functions
// ========================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}