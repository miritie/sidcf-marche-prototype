// Données de test (mock data) pour le prototype

const MOCK_DATA = {
  // Utilisateur connecté
  currentUser: {
    id: 'USER_001',
    nom: 'KOUASSI',
    prenoms: 'Jean',
    email: 'jean.kouassi@dcf.gouv.ci',
    role: 'ADMIN',
    uniteOperationnelle: 'UO_DCF'
  },
  
  // Marchés d'exemple
  marches: [
    {
      id: 'MAR_2024_001',
      numeroMarche: 'DA2024-001',
      intitule: 'Construction de 5 salles de classe au groupe scolaire de Korhogo',
      typeMarche: 'TRAVAUX',
      modePassation: 'AOO',
      categorie: 'AOO',
      statut: 'VISE',
      
      // Chaîne budgétaire
      uniteOperationnelle: 'UO_MIN_EDUCATION',
      exercice: '2024',
      section: 'SEC_02',
      programme: 'PROG_02',
      activite: 'ACT_002',
      natureEconomique: 'NAT_21',
      bailleur: 'BAILLEUR_BE',
      
      // Montants
      montantPrevisionnel: 25000000,
      montantInitial: 24500000,
      montantActuel: 25300000,
      montantPaye: 18200000,
      devise: 'FCFA',
      
      // Dates
      dateCreation: '2024-01-15',
      datePrevueDemarrage: '2024-04-01',
      dateVisaCF: '2024-03-20',
      dateNotification: '2024-03-25',
      dateDebutExecution: '2024-04-05',
      dateFinPrevue: '2024-10-05',
      
      // Attributaire
      attributaire: {
        raisonSociale: 'ENTREPRISE KOUADIO BTP',
        rccm: 'CI-ABJ-2015-B-12345',
        ifu: '1234567890',
        telephone: '+225 07 00 00 00 01',
        email: 'contact@kouadio-btp.ci',
        banque: 'SGCI',
        numeroCompte: 'CI93000110200123456789012345'
      },
      
      // Décision CF
      decisionCF: {
        decision: 'VISA',
        date: '2024-03-20',
        reference: 'DCF/2024/VISA/001',
        controleur: 'Dr. KONE Mariam',
        observations: 'Visa accordé sous réserve du respect du planning d\'exécution'
      },
      
      // Livrables
      livrables: [
        {
          id: 'LIV_001',
          type: 'OUVRAGE',
          objet: '5 salles de classe avec équipements',
          localite: {
            region: 'REG_10',
            departement: 'DEP_SAV_1',
            commune: 'Korhogo',
            village: 'Quartier Sinistré'
          },
          coordonnees: {
            latitude: 9.4580,
            longitude: -5.6290
          },
          beneficiaire: 'Groupe Scolaire Sinistré',
          volume: '5 salles',
          unite: 'salle'
        }
      ],
      
      // Exécution
      ordreService: {
        numero: 'OS-001/2024',
        date: '2024-03-25',
        dateDebut: '2024-04-05',
        duree: 180,
        dateFin: '2024-10-02'
      },
      
      decomptes: [
        {
          numero: 'D001',
          date: '2024-05-30',
          montant: 7350000,
          cumul: 7350000,
          retenue: 367500,
          statut: 'PAYE'
        },
        {
          numero: 'D002',
          date: '2024-07-31',
          montant: 7350000,
          cumul: 14700000,
          retenue: 367500,
          statut: 'PAYE'
        },
        {
          numero: 'D003',
          date: '2024-09-30',
          montant: 3500000,
          cumul: 18200000,
          retenue: 175000,
          statut: 'PAYE'
        }
      ],
      
      avenants: [
        {
          numero: 'AV001',
          type: 'FINANCIER',
          date: '2024-07-15',
          variationMontant: 800000,
          tauxVariation: 3.27,
          nouveauMontant: 25300000,
          variationDuree: 0,
          motif: 'Travaux supplémentaires suite à découverte de problèmes de fondation',
          visaCF: true,
          dateVisaCF: '2024-07-20'
        }
      ],
      
      garanties: [
        {
          type: 'AVANCE',
          montant: 2450000,
          taux: 10,
          dateEmission: '2024-03-28',
          dateEcheance: '2024-10-31',
          etat: 'ACTIVE'
        },
        {
          type: 'BONNE_EXECUTION',
          montant: 1225000,
          taux: 5,
          dateEmission: '2024-03-28',
          dateEcheance: '2025-04-05',
          etat: 'ACTIVE'
        }
      ],
      
      priorite: 'HAUTE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_002',
      numeroMarche: 'DA2024-002',
      intitule: 'Fourniture de matériel informatique pour le service informatique',
      typeMarche: 'FOURNITURES',
      modePassation: 'PSC',
      categorie: 'PSC',
      statut: 'ATTENTE_VISA',
      
      uniteOperationnelle: 'UO_MIN_ECONOMIE',
      exercice: '2024',
      section: 'SEC_01',
      programme: 'PROG_01',
      activite: 'ACT_001',
      natureEconomique: 'NAT_24',
      bailleur: 'BAILLEUR_BE',
      
      montantPrevisionnel: 12000000,
      montantInitial: 11500000,
      montantActuel: 11500000,
      montantPaye: 0,
      devise: 'FCFA',
      
      dateCreation: '2024-02-10',
      datePrevueDemarrage: '2024-05-01',
      dateVisaCF: null,
      dateNotification: null,
      dateDebutExecution: null,
      dateFinPrevue: '2024-06-30',
      
      attributaire: {
        raisonSociale: 'INFO-TECH SARL',
        rccm: 'CI-ABJ-2018-B-67890',
        ifu: '9876543210',
        telephone: '+225 07 00 00 00 02',
        email: 'contact@infotech.ci',
        banque: 'BACI',
        numeroCompte: 'CI93000220300234567890123456'
      },
      
      decisionCF: null,
      
      livrables: [
        {
          id: 'LIV_002',
          type: 'EQUIPEMENT',
          objet: '10 ordinateurs portables HP ProBook',
          localite: {
            region: 'REG_01',
            departement: 'DEP_ABJ_1',
            commune: 'Plateau',
            village: null
          },
          coordonnees: null,
          beneficiaire: 'Direction des Systèmes d\'Information',
          volume: '10',
          unite: 'unité'
        },
        {
          id: 'LIV_003',
          type: 'EQUIPEMENT',
          objet: '5 imprimantes multifonctions',
          localite: {
            region: 'REG_01',
            departement: 'DEP_ABJ_1',
            commune: 'Plateau',
            village: null
          },
          coordonnees: null,
          beneficiaire: 'Direction des Systèmes d\'Information',
          volume: '5',
          unite: 'unité'
        }
      ],
      
      ordreService: null,
      decomptes: [],
      avenants: [],
      garanties: [],
      priorite: 'MOYENNE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_003',
      numeroMarche: 'DA2024-003',
      intitule: 'Étude de faisabilité pour la construction d\'un hôpital régional',
      typeMarche: 'PI',
      modePassation: 'PI',
      categorie: 'PI',
      statut: 'RESERVE',
      
      uniteOperationnelle: 'UO_MIN_SANTE',
      exercice: '2024',
      section: 'SEC_03',
      programme: 'PROG_05',
      activite: 'ACT_007',
      natureEconomique: 'NAT_60',
      bailleur: 'BAILLEUR_BM',
      
      montantPrevisionnel: 45000000,
      montantInitial: 42000000,
      montantActuel: 42000000,
      montantPaye: 0,
      devise: 'FCFA',
      
      dateCreation: '2024-01-20',
      datePrevueDemarrage: '2024-06-01',
      dateVisaCF: '2024-04-10',
      dateNotification: null,
      dateDebutExecution: null,
      dateFinPrevue: '2024-12-31',
      
      attributaire: {
        raisonSociale: 'CABINET CONSEIL AFRIQUE SANTÉ',
        rccm: 'CI-ABJ-2016-B-34567',
        ifu: '5555666677',
        telephone: '+225 07 00 00 00 03',
        email: 'contact@afriquesante.ci',
        banque: 'ECOBANK',
        numeroCompte: 'CI93000330400345678901234567'
      },
      
      decisionCF: {
        decision: 'RESERVE',
        date: '2024-04-10',
        reference: 'DCF/2024/RESERVE/003',
        motifCode: 'RES_DOC_INCOMPLET',
        motif: 'Dossier technique incomplet',
        controleur: 'Dr. KONE Mariam',
        observations: 'Les TDR doivent être complétés et validés par le comité technique avant visa'
      },
      
      livrables: [
        {
          id: 'LIV_004',
          type: 'ETUDE',
          objet: 'Étude de faisabilité technique et financière',
          localite: {
            region: 'REG_10',
            departement: 'DEP_SAV_1',
            commune: 'Korhogo',
            village: null
          },
          coordonnees: {
            latitude: 9.4580,
            longitude: -5.6290
          },
          beneficiaire: 'Direction Régionale de la Santé - Savanes',
          volume: '1',
          unite: 'étude'
        }
      ],
      
      ordreService: null,
      decomptes: [],
      avenants: [],
      garanties: [],
      priorite: 'HAUTE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_004',
      numeroMarche: 'DA2024-004',
      intitule: 'Entretien et réparation du réseau routier - Lot Sud',
      typeMarche: 'TRAVAUX',
      modePassation: 'AOO',
      categorie: 'AOO',
      statut: 'EN_EXECUTION',
      
      uniteOperationnelle: 'UO_MIN_INFRA',
      exercice: '2024',
      section: 'SEC_04',
      programme: 'PROG_06',
      activite: 'ACT_008',
      natureEconomique: 'NAT_21',
      bailleur: 'BAILLEUR_BAD',
      
      montantPrevisionnel: 850000000,
      montantInitial: 820000000,
      montantActuel: 1050000000,
      montantPaye: 410000000,
      devise: 'FCFA',
      
      dateCreation: '2023-11-10',
      datePrevueDemarrage: '2024-02-01',
      dateVisaCF: '2024-01-15',
      dateNotification: '2024-01-20',
      dateDebutExecution: '2024-02-05',
      dateFinPrevue: '2025-02-05',
      
      attributaire: {
        raisonSociale: 'GROUPEMENT SOTRA-ROUTES CI',
        rccm: 'CI-ABJ-2010-B-11111',
        ifu: '1111222233',
        telephone: '+225 07 00 00 00 04',
        email: 'contact@sotraroutes.ci',
        banque: 'BICICI',
        numeroCompte: 'CI93000440500456789012345678'
      },
      
      decisionCF: {
        decision: 'VISA',
        date: '2024-01-15',
        reference: 'DCF/2024/VISA/002',
        controleur: 'M. TOURE Ibrahim',
        observations: 'Visa accordé. Suivi rigoureux des échéances recommandé'
      },
      
      livrables: [
        {
          id: 'LIV_005',
          type: 'OUVRAGE',
          objet: 'Réhabilitation axe Abidjan-Grand-Bassam (45km)',
          localite: {
            region: 'REG_07',
            departement: 'DEP_LAG_1',
            commune: 'Dabou',
            village: null
          },
          coordonnees: {
            latitude: 5.3167,
            longitude: -4.0333
          },
          beneficiaire: 'Usagers de la route',
          volume: '45',
          unite: 'km'
        },
        {
          id: 'LIV_006',
          type: 'OUVRAGE',
          objet: 'Construction de 2 ponts',
          localite: {
            region: 'REG_07',
            departement: 'DEP_LAG_2',
            commune: 'Grand-Lahou',
            village: null
          },
          coordonnees: {
            latitude: 5.2500,
            longitude: -5.0333
          },
          beneficiaire: 'Usagers de la route',
          volume: '2',
          unite: 'pont'
        }
      ],
      
      ordreService: {
        numero: 'OS-004/2024',
        date: '2024-01-20',
        dateDebut: '2024-02-05',
        duree: 365,
        dateFin: '2025-02-04'
      },
      
      decomptes: [
        {
          numero: 'D001',
          date: '2024-04-30',
          montant: 205000000,
          cumul: 205000000,
          retenue: 10250000,
          statut: 'PAYE'
        },
        {
          numero: 'D002',
          date: '2024-07-31',
          montant: 205000000,
          cumul: 410000000,
          retenue: 10250000,
          statut: 'PAYE'
        }
      ],
      
      avenants: [
        {
          numero: 'AV001',
          type: 'MIXTE',
          date: '2024-05-20',
          variationMontant: 230000000,
          tauxVariation: 28.05,
          nouveauMontant: 1050000000,
          variationDuree: 60,
          motif: 'Extension du périmètre suite à dégradations constatées + intempéries',
          visaCF: true,
          dateVisaCF: '2024-06-01',
          observations: 'Avenant important nécessitant autorisation spéciale du Ministre'
        }
      ],
      
      garanties: [
        {
          type: 'AVANCE',
          montant: 82000000,
          taux: 10,
          dateEmission: '2024-01-25',
          dateEcheance: '2025-03-31',
          etat: 'ACTIVE'
        },
        {
          type: 'BONNE_EXECUTION',
          montant: 41000000,
          taux: 5,
          dateEmission: '2024-01-25',
          dateEcheance: '2026-02-05',
          etat: 'ACTIVE'
        }
      ],
      
      priorite: 'HAUTE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_005',
      numeroMarche: 'DA2024-005',
      intitule: 'Acquisition de médicaments essentiels pour les centres de santé',
      typeMarche: 'FOURNITURES',
      modePassation: 'PSC',
      categorie: 'PSC',
      statut: 'CLOS',
      
      uniteOperationnelle: 'UO_MIN_SANTE',
      exercice: '2024',
      section: 'SEC_03',
      programme: 'PROG_04',
      activite: 'ACT_005',
      natureEconomique: 'NAT_62',
      bailleur: 'BAILLEUR_BE',
      
      montantPrevisionnel: 8500000,
      montantInitial: 8200000,
      montantActuel: 8200000,
      montantPaye: 8200000,
      devise: 'FCFA',
      
      dateCreation: '2023-12-05',
      datePrevueDemarrage: '2024-01-15',
      dateVisaCF: '2024-01-08',
      dateNotification: '2024-01-10',
      dateDebutExecution: '2024-01-15',
      dateFinPrevue: '2024-02-15',
      dateReceptionProvisoire: '2024-02-10',
      dateReceptionDefinitive: '2024-02-10',
      dateCloture: '2024-03-01',
      
      attributaire: {
        raisonSociale: 'PHARMA DISTRIBUTION CI',
        rccm: 'CI-ABJ-2012-B-22222',
        ifu: '2222333344',
        telephone: '+225 07 00 00 00 05',
        email: 'contact@pharmadistrib.ci',
        banque: 'BOA',
        numeroCompte: 'CI93000550600567890123456789'
      },
      
      decisionCF: {
        decision: 'VISA',
        date: '2024-01-08',
        reference: 'DCF/2024/VISA/003',
        controleur: 'Dr. KONE Mariam',
        observations: 'Visa accordé. Respect strict des normes de qualité pharmaceutique'
      },
      
      livrables: [
        {
          id: 'LIV_007',
          type: 'FOURNITURE',
          objet: 'Médicaments essentiels (liste OMS)',
          localite: {
            region: 'REG_01',
            departement: 'DEP_ABJ_1',
            commune: 'Adjamé',
            village: null
          },
          coordonnees: null,
          beneficiaire: '15 centres de santé urbains',
          volume: '1',
          unite: 'lot'
        }
      ],
      
      ordreService: {
        numero: 'OS-005/2024',
        date: '2024-01-10',
        dateDebut: '2024-01-15',
        duree: 30,
        dateFin: '2024-02-14'
      },
      
      decomptes: [
        {
          numero: 'D001',
          date: '2024-02-10',
          montant: 8200000,
          cumul: 8200000,
          retenue: 0,
          statut: 'PAYE'
        }
      ],
      
      avenants: [],
      
      garanties: [],
      
      receptions: {
        provisoire: {
          numero: 'PV-RP-005/2024',
          date: '2024-02-10',
          reserves: []
        },
        definitive: {
          numero: 'PV-RD-005/2024',
          date: '2024-02-10',
          reserves: []
        }
      },
      
      priorite: 'MOYENNE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_006',
      numeroMarche: 'DA2024-006',
      intitule: 'Construction d\'un centre de formation professionnelle',
      typeMarche: 'TRAVAUX',
      modePassation: 'AOO',
      categorie: 'AOO',
      statut: 'EN_PASSATION',
      
      uniteOperationnelle: 'UO_MIN_EDUCATION',
      exercice: '2024',
      section: 'SEC_02',
      programme: 'PROG_03',
      activite: 'ACT_004',
      natureEconomique: 'NAT_21',
      bailleur: 'BAILLEUR_AFD',
      
      montantPrevisionnel: 350000000,
      montantInitial: null,
      montantActuel: null,
      montantPaye: 0,
      devise: 'FCFA',
      
      dateCreation: '2024-03-01',
      datePrevueDemarrage: '2024-08-01',
      dateVisaCF: null,
      dateNotification: null,
      dateDebutExecution: null,
      dateFinPrevue: '2025-08-01',
      
      attributaire: null,
      decisionCF: null,
      
      livrables: [
        {
          id: 'LIV_008',
          type: 'OUVRAGE',
          objet: 'Centre de formation avec 10 ateliers techniques',
          localite: {
            region: 'REG_08',
            departement: 'DEP_MON_1',
            commune: 'Man',
            village: null
          },
          coordonnees: {
            latitude: 7.4000,
            longitude: -7.5500
          },
          beneficiaire: 'Direction de la Formation Professionnelle',
          volume: '10',
          unite: 'atelier'
        }
      ],
      
      ordreService: null,
      decomptes: [],
      avenants: [],
      garanties: [],
      priorite: 'HAUTE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_007',
      numeroMarche: 'DA2024-007',
      intitule: 'Services de nettoyage des locaux administratifs',
      typeMarche: 'SERVICES',
      modePassation: 'PSC',
      categorie: 'PSC',
      statut: 'REFUSE',
      
      uniteOperationnelle: 'UO_MIN_ECONOMIE',
      exercice: '2024',
      section: 'SEC_01',
      programme: 'PROG_01',
      activite: 'ACT_001',
      natureEconomique: 'NAT_60',
      bailleur: 'BAILLEUR_BE',
      
      montantPrevisionnel: 6000000,
      montantInitial: 7200000,
      montantActuel: 7200000,
      montantPaye: 0,
      devise: 'FCFA',
      
      dateCreation: '2024-02-20',
      datePrevueDemarrage: '2024-04-01',
      dateVisaCF: '2024-03-25',
      dateNotification: null,
      dateDebutExecution: null,
      dateFinPrevue: '2025-03-31',
      
      attributaire: {
        raisonSociale: 'NET SERVICES PLUS',
        rccm: 'CI-ABJ-2019-B-33333',
        ifu: '3333444455',
        telephone: '+225 07 00 00 00 06',
        email: 'contact@netservices.ci',
        banque: 'SGCI',
        numeroCompte: 'CI93000660700678901234567890'
      },
      
      decisionCF: {
        decision: 'REFUS',
        date: '2024-03-25',
        reference: 'DCF/2024/REFUS/001',
        motifCode: 'REF_MONTANT_EXCESSIF',
        motif: 'Montant proposé excessif par rapport au marché',
        controleur: 'M. TOURE Ibrahim',
        observations: 'Le montant est 20% supérieur au prévisionnel sans justification. Relancer la procédure'
      },
      
      livrables: [
        {
          id: 'LIV_009',
          type: 'SERVICE',
          objet: 'Nettoyage quotidien des bureaux',
          localite: {
            region: 'REG_01',
            departement: 'DEP_ABJ_1',
            commune: 'Plateau',
            village: null
          },
          coordonnees: null,
          beneficiaire: 'Ministère de l\'Économie',
          volume: '1',
          unite: 'an'
        }
      ],
      
      ordreService: null,
      decomptes: [],
      avenants: [],
      garanties: [],
      priorite: 'BASSE',
      recours: null,
      resiliation: null
    },
    
    {
      id: 'MAR_2024_008',
      numeroMarche: 'DA2024-008',
      intitule: 'Réalisation de 50 forages dans les villages du Nord',
      typeMarche: 'TRAVAUX',
      modePassation: 'AOO',
      categorie: 'AOO',
      statut: 'EN_EXECUTION',
      
      uniteOperationnelle: 'UO_MIN_INFRA',
      exercice: '2024',
      section: 'SEC_07',
      programme: 'PROG_09',
      activite: 'ACT_012',
      natureEconomique: 'NAT_21',
      bailleur: 'BAILLEUR_UE',
      
      montantPrevisionnel: 180000000,
      montantInitial: 175000000,
      montantActuel: 175000000,
      montantPaye: 87500000,
      devise: 'FCFA',
      
      dateCreation: '2023-10-15',
      datePrevueDemarrage: '2024-01-15',
      dateVisaCF: '2023-12-20',
      dateNotification: '2024-01-05',
      dateDebutExecution: '2024-01-20',
      dateFinPrevue: '2024-12-31',
      
      attributaire: {
        raisonSociale: 'HYDRAULIQUE MODERNE SARL',
        rccm: 'CI-ABJ-2014-B-44444',
        ifu: '4444555566',
        telephone: '+225 07 00 00 00 07',
        email: 'contact@hydraumoderne.ci',
        banque: 'ECOBANK',
        numeroCompte: 'CI93000770800789012345678901'
      },
      
      decisionCF: {
        decision: 'VISA',
        date: '2023-12-20',
        reference: 'DCF/2023/VISA/045',
        controleur: 'Dr. KONE Mariam',
        observations: 'Visa accordé. Projet prioritaire pour l\'accès à l\'eau potable'
      },
      
      livrables: [
        {
          id: 'LIV_010',
          type: 'OUVRAGE',
          objet: '50 forages équipés de pompes manuelles',
          localite: {
            region: 'REG_10',
            departement: 'DEP_SAV_2',
            commune: 'Boundiali',
            village: 'Divers villages'
          },
          coordonnees: {
            latitude: 9.5167,
            longitude: -6.4833
          },
          beneficiaire: 'Populations rurales (environ 25000 personnes)',
          volume: '50',
          unite: 'forage'
        }
      ],
      
      ordreService: {
        numero: 'OS-008/2024',
        date: '2024-01-05',
        dateDebut: '2024-01-20',
        duree: 345,
        dateFin: '2024-12-30'
      },
      
      decomptes: [
        {
          numero: 'D001',
          date: '2024-04-30',
          montant: 43750000,
          cumul: 43750000,
          retenue: 2187500,
          statut: 'PAYE'
        },
        {
          numero: 'D002',
          date: '2024-07-31',
          montant: 43750000,
          cumul: 87500000,
          retenue: 2187500,
          statut: 'PAYE'
        }
      ],
      
      avenants: [],
      
      garanties: [
        {
          type: 'AVANCE',
          montant: 17500000,
          taux: 10,
          dateEmission: '2024-01-10',
          dateEcheance: '2025-02-28',
          etat: 'ACTIVE'
        },
        {
          type: 'BONNE_EXECUTION',
          montant: 8750000,
          taux: 5,
          dateEmission: '2024-01-10',
          dateEcheance: '2025-12-31',
          etat: 'ACTIVE'
        }
      ],
      
      priorite: 'HAUTE',
      
      recours: {
        enCours: true,
        type: 'GRACIEUX',
        dateDebut: '2024-03-15',
        dateFin: null,
        motif: 'Contestation par un soumissionnaire non retenu',
        statut: 'EN_INSTRUCTION',
        documents: []
      },
      
      resiliation: null
    }
  ],
  
  // PPM (Plans de Passation des Marchés) pour import
  ppmData: [
    {
      id: 'PPM_2024_MIN_EDUCATION',
      uniteOperationnelle: 'UO_MIN_EDUCATION',
      exercice: '2024',
      lignes: [
        {
          numero: 1,
          intitule: 'Construction de 5 salles de classe au groupe scolaire de Korhogo',
          section: 'SEC_02',
          programme: 'PROG_02',
          activite: 'ACT_002',
          natureEconomique: 'NAT_21',
          bailleur: 'BAILLEUR_BE',
          montant: 25000000,
          duree: 6,
          periode: 'T1-T2 2024'
        },
        {
          numero: 2,
          intitule: 'Construction d\'un centre de formation professionnelle',
          section: 'SEC_02',
          programme: 'PROG_03',
          activite: 'ACT_004',
          natureEconomique: 'NAT_21',
          bailleur: 'BAILLEUR_AFD',
          montant: 350000000,
          duree: 12,
          periode: 'T3-T4 2024'
        }
      ]
    }
  ]
};

