const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'p-5',
  onClick,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white rounded-[var(--radius-md)] border border-slate-100
        shadow-[var(--shadow-card)] transition-all duration-200
        ${hover ? 'hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 cursor-pointer' : ''}
        ${padding}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-slate-900 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-slate-500 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-slate-100 ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
