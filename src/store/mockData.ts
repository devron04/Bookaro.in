export interface Package {
  id: string;
  title: string;
  destination: string;
  category: 'domestic' | 'international' | 'luxury' | 'budget' | 'weekend' | 'honeymoon';
  price: number;
  duration: string;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
}

export interface Villa {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  bedrooms: number;
  maxGuests: number;
  rating: number;
  images: string[];
  amenities: string[];
  description: string;
  nearbyAttractions: string[];
  availability: 'Available' | 'Filling Fast' | 'Booked';
}

export interface VisaInfo {
  country: string;
  fee: string;
  processingTime: string;
  eligibility: string;
  documents: string[];
  popular: boolean;
  flag: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  budget?: string;
  travelDate?: string;
  message?: string;
  type: 'general' | 'package' | 'villa' | 'visa' | 'ai_planner';
  status: 'new' | 'hot' | 'contacted' | 'completed';
  source: string;
  timestamp: string;
  paymentStatus?: 'pending' | 'partial' | 'paid';
  totalAmount?: number;
  amountPaid?: number;
}

export const packagesData: Package[] = [
  {
    id: 'pkg-goa',
    title: 'Goa Getaway - The Ultimate Beach Holiday',
    destination: 'Goa',
    category: 'weekend',
    price: 12999,
    duration: '3 Nights / 4 Days',
    rating: 4.8,
    image: 'https://d3k88l35vy59af.cloudfront.net/A001/11254/1745852021738.png',
    description: 'Relax on beautiful beaches, explore colonial architectures, and enjoy vibrant nightlife.',
    highlights: ['4-Star Beachside Resort Stay', 'Scuba Diving & Water Sports', 'South Goa Guided Tour', 'Daily Buffet Breakfast & Dinner']
  },
  {
    id: 'pkg-dubai',
    title: 'Mesmerising Dubai - Things to Do',
    destination: 'Dubai',
    category: 'international',
    price: 34999,
    duration: '5 Nights / 6 Days',
    rating: 4.9,
    image: 'https://d3k88l35vy59af.cloudfront.net/A001/11254/1744990736197.jpeg',
    description: 'Experience futuristic skyscrapers, luxury shopping malls, and thrilling desert adventures.',
    highlights: ['Burj Khalifa 124th Floor Entry', 'Premium Desert Safari with BBQ Dinner', 'Dhow Cruise with Marina Views', 'Dubai Frame and Museum of Future Tickets']
  },
  {
    id: 'pkg-maldives',
    title: 'Maldives : Your Dream Escape - Dive Into Paradise',
    destination: 'Maldives',
    category: 'luxury',
    price: 99999,
    duration: '4 Nights / 5 Days',
    rating: 5.0,
    image: 'https://d3k88l35vy59af.cloudfront.net/A001/11254/1745336182789.jpeg',
    description: 'Immerse yourself in sheer luxury with crystal clear turquoise lagoons and private overwater stays.',
    highlights: ['Private Overwater Villa Stay', 'Speedboat Transfers Included', 'All-Inclusive Dine Around & Alcohol Package', 'Complimentary Snorkeling & Kayaking Session']
  },
  {
    id: 'pkg-singapore',
    title: 'Singapore Extreme - A World of Wonders',
    destination: 'Singapore',
    category: 'international',
    price: 49999,
    duration: '4 Nights / 5 Days',
    rating: 4.7,
    image: 'https://d3k88l35vy59af.cloudfront.net/A001/11254/1744991158494.png',
    description: 'A perfect blend of high-tech gardens, multicultural heritage, and world-class theme parks.',
    highlights: ['Universal Studios Singapore Pass', 'Gardens by the Bay & Cloud Forest Dome', 'Night Safari & Tram Ride', 'Sentosa Cable Car and Wings of Time Show']
  },
  {
    id: 'pkg-mahabaleshwar',
    title: 'Serene Mahabaleshwar - Leisure Hotels',
    destination: 'Mahabaleshwar',
    category: 'budget',
    price: 6999,
    duration: '2 Nights / 3 Days',
    rating: 4.6,
    image: 'https://d3k88l35vy59af.cloudfront.net/A001/11254/1745852625518.jpeg',
    description: 'Escape the heat in the beautiful Sahyadri hill ranges, visiting strawberry farms and breathtaking viewpoints.',
    highlights: ['Premium Valley-View Resort', 'Mapro Garden & Panchgani Tour', 'Venna Lake Boating', 'Pratapgad Fort Trekking & Guide']
  },
  {
    id: 'pkg-bali',
    title: 'Bali Paradise - Your Dream Getaway',
    destination: 'Bali',
    category: 'honeymoon',
    price: 38999,
    duration: '6 Nights / 7 Days',
    rating: 4.8,
    image: 'https://d3k88l35vy59af.cloudfront.net/A001/11254/1744990952245.png',
    description: 'Discover rich spiritual culture, scenic rice terraces, sacred temples, and tropical beaches.',
    highlights: ['Private Ubud Pool Villa Stay', 'Bali Swing & Tegalalang Rice Terrace', 'Nusa Penida Island Tour', 'Tanah Lot Sunset Tour & Candlelight Dinner']
  }
];

