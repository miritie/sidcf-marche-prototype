/**
 * Base de données locale pour le Module Marché SID-CF
 * Ce fichier centralise toutes les données et peut être facilement adapté pour Airtable ou autre BDD
 */

// Configuration des contraintes et règles de gestion
const CONFIG = {
    // Paramètres généraux
    general: {
        tva: 18, // Taux de TVA en %
        seuilMarche: 5000000, // Seuil de marché en FCFA
        delaiPaiement: 30, // Délai de paiement en jours
        prefixes: {
            marche: 'M',
            fournisseur: 'F',
            contrat: 'C',
            bonCommande: 'BC',
            facture: 'FAC',
            paiement: 'PAI',
            demandeAchat: 'DA'
        },
        exerciceFiscal: 2024
    },

    // Seuils de validation par montant
    seuilsValidation: [
        { min: 0, max: 1000000, role: 'Gestionnaire', niveau: 1 },
        { min: 1000000, max: 5000000, role: 'Chef de Service', niveau: 2 },
        { min: 5000000, max: 20000000, role: 'Directeur Financier', niveau: 3 },
        { min: 20000000, max: 50000000, role: 'Directeur Général', niveau: 4 },
        { min: 50000000, max: Infinity, role: 'Conseil Administration', niveau: 5 }
    ],

    // Types de marchés autorisés
    typesMarche: [
        { code: 'FOUR', libelle: 'Fournitures', delaiLivraison: 30 },
        { code: 'TRAV', libelle: 'Travaux', delaiLivraison: 90 },
        { code: 'SERV', libelle: 'Services', delaiLivraison: 15 },
        { code: 'PREST', libelle: 'Prestations intellectuelles', delaiLivraison: 60 }
    ],

    // Modes de passation
    modesPassation: [
        { code: 'GRG', libelle: 'Gré à gré', seuilMax: 5000000 },
        { code: 'DC', libelle: 'Demande de Cotation', seuilMax: 20000000 },
        { code: 'AOR', libelle: 'Appel d\'Offres Restreint', seuilMax: 50000000 },
        { code: 'AOO', libelle: 'Appel d\'Offres Ouvert', seuilMax: Infinity }
    ],

    // Statuts possibles
    statuts: {
        marche: ['Brouillon', 'En validation', 'Actif', 'Suspendu', 'Résilié', 'Clôturé'],
        fournisseur: ['Actif', 'Suspendu', 'Inactif', 'Blacklisté'],
        facture: ['Brouillon', 'Soumise', 'En validation', 'Validée', 'Rejetée', 'Payée'],
        paiement: ['Planifié', 'En cours', 'Effectué', 'Annulé'],
        contrat: ['Brouillon', 'Signé', 'En cours', 'Suspendu', 'Terminé']
    },

    // Contraintes sur les champs
    contraintes: {
        marche: {
            codeMarche: { required: true, pattern: /^M\d{4}-\d{3}$/, unique: true },
            intitule: { required: true, minLength: 10, maxLength: 200 },
            montantMin: 100000,
            montantMax: 10000000000,
            dureeMin: 7, // jours
            dureeMax: 1095, // 3 ans
            description: { maxLength: 2000 },
            justification: { required: true, minLength: 50 }
        },
        fournisseur: {
            codeFournisseur: { required: true, pattern: /^F\d{3}$/, unique: true },
            raisonSociale: { required: true, minLength: 2, maxLength: 100 },
            ifu: { required: true, pattern: /^CI\d{10}$/, unique: true },
            rccm: { pattern: /^CI-[A-Z]{3}-\d{4}-[A-Z]-\d{6}$/ },
            telephone: { required: true, pattern: /^\+225\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/ },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            capitalMin: 1000000
        },
        facture: {
            numeroFacture: { required: true, unique: true },
            montantMin: 0,
            montantMax: 1000000000,
            delaiPaiementMax: 90
        }
    }
};

