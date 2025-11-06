import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(searchParams.category && { category: searchParams.category }),
    },
    include: {
      artisan: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const categories = await prisma.product.findMany({
    where: { active: true },
    select: { category: true },
    distinct: ['category'],
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Handcrafted Products
          </h1>
          <p className="text-gray-600 text-lg">
            Authentic Moroccan craftsmanship delivered to your door
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search */}
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-moroccan-red focus:border-transparent">
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
