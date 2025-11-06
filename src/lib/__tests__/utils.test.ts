import { cn, formatPrice, formatDate } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });

    it('should handle undefined and null', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });
  });

  describe('formatPrice', () => {
    it('should format USD prices correctly', () => {
      expect(formatPrice(100, 'USD')).toBe('$100.00');
    });

    it('should format prices with decimals', () => {
      expect(formatPrice(99.99, 'USD')).toBe('$99.99');
    });

    it('should use USD as default currency', () => {
      expect(formatPrice(50)).toBe('$50.00');
    });

    it('should handle large numbers', () => {
      expect(formatPrice(1000000, 'USD')).toBe('$1,000,000.00');
    });

    it('should handle zero', () => {
      expect(formatPrice(0, 'USD')).toBe('$0.00');
    });
  });

  describe('formatDate', () => {
    it('should format Date objects correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('January');
      expect(formatted).toContain('2024');
    });

    it('should format date strings correctly', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('January');
      expect(formatted).toContain('2024');
    });

    it('should handle ISO date strings', () => {
      const formatted = formatDate('2024-01-15T00:00:00.000Z');
      expect(formatted).toContain('2024');
    });
  });
});
