import { render, screen, waitFor } from '@/utils/test-utils';
import { mockImageConstructor, waitForImagesToLoad } from '@/utils/__tests__/image-test-utils';
import ProjectPage from '../page';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock hooks
jest.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: jest.fn()
  })
}));

jest.mock('@/utils/performance', () => ({
  usePerformanceMonitoring: () => ({
    trackRender: jest.fn(),
    trackOperation: jest.fn()
  })
}));

describe('ProjectPage', () => {
  const mockProject = projects[0]; // Use first project as test case

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockImageConstructor()();
  });

  it('renders project details correctly', async () => {
    render(<ProjectPage params={{ slug: mockProject.slug }} />);
    
    await waitForImagesToLoad();

    // Check basic project information
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.category)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();

    // Check detailed sections
    expect(screen.getByText('The Challenge')).toBeInTheDocument();
    expect(screen.getByText(mockProject.challenge)).toBeInTheDocument();
    expect(screen.getByText('Our Solution')).toBeInTheDocument();
    expect(screen.getByText(mockProject.solution)).toBeInTheDocument();
  });

  it('calls notFound for invalid project slug', () => {
    render(<ProjectPage params={{ slug: 'invalid-slug' }} />);
    expect(notFound).toHaveBeenCalled();
  });

  it('displays project metadata correctly', async () => {
    render(<ProjectPage params={{ slug: mockProject.slug }} />);
    
    await waitForImagesToLoad();

    expect(screen.getByText(mockProject.client)).toBeInTheDocument();
    expect(screen.getByText(mockProject.duration)).toBeInTheDocument();
    
    // Check services and technologies
    mockProject.services.forEach(service => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });

    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders testimonial when available', async () => {
    const projectWithTestimonial = projects.find(p => p.testimonial);
    if (!projectWithTestimonial) return;

    render(<ProjectPage params={{ slug: projectWithTestimonial.slug }} />);
    
    await waitForImagesToLoad();

    expect(screen.getByText(projectWithTestimonial.testimonial!.quote)).toBeInTheDocument();
    expect(screen.getByText(projectWithTestimonial.testimonial!.author)).toBeInTheDocument();
  });

  it('renders gallery when available', async () => {
    const projectWithGallery = projects.find(p => p.gallery && p.gallery.length > 0);
    if (!projectWithGallery) return;

    render(<ProjectPage params={{ slug: projectWithGallery.slug }} />);
    
    await waitForImagesToLoad();

    expect(screen.getByText('Project Gallery')).toBeInTheDocument();
    const galleryImages = screen.getAllByRole('img');
    expect(galleryImages.length).toBeGreaterThan(1); // Main image + gallery images
  });

  it('displays project results', async () => {
    render(<ProjectPage params={{ slug: mockProject.slug }} />);
    
    await waitForImagesToLoad();

    expect(screen.getByText('Key Results')).toBeInTheDocument();
    mockProject.results.forEach(result => {
      expect(screen.getByText(result)).toBeInTheDocument();
    });
  });

  it('provides navigation back to projects list', async () => {
    render(<ProjectPage params={{ slug: mockProject.slug }} />);
    
    const backLink = screen.getByText('Back to Projects');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/projects');
  });

  describe('Responsive Layout', () => {
    it('adjusts layout for mobile screens', async () => {
      // Mock mobile viewport
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));

      render(<ProjectPage params={{ slug: mockProject.slug }} />);
      
      await waitForImagesToLoad();

      // Check if layout adjusts appropriately
      const content = screen.getByRole('main');
      expect(content).toHaveClass('grid-cols-1');
    });
  });

  describe('Accessibility', () => {
    it('maintains correct heading hierarchy', async () => {
      render(<ProjectPage params={{ slug: mockProject.slug }} />);
      
      await waitForImagesToLoad();

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(mockProject.title);

      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('provides alt text for images', async () => {
      render(<ProjectPage params={{ slug: mockProject.slug }} />);
      
      await waitForImagesToLoad();

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('ensures interactive elements are keyboard accessible', async () => {
      render(<ProjectPage params={{ slug: mockProject.slug }} />);
      
      await waitForImagesToLoad();

      const interactiveElements = screen.getAllByRole('button');
      interactiveElements.forEach(element => {
        expect(element).toHaveAttribute('tabIndex', '0');
      });
    });
  });
});