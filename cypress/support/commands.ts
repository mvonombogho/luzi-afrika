// Custom commands for Cypress tests

// Wait for animations to finish
Cypress.Commands.add('waitForAnimations', () => {
  cy.wait(1000); // Simple timeout for most animations to complete
});

// Scroll to an element and wait for animations
Cypress.Commands.add('scrollToAndWait', (selector) => {
  cy.get(selector).scrollIntoView();
  cy.waitForAnimations();
});

// Test if element is visible in viewport
Cypress.Commands.add('isInViewport', (selector) => {
  cy.get(selector).then($el => {
    const windowHeight = Cypress.config('viewportHeight');
    const rect = $el[0].getBoundingClientRect();
    
    expect(rect.top).to.be.lessThan(windowHeight);
    expect(rect.bottom).to.be.greaterThan(0);
  });
});

// Fill contact form with test data
Cypress.Commands.add('fillContactForm', ({ name, email, company, message }) => {
  cy.get('#name').type(name || 'Test User');
  cy.get('#email').type(email || 'test@example.com');
  cy.get('#company').type(company || 'Test Company');
  cy.get('#message').type(message || 'This is a test message');
});

// Check if element has animation class
Cypress.Commands.add('hasAnimation', (selector, animationClass) => {
  cy.get(selector).should('have.class', animationClass);
});

// Check page performance
Cypress.Commands.add('checkPerformance', () => {
  cy.window().then((win) => {
    const performance = win.performance;
    
    // Check page load time
    const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    cy.log(`Page load time: ${pageLoadTime}ms`);
    
    // Check for long tasks
    if (typeof performance.getEntriesByType === 'function') {
      const longTasks = performance.getEntriesByType('longtask');
      if (longTasks && longTasks.length > 0) {
        cy.log(`Found ${longTasks.length} long tasks`);
      }
    }
  });
});

// Test image loading
Cypress.Commands.add('imagesLoaded', { prevSubject: true }, (subject) => {
  const images = subject.find('img');
  
  if (images.length === 0) {
    return;
  }
  
  const promises = [];
  images.each((i, img) => {
    if (img.complete) {
      return;
    }
    
    const promise = new Cypress.Promise((resolve) => {
      img.addEventListener('load', () => resolve());
      img.addEventListener('error', () => resolve());
    });
    
    promises.push(promise);
  });
  
  return Cypress.Promise.all(promises).then(() => {
    return subject;
  });
});

// Declare Cypress namespace to extend types
declare global {
  namespace Cypress {
    interface Chainable {
      waitForAnimations(): Chainable<void>;
      scrollToAndWait(selector: string): Chainable<void>;
      isInViewport(selector: string): Chainable<void>;
      fillContactForm(data: { name?: string; email?: string; company?: string; message?: string }): Chainable<void>;
      hasAnimation(selector: string, animationClass: string): Chainable<void>;
      checkPerformance(): Chainable<void>;
      imagesLoaded(): Chainable<JQuery<HTMLElement>>;
    }
  }
}