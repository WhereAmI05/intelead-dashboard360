// ============================================================
// SCRIPT PRINCIPAL - AVEC MODIFICATION DES DONNEES
// ============================================================

let myCharts = {};
let currentEditItem = null;
let currentEditType = null;

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initModals();
    initFilters();
    initHypotheses();
    loadCurrentPage();
    initImportExport();
});

function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initModals() {
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
            currentEditItem = null;
            currentEditType = null;
        });
    });
}

function openModal(modalId, item = null, type = null) {
    if (item) {
        currentEditItem = item;
        currentEditType = type;
        // Remplir le formulaire avec les données existantes
        if (type === 'obligation') {
            document.getElementById('editObligation').value = item.obligation || '';
            document.getElementById('editEntite').value = item.entite || 'Groupe';
            document.getElementById('editType').value = item.type || 'Bilan';
            document.getElementById('editRisque').value = item.risque || 'medium';
            document.getElementById('editStatut').value = item.statut || 'Non declare';
        }
        else if (type === 'budget') {
            document.getElementById('editPoste').value = item.poste || '';
            document.getElementById('editBudget').value = item.budget || 0;
            document.getElementById('editRealise').value = item.realise || 0;
        }
        else if (type === 'facture') {
            document.getElementById('editClient').value = item.client || '';
            document.getElementById('editSecteur').value = item.secteur || 'Autre';
            document.getElementById('editCaHt').value = item.caHt || 0;
            document.getElementById('editEncaisse').value = item.encaisse || 0;
        }
    }
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    currentEditItem = null;
    currentEditType = null;
}

function saveEdit() {
    if (!currentEditItem || !currentEditType) return;
    
    if (currentEditType === 'obligation') {
        currentEditItem.obligation = document.getElementById('editObligation').value;
        currentEditItem.entite = document.getElementById('editEntite').value;
        currentEditItem.type = document.getElementById('editType').value;
        currentEditItem.risque = document.getElementById('editRisque').value;
        currentEditItem.statut = document.getElementById('editStatut').value;
    }
    else if (currentEditType === 'budget') {
        currentEditItem.poste = document.getElementById('editPoste').value;
        currentEditItem.budget = parseFloat(document.getElementById('editBudget').value);
        currentEditItem.realise = parseFloat(document.getElementById('editRealise').value);
    }
    else if (currentEditType === 'facture') {
        const newEncaisse = parseFloat(document.getElementById('editEncaisse').value);
        currentEditItem.client = document.getElementById('editClient').value;
        currentEditItem.secteur = document.getElementById('editSecteur').value;
        currentEditItem.caHt = parseFloat(document.getElementById('editCaHt').value);
        currentEditItem.encaisse = newEncaisse;
        currentEditItem.statut = newEncaisse >= currentEditItem.caHt ? 'paye' : 'impaye';
    }
    
    updateKPIs();
    loadCurrentPage();
    closeModal('editModal');
    showNotification("Element modifie");
}

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', filterTable);
    const riskFilter = document.getElementById('riskFilter');
    if (riskFilter) riskFilter.addEventListener('change', filterTable);
    const statutFilter = document.getElementById('statutFilter');
    if (statutFilter) statutFilter.addEventListener('change', filterTable);
}

function filterTable() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const riskFilter = document.getElementById('riskFilter')?.value || '';
    const statutFilter = document.getElementById('statutFilter')?.value || '';
    
    const rows = document.querySelectorAll('#tableBody tr, #facturesTableBody tr, #budgetTableBody tr');
    rows.forEach(row => {
        let show = true;
        if (searchTerm && !row.innerText.toLowerCase().includes(searchTerm)) show = false;
        if (riskFilter && riskFilter !== 'all') {
            const badge = row.querySelector('.badge');
            if (badge && !badge.innerText.toLowerCase().includes(riskFilter)) show = false;
        }
        if (statutFilter && statutFilter !== 'all') {
            const badge = row.querySelector('.badge');
            if (badge && !badge.innerText.toLowerCase().includes(statutFilter)) show = false;
        }
        row.style.display = show ? '' : 'none';
    });
}

