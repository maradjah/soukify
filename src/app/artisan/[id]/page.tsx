import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, Star } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export default async function ArtisanPage({
  params,
}: {
  params: { id: string };
}) {
  const artisan = await prisma.artisan.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      products: {
        where: { active: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!artisan) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative h-64 bg-gradient-to-r from-moroccan-red to-moroccan-terracotta">
        {artisan.coverImage && (
          <Image
            src={artisan.coverImage}
            alt={artisan.shopName}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="container mx-auto px-4 -mt-20 relative">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                {artisan.user.image ? (
                  <Image
                    src={artisan.user.image}
                    alt={artisan.user.name || artisan.shopName}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    👤
                  </div>
                )}
              </div>
              {artisan.verified && (
                <div className="absolute -bottom-2 -right-2 bg-moroccan-blue text-white rounded-full p-2">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {artisan.shopName}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    {artisan.city}, {artisan.region}
                  </div>
                  <div className="inline-block bg-moroccan-sand text-moroccan-red px-4 py-1 rounded-full text-sm font-semibold">
                    {artisan.specialty}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {artisan.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {artisan.phone && (
                  <a
                    href={`tel:${artisan.phone}`}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </a>
                )}
                {artisan.whatsapp && (
                  <a
                    href={`https://wa.me/${artisan.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg transition"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Products by {artisan.shopName}
          </h2>
          {artisan.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {artisan.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, artisan }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">
                This artisan hasn't listed any products yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
