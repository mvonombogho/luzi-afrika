// ***********************************************************
// This file is processed and loaded automatically before your test files.
// This is a great place to put global configuration and behavior that
// modifies Cypress.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Disable CSS animations and transitions in tests to make them more reliable
beforeEach(() => {
  // Disable CSS animations and transitions
  const styleRules = `
    *, *::before, *::after {
      transition-property: none !important;
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
    }
  `;
  
  cy.document().then(document => {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = styleRules;
    document.head.appendChild(style);
  });
});

// Log page load performance metrics
after(() => {
  cy.checkPerformance();
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  // Log error but don't fail the test
  console.error('Uncaught exception:', err);
  return false;
});

// Log console errors
Cypress.on('window:console', (msg) => {
  if (msg.type === 'error') {
    console.error('Console error:', msg.args);
  }
});