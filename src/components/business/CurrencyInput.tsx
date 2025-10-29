import { Input } from '@/components/ui/input';
import { formatCurrencyInput, parseCurrencyInput, centsToDollars } from '@/utils/currency';
import { useState, useEffect } from 'react';

interface CurrencyInputProps {
  value: number; // Value in cents
  onChange: (cents: number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const CurrencyInput = ({
  value,
  onChange,
  placeholder = '0.00',
  disabled = false,
  className = '',
}: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    // Initialize display value from cents
    if (value > 0) {
      setDisplayValue(centsToDollars(value).toFixed(2));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Allow only numbers and one decimal point
    if (!/^\d*\.?\d{0,2}$/.test(input)) return;
    
    setDisplayValue(input);
    
    // Convert to cents and call onChange
    const cents = parseCurrencyInput(input);
    onChange(cents);
  };

  const handleBlur = () => {
    // Format on blur if there's a value
    if (displayValue && !isNaN(parseFloat(displayValue))) {
      const formatted = parseFloat(displayValue).toFixed(2);
      setDisplayValue(formatted);
    }
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        $
      </span>
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`pl-7 ${className}`}
      />
    </div>
  );
};
