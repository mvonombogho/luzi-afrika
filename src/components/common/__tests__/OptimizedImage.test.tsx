import { render, screen, fireEvent, waitFor } from '@/utils/test-utils';
import OptimizedImage from '../OptimizedImage';

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 400,
    height: 300,
  };

  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByRole('img', { name: defaultProps.alt });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining(defaultProps.src));
    expect(image).toHaveClass('opacity-0'); // Initially hidden while loading
  });

  it('shows loading state initially', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const loadingIndicator = screen.getByTestId('loading-skeleton');
    expect(loadingIndicator).toBeInTheDocument();
    expect(loadingIndicator).toHaveClass('animate-pulse');
  });

  it('shows image and removes loading state after load', async () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByRole('img', { name: defaultProps.alt });
    fireEvent.load(image);

    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
    });
  });

  it('shows error state when image fails to load', async () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByRole('img', { name: defaultProps.alt });
    fireEvent.error(image);

    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
      expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    render(<OptimizedImage {...defaultProps} className={className} />);
    
    const container = screen.getByTestId('image-container');
    expect(container).toHaveClass(className);
  });

  it('handles priority prop', () => {
    render(<OptimizedImage {...defaultProps} priority />);
    
    const image = screen.getByRole('img', { name: defaultProps.alt });
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('calls onLoad callback when provided', async () => {
    const onLoad = jest.fn();
    render(<OptimizedImage {...defaultProps} onLoad={onLoad} />);
    
    const image = screen.getByRole('img', { name: defaultProps.alt });
    fireEvent.load(image);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('maintains aspect ratio container', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const container = screen.getByTestId('image-container');
    expect(container).toHaveStyle({
      aspectRatio: `${defaultProps.width} / ${defaultProps.height}`,
    });
  });

  it('handles sizes prop correctly', () => {
    const sizes = '(max-width: 768px) 100vw, 50vw';
    render(<OptimizedImage {...defaultProps} sizes={sizes} />);
    
    const image = screen.getByRole('img', { name: defaultProps.alt });
    expect(image).toHaveAttribute('sizes', sizes);
  });

  describe('Edge cases', () => {
    it('handles zero dimensions gracefully', () => {
      render(<OptimizedImage {...defaultProps} width={0} height={0} />);
      
      const container = screen.getByTestId('image-container');
      expect(container).toHaveStyle({ aspectRatio: '1 / 1' }); // Fallback ratio
    });

    it('handles very large dimensions', () => {
      render(<OptimizedImage {...defaultProps} width={9999} height={9999} />);
      
      const image = screen.getByRole('img', { name: defaultProps.alt });
      expect(image).toHaveAttribute('width', '9999');
      expect(image).toHaveAttribute('height', '9999');
    });

    it('handles malformed URLs', async () => {
      render(<OptimizedImage {...defaultProps} src="invalid-url" />);
      
      const image = screen.getByRole('img', { name: defaultProps.alt });
      fireEvent.error(image);

      await waitFor(() => {
        expect(screen.getByText('Failed to load image')).toBeInTheDocument();
      });
    });
  });
});