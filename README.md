# 🏺 Soukify - Moroccan Artisans Marketplace

A modern e-commerce marketplace connecting talented Moroccan artisans with international buyers. Built with Next.js 14, TypeScript, PostgreSQL, and Stripe.

## ✨ Features

### For Buyers
- 🛍️ Browse authentic handcrafted products from verified Moroccan artisans
- 👤 View detailed artisan profiles with their complete product collections
- 🛒 Shopping cart with real-time updates
- 💳 Secure international payments via Stripe
- 📦 Order tracking and management
- 🌍 International shipping support

### For Artisans
- 🎨 Create and manage your artisan shop
- 📸 Upload and showcase your products with multiple images
- 📊 Dashboard to track products and sales
- 🏷️ Set prices in USD with international reach
- ✅ Verified artisan badge system
- 📱 WhatsApp and phone integration for direct contact

### Technical Features
- ⚡ Built with Next.js 14 App Router
- 🎯 TypeScript for type safety
- 🗄️ PostgreSQL database with Prisma ORM
- 🔐 NextAuth.js authentication
- 💰 Stripe payment integration
- 🎨 TailwindCSS with Moroccan-inspired design
- 📱 Fully responsive design
- 🔄 Real-time cart state management with Zustand

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd soukify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your credentials:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/soukify?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) Seed database with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
soukify/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   ├── artisan/          # Artisan profile pages
│   │   ├── cart/             # Shopping cart
│   │   ├── checkout/         # Checkout flow
│   │   ├── dashboard/        # Artisan dashboard
│   │   ├── login/            # Login page
│   │   ├── product/          # Product pages
│   │   ├── products/         # Product listing
│   │   ├── register/         # Registration
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── ArtisanCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── lib/                  # Utilities
│   │   ├── prisma.ts        # Prisma client
│   │   ├── auth.ts          # NextAuth config
│   │   ├── stripe.ts        # Stripe client
│   │   └── utils.ts         # Helper functions
│   └── store/               # State management
│       └── cart.ts          # Cart store (Zustand)
├── .env.example             # Environment variables template
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # TailwindCSS configuration
└── package.json
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:

- **User** - Accounts for buyers, artisans, and admins
- **Artisan** - Artisan shop profiles
- **Product** - Product listings with images and details
- **Order** - Customer orders
- **OrderItem** - Individual items in orders

See `prisma/schema.prisma` for the complete schema.

## 🎨 Design

The application features a Moroccan-inspired design with:
- Custom color palette (Moroccan red, gold, terracotta, blue)
- Traditional pattern backgrounds
- Arabic font support (Amiri)
- Responsive grid layouts
- Smooth transitions and hover effects

## 🔐 Authentication

Users can register as either:
- **Buyer** - Browse and purchase products
- **Artisan** - Create shop and sell products

Authentication is handled by NextAuth.js with credentials provider.

## 💳 Payments

Stripe integration for secure payments:
- Test mode for development
- Production-ready checkout flow
- Support for international cards
- Automatic order creation
- Payment confirmation pages

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add keys to `.env` file
4. For production, use live keys and enable webhooks

## 📱 API Routes

- `POST /api/auth/[...nextauth]` - Authentication
- `POST /api/register` - User registration
- `POST /api/checkout` - Create Stripe checkout session

## 🛠️ Development

### Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Prisma Studio (database GUI)
npx prisma studio
```

### Adding Sample Data

To test the application with sample data, you can create artisans and products manually through the UI or use Prisma Studio:

```bash
npx prisma studio
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database

For production, use a managed PostgreSQL service:
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Neon](https://neon.tech)
- [Railway](https://railway.app)
- [Supabase](https://supabase.com)

### Environment Variables

Make sure to set all required environment variables in your production environment.

## 🌍 Internationalization

The app is designed to support multiple languages:
- English (primary)
- French
- Arabic (with RTL support ready)

Arabic language fields are included in the database schema for artisan shops and products.

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Moroccan artisans for their incredible craftsmanship
- The Next.js team for an amazing framework
- All contributors and supporters

## 📧 Support

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for Moroccan artisans
