/**
 * Calculation utilities for invoices and estimates
 */

export interface LineItem {
  description: string;
  quantity: number;
  unit_price_cents: number;
  line_total_cents?: number;
  unit?: string;
  category?: string;
}

/**
 * Calculate line item total
 */
export const calculateLineTotal = (
  quantity: number,
  unitPriceCents: number,
): number => {
  return Math.round(quantity * unitPriceCents);
};

/**
 * Calculate subtotal from line items
 */
export const calculateSubtotal = (lineItems: LineItem[]): number => {
  return lineItems.reduce((sum, item) => {
    const lineTotal =
      item.line_total_cents ||
      calculateLineTotal(item.quantity, item.unit_price_cents);
    return sum + lineTotal;
  }, 0);
};

/**
 * Calculate tax amount
 * @param subtotalCents - Subtotal in cents
 * @param taxRate - Tax rate as decimal (e.g., 0.13 for 13%)
 */
export const calculateTax = (
  subtotalCents: number,
  taxRate: number = 0.13,
): number => {
  return Math.round(subtotalCents * taxRate);
};

/**
 * Calculate discount amount
 * @param subtotalCents - Subtotal in cents
 * @param discount - Discount as percentage (e.g., 10) or fixed cents amount
 * @param isPercentage - Whether discount is percentage or fixed amount
 */
export const calculateDiscount = (
  subtotalCents: number,
  discount: number,
  isPercentage: boolean = true,
): number => {
  if (isPercentage) {
    return Math.round(subtotalCents * (discount / 100));
  }
  return discount;
};

/**
 * Calculate final total
 */
export const calculateTotal = (
  subtotalCents: number,
  taxCents: number,
  discountCents: number = 0,
): number => {
  return subtotalCents - discountCents + taxCents;
};

/**
 * Calculate balance due
 */
export const calculateBalanceDue = (
  totalCents: number,
  paidCents: number,
): number => {
  return Math.max(0, totalCents - paidCents);
};

/**
 * Calculate all invoice/estimate totals
 */
export const calculateInvoiceTotals = (
  lineItems: LineItem[],
  taxRate: number = 0.13,
  discountAmount: number = 0,
  isDiscountPercentage: boolean = true,
) => {
  const subtotal_cents = calculateSubtotal(lineItems);
  const discount_cents = calculateDiscount(
    subtotal_cents,
    discountAmount,
    isDiscountPercentage,
  );
  const tax_amount_cents = calculateTax(
    subtotal_cents - discount_cents,
    taxRate,
  );
  const total_cents = calculateTotal(
    subtotal_cents,
    tax_amount_cents,
    discount_cents,
  );

  return {
    subtotal_cents,
    discount_cents,
    tax_amount_cents,
    total_cents,
  };
};
