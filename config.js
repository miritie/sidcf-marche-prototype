// Configuration globale de l'application

const APP_CONFIG = {
  // Informations de l'application
  appName: 'SID-CF',
  moduleName: 'Module Marchés',
  version: '1.0.0',
  
  // Logo (peut être changé facilement)
  logo: {
    path: './assets/img/logo.png',
    alt: 'Logo SID-CF'
  },
  
  // Paramètres de pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  },
  
  // Formats
  formats: {
    date: 'DD/MM/YYYY',
    datetime: 'DD/MM/YYYY HH:mm',
    currency: 'FCFA',
    decimalSeparator: ',',
    thousandSeparator: ' '
  },
  
  // Règles de gestion
  rules: {
    // Seuil maximum d'avenants (en pourcentage du montant initial)
    maxAvenantThreshold: 30,
    
    // Seuil d'alerte pour les avenants (en pourcentage)
    alertAvenantThreshold: 25,
    
    // Délai d'alerte absence OS après visa (en jours)
    alertDelayOsAfterVisa: 30,
    
    // Délai d'alerte absence décompte après OS (en jours)
    alertDelayDecompteAfterOs: 60,
    
    // Modes de passation et seuils (en FCFA)
    modesPassation: {
      PSC: { label: 'Prestation Simplifiée Commune', maxAmount: 15000000 },
      PSD: { label: 'Prestation Simplifiée Dérogatoire', maxAmount: 30000000 },
      PSO: { label: 'Prestation Simplifiée sur Ordre', maxAmount: null },
      AOO: { label: 'Appel d\'Offres Ouvert', minAmount: 30000000 },
      AOR: { label: 'Appel d\'Offres Restreint', minAmount: 30000000 },
      PI: { label: 'Prestation Intellectuelle', maxAmount: null },
      DEROGATOIRE: { label: 'Procédure Dérogatoire', maxAmount: null }
    }
  },
  
  // États des marchés
  statutsMarcheWorkflow: {
    PLANIFIE: { label: 'Planifié', color: 'secondary', nextStates: ['EN_PASSATION'] },
    EN_PASSATION: { label: 'En passation', color: 'info', nextStates: ['ATTENTE_VISA'] },
    ATTENTE_VISA: { label: 'Attente visa CF', color: 'warning', nextStates: ['VISE', 'RESERVE', 'REFUSE'] },
    VISE: { label: 'Visé', color: 'success', nextStates: ['EN_EXECUTION'] },
    RESERVE: { label: 'Réservé', color: 'warning', nextStates: ['ATTENTE_VISA', 'REFUSE'] },
    REFUSE: { label: 'Refusé', color: 'danger', nextStates: [] },
    EN_EXECUTION: { label: 'En exécution', color: 'info', nextStates: ['EN_CLOTURE', 'RESILIE'] },
    RESILIE: { label: 'Résilié', color: 'danger', nextStates: [] },
    EN_CLOTURE: { label: 'En clôture', color: 'warning', nextStates: ['CLOS'] },
    CLOS: { label: 'Clos', color: 'secondary', nextStates: [] }
  },
  
  // Types de décisions CF
  decisonsCF: {
    VISA: { label: 'Visa accordé', color: 'success', icon: '✓' },
    RESERVE: { label: 'Réserve émise', color: 'warning', icon: '⚠' },
    REFUS: { label: 'Refus de visa', color: 'danger', icon: '✗' }
  },
  
  // Motifs de réserve standardisés
  motifsReserve: [
    { code: 'RES_DOC_INCOMPLET', label: 'Dossier incomplet' },
    { code: 'RES_MONTANT_INCOHERENT', label: 'Montant incohérent avec budget' },
    { code: 'RES_PROCEDURE_IRREGULIERE', label: 'Procédure irrégulière' },
    { code: 'RES_JUSTIFICATION_INSUFFISANTE', label: 'Justification insuffisante' },
    { code: 'RES_NON_CONFORMITE_CODE', label: 'Non-conformité au Code des marchés' },
    { code: 'RES_BUDGET_INSUFFISANT', label: 'Budget insuffisant' },
    { code: 'RES_AUTRE', label: 'Autre motif (à préciser)' }
  ],
  
  // Motifs de refus standardisés
  motifsRefus: [
    { code: 'REF_BUDGET_INDISPONIBLE', label: 'Budget indisponible' },
    { code: 'REF_PROCEDURE_ILLEGALE', label: 'Procédure illégale' },
    { code: 'REF_MONTANT_EXCESSIF', label: 'Montant excessif' },
    { code: 'REF_NON_CONFORMITE_MAJEURE', label: 'Non-conformité majeure' },
    { code: 'REF_ATTRIBUTION_CONTESTEE', label: 'Attribution contestée' },
    { code: 'REF_RECOURS_EN_COURS', label: 'Recours en cours non résolu' },
    { code: 'REF_AUTRE', label: 'Autre motif (à préciser)' }
  ],
  
  // Types de livrables
  typesLivrables: [
    { code: 'OUVRAGE', label: 'Ouvrage / Infrastructure' },
    { code: 'FOURNITURE', label: 'Fourniture' },
    { code: 'ETUDE', label: 'Étude' },
    { code: 'SERVICE', label: 'Service' },
    { code: 'FORMATION', label: 'Formation' },
    { code: 'EQUIPEMENT', label: 'Équipement' },
    { code: 'AUTRE', label: 'Autre' }
  ],
  
  // Types de marchés
  typesMarchés: [
    { code: 'TRAVAUX', label: 'Travaux' },
    { code: 'FOURNITURES', label: 'Fournitures' },
    { code: 'SERVICES', label: 'Services' },
    { code: 'PI', label: 'Prestations Intellectuelles' }
  ],
  
  // Types de garanties
  typesGaranties: [
    { code: 'AVANCE', label: 'Garantie d\'avance' },
    { code: 'BONNE_EXECUTION', label: 'Garantie de bonne exécution' },
    { code: 'RETENUE_GARANTIE', label: 'Retenue de garantie' },
    { code: 'SOUMISSION', label: 'Garantie de soumission' }
  ],
  
  // Types d'avenants
  typesAvenants: [
    { code: 'FINANCIER', label: 'Avenant financier' },
    { code: 'DELAI', label: 'Avenant de délai' },
    { code: 'TECHNIQUE', label: 'Avenant technique' },
    { code: 'MIXTE', label: 'Avenant mixte (financier + délai/technique)' }
  ],
  
  // Types de recours
  typesRecours: [
    { code: 'GRACIEUX', label: 'Recours gracieux' },
    { code: 'HIERARCHIQUE', label: 'Recours hiérarchique' },
    { code: 'CONTENTIEUX', label: 'Recours contentieux' }
  ],
  
  // Priorités
  priorites: [
    { code: 'HAUTE', label: 'Haute', color: 'high' },
    { code: 'MOYENNE', label: 'Moyenne', color: 'medium' },
    { code: 'BASSE', label: 'Basse', color: 'low' }
  ],
  
  // Configuration du stockage
  storage: {
    type: 'localStorage', // 'localStorage' ou 'airtable' (à venir)
    prefix: 'sidcf_marches_' // préfixe pour les clés localStorage
  },
  
  // Messages système
  messages: {
    saveSuccess: 'Les données ont été enregistrées avec succès',
    saveError: 'Erreur lors de l\'enregistrement des données',
    deleteSuccess: 'Les données ont été supprimées avec succès',
    deleteError: 'Erreur lors de la suppression des données',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    requiredFields: 'Veuillez remplir tous les champs obligatoires',
    invalidAmount: 'Le montant saisi est invalide',
    invalidDate: 'La date saisie est invalide',
    budgetExceeded: 'Le montant dépasse le budget disponible',
    avenantThresholdExceeded: 'Le seuil cumulé d\'avenants est dépassé (>30%)',
    visaRequired: 'Un visa CF est requis avant de poursuivre',
    documentsRequired: 'Les documents obligatoires sont manquants'
  }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}
