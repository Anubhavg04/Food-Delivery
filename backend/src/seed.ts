// src/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant';
import User from './models/User';
import bcrypt from 'bcryptjs';
dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/zomato_clone';

const seed = async () => {
  await mongoose.connect(MONGO);
  console.log('Connected for seeding');

  await Restaurant.deleteMany({});
  await User.deleteMany({});

  // generate 50 sample restaurants across Indian cities
  const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Surat', 'Indore', 'Bhopal', 'Kochi', 'Goa', 'Varanasi', 'Nagpur', 'Patna', 'Visakhapatnam', 'Ludhiana', 'Agra', 'Amritsar', 'Jodhpur', 'Mysore', 'Coimbatore', 'Guwahati', 'Dehradun', 'Ranchi', 'Bhubaneswar', 'Trivandrum', 'Madurai', 'Udaipur', 'Kanpur', 'Noida', 'Ghaziabad', 'Faridabad', 'Thane', 'Nashik', 'Vadodara', 'Rajkot', 'Jalandhar', 'Siliguri', 'Kozhikode', 'Moradabad', 'Aligarh', 'Mangalore', 'Hubli', 'Jammu', 'Shimla'];

  const cuisines = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Fast Food', 'Desserts', 'Seafood', 'Mughlai', 'Continental', 'Street Food', 'Biryani', 'Healthy', 'Cafe', 'Mexican'];

  const dishPool = ['Butter Chicken', 'Paneer Butter Masala', 'Masala Dosa', 'Idli', 'Vada Pav', 'Chole Bhature', 'Biryani', 'Naan', 'Samosa', 'Pav Bhaji', 'Gulab Jamun', 'Tandoori Chicken', 'Chow Mein', 'Pasta', 'Pizza', 'Burger', 'Fish Curry', 'Prawn Fry', 'Falooda', 'Rasgulla'];

  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const restaurants: any[] = [];
  for (let i = 1; i <= 50; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const name = `${['Spice','Urban','Royal','Golden','Silver','Green','Red','Blue','Happy','Tasty'][Math.floor(Math.random()*10)]} ${['Plate','Bistro','Hub','Kitchens','Corner','House','Cafe','Grill','Express','Diner'][Math.floor(Math.random()*10)]} ${i}`;
    const numCuisine = Math.random() < 0.3 ? 2 : 1;
    const cuisine = Array.from({length: numCuisine}).map(() => cuisines[Math.floor(Math.random()*cuisines.length)]);
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 - 5.0
    const priceForTwo = rand(150, 1500);
    const deliveryTime = rand(15, 60);
    const isVeg = Math.random() < 0.35; // 35% pure veg
    // local image mapping (public images) to ensure reliable, matching images
    const IMAGE_MAP: Record<string, string> = {
      'butter chicken': '/images/North_Indian.jpg',
      'paneer butter masala': '/images/North_Indian.jpg',
      'biryani': '/images/North_Indian.jpg',
      'naan': '/images/North_Indian.jpg',
      'samosa': '/images/Street_food.jpg',
      'pav bhaji': '/images/Street_food.jpg',
      'vada pav': '/images/Street_food.jpg',
      'masala dosa': '/images/Healthy.jpg',
      'idli': '/images/Healthy.jpg',
      'pizza': '/images/Italian.jpg',
      'pasta': '/images/Italian.jpg',
      'burger': '/images/fast_food.jpg',
      'sandwich': '/images/Cafe.jpg',
      'soup': '/images/Continenetal.jpg',
      'salad': '/images/Healthy.jpg',
      'gulab jamun': '/images/dessert.jpg',
      'rasgulla': '/images/dessert.jpg',
      'chow mein': '/images/Chinese.jpg',
      'chinese': '/images/Chinese.jpg',
      'seafood': '/images/Seafood.jpg',
      'fish': '/images/Seafood.jpg',
      'prawn': '/images/Seafood.jpg',
      'tandoori': '/images/North_Indian.jpg',
      'kebabs': '/images/North_Indian.jpg',
      'mexican': '/images/Mexican.seafood.jpg',
      'dessert': '/images/dessert.jpg',
      'fast food': '/images/fast_food.jpg',
      'continental': '/images/Continenetal.jpg',
      'cafe': '/images/Cafe.jpg'
    };

    // pick 3 popular dishes with random prices and use local public images when possible
    const dishesArr: { name: string; price: number; image: string }[] = [];
    for (let d = 0; d < 3; d++) {
      const dishName = dishPool[Math.floor(Math.random() * dishPool.length)];
      const dishPrice = rand(80, 450);
      // choose a local image if mapping exists, otherwise fallback to a generic public image
      const key = dishName.toLowerCase();
      const dishImage = IMAGE_MAP[key] || IMAGE_MAP[dishName.toLowerCase().split(' ')[0]] || '/images/Cafe.jpg';
      dishesArr.push({ name: dishName, price: dishPrice, image: dishImage });
    }

    const description = `Popular dishes: ${dishesArr.map(d => `${d.name} (₹${d.price})`).join(', ')}.`;

    // pick representative image for restaurant: prefer first dish mapping, else cuisine mapping, else default
    const repKey = dishesArr.length ? dishesArr[0].name.toLowerCase() : (cuisine[0] || '').toLowerCase();
    const repImage = IMAGE_MAP[repKey] || IMAGE_MAP[cuisine[0]?.toLowerCase?.()] || '/images/Cafe.jpg';

    restaurants.push({
      name,
      cuisine,
      rating,
      priceForTwo,
      deliveryTime,
      isVeg,
      image: repImage,
      location: city,
      description,
      dishes: dishesArr
    });
  }

  await Restaurant.insertMany(restaurants);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('password123', salt);
  await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed });

  console.log('Seed done');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
