export interface FoodCard {
  id: string;
  name: string;
  image: string;
  calories: number;
  guessCalories: number;
  portion: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const gameCards: FoodCard[] = [
  {
    id: 'ramen',
    name: 'Spicy Ramen',
    image: img('1569718212165-3a8278d5f624'),
    calories: 400,
    guessCalories: 420,
    portion: '400g',
    category: 'lunch',
  },
  {
    id: 'burger',
    name: 'Double Cheeseburger',
    image: img('1568901346375-23c9450c58cd'),
    calories: 535,
    guessCalories: 480,
    portion: '250g',
    category: 'lunch',
  },
  {
    id: 'salad',
    name: 'Green Caesar Salad',
    image: img('1546793665-c74683f339c1'),
    calories: 180,
    guessCalories: 260,
    portion: '300g',
    category: 'lunch',
  },
  {
    id: 'pizza',
    name: 'Pepperoni Pizza',
    image: img('1513104890138-7c749659a591'),
    calories: 285,
    guessCalories: 300,
    portion: '1 slice',
    category: 'dinner',
  },
  {
    id: 'cake',
    name: 'Chocolate Lava Cake',
    image: img('1606313564200-e75d5e30476c'),
    calories: 450,
    guessCalories: 390,
    portion: '150g',
    category: 'dessert',
  },
  {
    id: 'sushi',
    name: 'Salmon Sushi Set',
    image: img('1579584425555-c3ce17fd4351'),
    calories: 350,
    guessCalories: 320,
    portion: '8 pcs',
    category: 'dinner',
  },
  {
    id: 'pancakes',
    name: 'Berry Pancakes',
    image: img('1567620905732-2d1ec7ab7445'),
    calories: 520,
    guessCalories: 450,
    portion: '3 pcs',
    category: 'breakfast',
  },
  {
    id: 'poke',
    name: 'Tuna Poke Bowl',
    image: img('1546069901-ba9599a7e63c'),
    calories: 380,
    guessCalories: 410,
    portion: '350g',
    category: 'lunch',
  },
];