export const villasData: Villa[] = [
  {
    id: 'villa-royal-lonavala',
    name: 'BookaroStays Luxury Villa',
    location: 'Lonavala, Maharashtra',
    pricePerNight: 9999,
    bedrooms: 4,
    maxGuests: 12,
    rating: 4.9,
    images: [
      'https://d3k88l35vy59af.cloudfront.net/A001/11254/1745679391779.jpeg',
      'https://d3k88l35vy59af.cloudfront.net/A001/11254/1745679377190.jpeg'
    ],
    amenities: ['Private Swimming Pool', 'Fully Equipped Kitchen', 'Billiards & Game Room', '24/7 Security', 'Lush Private Lawn', 'High-Speed Wi-Fi', 'Barbecue Station'],
    description: 'An architectural masterpiece nestled in the mist-filled hills of Lonavala. Features a massive deck, infinity-edge swimming pool, and premium interior decors designed to impress families and corporate gatherings alike.',
    nearbyAttractions: ['Tiger Point (4.5 km)', 'Bhushi Dam (3.0 km)', 'Karla Caves (8 km)'],
    availability: 'Available'
  },
  {
    id: 'villa-beachside-alibaug',
    name: 'Ananda Beach Villa Alibaug',
    location: 'Alibaug, Maharashtra',
    pricePerNight: 22000,
    bedrooms: 5,
    maxGuests: 15,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Direct Beach Access', 'Oceanfront Balcony', 'Outdoor Jacuzzi', 'Private Bar Setup', 'Caretaker & Cook Service', 'Sound System', 'Pet Friendly'],
    description: 'Walk directly from your lawn to the pristine sandy shores of Alibaug. Casa De Amor offers the perfect luxurious beach gateway with full chef services and breathtaking sunset panoramas.',
    nearbyAttractions: ['Varsoli Beach (0.2 km)', 'Kolaba Fort (2.5 km)', 'Alibaug Market (1.5 km)'],
    availability: 'Filling Fast'
  },
  {
    id: 'villa-whispering-karjat',
    name: 'Panchvati Riverside Karjat',
    location: 'Karjat, Maharashtra',
    pricePerNight: 14000,
    bedrooms: 3,
    maxGuests: 10,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Riverfront View', 'Private Plunge Pool', 'Organic Vegetable Garden', 'Gazebo Seating', 'In-house Chef', 'Board Games', 'Bonfire Setup'],
    description: 'A serene getaway bordered by a seasonal river stream and lush green mountain peaks. Ideal for travelers searching for a quiet digital detox with authentic local cuisine.',
    nearbyAttractions: ['Kondana Caves (6 km)', 'Karjat River Rafting (4.5 km)', 'Neral Hills (10 km)'],
    availability: 'Available'
  }
];

