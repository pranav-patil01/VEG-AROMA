export const CATEGORIES = [
  { id: 'beverages', name: 'Beverages', emoji: '🥤' },
  { id: 'soups', name: 'Soups', emoji: '🍲' },
  { id: 'starters', name: 'Starters', emoji: '🥘' },
  { id: 'lite_starters', name: 'Lite Starters', emoji: '🍟' },
  { id: 'main_course', name: 'Main Course', emoji: '🍛' },
  { id: 'kofta', name: 'Kofta Special', emoji: '🥙' },
  { id: 'dal', name: 'Dal', emoji: '🫘' },
  { id: 'sweet', name: 'Sweet Special', emoji: '🍮' },
  { id: 'basmati', name: 'Basmati & Rice', emoji: '🍚' },
  { id: 'noodles', name: 'Rice & Noodles', emoji: '🍜' },
  { id: 'bread', name: 'Roti & Bread', emoji: '🫓' },
]

export const IMAGES = {
  beverages: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80',
  soups: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80',
  paneer: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80',
  fried: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80',
  curry: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80',
  dal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80',
  rice: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=500&q=80',
  noodles: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80',
  bread: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80',
  palak: 'https://images.unsplash.com/photo-1656686461797-39a76c9d5a08?w=500&q=80',
  chips: 'https://images.unsplash.com/photo-1630851840633-f96999247032?w=500&q=80',
  kofta: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80',
  sweet: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
  lassi: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500&q=80',
}

let _id = 1
const mkId = () => `item-${_id++}`

