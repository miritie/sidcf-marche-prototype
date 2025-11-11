// Fonctions utilitaires

const Utils = {
  // ===== FORMATAGE =====
  
  // Formater un montant
  formatMontant(montant, devise = APP_CONFIG.formats.currency) {
    if (!montant && montant !== 0) return '-';
    
    const formatted = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(montant);
    
    return `${formatted} ${devise}`;
  },
  
  // Formater une date
  formatDate(date, format = APP_CONFIG.formats.date) {
    if (!date) return '-';
    
    const d = new Date(date);
    if (isNaN(d)) return '-';
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    if (format === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;
    } else if (format === 'DD/MM/YYYY HH:mm') {
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    
    return date;
  },
  
  // Formater un pourcentage
  formatPourcentage(value) {
    if (!value && value !== 0) return '-';
    return `${value.toFixed(2)}%`;
  },
  
  // ===== VALIDATION =====
  
  // Valider un montant
  validateMontant(montant) {
    const num = parseFloat(montant);
    return !isNaN(num) && num >= 0;
  },
  
  // Valider une date
  validateDate(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d);
  },
  
  // Valider un email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // Valider un numéro de téléphone ivoirien
  validatePhoneCI(phone) {
    const cleaned = phone.replace(/\s/g, '');
    const re = /^(\+225)?[0-9]{10}$/;
    return re.test(cleaned);
  },
  
  // Valider un RCCM
  validateRCCM(rccm) {
    const re = /^CI-[A-Z]{3}-\d{4}-[A-Z]-\d{5}$/;
    return re.test(rccm);
  },
  
  // Valider un IFU
  validateIFU(ifu) {
    return /^\d{10}$/.test(ifu);
  },
  
  // ===== CALCULS =====
  
  // Calculer le taux de variation
  calculateVariation(montantInitial, montantActuel) {
    if (!montantInitial || montantInitial === 0) return 0;
    return ((montantActuel - montantInitial) / montantInitial) * 100;
  },
  
  // Calculer le cumul des avenants
  calculateCumulAvenants(avenants) {
    if (!avenants || avenants.length === 0) return 0;
    return avenants.reduce((sum, av) => sum + (av.variationMontant || 0), 0);
  },
  
  // Calculer le taux cumulé des avenants
  calculateTauxCumuleAvenants(montantInitial, avenants) {
    const cumulVariation = this.calculateCumulAvenants(avenants);
    if (!montantInitial || montantInitial === 0) return 0;
    return (cumulVariation / montantInitial) * 100;
  },
  
  // Calculer le nombre de jours entre deux dates
  daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
  
  // Ajouter des jours à une date
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  },
  
  // ===== GÉNÉRATION =====
  
  // Générer un numéro de marché
  generateNumeroMarche(exercice, sequence) {
    return `DA${exercice}-${String(sequence).padStart(3, '0')}`;
  },
  
  // Générer un ID unique
  generateId(prefix = 'ID') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  },
  
  // ===== STATUT & BADGES =====
  
  // Obtenir la classe CSS d'un statut
  getStatutClass(statut) {
    const config = APP_CONFIG.statutsMarcheWorkflow[statut];
    return config ? `badge-${config.color}` : 'badge-secondary';
  },
  
  // Obtenir le label d'un statut
  getStatutLabel(statut) {
    const config = APP_CONFIG.statutsMarcheWorkflow[statut];
    return config ? config.label : statut;
  },
  
  // Obtenir la classe CSS d'une priorité
  getPrioriteClass(priorite) {
    const config = APP_CONFIG.priorites.find(p => p.code === priorite);
    return config ? `priority-${config.color}` : 'priority-medium';
  },
  
  // ===== ALERTES & NOTIFICATIONS =====
  
  // Afficher une notification de succès
  showSuccess(message) {
    this.showNotification(message, 'success');
  },
  
  // Afficher une notification d'erreur
  showError(message) {
    this.showNotification(message, 'danger');
  },
  
  // Afficher une notification d'avertissement
  showWarning(message) {
    this.showNotification(message, 'warning');
  },
  
  // Afficher une notification générique
  showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      max-width: 500px;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  },
  
  // Confirmer une action
  async confirm(message) {
    return window.confirm(message);
  },
  
  // ===== RÈGLES MÉTIER =====
  
  // Vérifier si un avenant dépasse le seuil
  checkSeuilAvenant(montantInitial, avenants) {
    const tauxCumule = this.calculateTauxCumuleAvenants(montantInitial, avenants);
    const seuil = APP_CONFIG.rules.maxAvenantThreshold;
    const alerte = APP_CONFIG.rules.alertAvenantThreshold;
    
    return {
      tauxCumule,
      depasseAlerte: tauxCumule >= alerte,
      depasseSeuil: tauxCumule >= seuil,
      message: tauxCumule >= seuil 
        ? `Seuil dépassé (${tauxCumule.toFixed(2)}% > ${seuil}%)`
        : tauxCumule >= alerte
        ? `Attention: proche du seuil (${tauxCumule.toFixed(2)}%)`
        : null
    };
  },
  
  // Vérifier la cohérence budgétaire
  checkCoherenceBudgetaire(montant, budget) {
    if (!budget || budget.disponible === undefined) {
      return { coherent: true, message: null };
    }
    
    if (montant > budget.disponible) {
      return {
        coherent: false,
        message: `Budget insuffisant: ${this.formatMontant(montant)} > ${this.formatMontant(budget.disponible)}`
      };
    }
    
    return { coherent: true, message: null };
  },
  
  // Vérifier si un retard est détecté
  checkRetard(type, dates) {
    const now = new Date();
    let delai, dateReference, message;
    
    if (type === 'OS_AFTER_VISA') {
      delai = APP_CONFIG.rules.alertDelayOsAfterVisa;
      dateReference = dates.dateVisaCF;
      message = 'Retard émission OS après visa CF';
    } else if (type === 'DECOMPTE_AFTER_OS') {
      delai = APP_CONFIG.rules.alertDelayDecompteAfterOs;
      dateReference = dates.dateOS;
      message = 'Retard premier décompte après OS';
    }
    
    if (!dateReference) return null;
    
    const jours = this.daysBetween(dateReference, now);
    
    if (jours > delai) {
      return {
        retard: true,
        jours,
        message: `${message} (${jours} jours)`
      };
    }
    
    return null;
  },
  
  // ===== DOM & UI =====
  
  // Vider un élément
  clearElement(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      element.innerHTML = '';
    }
  },
  
  // Afficher/cacher un élément
  toggleElement(element, show) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      element.classList.toggle('hide', !show);
    }
  },
  
  // Désactiver/activer un élément
  toggleDisabled(element, disabled) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      element.disabled = disabled;
    }
  },
  
  // ===== EXPORT =====
  
  // Exporter en CSV
  exportToCSV(data, filename) {
    if (!data || data.length === 0) {
      this.showWarning('Aucune donnée à exporter');
      return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(';'),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(';') 
          ? `"${value}"` 
          : value;
      }).join(';'))
    ].join('\n');
    
    this.downloadFile(csvContent, filename, 'text/csv');
  },
  
  // Télécharger un fichier
  downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  },
  
  // ===== STORAGE =====
  
  // Sauvegarder dans sessionStorage
  saveToSession(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Erreur saveToSession:', e);
    }
  },
  
  // Récupérer depuis sessionStorage
  getFromSession(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Erreur getFromSession:', e);
      return null;
    }
  },
  
  // ===== DEBOUNCE =====
  
  // Debounce une fonction
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Ajouter les animations CSS si elles n'existent pas
if (!document.getElementById('utils-animations')) {
  const style = document.createElement('style');
  style.id = 'utils-animations';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
