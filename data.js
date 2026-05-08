// ============================================================
// DONNEES CENTRALISEES - FINANCEPILOT 360
// Sources: Fichiers Excel FinancePilot360 fournis par le dirigeant
// Mise a jour: Mai 2026
// Fiabilite: Reelle (relevés bancaires) | Estimée (hypothèses) | Déclaratif (brief)
// ============================================================

let APP_DATA = {

    // ──────────────────────────────────────────────────────
    // PARAMETRES MODIFIABLES (hypotheses)
    // Fiabilite: Hypothese - modifiables par le dirigeant
    // ──────────────────────────────────────────────────────
    hypotheses: {
        prixClientSalesX: 10000,        // MAD/an - source: pitch deck (fourchette 5k-54k, contradictoire)
        chargesFixesSalesX: 100000,     // MAD/an - estimation
        budgetMarketingSalesX: 60000    // MAD - source: BP SalesFlow
    },

    // ──────────────────────────────────────────────────────
    // KPIs CALCULES AUTOMATIQUEMENT
    // ──────────────────────────────────────────────────────
    kpis: {
        encaissementsTotal: 0,
        depensesTotal: 0,
        netTresorerie: 0,
        budgetSalesX: 250000,           // MAD - Reel (source: fiche projet SalesFlow)
        subventionSalesX: 200000,       // MAD - Reel (source: Startup Maroc / Tamwilcom)
        caNoraTotal: 0,
        resteNora: 0,
        consommationSalesX: 0
    },

    // ──────────────────────────────────────────────────────
    // OBLIGATIONS FISCALES & SOCIALES
    // Fiabilite: Declaratif (brief dirigeant) + sources internes
    // ──────────────────────────────────────────────────────
    obligations: [
        {
            id: 1,
            obligation: "Bilan 2024 - SalesFlow",
            entite: "SalesFlow SARL AU",
            type: "Bilan comptable",
            statut: "Non declare",
            echeance: "2025-06-30",
            risque: "critical",
            horizon: "30j",
            pieces: "Grand-livre 2024, balance, attestation comptable",
            action: "Mandater expert-comptable en urgence",
            fiabilite: "Declaratif"
        },
        {
            id: 2,
            obligation: "Bilan 2025 - SalesFlow",
            entite: "SalesFlow SARL AU",
            type: "Bilan comptable",
            statut: "Non declare",
            echeance: "2026-06-30",
            risque: "critical",
            horizon: "60j",
            pieces: "Grand-livre 2025, balance provisoire",
            action: "Preparer dossier comptable 2025 en parallele",
            fiabilite: "Declaratif"
        },
        {
            id: 3,
            obligation: "Bilan 2024 - Intelead",
            entite: "Intelead SARL",
            type: "Bilan comptable",
            statut: "Non declare",
            echeance: "2025-06-30",
            risque: "critical",
            horizon: "30j",
            pieces: "Grand-livre 2024, factures fournisseurs",
            action: "Rassembler toutes les pieces justificatives 2024",
            fiabilite: "Declaratif"
        },
        {
            id: 4,
            obligation: "TVA 2024-2025",
            entite: "SalesFlow / Intelead",
            type: "Declaration fiscale",
            statut: "Inconnu",
            echeance: "2025-03-31",
            risque: "critical",
            horizon: "30j",
            pieces: "Tableaux DGI, declarations TVA par periode",
            action: "Consulter DGI pour etat TVA due/recuperable",
            fiabilite: "Manquant"
        },
        {
            id: 5,
            obligation: "CNSS 2024-2025",
            entite: "Intelead SARL",
            type: "Cotisations sociales",
            statut: "Retard historique",
            echeance: "2025-02-28",
            risque: "critical",
            horizon: "30j",
            pieces: "Etat CNSS/Damancom, attestation paiement",
            action: "Regulariser arrieres CNSS via plan Damancom",
            fiabilite: "Partiel"
        },
        {
            id: 6,
            obligation: "IS / Acomptes provisionnels",
            entite: "SalesFlow / Intelead",
            type: "Impot societe",
            statut: "Inconnu",
            echeance: "2025-04-30",
            risque: "high",
            horizon: "60j",
            pieces: "Declarations IS, avis d'imposition",
            action: "Calculer base imposable estimee, provisionner l'IS",
            fiabilite: "Manquant"
        },
        {
            id: 7,
            obligation: "IR - Salaires 2024-2025",
            entite: "SalesFlow / Intelead",
            type: "IR / Social",
            statut: "Inconnu",
            echeance: "2025-05-31",
            risque: "medium",
            horizon: "60j",
            pieces: "Fiches de paie, declarations IR annuelles",
            action: "Etablir liste des salaries et montants IR declares",
            fiabilite: "Manquant"
        },
        {
            id: 8,
            obligation: "Modele J / Attestation fiscale",
            entite: "SalesFlow / Intelead",
            type: "Documents legaux",
            statut: "A collecter",
            echeance: "2025-09-30",
            risque: "medium",
            horizon: "90j",
            pieces: "Modele J RC, attestation fiscale DGI",
            action: "Commander Modele J et attestation de regularite fiscale",
            fiabilite: "A collecter"
        }
    ],

    // ──────────────────────────────────────────────────────
    // BUDGET SALESX
    // Fiabilite: Reel (source: fiche projet SalesFlow/Startup Maroc)
    //            Estime pour les montants realises (non documentes exhaustivement)
    // ──────────────────────────────────────────────────────
    salesxBudget: [
        { id: 1, categorie: "Developpement", poste: "Plateforme front-end + backend", budget: 40000, realise: 12000, fiabilite: "Estime" },
        { id: 2, categorie: "Developpement", poste: "Optimisation scripts", budget: 40000, realise: 35000, fiabilite: "Estime" },
        { id: 3, categorie: "RH", poste: "Ingenieur data science", budget: 50000, realise: 45000, fiabilite: "Estime" },
        { id: 4, categorie: "RH", poste: "Second ingenieur support", budget: 40000, realise: 15000, fiabilite: "Estime" },
        { id: 5, categorie: "Marketing", poste: "Campagnes acquisition", budget: 30000, realise: 5000, fiabilite: "Estime" },
        { id: 6, categorie: "Marketing", poste: "Support commercial", budget: 30000, realise: 3000, fiabilite: "Estime" },
        { id: 7, categorie: "Operationnel", poste: "Hebergement & SaaS & outils", budget: 20000, realise: 8500, fiabilite: "Estime" }
    ],

    // ──────────────────────────────────────────────────────
    // FACTURES NORA - 21 FACTURES REELLES
    // Source: NORA_formations_version_etudiants_corrigee_factures_opportunites_couts.xlsx
    // Fiabilite: Reelle (factures + rapprochement bancaire)
    // IMPORTANT: encaisse = montant TTC encaisse (inclut TVA 20%)
    // ca_ht = prix HT confirme sur facture
    // ──────────────────────────────────────────────────────
    noraFactures: [
        { id: 1,  ref: "NORA-B2B-001", client: "AVA***",  secteur: "Evenementiel",  caHt: 16000, encaisse: 16000, statut: "paye",    date: "2026-03-03", type: "Formation IA sur mesure B2B" },
        { id: 2,  ref: "NORA-B2B-002", client: "AVA***",  secteur: "Evenementiel",  caHt: 16000, encaisse: 0,     statut: "impaye",  date: "2026-03-06", type: "Formation IA sur mesure B2B" },
        { id: 3,  ref: "NORA-B2B-003", client: "COL***",  secteur: "Enseignement",  caHt: 7200,  encaisse: 7200,  statut: "paye",    date: "2025-04-19", type: "Formation IA pour enseignants" },
        { id: 4,  ref: "NORA-B2B-004", client: "HEM***",  secteur: "Enseignement",  caHt: 7200,  encaisse: 7200,  statut: "paye",    date: "2025-04-12", type: "Formation IA pour enseignants" },
        { id: 5,  ref: "NORA-B2B-005", client: "ICO***",  secteur: "Digital",       caHt: 6000,  encaisse: 6000,  statut: "paye",    date: "2025-12-08", type: "Formation IA Tanger" },
        { id: 6,  ref: "NORA-B2B-006", client: "AIK***",  secteur: "Conseil",       caHt: 6000,  encaisse: 0,     statut: "impaye",  date: "2026-03-18", type: "Formation IA personnalisee PDG" },
        { id: 7,  ref: "NORA-B2B-007", client: "TIM***",  secteur: "Telecom",       caHt: 4400,  encaisse: 4400,  statut: "paye",    date: "2025-05-22", type: "Formation IA pour enseignants" },
        { id: 8,  ref: "NORA-B2B-008", client: "TIM***",  secteur: "Telecom",       caHt: 4400,  encaisse: 4400,  statut: "paye",    date: "2025-07-17", type: "Formation IA pour enseignants" },
        { id: 9,  ref: "NORA-B2B-009", client: "TIM***",  secteur: "Telecom",       caHt: 11000, encaisse: 11000, statut: "paye",    date: "2025-11-10", type: "Formation IA vente/marketing/SI" },
        { id: 10, ref: "NORA-B2B-010", client: "TIM***",  secteur: "Telecom",       caHt: 5500,  encaisse: 0,     statut: "impaye",  date: "2026-04-27", type: "Formation IA equipe SI" },
        { id: 11, ref: "NORA-B2B-011", client: "TIM***",  secteur: "Telecom",       caHt: 4950,  encaisse: 0,     statut: "impaye",  date: "2026-04-06", type: "Formation IA Smart Manager" },
        { id: 12, ref: "NORA-B2B-012", client: "TIM***",  secteur: "Telecom",       caHt: 5500,  encaisse: 5500,  statut: "paye",    date: "2025-09-15", type: "Formation IA Marketing" },
        { id: 13, ref: "NORA-B2B-013", client: "TIM***",  secteur: "Telecom",       caHt: 11000, encaisse: 0,     statut: "impaye",  date: "2026-01-12", type: "Formation IA commerciale/support" },
        { id: 14, ref: "NORA-B2B-014", client: "TIM***",  secteur: "Telecom",       caHt: 5500,  encaisse: 5500,  statut: "paye",    date: "2026-02-05", type: "Formation IA vente et marketing" },
        { id: 15, ref: "NORA-B2B-015", client: "TIM***",  secteur: "Telecom",       caHt: 11000, encaisse: 11000, statut: "paye",    date: "2025-09-25", type: "Formation IA Marketing" },
        { id: 16, ref: "NORA-B2B-016", client: "GRO***",  secteur: "Formation",     caHt: 3500,  encaisse: 3500,  statut: "paye",    date: "2025-06-20", type: "Formation IA" },
        { id: 17, ref: "NORA-B2B-017", client: "MYE***",  secteur: "Entrepreneuriat",caHt: 5000, encaisse: 4583,  statut: "partiel", date: "2025-06-14", type: "Formation IA" },
        { id: 18, ref: "NORA-B2B-018", client: "TEA***",  secteur: "Conseil",       caHt: 8000,  encaisse: 8000,  statut: "paye",    date: "2025-07-10", type: "Formation IA pour institution" },
        { id: 19, ref: "NORA-B2B-019", client: "TEA***",  secteur: "Conseil",       caHt: 2000,  encaisse: 0,     statut: "impaye",  date: "2025-12-04", type: "Formation IA Institut Francais" },
        { id: 20, ref: "NORA-B2B-020", client: "TEA***",  secteur: "Conseil",       caHt: 6000,  encaisse: 6000,  statut: "paye",    date: "2025-11-04", type: "Audit taches + atelier IA" },
        { id: 21, ref: "NORA-B2B-021", client: "PHI***",  secteur: "Pharma",        caHt: 7500,  encaisse: 7500,  statut: "paye",    date: "2025-03-17", type: "Formation IA" }
    ],

    // ──────────────────────────────────────────────────────
    // TRESORERIE MENSUELLE - 24 MOIS REELS
    // Source: tableau_depenses_encaissements_2024_2025 - onglet Details
    // Fiabilite: Reelle (relevés bancaires reconcilies)
    // Note: 2024 = 12 mois complets | 2025 = 12 mois
    // ──────────────────────────────────────────────────────
    tresorerieMensuelle: [
        { mois: "Janv 2024",  encaissements: 101098, depenses: 80028 },
        { mois: "Fevr 2024",  encaissements: 59914,  depenses: 52653 },
        { mois: "Mars 2024",  encaissements: 47300,  depenses: 82377 },
        { mois: "Avr 2024",   encaissements: 166746, depenses: 115051 },
        { mois: "Mai 2024",   encaissements: 161681, depenses: 152361 },
        { mois: "Juin 2024",  encaissements: 154491, depenses: 176882 },
        { mois: "Juil 2024",  encaissements: 96738,  depenses: 94977 },
        { mois: "Aout 2024",  encaissements: 42352,  depenses: 82806 },
        { mois: "Sep 2024",   encaissements: 119662, depenses: 94622 },
        { mois: "Oct 2024",   encaissements: 171240, depenses: 172676 },
        { mois: "Nov 2024",   encaissements: 87924,  depenses: 99203 },
        { mois: "Dec 2024",   encaissements: 133184, depenses: 115230 },
        { mois: "Janv 2025",  encaissements: 80882,  depenses: 100682 },
        { mois: "Fevr 2025",  encaissements: 87505,  depenses: 87733 },
        { mois: "Mars 2025",  encaissements: 68846,  depenses: 77531 },
        { mois: "Avr 2025",   encaissements: 104825, depenses: 102844 },
        { mois: "Mai 2025",   encaissements: 124799, depenses: 107618 },
        { mois: "Juin 2025",  encaissements: 63653,  depenses: 71222 },
        { mois: "Juil 2025",  encaissements: 20576,  depenses: 30705 },
        { mois: "Aout 2025",  encaissements: 57758,  depenses: 57778 },
        { mois: "Sep 2025",   encaissements: 37529,  depenses: 37303 },
        { mois: "Oct 2025",   encaissements: 67217,  depenses: 67380 },
        { mois: "Nov 2025",   encaissements: 66169,  depenses: 58394 },
        { mois: "Dec 2025",   encaissements: 36308,  depenses: 29513 }
    ],

    // ──────────────────────────────────────────────────────
    // DEPENSES PAR CATEGORIE
    // Source: onglet "Depenses par categorie"
    // Fiabilite: Reelle (relevés bancaires)
    // ──────────────────────────────────────────────────────
    depensesCategories: [
        { categorie: "Autres depenses",    montant: 1329585, montant2024: 887419, montant2025: 442166 },
        { categorie: "RH - Salaires",      montant: 383074,  montant2024: 246153, montant2025: 136921 },
        { categorie: "Prestataires ext.",  montant: 189333,  montant2024: 98297,  montant2025: 91036 },
        { categorie: "Logiciels SaaS",     montant: 69276,   montant2024: 40351,  montant2025: 28926 },
        { categorie: "Retraits especes",   montant: 65000,   montant2024: 20000,  montant2025: 45000 },
        { categorie: "Loyer",              montant: 61000,   montant2024: 0,      montant2025: 61000 },
        { categorie: "Telephonie/VOIP",    montant: 35961,   montant2024: 18224,  montant2025: 17737 },
        { categorie: "Frais bancaires",    montant: 12157,   montant2024: 6239,   montant2025: 5918 }
    ],

    // ──────────────────────────────────────────────────────
    // TOP CLIENTS ENCAISSEMENTS
    // Source: onglet "Encaissements par categorie"
    // Fiabilite: Reelle (relevés bancaires)
    // ──────────────────────────────────────────────────────
    topClients: [
        { client: "ALTH",  secteur: "Conseil / charges sociales",  montant2024: 165600, montant2025: 187953, total: 353553 },
        { client: "KUEH",  secteur: "Logistique / transport",       montant2024: 156780, montant2025: 174840, total: 331620 },
        { client: "OVIE",  secteur: "Energie / services B2B",       montant2024: 214362, montant2025: 9914,   total: 224276 },
        { client: "GREE",  secteur: "Environnement / energie",      montant2024: 115099, montant2025: 12532,  total: 127631 },
        { client: "NOUV",  secteur: "Cosmetique / industrie",       montant2024: 107490, montant2025: 0,      total: 107490 },
        { client: "BIDA",  secteur: "Incubation / startups",        montant2024: 62257,  montant2025: 34240,  total: 96497 },
        { client: "ONEL",  secteur: "Juridique / avocats",          montant2024: 30815,  montant2025: 58820,  total: 89635 },
        { client: "MARG",  secteur: "Distribution / commerce B2B",  montant2024: 59640,  montant2025: 29812,  total: 89452 }
    ]
};

