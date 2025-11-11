// Référentiels pour la chaîne budgétaire et autres données de base

const REFERENTIELS = {
  // Unités opérationnelles
  unitesOperationnelles: [
    { code: 'UO_MIN_SANTE', label: 'Ministère de la Santé' },
    { code: 'UO_MIN_EDUCATION', label: 'Ministère de l\'Éducation Nationale' },
    { code: 'UO_MIN_INFRA', label: 'Ministère des Infrastructures' },
    { code: 'UO_MIN_AGRICULTURE', label: 'Ministère de l\'Agriculture' },
    { code: 'UO_MIN_ECONOMIE', label: 'Ministère de l\'Économie et des Finances' },
    { code: 'UO_DGTCP', label: 'Direction Générale du Trésor' },
    { code: 'UO_DCF', label: 'Direction du Contrôle Financier' }
  ],
  
  // Sections budgétaires
  sections: [
    { code: 'SEC_01', label: 'Section 01 - Administration Générale' },
    { code: 'SEC_02', label: 'Section 02 - Enseignement' },
    { code: 'SEC_03', label: 'Section 03 - Santé' },
    { code: 'SEC_04', label: 'Section 04 - Infrastructures' },
    { code: 'SEC_05', label: 'Section 05 - Agriculture et Développement Rural' },
    { code: 'SEC_06', label: 'Section 06 - Équipement' },
    { code: 'SEC_07', label: 'Section 07 - Eau et Assainissement' }
  ],
  
  // Programmes budgétaires
  programmes: [
    { 
      code: 'PROG_01', 
      label: 'Programme 01 - Gouvernance et pilotage',
      section: 'SEC_01' 
    },
    { 
      code: 'PROG_02', 
      label: 'Programme 02 - Enseignement primaire',
      section: 'SEC_02' 
    },
    { 
      code: 'PROG_03', 
      label: 'Programme 03 - Enseignement secondaire',
      section: 'SEC_02' 
    },
    { 
      code: 'PROG_04', 
      label: 'Programme 04 - Soins de santé primaire',
      section: 'SEC_03' 
    },
    { 
      code: 'PROG_05', 
      label: 'Programme 05 - Infrastructures hospitalières',
      section: 'SEC_03' 
    },
    { 
      code: 'PROG_06', 
      label: 'Programme 06 - Routes et ponts',
      section: 'SEC_04' 
    },
    { 
      code: 'PROG_07', 
      label: 'Programme 07 - Bâtiments publics',
      section: 'SEC_04' 
    },
    { 
      code: 'PROG_08', 
      label: 'Programme 08 - Développement agricole',
      section: 'SEC_05' 
    },
    { 
      code: 'PROG_09', 
      label: 'Programme 09 - Hydraulique rurale',
      section: 'SEC_07' 
    }
  ],
  
  // Activités
  activites: [
    { 
      code: 'ACT_001', 
      label: 'Activité 001 - Gestion administrative',
      programme: 'PROG_01' 
    },
    { 
      code: 'ACT_002', 
      label: 'Activité 002 - Construction d\'écoles',
      programme: 'PROG_02' 
    },
    { 
      code: 'ACT_003', 
      label: 'Activité 003 - Équipement scolaire',
      programme: 'PROG_02' 
    },
    { 
      code: 'ACT_004', 
      label: 'Activité 004 - Construction lycées',
      programme: 'PROG_03' 
    },
    { 
      code: 'ACT_005', 
      label: 'Activité 005 - Construction centres de santé',
      programme: 'PROG_04' 
    },
    { 
      code: 'ACT_006', 
      label: 'Activité 006 - Équipement médical',
      programme: 'PROG_04' 
    },
    { 
      code: 'ACT_007', 
      label: 'Activité 007 - Construction hôpitaux',
      programme: 'PROG_05' 
    },
    { 
      code: 'ACT_008', 
      label: 'Activité 008 - Bitumage routes',
      programme: 'PROG_06' 
    },
    { 
      code: 'ACT_009', 
      label: 'Activité 009 - Construction ponts',
      programme: 'PROG_06' 
    },
    { 
      code: 'ACT_010', 
      label: 'Activité 010 - Réhabilitation bâtiments',
      programme: 'PROG_07' 
    },
    { 
      code: 'ACT_011', 
      label: 'Activité 011 - Aménagements agricoles',
      programme: 'PROG_08' 
    },
    { 
      code: 'ACT_012', 
      label: 'Activité 012 - Forages et puits',
      programme: 'PROG_09' 
    }
  ],
  
  // Natures économiques
  naturesEconomiques: [
    { 
      code: 'NAT_21', 
      label: '21 - Investissements directs',
      type: 'DEPENSES_CAPITAL' 
    },
    { 
      code: 'NAT_22', 
      label: '22 - Transferts en capital',
      type: 'DEPENSES_CAPITAL' 
    },
    { 
      code: 'NAT_23', 
      label: '23 - Acquisitions immobilières',
      type: 'DEPENSES_CAPITAL' 
    },
    { 
      code: 'NAT_24', 
      label: '24 - Équipements et matériels',
      type: 'DEPENSES_CAPITAL' 
    },
    { 
      code: 'NAT_60', 
      label: '60 - Services extérieurs',
      type: 'DEPENSES_FONCTIONNEMENT' 
    },
    { 
      code: 'NAT_61', 
      label: '61 - Autres services extérieurs',
      type: 'DEPENSES_FONCTIONNEMENT' 
    },
    { 
      code: 'NAT_62', 
      label: '62 - Fournitures courantes',
      type: 'DEPENSES_FONCTIONNEMENT' 
    }
  ],
  
  // Bailleurs de fonds
  bailleurs: [
    { 
      code: 'BAILLEUR_BE', 
      label: 'Budget d\'État',
      type: 'NATIONAL' 
    },
    { 
      code: 'BAILLEUR_BM', 
      label: 'Banque Mondiale',
      type: 'MULTILATERAL' 
    },
    { 
      code: 'BAILLEUR_BAD', 
      label: 'Banque Africaine de Développement',
      type: 'MULTILATERAL' 
    },
    { 
      code: 'BAILLEUR_AFD', 
      label: 'Agence Française de Développement',
      type: 'BILATERAL' 
    },
    { 
      code: 'BAILLEUR_UE', 
      label: 'Union Européenne',
      type: 'MULTILATERAL' 
    },
    { 
      code: 'BAILLEUR_KFW', 
      label: 'KfW (Allemagne)',
      type: 'BILATERAL' 
    },
    { 
      code: 'BAILLEUR_JICA', 
      label: 'JICA (Japon)',
      type: 'BILATERAL' 
    },
    { 
      code: 'BAILLEUR_USAID', 
      label: 'USAID',
      type: 'BILATERAL' 
    }
  ],
  
  // Types de financement
  typesFinancement: [
    { code: 'BUDGET_NATIONAL', label: 'Budget National' },
    { code: 'PRET', label: 'Prêt' },
    { code: 'DON', label: 'Don' },
    { code: 'COFINANCEMENT', label: 'Cofinancement' }
  ],
  
  // Régions
  regions: [
    { code: 'REG_01', label: 'Abidjan' },
    { code: 'REG_02', label: 'Bas-Sassandra' },
    { code: 'REG_03', label: 'Comoé' },
    { code: 'REG_04', label: 'Denguélé' },
    { code: 'REG_05', label: 'Gôh-Djiboua' },
    { code: 'REG_06', label: 'Lacs' },
    { code: 'REG_07', label: 'Lagunes' },
    { code: 'REG_08', label: 'Montagnes' },
    { code: 'REG_09', label: 'Sassandra-Marahoué' },
    { code: 'REG_10', label: 'Savanes' },
    { code: 'REG_11', label: 'Vallée du Bandama' },
    { code: 'REG_12', label: 'Woroba' },
    { code: 'REG_13', label: 'Yamoussoukro' },
    { code: 'REG_14', label: 'Zanzan' }
  ],
  
  // Départements (quelques exemples pour chaque région)
  departements: [
    { code: 'DEP_ABJ_1', label: 'Abidjan', region: 'REG_01' },
    { code: 'DEP_ABJ_2', label: 'Anyama', region: 'REG_01' },
    { code: 'DEP_ABJ_3', label: 'Bingerville', region: 'REG_01' },
    { code: 'DEP_SAV_1', label: 'Korhogo', region: 'REG_10' },
    { code: 'DEP_SAV_2', label: 'Boundiali', region: 'REG_10' },
    { code: 'DEP_SAV_3', label: 'Ferkessédougou', region: 'REG_10' },
    { code: 'DEP_LAG_1', label: 'Dabou', region: 'REG_07' },
    { code: 'DEP_LAG_2', label: 'Grand-Lahou', region: 'REG_07' },
    { code: 'DEP_MON_1', label: 'Man', region: 'REG_08' },
    { code: 'DEP_MON_2', label: 'Danané', region: 'REG_08' }
  ],
  
  // Exercices budgétaires
  exercices: [
    { code: '2022', label: '2022' },
    { code: '2023', label: '2023' },
    { code: '2024', label: '2024' },
    { code: '2025', label: '2025' },
    { code: '2026', label: '2026' }
  ],
  
  // Rôles utilisateurs
  roles: [
    { 
      code: 'CHARGE_ETUDES', 
      label: 'Chargé d\'études',
      permissions: ['read', 'create', 'update']
    },
    { 
      code: 'CHEF_SERVICE', 
      label: 'Chef de service Marchés',
      permissions: ['read', 'create', 'update', 'validate']
    },
    { 
      code: 'CONTROLEUR_FINANCIER', 
      label: 'Contrôleur Financier',
      permissions: ['read', 'create', 'update', 'validate', 'visa']
    },
    { 
      code: 'ADMIN', 
      label: 'Administrateur',
      permissions: ['all']
    }
  ]
};

