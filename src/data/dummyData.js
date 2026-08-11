export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'LayoutGrid', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'Books', label: 'Books', icon: 'BookOpen', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  { id: 'Electronics', label: 'Electronics', icon: 'Laptop', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { id: 'Cycles', label: 'Cycles', icon: 'Bike', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { id: 'Hostel Essentials', label: 'Hostel Essentials', icon: 'Home', color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' },
  { id: 'Furniture', label: 'Furniture', icon: 'Armchair', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: 'Stationery', label: 'Stationery', icon: 'PenTool', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'Fashion', label: 'Fashion', icon: 'Shirt', color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { id: 'Others', label: 'Others', icon: 'MoreHorizontal', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
];

export const HOSTELS = [
  'All Hostels',
  'HOSTEL-1',
  'HOSTEL-2',
  'HOSTEL-3',
  'HOSTEL-4',
  'HOSTEL-5',
  'HOSTEL-6',
  'HOSTEL-7',
  'HOSTEL-8',
  'HOSTEL-9',
  'HOSTEL-10',
  'HOSTEL-11',
  'HOSTEL-12',
  'HOSTEL-13'
];

export const CONDITIONS = [
  'Brand New',
  'Like New',
  'Good',
  'Fair'
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Engineering Mathematics - HK Dass (8th Ed.)',
    price: 350,
    originalPrice: 750,
    category: 'Books',
    condition: 'Like New',
    hostel: 'Bhabha Hall (H-1)',
    postedTime: '2026-08-02T14:30:00Z',
    isSold: false,
    featured: true,
    views: 142,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Standard textbook for 1st & 2nd year B.Tech students. Pages are clean without any pen markings or highlighted text. Comes with formula cheat-sheet index.',
    seller: {
      id: 'usr-101',
      name: 'Rohan Sharma',
      email: 'rohan.cse24@college.edu',
      phone: '+91 98765 43210',
      whatsapp: '919876543210',
      hostel: 'Bhabha Hall (H-1)',
      room: 'Room 204, Block B',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      rating: 4.8,
      totalListings: 4,
      soldCount: 2,
      verifiedStudent: true,
      department: 'Computer Science (3rd Year)'
    }
  },
  {
    id: 'prod-2',
    title: 'Hero Sprint 21-Speed Hybrid Bicycle',
    price: 4200,
    originalPrice: 9500,
    category: 'Cycles',
    condition: 'Good',
    hostel: 'Tagore Hall (H-3)',
    postedTime: '2026-08-01T09:15:00Z',
    isSold: false,
    featured: true,
    views: 310,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Smooth gear shift bicycle with front disc brakes. Includes sturdy combination lock, gel seat cover, and frame pump. Great for traveling between hostel and department labs.',
    seller: {
      id: 'usr-102',
      name: 'Aman Verma',
      email: 'aman.mech23@college.edu',
      phone: '+91 91234 56789',
      whatsapp: '919123456789',
      hostel: 'Tagore Hall (H-3)',
      room: 'Room 112, Block A',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200',
      rating: 4.9,
      totalListings: 3,
      soldCount: 1,
      verifiedStudent: true,
      department: 'Mechanical Engg (4th Year)'
    }
  },
  {
    id: 'prod-3',
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    price: 850,
    originalPrice: 1595,
    category: 'Electronics',
    condition: 'Like New',
    hostel: 'Visvesvaraya Hall (H-4)',
    postedTime: '2026-08-03T08:00:00Z',
    isSold: false,
    featured: false,
    views: 88,
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'High-resolution display, 552 functions, matrix solver, spreadsheet integration. Allowed in mid-term and semester end exams. Original hard cover included.',
    seller: {
      id: 'usr-103',
      name: 'Priyanjali Roy',
      email: 'priya.ece25@college.edu',
      phone: '+91 99887 76655',
      whatsapp: '919988776655',
      hostel: 'Visvesvaraya Hall (H-4)',
      room: 'Room 305',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      totalListings: 2,
      soldCount: 1,
      verifiedStudent: true,
      department: 'Electronics & Comm (2nd Year)'
    }
  },
  {
    id: 'prod-4',
    title: 'Pigeon 1.5L Stainless Steel Electric Kettle',
    price: 490,
    originalPrice: 1199,
    category: 'Hostel Essentials',
    condition: 'Good',
    hostel: 'Gargi Hostel (Girls H-2)',
    postedTime: '2026-08-02T18:45:00Z',
    isSold: false,
    featured: true,
    views: 204,
    images: [
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lifesaver for late night study sessions! Boils water, Maggie, and coffee in under 3 minutes. Auto shut-off feature with indicator light.',
    seller: {
      id: 'usr-104',
      name: 'Sneha Patel',
      email: 'sneha.ee24@college.edu',
      phone: '+91 98221 14433',
      whatsapp: '919822114433',
      hostel: 'Gargi Hostel (Girls H-2)',
      room: 'Room 410',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      rating: 4.7,
      totalListings: 5,
      soldCount: 3,
      verifiedStudent: true,
      department: 'Electrical Engg (3rd Year)'
    }
  },
  {
    id: 'prod-5',
    title: 'Ergonomic Wooden Study Table & Adjustable Chair',
    price: 1800,
    originalPrice: 4200,
    category: 'Furniture',
    condition: 'Good',
    hostel: 'Aryabhatta Hall (H-6)',
    postedTime: '2026-07-31T11:20:00Z',
    isSold: false,
    featured: false,
    views: 175,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Compact wooden table designed to fit hostel rooms. Includes a drawer and side shelf for books. Chair has comfortable mesh backrest.',
    seller: {
      id: 'usr-105',
      name: 'Karthik Nair',
      email: 'karthik.civil23@college.edu',
      phone: '+91 97766 55443',
      whatsapp: '919776655443',
      hostel: 'Aryabhatta Hall (H-6)',
      room: 'Room 108',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 4.6,
      totalListings: 2,
      soldCount: 0,
      verifiedStudent: true,
      department: 'Civil Engg (4th Year)'
    }
  },
  {
    id: 'prod-6',
    title: 'Complete Engineering Drawing Kit (Mini Drafter + Board)',
    price: 600,
    originalPrice: 1500,
    category: 'Stationery',
    condition: 'Like New',
    hostel: 'Bhabha Hall (H-1)',
    postedTime: '2026-08-03T10:10:00Z',
    isSold: false,
    featured: false,
    views: 95,
    images: [
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Includes Omega Mini Drafter with clamp, A2 drawing board, set squares, T-scale, compass box, and waterproof drawing container tube.',
    seller: {
      id: 'usr-101',
      name: 'Rohan Sharma',
      email: 'rohan.cse24@college.edu',
      phone: '+91 98765 43210',
      whatsapp: '919876543210',
      hostel: 'Bhabha Hall (H-1)',
      room: 'Room 204, Block B',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      rating: 4.8,
      totalListings: 4,
      soldCount: 2,
      verifiedStudent: true,
      department: 'Computer Science (3rd Year)'
    }
  },
  {
    id: 'prod-7',
    title: 'Logitech G102 Lightsync RGB Gaming Mouse',
    price: 750,
    originalPrice: 1695,
    category: 'Electronics',
    condition: 'Brand New',
    hostel: 'Sarojini Naidu Hostel (H-5)',
    postedTime: '2026-08-02T20:00:00Z',
    isSold: false,
    featured: true,
    views: 280,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Unopened box! 8000 DPI gaming sensor, customizable RGB color wave, 6 programmable buttons. Selling because I received another mouse as a birthday gift.',
    seller: {
      id: 'usr-106',
      name: 'Ananya Gupta',
      email: 'ananya.it25@college.edu',
      phone: '+91 95544 33221',
      whatsapp: '919554433221',
      hostel: 'Sarojini Naidu Hostel (H-5)',
      room: 'Room 312',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 4.9,
      totalListings: 3,
      soldCount: 2,
      verifiedStudent: true,
      department: 'Information Tech (2nd Year)'
    }
  },
  {
    id: 'prod-8',
    title: 'Kadence Acoustic Guitar with Bag & Picks',
    price: 2900,
    originalPrice: 6500,
    category: 'Others',
    condition: 'Good',
    hostel: 'Day Scholars / Off-Campus',
    postedTime: '2026-07-29T16:00:00Z',
    isSold: true,
    featured: false,
    views: 412,
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80&w=800'
    ],
    description: '40-inch spruce wood acoustic guitar. Excellent warm tone. Comes with padded shoulder bag, extra string set, tuner, and capo.',
    seller: {
      id: 'usr-107',
      name: 'Vikramaditya Rao',
      email: 'vikram.ch23@college.edu',
      phone: '+91 94433 22110',
      whatsapp: '919443322110',
      hostel: 'Day Scholars / Off-Campus',
      room: 'Flat 302, Green Avenue',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      totalListings: 6,
      soldCount: 4,
      verifiedStudent: true,
      department: 'Chemical Engg (4th Year)'
    }
  }
];

export const CURRENT_USER = {
  id: 'usr-me',
  name: 'Alex Johnson',
  email: 'alex.johnson24@college.edu',
  phone: '+91 98765 00000',
  whatsapp: '919876500000',
  hostel: 'Bhabha Hall (H-1)',
  room: 'Room 314, Block C',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  department: 'Computer Science (3rd Year)',
  verifiedStudent: true,
  bio: 'CS Undergrad | Tech Enthusiast | Selling old textbooks & gadgets',
  rating: 4.9,
  memberSince: 'August 2024'
};
