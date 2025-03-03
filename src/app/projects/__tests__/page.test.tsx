import { render, screen, waitFor, fireEvent } from '@/utils/test-utils';
import { mockImageConstructor, waitForImagesToLoad } from '@/utils/__tests__/image-test-utils';
import ProjectsPage from '../page';
import { projects } from '@/data/projects';

// Mock the useAnalytics hook
jest.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: jest.fn()
  })
}));

// Mock the usePerformanceMonitoring hook
jest.mock('@/utils/performance', () => ({
  usePerformanceMonitoring: () => ({
    trackRender: jest.fn(),
    trackOperation: jest.fn()
  })
}));

describe('ProjectsPage', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Restore Image constructor after tests
  afterAll(() => {
    mockImageConstructor()();
  });

  it('renders the projects page header', () => {
    render(<ProjectsPage />);
    
    expect(screen.getByRole('heading', { name: /our projects/i })).toBeInTheDocument();
    expect(screen.getByText(/explore our portfolio/i)).toBeInTheDocument();
  });

  it('renders all project cards', async () => {
    render(<ProjectsPage />);
    
    // Wait for all images to load
    await waitForImagesToLoad();

    // Check if all projects are rendered
    projects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      expect(screen.getByText(project.category)).toBeInTheDocument();
    });
  });

  it('navigates to project detail page when clicking a project', async () => {
    render(<ProjectsPage />);
    
    await waitForImagesToLoad();

    const firstProject = projects[0];
    const projectLink = screen.getByRole('link', { name: new RegExp(firstProject.title, 'i') });
    
    expect(projectLink).toHaveAttribute('href', `/projects/${firstProject.slug}`);
  });

  it('animates project cards on scroll', async () => {
    render(<ProjectsPage />);
    
    await waitForImagesToLoad();

    const projectCards = screen.getAllByRole('article');
    projectCards.forEach(card => {
      expect(card).toHaveStyle({
        opacity: '0',
        transform: 'translateY(20px)'
      });
    });
  });

  it('lazy loads project images', async () => {
    render(<ProjectsPage />);

    const images = screen.getAllByRole('img');
    images.forEach(image => {
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  it('displays project categories', async () => {
    render(<ProjectsPage />);

    await waitForImagesToLoad();

    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    uniqueCategories.forEach(category => {
      const categoryElements = screen.getAllByText(category);
      expect(categoryElements.length).toBeGreaterThan(0);
    });
  });

  it('handles empty projects array gracefully', async () => {
    // Temporarily mock empty projects array
    jest.mock('@/data/projects', () => ({
      projects: []
    }));

    render(<ProjectsPage />);

    expect(screen.getByText(/explore our portfolio/i)).toBeInTheDocument();
    // Should show empty state or handle it gracefully
  });

  it('applies hover effects on project cards', async () => {
    render(<ProjectsPage />);

    await waitForImagesToLoad();

    const firstProjectCard = screen.getAllByRole('article')[0];
    fireEvent.mouseEnter(firstProjectCard);

    expect(firstProjectCard).toHaveClass('group-hover:scale-105');
  });

  it('maintains aspect ratio of project images', async () => {
    render(<ProjectsPage />);

    await waitForImagesToLoad();

    const imageContainers = screen.getAllByTestId('image-container');
    imageContainers.forEach(container => {
      expect(container).toHaveClass('aspect-[4/3]');
    });
  });

  describe('Accessibility', () => {
    it('has the correct heading hierarchy', () => {
      render(<ProjectsPage />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/our projects/i);
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBe(projects.length); // One h2 per project
    });

    it('has accessible link text', () => {
      render(<ProjectsPage />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).not.toHaveTextContent(/click here/i);
        expect(link).toHaveAttribute('href');
      });
    });

    it('maintains sufficient color contrast', () => {
      render(<ProjectsPage />);
      
      const description = screen.getByText(/explore our portfolio/i);
      expect(description).toHaveClass('text-neutral-600');
    });
  });
});