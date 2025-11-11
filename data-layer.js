// Couche d'abstraction des données
// Permet de basculer facilement entre localStorage et Airtable

class DataLayer {
  constructor() {
    this.storageType = APP_CONFIG.storage.type;
    this.prefix = APP_CONFIG.storage.prefix;
    
    // Configuration pour future intégration Airtable
    this.airtableConfig = {
      baseId: null,
      apiKey: null,
      tables: {
        marches: 'Marchés',
        livrables: 'Livrables',
        decomptes: 'Décomptes',
        avenants: 'Avenants',
        garanties: 'Garanties'
      }
    };
  }
  
  // ===== MÉTHODES GÉNÉRIQUES =====
  
  // Sauvegarder des données
  async save(collection, data) {
    if (this.storageType === 'localStorage') {
      return this._saveToLocalStorage(collection, data);
    } else if (this.storageType === 'airtable') {
      return this._saveToAirtable(collection, data);
    }
  }
  
  // Récupérer des données
  async get(collection, id = null) {
    if (this.storageType === 'localStorage') {
      return this._getFromLocalStorage(collection, id);
    } else if (this.storageType === 'airtable') {
      return this._getFromAirtable(collection, id);
    }
  }
  
  // Mettre à jour des données
  async update(collection, id, data) {
    if (this.storageType === 'localStorage') {
      return this._updateInLocalStorage(collection, id, data);
    } else if (this.storageType === 'airtable') {
      return this._updateInAirtable(collection, id, data);
    }
  }
  
  // Supprimer des données
  async delete(collection, id) {
    if (this.storageType === 'localStorage') {
      return this._deleteFromLocalStorage(collection, id);
    } else if (this.storageType === 'airtable') {
      return this._deleteFromAirtable(collection, id);
    }
  }
  
  // Rechercher des données
  async search(collection, filters = {}) {
    if (this.storageType === 'localStorage') {
      return this._searchInLocalStorage(collection, filters);
    } else if (this.storageType === 'airtable') {
      return this._searchInAirtable(collection, filters);
    }
  }
  
  // ===== IMPLÉMENTATION LOCAL STORAGE =====
  
  _getStorageKey(collection) {
    return `${this.prefix}${collection}`;
  }
  
  _saveToLocalStorage(collection, data) {
    try {
      const key = this._getStorageKey(collection);
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      
      // Générer un ID si nécessaire
      if (!data.id) {
        data.id = this._generateId(collection);
      }
      
      // Ajouter timestamp
      data.createdAt = data.createdAt || new Date().toISOString();
      data.updatedAt = new Date().toISOString();
      
      existing.push(data);
      localStorage.setItem(key, JSON.stringify(existing));
      
      return { success: true, data };
    } catch (error) {
      console.error('Erreur save localStorage:', error);
      return { success: false, error: error.message };
    }
  }
  
  _getFromLocalStorage(collection, id = null) {
    try {
      const key = this._getStorageKey(collection);
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      
      if (id) {
        const item = data.find(d => d.id === id);
        return { success: true, data: item };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Erreur get localStorage:', error);
      return { success: false, error: error.message };
    }
  }
  
  _updateInLocalStorage(collection, id, updates) {
    try {
      const key = this._getStorageKey(collection);
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      const index = data.findIndex(d => d.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Élément non trouvé' };
      }
      
      data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(data));
      
      return { success: true, data: data[index] };
    } catch (error) {
      console.error('Erreur update localStorage:', error);
      return { success: false, error: error.message };
    }
  }
  
  _deleteFromLocalStorage(collection, id) {
    try {
      const key = this._getStorageKey(collection);
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = data.filter(d => d.id !== id);
      
      localStorage.setItem(key, JSON.stringify(filtered));
      
      return { success: true };
    } catch (error) {
      console.error('Erreur delete localStorage:', error);
      return { success: false, error: error.message };
    }
  }
  
