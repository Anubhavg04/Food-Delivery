import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import getImageForDishOrCuisine from '../utils/imageMap';
import { Star, MapPin, Clock, IndianRupee } from 'lucide-react';

const FALLBACK_RESTAURANT_IMG =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60';

const FALLBACK_DISH_IMG =
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60';

const RestaurantPage: React.FC = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/restaurants/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!restaurant)
    return (
      <div className="text-center py-10 text-gray-700 dark:text-gray-200 animate-pulse">
        Loading restaurant...
      </div>
    );

  // FINAL banner selection
  const bannerImg = (() => {
    const firstDish = restaurant?.dishes?.[0]?.name || null;
    const cuisine = restaurant?.cuisine?.[0] || null;
    const mapped = getImageForDishOrCuisine(firstDish, cuisine);
    if (restaurant.image?.startsWith('http') || restaurant.image?.startsWith('/'))
      return restaurant.image;
    return mapped || FALLBACK_RESTAURANT_IMG;
  })();

  return (
    <div className="dark:bg-gray-900 min-h-screen pb-20 transition-theme">

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-b-3xl shadow-lg">
        <img
          src={bannerImg}
          onError={(e: any) => (e.currentTarget.src = FALLBACK_RESTAURANT_IMG)}
          className="w-full h-full object-cover scale-105 animate-[imageZoom_20s_linear_infinite]"
          alt={restaurant.name}
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Restaurant Info in Hero */}
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {restaurant.name}
          </h1>

          <div className="flex items-center mt-2 text-sm text-gray-200 gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {restaurant.location}
            </span>
            <span className="opacity-50">•</span>
            <span>{restaurant.cuisine.join(' • ')}</span>
          </div>
        </div>

        {/* Floating Rating Badge */}
        <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl px-4 py-2 text-center">
          <div className="flex justify-center items-center gap-1 text-green-600 font-semibold">
            <Star className="w-4 h-4 fill-green-600 text-green-600" />
            {restaurant.rating}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Rating
          </div>
        </div>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="max-w-5xl mx-auto px-4 mt-10">

        {/* Stats Row */}
        <div className="flex gap-4 flex-wrap">
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-gray-800 dark:text-gray-200">
              ₹{restaurant.priceForTwo} for two
            </span>
          </div>

          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-gray-800 dark:text-gray-200">
              {restaurant.deliveryTime} mins delivery
            </span>
          </div>
        </div>

        {/* Description */}
        {restaurant.description && (
          <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {restaurant.description}
          </p>
        )}

        {/* ---------------- MENU SECTION ---------------- */}
        {restaurant.dishes?.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
              Menu
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.dishes.map((d: any, idx: number) => {
                const dishImg =
                  getImageForDishOrCuisine(
                    d.name,
                    restaurant.cuisine?.[0]
                  ) || d.image || FALLBACK_DISH_IMG;

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={dishImg}
                        alt={d.name}
                        onError={(e: any) =>
                          (e.currentTarget.src = FALLBACK_DISH_IMG)
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {d.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {restaurant.cuisine.join(', ')}
                          </p>
                        </div>

                        <div className="text-green-600 font-bold text-lg">
                          ₹{d.price}
                        </div>
                      </div>

                      <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default RestaurantPage;
