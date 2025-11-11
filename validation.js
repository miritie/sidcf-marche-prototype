// Moteur de validation des règles de gestion

const ValidationRules = {
  // ===== VALIDATION PLANIFICATION =====
  
  validatePPM(data) {
    const errors = [];
    
    // Champs obligatoires
    if (!data.uniteOperationnelle) {
      errors.push({ field: 'uniteOperationnelle', message: 'L\'unité opérationnelle est obligatoire' });
    }
    
    if (!data.exercice) {
      errors.push({ field: 'exercice', message: 'L\'exercice budgétaire est obligatoire' });
    }
    
    if (!data.lignes || data.lignes.length === 0) {
      errors.push({ field: 'lignes', message: 'Au moins une ligne PPM doit être sélectionnée' });
    }
    
    // Validation de chaque ligne
    data.lignes?.forEach((ligne, index) => {
      if (!ligne.montant || ligne.montant <= 0) {
        errors.push({ field: `ligne[${index}].montant`, message: `Ligne ${index + 1}: montant invalide` });
      }
      
      if (!ligne.section || !ligne.programme) {
        errors.push({ field: `ligne[${index}].chaineBudgetaire`, message: `Ligne ${index + 1}: chaîne budgétaire incomplète` });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  validateFicheMarche(data) {
    const errors = [];
    
    // Identification
    if (!data.intitule || data.intitule.trim().length < 10) {
      errors.push({ field: 'intitule', message: 'L\'intitulé doit contenir au moins 10 caractères' });
    }
    
    if (!data.typeMarche) {
      errors.push({ field: 'typeMarche', message: 'Le type de marché est obligatoire' });
    }
    
    if (!data.modePassation) {
      errors.push({ field: 'modePassation', message: 'Le mode de passation est obligatoire' });
    }
    
    // Chaîne budgétaire
    const chaineBudgetaire = ['section', 'programme', 'activite', 'natureEconomique', 'bailleur'];
    chaineBudgetaire.forEach(field => {
      if (!data[field]) {
        errors.push({ field, message: `${field} est obligatoire` });
      }
    });
    
    // Validation cohérence chaîne budgétaire
    if (data.section && data.programme) {
      const validation = ReferentielUtils.validateChaineBudgetaire(
        data.section, 
        data.programme, 
        data.activite, 
        data.natureEconomique
      );
      
      if (!validation.valid) {
        errors.push({ field: 'chaineBudgetaire', message: validation.error });
      }
    }
    
    // Montant
    if (!data.montantPrevisionnel || data.montantPrevisionnel <= 0) {
      errors.push({ field: 'montantPrevisionnel', message: 'Le montant prévisionnel doit être supérieur à 0' });
    }
    
    // Cohérence mode de passation / montant
    const modeConfig = APP_CONFIG.rules.modesPassation[data.modePassation];
    if (modeConfig) {
      if (modeConfig.maxAmount && data.montantPrevisionnel > modeConfig.maxAmount) {
        errors.push({
          field: 'modePassation',
          message: `Le montant dépasse le seuil autorisé pour ${data.modePassation} (${Utils.formatMontant(modeConfig.maxAmount)})`
        });
      }
      
      if (modeConfig.minAmount && data.montantPrevisionnel < modeConfig.minAmount) {
        errors.push({
          field: 'modePassation',
          message: `Le montant est inférieur au seuil minimum pour ${data.modePassation} (${Utils.formatMontant(modeConfig.minAmount)})`
        });
      }
    }
    
    // Livrables
    if (!data.livrables || data.livrables.length === 0) {
      errors.push({ field: 'livrables', message: 'Au moins un livrable doit être saisi' });
    }
    
    data.livrables?.forEach((livrable, index) => {
      if (!livrable.type) {
        errors.push({ field: `livrable[${index}].type`, message: `Livrable ${index + 1}: type obligatoire` });
      }
      
      if (!livrable.objet || livrable.objet.trim().length < 5) {
        errors.push({ field: `livrable[${index}].objet`, message: `Livrable ${index + 1}: objet obligatoire (min 5 caractères)` });
      }
      
      if (!livrable.localite || !livrable.localite.region) {
        errors.push({ field: `livrable[${index}].localite`, message: `Livrable ${index + 1}: localisation obligatoire` });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  // ===== VALIDATION CONTRACTUALISATION =====
  
  validateProcedurePV(data) {
    const errors = [];
    
    // Pour AOO, PSO, PI : PV obligatoires
    if (['AOO', 'PSO', 'PI', 'AOR'].includes(data.modePassation)) {
      if (!data.pvOuverture) {
        errors.push({ field: 'pvOuverture', message: 'PV d\'ouverture obligatoire pour cette procédure' });
      }
      
      if (!data.pvJugement) {
        errors.push({ field: 'pvJugement', message: 'PV de jugement obligatoire pour cette procédure' });
      }
      
      if (!data.rapportAnalyse) {
        errors.push({ field: 'rapportAnalyse', message: 'Rapport d\'analyse obligatoire pour cette procédure' });
      }
    }
    
    // Décision d'attribution toujours obligatoire
    if (!data.decisionAttribution) {
      errors.push({ field: 'decisionAttribution', message: 'Décision d\'attribution obligatoire' });
    }
    
    // Validation des dates
    if (data.dateOuverture && data.dateJugement) {
      if (new Date(data.dateJugement) < new Date(data.dateOuverture)) {
        errors.push({ field: 'dateJugement', message: 'La date de jugement ne peut pas être antérieure à la date d\'ouverture' });
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  validateRecours(data) {
    const errors = [];
    
    if (data.recoursEnCours) {
      if (!data.typeRecours) {
        errors.push({ field: 'typeRecours', message: 'Type de recours obligatoire' });
      }
      
      if (!data.dateDebut) {
        errors.push({ field: 'dateDebut', message: 'Date de début du recours obligatoire' });
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  // ===== VALIDATION ATTRIBUTION =====
  
  validateAttribution(data) {
    const errors = [];
    
    // Attributaire
    if (!data.attributaire) {
      errors.push({ field: 'attributaire', message: 'Attributaire obligatoire' });
    } else {
      if (!data.attributaire.raisonSociale) {
        errors.push({ field: 'attributaire.raisonSociale', message: 'Raison sociale obligatoire' });
      }
      
      if (!data.attributaire.rccm || !Utils.validateRCCM(data.attributaire.rccm)) {
        errors.push({ field: 'attributaire.rccm', message: 'RCCM invalide (format: CI-XXX-YYYY-Z-NNNNN)' });
      }
      
      if (!data.attributaire.ifu || !Utils.validateIFU(data.attributaire.ifu)) {
        errors.push({ field: 'attributaire.ifu', message: 'IFU invalide (10 chiffres)' });
      }
      
      if (data.attributaire.email && !Utils.validateEmail(data.attributaire.email)) {
        errors.push({ field: 'attributaire.email', message: 'Email invalide' });
      }
      
      if (!data.attributaire.banque || !data.attributaire.numeroCompte) {
        errors.push({ field: 'attributaire.coordonneesBancaires', message: 'Coordonnées bancaires obligatoires' });
      }
    }
    
    // Montant d'attribution
    if (!data.montantAttribution || data.montantAttribution <= 0) {
      errors.push({ field: 'montantAttribution', message: 'Montant d\'attribution invalide' });
    }
    
    // Vérifier l'écart avec le montant prévisionnel
    if (data.montantPrevisionnel && data.montantAttribution) {
      const ecart = Math.abs(data.montantAttribution - data.montantPrevisionnel);
      const tauxEcart = (ecart / data.montantPrevisionnel) * 100;
      
      if (tauxEcart > 15) {
        errors.push({
          field: 'montantAttribution',
          message: `Écart important avec le montant prévisionnel (${tauxEcart.toFixed(2)}%)`,
          warning: true
        });
      }
    }
    
    // Dates
    if (data.dateSignatureTitulaire && data.dateSignatureAutorite) {
      if (new Date(data.dateSignatureAutorite) < new Date(data.dateSignatureTitulaire)) {
        errors.push({
          field: 'dateSignatureAutorite',
          message: 'La date de signature de l\'autorité ne peut pas être antérieure à celle du titulaire'
        });
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings: errors.filter(e => e.warning)
    };
  },
  
  validateDecisionCF(data) {
    const errors = [];
    
    if (!data.decision) {
      errors.push({ field: 'decision', message: 'Décision CF obligatoire' });
    }
    
    if (data.decision === 'RESERVE' || data.decision === 'REFUS') {
      if (!data.motifCode) {
        errors.push({ field: 'motif', message: 'Motif obligatoire pour une réserve ou un refus' });
      }
    }
    
    if (!data.reference) {
      errors.push({ field: 'reference', message: 'Référence de la décision obligatoire' });
    }
    
    if (!data.controleur) {
      errors.push({ field: 'controleur', message: 'Nom du contrôleur obligatoire' });
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  validateEchéancier(data) {
    const errors = [];
    
    if (!data.echeances || data.echeances.length === 0) {
      errors.push({ field: 'echeances', message: 'Au moins une échéance doit être définie' });
    }
    
    // Vérifier la somme des échéances
    const totalEcheances = data.echeances?.reduce((sum, ech) => sum + (ech.montant || 0), 0) || 0;
    const montantMarche = data.montantMarche || 0;
    
    if (Math.abs(totalEcheances - montantMarche) > 1) {
      errors.push({
        field: 'echeances',
        message: `La somme des échéances (${Utils.formatMontant(totalEcheances)}) doit être égale au montant du marché (${Utils.formatMontant(montantMarche)})`
      });
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  validateCleRepartition(data) {
    const errors = [];
    
    if (!data.repartitions || data.repartitions.length === 0) {
      errors.push({ field: 'repartitions', message: 'Au moins une ligne de répartition doit être définie' });
    }
    
    // Vérifier la somme des montants
    const totalMontants = data.repartitions?.reduce((sum, rep) => sum + (rep.montant || 0), 0) || 0;
    const montantMarche = data.montantMarche || 0;
    
    if (Math.abs(totalMontants - montantMarche) > 1) {
      errors.push({
        field: 'repartitions',
        message: `La somme des montants (${Utils.formatMontant(totalMontants)}) doit être égale au montant du marché (${Utils.formatMontant(montantMarche)})`
      });
    }
    
    // Vérifier la somme des pourcentages
    const totalPourcentages = data.repartitions?.reduce((sum, rep) => sum + (rep.pourcentage || 0), 0) || 0;
    
    if (Math.abs(totalPourcentages - 100) > 0.01) {
      errors.push({
        field: 'repartitions',
        message: `La somme des pourcentages (${totalPourcentages.toFixed(2)}%) doit être égale à 100%`
      });
    }
    
    // Vérifier la cohérence de chaque ligne
    data.repartitions?.forEach((rep, index) => {
      if (!rep.bailleur) {
        errors.push({ field: `repartition[${index}].bailleur`, message: `Ligne ${index + 1}: bailleur obligatoire` });
      }
      
      if (!rep.natureEconomique) {
        errors.push({ field: `repartition[${index}].nature`, message: `Ligne ${index + 1}: nature économique obligatoire` });
      }
      
      if (!rep.annee) {
        errors.push({ field: `repartition[${index}].annee`, message: `Ligne ${index + 1}: année obligatoire` });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  // ===== VALIDATION EXÉCUTION =====
  
  validateOrdreService(data) {
    const errors = [];
    
    // Vérifier que le visa CF est accordé
    if (!data.visaCF || data.decisionCF !== 'VISA') {
      errors.push({
        field: 'visaCF',
        message: 'Impossible d\'émettre un OS sans visa CF accordé',
        blocking: true
      });
    }
    
    if (!data.numeroOS) {
      errors.push({ field: 'numeroOS', message: 'Numéro d\'OS obligatoire' });
    }
    
    if (!data.dateOS) {
      errors.push({ field: 'dateOS', message: 'Date d\'OS obligatoire' });
    }
    
    if (!data.dateDebut) {
      errors.push({ field: 'dateDebut', message: 'Date de début obligatoire' });
    }
    
    if (!data.duree || data.duree <= 0) {
      errors.push({ field: 'duree', message: 'Durée obligatoire et positive' });
    }
    
    return {
      valid: errors.length === 0,
      errors,
      blocking: errors.some(e => e.blocking)
    };
  },
  
  validateDecompte(data) {
    const errors = [];
    
    if (!data.numero) {
      errors.push({ field: 'numero', message: 'Numéro de décompte obligatoire' });
    }
    
    if (!data.montant || data.montant <= 0) {
      errors.push({ field: 'montant', message: 'Montant invalide' });
    }
    
    // Vérifier que le cumul ne dépasse pas le montant autorisé
    if (data.cumulPaye && data.montantAutorise) {
      if (data.cumulPaye > data.montantAutorise) {
        errors.push({
          field: 'montant',
          message: `Le cumul payé (${Utils.formatMontant(data.cumulPaye)}) dépasse le montant autorisé (${Utils.formatMontant(data.montantAutorise)})`,
          blocking: true
        });
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      blocking: errors.some(e => e.blocking)
    };
  },
  
  validateAvenant(data) {
    const errors = [];
    
    if (!data.type) {
      errors.push({ field: 'type', message: 'Type d\'avenant obligatoire' });
    }
    
    if (data.type === 'FINANCIER' || data.type === 'MIXTE') {
      if (!data.variationMontant) {
        errors.push({ field: 'variationMontant', message: 'Variation de montant obligatoire' });
      }
    }
    
    if (data.type === 'DELAI' || data.type === 'MIXTE') {
      if (!data.variationDuree) {
        errors.push({ field: 'variationDuree', message: 'Variation de durée obligatoire' });
      }
    }
    
    if (!data.motif || data.motif.trim().length < 20) {
      errors.push({ field: 'motif', message: 'Motif obligatoire (minimum 20 caractères)' });
    }
    
    // Vérifier le seuil cumulé des avenants
    if (data.montantInitial && data.avenantsPrecedents) {
      const tousAvenants = [...(data.avenantsPrecedents || [])];
      if (data.variationMontant) {
        tousAvenants.push({ variationMontant: data.variationMontant });
      }
      
      const check = Utils.checkSeuilAvenant(data.montantInitial, tousAvenants);
      
      if (check.depasseSeuil) {
        errors.push({
          field: 'variationMontant',
          message: check.message,
          warning: !data.autorisationSpeciale,
          blocking: !data.autorisationSpeciale
        });
      } else if (check.depasseAlerte) {
        errors.push({
          field: 'variationMontant',
          message: check.message,
          warning: true
        });
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings: errors.filter(e => e.warning),
      blocking: errors.some(e => e.blocking)
    };
  },
  
  // ===== VALIDATION CLÔTURE =====
  
  validateCloture(data) {
    const errors = [];
    
    // Vérifier les garanties actives
    if (data.garantiesActives && data.garantiesActives.length > 0) {
      errors.push({
        field: 'garanties',
        message: 'Impossible de clôturer : des garanties sont encore actives',
        blocking: true
      });
    }
    
    // Vérifier les paiements en attente
    if (data.paiementsEnAttente && data.paiementsEnAttente.length > 0) {
      errors.push({
        field: 'paiements',
        message: 'Impossible de clôturer : des paiements sont en attente',
        blocking: true
      });
    }
    
    // Réception définitive obligatoire
    if (!data.receptionDefinitive) {
      errors.push({
        field: 'receptionDefinitive',
        message: 'Réception définitive obligatoire pour la clôture',
        blocking: true
      });
    }
    
    return {
      valid: errors.length === 0,
      errors,
      blocking: errors.some(e => e.blocking)
    };
  }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ValidationRules;
}
