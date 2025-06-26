import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
}: Props) {
  // Estilos base
  const baseStyles =
    'rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2';

  // Estilos por variante
  const variantStyles = {
    primary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
    outline:
      'bg-transparent text-white border border-white hover:bg-body hover:text-gray-900',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-gray-800',
  };

  // Estilos por tamaño
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  // Estilos para ancho completo
  const widthStyles = fullWidth ? 'w-full' : '';

  // Estilos para estado disabled
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className} transform hover:-translate-y-0.5 active:translate-y-0`}
    >
      {children}
    </button>
  );
}
