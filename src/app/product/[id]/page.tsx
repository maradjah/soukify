import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import Link from 'next/link';
import { MapPin, Package, Ruler, Weight } from 'lucide-react';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      artisan: {
        include: { user: true },
      },
    },
  });

  if (!product || !product.active) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <ProductImageGallery images={product.images} name={product.name} />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <div className="text-4xl font-bold text-moroccan-red mb-2">
                  {formatPrice(product.price, product.currency)}
                </div>
                {product.stock > 0 ? (
                  <p className="text-green-600 font-semibold">In Stock</p>
                ) : (
                  <p className="text-red-600 font-semibold">Out of Stock</p>
                )}
              </div>

              {/* Artisan Info */}
              <Link
                href={`/artisan/${product.artisan.id}`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  {product.artisan.user.image ? (
                    <Image
                      src={product.artisan.user.image}
                      alt={product.artisan.shopName}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      👤
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sold by</p>
                  <p className="font-semibold text-gray-900">
                    {product.artisan.shopName}
                  </p>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    {product.artisan.city}
                  </div>
                </div>
              </Link>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Details */}
              <div className="mb-6 space-y-3">
                <h2 className="font-bold text-lg">Details</h2>

                <div className="flex items-start gap-2">
                  <Package className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Category</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>

                {product.materials.length > 0 && (
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 text-gray-600 mt-0.5">🧵</div>
                    <div>
                      <p className="text-sm font-semibold">Materials</p>
                      <p className="text-sm text-gray-600">
                        {product.materials.join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex items-start gap-2">
                    <Ruler className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Dimensions</p>
                      <p className="text-sm text-gray-600">{product.dimensions}</p>
                    </div>
                  </div>
                )}

                {product.weight && (
                  <div className="flex items-start gap-2">
                    <Weight className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Weight</p>
                      <p className="text-sm text-gray-600">{product.weight}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <AddToCartButton product={product} />

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>International Shipping Available</strong>
                  <br />
                  Ships from {product.artisan.city}, Morocco. Shipping costs
                  calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
