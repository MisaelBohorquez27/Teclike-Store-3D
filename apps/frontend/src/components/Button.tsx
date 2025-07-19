import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

const Button: FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => (
  <button
    className={cn(
      'px-5 py-3 rounded-xl font-semibold transition',
      variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'text-blue-600 hover:bg-indigo-100',
      className
    )}
    {...props}
  >
    {children}
  </button>
);
export default Button;