function initHypotheses() {
    const container = document.getElementById('hypothesesPanel');
    if (container) {
        container.innerHTML = `
            <div class="data-card">
                <div class="card-title">Parametres modifiables</div>
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px">
                    <div><label>Prix client SalesX (MAD/an)</label><input type="number" id="prixClient" value="${APP_DATA.hypotheses.prixClientSalesX}" class="filter-input" style="width:100%"></div>
                    <div><label>Charges fixes SalesX (MAD)</label><input type="number" id="chargesFixes" value="${APP_DATA.hypotheses.chargesFixesSalesX}" class="filter-input" style="width:100%"></div>
                    <div><label>Budget marketing (MAD)</label><input type="number" id="budgetMarketing" value="${APP_DATA.hypotheses.budgetMarketingSalesX}" class="filter-input" style="width:100%"></div>
                </div>
                <button class="btn btn-primary" style="margin-top:16px" onclick="updateHypotheses()">Appliquer</button>
            </div>
        `;
    }
}

function updateHypotheses() {
    APP_DATA.hypotheses.prixClientSalesX = parseInt(document.getElementById('prixClient')?.value) || 10000;
    APP_DATA.hypotheses.chargesFixesSalesX = parseInt(document.getElementById('chargesFixes')?.value) || 100000;
    APP_DATA.hypotheses.budgetMarketingSalesX = parseInt(document.getElementById('budgetMarketing')?.value) || 60000;
    updateScenarios();
    showNotification("Parametres mis a jour");
}

function updateScenarios() {
    const container = document.getElementById('scenariosGrid');
    if (!container) return;
    
    const prix = APP_DATA.hypotheses.prixClientSalesX;
    const charges = APP_DATA.hypotheses.chargesFixesSalesX;
    const marketing = APP_DATA.hypotheses.budgetMarketingSalesX;
    const seuil = Math.ceil(charges / prix);
    
    const scenarios = [
        { nom: "Prudent", clients: 5, ca: 5 * prix, cac: marketing / 5, marge: 5 * prix - charges },
        { nom: "Realiste", clients: 20, ca: 20 * prix, cac: marketing / 20, marge: 20 * prix - charges },
        { nom: "Ambitieux", clients: 40, ca: 40 * prix, cac: marketing / 40, marge: 40 * prix - charges },
        { nom: "Optimiste", clients: 80, ca: 80 * prix, cac: marketing / 80, marge: 80 * prix - charges }
    ];
    
    container.innerHTML = `
        <div style="background:#e2e8f0; padding:12px; border-radius:8px; margin-bottom:16px">
            Seuil de rentabilite : ${seuil} clients necessaires
        </div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px">
            ${scenarios.map(s => `
                <div style="background:#f7fafc; padding:15px; border-radius:12px; border:1px solid #e2e8f0">
                    <div style="font-weight:600; margin-bottom:8px">${s.nom}</div>
                    <div style="font-size:20px; font-weight:700; color:#0f3b5c">${s.clients} clients</div>
                    <div style="font-size:11px; color:#718096; margin:8px 0">CA: ${s.ca.toLocaleString()} MAD</div>
                    <div style="font-size:11px; color:#718096">CAC: ${Math.round(s.cac).toLocaleString()} MAD</div>
                    <div style="margin-top:8px; font-size:12px">Marge: ${s.marge.toLocaleString()} MAD</div>
                    <div style="margin-top:8px"><span class="badge ${s.marge > 0 ? 'badge-paid' : 'badge-unpaid'}">${s.marge > 0 ? 'Rentable' : 'Non rentable'}</span></div>
                </div>
            `).join('')}
        </div>
    `;
}

// ============================================================
// IMPORT/EXPORT
// ============================================================

