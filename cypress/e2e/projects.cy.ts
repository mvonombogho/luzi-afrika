describe('Projects Page', () => {
  beforeEach(() => {
    cy.visit('/projects');
  });

  it('displays the projects page header', () => {
    cy.get('h1').contains('Our Projects');
    cy.contains('Explore our portfolio');
  });

  it('displays project cards', () => {
    // There should be at least 3 project cards
    cy.get('article').should('have.length.at.least', 3);
    
    // Each card should have title, category, and description
    cy.get('article').each(($card) => {
      cy.wrap($card).find('h2, h3').should('exist');
      cy.wrap($card).contains('View Project');
    });
  });

  it('navigates to project detail page when clicking on a project', () => {
    // Click the first project
    cy.get('article').first().click();
    
    // URL should change to project detail
    cy.url().should('include', '/projects/');
    
    // Should show project details
    cy.get('h1').should('exist');
    cy.contains('The Challenge').should('be.visible');
    cy.contains('Our Solution').should('be.visible');
  });

  it('allows navigation back to projects list', () => {
    // Go to first project
    cy.get('article').first().click();
    
    // Click back button
    cy.contains('Back to Projects').click();
    
    // Should be back at projects page
    cy.url().should('include', '/projects');
    cy.url().should('not.include', '/projects/');
    cy.get('h1').contains('Our Projects');
  });
});

describe('Project Detail Page', () => {
  beforeEach(() => {
    // Visit first project directly
    cy.visit('/projects');
    cy.get('article').first().click();
  });

  it('displays project header information', () => {
    cy.get('h1').should('exist');
    cy.get('img').should('be.visible'); // Hero image
  });

  it('displays project metadata', () => {
    cy.contains('Client').should('be.visible');
    cy.contains('Duration').should('be.visible');
    cy.contains('Services').should('be.visible');
    cy.contains('Technologies').should('be.visible');
  });

  it('displays project content sections', () => {
    cy.contains('The Challenge').should('be.visible');
    cy.contains('Our Solution').should('be.visible');
    cy.contains('Key Results').should('be.visible');
  });

  it('has navigable sections', () => {
    cy.contains('The Challenge').scrollIntoView();
    cy.contains('Our Solution').scrollIntoView();
    cy.contains('Key Results').scrollIntoView();
  });

  it('can navigate back to projects', () => {
    cy.contains('Back to Projects').click();
    cy.url().should('include', '/projects');
    cy.url().should('not.include', '/projects/');
  });
});