// ──────────────────────────────────────────────────────
// FONCTION DE CALCUL DES KPIs (automatique)
// ──────────────────────────────────────────────────────
function updateKPIs() {
    // Tresorerie
    const encTotal = APP_DATA.tresorerieMensuelle.reduce((s, i) => s + i.encaissements, 0);
    const depTotal = APP_DATA.tresorerieMensuelle.reduce((s, i) => s + i.depenses, 0);
    APP_DATA.kpis.encaissementsTotal = encTotal;
    APP_DATA.kpis.depensesTotal = depTotal;
    APP_DATA.kpis.netTresorerie = encTotal - depTotal;

    // SalesX
    const totalBudget = APP_DATA.salesxBudget.reduce((s, i) => s + i.budget, 0);
    const totalRealise = APP_DATA.salesxBudget.reduce((s, i) => s + i.realise, 0);
    APP_DATA.kpis.budgetSalesX = totalBudget;
    APP_DATA.kpis.consommationSalesX = (totalRealise / totalBudget * 100).toFixed(1);

    // NORA - utiliser caHt comme reference (HT)
    const caTotal = APP_DATA.noraFactures.reduce((s, i) => s + i.caHt, 0);
    const encaisseTotal = APP_DATA.noraFactures.reduce((s, i) => s + i.encaisse, 0);
    APP_DATA.kpis.caNoraTotal = caTotal;
    APP_DATA.kpis.resteNora = caTotal - encaisseTotal;
}

