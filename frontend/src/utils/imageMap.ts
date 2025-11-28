// Utility to map dish names or cuisine to public images in `/public/images`.
// Uses file paths (served statically) rather than bundler imports.
const IMG = {
  CAFE: '/Images/Cafe.jpg',
  CHINESE: '/Images/Chinese.jpg',
  CONTINENTAL: '/Images/Continental.jpg',
  DESSERT: '/Images/dessert.jpg',
  FAST_FOOD: '/Images/fast_food.jpg',
  HEALTHY: '/Images/Healthy.jpg',
  ITALIAN: '/Images/Italian.jpg',
  MEXICAN_SEAFOOD: '/Images/Mexican_seafood.jpg',
  NORTH_INDIAN: '/Images/North_Indian.jpg',
  SEAFOOD: '/Images/Seafood.jpg',
  STREET_FOOD: '/Images/Street_food.jpg',
};

const KEY_MAP: Record<string, string> = {
  'paneer': IMG.NORTH_INDIAN,
  'butter chicken': IMG.NORTH_INDIAN,
  'biryani': IMG.NORTH_INDIAN,
  'naan': IMG.NORTH_INDIAN,
  'samosa': IMG.STREET_FOOD,
  'pav bhaji': IMG.STREET_FOOD,
  'vada pav': IMG.STREET_FOOD,
  'masala dosa': IMG.HEALTHY,
  'idli': IMG.HEALTHY,
  'pizza': IMG.ITALIAN,
  'pasta': IMG.ITALIAN,
  'burger': IMG.FAST_FOOD,
  'sandwich': IMG.CAFE,
  'soup': IMG.CONTINENTAL,
  'salad': IMG.HEALTHY,
  'gulab jamun': IMG.DESSERT,
  'rasgulla': IMG.DESSERT,
  'chow mein': IMG.CHINESE,
  'chinese': IMG.CHINESE,
  'seafood': IMG.SEAFOOD,
  'fish': IMG.SEAFOOD,
  'prawn': IMG.SEAFOOD,
  'tandoori': IMG.NORTH_INDIAN,
  'kebabs': IMG.NORTH_INDIAN,
  'mexican': IMG.MEXICAN_SEAFOOD,
  'dessert': IMG.DESSERT,
  'fast food': IMG.FAST_FOOD,
  'continental': IMG.CONTINENTAL,
  'cafe': IMG.CAFE,
};

const CUISINE_MAP: Record<string, string> = {
  'north indian': IMG.NORTH_INDIAN,
  'south indian': IMG.HEALTHY,
  'chinese': IMG.CHINESE,
  'italian': IMG.ITALIAN,
  'fast food': IMG.FAST_FOOD,
  'desserts': IMG.DESSERT,
  'seafood': IMG.SEAFOOD,
  'mughlai': IMG.NORTH_INDIAN,
  'continental': IMG.CONTINENTAL,
  'street food': IMG.STREET_FOOD,
  'biryani': IMG.NORTH_INDIAN,
  'healthy': IMG.HEALTHY,
  'cafe': IMG.CAFE,
  'mexican': IMG.MEXICAN_SEAFOOD,
};

export function getImageForDishOrCuisine(name?: string | null, cuisine?: string | null): string {
  if (name) {
    const key = name.toLowerCase().trim();
    // try exact match
    if (KEY_MAP[key]) return KEY_MAP[key];
    // try contains
    for (const k of Object.keys(KEY_MAP)) {
      if (key.includes(k)) return KEY_MAP[k];
    }
  }
  if (cuisine) {
    const ck = cuisine.toLowerCase().trim();
    if (CUISINE_MAP[ck]) return CUISINE_MAP[ck];
    for (const k of Object.keys(CUISINE_MAP)) {
      if (ck.includes(k)) return CUISINE_MAP[k];
    }
  }
  return IMG.CAFE; // fallback
}

export default getImageForDishOrCuisine;
