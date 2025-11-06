'use client';

import { useCart } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
    artisan: {
      id: string;
      shopName: string;
    };
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('This product is out of stock');
      return;
    }

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      artisanName: product.artisan.shopName,
      artisanId: product.artisan.id,
    });

    toast.success('Added to cart!');
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
      className="w-full bg-moroccan-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-moroccan-red/90 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
