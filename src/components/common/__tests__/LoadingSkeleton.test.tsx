import { render, screen } from '@/utils/test-utils';
import LoadingSkeleton from '../LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders with default props', () => {
    render(<LoadingSkeleton />);
    const skeleton = screen.getByRole('generic');
    
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('bg-neutral-200');
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveClass('w-full');
    expect(skeleton).toHaveClass('rounded-md');
  });

  it('applies custom height class', () => {
    render(<LoadingSkeleton height="h-8" />);
    const skeleton = screen.getByRole('generic');
    
    expect(skeleton).toHaveClass('h-8');
    expect(skeleton).not.toHaveClass('h-4');
  });

  it('applies custom width class', () => {
    render(<LoadingSkeleton width="w-1/2" />);
    const skeleton = screen.getByRole('generic');
    
    expect(skeleton).toHaveClass('w-1/2');
    expect(skeleton).not.toHaveClass('w-full');
  });

  it('applies custom rounded class', () => {
    render(<LoadingSkeleton rounded="rounded-full" />);
    const skeleton = screen.getByRole('generic');
    
    expect(skeleton).toHaveClass('rounded-full');
    expect(skeleton).not.toHaveClass('rounded-md');
  });

  it('applies additional custom classes', () => {
    render(<LoadingSkeleton className="custom-class" />);
    const skeleton = screen.getByRole('generic');
    
    expect(skeleton).toHaveClass('custom-class');
  });

  it('applies multiple custom classes correctly', () => {
    render(
      <LoadingSkeleton
        height="h-16"
        width="w-32"
        rounded="rounded-lg"
        className="my-4 mx-2"
      />
    );
    
    const skeleton = screen.getByRole('generic');
    
    expect(skeleton).toHaveClass('h-16');
    expect(skeleton).toHaveClass('w-32');
    expect(skeleton).toHaveClass('rounded-lg');
    expect(skeleton).toHaveClass('my-4');
    expect(skeleton).toHaveClass('mx-2');
  });
});