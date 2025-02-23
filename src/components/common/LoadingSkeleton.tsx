interface LoadingSkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}

const LoadingSkeleton = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = 'rounded-md'
}: LoadingSkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-neutral-200 ${height} ${width} ${rounded} ${className}`}
    />
  );
};

export default LoadingSkeleton;