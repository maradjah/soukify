import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Package, Eye, Edit, Trash2 } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import Image from 'next/image';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  if ((session.user as any).role !== 'ARTISAN') {
    redirect('/');
  }

  const artisan = await prisma.artisan.findUnique({
    where: { userId: (session.user as any).id },
    include: {
      products: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Artisan Profile
            </h1>
            <p className="text-gray-600 mb-8">
              Set up your shop to start selling your products
            </p>
            <Link
              href="/dashboard/setup"
              className="inline-block bg-moroccan-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-red/90 transition"
            >
              Setup Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeProducts = artisan.products.filter((p) => p.active).length;
  const totalProducts = artisan.products.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your shop and products</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
              <Package className="w-12 h-12 text-moroccan-red opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Products</p>
                <p className="text-3xl font-bold text-green-600">
                  {activeProducts}
                </p>
              </div>
              <Eye className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Shop Views</p>
                <p className="text-3xl font-bold text-moroccan-blue">0</p>
              </div>
              <Eye className="w-12 h-12 text-moroccan-blue opacity-20" />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Products</h2>
            <Link
              href="/dashboard/products/new"
              className="bg-moroccan-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-moroccan-red/90 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </Link>
          </div>

          {artisan.products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No products yet</p>
              <Link
                href="/dashboard/products/new"
                className="inline-block bg-moroccan-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-moroccan-red/90 transition"
              >
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artisan.products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">
                                🏺
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {formatPrice(product.price, product.currency)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`${
                            product.stock > 0
                              ? 'text-gray-900'
                              : 'text-red-600'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            product.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {product.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            className="p-2 hover:bg-gray-200 rounded transition"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/dashboard/products/${product.id}/edit`}
                            className="p-2 hover:bg-gray-200 rounded transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
