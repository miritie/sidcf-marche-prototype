# Module Marchés - SID-CF

Prototype fonctionnel de gestion des marchés publics pour la Direction du Contrôle Financier (DCF).

## Structure du projet

```
marches-publics/
├── index.html                 # Page d'accueil / Tableau de bord
├── assets/
│   ├── css/
│   │   ├── variables.css     # Variables CSS (couleurs, espacements)
│   │   ├── base.css          # Styles de base
│   │   └── components.css    # Composants réutilisables
│   ├── js/
│   │   ├── config.js         # Configuration globale
│   │   ├── data-layer.js     # Couche d'abstraction données
│   │   ├── utils.js          # Fonctions utilitaires
│   │   ├── navigation.js     # Gestion navigation
│   │   └── validation.js     # Règles de validation
│   ├── data/
│   │   ├── mock-data.js      # Données de test
│   │   └── referentiels.js   # Référentiels (sections, programmes, etc.)
│   └── img/
│       └── logo.png          # Logo SID-CF
├── pages/
│   ├── planification/
│   │   ├── ecr-01a.html      # Import PPM
│   │   ├── ecr-01b.html      # Saisie PPM unitaire
│   │   └── ecr-01c.html      # Fiche marché & livrables
│   ├── contractualisation/
│   │   ├── ecr-02a.html      # Procédure & PV
│   │   └── ecr-02b.html      # Recours & observations
│   ├── attribution/
│   │   ├── ecr-03a.html      # Attribution & décision CF
│   │   └── ecr-03b.html      # Échéancier & clé répartition
│   ├── execution/
│   │   ├── ecr-04a.html      # Exécution & OS/décomptes
│   │   ├── ecr-04b.html      # Avenants
│   │   └── ecr-04c.html      # Garanties & résiliation
│   ├── cloture/
│   │   └── ecr-05.html       # Clôture & réceptions
│   └── parametrage/
│       └── index.html        # Configuration système
└── vercel.json               # Configuration Vercel

```

## Déploiement

### GitHub
```bash
git init
git add .
git commit -m "Initial commit - Module Marchés"
git remote add origin [votre-repo]
git push -u origin main
```

### Vercel
1. Connecter le repository GitHub
2. Déploiement automatique à chaque push

## Personnalisation

- **Logo** : Remplacer `assets/img/logo.png`
- **Couleurs** : Modifier `assets/css/variables.css`
- **Données** : Modifier `assets/data/mock-data.js`
- **Règles** : Modifier `assets/js/validation.js`

## Technologies

- HTML5 / CSS3 / JavaScript (Vanilla)
- Pas de framework externe (pour faciliter la maintenance)
- Données locales (prêt pour migration Airtable)
