// Force mobile sidebar clean peacock theme - single color, no gradients
document.addEventListener('DOMContentLoaded', function() {
  function forceMobileSidebarStyling() {
    // Only apply on mobile
    if (window.innerWidth <= 1230) { // 76.1875em = 1230px
      const sidebar = document.querySelector('.md-nav--primary');
      const sidebarContainer = document.querySelector('.md-sidebar--primary');
      const navLinks = document.querySelectorAll('.md-nav--primary .md-nav__link, .md-nav--primary a');
      const navTitle = document.querySelector('.md-nav__title');
      const navButton = document.querySelector('.md-nav__button');
      
      if (sidebar) {
        sidebar.style.setProperty('background', '#0f4c75', 'important');
        sidebar.style.setProperty('background-color', '#0f4c75', 'important');
        sidebar.style.setProperty('background-image', 'none', 'important');
      }
      
      if (sidebarContainer) {
        sidebarContainer.style.setProperty('background', '#0f4c75', 'important');
        sidebarContainer.style.setProperty('background-color', '#0f4c75', 'important');
        sidebarContainer.style.setProperty('background-image', 'none', 'important');
      }
      
      navLinks.forEach(link => {
        link.style.setProperty('color', '#ffffff', 'important');
      });
      
      if (navTitle) {
        navTitle.style.setProperty('background', '#0f4c75', 'important');
        navTitle.style.setProperty('background-color', '#0f4c75', 'important');
        navTitle.style.setProperty('background-image', 'none', 'important');
        navTitle.style.setProperty('color', '#ffffff', 'important');
      }
      
      if (navButton) {
        navButton.style.setProperty('background', '#0f4c75', 'important');
        navButton.style.setProperty('background-color', '#0f4c75', 'important');
        navButton.style.setProperty('background-image', 'none', 'important');
        navButton.style.setProperty('color', '#ffffff', 'important');
      }
    }
  }
  
  // Apply styling immediately and on any DOM changes
  forceMobileSidebarStyling();
  
  // Watch for any DOM changes that might override our styling
  const observer = new MutationObserver(forceMobileSidebarStyling);
  observer.observe(document.body, { 
    childList: true, 
    subtree: true, 
    attributes: true, 
    attributeFilter: ['class', 'style', 'data-md-color-scheme'] 
  });
  
  // Also apply on resize in case mobile/desktop switching happens
  window.addEventListener('resize', forceMobileSidebarStyling);
});