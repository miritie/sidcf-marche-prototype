/**
 * Fichier JavaScript principal - Module Marché SID-CF
 * Fonctions communes et gestion de l'application
 */

// ============================================
// ÉTAT GLOBAL DE L'APPLICATION
// ============================================
window.AppState = {
    currentUser: null,
    currentPage: 'dashboard',
    currentModal: null,
    editMode: false,
    selectedItems: [],
    filters: {},
    sorting: {},
    pagination: {
        page: 1,
        perPage: 10,
        total: 0
    }
};

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Vérifier l'authentification
    checkAuthentication();
    
    // Charger la configuration
    loadConfiguration();
    
    // Initialiser l'interface
    setupEventListeners();
    
    // Charger la page par défaut ou depuis l'URL
    const page = getUrlParameter('page') || 'dashboard';
    loadPage(page);
    
    // Initialiser les notifications
    initializeNotifications();
    
    console.log('Application SID-CF initialisée avec succès');
}

// ============================================
// AUTHENTIFICATION
// ============================================
function checkAuthentication() {
    const user = localStorage.getItem('sidcf_current_user');
    if (user) {
        window.AppState.currentUser = JSON.parse(user);
        updateUserInterface();
    } else {
        // Rediriger vers la page de connexion
        window.location.href = 'login.html';
    }
}

function login(email, password) {
    // Recherche de l'utilisateur dans la base
    const user = db.tables.utilisateurs.find(u => 
        u.email === email && u.motDePasse === password && u.actif
    );
    
    if (user) {
        // Sauvegarder la session
        localStorage.setItem('sidcf_current_user', JSON.stringify(user));
        window.AppState.currentUser = user;
        
        // Logger l'action
        db.addToHistory('LOGIN', 'Session', user.id, 'Connexion réussie');
        
        // Rediriger vers le dashboard
        window.location.href = 'index.html';
        return true;
    } else {
        showNotification('Email ou mot de passe incorrect', 'error');
        return false;
    }
}

function logout() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        // Logger l'action
        db.addToHistory('LOGOUT', 'Session', window.AppState.currentUser.id, 'Déconnexion');
        
        // Nettoyer la session
        localStorage.removeItem('sidcf_current_user');
        window.AppState.currentUser = null;
        
        // Rediriger vers la connexion
        window.location.href = 'login.html';
    }
}

function updateUserInterface() {
    const user = window.AppState.currentUser;
    if (!user) return;
    
    // Mettre à jour l'affichage du nom d'utilisateur
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        el.textContent = `${user.prenom} ${user.nom}`;
    });
    
    // Mettre à jour le rôle
    const userRoleElements = document.querySelectorAll('.user-role');
    userRoleElements.forEach(el => {
        el.textContent = user.role;
    });
    
    // Gérer les permissions
    updatePermissions();
}

