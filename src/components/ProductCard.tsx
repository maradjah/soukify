import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    images: string[];
    artisan: {
      shopName: string;
      user: {
        name: string | null;
      };
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🏺
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-moroccan-red transition">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.artisan.shopName}</p>
        <p className="text-lg font-bold text-moroccan-red">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
