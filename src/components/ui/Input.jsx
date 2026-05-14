import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  type = 'text',
  id,
  helperText,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`
            w-full rounded-[var(--radius-md)] border bg-white
            px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-error ring-1 ring-error/20' : 'border-slate-200 hover:border-slate-300'}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-error font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
