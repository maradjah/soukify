import { renderHook, act } from '@testing-library/react';
import { useCart } from '../cart';

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (config: any) => config,
}));

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.clearCart();
    });
  });

  describe('addItem', () => {
    it('should add item to cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('should increment quantity for existing item', () => {
      const { result } = renderHook(() => useCart());

      const item = {
        id: '1',
        productId: '1',
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        artisanName: 'Test Artisan',
        artisanId: 'artisan-1',
      };

      act(() => {
        result.current.addItem(item);
        result.current.addItem(item);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeItem('1');
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      act(() => {
        result.current.updateQuantity('1', 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      act(() => {
        result.current.updateQuantity('1', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
        result.current.addItem({
          id: '2',
          productId: '2',
          name: 'Test Product 2',
          price: 200,
          image: 'test2.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('getTotalPrice', () => {
    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
        result.current.addItem({
          id: '2',
          productId: '2',
          name: 'Test Product 2',
          price: 50,
          image: 'test2.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      expect(result.current.getTotalPrice()).toBe(150);
    });

    it('should account for quantity in total price', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
        result.current.updateQuantity('1', 3);
      });

      expect(result.current.getTotalPrice()).toBe(300);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCart());
      expect(result.current.getTotalPrice()).toBe(0);
    });
  });

  describe('getTotalItems', () => {
    it('should count total items correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
        result.current.addItem({
          id: '2',
          productId: '2',
          name: 'Test Product 2',
          price: 50,
          image: 'test2.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
      });

      expect(result.current.getTotalItems()).toBe(2);
    });

    it('should count quantities in total items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItem({
          id: '1',
          productId: '1',
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          artisanName: 'Test Artisan',
          artisanId: 'artisan-1',
        });
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.getTotalItems()).toBe(5);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCart());
      expect(result.current.getTotalItems()).toBe(0);
    });
  });
});
