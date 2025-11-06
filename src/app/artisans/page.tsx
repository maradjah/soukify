import { prisma } from '@/lib/prisma';
import { ArtisanCard } from '@/components/ArtisanCard';
import { Search } from 'lucide-react';

export default async function ArtisansPage() {
  const artisans = await prisma.artisan.findMany({
    where: { verified: true },
    include: {
      user: true,
      products: {
        where: { active: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Moroccan Artisans
          </h1>
          <p className="text-gray-600 text-lg">
            Discover talented craftspeople from across Morocco
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artisans by name, city, or specialty..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-red focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Artisans Grid */}
        {artisans.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No artisans found</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {artisans.length} artisan{artisans.length !== 1 ? 's' : ''} found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
