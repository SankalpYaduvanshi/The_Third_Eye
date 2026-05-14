const colorMap = {
  primary: 'bg-primary-100 text-primary-800',
  accent: 'bg-accent-100 text-accent-700',
  success: 'bg-green-100 text-green-700',
  error: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-slate-100 text-slate-600',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = ({
  children,
  color = 'primary',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full
        ${colorMap[color] || colorMap.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          color === 'success' ? 'bg-green-500' :
          color === 'error' ? 'bg-red-500' :
          color === 'warning' ? 'bg-yellow-500' :
          color === 'accent' ? 'bg-accent-500' :
          'bg-primary-500'
        }`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
