import { Heart, Globe, Shield, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-moroccan-red to-moroccan-terracotta text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Soukify</h1>
            <p className="text-xl text-white/90">
              Connecting Moroccan artisans with the world, one handcrafted
              piece at a time
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Soukify was created to bridge the gap between talented Moroccan
              artisans and international buyers who appreciate authentic,
              handcrafted products. We believe that traditional craftsmanship
              deserves a global stage, and that artisans should be able to reach
              customers worldwide without barriers.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every product on Soukify tells a story of heritage, skill, and
              dedication. From the bustling souks of Marrakech to the pottery
              workshops of Fes, we're bringing Morocco's rich artistic heritage
              to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-moroccan-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-moroccan-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Authenticity
              </h3>
              <p className="text-gray-600">
                Every product is genuinely handcrafted by verified Moroccan
                artisans
              </p>
            </div>

            <div className="text-center">
              <div className="bg-moroccan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-moroccan-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Connecting artisans to international markets and opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="bg-moroccan-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-moroccan-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fair Trade
              </h3>
              <p className="text-gray-600">
                Artisans receive fair compensation for their craftsmanship
              </p>
            </div>

            <div className="text-center">
              <div className="bg-moroccan-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-moroccan-terracotta" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Building a supportive network of artisans and collectors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-moroccan-sand">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-moroccan-red mb-2">
                100+
              </div>
              <div className="text-gray-700 text-lg">Verified Artisans</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-moroccan-red mb-2">
                1000+
              </div>
              <div className="text-gray-700 text-lg">Unique Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-moroccan-red mb-2">
                50+
              </div>
              <div className="text-gray-700 text-lg">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're an artisan looking to showcase your work or a buyer
              seeking authentic Moroccan crafts, we'd love to have you with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register?type=artisan"
                className="bg-moroccan-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-red/90 transition"
              >
                Become an Artisan
              </a>
              <a
                href="/products"
                className="bg-moroccan-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-gold/90 transition"
              >
                Shop Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