// Structure de la base de données locale
class Database {
    constructor() {
        this.tables = {
            // Table des utilisateurs
            utilisateurs: [
                {
                    id: 'USR001',
                    nom: 'KOUASSI',
                    prenom: 'Jean',
                    email: 'jean.kouassi@sidcf.ci',
                    telephone: '+225 07 07 07 07 07',
                    role: 'Administrateur',
                    service: 'Direction Générale',
                    niveau_validation: 5,
                    actif: true,
                    dateCreation: '2024-01-01',
                    motDePasse: 'demo123' // En production, utiliser un hash
                },
                {
                    id: 'USR002',
                    nom: 'KONE',
                    prenom: 'Marie',
                    email: 'marie.kone@sidcf.ci',
                    telephone: '+225 05 05 05 05 05',
                    role: 'Gestionnaire Achats',
                    service: 'Service Achats',
                    niveau_validation: 1,
                    actif: true,
                    dateCreation: '2024-01-01',
                    motDePasse: 'demo123'
                },
                {
                    id: 'USR003',
                    nom: 'DIALLO',
                    prenom: 'Mamadou',
                    email: 'mamadou.diallo@sidcf.ci',
                    telephone: '+225 01 01 01 01 01',
                    role: 'Comptable',
                    service: 'Service Comptabilité',
                    niveau_validation: 2,
                    actif: true,
                    dateCreation: '2024-01-01',
                    motDePasse: 'demo123'
                }
            ],

            // Table des fournisseurs
            fournisseurs: [
                {
                    id: 'F001',
                    codeFournisseur: 'F001',
                    raisonSociale: 'TECH SOLUTIONS SARL',
                    ifu: 'CI0123456789',
                    rccm: 'CI-ABJ-2020-B-123456',
                    capital: 10000000,
                    telephone: '+225 27 22 33 44 55',
                    telephoneSecondaire: '+225 01 02 03 04 05',
                    email: 'contact@techsolutions.ci',
                    emailSecondaire: 'compta@techsolutions.ci',
                    adresse: 'Cocody, Rue des Jardins',
                    ville: 'Abidjan',
                    pays: 'Côte d\'Ivoire',
                    codePostal: '00225',
                    siteWeb: 'www.techsolutions.ci',
                    contactPrincipal: 'M. TRAORE Ahmed',
                    fonctionContact: 'Directeur Commercial',
                    categories: ['Informatique', 'Télécommunications'],
                    produitsServices: ['Ordinateurs', 'Logiciels', 'Maintenance IT'],
                    certifications: ['ISO 9001', 'ISO 27001'],
                    noteEvaluation: 4.5,
                    statut: 'Actif',
                    dateCreation: '2020-03-15',
                    dateDerniereModification: '2024-01-10',
                    documentsAttaches: ['RIB', 'Attestation fiscale', 'RCCM'],
                    conditions: {
                        delaiLivraison: 15,
                        modePaiement: 'Virement',
                        remise: 5
                    }
                },
                {
                    id: 'F002',
                    codeFournisseur: 'F002',
                    raisonSociale: 'BATIMENT PLUS CI',
                    ifu: 'CI9876543210',
                    rccm: 'CI-ABJ-2019-A-654321',
                    capital: 50000000,
                    telephone: '+225 27 44 55 66 77',
                    email: 'info@batimentplus.ci',
                    adresse: 'Zone Industrielle de Yopougon',
                    ville: 'Abidjan',
                    pays: 'Côte d\'Ivoire',
                    categories: ['Construction', 'Travaux publics'],
                    produitsServices: ['Construction', 'Rénovation', 'Aménagement'],
                    noteEvaluation: 4.2,
                    statut: 'Actif',
                    dateCreation: '2019-06-20'
                },
                {
                    id: 'F003',
                    codeFournisseur: 'F003',
                    raisonSociale: 'OFFICE SUPPLIES SA',
                    ifu: 'CI1122334455',
                    rccm: 'CI-ABJ-2018-C-112233',
                    capital: 5000000,
                    telephone: '+225 27 88 99 00 11',
                    email: 'ventes@officesupplies.ci',
                    adresse: 'Plateau, Avenue Noguès',
                    ville: 'Abidjan',
                    pays: 'Côte d\'Ivoire',
                    categories: ['Fournitures bureau', 'Papeterie'],
                    produitsServices: ['Papier', 'Stylos', 'Mobilier bureau'],
                    noteEvaluation: 3.8,
                    statut: 'Actif',
                    dateCreation: '2018-01-10'
                }
            ],

            // Table des catégories de produits/services
            categories: [
                {
                    id: 'CAT001',
                    code: 'INFO',
                    libelle: 'Informatique',
                    description: 'Matériel et logiciels informatiques',
                    parent: null,
                    sousCategories: [
                        { code: 'INFO-MAT', libelle: 'Matériel informatique' },
                        { code: 'INFO-LOG', libelle: 'Logiciels' },
                        { code: 'INFO-MAINT', libelle: 'Maintenance IT' }
                    ]
                },
                {
                    id: 'CAT002',
                    code: 'BURO',
                    libelle: 'Bureautique',
                    description: 'Fournitures et équipements de bureau',
                    parent: null,
                    sousCategories: [
                        { code: 'BURO-FOUR', libelle: 'Fournitures' },
                        { code: 'BURO-MOB', libelle: 'Mobilier' },
                        { code: 'BURO-EQUIP', libelle: 'Équipements' }
                    ]
                },
                {
                    id: 'CAT003',
                    code: 'TRAV',
                    libelle: 'Travaux',
                    description: 'Travaux de construction et rénovation',
                    parent: null,
                    sousCategories: [
                        { code: 'TRAV-CONST', libelle: 'Construction' },
                        { code: 'TRAV-RENOV', libelle: 'Rénovation' },
                        { code: 'TRAV-ELEC', libelle: 'Électricité' },
                        { code: 'TRAV-PLOMB', libelle: 'Plomberie' }
                    ]
                }
            ],

            // Table des marchés
            marches: [
                {
                    id: 'M2024-001',
                    codeMarche: 'M2024-001',
                    intitule: 'Fourniture d\'équipements informatiques pour le siège',
                    type: 'FOUR',
                    modePassation: 'DC',
                    fournisseurId: 'F001',
                    fournisseur: 'TECH SOLUTIONS SARL',
                    montantHT: 25000000,
                    montantTVA: 4500000,
                    montantTTC: 29500000,
                    dateDebut: '2024-02-01',
                    dateFin: '2024-12-31',
                    duree: 334, // jours
                    description: 'Marché pour la fourniture d\'ordinateurs, imprimantes et accessoires informatiques pour équiper les nouveaux bureaux.',
                    justification: 'Renouvellement du parc informatique vieillissant et équipement des nouveaux collaborateurs.',
                    statut: 'Actif',
                    dateCreation: '2024-01-15',
                    creePar: 'USR002',
                    validePar: 'USR001',
                    dateValidation: '2024-01-20',
                    documentsAttaches: ['Cahier des charges', 'Devis', 'PV de négociation'],
                    lignesBudgetaires: ['61201 - Matériel informatique'],
                    clausesParticulieres: [
                        'Garantie minimum 2 ans sur tout le matériel',
                        'Formation du personnel incluse',
                        'Support technique 24/7'
                    ],
                    indicateursPerformance: {
                        tauxExecution: 45,
                        montantConsomme: 11250000,
                        nombreCommandes: 3
                    }
                },
                {
                    id: 'M2024-002',
                    codeMarche: 'M2024-002',
                    intitule: 'Travaux de rénovation du bâtiment principal',
                    type: 'TRAV',
                    modePassation: 'AOR',
                    fournisseurId: 'F002',
                    fournisseur: 'BATIMENT PLUS CI',
                    montantHT: 45000000,
                    montantTVA: 8100000,
                    montantTTC: 53100000,
                    dateDebut: '2024-03-01',
                    dateFin: '2024-08-31',
                    duree: 183,
                    statut: 'Actif',
                    dateCreation: '2024-02-01',
                    creePar: 'USR002',
                    indicateursPerformance: {
                        tauxExecution: 20,
                        montantConsomme: 9000000,
                        nombreCommandes: 1
                    }
                }
            ],

            // Table des bons de commande
            bonsCommande: [
                {
                    id: 'BC2024-001',
                    numeroBC: 'BC2024-001',
                    marcheId: 'M2024-001',
                    fournisseurId: 'F001',
                    fournisseur: 'TECH SOLUTIONS SARL',
                    dateCommande: '2024-02-15',
                    dateLivraisonPrevue: '2024-03-01',
                    montantHT: 8500000,
                    montantTVA: 1530000,
                    montantTTC: 10030000,
                    statut: 'Livré',
                    articles: [
                        {
                            designation: 'Ordinateur portable HP ProBook',
                            quantite: 10,
                            prixUnitaire: 750000,
                            montant: 7500000
                        },
                        {
                            designation: 'Souris sans fil',
                            quantite: 20,
                            prixUnitaire: 25000,
                            montant: 500000
                        },
                        {
                            designation: 'Clavier sans fil',
                            quantite: 20,
                            prixUnitaire: 25000,
                            montant: 500000
                        }
                    ],
                    lieuLivraison: 'Siège social - Plateau',
                    conditionsLivraison: 'Franco de port',
                    creePar: 'USR002',
                    dateCreation: '2024-02-15'
                },
                {
                    id: 'BC2024-002',
                    numeroBC: 'BC2024-002',
                    marcheId: 'M2024-001',
                    fournisseurId: 'F001',
                    fournisseur: 'TECH SOLUTIONS SARL',
                    dateCommande: '2024-03-10',
                    dateLivraisonPrevue: '2024-03-25',
                    montantHT: 2750000,
                    montantTVA: 495000,
                    montantTTC: 3245000,
                    statut: 'En cours',
                    articles: [
                        {
                            designation: 'Imprimante multifonction',
                            quantite: 5,
                            prixUnitaire: 450000,
                            montant: 2250000
                        },
                        {
                            designation: 'Cartouches d\'encre',
                            quantite: 20,
                            prixUnitaire: 25000,
                            montant: 500000
                        }
                    ]
                }
            ],

            // Table des factures
            factures: [
                {
                    id: 'FAC2024-001',
                    numeroFacture: 'FAC2024-001',
                    numeroFactureFournisseur: 'TS-2024-156',
                    bonCommandeId: 'BC2024-001',
                    fournisseurId: 'F001',
                    fournisseur: 'TECH SOLUTIONS SARL',
                    dateFacture: '2024-03-05',
                    dateEcheance: '2024-04-04',
                    montantHT: 8500000,
                    montantTVA: 1530000,
                    montantTTC: 10030000,
                    remise: 0,
                    statut: 'Validée',
                    dateReception: '2024-03-06',
                    dateValidation: '2024-03-08',
                    validePar: 'USR003',
                    commentaires: 'Facture conforme au BC',
                    documentsAttaches: ['Facture originale', 'BL signé'],
                    lignesFacture: [
                        {
                            designation: 'Ordinateur portable HP ProBook',
                            quantite: 10,
                            prixUnitaire: 750000,
                            montant: 7500000
                        },
                        {
                            designation: 'Accessoires',
                            quantite: 40,
                            prixUnitaire: 25000,
                            montant: 1000000
                        }
                    ]
                }
            ],

            // Table des paiements
            paiements: [
                {
                    id: 'PAI2024-001',
                    numeroPaiement: 'PAI2024-001',
                    factureId: 'FAC2024-001',
                    fournisseurId: 'F001',
                    fournisseur: 'TECH SOLUTIONS SARL',
                    montant: 10030000,
                    datePaiement: '2024-03-20',
                    modePaiement: 'Virement bancaire',
                    referenceTransaction: 'VIR2024032001',
                    banque: 'SIB',
                    numeroCompte: '01234567890',
                    statut: 'Effectué',
                    validePar: 'USR001',
                    dateValidation: '2024-03-19',
                    commentaires: 'Paiement effectué selon échéance',
                    documentsAttaches: ['Ordre de virement', 'Confirmation bancaire']
                }
            ],

            // Table des demandes d'achat
            demandesAchat: [
                {
                    id: 'DA2024-001',
                    numeroDemande: 'DA2024-001',
                    service: 'Service Informatique',
                    demandeur: 'USR002',
                    dateDemande: '2024-01-05',
                    dateBesoins: '2024-02-01',
                    priorite: 'Haute',
                    montantEstime: 25000000,
                    statut: 'Approuvée',
                    justification: 'Renouvellement urgent du parc informatique obsolète',
                    articles: [
                        {
                            designation: 'Ordinateurs portables',
                            quantite: 10,
                            specifications: 'Core i5, 8GB RAM, 256GB SSD',
                            montantEstime: 7500000
                        },
                        {
                            designation: 'Imprimantes',
                            quantite: 5,
                            specifications: 'Multifonction, A3, réseau',
                            montantEstime: 2250000
                        }
                    ],
                    validations: [
                        {
                            niveau: 'Chef de Service',
                            validateur: 'USR003',
                            date: '2024-01-06',
                            decision: 'Approuvé',
                            commentaire: 'Besoin justifié'
                        },
                        {
                            niveau: 'Direction',
                            validateur: 'USR001',
                            date: '2024-01-08',
                            decision: 'Approuvé',
                            commentaire: 'Accord pour lancement procédure'
                        }
                    ]
                }
            ],

            // Table d'historique/audit
            historique: [
                {
                    id: 'LOG001',
                    date: '2024-01-15T10:30:00',
                    utilisateur: 'USR002',
                    action: 'CREATE',
                    entite: 'Marché',
                    entiteId: 'M2024-001',
                    details: 'Création du marché M2024-001',
                    ipAddress: '192.168.1.100'
                },
                {
                    id: 'LOG002',
                    date: '2024-01-20T14:15:00',
                    utilisateur: 'USR001',
                    action: 'VALIDATE',
                    entite: 'Marché',
                    entiteId: 'M2024-001',
                    details: 'Validation du marché M2024-001',
                    ipAddress: '192.168.1.101'
                }
            ]
        };

        // Initialiser avec les données de localStorage si disponibles
        this.loadFromLocalStorage();
    }

