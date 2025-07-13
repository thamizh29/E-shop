export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 45
  },
  {
    id: '2',
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 120
  },
  {
    id: '3',
    name: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 78
  },
  {
    id: '4',
    name: 'Books',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 200
  },
  {
    id: '5',
    name: 'Sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 95
  },
  {
    id: '6',
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=300',
    productCount: 67
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviewCount: 124,
    colors: ['Black', 'White', 'Blue'],
    featured: true,
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'John Smith',
        rating: 5,
        comment: 'Amazing sound quality and battery life. Highly recommended!',
        date: '2024-01-15'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Sarah Johnson',
        rating: 4,
        comment: 'Great headphones, comfortable for long use.',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable cotton t-shirt made from 100% organic cotton. Available in multiple colors and sizes.',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      'https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Clothing',
    stock: 50,
    rating: 4.5,
    reviewCount: 89,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
    featured: true
  },
  {
    id: '3',
    name: 'Modern Table Lamp',
    description: 'Elegant modern table lamp with adjustable brightness and warm LED lighting. Perfect for any home or office.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Home & Garden',
    stock: 15,
    rating: 4.6,
    reviewCount: 34,
    colors: ['White', 'Black', 'Gold'],
    featured: true
  },
  {
    id: '4',
    name: 'Programming Fundamentals Book',
    description: 'Comprehensive guide to programming fundamentals covering multiple languages and best practices.',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Books',
    stock: 30,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    description: 'High-quality yoga mat with superior grip and cushioning. Perfect for yoga, pilates, and general fitness.',
    price: 39.99,
    images: [
      'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Sports',
    stock: 40,
    rating: 4.4,
    reviewCount: 67,
    colors: ['Purple', 'Blue', 'Green', 'Pink']
  },
  {
    id: '6',
    name: 'Organic Face Cream',
    description: 'Nourishing organic face cream with natural ingredients. Suitable for all skin types.',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Beauty',
    stock: 60,
    rating: 4.3,
    reviewCount: 91
  },
  {
    id: '7',
    name: 'Smartphone Pro Max',
    description: 'Latest flagship smartphone with advanced camera system, 5G connectivity, and all-day battery life.',
    price: 999.99,
    originalPrice: 1099.99,
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Electronics',
    stock: 12,
    rating: 4.9,
    reviewCount: 203,
    colors: ['Space Gray', 'Silver', 'Gold', 'Blue'],
    featured: true
  },
  {
    id: '8',
    name: 'Designer Jeans',
    description: 'Premium designer jeans with perfect fit and premium denim material. Classic style that never goes out of fashion.',
    price: 89.99,
    originalPrice: 119.99,
    images: [
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: 'Clothing',
    stock: 35,
    rating: 4.6,
    reviewCount: 78,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black']
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    userId: '2',
    items: [
      {
        productId: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 199.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200'
      },
      {
        productId: '2',
        name: 'Premium Cotton T-Shirt',
        price: 29.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=200'
      }
    ],
    total: 259.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'ORD-002',
    userId: '2',
    items: [
      {
        productId: '7',
        name: 'Smartphone Pro Max',
        price: 999.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=200'
      }
    ],
    total: 999.99,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  }
];