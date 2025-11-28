import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import getImageForDishOrCuisine from "../utils/imageMap";

const FALLBACK_IMAGE = "/images/cafe.svg";

const RestaurantCard: React.FC<{ restaurant: any }> = ({ restaurant }) => {
  const defaultSrc = useMemo(() => {
    if (!restaurant) return FALLBACK_IMAGE;

    const firstDish =
      restaurant.dishes && restaurant.dishes.length
        ? restaurant.dishes[0].name
        : null;

    const cuisine =
      restaurant.cuisine && restaurant.cuisine.length
        ? restaurant.cuisine[0]
        : null;

    const local = getImageForDishOrCuisine(firstDish, cuisine);
    if (local) return local;

    const img: string = restaurant.image || "";
    if (
      img &&
      (img.startsWith("http") ||
        img.startsWith("//") ||
        img.startsWith("/"))
    )
      return img;

    return FALLBACK_IMAGE;
  }, [restaurant]);

  const [src, setSrc] = useState<string>(defaultSrc);

  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className="
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-md hover:shadow-xl 
        transition-all duration-300 
        overflow-hidden group cursor-pointer
      ">
        
        {/* IMAGE SECTION */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={src}
            alt={restaurant.name}
            onError={() => setSrc(FALLBACK_IMAGE)}
            className="
              w-full h-full object-cover 
              group-hover:scale-105 
              transition-all duration-500
            "
          />

          {/* RATING TAG */}
          <div
            className="
              absolute bottom-2 left-2 
              bg-black/70 text-white text-xs 
              px-2 py-0.5 rounded-md
            "
          >
            ⭐ {restaurant.rating}
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-4">
          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">
            {restaurant.name}
          </h4>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
            {(restaurant.cuisine || []).join(" • ")}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {restaurant.location}
          </p>

          {/* PRICE + TIME */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              ₹{restaurant.priceForTwo} for two
            </span>

            <span className="text-gray-700 dark:text-gray-300">
              ⏱ {restaurant.deliveryTime} mins
            </span>
          </div>

          {/* CTA BUTTON */}
          <button
            className="
              mt-4 w-full 
              bg-indigo-600 hover:bg-indigo-700 
              text-white py-2 text-sm rounded-xl 
              transition-all duration-300
            "
          >
            View Menu
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
