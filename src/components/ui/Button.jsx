import { forwardRef } from 'react';

const variants = {
  primary: 'bg-primary-800 text-white hover:bg-primary-700 active:bg-primary-900 shadow-md hover:shadow-lg',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-md hover:shadow-lg',
  outline: 'border-2 border-primary-800 text-primary-800 hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-primary-800 hover:bg-primary-50 active:bg-primary-100',
  danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 shadow-md',
  success: 'bg-success text-white hover:bg-green-600 active:bg-green-700 shadow-md',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
  xl: 'px-8 py-4 text-lg gap-3',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold
        rounded-[var(--radius-md)] transition-all duration-200 ease-out
        focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        active:scale-[0.97] cursor-pointer
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
