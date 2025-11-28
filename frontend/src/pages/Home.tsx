import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import RestaurantCard from '../components/RestaurantCard.tsx';
import SearchBar from '../components/SearchBar.tsx';

type Restaurant = {
  _id: string;
  name: string;
  cuisine: string[];
  rating: number;
  priceForTwo: number;
  deliveryTime: number;
  isVeg: boolean;
  image: string;
  location: string;
  description?: string;
};

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [query, setQuery] = useState('');
  const [onlyVeg] = useState(false);
  const [minRating] = useState(0);
  const [sortBy] = useState<'rating' | 'price' | 'time' | ''>('');
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get('/restaurants', {
        params: { search: query, veg: onlyVeg, minRating, sort: sortBy, limit: 50 },
      });
      setRestaurants(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => fetchRestaurants(), 250);
    return () => clearTimeout(t);
  }, [query, onlyVeg, minRating, sortBy]);

  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 12);
  const fastDelivery = [...restaurants].sort((a, b) => a.deliveryTime - b.deliveryTime).slice(0, 12);
  const budgetFriendly = [...restaurants].sort((a, b) => a.priceForTwo - b.priceForTwo).slice(0, 12);

  const Carousel: React.FC<{ title: string; items: Restaurant[] }> = ({ title, items }) => (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <span className="text-sm text-red-500 cursor-pointer hover:underline">See all</span>
      </div>

      {items.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-300">No results</div>
      ) : (
        <div className="-mx-3 px-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 snap-x snap-mandatory pb-4">
            {items.map((r) => (
              <div key={r._id} className="flex-shrink-0 w-72 snap-center">
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* 🔥 3D Floating Blurred Background Shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-300/30 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-300/20 dark:bg-purple-700/20 rounded-full blur-[100px] animate-float"></div>

      {/* 🔥 HERO SECTION */}
      <div className="
        py-20 text-center relative z-10 
        bg-gradient-to-b from-red-100/60 dark:from-gray-800/60 to-transparent
        backdrop-blur-sm
      ">
        {/* Subtle food icon background */}
        <div className="absolute inset-0 bg-[url('/bg-pattern-food.svg')] opacity-[0.05] pointer-events-none"></div>

        <img src="/logo.svg" alt="logo" className="h-14 mx-auto mb-6 opacity-90 animate-fade-in" />

        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight animate-slide-up">
          Discover the best food near you
        </h1>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 animate-slide-up delay-100">
          Explore top-rated spots, fast delivery & pocket-friendly restaurants
        </p>

        <div className="max-w-2xl mx-auto mt-8 animate-scale-in">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {loading ? (
          <div className="text-center py-10 text-gray-700 dark:text-gray-200">
            Loading restaurants...
          </div>
        ) : (
          <>
            <Carousel title="⭐ Top Rated" items={topRated} />
            <Carousel title="⚡ Fast Delivery" items={fastDelivery} />
            <Carousel title="💸 Budget Friendly" items={budgetFriendly} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
