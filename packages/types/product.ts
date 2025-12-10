export const Categories = ['Beverage', 'Cake', 'Dessert', 'Pastry', 'Meal'] as const;

export type Category = typeof Categories[number];

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
}