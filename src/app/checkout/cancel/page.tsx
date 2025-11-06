import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Checkout Cancelled
            </h1>
            <p className="text-gray-600">
              Your order was not completed
            </p>
          </div>

          <p className="text-gray-700 mb-8">
            No charges were made to your account. Your cart items are still saved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cart"
              className="bg-moroccan-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-red/90 transition"
            >
              Return to Cart
            </Link>
            <Link
              href="/products"
              className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
