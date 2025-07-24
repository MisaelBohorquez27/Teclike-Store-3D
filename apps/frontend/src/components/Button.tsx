import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'addCart' | 'outline';
  size?: 'default' | 'small' | 'lg';
}

const Button: FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'default',
  ...props 
}) => (
  <button
    className={cn(
      'rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      variant === 'primary' && 'bg-[#3778d4] text-[#FAF9F6] hover:bg-[#5ca0ff] border-2 border-transparent',
      variant === 'secondary' && 'bg-[#3f8efd] text-[#FAF9F6] hover:bg-[#3778d4] border-2 border-transparent',
      variant === 'addCart' && 'bg-[#3f8efd] text-[#FAF9F6] hover:bg-[#3778d4] border-2 border-transparent',
      variant === 'outline' && 'bg-transparent text-[#0F2C59] border-2 border-[#0F2C59] hover:bg-[#0F2C59] hover:text-[#FAF9F6]',
      size === 'small' && 'px-3 py-2 text-sm font-medium',
      size === 'default' && 'px-5 py-2 text-sm md:text-base',
      size === 'lg' && 'px-8 py-3 text-lg',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;