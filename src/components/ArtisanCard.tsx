import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';

interface ArtisanCardProps {
  artisan: {
    id: string;
    shopName: string;
    city: string;
    region: string;
    specialty: string;
    coverImage: string | null;
    verified: boolean;
    user: {
      name: string | null;
      image: string | null;
    };
    products: any[];
  };
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Link
      href={`/artisan/${artisan.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
    >
      {/* Cover Image */}
      <div className="relative h-32 bg-gradient-to-r from-moroccan-red to-moroccan-terracotta">
        {artisan.coverImage && (
          <Image
            src={artisan.coverImage}
            alt={artisan.shopName}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Profile Section */}
      <div className="p-6 -mt-12 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {artisan.user.image ? (
                <Image
                  src={artisan.user.image}
                  alt={artisan.user.name || artisan.shopName}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
            </div>
            {artisan.verified && (
              <div className="absolute -bottom-1 -right-1 bg-moroccan-blue text-white rounded-full p-1">
                <Star className="w-4 h-4 fill-current" />
              </div>
            )}
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-moroccan-red transition">
          {artisan.shopName}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {artisan.city}, {artisan.region}
        </div>

        <div className="inline-block bg-moroccan-sand text-moroccan-red text-xs px-3 py-1 rounded-full mb-3">
          {artisan.specialty}
        </div>

        <div className="text-sm text-gray-600">
          {artisan.products.length} product{artisan.products.length !== 1 ? 's' : ''}
        </div>
      </div>
    </Link>
  );
}
