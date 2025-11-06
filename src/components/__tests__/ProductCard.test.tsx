import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Beautiful Pottery',
    price: 99.99,
    currency: 'USD',
    images: ['https://example.com/image.jpg'],
    artisan: {
      shopName: 'Artisan Shop',
      user: {
        name: 'John Doe',
      },
    },
  };

  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Beautiful Pottery')).toBeInTheDocument();
    expect(screen.getByText('Artisan Shop')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should render product image', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Beautiful Pottery');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should render fallback emoji when no image', () => {
    const productWithoutImage = {
      ...mockProduct,
      images: [],
    };

    render(<ProductCard product={productWithoutImage} />);

    expect(screen.getByText('🏺')).toBeInTheDocument();
  });

  it('should link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });
});