  _searchInLocalStorage(collection, filters) {
    try {
      const key = this._getStorageKey(collection);
      let data = JSON.parse(localStorage.getItem(key) || '[]');
      
      // Appliquer les filtres
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          data = data.filter(item => {
            const value = this._getNestedValue(item, key);
            if (typeof filters[key] === 'string') {
              return value && value.toString().toLowerCase().includes(filters[key].toLowerCase());
            }
            return value === filters[key];
          });
        }
      });
      
      return { success: true, data };
    } catch (error) {
      console.error('Erreur search localStorage:', error);
      return { success: false, error: error.message };
    }
  }
  
  _getNestedValue(obj, path) {
    return path.split('.').reduce((curr, key) => curr?.[key], obj);
  }
  
  _generateId(collection) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${collection.toUpperCase()}_${timestamp}_${random}`;
  }
  
  // ===== IMPLÉMENTATION AIRTABLE (PLACEHOLDER) =====
  
  async _saveToAirtable(collection, data) {
    // TODO: Implémenter l'intégration Airtable
    throw new Error('Airtable non encore implémenté');
  }
  
  async _getFromAirtable(collection, id) {
    // TODO: Implémenter l'intégration Airtable
    throw new Error('Airtable non encore implémenté');
  }
  
  async _updateInAirtable(collection, id, data) {
    // TODO: Implémenter l'intégration Airtable
    throw new Error('Airtable non encore implémenté');
  }
  
  async _deleteFromAirtable(collection, id) {
    // TODO: Implémenter l'intégration Airtable
    throw new Error('Airtable non encore implémenté');
  }
  
  async _searchInAirtable(collection, filters) {
    // TODO: Implémenter l'intégration Airtable
    throw new Error('Airtable non encore implémenté');
  }
  
  // ===== MÉTHODES SPÉCIFIQUES MÉTIER =====
  
  // Initialiser les données de test
  initMockData() {
    if (this.storageType === 'localStorage') {
      const key = this._getStorageKey('marches');
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(MOCK_DATA.marches));
        console.log('Données de test initialisées');
      }
    }
  }
  
  // Réinitialiser les données
  resetData() {
    if (this.storageType === 'localStorage') {
      const collections = ['marches', 'livrables', 'decomptes', 'avenants', 'garanties'];
      collections.forEach(collection => {
        localStorage.removeItem(this._getStorageKey(collection));
      });
      console.log('Données réinitialisées');
    }
  }
  
  // Exporter les données
  exportData() {
    if (this.storageType === 'localStorage') {
      const collections = ['marches', 'livrables', 'decomptes', 'avenants', 'garanties'];
      const exportData = {};
      
      collections.forEach(collection => {
        const key = this._getStorageKey(collection);
        exportData[collection] = JSON.parse(localStorage.getItem(key) || '[]');
      });
      
      return exportData;
    }
  }
  
  // Importer des données
  importData(data) {
    if (this.storageType === 'localStorage') {
      Object.keys(data).forEach(collection => {
        const key = this._getStorageKey(collection);
        localStorage.setItem(key, JSON.stringify(data[collection]));
      });
      
      console.log('Données importées avec succès');
    }
  }
  
  // ===== MÉTHODES SPÉCIFIQUES MARCHÉS =====
  
  async getMarcheWithDetails(id) {
    const result = await this.get('marches', id);
    if (!result.success) return result;
    
    // Enrichir avec les données liées si nécessaire
    const marche = result.data;
    
    return { success: true, data: marche };
  }
  
  async updateStatutMarche(id, nouveauStatut, motif = null) {
    const updates = {
      statut: nouveauStatut,
      dateModificationStatut: new Date().toISOString()
    };
    
    if (motif) {
      updates.motifChangementStatut = motif;
    }
    
    return await this.update('marches', id, updates);
  }
  
  async addDecisionCF(marcheId, decision) {
    const updates = {
      decisionCF: {
        ...decision,
        date: decision.date || new Date().toISOString()
      },
      dateVisaCF: decision.decision === 'VISA' ? new Date().toISOString() : null
    };
    
    // Mettre à jour le statut selon la décision
    if (decision.decision === 'VISA') {
      updates.statut = 'VISE';
    } else if (decision.decision === 'RESERVE') {
      updates.statut = 'RESERVE';
    } else if (decision.decision === 'REFUS') {
      updates.statut = 'REFUSE';
    }
    
    return await this.update('marches', marcheId, updates);
  }
  
  // Calculer les statistiques
  async getStatistics(filters = {}) {
    const result = await this.search('marches', filters);
    if (!result.success) return result;
    
    const marches = result.data;
    
    const stats = {
      total: marches.length,
      parStatut: {},
      parType: {},
      montantTotal: 0,
      montantPaye: 0,
      tauxExecution: 0
    };
    
    // Compter par statut
    Object.keys(APP_CONFIG.statutsMarcheWorkflow).forEach(statut => {
      stats.parStatut[statut] = marches.filter(m => m.statut === statut).length;
    });
    
    // Compter par type
    APP_CONFIG.typesMarchés.forEach(type => {
      stats.parType[type.code] = marches.filter(m => m.typeMarche === type.code).length;
    });
    
    // Calculer les montants
    marches.forEach(m => {
      stats.montantTotal += (m.montantActuel || m.montantInitial || m.montantPrevisionnel || 0);
      stats.montantPaye += (m.montantPaye || 0);
    });
    
    // Calculer le taux d'exécution
    if (stats.montantTotal > 0) {
      stats.tauxExecution = (stats.montantPaye / stats.montantTotal) * 100;
    }
    
    return { success: true, data: stats };
  }
}

// Instance globale
const dataLayer = new DataLayer();

// Initialiser les données de test au chargement
document.addEventListener('DOMContentLoaded', () => {
  dataLayer.initMockData();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataLayer, dataLayer };
}
