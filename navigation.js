// Système de navigation

const Navigation = {
  // Routes de l'application
  routes: {
    // Page d'accueil
    'index.html': {
      title: 'Tableau de bord',
      icon: '📊',
      category: 'dashboard'
    },
    
    // Planification
    'pages/planification/ecr-01a.html': {
      title: 'Import PPM',
      shortTitle: 'Import PPM',
      icon: '📥',
      category: 'planification',
      phase: 'PLANIFICATION'
    },
    'pages/planification/ecr-01b.html': {
      title: 'Saisie PPM unitaire',
      shortTitle: 'Saisie unitaire',
      icon: '➕',
      category: 'planification',
      phase: 'PLANIFICATION'
    },
    'pages/planification/ecr-01c.html': {
      title: 'Fiche marché & livrables',
      shortTitle: 'Fiche marché',
      icon: '📋',
      category: 'planification',
      phase: 'PLANIFICATION'
    },
    
    // Contractualisation
    'pages/contractualisation/ecr-02a.html': {
      title: 'Procédure & PV',
      shortTitle: 'Procédure & PV',
      icon: '📄',
      category: 'contractualisation',
      phase: 'CONTRACTUALISATION'
    },
    'pages/contractualisation/ecr-02b.html': {
      title: 'Recours & observations CF',
      shortTitle: 'Recours',
      icon: '⚠️',
      category: 'contractualisation',
      phase: 'CONTRACTUALISATION'
    },
    
    // Attribution
    'pages/attribution/ecr-03a.html': {
      title: 'Attribution & décision CF',
      shortTitle: 'Attribution',
      icon: '✓',
      category: 'attribution',
      phase: 'ATTRIBUTION'
    },
    'pages/attribution/ecr-03b.html': {
      title: 'Échéancier & clé de répartition',
      shortTitle: 'Échéancier',
      icon: '📅',
      category: 'attribution',
      phase: 'ATTRIBUTION'
    },
    
    // Exécution
    'pages/execution/ecr-04a.html': {
      title: 'Exécution & OS/décomptes',
      shortTitle: 'Exécution',
      icon: '🏗️',
      category: 'execution',
      phase: 'EXÉCUTION'
    },
    'pages/execution/ecr-04b.html': {
      title: 'Avenants',
      shortTitle: 'Avenants',
      icon: '📝',
      category: 'execution',
      phase: 'EXÉCUTION'
    },
    'pages/execution/ecr-04c.html': {
      title: 'Garanties & résiliation',
      shortTitle: 'Garanties',
      icon: '🔒',
      category: 'execution',
      phase: 'EXÉCUTION'
    },
    
    // Clôture
    'pages/cloture/ecr-05.html': {
      title: 'Clôture & réceptions',
      shortTitle: 'Clôture',
      icon: '✅',
      category: 'cloture',
      phase: 'CLÔTURE'
    },
    
    // Paramétrage
    'pages/parametrage/index.html': {
      title: 'Paramètres',
      shortTitle: 'Paramètres',
      icon: '⚙️',
      category: 'settings',
      admin: true
    }
  },
  
  // Obtenir la route actuelle
  getCurrentRoute() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const folder = path.split('/').slice(-2, -1)[0];
    
    if (folder && folder !== '') {
      return `pages/${folder}/${filename}`;
    }
    return filename;
  },
  
  // Obtenir les informations de la route actuelle
  getCurrentRouteInfo() {
    const route = this.getCurrentRoute();
    return this.routes[route] || { title: 'Page inconnue' };
  },
  
  // Naviguer vers une page
  navigateTo(route, params = {}) {
    // Sauvegarder les paramètres en session
    if (Object.keys(params).length > 0) {
      Utils.saveToSession('navParams', params);
    }
    
    // Construire l'URL
    let url = route;
    if (!route.startsWith('http') && !route.startsWith('/')) {
      // Chemin relatif
      const currentPath = window.location.pathname;
      const depth = currentPath.split('/').length - 2; // Nombre de niveaux à remonter
      const prefix = '../'.repeat(Math.max(0, depth));
      url = prefix + route;
    }
    
    window.location.href = url;
  },
  
  // Retour arrière
  goBack() {
    window.history.back();
  },
  
  // Récupérer les paramètres de navigation
  getNavigationParams() {
    const params = Utils.getFromSession('navParams');
    // Nettoyer après récupération
    sessionStorage.removeItem('navParams');
    return params || {};
  },
  
  // Générer le fil d'Ariane
  generateBreadcrumb() {
    const route = this.getCurrentRoute();
    const routeInfo = this.routes[route];
    
    if (!routeInfo) return [];
    
    const breadcrumb = [
      { label: 'Accueil', url: 'index.html', icon: '🏠' }
    ];
    
    // Ajouter la phase si applicable
    if (routeInfo.phase) {
      breadcrumb.push({
        label: routeInfo.phase,
        url: null
      });
    }
    
    // Ajouter la page actuelle
    breadcrumb.push({
      label: routeInfo.title,
      url: null,
      active: true
    });
    
    return breadcrumb;
  },
  
  // Générer la navigation par phase
  generatePhaseNavigation() {
    const phases = {
      'PLANIFICATION': [],
      'CONTRACTUALISATION': [],
      'ATTRIBUTION': [],
      'EXÉCUTION': [],
      'CLÔTURE': []
    };
    
    Object.entries(this.routes).forEach(([route, info]) => {
      if (info.phase && phases[info.phase]) {
        phases[info.phase].push({
          route,
          title: info.shortTitle || info.title,
          icon: info.icon
        });
      }
    });
    
    return phases;
  },
  
  // Vérifier si une route est accessible selon le statut du marché
  isRouteAccessible(route, marcheStatut) {
    const routeInfo = this.routes[route];
    if (!routeInfo || !routeInfo.phase) return true;
    
    // Règles d'accessibilité selon le statut
    const accessRules = {
      'PLANIFIE': ['PLANIFICATION'],
      'EN_PASSATION': ['PLANIFICATION', 'CONTRACTUALISATION'],
      'ATTENTE_VISA': ['PLANIFICATION', 'CONTRACTUALISATION', 'ATTRIBUTION'],
      'VISE': ['PLANIFICATION', 'CONTRACTUALISATION', 'ATTRIBUTION', 'EXÉCUTION'],
      'EN_EXECUTION': ['PLANIFICATION', 'CONTRACTUALISATION', 'ATTRIBUTION', 'EXÉCUTION'],
      'EN_CLOTURE': ['PLANIFICATION', 'CONTRACTUALISATION', 'ATTRIBUTION', 'EXÉCUTION', 'CLÔTURE'],
      'CLOS': ['PLANIFICATION', 'CONTRACTUALISATION', 'ATTRIBUTION', 'EXÉCUTION', 'CLÔTURE']
    };
    
    const allowedPhases = accessRules[marcheStatut] || [];
    return allowedPhases.includes(routeInfo.phase);
  },
  
  // Obtenir la prochaine étape logique selon le statut
  getNextStep(marcheStatut) {
    const nextSteps = {
      'PLANIFIE': 'pages/contractualisation/ecr-02a.html',
      'EN_PASSATION': 'pages/attribution/ecr-03a.html',
      'ATTENTE_VISA': 'pages/attribution/ecr-03a.html',
      'VISE': 'pages/execution/ecr-04a.html',
      'EN_EXECUTION': 'pages/execution/ecr-04a.html',
      'EN_CLOTURE': 'pages/cloture/ecr-05.html'
    };
    
    return nextSteps[marcheStatut];
  }
};

