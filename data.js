// ============================================================
// DONNEES CENTRALISEES - INTELEAD DASHBOARD
// ============================================================

let APP_DATA = {
    // Parametres modifiables
    hypotheses: {
        prixClientSalesX: 10000,
        chargesFixesSalesX: 100000,
        budgetMarketingSalesX: 60000
    },

    // KPIS - Calcules automatiquement plus tard
    kpis: {
        encaissementsTotal: 0,
        depensesTotal: 0,
        netTresorerie: 0,
        budgetSalesX: 250000,
        subventionSalesX: 200000,
        caNoraTotal: 0,
        resteNora: 0
    },

    // Obligations
    obligations: [
        { id: 1, obligation: "Bilan 2024 SalesFlow", entite: "SalesFlow", type: "Bilan", statut: "Non declare", echeance: "2025-06-30", risque: "critical", horizon: "30j" },
        { id: 2, obligation: "Bilan 2025 SalesFlow", entite: "SalesFlow", type: "Bilan", statut: "Non declare", echeance: "2026-06-30", risque: "critical", horizon: "60j" },
        { id: 3, obligation: "Bilan 2024 Intelead", entite: "Intelead", type: "Bilan", statut: "Non declare", echeance: "2025-06-30", risque: "critical", horizon: "30j" },
        { id: 4, obligation: "TVA 2024-2025", entite: "Groupe", type: "Fiscal", statut: "Inconnu", echeance: "2025-03-31", risque: "critical", horizon: "30j" },
        { id: 5, obligation: "CNSS 2024-2025", entite: "Intelead", type: "Social", statut: "Retard", echeance: "2025-02-28", risque: "critical", horizon: "30j" },
        { id: 6, obligation: "IS / Acomptes", entite: "Groupe", type: "Fiscal", statut: "Inconnu", echeance: "2025-04-30", risque: "high", horizon: "60j" },
        { id: 7, obligation: "IR Salaires", entite: "Groupe", type: "Social", statut: "Inconnu", echeance: "2025-05-31", risque: "medium", horizon: "60j" }
    ],

    // Budget SalesX
    salesxBudget: [
        { id: 1, categorie: "Developpement", poste: "Front-end", budget: 40000, realise: 12000 },
        { id: 2, categorie: "Developpement", poste: "Optimisation", budget: 40000, realise: 35000 },
        { id: 3, categorie: "RH", poste: "Data scientist", budget: 50000, realise: 45000 },
        { id: 4, categorie: "RH", poste: "Support", budget: 40000, realise: 15000 },
        { id: 5, categorie: "Marketing", poste: "Campagnes", budget: 30000, realise: 5000 },
        { id: 6, categorie: "Marketing", poste: "Commercial", budget: 30000, realise: 3000 },
        { id: 7, categorie: "Operationnel", poste: "SaaS", budget: 20000, realise: 8500 }
    ],

    // Factures NORA
    noraFactures: [
        { id: 1, client: "AVA Consulting", secteur: "Industrie", caHt: 16000, encaisse: 16000, statut: "paye", date: "2026-03-05" },
        { id: 2, client: "TIM Telecom", secteur: "Telecom", caHt: 11000, encaisse: 0, statut: "impaye", date: "2026-04-27" },
        { id: 3, client: "COL Education", secteur: "Education", caHt: 7200, encaisse: 7200, statut: "paye", date: "2025-04-26" },
        { id: 4, client: "PHI Pharma", secteur: "Pharma", caHt: 7500, encaisse: 7500, statut: "paye", date: "2025-03-17" },
        { id: 5, client: "AIK Group", secteur: "Conseil", caHt: 6000, encaisse: 0, statut: "impaye", date: "2026-03-26" }
    ],

    // Tresorerie mensuelle
    tresorerieMensuelle: [
        { mois: "Janv 2024", encaissements: 101098, depenses: 80028 },
        { mois: "Fevr 2024", encaissements: 59914, depenses: 52653 },
        { mois: "Mars 2024", encaissements: 47300, depenses: 82377 },
        { mois: "Avr 2024", encaissements: 166746, depenses: 115051 },
        { mois: "Mai 2024", encaissements: 161681, depenses: 152361 },
        { mois: "Juin 2024", encaissements: 154491, depenses: 176882 },
        { mois: "Juil 2024", encaissements: 96738, depenses: 94977 },
        { mois: "Aout 2024", encaissements: 42352, depenses: 82806 },
        { mois: "Sep 2024", encaissements: 119662, depenses: 94622 },
        { mois: "Oct 2024", encaissements: 171240, depenses: 172676 },
        { mois: "Nov 2024", encaissements: 87924, depenses: 99203 },
        { mois: "Dec 2024", encaissements: 133184, depenses: 115230 },
        { mois: "Janv 2025", encaissements: 80882, depenses: 100682 },
        { mois: "Fevr 2025", encaissements: 87505, depenses: 87733 },
        { mois: "Mars 2025", encaissements: 68846, depenses: 77531 },
        { mois: "Avr 2025", encaissements: 104825, depenses: 102844 },
        { mois: "Mai 2025", encaissements: 124799, depenses: 107618 },
        { mois: "Juin 2025", encaissements: 63653, depenses: 71222 }
    ],

    // Depenses par categorie
    depensesCategories: [
        { categorie: "Autres depenses", montant: 1329585 },
        { categorie: "RH - Salaires", montant: 383074 },
        { categorie: "Prestataires", montant: 189333 },
        { categorie: "Logiciels SaaS", montant: 69277 },
        { categorie: "Retraits especes", montant: 65000 },
        { categorie: "Loyer", montant: 61000 },
        { categorie: "Telephonie", montant: 35961 },
        { categorie: "Frais bancaires", montant: 12157 }
    ],

    // Top clients
    topClients: [
        { client: "ALTH", montant2024: 165600, montant2025: 187953, total: 353553 },
        { client: "KUEH", montant2024: 156780, montant2025: 174840, total: 331620 },
        { client: "OVIE", montant2024: 214362, montant2025: 9914, total: 224276 },
        { client: "GREE", montant2024: 115099, montant2025: 12532, total: 127631 },
        { client: "NOUV", montant2024: 107490, montant2025: 0, total: 107490 }
    ]
};

// Fonction de mise a jour des KPIS
function updateKPIs() {
    // SalesX
    const totalBudget = APP_DATA.salesxBudget.reduce((s, i) => s + i.budget, 0);
    const totalRealise = APP_DATA.salesxBudget.reduce((s, i) => s + i.realise, 0);
    APP_DATA.kpis.budgetSalesX = totalBudget;
    APP_DATA.kpis.consommationSalesX = (totalRealise / totalBudget * 100).toFixed(1);
    
    // NORA
    const caTotal = APP_DATA.noraFactures.reduce((s, i) => s + i.caHt, 0);
    const encaisseTotal = APP_DATA.noraFactures.reduce((s, i) => s + i.encaisse, 0);
    APP_DATA.kpis.caNoraTotal = caTotal;
    APP_DATA.kpis.resteNora = caTotal - encaisseTotal;
    
    // Tresorerie
    APP_DATA.kpis.encaissementsTotal = APP_DATA.tresorerieMensuelle.reduce((s, i) => s + i.encaissements, 0);
    APP_DATA.kpis.depensesTotal = APP_DATA.tresorerieMensuelle.reduce((s, i) => s + i.depenses, 0);
    APP_DATA.kpis.netTresorerie = APP_DATA.kpis.encaissementsTotal - APP_DATA.kpis.depensesTotal;
}

// Initialiser
updateKPIs();