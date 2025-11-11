# Module Marché SID-CF - Documentation Complète

## 📋 Description du Projet

Application web complète pour la gestion des marchés publics du Système d'Information Décisionnel du Contrôle Financier (SID-CF) de Côte d'Ivoire.

## 🚀 Déploiement Rapide

### 1. Configuration GitHub

```bash
# Initialiser le repository
git init
git add .
git commit -m "Initial commit - Module Marché SID-CF"

# Créer un nouveau repo sur GitHub et lier
git remote add origin https://github.com/votre-username/sidcf-marche.git
git branch -M main
git push -u origin main
```

### 2. Déploiement sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Importer le repository
4. Vercel détectera automatiquement le projet
5. Cliquer sur "Deploy"
6. Votre app sera disponible sur : `https://sidcf-marche.vercel.app`

## 📁 Structure du Projet

```
sidcf-marche/
├── index.html              # Page principale
├── login.html              # Page de connexion
├── css/
│   └── styles.css          # Styles globaux
├── js/
│   ├── database.js         # Base de données locale
│   └── app.js              # Logique principale
├── pages/
│   ├── dashboard.html      # Tableau de bord
│   ├── marches.html        # Gestion des marchés
│   ├── fournisseurs.html   # Gestion des fournisseurs
│   ├── demandes-achat.html # Demandes d'achat
│   ├── bons-commande.html  # Bons de commande
│   ├── factures.html       # Factures
│   ├── paiements.html      # Paiements
│   ├── contrats.html       # Contrats
│   ├── rapports.html       # Rapports
│   └── parametres.html     # Paramètres
└── README.md
```

## 🎯 Fonctionnalités Principales

### 1. **Authentification**
- Connexion sécurisée avec validation
- Gestion des sessions
- Niveaux d'accès et permissions

### 2. **Tableau de Bord**
- Statistiques en temps réel
- Graphiques interactifs
- Alertes et notifications
- Activités récentes

### 3. **Gestion des Marchés**
- CRUD complet (Créer, Lire, Mettre à jour, Supprimer)
- Workflow de validation
- Suivi des indicateurs de performance
- Gestion des documents

### 4. **Gestion des Fournisseurs**
- Base de données fournisseurs
- Évaluation et notation
- Documents et certifications
- Historique des marchés

### 5. **Processus d'Achat**
- Demandes d'achat
- Bons de commande
- Réception et validation
- Suivi des livraisons

### 6. **Facturation et Paiements**
- Gestion des factures
- Workflow de validation
- Suivi des paiements
- Rapprochement bancaire

### 7. **Rapports et Analyses**
- Rapports personnalisables
- Export Excel/PDF
- Tableaux de bord dynamiques
- Analyses statistiques

### 8. **Paramétrage**
- Configuration générale
- Gestion des utilisateurs
- Droits et permissions
- Workflow personnalisable

## 📊 Modèle de Données

### Tables Principales

#### **Marchés**
- Code unique (format: M2024-XXX)
- Type (Fournitures, Travaux, Services, Prestations)
- Mode de passation
- Montants (HT, TVA, TTC)
- Dates et durée
- Statut et workflow

#### **Fournisseurs**
- Identifiant fiscal unique (IFU)
- Informations légales
- Contacts
- Évaluation
- Documents

#### **Factures**
- Numérotation automatique
- Liens avec BC et marchés
- Workflow de validation
- Échéances

#### **Paiements**
- Modes de paiement
- Références bancaires
- Statut
- Rapprochement

## 🔒 Règles de Gestion

### Contraintes sur les Marchés
- **Montant minimum** : 100 000 FCFA
- **Montant maximum** : 10 000 000 000 FCFA
- **Durée minimum** : 7 jours
- **Durée maximum** : 1095 jours (3 ans)

### Seuils de Validation
| Montant | Validateur | Niveau |
|---------|------------|--------|
| < 1M FCFA | Gestionnaire | 1 |
| < 5M FCFA | Chef de Service | 2 |
| < 20M FCFA | Directeur Financier | 3 |
| < 50M FCFA | Directeur Général | 4 |
| ≥ 50M FCFA | Conseil Administration | 5 |

### Modes de Passation
- **Gré à gré** : < 5M FCFA
- **Demande de Cotation** : < 20M FCFA
- **Appel d'Offres Restreint** : < 50M FCFA
- **Appel d'Offres Ouvert** : ≥ 50M FCFA

## 👤 Comptes de Démonstration

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| jean.kouassi@sidcf.ci | demo123 | Administrateur |
| marie.kone@sidcf.ci | demo123 | Gestionnaire |
| mamadou.diallo@sidcf.ci | demo123 | Comptable |

## 🔧 Configuration

### Adaptation pour Airtable

Le système est prêt pour une migration vers Airtable :

```javascript
// Dans database.js
db.exportToAPI('https://api.airtable.com/v0/YOUR_BASE_ID', 'YOUR_API_KEY');
```

### Personnalisation

1. **Charte graphique** : Modifier les variables CSS dans `/css/styles.css`
2. **Configuration** : Adapter les paramètres dans `/js/database.js` (CONFIG)
3. **Workflows** : Personnaliser les seuils et validations

## 📱 Responsive Design

L'application est entièrement responsive et fonctionne sur :
- Desktop (>1024px)
- Tablet (768px - 1024px)
- Mobile (<768px)

## 🛡️ Sécurité

- Validation côté client de tous les formulaires
- Patterns regex pour les champs critiques
- Historique complet des actions
- Gestion des permissions par rôle

## 📈 Performance

- Base de données locale avec localStorage
- Pagination automatique
- Recherche et filtrage optimisés
- Chargement dynamique des pages

## 🤝 Support et Contribution

Pour toute question ou contribution :
1. Créer une issue sur GitHub
2. Proposer une Pull Request
3. Contacter l'équipe de développement

## 📄 Licence

© 2024 SID-CF - Système d'Information Décisionnel du Contrôle Financier
Tous droits réservés.

---

**Version** : 1.0.0  
**Date** : Janvier 2024  
**Développé avec** : HTML5, CSS3, JavaScript ES6+