function exportToCSV(data, filename, headers) {
    let csvRows = [headers.join(',')];
    for (const row of data) {
        const values = headers.map(header => {
            const val = row[header] !== undefined ? row[header] : '';
            return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
    }
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Export CSV termine");
}

function exportAllToJSON() {
    const allData = {
        obligations: APP_DATA.obligations,
        salesxBudget: APP_DATA.salesxBudget,
        noraFactures: APP_DATA.noraFactures,
        hypotheses: APP_DATA.hypotheses
    };
    const jsonStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intelead_complete_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Export JSON complet termine");
}

function importFromFile(file, type) {
    if (!file) return;
    const extension = file.name.split('.').pop().toLowerCase();
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let imported;
            if (extension === 'csv') {
                const text = e.target.result;
                const rows = text.split('\n');
                const headers = rows[0].split(',').map(h => h.replace(/"/g, '').trim());
                const data = [];
                for (let i = 1; i < rows.length; i++) {
                    if (rows[i].trim()) {
                        const values = rows[i].split(',').map(v => v.replace(/"/g, '').trim());
                        const row = {};
                        headers.forEach((h, idx) => { row[h] = values[idx]; });
                        data.push(row);
                    }
                }
                imported = data;
            } else {
                imported = JSON.parse(e.target.result);
                if (imported.obligations && type === 'obligation') imported = imported.obligations;
                if (imported.salesxBudget && type === 'salesx') imported = imported.salesxBudget;
                if (imported.noraFactures && type === 'nora') imported = imported.noraFactures;
            }
            
            if (type === 'obligation') {
                const newItems = imported.map((item, idx) => ({
                    id: Math.max(...APP_DATA.obligations.map(o => o.id), 0) + idx + 1,
                    obligation: item.obligation || item.Obligation || 'Nouvelle obligation',
                    entite: item.entite || 'Groupe',
                    type: item.type || 'Autre',
                    statut: item.statut || 'Non declare',
                    echeance: item.echeance || new Date().toISOString().split('T')[0],
                    risque: (item.risque || 'medium').toLowerCase(),
                    horizon: '30j'
                }));
                APP_DATA.obligations = APP_DATA.obligations.concat(newItems);
            }
            else if (type === 'salesx') {
                const newItems = imported.map((item, idx) => ({
                    id: Math.max(...APP_DATA.salesxBudget.map(b => b.id), 0) + idx + 1,
                    categorie: item.categorie || 'Autre',
                    poste: item.poste || 'Nouveau poste',
                    budget: parseFloat(item.budget || 0),
                    realise: parseFloat(item.realise || 0)
                }));
                APP_DATA.salesxBudget = APP_DATA.salesxBudget.concat(newItems);
            }
            else if (type === 'nora') {
                const newItems = imported.map((item, idx) => ({
                    id: Math.max(...APP_DATA.noraFactures.map(f => f.id), 0) + idx + 1,
                    client: item.client || 'Nouveau client',
                    secteur: item.secteur || 'Autre',
                    caHt: parseFloat(item.caHt || 0),
                    encaisse: parseFloat(item.encaisse || 0),
                    statut: parseFloat(item.encaisse || 0) >= parseFloat(item.caHt || 0) ? 'paye' : 'impaye',
                    date: new Date().toISOString().split('T')[0]
                }));
                APP_DATA.noraFactures = APP_DATA.noraFactures.concat(newItems);
            }
            updateKPIs();
            loadCurrentPage();
            showNotification(`Import termine: ${imported.length} elements`);
        } catch(err) {
            showNotification("Erreur lors de l'import");
        }
    };
    reader.readAsText(file);
}

function exportModuleCSV(type) {
    if (type === 'obligation') exportToCSV(APP_DATA.obligations, 'obligations', ['obligation','entite','type','statut','echeance','risque']);
    if (type === 'salesx') exportToCSV(APP_DATA.salesxBudget, 'salesx_budget', ['categorie','poste','budget','realise']);
    if (type === 'nora') exportToCSV(APP_DATA.noraFactures, 'nora_factures', ['client','secteur','caHt','encaisse','statut','date']);
}

// CRUD Operations
function addObligation() {
    const obligation = document.getElementById('newObligation')?.value;
    if (!obligation) { showNotification("Veuillez remplir le nom"); return; }
    const newId = Math.max(...APP_DATA.obligations.map(o => o.id), 0) + 1;
    APP_DATA.obligations.push({
        id: newId,
        obligation: obligation,
        entite: document.getElementById('newEntite')?.value || "Groupe",
        type: document.getElementById('newType')?.value || "Autre",
        statut: "Non declare",
        echeance: new Date().toISOString().split('T')[0],
        risque: document.getElementById('newRisque')?.value || "medium",
        horizon: "30j"
    });
    closeModal('addModal');
    updateKPIs();
    loadCurrentPage();
    showNotification("Obligation ajoutee");
}

function addFacture() {
    const client = document.getElementById('newClient')?.value;
    const ca = parseFloat(document.getElementById('newCa')?.value);
    if (!client || !ca) { showNotification("Veuillez remplir les champs"); return; }
    const newId = Math.max(...APP_DATA.noraFactures.map(f => f.id), 0) + 1;
    APP_DATA.noraFactures.push({
        id: newId,
        client: client,
        secteur: "Autre",
        caHt: ca,
        encaisse: 0,
        statut: "impaye",
        date: new Date().toISOString().split('T')[0]
    });
    closeModal('addModal');
    updateKPIs();
    loadCurrentPage();
    showNotification("Facture ajoutee");
}

function addBudget() {
    const poste = document.getElementById('newPoste')?.value;
    const budget = parseFloat(document.getElementById('newBudget')?.value);
    if (!poste || !budget) { showNotification("Veuillez remplir les champs"); return; }
    const newId = Math.max(...APP_DATA.salesxBudget.map(b => b.id), 0) + 1;
    APP_DATA.salesxBudget.push({
        id: newId,
        categorie: "Autre",
        poste: poste,
        budget: budget,
        realise: 0
    });
    closeModal('addModal');
    updateKPIs();
    loadCurrentPage();
    showNotification("Poste budget ajoute");
}

function deleteItem(id, type) {
    if (!confirm("Supprimer cet element ?")) return;
    if (type === 'obligation') APP_DATA.obligations = APP_DATA.obligations.filter(o => o.id !== id);
    if (type === 'facture') APP_DATA.noraFactures = APP_DATA.noraFactures.filter(f => f.id !== id);
    if (type === 'budget') APP_DATA.salesxBudget = APP_DATA.salesxBudget.filter(b => b.id !== id);
    updateKPIs();
    loadCurrentPage();
    showNotification("Element supprime");
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `position:fixed; bottom:20px; right:20px; background:#2b6cb0; color:white; padding:12px 20px; border-radius:8px; font-size:13px; z-index:2000`;
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

function loadCurrentPage() {
    const path = window.location.pathname.split('/').pop();
    if (path === 'dashboard.html' || path === '') loadDashboard();
    else if (path === 'regul.html') loadRegul();
    else if (path === 'salesx.html') loadSalesX();
    else if (path === 'nora.html') loadNora();
    else if (path === 'tresorerie.html') loadTresorerie();
}

function loadDashboard() {
    const kpis = APP_DATA.kpis;
    document.getElementById('kpiGrid').innerHTML = `
        <div class="kpi-card"><div class="kpi-value">${kpis.encaissementsTotal.toLocaleString()} MAD</div><div class="kpi-label">Encaissements totaux</div></div>
        <div class="kpi-card"><div class="kpi-value">${kpis.depensesTotal.toLocaleString()} MAD</div><div class="kpi-label">Depenses totales</div></div>
        <div class="kpi-card"><div class="kpi-value">${kpis.netTresorerie.toLocaleString()} MAD</div><div class="kpi-label">Tresorerie nette</div></div>
        <div class="kpi-card"><div class="kpi-value">${kpis.budgetSalesX.toLocaleString()} MAD</div><div class="kpi-label">Budget SalesX</div></div>
    `;
    
    const nbCritical = APP_DATA.obligations.filter(o => o.risque === 'critical').length;
    const resteNora = APP_DATA.kpis.resteNora;
    document.getElementById('alertsContainer').innerHTML = `
        ${nbCritical > 0 ? `<div class="alert alert-danger">${nbCritical} obligations a risque critique - Action requise</div>` : ''}
        ${resteNora > 50000 ? `<div class="alert alert-warning">${resteNora.toLocaleString()} MAD de factures non encaissees</div>` : ''}
        <div class="alert alert-info">Pricing SalesX: 5000-54000 MAD/an - A clarifier</div>
    `;
    
    const ctxDep = document.getElementById('depensesChart')?.getContext('2d');
    if (ctxDep && myCharts.depenses) myCharts.depenses.destroy();
    if (ctxDep) {
        myCharts.depenses = new Chart(ctxDep, {
            type: 'doughnut',
            data: { labels: APP_DATA.depensesCategories.map(c => c.categorie), datasets: [{ data: APP_DATA.depensesCategories.map(c => c.montant), backgroundColor: ['#2b6cb0', '#48bb78', '#ed8936', '#e53e3e', '#805ad5', '#d69e2e', '#319795', '#a0aec0'], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } } }
        });
    }
    
    document.getElementById('topClientsBody').innerHTML = APP_DATA.topClients.map(c => `
        <tr><td><strong>${c.client}</strong></td><td>${c.montant2024.toLocaleString()} MAD</td><td>${c.montant2025.toLocaleString()} MAD</td><td>${c.total.toLocaleString()} MAD</td></tr>
    `).join('');
}

function loadRegul() {
    document.getElementById('kpiGrid').innerHTML = `
        <div class="kpi-card"><div class="kpi-value">${APP_DATA.obligations.length}</div><div class="kpi-label">Total obligations</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#dc2626">${APP_DATA.obligations.filter(o => o.risque === 'critical').length}</div><div class="kpi-label">Risque critique</div></div>
        <div class="kpi-card"><div class="kpi-value">${APP_DATA.obligations.filter(o => o.horizon === '30j').length}</div><div class="kpi-label">Echeance 30 jours</div></div>
    `;
    document.getElementById('tableBody').innerHTML = APP_DATA.obligations.map(o => `
        <tr>
            <td>${o.obligation}</td><td>${o.entite}</td><td>${o.type}</td><td>${o.statut}</td><td>${o.echeance}</td>
            <td><span class="badge badge-${o.risque === 'critical' ? 'critical' : (o.risque === 'high' ? 'high' : 'medium')}">${o.risque === 'critical' ? 'CRITIQUE' : (o.risque === 'high' ? 'ELEVE' : 'MOYEN')}</span></td>
            <td>${o.horizon}</td>
            <td class="actions-cell">
                <button class="btn-edit" onclick="openModal('editModal', ${JSON.stringify(o).replace(/"/g, '&quot;')}, 'obligation')">Modifier</button>
                <button class="btn-delete" onclick="deleteItem(${o.id}, 'obligation')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function loadSalesX() {
    const totalBudget = APP_DATA.salesxBudget.reduce((s,i)=>s+i.budget,0);
    const totalRealise = APP_DATA.salesxBudget.reduce((s,i)=>s+i.realise,0);
    document.getElementById('kpiGrid').innerHTML = `
        <div class="kpi-card"><div class="kpi-value">${totalBudget.toLocaleString()} MAD</div><div class="kpi-label">Budget total</div></div>
        <div class="kpi-card"><div class="kpi-value">${totalRealise.toLocaleString()} MAD</div><div class="kpi-label">Realise</div></div>
        <div class="kpi-card"><div class="kpi-value">${APP_DATA.kpis.subventionSalesX.toLocaleString()} MAD</div><div class="kpi-label">Subvention</div></div>
    `;
    document.getElementById('budgetTableBody').innerHTML = APP_DATA.salesxBudget.map(b => `
        <tr>
            <td>${b.categorie}</td>
            <td>${b.poste}</td>
            <td>${b.budget.toLocaleString()} MAD</td>
            <td>${b.realise.toLocaleString()} MAD</td>
            <td>${((b.realise/b.budget)*100).toFixed(1)}%</td>
            <td class="actions-cell">
                <button class="btn-edit" onclick="openModal('editModal', ${JSON.stringify(b).replace(/"/g, '&quot;')}, 'budget')">Modifier</button>
                <button class="btn-delete" onclick="deleteItem(${b.id}, 'budget')">Supprimer</button>
            </td>
        </tr>
    `).join('');
    updateScenarios();
}

function loadNora() {
    const caTotal = APP_DATA.noraFactures.reduce((s,i)=>s+i.caHt,0);
    const encaisseTotal = APP_DATA.noraFactures.reduce((s,i)=>s+i.encaisse,0);
    document.getElementById('kpiGrid').innerHTML = `
        <div class="kpi-card"><div class="kpi-value">${caTotal.toLocaleString()} MAD</div><div class="kpi-label">CA total HT</div></div>
        <div class="kpi-card"><div class="kpi-value">${encaisseTotal.toLocaleString()} MAD</div><div class="kpi-label">Encaissé</div><div class="kpi-trend">${((encaisseTotal/caTotal)*100).toFixed(0)}%</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#dc2626">${(caTotal-encaisseTotal).toLocaleString()} MAD</div><div class="kpi-label">Reste a encaisser</div></div>
    `;
    document.getElementById('facturesTableBody').innerHTML = APP_DATA.noraFactures.map(f => `
        <tr>
            <td>${f.client}</td>
            <td>${f.secteur}</td>
            <td>${f.caHt.toLocaleString()} MAD</td>
            <td>${f.encaisse.toLocaleString()} MAD</td>
            <td>${(f.caHt-f.encaisse).toLocaleString()} MAD</td>
            <td><span class="badge ${f.statut === 'paye' ? 'badge-paid' : 'badge-unpaid'}">${f.statut === 'paye' ? 'PAYE' : 'IMPAYE'}</span></td>
            <td>${f.date}</td>
            <td class="actions-cell">
                <button class="btn-edit" onclick="openModal('editModal', ${JSON.stringify(f).replace(/"/g, '&quot;')}, 'facture')">Modifier</button>
                <button class="btn-delete" onclick="deleteItem(${f.id}, 'facture')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function loadTresorerie() {
    const kpis = APP_DATA.kpis;
    document.getElementById('kpiGrid').innerHTML = `
        <div class="kpi-card"><div class="kpi-value">${kpis.encaissementsTotal.toLocaleString()} MAD</div><div class="kpi-label">Encaissements totaux</div></div>
        <div class="kpi-card"><div class="kpi-value">${kpis.depensesTotal.toLocaleString()} MAD</div><div class="kpi-label">Depenses totales</div></div>
        <div class="kpi-card"><div class="kpi-value">${kpis.netTresorerie.toLocaleString()} MAD</div><div class="kpi-label">Resultat net</div></div>
    `;
    
    document.getElementById('tresorerieTableBody').innerHTML = APP_DATA.tresorerieMensuelle.map(t => `
        <tr>
            <td>${t.mois}</td>
            <td>${t.encaissements.toLocaleString()} MAD</td>
            <td>${t.depenses.toLocaleString()} MAD</td>
            <td class="${t.encaissements - t.depenses >= 0 ? 'trend-up' : 'trend-down'}">${(t.encaissements - t.depenses).toLocaleString()} MAD</td>
        </tr>
    `).join('');
    
    const ctxDep = document.getElementById('depensesChart')?.getContext('2d');
    if (ctxDep && myCharts.depenses2) myCharts.depenses2.destroy();
    if (ctxDep) {
        myCharts.depenses2 = new Chart(ctxDep, {
            type: 'doughnut',
            data: { labels: APP_DATA.depensesCategories.map(c => c.categorie), datasets: [{ data: APP_DATA.depensesCategories.map(c => c.montant), backgroundColor: ['#2b6cb0', '#48bb78', '#ed8936', '#e53e3e', '#805ad5', '#d69e2e', '#319795', '#a0aec0'], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    const ctxEvol = document.getElementById('evolutionChart')?.getContext('2d');
    if (ctxEvol && myCharts.evolution) myCharts.evolution.destroy();
    if (ctxEvol) {
        myCharts.evolution = new Chart(ctxEvol, {
            type: 'line',
            data: { labels: APP_DATA.tresorerieMensuelle.map(t => t.mois), datasets: [{ label: 'Encaissements', data: APP_DATA.tresorerieMensuelle.map(t => t.encaissements), borderColor: '#10b981', fill: true }, { label: 'Depenses', data: APP_DATA.tresorerieMensuelle.map(t => t.depenses), borderColor: '#ef4444', fill: true }] },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
}