import React, { useState, useMemo } from 'react';
import { ChevronDown, FileText, CheckCircle, AlertCircle, TrendingUp, Filter, Download, Plus, Eye, Edit, Trash2, Search } from 'lucide-react';

export default function ModuleMarcheApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMarche, setSelectedMarche] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEtat, setFilterEtat] = useState('');
  const [filterType, setFilterType] = useState('');

  // ============ DONNÉES DE RÉFÉRENCE ============
  const unites = [
    { id: 1, code: 'MIN-SANTE', libelle: 'Ministère de la Santé' },
    { id: 2, code: 'DCF', libelle: 'Direction de la Comptabilité Financière' },
    { id: 3, code: 'DGBF', libelle: 'Direction Générale du Budget et des Finances' },
    { id: 4, code: 'DG-PLAN', libelle: 'Direction Générale de la Planification' }
  ];

  const typesMarchés = [
    { id: 1, code: 'TRAVAUX', libelle: 'Travaux' },
    { id: 2, code: 'FOURN', libelle: 'Fournitures' },
    { id: 3, code: 'SERV', libelle: 'Services' },
    { id: 4, code: 'PI', libelle: 'Prestations Intellectuelles' }
  ];

  const modePassation = [
    { id: 1, code: 'AOO', libelle: 'Appel d\'Offres Ouvert', categorie: 'PSC' },
    { id: 2, code: 'AOR', libelle: 'Appel d\'Offres Restreint', categorie: 'PSC' },
    { id: 3, code: 'PSC', libelle: 'Procédure Simplifiée Concurrentielle', categorie: 'PSD' },
    { id: 4, code: 'PSD', libelle: 'Procédure Simplifiée Directe', categorie: 'PSD' },
    { id: 5, code: 'GRE', libelle: 'Gré à gré', categorie: 'DEROGATOIRE' },
    { id: 6, code: 'MEAP', libelle: 'Marché Emergent A Partage', categorie: 'SPECIFIQUE' }
  ];

  const bailleurs = [
    { id: 1, code: 'ETAT', libelle: 'État' },
    { id: 2, code: 'BID', libelle: 'Banque Interaméricaine de Développement' },
    { id: 3, code: 'BM', libelle: 'Banque Mondiale' },
    { id: 4, code: 'BAD', libelle: 'Banque Africaine de Développement' },
    { id: 5, code: 'UE', libelle: 'Union Européenne' }
  ];

  const etatsMarche = [
    { id: 1, code: 'PLANIFIE', libelle: 'Planifié', couleur: 'bg-blue-100 text-blue-800' },
    { id: 2, code: 'EN_PROC', libelle: 'En Procédure', couleur: 'bg-yellow-100 text-yellow-800' },
    { id: 3, code: 'ATTRIBUE', libelle: 'Attribué', couleur: 'bg-purple-100 text-purple-800' },
    { id: 4, code: 'VISE', libelle: 'Visé', couleur: 'bg-indigo-100 text-indigo-800' },
    { id: 5, code: 'EXECUTION', libelle: 'Exécution', couleur: 'bg-green-100 text-green-800' },
    { id: 6, code: 'CLOS', libelle: 'Clôturé', couleur: 'bg-gray-100 text-gray-800' },
    { id: 7, code: 'RESILIE', libelle: 'Résilié', couleur: 'bg-red-100 text-red-800' }
  ];

  const typesPieces = [
    'DAO', 'PV_OUVERTURE', 'PV_JUGEMENT', 'RAPPORT_ANALYSE', 
    'CONTRAT_SIGNE', 'AVENANT_SIGNE', 'PV_RECPROV', 'PV_RECDEF', 'LETTRE_RECOURS'
  ];

  // ============ JEUX DE DONNÉES RÉALISTES ============
  const [marches, setMarches] = useState([
    {
      id: 'M001',
      code: 'M-2024-001',
      titre: 'Construction Centre de Santé - Région Abidjan',
      description: 'Construction d\'un centre de santé polyvalent avec maternité',
      type: 'TRAVAUX',
      unite: 'MIN-SANTE',
      etat: 'EXECUTION',
      modePassation: 'AOO',
      bailleur: 'BM',
      montantAPM: 850000000,
      montantEngagement: 850000000,
      montantOrdonance: 620000000,
      montantPaiement: 580000000,
      dateCreation: '2024-01-15',
      dateAttribution: '2024-05-10',
      dateDebutExecution: '2024-06-01',
      dateFinPrevue: '2025-12-31',
      titulaire: 'Entreprise BETA CONSTRUCTION',
      taux_avancement: 65,
      avenants: [
        { id: 'A001', type: 'FINAN', montant: 50000000, date: '2024-11-01' },
        { id: 'A002', type: 'TECH', montant: 0, date: '2024-10-15' }
      ],
      pieces: {
        'DAO': true,
        'PV_OUVERTURE': true,
        'PV_JUGEMENT': true,
        'RAPPORT_ANALYSE': true,
        'CONTRAT_SIGNE': true,
        'AVENANT_SIGNE': true,
        'PV_RECPROV': false,
        'PV_RECDEF': false,
        'LETTRE_RECOURS': false
      }
    },
    {
      id: 'M002',
      code: 'M-2024-002',
      titre: 'Fourniture d\'équipements médicaux',
      description: 'Acquisition de lits médicalisés et appareillages',
      type: 'FOURN',
      unite: 'MIN-SANTE',
      etat: 'VISE',
      modePassation: 'PSC',
      bailleur: 'ETAT',
      montantAPM: 120000000,
      montantEngagement: 120000000,
      montantOrdonance: 0,
      montantPaiement: 0,
      dateCreation: '2024-03-20',
      dateAttribution: '2024-08-15',
      dateDebutExecution: null,
      dateFinPrevue: '2025-06-30',
      titulaire: 'MEDTECH SOLUTIONS',
      taux_avancement: 5,
      avenants: [],
      pieces: {
        'DAO': true,
        'PV_OUVERTURE': true,
        'PV_JUGEMENT': true,
        'RAPPORT_ANALYSE': true,
        'CONTRAT_SIGNE': false,
        'AVENANT_SIGNE': false,
        'PV_RECPROV': false,
        'PV_RECDEF': false,
        'LETTRE_RECOURS': false
      }
    },
    {
      id: 'M003',
      code: 'M-2024-003',
      titre: 'Prestation d\'audit financier - 2024',
      description: 'Audit externe des comptes - Cabinet spécialisé',
      type: 'SERV',
      unite: 'DCF',
      etat: 'EXECUTION',
      modePassation: 'PSD',
      bailleur: 'ETAT',
      montantAPM: 25000000,
      montantEngagement: 25000000,
      montantOrdonance: 25000000,
      montantPaiement: 25000000,
      dateCreation: '2024-02-10',
      dateAttribution: '2024-04-01',
      dateDebutExecution: '2024-04-05',
      dateFinPrevue: '2024-12-31',
      titulaire: 'CABINET AUDIT PLUS',
      taux_avancement: 90,
      avenants: [],
      pieces: {
        'DAO': true,
        'PV_OUVERTURE': false,
        'PV_JUGEMENT': false,
        'RAPPORT_ANALYSE': false,
        'CONTRAT_SIGNE': true,
        'AVENANT_SIGNE': false,
        'PV_RECPROV': true,
        'PV_RECDEF': false,
        'LETTRE_RECOURS': false
      }
    },
    {
      id: 'M004',
      code: 'M-2024-004',
      titre: 'Étude de faisabilité - Route Nationale 3',
      description: 'Études techniques et environnementales',
      type: 'PI',
      unite: 'DG-PLAN',
      etat: 'ATTRIBUE',
      modePassation: 'AOO',
      bailleur: 'BAD',
      montantAPM: 75000000,
      montantEngagement: 75000000,
      montantOrdonance: 0,
      montantPaiement: 0,
      dateCreation: '2024-04-05',
      dateAttribution: '2024-09-20',
      dateDebutExecution: null,
      dateFinPrevue: '2025-09-30',
      titulaire: 'INGENIERIE TRANSPORT AFRIQUE',
      taux_avancement: 0,
      avenants: [],
      pieces: {
        'DAO': true,
        'PV_OUVERTURE': true,
        'PV_JUGEMENT': true,
        'RAPPORT_ANALYSE': true,
        'CONTRAT_SIGNE': false,
        'AVENANT_SIGNE': false,
        'PV_RECPROV': false,
        'PV_RECDEF': false,
        'LETTRE_RECOURS': false
      }
    },
    {
      id: 'M005',
      code: 'M-2024-005',
      titre: 'Maintenance informatique',
      description: 'Support et maintenance du parc informatique',
      type: 'SERV',
      unite: 'DGBF',
      etat: 'PLANIFIE',
      modePassation: 'PSD',
      bailleur: 'ETAT',
      montantAPM: 30000000,
      montantEngagement: 0,
      montantOrdonance: 0,
      montantPaiement: 0,
      dateCreation: '2024-10-01',
      dateAttribution: null,
      dateDebutExecution: null,
      dateFinPrevue: '2025-12-31',
      titulaire: 'En sélection',
      taux_avancement: 0,
      avenants: [],
      pieces: {}
    }
  ]);

  // ============ CALCULS ET FILTRAGE ============
  const marchesFiltrées = useMemo(() => {
    return marches.filter(m => {
      const matchSearch = m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.titre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEtat = !filterEtat || m.etat === filterEtat;
      const matchType = !filterType || m.type === filterType;
      return matchSearch && matchEtat && matchType;
    });
  }, [marches, searchTerm, filterEtat, filterType]);

  // Indicateurs de tableau de bord
  const indicateurs = {
    total: marches.length,
    enExecution: marches.filter(m => m.etat === 'EXECUTION').length,
    enProcedure: marches.filter(m => m.etat === 'EN_PROC').length,
    clos: marches.filter(m => m.etat === 'CLOS').length,
    montantTotal: marches.reduce((sum, m) => sum + m.montantAPM, 0),
    montantEngage: marches.reduce((sum, m) => sum + m.montantEngagement, 0),
    montantPaye: marches.reduce((sum, m) => sum + m.montantPaiement, 0)
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Intl.DateTimeFormat('fr-FR').format(new Date(dateStr));
  };

  const getTypeMarche = (code) => typesMarchés.find(t => t.code === code)?.libelle || code;
  const getUnite = (code) => unites.find(u => u.code === code)?.libelle || code;
  const getModePassation = (code) => modePassation.find(m => m.code === code)?.libelle || code;
  const getEtat = (code) => etatsMarche.find(e => e.code === code);
  const getBailleur = (code) => bailleurs.find(b => b.code === code)?.libelle || code;

  // ============ COMPOSANTS VISUELS ============
  const HeaderSIDCF = () => (
    <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="font-bold text-teal-700 text-lg">SI</span>
          </div>
          <div>
            <div className="font-bold text-lg">SI-DCF</div>
            <div className="text-xs opacity-90">Système d'Information Décisionnel</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">Module Marché</div>
          <div className="text-xs opacity-90">Gestion des Marchés Publics</div>
        </div>
      </div>
    </div>
  );

  const Indicateur = ({ titre, valeur, sous_titre, couleur }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-gray-600 text-sm font-medium">{titre}</div>
      <div className={`text-2xl font-bold mt-2 ${couleur}`}>{valeur}</div>
      {sous_titre && <div className="text-gray-500 text-xs mt-1">{sous_titre}</div>}
    </div>
  );

  // ============ RENDU PRINCIPAL ============
  if (activeTab === 'detail' && selectedMarche) {
    const marche = selectedMarche;
    const etat = getEtat(marche.etat);

    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderSIDCF />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelectedMarche(null)}
            className="mb-4 text-teal-700 hover:text-teal-900 font-medium text-sm flex items-center gap-2"
          >
            ← Retour à la liste
          </button>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{marche.titre}</h1>
                <p className="text-gray-600 text-sm mt-1">{marche.code}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg font-medium ${etat?.couleur}`}>
                {etat?.libelle}
              </div>
            </div>
            <p className="text-gray-700">{marche.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-gray-600 text-sm font-medium mb-3">Informations Générales</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type :</span>
                  <span className="font-medium">{getTypeMarche(marche.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unité :</span>
                  <span className="font-medium">{getUnite(marche.unite)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode de passation :</span>
                  <span className="font-medium">{getModePassation(marche.modePassation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bailleur :</span>
                  <span className="font-medium">{getBailleur(marche.bailleur)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Titulaire :</span>
                  <span className="font-medium">{marche.titulaire}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-gray-600 text-sm font-medium mb-3">Montants (FCFA)</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">APM :</span>
                  <span className="font-bold text-teal-700">{formatCurrency(marche.montantAPM)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagé :</span>
                  <span className="font-medium">{formatCurrency(marche.montantEngagement)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ordonancé :</span>
                  <span className="font-medium">{formatCurrency(marche.montantOrdonance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payé :</span>
                  <span className="font-medium">{formatCurrency(marche.montantPaiement)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-gray-600 text-sm font-medium mb-3">Calendrier</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Création :</span>
                  <span className="font-medium">{formatDate(marche.dateCreation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attribution :</span>
                  <span className="font-medium">{formatDate(marche.dateAttribution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Début exécution :</span>
                  <span className="font-medium">{formatDate(marche.dateDebutExecution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fin prévue :</span>
                  <span className="font-medium">{formatDate(marche.dateFinPrevue)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-gray-600 text-sm font-medium mb-3">Avancement</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taux d'avancement</span>
                  <span className="text-lg font-bold text-teal-700">{marche.taux_avancement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all"
                    style={{ width: `${marche.taux_avancement}%` }}
                  />
                </div>
                {marche.avenants.length > 0 && (
                  <div className="text-xs text-orange-600 font-medium mt-2">
                    ⚠ {marche.avenants.length} avenant(s) en cours
                  </div>
                )}
              </div>
            </div>
          </div>

          {marche.avenants.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Avenants</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600 font-medium">ID</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Type</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Montant</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {marche.avenants.map(av => (
                    <tr key={av.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium text-teal-700">{av.id}</td>
                      <td className="py-3">{av.type}</td>
                      <td className="py-3 font-medium">{av.montant > 0 ? '+' + formatCurrency(av.montant) : '-'}</td>
                      <td className="py-3">{formatDate(av.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Pièces Justificatives</h3>
            <div className="grid grid-cols-3 gap-4">
              {typesPieces.map(type => {
                const presente = marche.pieces[type] || false;
                return (
                  <div key={type} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    {presente ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={`text-sm font-medium ${presente ? 'text-gray-900' : 'text-gray-400'}`}>
                      {type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSIDCF />

      {/* Navigation Onglets */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab('marches')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'marches'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Marchés
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TABLEAU DE BORD */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de bord</h1>

            {/* Indicateurs KPI */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <Indicateur
                titre="Marchés actifs"
                valeur={indicateurs.total}
                sous_titre={`${indicateurs.enExecution} en exécution`}
                couleur="text-teal-700"
              />
              <Indicateur
                titre="En procédure"
                valeur={indicateurs.enProcedure}
                sous_titre="Candidatures/Jugement"
                couleur="text-amber-600"
              />
              <Indicateur
                titre="Clôturés"
                valeur={indicateurs.clos}
                sous_titre="Marchés finalisés"
                couleur="text-gray-600"
              />
              <Indicateur
                titre="Montant total"
                valeur={formatCurrency(indicateurs.montantTotal)}
                sous_titre="Appels de Paiement Mensuel"
                couleur="text-teal-700"
              />
            </div>

            {/* Flux de trésorerie */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                  <span className="font-medium text-gray-900">Engagements</span>
                </div>
                <div className="text-2xl font-bold text-teal-700 mb-2">
                  {formatCurrency(indicateurs.montantEngage)}
                </div>
                <div className="text-xs text-gray-500">
                  {((indicateurs.montantEngage / indicateurs.montantTotal) * 100).toFixed(1)}% de l'APM
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                  <span className="font-medium text-gray-900">Ordonancés</span>
                </div>
                <div className="text-2xl font-bold text-amber-700 mb-2">
                  {formatCurrency(marches.reduce((sum, m) => sum + m.montantOrdonance, 0))}
                </div>
                <div className="text-xs text-gray-500">
                  {((marches.reduce((sum, m) => sum + m.montantOrdonance, 0) / indicateurs.montantTotal) * 100).toFixed(1)}% de l'APM
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="font-medium text-gray-900">Payés</span>
                </div>
                <div className="text-2xl font-bold text-green-700 mb-2">
                  {formatCurrency(indicateurs.montantPaye)}
                </div>
                <div className="text-xs text-gray-500">
                  {((indicateurs.montantPaye / indicateurs.montantTotal) * 100).toFixed(1)}% de l'APM
                </div>
              </div>
            </div>

            {/* Distribution par état */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Distribution par état</h3>
              <div className="grid grid-cols-3 gap-4">
                {etatsMarche.map(etat => {
                  const count = marches.filter(m => m.etat === etat.code).length;
                  return (
                    <div key={etat.code} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{etat.libelle}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${etat.couleur}`}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* LISTE DES MARCHÉS */}
        {activeTab === 'marches' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Marchés</h1>
              <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" /> Nouveau marché
              </button>
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Code ou titre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">État</label>
                  <select
                    value={filterEtat}
                    onChange={(e) => setFilterEtat(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    <option value="">Tous les états</option>
                    {etatsMarche.map(e => (
                      <option key={e.code} value={e.code}>{e.libelle}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    <option value="">Tous les types</option>
                    {typesMarchés.map(t => (
                      <option key={t.code} value={t.code}>{t.libelle}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button className="flex-1 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                    <Download className="w-4 h-4 inline mr-2" /> Exporter
                  </button>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="text-sm text-gray-600 mb-4">
              {marchesFiltrées.length} marché(s) trouvé(s)
            </div>

            {/* Tableau */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Titre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">État</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Montant APM</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Avancement</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {marchesFiltrées.map((marche) => {
                    const etat = getEtat(marche.etat);
                    return (
                      <tr key={marche.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-teal-700">{marche.code}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{marche.titre}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{getTypeMarche(marche.type)}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${etat?.couleur}`}>
                            {etat?.libelle}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(marche.montantAPM)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-teal-600 h-2 rounded-full"
                                style={{ width: `${marche.taux_avancement}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-600">{marche.taux_avancement}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setSelectedMarche(marche)}
                            className="text-teal-700 hover:text-teal-900 font-medium text-sm flex items-center justify-center gap-1"
                          >
                            <Eye className="w-4 h-4" /> Détail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