    // Méthodes CRUD génériques
    create(table, data) {
        if (!this.tables[table]) {
            throw new Error(`Table ${table} n'existe pas`);
        }
        
        // Validation des contraintes
        this.validateConstraints(table, data);
        
        // Ajout des métadonnées
        data.dateCreation = new Date().toISOString();
        data.id = data.id || this.generateId(table);
        
        this.tables[table].push(data);
        this.saveToLocalStorage();
        this.addToHistory('CREATE', table, data.id, `Création dans ${table}`);
        
        return data;
    }

    read(table, id = null) {
        if (!this.tables[table]) {
            throw new Error(`Table ${table} n'existe pas`);
        }
        
        if (id) {
            return this.tables[table].find(item => item.id === id);
        }
        return this.tables[table];
    }

    update(table, id, data) {
        if (!this.tables[table]) {
            throw new Error(`Table ${table} n'existe pas`);
        }
        
        const index = this.tables[table].findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Enregistrement ${id} non trouvé dans ${table}`);
        }
        
        // Validation des contraintes
        this.validateConstraints(table, data);
        
        // Mise à jour avec conservation de l'ID et ajout date modification
        data.dateModification = new Date().toISOString();
        this.tables[table][index] = { ...this.tables[table][index], ...data };
        this.saveToLocalStorage();
        this.addToHistory('UPDATE', table, id, `Modification dans ${table}`);
        
        return this.tables[table][index];
    }

    delete(table, id) {
        if (!this.tables[table]) {
            throw new Error(`Table ${table} n'existe pas`);
        }
        
