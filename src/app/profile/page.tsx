import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {session.user.name}
                </h2>
                <p className="text-gray-600">{session.user.email}</p>
                <span className="inline-block mt-1 px-3 py-1 bg-moroccan-sand text-moroccan-red text-xs font-semibold rounded-full">
                  {(session.user as any).role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={session.user.name || ''}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={session.user.email || ''}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-600">
                  To update your profile information, please contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
