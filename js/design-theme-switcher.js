// Design Theme Switcher - Grid Brutalist Only
(function() {
  const STORAGE_KEY = 'design-theme-preference';
  const DEFAULT_THEME = 'grid-brutalist';
  
  const themes = {
    'grid-brutalist': {
      name: 'Grid Brutalist',
      class: 'theme-grid-brutalist',
      logo: '/assets/logos/logo-grid-brutalist.svg'
    }
  };
  
  // Initialize theme on page load
  function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    applyTheme(savedTheme);
  }
  
  // Apply theme
  function applyTheme(themeId) {
    if (!themes[themeId]) {
      themeId = DEFAULT_THEME;
    }
    
    const theme = themes[themeId];
    
    // Remove all theme classes from body
    Object.values(themes).forEach(t => {
      if (t.class) {
        document.body.classList.remove(t.class);
      }
    });
    
    // Add new theme class
    if (theme.class) {
      document.body.classList.add(theme.class);
    }
    
    // Update logo if it exists on the page
    updateLogos(theme.logo);
    
    // Save preference
    localStorage.setItem(STORAGE_KEY, themeId);
    
    // Update active button in theme switcher if it exists
    updateActiveButton(themeId);
  }
  
  // Update all logo images
  function updateLogos(logoUrl) {
    const logos = document.querySelectorAll('img[alt="codemunkies"]');
    logos.forEach(logo => {
      logo.src = logoUrl;
    });
  }
  
  // Update active button in theme switcher
  function updateActiveButton(themeId) {
    const buttons = document.querySelectorAll('.design-btn');
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-theme="${themeId}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
  
  // Expose public API
  window.DesignThemeSwitcher = {
    apply: applyTheme,
    getThemes: () => themes,
    getCurrentTheme: () => localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
  } else {
    initializeTheme();
  }
})();
