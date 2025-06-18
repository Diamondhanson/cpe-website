// Central route configuration
const routes = {
  // Default/Home route
  home: {
    path: '/',
    name: 'Home',
    component: 'HomePage',
    isDefault: true
  },
  // About route
  about: {
    path: '/about',
    name: 'About',
    component: 'AboutPage',
    isDefault: false
  },
  // Services route
  services: {
    path: '/services',
    name: 'Services',
    component: 'ServicesPage',
    isDefault: false
  },
  // Portfolio route
  portfolio: {
    path: '/portfolio',
    name: 'Portfolio',
    component: 'PortfolioPage',
    isDefault: false
  },
  // Contact route
  contact: {
    path: '/contact',
    name: 'Contact',
    component: 'ContactPage',
    isDefault: false
  }
  // Additional routes can be added here
};

export default routes; 