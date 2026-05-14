import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle size={28} className="text-error" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} icon={RefreshCw}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