function updatePermissions() {
    const user = window.AppState.currentUser;
    if (!user) return;
    
    // Masquer les éléments selon les permissions
    if (user.role !== 'Administrateur') {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Gérer les boutons de validation selon le niveau
    document.querySelectorAll('[data-min-level]').forEach(el => {
        const minLevel = parseInt(el.dataset.minLevel);
        if (user.niveau_validation < minLevel) {
            el.disabled = true;
            el.title = 'Vous n\'avez pas les permissions nécessaires';
        }
    });
}

// ============================================
// NAVIGATION ET ROUTING
// ============================================
function loadPage(pageName) {
    // Mettre à jour l'état
    window.AppState.currentPage = pageName;
    
    // Mettre à jour l'URL
    updateUrl({ page: pageName });
    
    // Mettre à jour le menu
    updateNavigation(pageName);
    
    // Charger le contenu
    loadPageContent(pageName);
    
    // Logger l'action
    db.addToHistory('NAVIGATION', 'Page', pageName, `Navigation vers ${pageName}`);
}

function loadPageContent(pageName) {
    const contentArea = document.getElementById('main-content');
    if (!contentArea) return;
    
    // Afficher le loading
    contentArea.innerHTML = '<div class="loading-container"><div class="spinner"></div></div>';
    
    // Charger le fichier HTML correspondant
    fetch(`pages/${pageName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page non trouvée');
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
            
            // Initialiser les fonctionnalités de la page
            initializePage(pageName);
        })
        .catch(error => {
            console.error('Erreur chargement page:', error);
            contentArea.innerHTML = `
                <div class="alert alert-danger">
                    <strong>Erreur :</strong> Impossible de charger la page ${pageName}
                </div>
            `;
        });
}

function initializePage(pageName) {
    // Initialiser les fonctionnalités spécifiques à chaque page
    switch(pageName) {
        case 'dashboard':
            initializeDashboard();
            break;
        case 'marches':
            loadMarchesTable();
            break;
        case 'fournisseurs':
            loadFournisseursTable();
            break;
        case 'factures':
            loadFacturesTable();
            break;
        case 'paiements':
            loadPaiementsTable();
            break;
        case 'parametres':
            loadParametres();
            break;
        default:
            console.log(`Page ${pageName} initialisée`);
    }
}

function updateNavigation(pageName) {
    // Retirer la classe active de tous les items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Ajouter la classe active au bon item
    const activeItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// ============================================
// CRUD OPERATIONS
// ============================================
function loadTable(tableName, containerId, template) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Récupérer les données
    let data = db.read(tableName);
    
    // Appliquer les filtres
    if (window.AppState.filters[tableName]) {
        data = applyFilters(data, window.AppState.filters[tableName]);
    }
    
    // Appliquer le tri
    if (window.AppState.sorting[tableName]) {
        data = applySorting(data, window.AppState.sorting[tableName]);
    }
    
    // Appliquer la pagination
    const paginated = applyPagination(data, tableName);
    
    // Générer le HTML
    let html = '';
    paginated.items.forEach(item => {
        html += template(item);
    });
    
    container.innerHTML = html || '<tr><td colspan="10" class="text-center">Aucune donnée disponible</td></tr>';
    
    // Mettre à jour la pagination
    updatePagination(tableName, paginated);
}

function createRecord(tableName, formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    try {
        // Créer l'enregistrement
        const newRecord = db.create(tableName, data);
        
        // Fermer le modal
        closeModal();
        
        // Recharger la table
        loadTable(tableName, `${tableName}TableBody`, window[`${tableName}Template`]);
        
        // Notification
        showNotification('Enregistrement créé avec succès', 'success');
        
        return newRecord;
    } catch (error) {
        showNotification(error.message, 'error');
        return null;
    }
}

function updateRecord(tableName, id, formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    try {
        // Mettre à jour l'enregistrement
        const updatedRecord = db.update(tableName, id, data);
        
        // Fermer le modal
        closeModal();
        
        // Recharger la table
        loadTable(tableName, `${tableName}TableBody`, window[`${tableName}Template`]);
        
        // Notification
        showNotification('Enregistrement modifié avec succès', 'success');
        
        return updatedRecord;
    } catch (error) {
        showNotification(error.message, 'error');
        return null;
    }
}

function deleteRecord(tableName, id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        return;
    }
    
    try {
        // Supprimer l'enregistrement
        db.delete(tableName, id);
        
        // Recharger la table
        loadTable(tableName, `${tableName}TableBody`, window[`${tableName}Template`]);
        
        // Notification
        showNotification('Enregistrement supprimé avec succès', 'success');
        
        return true;
    } catch (error) {
        showNotification(error.message, 'error');
        return false;
    }
}

// ============================================
// FILTRES ET TRI
// ============================================
function applyFilters(data, filters) {
    return data.filter(item => {
        for (const [key, value] of Object.entries(filters)) {
            if (value === '' || value === null) continue;
            
            const itemValue = item[key];
            if (itemValue === undefined) return false;
            
            // Recherche textuelle
            if (typeof value === 'string' && typeof itemValue === 'string') {
                if (!itemValue.toLowerCase().includes(value.toLowerCase())) {
                    return false;
                }
            }
            // Comparaison exacte
            else if (itemValue !== value) {
                return false;
            }
        }
        return true;
    });
}

function applySorting(data, sorting) {
    const { field, direction } = sorting;
    if (!field) return data;
    
    return [...data].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // Gérer les valeurs nulles
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        // Comparaison
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

function applyPagination(data, tableName) {
    const pagination = window.AppState.pagination;
    const start = (pagination.page - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    
    return {
        items: data.slice(start, end),
        total: data.length,
        pages: Math.ceil(data.length / pagination.perPage),
        currentPage: pagination.page
    };
}

function updatePagination(tableName, paginated) {
    const container = document.getElementById(`${tableName}Pagination`);
    if (!container) return;
    
    let html = '';
    
    // Bouton précédent
    html += `<button class="page-btn" onclick="changePage('${tableName}', ${paginated.currentPage - 1})" 
             ${paginated.currentPage === 1 ? 'disabled' : ''}>←</button>`;
    
    // Pages
    for (let i = 1; i <= paginated.pages; i++) {
        html += `<button class="page-btn ${i === paginated.currentPage ? 'active' : ''}" 
                 onclick="changePage('${tableName}', ${i})">${i}</button>`;
    }
    
    // Bouton suivant
    html += `<button class="page-btn" onclick="changePage('${tableName}', ${paginated.currentPage + 1})" 
             ${paginated.currentPage === paginated.pages ? 'disabled' : ''}>→</button>`;
    
    container.innerHTML = html;
}

function changePage(tableName, page) {
    window.AppState.pagination.page = page;
    loadTable(tableName, `${tableName}TableBody`, window[`${tableName}Template`]);
}

// ============================================
// MODALS
// ============================================
function openModal(modalId, data = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Stocker le modal actuel
    window.AppState.currentModal = modalId;
    
    // Si des données sont fournies, remplir le formulaire
    if (data) {
        window.AppState.editMode = true;
        fillForm(modalId + 'Form', data);
    } else {
        window.AppState.editMode = false;
        resetForm(modalId + 'Form');
    }
    
    // Afficher le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId = null) {
    const modal = modalId ? 
        document.getElementById(modalId) : 
        document.getElementById(window.AppState.currentModal);
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        window.AppState.currentModal = null;
        window.AppState.editMode = false;
    }
}

function fillForm(formId, data) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    Object.keys(data).forEach(key => {
        const input = form.elements[key];
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = data[key];
            } else if (input.type === 'radio') {
                const radio = form.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                if (radio) radio.checked = true;
            } else {
                input.value = data[key];
            }
        }
    });
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s;
    `;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span style="font-size: 1.2em; margin-right: 10px;">${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après le délai
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

function initializeNotifications() {
    // Vérifier les notifications en attente
    checkPendingNotifications();
    
    // Actualiser périodiquement
    setInterval(checkPendingNotifications, 60000); // Toutes les minutes
}

function checkPendingNotifications() {
    // Vérifier les marchés qui expirent bientôt
    const marches = db.read('marches');
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    marches.forEach(marche => {
        const dateFin = new Date(marche.dateFin);
        if (dateFin <= thirtyDaysFromNow && dateFin >= today && marche.statut === 'Actif') {
            showNotification(
                `Le marché ${marche.codeMarche} expire dans ${Math.ceil((dateFin - today) / (24 * 60 * 60 * 1000))} jours`,
                'warning'
            );
        }
    });
    
    // Vérifier les factures en attente
    const factures = db.read('factures');
    const facturesEnAttente = factures.filter(f => f.statut === 'En validation');
    if (facturesEnAttente.length > 0) {
        updateBadge('factures-badge', facturesEnAttente.length);
    }
}

function updateBadge(badgeId, count) {
    const badge = document.getElementById(badgeId);
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// ============================================
// UTILITAIRES
// ============================================
function formatMoney(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('XOF', 'FCFA');
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatDateTime(date) {
    if (!date) return '';
    return new Date(date).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function updateUrl(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        if (params[key]) {
            url.searchParams.set(key, params[key]);
        } else {
            url.searchParams.delete(key);
        }
    });
    window.history.pushState({}, '', url);
}

function exportToCSV(tableName) {
    const data = db.read(tableName);
    if (!data || data.length === 0) {
        showNotification('Aucune donnée à exporter', 'warning');
        return;
    }
    
    // Créer le CSV
    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';
    
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            return typeof value === 'string' ? `"${value}"` : value;
        });
        csv += values.join(',') + '\n';
    });
    
    // Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tableName}_${formatDate(new Date())}.csv`;
    link.click();
    
    showNotification('Export CSV réussi', 'success');
}

function printPage() {
    window.print();
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const errors = [];
    
    // Valider chaque champ requis
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value || field.value.trim() === '') {
            isValid = false;
            field.classList.add('error');
            errors.push(`Le champ ${field.name || field.id} est obligatoire`);
        } else {
            field.classList.remove('error');
        }
    });
    
    // Valider les formats
    form.querySelectorAll('[pattern]').forEach(field => {
        if (field.value && !new RegExp(field.pattern).test(field.value)) {
            isValid = false;
            field.classList.add('error');
            errors.push(`Le champ ${field.name || field.id} n'est pas au bon format`);
        }
    });
    
    // Afficher les erreurs
    if (!isValid) {
        showNotification(errors.join('<br>'), 'error');
    }
    
    return isValid;
}

