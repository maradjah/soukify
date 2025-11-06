import { render, screen, fireEvent } from '@testing-library/react';
import { AddToCartButton } from '../AddToCartButton';
import { useCart } from '@/store/cart';
import toast from 'react-hot-toast';

// Mock the cart store
const mockAddItem = jest.fn();
jest.mock('@/store/cart', () => ({
  useCart: jest.fn((selector) =>
    selector ? selector({ addItem: mockAddItem }) : { addItem: mockAddItem }
  ),
}));
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('AddToCartButton', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    images: ['test.jpg'],
    stock: 10,
    artisan: {
      id: 'artisan-1',
      shopName: 'Test Shop',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render add to cart button', () => {
    render(<AddToCartButton product={mockProduct} />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should call addItem when clicked', () => {
    render(<AddToCartButton product={mockProduct} />);

    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: '1',
      productId: '1',
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      artisanName: 'Test Shop',
      artisanId: 'artisan-1',
    });
  });

  it('should show success toast on add', () => {
    const toast = require('react-hot-toast').default;
    render(<AddToCartButton product={mockProduct} />);

    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    expect(toast.success).toHaveBeenCalledWith('Added to cart!');
  });

  it('should be disabled when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<AddToCartButton product={outOfStockProduct} />);

    const button = screen.getByText('Out of Stock');
    expect(button).toBeDisabled();
    // Disabled buttons cannot be clicked, so addItem should never be called
    expect(mockAddItem).not.toHaveBeenCalled();
  });
});
