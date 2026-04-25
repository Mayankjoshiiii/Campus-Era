type PG = {
  id: string;
  title: string;
  type: string;
  location: string;
  university: string;
  price: number;
  rating: number;
  reviews: number;
  contact: string;
  amenities: string[];
  image: string;
};

type Mess = {
  id: string;
  name: string;
  foodtype: "veg" | "nonveg" | "both";
  location: string;
  university: string;
  pricepermonth: number;
  timings: string;
  rating: number;
  reviews: number;
  contact: string;
  menu: string[];
  image: string;
};
export const ROOMS: PG[] = [  { id: "r1", title: "Sunrise PG for Boys", type: "Double", location: "Kamla Nagar, Delhi", university: "Delhi University", price: 7500, rating: 4.6, reviews: 38, contact: "+91 98765 43210", amenities: ["WiFi", "AC", "Meals", "Laundry", "24×7 Security", "CCTV"], image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80" },
  { id: "r2", title: "GreenLeaf Girls Hostel", type: "Single", location: "Laxmi Nagar, Delhi", university: "GGSIPU", price: 9000, rating: 4.8, reviews: 62, contact: "+91 91234 56789", amenities: ["WiFi", "AC", "Meals", "Gym", "Study Room", "CCTV"], image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
  { id: "r3", title: "Royal Stay PG", type: "Triple", location: "Mukherjee Nagar, Delhi", university: "Delhi University", price: 5500, rating: 4.3, reviews: 24, contact: "+91 99887 76655", amenities: ["WiFi", "Meals", "Laundry", "Power Backup"], image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { id: "r4", title: "Urban Nest Coed PG", type: "Double", location: "Noida Sector 62", university: "Amity University", price: 8200, rating: 4.5, reviews: 41, contact: "+91 98112 34567", amenities: ["WiFi", "AC", "Gym", "Parking", "24×7 Security"], image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
  { id: "r5", title: "Comfort Zone Boys PG", type: "Single", location: "GTB Nagar, Delhi", university: "Delhi University", price: 10000, rating: 4.7, reviews: 55, contact: "+91 87654 32109", amenities: ["WiFi", "AC", "Meals", "Laundry", "Study Room"], image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80" },
  { id: "r6", title: "Cozy Corner PG", type: "Double", location: "Rohini Sector 8, Delhi", university: "NSIT", price: 6800, rating: 4.2, reviews: 19, contact: "+91 76543 21098", amenities: ["WiFi", "Meals", "CCTV", "Power Backup"], image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" },
];

export const MESS: Mess[] = [  { id: "m1", name: "Maa Ki Rasoi", foodtype: "veg", location: "Kamla Nagar, Delhi", university: "Delhi University", pricepermonth: 2800, timings: "8 AM – 10 PM", rating: 4.7, reviews: 89, contact: "+91 98765 11111", menu: ["Roti", "Dal", "Sabzi", "Rice", "Salad", "Pickle", "Buttermilk"], image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80" },
  { id: "m2", name: "Spice Garden Mess", foodtype: "both", location: "Mukherjee Nagar, Delhi", university: "Delhi University", pricepermonth: 3200, timings: "7 AM – 11 PM", rating: 4.5, reviews: 54, contact: "+91 91111 22222", menu: ["Roti", "Dal", "Sabzi", "Chicken Curry", "Rice", "Raita", "Dessert"], image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80" },
  { id: "m3", name: "Tiffin Wala", foodtype: "veg", location: "GTB Nagar, Delhi", university: "Delhi University", pricepermonth: 2500, timings: "12 PM – 10 PM", rating: 4.3, reviews: 31, contact: "+91 92222 33333", menu: ["Roti", "Dal", "Sabzi", "Rice", "Sweet"], image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80" },
  { id: "m4", name: "Punjabi Tadka Mess", foodtype: "both", location: "Noida Sector 62", university: "Amity University", pricepermonth: 3500, timings: "7 AM – 11 PM", rating: 4.6, reviews: 67, contact: "+91 93333 44444", menu: ["Paratha", "Dal Makhni", "Paneer", "Chicken", "Rice", "Lassi"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80" },
  { id: "m5", name: "South Indian Swaad", foodtype: "veg", location: "Laxmi Nagar, Delhi", university: "GGSIPU", pricepermonth: 2600, timings: "7:30 AM – 9:30 PM", rating: 4.4, reviews: 42, contact: "+91 94444 55555", menu: ["Idli", "Dosa", "Sambhar", "Upma", "Rice", "Rasam", "Chutney"], image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80" },
  { id: "m6", name: "Annapurna Tiffin", foodtype: "veg", location: "Rohini Sector 8, Delhi", university: "NSIT", pricepermonth: 2400, timings: "8 AM – 9 PM", rating: 4.1, reviews: 22, contact: "+91 95555 66666", menu: ["Roti", "Dal", "Sabzi", "Rice", "Curd"], image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80" },
];

export const FEATURES = [
  { icon: "🏠", title: "PG & Room Finder",    desc: "Browse verified PGs with real photos, honest reviews, and upfront pricing. Filter by location, type, and amenities." },
  { icon: "🍽️", title: "Mess Services",       desc: "Discover local mess and tiffin options with weekly menus, food type preferences, and student ratings." },
  { icon: "🤝", title: "Roommate Finder",     desc: "Match with compatible roommates based on lifestyle, budget, and location — no awkward cold calls." },
  { icon: "🛒", title: "Student Marketplace", desc: "Buy and sell used textbooks, electronics, and furniture within your campus community." },
  { icon: "📍", title: "Lost & Found",        desc: "Report and recover lost items across your campus with community-powered tracking." },
  { icon: "💬", title: "Campus Discussions",  desc: "A Reddit-style board for your college — ask seniors, share tips, find study groups." },
];