export const visasData: VisaInfo[] = [
  {
    country: 'Dubai (UAE)',
    fee: '₹6,499 onwards',
    processingTime: '3 - 5 Working Days',
    eligibility: 'Valid passport (min 6 months), passport size photo, pan card & confirmed flight tickets.',
    documents: [
      'Original Passport with at least 6 months validity',
      '2 Recent Colored Photographs (White Background, Matt Finish)',
      'PAN Card Copy',
      'Confirmed Return Flight Tickets',
      'Hotel Accommodation Details'
    ],
    popular: true,
    flag: '🇦🇪'
  },
  {
    country: 'Singapore',
    fee: '₹3,200 onwards',
    processingTime: '4 - 6 Working Days',
    eligibility: 'Indian passport holders with active bank accounts demonstrating sufficient balance.',
    documents: [
      'Original Passport with minimum 6 months validity from date of entry',
      'Visa Application Form 14A duly signed',
      '2 Recent Photos (35mm x 45mm, borderless, matte finish)',
      'Bank Statement for past 3 months',
      'Covering Letter stating the purpose of trip'
    ],
    popular: true,
    flag: '🇸🇬'
  },
  {
    country: 'Thailand',
    fee: '₹4,500 onwards',
    processingTime: '2 - 3 Working Days (Also Visa on Arrival)',
    eligibility: 'Indian citizens with clear financial assets and travel blueprints.',
    documents: [
      'Passport valid for at least 6 months from travel date',
      'Visa application form filled and signed',
      'Two recent colored photos (3.5cm x 4.5cm)',
      'Confirmed return air tickets & hotel bookings',
      'Proof of funds (at least $700 per person or $1400 per family)'
    ],
    popular: true,
    flag: '🇹🇭'
  },
  {
    country: 'Schengen (Europe)',
    fee: '₹9,800 onwards',
    processingTime: '15 - 20 Working Days',
    eligibility: 'Frequent travelers or tourists with comprehensive travel insurance and strong ties to India.',
    documents: [
      'Valid Passport and copy of previous visas',
      'Schengen Visa Application Form fully completed',
      '2 Biometric Photos (conforming to ICAO standards)',
      'Round trip flight reservation & detailed travel itinerary',
      'Travel Health Insurance with minimum €30,000 coverage',
      'ITR (Income Tax Returns) for last 3 years & Salary Slips'
    ],
    popular: true,
    flag: '🇪🇺'
  },
  {
    country: 'United States (US)',
    fee: '₹15,500 onwards',
    processingTime: 'Interview-based (Depends on slot availability)',
    eligibility: 'Requires completion of DS-160 and in-person biometrics & visa interview.',
    documents: [
      'Passport valid for at least 6 months beyond period of stay',
      'DS-160 confirmation page & Application Fee Receipt',
      'One 5cm x 5cm photograph (white background)',
      'Income details, assets, employment documents',
      'Detailed travel plan and purpose of visit'
    ],
    popular: false,
    flag: '🇺🇸'
  },
  {
    country: 'China',
    fee: '₹5,900 onwards',
    processingTime: '4 - 7 Working Days',
    eligibility: 'Tourists or business visitors with valid round trip confirmations.',
    documents: [
      'Passport with at least two blank pages and 6 months validity',
      'China Visa Application Form with high-quality photo',
      'Detailed hotel reservations & daily tour itinerary',
      'Round-trip flight booking confirmation'
    ],
    popular: false,
    flag: '🇨🇳'
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'ld-1',
    name: 'Rajesh Sharma',
    phone: '9876543210',
    email: 'rajesh.sharma@gmail.com',
    destination: 'Dubai',
    budget: '₹60,000 - ₹80,000',
    travelDate: '2026-07-15',
    message: 'Looking for a budget family package for 4 adults.',
    type: 'package',
    status: 'new',
    source: 'Holiday Package Enquiry',
    timestamp: '2026-06-02 10:15 AM'
  },
  {
    id: 'ld-2',
    name: 'Amit Patel',
    phone: '9123456789',
    email: 'amit.patel@yahoo.com',
    destination: 'Royal Crest Villa Lonavala',
    budget: '₹20,000',
    travelDate: '2026-06-20',
    message: 'Want to book for a weekend bachelor party of 12 guests.',
    type: 'villa',
    status: 'hot',
    source: 'Villa Booking Form',
    timestamp: '2026-06-02 11:30 AM'
  },
  {
    id: 'ld-3',
    name: 'Sneha Kulkarni',
    phone: '9812763450',
    email: 'sneha.k@hotmail.com',
    destination: 'Singapore',
    type: 'visa',
    status: 'contacted',
    source: 'Visa Enquiry Form',
    timestamp: '2026-06-01 04:45 PM'
  },
  {
    id: 'ld-4',
    name: 'Vikram Singh',
    phone: '9988776655',
    email: 'vikram.singh@gmail.com',
    destination: 'Maldives',
    budget: '₹1,50,000',
    travelDate: '2026-08-10',
    message: 'Honeymoon package booked.',
    type: 'package',
    status: 'completed',
    source: 'Holiday Package Enquiry',
    timestamp: '2026-05-28 02:15 PM',
    paymentStatus: 'partial',
    totalAmount: 150000,
    amountPaid: 50000
  },
  {
    id: 'ld-5',
    name: 'Priya Desai',
    phone: '9876501234',
    email: 'priya.desai@outlook.com',
    destination: 'Ananda Beach Villa Alibaug',
    budget: '₹44,000',
    travelDate: '2026-07-05',
    message: 'Family weekend getaway confirmed.',
    type: 'villa',
    status: 'completed',
    source: 'Villa Booking Form',
    timestamp: '2026-05-25 11:10 AM',
    paymentStatus: 'paid',
    totalAmount: 44000,
    amountPaid: 44000
  },
  {
    id: 'ld-6',
    name: 'Neha Gupta',
    phone: '9845123456',
    email: 'neha.gpt89@gmail.com',
    destination: 'Bali',
    budget: '₹95,000',
    travelDate: '2026-09-01',
    message: 'Need a customized romantic itinerary for our anniversary.',
    type: 'ai_planner',
    status: 'new',
    source: 'AI Trip Planner',
    timestamp: '2026-06-03 08:20 AM'
  },
  {
    id: 'ld-7',
    name: 'Dr. Sameer Reddy',
    phone: '9100022334',
    email: 'drsameer@apollo.in',
    destination: 'Schengen (Europe)',
    type: 'visa',
    status: 'hot',
    source: 'Visa Enquiry Form',
    timestamp: '2026-06-03 09:15 AM'
  },
  {
    id: 'ld-8',
    name: 'Kavita Menon',
    phone: '9988112233',
    destination: 'Panchvati Riverside Karjat',
    budget: '₹28,000',
    travelDate: '2026-06-15',
    message: 'Corporate team outing for 10 people. Need projector and BBQ.',
    type: 'villa',
    status: 'contacted',
    source: 'Villa Booking Form',
    timestamp: '2026-06-02 02:40 PM'
  },
  {
    id: 'ld-9',
    name: 'Anil Kapoor',
    phone: '9870098700',
    email: 'anil.k@corporate.com',
    destination: 'Singapore',
    budget: '₹4,50,000',
    travelDate: '2026-07-22',
    message: 'Group booking for 15 employees. All inclusive.',
    type: 'package',
    status: 'completed',
    source: 'Holiday Package Enquiry',
    timestamp: '2026-05-20 11:30 AM',
    paymentStatus: 'paid',
    totalAmount: 450000,
    amountPaid: 450000
  },
  {
    id: 'ld-10',
    name: 'Rohan Mehta',
    phone: '9922334455',
    destination: 'Goa',
    budget: '₹35,000',
    travelDate: '2026-06-25',
    message: 'Looking for beachfront properties in North Goa.',
    type: 'ai_planner',
    status: 'hot',
    source: 'AI Trip Planner',
    timestamp: '2026-06-03 10:05 AM'
  },
  {
    id: 'ld-11',
    name: 'Meera Rajput',
    phone: '9811223344',
    email: 'meera.art@yahoo.com',
    destination: 'United States (US)',
    type: 'visa',
    status: 'completed',
    source: 'Visa Enquiry Form',
    timestamp: '2026-05-15 03:20 PM',
    paymentStatus: 'pending',
    totalAmount: 15500,
    amountPaid: 0
  },
  {
    id: 'ld-12',
    name: 'Suresh Raina',
    phone: '9900119900',
    destination: 'Mahabaleshwar',
    budget: '₹12,000',
    travelDate: '2026-06-10',
    message: 'Budget trip with friends. Need near market.',
    type: 'package',
    status: 'new',
    source: 'Holiday Package Enquiry',
    timestamp: '2026-06-03 11:50 AM'
  },
  {
    id: 'ld-13',
    name: 'Aarti Chhabra',
    phone: '9822334455',
    email: 'aarti.c@outlook.com',
    destination: 'BookaroStays Luxury Villa',
    budget: '₹20,000',
    travelDate: '2026-08-15',
    message: 'Independence day long weekend booking.',
    type: 'villa',
    status: 'completed',
    source: 'Villa Booking Form',
    timestamp: '2026-05-10 09:15 AM',
    paymentStatus: 'partial',
    totalAmount: 20000,
    amountPaid: 5000
  },
  {
    id: 'ld-14',
    name: 'Gaurav Khanna',
    phone: '9155667788',
    destination: 'Thailand',
    budget: '₹45,000',
    travelDate: '2026-07-05',
    message: 'Bachelor party planning.',
    type: 'ai_planner',
    status: 'contacted',
    source: 'AI Trip Planner',
    timestamp: '2026-06-01 01:25 PM'
  },
  {
    id: 'ld-15',
    name: 'Pooja Hegde',
    phone: '9988771122',
    email: 'pooja.h@gmail.com',
    destination: 'Dubai',
    type: 'visa',
    status: 'new',
    source: 'Visa Enquiry Form',
    timestamp: '2026-06-03 12:30 PM'
  }
];