export const initialMenuData = [
  // BEVERAGES
  { id: mkId(), category: 'beverages', name: 'Mineral Water', price: 20, image: IMAGES.beverages, description: 'Chilled packaged mineral water', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Tea', price: 25, image: IMAGES.beverages, description: 'Freshly brewed chai with milk, ginger and cardamom', available: true, popular: true },
  { id: mkId(), category: 'beverages', name: 'Milk Glass', price: 70, image: IMAGES.beverages, description: 'Full-cream warm or cold milk', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Ness Coffee', price: 45, image: IMAGES.beverages, description: 'Instant coffee with hot milk and sugar', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Cold Drink 300ml', price: 25, image: IMAGES.beverages, description: 'Chilled 300ml soft drink', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Cold Drink 500ml', price: 50, image: IMAGES.beverages, description: 'Chilled 500ml soft drink', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Fresh Lime Soda', price: 60, image: IMAGES.beverages, description: 'Fresh lime with chilled soda and mint', available: true, popular: true },
  { id: mkId(), category: 'beverages', name: 'Fresh Lime Water', price: 45, image: IMAGES.beverages, description: 'Fresh lime with chilled water and sugar', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Butter Milk', price: 30, image: IMAGES.lassi, description: 'Cool spiced chaas with cumin and ginger', available: true, popular: false },
  { id: mkId(), category: 'beverages', name: 'Lassi', price: 65, image: IMAGES.lassi, description: 'Thick creamy blended yogurt drink', available: true, popular: true },
  { id: mkId(), category: 'beverages', name: 'Lassi Special', price: 85, image: IMAGES.lassi, description: 'Premium thick lassi with fresh fruits', available: true, popular: false },

  // SOUPS
  { id: mkId(), category: 'soups', name: 'Veg Manchow Soup', price: 110, image: IMAGES.soups, description: 'Classic Indo-Chinese soup with crispy noodles', available: true, popular: true },
  { id: mkId(), category: 'soups', name: 'Veg Hot & Sour Soup', price: 110, image: IMAGES.soups, description: 'Tangy and spicy soup with vegetables', available: true, popular: false },

  // STARTERS
  { id: mkId(), category: 'starters', name: 'Gobi Manchurian', price: 150, image: IMAGES.fried, description: 'Crispy cauliflower in Manchurian sauce', available: true, popular: true },
  { id: mkId(), category: 'starters', name: 'Crispy Chilly Potato', price: 170, image: IMAGES.chips, description: 'Golden potato strips with chilli and soy glaze', available: true, popular: true },
  { id: mkId(), category: 'starters', name: 'Cheese Garlic Ball', price: 190, image: IMAGES.sweet, description: 'Crispy cheese balls stuffed with garlic and herbs', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Paneer Chilly / Dry', price: 200, image: IMAGES.paneer, description: 'Crispy paneer tossed with green chillies and capsicum', available: true, popular: true },
  { id: mkId(), category: 'starters', name: 'Paneer Manchurian / Dry', price: 210, image: IMAGES.paneer, description: 'Crispy paneer dumplings in Manchurian sauce', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Veg Hot Garlic', price: 180, image: IMAGES.fried, description: 'Mixed vegetables in fiery hot garlic sauce', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Veg Gold Finger', price: 190, image: IMAGES.chips, description: 'Golden fried vegetable fingers', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Paneer Hot Garlic', price: 240, image: IMAGES.paneer, description: 'Paneer cubes in bold hot garlic sauce', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Paneer Schezwan', price: 240, image: IMAGES.paneer, description: 'Crispy paneer in fiery Schezwan sauce', available: true, popular: true },
  { id: mkId(), category: 'starters', name: 'Paneer 65', price: 230, image: IMAGES.paneer, description: 'South-Indian crispy fried paneer with curry leaves', available: true, popular: true },
  { id: mkId(), category: 'starters', name: 'Paneer Dragon', price: 250, image: IMAGES.paneer, description: 'Intensely spicy paneer with dragon sauce', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Mushroom Chilly', price: 210, image: IMAGES.fried, description: 'Crispy mushrooms tossed with chillies', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Corn Crispy', price: 190, image: IMAGES.chips, description: 'Sweet corn in spiced batter, deep-fried golden', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Veg Harabhara Kabab', price: 180, image: IMAGES.fried, description: 'Soft spinach, peas and paneer patties', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Paneer Pakoda', price: 180, image: IMAGES.paneer, description: 'Paneer slices in spiced gram flour batter', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Chana Chat', price: 140, image: IMAGES.fried, description: 'Chickpea chaat with chutneys and sev', available: true, popular: false },
  { id: mkId(), category: 'starters', name: 'Aloo Chat', price: 130, image: IMAGES.chips, description: 'Crispy potato pieces with chutneys', available: true, popular: false },

  // LITE STARTERS
  { id: mkId(), category: 'lite_starters', name: 'Finger Chips / Masala', price: 130, image: IMAGES.chips, description: 'Crispy golden potato finger chips', available: true, popular: true },
  { id: mkId(), category: 'lite_starters', name: 'Mix Veg Pakoda', price: 140, image: IMAGES.fried, description: 'Assorted vegetable fritters in gram flour batter', available: true, popular: false },

  // MAIN COURSE
  { id: mkId(), category: 'main_course', name: 'Akshay Special', price: 390, image: IMAGES.curry, description: "Chef's signature grand vegetarian platter", available: true, popular: true },
  { id: mkId(), category: 'main_course', name: 'Mix Veg', price: 145, image: IMAGES.curry, description: 'Seasonal vegetables in fragrant tomato gravy', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Veg Handi', price: 175, image: IMAGES.curry, description: 'Slow-cooked vegetables in a handi with cream', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Veg Kadai', price: 170, image: IMAGES.curry, description: 'Vegetables in bold kadai masala with bell peppers', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Veg Kolhapuri', price: 155, image: IMAGES.curry, description: 'Fiery Maharashtrian curry with coconut', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Paneer Masala', price: 190, image: IMAGES.paneer, description: 'Paneer in rich tomato-onion masala gravy', available: true, popular: true },
  { id: mkId(), category: 'main_course', name: 'Paneer Tikka Masala', price: 200, image: IMAGES.paneer, description: 'Tandoor-grilled paneer in creamy tikka masala', available: true, popular: true },
  { id: mkId(), category: 'main_course', name: 'Palak Paneer', price: 190, image: IMAGES.palak, description: 'Fresh spinach purée with soft paneer', available: true, popular: true },
  { id: mkId(), category: 'main_course', name: 'Paneer Butter M/S', price: 205, image: IMAGES.paneer, description: 'Velvety tomato-cashew gravy with paneer', available: true, popular: true },
  { id: mkId(), category: 'main_course', name: 'Paneer Angaara', price: 240, image: IMAGES.paneer, description: 'Smoky char-grilled paneer in fiery masala', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Mutter Paneer', price: 190, image: IMAGES.paneer, description: 'Classic green peas and paneer in smooth gravy', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Mushroom M/S', price: 190, image: IMAGES.fried, description: 'Fresh mushrooms in fragrant masala gravy', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Dal Makhani', price: 180, image: IMAGES.dal, description: 'Slow-cooked black lentils with butter and cream', available: true, popular: true },
  { id: mkId(), category: 'main_course', name: 'Aloo Gobi', price: 140, image: IMAGES.curry, description: 'Potato and cauliflower dry curry', available: true, popular: false },
  { id: mkId(), category: 'main_course', name: 'Methi Mutter Malai', price: 220, image: IMAGES.palak, description: 'Fenugreek with peas in rich cream gravy', available: true, popular: false },

  // KOFTA
  { id: mkId(), category: 'kofta', name: 'Veg Diwan E-Khas', price: 210, image: IMAGES.kofta, description: 'Royal Mughal-inspired kofta with rich gravy', available: true, popular: false },
  { id: mkId(), category: 'kofta', name: 'Veg Kofta', price: 180, image: IMAGES.kofta, description: 'Soft vegetable dumplings in tomato-cream gravy', available: true, popular: true },
  { id: mkId(), category: 'kofta', name: 'Paneer Kofta', price: 220, image: IMAGES.paneer, description: 'Soft paneer dumplings in rich creamy gravy', available: true, popular: false },
  { id: mkId(), category: 'kofta', name: 'Malai Kofta', price: 270, image: IMAGES.kofta, description: 'Paneer and potato dumplings in creamy gravy', available: true, popular: true },
  { id: mkId(), category: 'kofta', name: 'Paneer Pasanda', price: 250, image: IMAGES.paneer, description: 'Stuffed paneer slices in silky cream gravy', available: true, popular: false },

  // DAL
  { id: mkId(), category: 'dal', name: 'Dal Fry', price: 130, image: IMAGES.dal, description: 'Yellow lentils tempered with cumin and garlic', available: true, popular: true },
  { id: mkId(), category: 'dal', name: 'Dal Tadka', price: 140, image: IMAGES.dal, description: 'Dal with robust tempering of ghee and spices', available: true, popular: false },
  { id: mkId(), category: 'dal', name: 'Butter Dal Fry', price: 155, image: IMAGES.dal, description: 'Dal fry enriched with extra butter', available: true, popular: false },
  { id: mkId(), category: 'dal', name: 'Dal Makhani', price: 180, image: IMAGES.dal, description: 'Slow-cooked black lentils with butter and cream', available: true, popular: true },
  { id: mkId(), category: 'dal', name: 'Dal Palak', price: 150, image: IMAGES.dal, description: 'Yellow lentils cooked with fresh spinach', available: true, popular: false },

  // SWEET SPECIAL
  { id: mkId(), category: 'sweet', name: 'Nargis Kopta', price: 260, image: IMAGES.kofta, description: 'Egg-shaped kofta in rich aromatic gravy', available: true, popular: false },
  { id: mkId(), category: 'sweet', name: 'Paneer Makmali', price: 300, image: IMAGES.paneer, description: 'Velvety paneer in luxurious cream gravy', available: true, popular: true },
  { id: mkId(), category: 'sweet', name: 'Malai Kofta', price: 270, image: IMAGES.kofta, description: 'Soft kofta in creamy, mildly sweet gravy', available: true, popular: false },
  { id: mkId(), category: 'sweet', name: 'Kaju Kari', price: 210, image: IMAGES.sweet, description: 'Whole cashews in rich fragrant curry', available: true, popular: false },

  // BASMATI & RICE
  { id: mkId(), category: 'basmati', name: 'Jeera Rice', price: 120, image: IMAGES.rice, description: 'Fluffy basmati tempered with cumin and ghee', available: true, popular: false },
  { id: mkId(), category: 'basmati', name: 'Steam Rice', price: 110, image: IMAGES.rice, description: 'Plain steamed long-grain basmati rice', available: true, popular: false },
  { id: mkId(), category: 'basmati', name: 'Veg Biryani', price: 170, image: IMAGES.biryani, description: 'Aromatic basmati layered with spiced vegetables', available: true, popular: true },
  { id: mkId(), category: 'basmati', name: 'Paneer Biryani', price: 210, image: IMAGES.biryani, description: 'Aromatic basmati with spiced paneer and saffron', available: true, popular: true },
  { id: mkId(), category: 'basmati', name: 'Veg Dum Biryani', price: 220, image: IMAGES.biryani, description: 'Slow-cooked dum biryani for intense flavour', available: true, popular: false },
  { id: mkId(), category: 'basmati', name: 'Dal Khichdi', price: 140, image: IMAGES.dal, description: 'Comforting one-pot rice and lentils', available: true, popular: false },
  { id: mkId(), category: 'basmati', name: 'Mushroom Biryani', price: 200, image: IMAGES.biryani, description: 'Fragrant basmati with spiced mushrooms', available: true, popular: false },
  { id: mkId(), category: 'basmati', name: 'Lemon Rice', price: 150, image: IMAGES.rice, description: 'South-Indian tangy lemon rice', available: true, popular: false },

  // RICE & NOODLES
  { id: mkId(), category: 'noodles', name: 'Veg Fried Rice', price: 140, image: IMAGES.rice, description: 'Wok-tossed rice with vegetables and soy sauce', available: true, popular: true },
  { id: mkId(), category: 'noodles', name: 'Veg Schezwan Rice', price: 160, image: IMAGES.rice, description: 'Fiery wok-fried rice with Schezwan sauce', available: true, popular: false },
  { id: mkId(), category: 'noodles', name: 'Manchurian Rice', price: 160, image: IMAGES.rice, description: 'Rice tossed with Manchurian sauce', available: true, popular: false },
  { id: mkId(), category: 'noodles', name: 'Veg Hakka Noodles', price: 135, image: IMAGES.noodles, description: 'Stir-fried noodles with julienned vegetables', available: true, popular: true },
  { id: mkId(), category: 'noodles', name: 'Schezwan Noodle', price: 150, image: IMAGES.noodles, description: 'Spicy noodles with Schezwan sauce', available: true, popular: false },
  { id: mkId(), category: 'noodles', name: 'Manchurian Noodles', price: 160, image: IMAGES.noodles, description: 'Noodles with Manchurian sauce and dumplings', available: true, popular: false },
  { id: mkId(), category: 'noodles', name: 'Mushroom Noodles', price: 165, image: IMAGES.noodles, description: 'Stir-fried noodles with mushrooms', available: true, popular: false },

  // ROTI & BREAD
  { id: mkId(), category: 'bread', name: 'Tandoori Roti', price: 17, image: IMAGES.bread, description: 'Whole wheat flatbread from the tandoor', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Tandoori Butter Roti', price: 22, image: IMAGES.bread, description: 'Tandoori roti brushed with butter', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Plain Nan', price: 45, image: IMAGES.bread, description: 'Classic soft leavened flatbread', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Butter Nan', price: 50, image: IMAGES.bread, description: 'Soft naan brushed with butter', available: true, popular: true },
  { id: mkId(), category: 'bread', name: 'Garlic Nan', price: 65, image: IMAGES.bread, description: 'Naan topped with minced garlic and coriander', available: true, popular: true },
  { id: mkId(), category: 'bread', name: 'Tawa Chapati', price: 15, image: IMAGES.bread, description: 'Simple whole wheat chapati', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Lachha Paratha', price: 40, image: IMAGES.bread, description: 'Flaky layered whole wheat paratha', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Cheese Nan', price: 80, image: IMAGES.bread, description: 'Naan generously stuffed with melted cheese', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Paneer Paratha', price: 100, image: IMAGES.bread, description: 'Paratha stuffed with spiced fresh paneer', available: true, popular: true },
  { id: mkId(), category: 'bread', name: 'Garlic Chilly Cheese Nan', price: 120, image: IMAGES.bread, description: 'Naan with cheese, garlic and green chillies', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Aloo Paratha', price: 80, image: IMAGES.bread, description: 'Classic paratha with spiced potato filling', available: true, popular: false },
  { id: mkId(), category: 'bread', name: 'Gobi Paratha', price: 80, image: IMAGES.bread, description: 'Paratha with spiced cauliflower', available: true, popular: false },
]
