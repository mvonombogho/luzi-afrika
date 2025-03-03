import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  beforeEach(() => {
    // Mock the current year to make tests deterministic
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the footer component', () => {
    render(<Footer />);
    expect(screen.getByText(/Let's Build Something/i)).toBeInTheDocument();
  });

  it('displays the current year in the copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Luzi Afrika Limited/i)).toBeInTheDocument();
  });

  it('renders company links', () => {
    render(<Footer />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders services links', () => {
    render(<Footer />);
    expect(screen.getAllByText('Services')).toHaveLength(2); // Once in company links, once as heading
    expect(screen.getByText('Custom AI Agents')).toBeInTheDocument();
    expect(screen.getByText('Hardware Support')).toBeInTheDocument();
    expect(screen.getByText('Software Solutions')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  it('includes the email address', () => {
    render(<Footer />);
    expect(screen.getByText('info@luziafrika.com')).toBeInTheDocument();
  });

  it('has proper link structure', () => {
    render(<Footer />);
    
    // Check company links have proper href attributes
    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('href', '/about');
    
    const servicesLink = screen.getByText('Services').closest('a');
    expect(servicesLink).toHaveAttribute('href', '/services');
    
    const projectsLink = screen.getByText('Projects').closest('a');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('has proper email link', () => {
    render(<Footer />);
    
    const emailLink = screen.getByText('info@luziafrika.com').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@luziafrika.com');
  });
});