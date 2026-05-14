const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizes[size]} rounded-full
          border-primary-200 border-t-primary-800
          animate-spin
        `}
      />
    </div>
  );
};

export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 animate-fade-in">
    <Spinner size="lg" />
    <p className="text-sm text-slate-500 font-medium">{message}</p>
  </div>
);

export const SkeletonLine = ({ className = '' }) => (
  <div className={`h-4 rounded-md animate-shimmer ${className}`} />
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-[var(--radius-md)] border border-slate-100 p-5 space-y-4">
    <SkeletonLine className="w-3/4 h-5" />
    <SkeletonLine className="w-full" />
    <SkeletonLine className="w-1/2" />
    <div className="flex gap-2 pt-2">
      <SkeletonLine className="w-20 h-8 rounded-full" />
      <SkeletonLine className="w-20 h-8 rounded-full" />
    </div>
  </div>
);

export default Spinner;
