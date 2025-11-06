import { prisma } from '@/lib/prisma';
import { ArtisanCard } from '@/components/ArtisanCard';
import { ProductCard } from '@/components/ProductCard';
import { Search, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const [featuredProducts, artisans] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, active: true },
      include: {
        artisan: {
          include: { user: true },
        },
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.artisan.findMany({
      where: { verified: true },
      include: {
        user: true,
        products: {
          where: { active: true },
          take: 1,
        },
      },
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-moroccan-red to-moroccan-terracotta text-white py-24 moroccan-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Authentic Moroccan Craftsmanship
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Connect directly with talented artisans from Morocco and bring home unique, handcrafted treasures
            </p>
            <div className="flex gap-4">
              <Link
                href="/artisans"
                className="bg-white text-moroccan-red px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-sand transition"
              >
                Explore Artisans
              </Link>
              <Link
                href="/products"
                className="bg-moroccan-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-gold/90 transition"
              >
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-moroccan-red mb-2">
                {artisans.length}+
              </div>
              <div className="text-gray-600">Verified Artisans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-moroccan-red mb-2">
                {featuredProducts.length}+
              </div>
              <div className="text-gray-600">Unique Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-moroccan-red mb-2">
                50+
              </div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked items from our talented artisans
              </p>
            </div>
            <Link
              href="/products"
              className="text-moroccan-red hover:text-moroccan-red/80 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Meet Our Artisans
              </h2>
              <p className="text-gray-600">
                Talented craftspeople from across Morocco
              </p>
            </div>
            <Link
              href="/artisans"
              className="text-moroccan-red hover:text-moroccan-red/80 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Pottery', icon: '🏺' },
              { name: 'Textiles', icon: '🧵' },
              { name: 'Jewelry', icon: '💍' },
              { name: 'Leather', icon: '👜' },
              { name: 'Woodwork', icon: '🪵' },
              { name: 'Metalwork', icon: '⚒️' },
              { name: 'Carpets', icon: '🪡' },
              { name: 'Decor', icon: '🏮' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="bg-moroccan-sand hover:bg-moroccan-gold/20 p-6 rounded-lg text-center transition border-2 border-transparent hover:border-moroccan-gold"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-moroccan-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Are you a Moroccan artisan?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join our marketplace and reach international customers
          </p>
          <Link
            href="/register?type=artisan"
            className="bg-moroccan-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-gold/90 transition inline-block"
          >
            Become an Artisan
          </Link>
        </div>
      </section>
    </div>
  );
}
