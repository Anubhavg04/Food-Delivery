import { Schema, model } from 'mongoose';

export interface IRestaurant {
  name: string;
  cuisine: string[];
  rating: number;
  priceForTwo: number;
  deliveryTime: number;
  isVeg: boolean;
  image: string;
  location: string;
  description?: string;
  dishes?: { name: string; price: number; image?: string }[];
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisine: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  priceForTwo: { type: Number, default: 0 },
  deliveryTime: { type: Number, default: 30 },
  isVeg: { type: Boolean, default: false },
  image: { type: String },
  location: { type: String },
  description: { type: String }
  ,
  dishes: {
    type: [
      {
        name: { type: String },
        price: { type: Number },
        image: { type: String }
      }
    ],
    default: []
  }
});

export default model<IRestaurant>('Restaurant', RestaurantSchema);
