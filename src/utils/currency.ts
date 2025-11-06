/**
 * Currency utilities for handling cent-based storage and CAD formatting
 */

/**
 * Convert cents to formatted CAD currency string
 * @param cents - Amount in cents (e.g., 612460)
 * @returns Formatted currency string (e.g., "$6,124.60")
 */
export const formatCurrency = (cents: number | null | undefined): string => {
  if (cents === null || cents === undefined) return "$0.00";
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
};

/**
 * Convert dollars to cents for database storage
 * @param dollars - Amount in dollars (e.g., 6124.60)
 * @returns Amount in cents (e.g., 612460)
 */
export const dollarsToCents = (dollars: number | string): number => {
  const numDollars =
    typeof dollars === "string" ? parseFloat(dollars) : dollars;
  if (isNaN(numDollars)) return 0;
  return Math.round(numDollars * 100);
};

/**
 * Convert cents to dollars
 * @param cents - Amount in cents
 * @returns Amount in dollars
 */
export const centsToDollars = (cents: number | null | undefined): number => {
  if (cents === null || cents === undefined) return 0;
  return cents / 100;
};

/**
 * Parse currency input string to cents
 * Handles various input formats: "$1,234.56", "1234.56", "1234"
 */
export const parseCurrencyInput = (input: string): number => {
  // Remove currency symbols, spaces, and commas
  const cleaned = input.replace(/[$,\s]/g, "");
  const number = parseFloat(cleaned);
  if (isNaN(number)) return 0;
  return Math.round(number * 100);
};

/**
 * Format number input for currency display
 */
export const formatCurrencyInput = (value: string): string => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add commas to integer part
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return with decimal part if exists
  if (decimalPart !== undefined) {
    return `${formatted}.${decimalPart.slice(0, 2)}`;
  }
  return formatted;
};