// Fonctions utilitaires pour les référentiels
const ReferentielUtils = {
  // Obtenir un référentiel par code
  getByCode(referentiel, code) {
    return REFERENTIELS[referentiel]?.find(item => item.code === code);
  },
  
  // Obtenir le label d'un code
  getLabel(referentiel, code) {
    return this.getByCode(referentiel, code)?.label || code;
  },
  
  // Obtenir les programmes d'une section
  getProgrammesBySection(sectionCode) {
    return REFERENTIELS.programmes.filter(p => p.section === sectionCode);
  },
  
  // Obtenir les activités d'un programme
  getActivitesByProgramme(programmeCode) {
    return REFERENTIELS.activites.filter(a => a.programme === programmeCode);
  },
  
  // Obtenir les départements d'une région
  getDepartementsByRegion(regionCode) {
    return REFERENTIELS.departements.filter(d => d.region === regionCode);
  },
  
  // Valider la chaîne budgétaire
  validateChaineBudgetaire(section, programme, activite, nature) {
    const prog = REFERENTIELS.programmes.find(p => p.code === programme);
    if (!prog || prog.section !== section) {
      return { valid: false, error: 'Programme incompatible avec la section' };
    }
    
    const act = REFERENTIELS.activites.find(a => a.code === activite);
    if (!act || act.programme !== programme) {
      return { valid: false, error: 'Activité incompatible avec le programme' };
    }
    
    return { valid: true };
  }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REFERENTIELS, ReferentielUtils };
}