// Fonctions utilitaires pour les données
const DataUtils = {
  // Obtenir les stats du tableau de bord
  getDashboardStats() {
    const marches = MOCK_DATA.marches;
    
    return {
      enAttente: marches.filter(m => m.statut === 'ATTENTE_VISA').length,
      enValidation: marches.filter(m => m.statut === 'EN_PASSATION').length,
      approuves: marches.filter(m => m.statut === 'VISE' || m.statut === 'EN_EXECUTION' || m.statut === 'CLOS').length,
      montantTotal: marches.reduce((sum, m) => sum + (m.montantActuel || m.montantPrevisionnel || 0), 0)
    };
  },
  
  // Filtrer les marchés
  filterMarches(filters) {
    let result = [...MOCK_DATA.marches];
    
    if (filters.statut) {
      result = result.filter(m => m.statut === filters.statut);
    }
    
    if (filters.exercice) {
      result = result.filter(m => m.exercice === filters.exercice);
    }
    
    if (filters.uniteOperationnelle) {
      result = result.filter(m => m.uniteOperationnelle === filters.uniteOperationnelle);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(m => 
        m.intitule.toLowerCase().includes(search) ||
        m.numeroMarche.toLowerCase().includes(search)
      );
    }
    
    return result;
  },
  
  // Obtenir un marché par ID
  getMarcheById(id) {
    return MOCK_DATA.marches.find(m => m.id === id);
  }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MOCK_DATA, DataUtils };
}
