// Design Suggestions Theme Switcher
(function() {
  const STORAGE_KEY = 'design-theme-preference';
  const DEFAULT_THEME = 'default';
  
  const themes = {
    'default': {
      name: 'Default',
      class: '',
      logo: '/cm.png'
    },
    'minimal-dark': {
      name: 'Minimal Dark',
      class: 'theme-minimal-dark',
      logo: '/assets/logos/logo-minimal-dark.svg'
    },
    'modern-gradient': {
      name: 'Modern Gradient',
      class: 'theme-modern-gradient',
      logo: '/assets/logos/logo-modern-gradient.svg'
    },
    'glassmorphism': {
      name: 'Glassmorphism',
      class: 'theme-glassmorphism',
      logo: '/assets/logos/logo-glassmorphism.svg'
    },
    'bold-typography': {
      name: 'Bold Typography',
      class: 'theme-bold-typography',
      logo: '/assets/logos/logo-bold-typography.svg'
    },
    'neumorphic': {
      name: 'Neumorphic',
      class: 'theme-neumorphic',
      logo: '/assets/logos/logo-neumorphic.svg'
    },
    'cyberpunk': {
      name: 'Cyberpunk',
      class: 'theme-cyberpunk',
      logo: '/assets/logos/logo-cyberpunk.svg'
    },
    'soft-ui': {
      name: 'Soft UI',
      class: 'theme-soft-ui',
      logo: '/assets/logos/logo-soft-ui.svg'
    },
    'minimalist-grid': {
      name: 'Minimalist Grid',
      class: 'theme-minimalist-grid',
      logo: '/assets/logos/logo-minimalist-grid.svg'
    },
    'retro-modern': {
      name: 'Retro Modern',
      class: 'theme-retro-modern',
      logo: '/assets/logos/logo-retro-modern.svg'
    },
    'brutalist': {
      name: 'Brutalist',
      class: 'theme-brutalist',
      logo: '/assets/logos/logo-brutalist.svg'
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