function debounce(func, wait) {
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

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) {
                loadPage(page);
            }
        });
    });
    
    // Fermeture des modals au clic en dehors
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // ESC pour fermer les modals
        if (e.key === 'Escape' && window.AppState.currentModal) {
            closeModal();
        }
        
        // Ctrl+S pour sauvegarder
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (window.AppState.currentModal) {
                const form = document.querySelector('.modal.active form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        }
        
        // Ctrl+N pour nouveau
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            const newBtn = document.querySelector('.btn-primary[onclick*="open"][onclick*="Modal"]');
            if (newBtn) {
                newBtn.click();
            }
        }
    });
}

// ============================================
// CONFIGURATION
// ============================================
function loadConfiguration() {
    // Charger la configuration depuis localStorage ou utiliser les valeurs par défaut
    const savedConfig = localStorage.getItem('sidcf_config');
    if (savedConfig) {
        Object.assign(window.CONFIG, JSON.parse(savedConfig));
    }
}

function saveConfiguration() {
    localStorage.setItem('sidcf_config', JSON.stringify(window.CONFIG));
    showNotification('Configuration sauvegardée', 'success');
}

// ============================================
// EXPORTS POUR MODULES EXTERNES
// ============================================
window.App = {
    state: window.AppState,
    login,
    logout,
    loadPage,
    openModal,
    closeModal,
    showNotification,
    formatMoney,
    formatDate,
    formatDateTime,
    exportToCSV,
    printPage,
    validateForm,
    createRecord,
    updateRecord,
    deleteRecord,
    debounce
};
