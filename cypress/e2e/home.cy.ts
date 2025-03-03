describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the hero section', () => {
    cy.get('h1').contains('Building');
    cy.get('h1').contains('Intelligent');
    cy.get('h1').contains('Digital Solutions');
  });

  it('has working navigation', () => {
    cy.get('nav').should('be.visible');
    cy.contains('Services').click();
    cy.get('#services').should('be.visible');
    
    cy.contains('About').click();
    cy.get('#about').should('be.visible');
    
    cy.contains('Projects').click();
    cy.get('#projects').should('be.visible');
    
    cy.contains('Contact').click();
    cy.get('#contact').should('be.visible');
  });

  it('loads services section', () => {
    cy.get('#services').scrollIntoView();
    cy.get('#services').should('be.visible');
    cy.get('#services').contains('Our Services');
  });

  it('loads about section', () => {
    cy.get('#about').scrollIntoView();
    cy.get('#about').should('be.visible');
    cy.get('#about').contains('Transforming businesses');
  });

  it('loads projects section', () => {
    cy.get('#projects').scrollIntoView();
    cy.get('#projects').should('be.visible');
    cy.get('#projects').contains('Featured Projects');
  });

  it('loads contact section', () => {
    cy.get('#contact').scrollIntoView();
    cy.get('#contact').should('be.visible');
    cy.get('#contact').contains('Let\'s Work');
  });

  it('has a working contact form', () => {
    cy.get('#contact').scrollIntoView();
    
    cy.get('#name').type('Test User');
    cy.get('#email').type('test@example.com');
    cy.get('#company').type('Test Company');
    cy.get('#message').type('This is a test message');
    
    cy.get('button').contains('Send Message').click();
    
    // Since we mock the form submission in the component,
    // we expect a success message
    cy.contains('Message sent successfully', { timeout: 6000 });
  });
});