# Guide de Déploiement - Module Marchés SID-CF

## 📋 Prérequis

- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit - s'inscrire avec GitHub)
- Git installé sur votre machine (optionnel, peut se faire via l'interface web)

## 🚀 Déploiement rapide (5 minutes)

### Méthode 1 : Via GitHub Desktop (Recommandé pour débutants)

1. **Télécharger GitHub Desktop**
   - Visitez: https://desktop.github.com/
   - Installez l'application

2. **Créer un repository**
   - Ouvrez GitHub Desktop
   - File → New Repository
   - Name: `marches-publics-sidcf`
   - Local Path: Choisissez où extraire le ZIP
   - Cliquez "Create Repository"

3. **Ajouter les fichiers**
   - Extrayez le contenu du ZIP dans le dossier créé
   - GitHub Desktop détectera automatiquement les fichiers
   - Ajoutez un message: "Initial commit - Module Marchés"
   - Cliquez "Commit to main"
   - Cliquez "Publish repository" (décochez "Keep this code private" si vous voulez le rendre public)

4. **Déployer sur Vercel**
   - Visitez: https://vercel.com/
   - Cliquez "Sign Up" et choisissez "Continue with GitHub"
   - Une fois connecté, cliquez "Add New..." → "Project"
   - Sélectionnez le repository `marches-publics-sidcf`
   - Cliquez "Import"
   - Laissez les paramètres par défaut
   - Cliquez "Deploy"
   - Attendez 1-2 minutes

5. **Accéder à votre application**
   - Vercel vous donnera une URL (ex: https://marches-publics-sidcf.vercel.app)
   - Cliquez sur l'URL pour ouvrir votre application!

### Méthode 2 : Via ligne de commande (Pour utilisateurs avancés)

```bash
# 1. Extraire le ZIP et naviguer dans le dossier
cd marches-publics

# 2. Initialiser Git
git init
git add .
git commit -m "Initial commit - Module Marchés"

# 3. Créer un repository sur GitHub
# Allez sur https://github.com/new
# Nommez-le: marches-publics-sidcf
# NE cochez PAS "Initialize with README"

# 4. Lier et pousser vers GitHub
git remote add origin https://github.com/VOTRE-USERNAME/marches-publics-sidcf.git
git branch -M main
git push -u origin main

# 5. Déployer sur Vercel
# Option A: Via interface web (suivre étape 4 de la Méthode 1)
# Option B: Via Vercel CLI
npm install -g vercel
vercel login
vercel
# Suivez les instructions interactives
```

## ⚙️ Configuration

### Personnaliser le logo

1. Préparez votre logo (format PNG, 200x200px recommandé)
2. Renommez-le en `logo.png`
3. Remplacez le fichier dans `assets/img/logo.png`
4. Commitez et poussez:
   ```bash
   git add assets/img/logo.png
   git commit -m "Update logo"
   git push
   ```
5. Vercel redéploiera automatiquement

### Modifier les couleurs

Éditez le fichier `assets/css/variables.css`:
- `--primary-green`: Couleur principale
- `--accent-orange`: Couleur d'accent
- Autres couleurs selon vos besoins

### Ajuster les règles de gestion

Éditez `assets/js/config.js` et modifiez les valeurs dans `APP_CONFIG.rules`

## 🔄 Mises à jour

### Via GitHub Desktop

1. Modifiez vos fichiers localement
2. GitHub Desktop affichera les changements
3. Ajoutez un message de commit
4. Cliquez "Commit to main"
5. Cliquez "Push origin"
6. Vercel redéploiera automatiquement (1-2 minutes)

### Via ligne de commande

```bash
# Après avoir modifié des fichiers
git add .
git commit -m "Description de vos modifications"
git push

# Vercel redéploie automatiquement
```

## 📊 Airtable (Intégration future)

L'application est prête pour l'intégration Airtable:

1. **Créer une base Airtable**
   - Visitez: https://airtable.com
   - Créez une base avec les tables: Marchés, Livrables, Décomptes, Avenants, Garanties

2. **Obtenir les credentials**
   - API Key: https://airtable.com/account
   - Base ID: Visible dans l'URL de votre base

3. **Configurer**
   - Éditez `assets/js/data-layer.js`
   - Remplissez `airtableConfig`:
     ```javascript
     this.airtableConfig = {
       baseId: 'VOTRE_BASE_ID',
       apiKey: 'VOTRE_API_KEY',
       // ... rest of config
     };
     ```

4. **Activer Airtable**
   - Dans `assets/js/config.js`, changez:
     ```javascript
     storage: {
       type: 'airtable', // au lieu de 'localStorage'
       // ...
     }
     ```

## 🐛 Résolution de problèmes

### Le site ne se déploie pas

- Vérifiez que tous les fichiers sont présents
- Vérifiez les logs de déploiement sur Vercel
- Assurez-vous que `vercel.json` est présent

### Les données ne se sauvent pas

- Vérifiez que localStorage est activé dans votre navigateur
- Testez en mode navigation privée pour voir si c'est un problème de cache
- Vérifiez la console JavaScript (F12) pour les erreurs

### Le logo ne s'affiche pas

- Vérifiez que le fichier `logo.png` existe dans `assets/img/`
- Vérifiez les permissions du fichier
- Effacez le cache du navigateur

## 📞 Support

- Documentation: Voir README.md
- Issues GitHub: Créez un "Issue" dans votre repository
- Configuration Vercel: https://vercel.com/docs

## 🎉 Félicitations!

Votre application est maintenant en ligne et accessible depuis n'importe où!

**URL type**: `https://marches-publics-sidcf.vercel.app`

**Partager l'application**:
- Partagez simplement l'URL Vercel
- Elle est accessible depuis n'importe quel navigateur moderne
- Responsive: fonctionne sur mobile et tablette

**Itérer avec votre client**:
- Faites vos modifications localement
- Testez localement (ouvrez `index.html`)
- Poussez sur GitHub
- Vercel met à jour automatiquement
- Partagez la nouvelle URL pour feedback