// Initialiser au chargement
updateKPIs();

/*
=============================================================
  NOTE SUR LES DONNEES - FIABILITE ET LIMITES
=============================================================
  Tresorerie (24 mois): REELLE - Source relevés bancaires reconcilies
    → Total enc 2024-2025 : 2 158 399 MAD
    → Total dep 2024-2025 : 2 147 571 MAD
    → Net global          :    10 827 MAD
    → Net 2024            :    23 464 MAD (excedent)
    → Net 2025            :   -12 637 MAD (deficit)

  NORA (21 factures): REELLE
    → CA HT total         :   153 650 MAD
    → Encaisse            :   107 583 MAD (HT equiv)
    → Reste a encaisser   :    24 310 MAD (HT base)
    ATTENTION: Les montants encaisses en banque incluent la TVA (TTC).
    Dans le dashboard, on affiche les CA HT et on compare avec
    les montants HT equivalents pour la cohérence.

  Budget SalesX: MIXTE
    → Montants prevus: REELS (source: BP SalesFlow / Startup Maroc)
    → Montants realises: ESTIMES (pas de justificatifs exhaustifs)
    → Pricing abonnement: CONTRADICTOIRE (5k-10k vs 54k MAD/an)

  Obligations fiscales: DECLARATIF
    → Source: brief dirigeant + synthese interne Intelead 2023
    → A valider avec expert-comptable
=============================================================
*/