// Fonction pour générer le menu de navigation
function generateNavigationMenu() {
  const phases = Navigation.generatePhaseNavigation();
  const currentRoute = Navigation.getCurrentRoute();
  
  const menuHTML = `
    <div class="nav-menu-dropdown">
      <button class="btn btn-secondary" id="navMenuBtn">
        📖 Navigation
      </button>
      <div class="nav-menu-content" id="navMenuContent" style="display: none;">
        ${Object.entries(phases).map(([phase, routes]) => `
          <div class="nav-menu-section">
            <div class="nav-menu-section-title">${phase}</div>
            ${routes.map(route => `
              <a href="${route.route}" class="nav-menu-item ${currentRoute === route.route ? 'active' : ''}">
                <span class="nav-menu-icon">${route.icon}</span>
                <span>${route.title}</span>
              </a>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  return menuHTML;
}

// Fonction pour générer le fil d'Ariane
function generateBreadcrumbHTML() {
  const breadcrumb = Navigation.generateBreadcrumb();
  
  return `
    <nav class="breadcrumb">
      ${breadcrumb.map((item, index) => `
        <div class="breadcrumb-item">
          ${item.icon ? `<span>${item.icon}</span>` : ''}
          ${item.url && !item.active
            ? `<a href="${item.url}">${item.label}</a>`
            : `<span>${item.label}</span>`
          }
          ${index < breadcrumb.length - 1 ? '<span class="breadcrumb-separator">›</span>' : ''}
        </div>
      `).join('')}
    </nav>
  `;
}

// Initialiser la navigation au chargement
document.addEventListener('DOMContentLoaded', () => {
  // Ajouter les styles pour le menu déroulant
  const style = document.createElement('style');
  style.textContent = `
    .nav-menu-dropdown {
      position: relative;
      display: inline-block;
    }
    
    .nav-menu-content {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      min-width: 250px;
      max-height: 500px;
      overflow-y: auto;
      z-index: var(--z-dropdown);
      margin-top: var(--spacing-xs);
    }
    
    .nav-menu-section {
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--border-light);
    }
    
    .nav-menu-section:last-child {
      border-bottom: none;
    }
    
    .nav-menu-section-title {
      padding: var(--spacing-xs) var(--spacing-md);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    
    .nav-menu-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      color: var(--text-primary);
      text-decoration: none;
      transition: background-color var(--transition-fast);
    }
    
    .nav-menu-item:hover {
      background-color: var(--gray-50);
    }
    
    .nav-menu-item.active {
      background-color: var(--primary-green);
      color: var(--text-white);
    }
    
    .nav-menu-icon {
      font-size: var(--font-size-lg);
    }
  `;
  document.head.appendChild(style);
  
  // Gérer le clic sur le bouton du menu
  document.addEventListener('click', (e) => {
    const menuBtn = document.getElementById('navMenuBtn');
    const menuContent = document.getElementById('navMenuContent');
    
    if (menuBtn && menuContent) {
      if (e.target === menuBtn || menuBtn.contains(e.target)) {
        menuContent.style.display = menuContent.style.display === 'none' ? 'block' : 'none';
      } else if (!menuContent.contains(e.target)) {
        menuContent.style.display = 'none';
      }
    }
  });
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Navigation, generateNavigationMenu, generateBreadcrumbHTML };
}