        const index = this.tables[table].findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Enregistrement ${id} non trouvé dans ${table}`);
        }
        
        const deleted = this.tables[table].splice(index, 1)[0];
        this.saveToLocalStorage();
        this.addToHistory('DELETE', table, id, `Suppression dans ${table}`);
        
        return deleted;
    }

    // Méthodes de recherche et filtrage
    search(table, criteria) {
        if (!this.tables[table]) {
            throw new Error(`Table ${table} n'existe pas`);
        }
        
        return this.tables[table].filter(item => {
            return Object.keys(criteria).every(key => {
                if (typeof criteria[key] === 'string') {
                    return item[key] && item[key].toString().toLowerCase().includes(criteria[key].toLowerCase());
                }
                return item[key] === criteria[key];
            });
        });
    }

    // Méthodes de validation
    validateConstraints(table, data) {
        const constraints = CONFIG.contraintes[table];
        if (!constraints) return true;
        
        const errors = [];
        
        for (const [field, rules] of Object.entries(constraints)) {
            if (!data[field]) continue;
            
            // Validation required
            if (rules.required && !data[field]) {
                errors.push(`Le champ ${field} est obligatoire`);
            }
            
            // Validation pattern
            if (rules.pattern && !rules.pattern.test(data[field])) {
                errors.push(`Le champ ${field} ne respecte pas le format requis`);
            }
            
            // Validation longueur
            if (rules.minLength && data[field].length < rules.minLength) {
                errors.push(`Le champ ${field} doit contenir au moins ${rules.minLength} caractères`);
            }
            if (rules.maxLength && data[field].length > rules.maxLength) {
                errors.push(`Le champ ${field} ne doit pas dépasser ${rules.maxLength} caractères`);
            }
            
            // Validation unicité
            if (rules.unique) {
                const existing = this.tables[table].find(item => item[field] === data[field] && item.id !== data.id);
                if (existing) {
                    errors.push(`La valeur ${data[field]} existe déjà pour le champ ${field}`);
                }
            }
        }
        
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
        
        return true;
    }

    // Génération d'identifiants
    generateId(table) {
        const prefix = CONFIG.general.prefixes[table] || table.substring(0, 3).toUpperCase();
        const year = new Date().getFullYear();
        const count = this.tables[table].length + 1;
        return `${prefix}${year}-${String(count).padStart(3, '0')}`;
    }

    // Historique
    addToHistory(action, entite, entiteId, details) {
        const log = {
            id: `LOG${Date.now()}`,
            date: new Date().toISOString(),
            utilisateur: window.currentUser?.id || 'SYSTEM',
            action,
            entite,
            entiteId,
            details,
            ipAddress: 'localhost'
        };
        
        this.tables.historique.push(log);
        this.saveToLocalStorage();
    }

    // Persistance locale
    saveToLocalStorage() {
        try {
            localStorage.setItem('sidcf_database', JSON.stringify(this.tables));
            localStorage.setItem('sidcf_config', JSON.stringify(CONFIG));
        } catch (e) {
            console.error('Erreur sauvegarde localStorage:', e);
        }
    }

    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('sidcf_database');
            if (savedData) {
                this.tables = JSON.parse(savedData);
            }
        } catch (e) {
            console.error('Erreur chargement localStorage:', e);
        }
    }

    // Export vers Airtable ou autre API
    exportToAPI(apiEndpoint, apiKey) {
        // Format pour Airtable
        const airtableFormat = {
            records: Object.entries(this.tables).map(([table, records]) => ({
                table,
                records: records.map(record => ({
                    fields: record
                }))
            }))
        };
        
        // Ici, implémenter l'appel API vers Airtable
        console.log('Export vers API:', airtableFormat);
        return airtableFormat;
    }

    // Méthodes métier spécifiques
    getStatistiques() {
        return {
            marchesActifs: this.tables.marches.filter(m => m.statut === 'Actif').length,
            montantTotalEngagé: this.tables.marches
                .filter(m => m.statut === 'Actif')
                .reduce((sum, m) => sum + m.montantTTC, 0),
            fournisseursActifs: this.tables.fournisseurs.filter(f => f.statut === 'Actif').length,
            facturesEnAttente: this.tables.factures.filter(f => f.statut === 'En validation').length,
            tauxExecution: this.calculerTauxExecution()
        };
    }

    calculerTauxExecution() {
        const marches = this.tables.marches.filter(m => m.statut === 'Actif');
        if (marches.length === 0) return 0;
        
        const totalConsomme = marches.reduce((sum, m) => sum + (m.indicateursPerformance?.montantConsomme || 0), 0);
        const totalPrevu = marches.reduce((sum, m) => sum + m.montantTTC, 0);
        
        return totalPrevu > 0 ? Math.round((totalConsomme / totalPrevu) * 100) : 0;
    }

    getWorkflowValidation(montant) {
        return CONFIG.seuilsValidation.find(s => montant >= s.min && montant < s.max);
    }
}

// Instance unique de la base de données
const db = new Database();

// Export pour utilisation dans d'autres modules
window.Database = Database;
window.db = db;
window.CONFIG = CONFIG;
