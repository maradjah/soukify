'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Soukify?',
        a: 'Soukify is a marketplace connecting talented Moroccan artisans with international buyers. We provide a platform for artisans to showcase and sell their authentic handcrafted products globally.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click on "Sign Up" in the navigation menu, choose whether you want to register as a buyer or artisan, and fill in your details. It\'s quick and free!',
      },
    ],
  },
  {
    category: 'For Buyers',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details. We accept all major credit cards through Stripe.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes! We ship worldwide. Shipping costs are calculated at checkout based on your location and order size.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Shipping times vary by destination. Typically, orders arrive within 7-14 business days for international shipments.',
      },
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery for items that are damaged or not as described. Please contact us for return authorization.',
      },
    ],
  },
  {
    category: 'For Artisans',
    questions: [
      {
        q: 'How do I become an artisan on Soukify?',
        a: 'Register as an artisan, complete your profile with information about your craft and products, and submit for verification. Once approved, you can start listing products.',
      },
      {
        q: 'What fees does Soukify charge?',
        a: 'We charge a small commission on each sale to cover platform maintenance and payment processing. There are no upfront fees to join.',
      },
      {
        q: 'How do I get paid?',
        a: 'Payments are processed through Stripe and transferred to your account after successful delivery of orders.',
      },
      {
        q: 'Can I set my own prices?',
        a: 'Yes! You have full control over your product pricing. We recommend researching similar products to set competitive prices.',
      },
    ],
  },
  {
    category: 'Payments & Security',
    questions: [
      {
        q: 'Is it safe to make payments on Soukify?',
        a: 'Yes! We use Stripe for payment processing, which is a industry-leading secure payment platform. We never store your credit card information.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe integration.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-moroccan-red transition"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about Soukify
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div>
                  {category.questions.map((faq, qIdx) => (
                    <FAQItem key={qIdx} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-moroccan-sand rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help
            </p>
            <a
              href="/contact"
              className="inline-block bg-moroccan-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-moroccan-red/90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
