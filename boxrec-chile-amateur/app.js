// ============================
// BOXREC CHILE AMATEUR - app.js
// ============================

const CATS_M = ['48kg','51kg','54kg','57kg','60kg','63.5kg','67kg','71kg','75kg','80kg','86kg','92kg','+92kg'];
const CATS_F = ['48kg','50kg','52kg','54kg','57kg','60kg','63kg','66kg','70kg','75kg','81kg','+81kg'];
const ROLES = { SUPER_ADMIN:'Super Administrador', FISCALIZADOR:'Fiscalizador', ADMIN_ASOCIACION:'Admin Asociación' };

// ── SEED DATA ──────────────────────────────────────────────────────────────────
function seedData() {
  if (localStorage.getItem('brc_seeded')) return;

  const asocs = [
    { id:'a1', nombre:'Asociación de Boxeo Amateur Metropolitana', region:'Región Metropolitana', presidente:'Carlos Fuentes Vega', direccion:'Av. Libertador Bernardo O\'Higgins 1234, Santiago', telefono:'+56 2 2345 6789', activa:true },
    { id:'a2', nombre:'Asociación de Boxeo Amateur Valparaíso', region:'Valparaíso', presidente:'Roberto Díaz Morales', direccion:'Av. Brasil 567, Valparaíso', telefono:'+56 32 234 5678', activa:true },
    { id:'a3', nombre:'Asociación de Boxeo Amateur Biobío', region:'Biobío', presidente:'Luis Sanhueza Rojas', direccion:'Calle Freire 890, Concepción', telefono:'+56 41 234 5678', activa:true },
    { id:'a4', nombre:'Asociación de Boxeo Amateur Coquimbo', region:'Coquimbo', presidente:'Ana Contreras Soto', direccion:'Av. El Santo 234, La Serena', telefono:'+56 51 234 5678', activa:true },
  ];

  const users = [
    { id:'u0', nombre:'Carlos Muñoz Ortiz', email:'superadmin@boxrecchile.cl', password:'Super2024!', rol:'SUPER_ADMIN', asociacion:null, cargo:'Super Administrador FEBOXCHI', activo:true, ultimoAcceso:null },
    { id:'u1', nombre:'Patricia Vera Lagos', email:'fiscalizador@boxrecchile.cl', password:'Fiscal2024!', rol:'FISCALIZADOR', asociacion:null, cargo:'Fiscalizadora Nacional', activo:true, ultimoAcceso:null },
    { id:'u2', nombre:'Carlos Fuentes Vega', email:'stgo@boxrecchile.cl', password:'Stgo2024!', rol:'ADMIN_ASOCIACION', asociacion:'a1', cargo:'Presidente Asociación Metropolitana', activo:true, ultimoAcceso:null },
    { id:'u3', nombre:'Roberto Díaz Morales', email:'valpo@boxrecchile.cl', password:'Valpo2024!', rol:'ADMIN_ASOCIACION', asociacion:'a2', cargo:'Presidente Asociación Valparaíso', activo:true, ultimoAcceso:null },
    { id:'u4', nombre:'Luis Sanhueza Rojas', email:'biobio@boxrecchile.cl', password:'Biobio2024!', rol:'ADMIN_ASOCIACION', asociacion:'a3', cargo:'Presidente Asociación Biobío', activo:true, ultimoAcceso:null },
  ];

  const boxeadores = [
    { id:'b1', nombre:'Marco Antonio Farías', rut:'15.234.567-8', nacimiento:'2001-03-15', genero:'M', categoria:'60kg', asociacion:'a1', region:'Región Metropolitana', gimnasio:'Club Box Santiago Centro', victorias:8, empates:1, derrotas:2, status:'APROBADO', uploadedBy:'u2', uploadedAt:'2024-11-10T10:00:00Z', approvedBy:'u1', approvedAt:'2024-11-11T09:00:00Z', rechazoRazon:null },
    { id:'b2', nombre:'Diego Hernández Pino', rut:'16.123.456-7', nacimiento:'2002-07-22', genero:'M', categoria:'67kg', asociacion:'a1', region:'Región Metropolitana', gimnasio:'Gimnasio Las Américas', victorias:5, empates:0, derrotas:3, status:'APROBADO', uploadedBy:'u2', uploadedAt:'2024-11-12T11:00:00Z', approvedBy:'u1', approvedAt:'2024-11-13T10:00:00Z', rechazoRazon:null },
    { id:'b3', nombre:'Sebastián Castro Molina', rut:'17.345.678-9', nacimiento:'2003-01-08', genero:'M', categoria:'54kg', asociacion:'a2', region:'Valparaíso', gimnasio:'Club Boxeo Cerro Alegre', victorias:12, empates:0, derrotas:1, status:'APROBADO', uploadedBy:'u3', uploadedAt:'2024-10-20T14:00:00Z', approvedBy:'u1', approvedAt:'2024-10-21T09:00:00Z', rechazoRazon:null },
    { id:'b4', nombre:'Francisco Muñoz Torres', rut:'14.456.789-0', nacimiento:'2000-05-30', genero:'M', categoria:'75kg', asociacion:'a3', region:'Biobío', gimnasio:'Escuela de Boxeo Concepción', victorias:7, empates:2, derrotas:4, status:'APROBADO', uploadedBy:'u4', uploadedAt:'2024-11-01T09:00:00Z', approvedBy:'u1', approvedAt:'2024-11-02T10:00:00Z', rechazoRazon:null },
    { id:'b5', nombre:'Camila Rodríguez Vega', rut:'18.234.567-K', nacimiento:'2004-09-12', genero:'F', categoria:'57kg', asociacion:'a1', region:'Región Metropolitana', gimnasio:'Club Box Femenino Santiago', victorias:6, empates:1, derrotas:0, status:'APROBADO', uploadedBy:'u2', uploadedAt:'2024-11-15T10:00:00Z', approvedBy:'u1', approvedAt:'2024-11-16T09:00:00Z', rechazoRazon:null },
    { id:'b6', nombre:'Alejandro Soto Reyes', rut:'19.123.456-3', nacimiento:'2005-02-28', genero:'M', categoria:'51kg', asociacion:'a2', region:'Valparaíso', gimnasio:'Boxing Club Viña del Mar', victorias:3, empates:0, derrotas:1, status:'PENDIENTE', uploadedBy:'u3', uploadedAt:'2025-01-05T10:00:00Z', approvedBy:null, approvedAt:null, rechazoRazon:null },
    { id:'b7', nombre:'Valentina López Arce', rut:'18.567.890-1', nacimiento:'2003-11-14', genero:'F', categoria:'60kg', asociacion:'a3', region:'Biobío', gimnasio:'Club Pugilístico Sur', victorias:4, empates:0, derrotas:2, status:'PENDIENTE', uploadedBy:'u4', uploadedAt:'2025-01-06T11:00:00Z', approvedBy:null, approvedAt:null, rechazoRazon:null },
    { id:'b8', nombre:'Rodrigo Pérez Álvarez', rut:'15.789.012-2', nacimiento:'2001-08-03', genero:'M', categoria:'67kg', asociacion:'a1', region:'Región Metropolitana', gimnasio:'Team Box Pro', victorias:0, empates:0, derrotas:0, status:'RECHAZADO', uploadedBy:'u2', uploadedAt:'2024-12-10T10:00:00Z', approvedBy:null, approvedAt:null, rechazoRazon:'Documentos de identidad ilegibles. Favor resubir RUT con foto nítida.' },
  ];

  const eventos = [
    { id:'e1', nombre:'Campeonato Regional Metropolitano 2024', fecha:'2024-11-20', tipo:'Campeonato Regional', ciudad:'Santiago', recinto:'Estadio Víctor Jara', asociacion:'a1', descripcion:'Primer campeonato regional del año', status:'APROBADO', uploadedBy:'u2', uploadedAt:'2024-11-01T10:00:00Z', approvedBy:'u1', approvedAt:'2024-11-02T09:00:00Z' },
    { id:'e2', nombre:'Copa Cerro Alegre 2024', fecha:'2024-10-15', tipo:'Copa Interclubes', ciudad:'Valparaíso', recinto:'Gimnasio Municipal Valparaíso', asociacion:'a2', descripcion:'Copa tradicional del club', status:'APROBADO', uploadedBy:'u3', uploadedAt:'2024-09-20T14:00:00Z', approvedBy:'u1', approvedAt:'2024-09-21T10:00:00Z' },
    { id:'e3', nombre:'Torneo Clasificatorio Olímpico Zona Sur 2025', fecha:'2025-03-15', tipo:'Selectivo Olímpico', ciudad:'Concepción', recinto:'Palacio de los Deportes Concepción', asociacion:'a3', descripcion:'Clasificatorio para selección nacional', status:'PENDIENTE', uploadedBy:'u4', uploadedAt:'2025-01-07T09:00:00Z', approvedBy:null, approvedAt:null },
  ];

  const peleas = [
    { id:'p1', evento:'e1', rojo:'b1', azul:'b2', categoria:'67kg', rounds:'3', ganador:'ROJO', metodo:'Decisión Unánime', status:'APROBADO', uploadedBy:'u2', uploadedAt:'2024-11-21T10:00:00Z', approvedBy:'u1', approvedAt:'2024-11-22T09:00:00Z' },
    { id:'p2', evento:'e2', rojo:'b3', azul:'b4', categoria:'60kg', rounds:'3', ganador:'ROJO', metodo:'KO Técnico (TKO)', status:'APROBADO', uploadedBy:'u3', uploadedAt:'2024-10-16T11:00:00Z', approvedBy:'u1', approvedAt:'2024-10-17T09:00:00Z' },
    { id:'p3', evento:'e1', rojo:'b4', azul:'b1', categoria:'60kg', rounds:'3', ganador:'AZUL', metodo:'Decisión Dividida', status:'PENDIENTE', uploadedBy:'u2', uploadedAt:'2025-01-08T10:00:00Z', approvedBy:null, approvedAt:null },
  ];

  const audit = [
    { id:'audit1', userId:'u2', action:'create', entity:'boxeador', entityId:'b1', desc:'Registró boxeador Marco Antonio Farías', ts:'2024-11-10T10:00:00Z' },
    { id:'audit2', userId:'u1', action:'approve', entity:'boxeador', entityId:'b1', desc:'Aprobó registro de Marco Antonio Farías', ts:'2024-11-11T09:00:00Z' },
    { id:'audit3', userId:'u3', action:'create', entity:'boxeador', entityId:'b3', desc:'Registró boxeador Sebastián Castro Molina', ts:'2024-10-20T14:00:00Z' },
    { id:'audit4', userId:'u1', action:'approve', entity:'boxeador', entityId:'b3', desc:'Aprobó registro de Sebastián Castro Molina', ts:'2024-10-21T09:00:00Z' },
    { id:'audit5', userId:'u2', action:'create', entity:'evento', entityId:'e1', desc:'Creó evento Campeonato Regional Metropolitano 2024', ts:'2024-11-01T10:00:00Z' },
    { id:'audit6', userId:'u1', action:'approve', entity:'evento', entityId:'e1', desc:'Aprobó evento Campeonato Regional Metropolitano 2024', ts:'2024-11-02T09:00:00Z' },
    { id:'audit7', userId:'u1', action:'reject', entity:'boxeador', entityId:'b8', desc:'Rechazó registro de Rodrigo Pérez Álvarez: Documentos ilegibles', ts:'2024-12-11T10:00:00Z' },
    { id:'audit8', userId:'u4', action:'create', entity:'boxeador', entityId:'b7', desc:'Registró boxeadora Valentina López Arce', ts:'2025-01-06T11:00:00Z' },
    { id:'audit9', userId:'u3', action:'create', entity:'boxeador', entityId:'b6', desc:'Registró boxeador Alejandro Soto Reyes', ts:'2025-01-05T10:00:00Z' },
    { id:'audit10', userId:'u4', action:'create', entity:'evento', entityId:'e3', desc:'Creó evento Torneo Clasificatorio Olímpico Zona Sur 2025', ts:'2025-01-07T09:00:00Z' },
  ];

  save('asocs', asocs);
  save('users', users);
  save('boxeadores', boxeadores);
  save('eventos', eventos);
  save('peleas', peleas);
  save('audit', audit);
  localStorage.setItem('brc_seeded', '1');
}

// ── STORAGE ────────────────────────────────────────────────────────────────────
function save(key, data) { localStorage.setItem('brc_' + key, JSON.stringify(data)); }
function load(key) { try { return JSON.parse(localStorage.getItem('brc_' + key)) || []; } catch(e) { return []; } }

// ── AUTH ───────────────────────────────────────────────────────────────────────
let currentUser = null;

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const users = load('users');
  const user = users.find(u => u.email === email && u.password === pass && u.activo);
  if (!user) {
    document.getElementById('login-error').style.display = 'block';
    return;
  }
  document.getElementById('login-error').style.display = 'none';
  // update last access
  user.ultimoAcceso = new Date().toISOString();
  save('users', users);
  currentUser = user;
  addAudit('login', 'sistema', null, `Inició sesión en el sistema`);
  initApp();
}

function doLogout() {
  addAudit('login', 'sistema', null, `Cerró sesión del sistema`);
  currentUser = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
}

function initApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  // topbar
  const initials = currentUser.nombre.split(' ').slice(0,2).map(w=>w[0]).join('');
  document.getElementById('top-avatar').textContent = initials;
  document.getElementById('top-name').textContent = currentUser.nombre;
  document.getElementById('top-role').textContent = ROLES[currentUser.rol];

  // sidebar visibility
  const isSuperAdmin = currentUser.rol === 'SUPER_ADMIN';
  const isFiscal = currentUser.rol === 'FISCALIZADOR';
  const isAdmin = currentUser.rol === 'ADMIN_ASOCIACION';

  document.getElementById('nav-asociaciones').style.display = isSuperAdmin ? 'flex' : 'none';
  document.getElementById('nav-usuarios').style.display = isSuperAdmin ? 'flex' : 'none';
  document.getElementById('nav-pendientes').style.display = (isSuperAdmin || isFiscal) ? 'flex' : 'none';
  document.getElementById('nav-auditoria').style.display = (isSuperAdmin || isFiscal) ? 'flex' : 'none';

  // hide add buttons for non-admins viewing read-only
  const canAdd = isSuperAdmin || isAdmin;
  ['btn-add-boxeador','btn-add-evento','btn-add-pelea'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = canAdd ? '' : 'none';
  });

  populateSelects();
  showPage('dashboard');
  updatePendingCount();
}

// ── AUDIT LOG ──────────────────────────────────────────────────────────────────
function addAudit(action, entity, entityId, desc) {
  if (!currentUser) return;
  const log = load('audit');
  log.unshift({
    id: 'audit_' + Date.now(),
    userId: currentUser.id,
    action, entity, entityId,
    desc,
    ts: new Date().toISOString()
  });
  save('audit', log);
}

// ── NAVIGATION ─────────────────────────────────────────────────────────────────
let currentPendingTab = 'boxeadores';

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

  const renders = {
    dashboard: renderDashboard,
    boxeadores: renderBoxeadores,
    eventos: renderEventos,
    peleas: renderPeleas,
    rankings: renderRankings,
    pendientes: renderPendientes,
    auditoria: renderAudit,
    asociaciones: renderAsociaciones,
    usuarios: renderUsuarios,
  };
  if (renders[page]) renders[page]();
}

function switchTab(page, tab) {
  currentPendingTab = tab;
  document.querySelectorAll(`#page-${page} .tab`).forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  ['boxeadores','eventos','peleas'].forEach(t => {
    document.getElementById(`pending-${t}-list`).style.display = t === tab ? 'block' : 'none';
  });
  renderPendientes();
}

// ── SELECTS POPULATE ───────────────────────────────────────────────────────────
function populateSelects() {
  const asocs = load('asocs');
  const users = load('users');

  // filter asocs for current admin
  const myAsocs = currentUser.rol === 'ADMIN_ASOCIACION'
    ? asocs.filter(a => a.id === currentUser.asociacion)
    : asocs;

  // boxeador form
  updateCategoriasModal();
  fillSelect('b-asociacion', myAsocs, 'id', 'nombre');

  // evento form
  fillSelect('e-asociacion', myAsocs, 'id', 'nombre');

  // pelea form - eventos aprobados
  const evAprobados = load('eventos').filter(e => e.status === 'APROBADO');
  fillSelect('p-evento', evAprobados, 'id', 'nombre');

  // pelea boxeadores
  const boxAprobados = load('boxeadores').filter(b => b.status === 'APROBADO');
  fillSelect('p-rojo', boxAprobados, 'id', 'nombre');
  fillSelect('p-azul', boxAprobados, 'id', 'nombre');
  updateCategoriasModal('p-categoria', 'M', true);

  // usuario form
  fillSelect('u-asociacion', asocs, 'id', 'nombre');

  // filters
  const allCats = [...new Set([...CATS_M, ...CATS_F])].sort();
  const filterCat = document.getElementById('filter-cat-box');
  if (filterCat) allCats.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; filterCat.appendChild(o); });

  // ranking cats
  const rankCat = document.getElementById('ranking-cat');
  if (rankCat) { rankCat.innerHTML = '<option value="">Todas las categorías</option>'; allCats.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; rankCat.appendChild(o); }); }
}

function fillSelect(id, items, val, label) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  items.forEach(item => {
    const o = document.createElement('option');
    o.value = item[val];
    o.textContent = item[label];
    el.appendChild(o);
  });
}

function updateCategoriasModal(targetId, genero, all) {
  const gen = genero || document.getElementById('b-genero')?.value || 'M';
  const cats = gen === 'F' ? CATS_F : CATS_M;
  const selId = targetId || 'b-categoria';
  const el = document.getElementById(selId);
  if (!el) return;
  el.innerHTML = '';
  if (all) { [...CATS_M, ...CATS_F].filter((v,i,a)=>a.indexOf(v)===i).sort().forEach(c => { const o=document.createElement('option'); o.value=c; o.textContent=c; el.appendChild(o); }); return; }
  cats.forEach(c => { const o=document.createElement('option'); o.value=c; o.textContent=c; el.appendChild(o); });
}

function toggleAsocField() {
  const rol = document.getElementById('u-rol').value;
  document.getElementById('u-asoc-group').style.display = rol === 'ADMIN_ASOCIACION' ? 'block' : 'none';
}

// ── DASHBOARD ──────────────────────────────────────────────────────────────────
function renderDashboard() {
  const boxeadores = load('boxeadores');
  const eventos = load('eventos');
  const peleas = load('peleas');
  const asocs = load('asocs');
  const users = load('users');
  const audit = load('audit');

  const aprobados = boxeadores.filter(b=>b.status==='APROBADO').length;
  const pendientes = boxeadores.filter(b=>b.status==='PENDIENTE').length + eventos.filter(e=>e.status==='PENDIENTE').length + peleas.filter(p=>p.status==='PENDIENTE').length;
  const evAprobados = eventos.filter(e=>e.status==='APROBADO').length;
  const peleasAprobadas = peleas.filter(p=>p.status==='APROBADO').length;

  const welcome = currentUser.rol === 'SUPER_ADMIN' ? `Sistema BoxRec Chile Amateur — Control Total`
    : currentUser.rol === 'FISCALIZADOR' ? `Panel de Fiscalización — ${pendientes} registro(s) pendiente(s)`
    : `Asociación: ${getAsocName(currentUser.asociacion)}`;
  document.getElementById('dashboard-welcome').textContent = welcome;

  const stats = [
    { icon:'🥊', value:aprobados, label:'Boxeadores Activos', cls:'red' },
    { icon:'📅', value:evAprobados, label:'Eventos Aprobados', cls:'gold' },
    { icon:'⚔️', value:peleasAprobadas, label:'Peleas Registradas', cls:'green' },
    { icon:'🏛️', value:asocs.length, label:'Asociaciones', cls:'blue' },
  ];
  if (currentUser.rol === 'SUPER_ADMIN' || currentUser.rol === 'FISCALIZADOR') {
    stats.push({ icon:'⏳', value:pendientes, label:'Pendientes Aprobación', cls:'orange' });
    stats.push({ icon:'👥', value:users.filter(u=>u.activo).length, label:'Usuarios Activos', cls:'purple' });
  }

  document.getElementById('stats-grid').innerHTML = stats.map(s =>
    `<div class="stat-card ${s.cls}"><div class="stat-icon">${s.icon}</div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`
  ).join('');

  // panels
  let panels = '';
  // recent audit
  const recentAudit = audit.slice(0,6);
  panels += `<div class="section-card"><div class="section-card-header"><div class="section-card-title">📋 Actividad Reciente</div></div><div class="section-card-body">`;
  if (recentAudit.length === 0) panels += `<div class="empty"><div class="icon">📋</div><p>Sin actividad</p></div>`;
  else recentAudit.forEach(a => { panels += renderAuditItem(a, users); });
  panels += `</div></div>`;

  // top boxeadores
  const topBox = boxeadores.filter(b=>b.status==='APROBADO').sort((a,b)=>b.victorias-a.victorias).slice(0,5);
  panels += `<div class="section-card"><div class="section-card-header"><div class="section-card-title">🏆 Top Boxeadores</div></div><div class="section-card-body"><table><thead><tr><th>#</th><th>NOMBRE</th><th>CAT.</th><th>RÉCORD</th></tr></thead><tbody>`;
  topBox.forEach((b,i) => {
    panels += `<tr><td><span class="rank-num ${i===0?'top1':i===1?'top2':i===2?'top3':''}">${i+1}</span></td><td class="td-primary">${b.nombre}</td><td><span class="badge badge-cat">${b.categoria}</span></td><td><span class="record-display"><span class="record-g">${b.victorias}</span>-<span class="record-e">${b.empates}</span>-<span class="record-p">${b.derrotas}</span></span></td></tr>`;
  });
  panels += `</tbody></table></div></div>`;
  document.getElementById('dashboard-panels').innerHTML = panels;
}

// ── BOXEADORES ─────────────────────────────────────────────────────────────────
function renderBoxeadores() {
  const all = load('boxeadores');
  const q = document.getElementById('search-boxeadores')?.value?.toLowerCase() || '';
  const filterCat = document.getElementById('filter-cat-box')?.value || '';
  const filterStatus = document.getElementById('filter-status-box')?.value || '';
  const users = load('users');
  const asocs = load('asocs');

  let data = all;
  if (currentUser.rol === 'ADMIN_ASOCIACION') data = data.filter(b => b.asociacion === currentUser.asociacion);
  if (q) data = data.filter(b => b.nombre.toLowerCase().includes(q) || b.rut.includes(q) || getAsocName(b.asociacion).toLowerCase().includes(q));
  if (filterCat) data = data.filter(b => b.categoria === filterCat);
  if (filterStatus) data = data.filter(b => b.status === filterStatus);

  const canEdit = currentUser.rol === 'SUPER_ADMIN' || currentUser.rol === 'ADMIN_ASOCIACION';
  const canReview = currentUser.rol === 'SUPER_ADMIN' || currentUser.rol === 'FISCALIZADOR';

  const tbody = document.getElementById('tbody-boxeadores');
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty"><div class="icon">🥊</div><p>No se encontraron boxeadores</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(b => {
    const uploader = users.find(u=>u.id===b.uploadedBy);
    return `<tr>
      <td class="td-primary" style="cursor:pointer" onclick="showBoxeadorDetail('${b.id}')">${b.nombre}</td>
      <td class="td-mono">${b.rut}</td>
      <td><span class="badge badge-cat">${b.categoria}</span> ${b.genero==='F'?'👩':'👨'}</td>
      <td>${getAsocName(b.asociacion)}</td>
      <td><span class="record-display"><span class="record-g">${b.victorias}</span>-<span class="record-e">${b.empates}</span>-<span class="record-p">${b.derrotas}</span></span></td>
      <td>${statusBadge(b.status)}</td>
      <td class="text-sm text-muted">${uploader ? uploader.nombre : '—'}<br><span style="font-size:10px">${formatDate(b.uploadedAt)}</span></td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm" onclick="showBoxeadorDetail('${b.id}')">VER</button>
          ${canEdit && b.status !== 'APROBADO' ? `<button class="btn btn-blue btn-sm" onclick="editBoxeador('${b.id}')">EDITAR</button>` : ''}
          ${canReview && b.status === 'PENDIENTE' ? `<button class="btn btn-green btn-sm" onclick="quickApprove('boxeador','${b.id}')">✓</button><button class="btn btn-danger btn-sm" onclick="quickReject('boxeador','${b.id}')">✗</button>` : ''}
        </div>
      </td>
    </tr>`;
  }).join('');
}

function showBoxeadorDetail(id) {
  const b = load('boxeadores').find(x=>x.id===id);
  if (!b) return;
  const users = load('users');
  const uploader = users.find(u=>u.id===b.uploadedBy);
  const approver = users.find(u=>u.id===b.approvedBy);
  const canReview = (currentUser.rol === 'SUPER_ADMIN' || currentUser.rol === 'FISCALIZADOR') && b.status === 'PENDIENTE';
  const peleas = load('peleas').filter(p => (p.rojo===id || p.azul===id) && p.status==='APROBADO');
  const eventos = load('eventos');

  document.getElementById('detalle-title').textContent = b.nombre;
  document.getElementById('detalle-body').innerHTML = `
    <div class="fighter-profile">
      <div class="fighter-avatar">${b.nombre.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
      <div class="fighter-info">
        <h2>${b.nombre}</h2>
        <div class="text-muted text-sm">${b.rut} · ${b.genero==='F'?'Femenino':'Masculino'} · Nac. ${b.nacimiento}</div>
        <div class="fighter-meta">
          ${statusBadge(b.status)}
          <span class="badge badge-cat">${b.categoria}</span>
          <span class="badge badge-info">${b.region}</span>
          <span class="badge badge-info">${getAsocName(b.asociacion)}</span>
        </div>
        <div class="fighter-record">
          <div class="record-box"><div class="num record-g">${b.victorias}</div><div class="lbl">Victorias</div></div>
          <div class="record-box"><div class="num record-e">${b.empates}</div><div class="lbl">Empates</div></div>
          <div class="record-box"><div class="num record-p">${b.derrotas}</div><div class="lbl">Derrotas</div></div>
        </div>
      </div>
    </div>
    <div class="review-field"><label>Gimnasio / Club:</label><span class="val">${b.gimnasio || '—'}</span></div>
    <div class="review-field"><label>Subido por:</label><span class="val">${uploader?.nombre || '—'} <span class="text-muted">(${formatDate(b.uploadedAt)})</span></span></div>
    ${approver ? `<div class="review-field"><label>Aprobado por:</label><span class="val">${approver.nombre} <span class="text-muted">(${formatDate(b.approvedAt)})</span></span></div>` : ''}
    ${b.rechazoRazon ? `<div class="warn-box mt-2"><strong>Motivo de rechazo:</strong> ${b.rechazoRazon}</div>` : ''}
    ${peleas.length > 0 ? `
    <div class="divider"></div>
    <h4 style="margin-bottom:12px;font-size:14px">Historial de Peleas (${peleas.length})</h4>
    <table><thead><tr><th>EVENTO</th><th>RIVAL</th><th>RESULTADO</th><th>MÉTODO</th></tr></thead><tbody>
    ${peleas.map(p => {
      const rival = load('boxeadores').find(x=>x.id===(p.rojo===id?p.azul:p.rojo));
      const evt = eventos.find(e=>e.id===p.evento);
      const isWinner = (p.ganador==='ROJO'&&p.rojo===id)||(p.ganador==='AZUL'&&p.azul===id);
      const res = p.ganador==='EMPATE'?'Empate':p.ganador==='NC'?'NC':isWinner?'Victoria':'Derrota';
      const resCls = res==='Victoria'?'record-g':res==='Derrota'?'record-p':'record-e';
      return `<tr><td>${evt?.nombre||'—'}</td><td>${rival?.nombre||'—'}</td><td class="${resCls}" style="font-weight:700">${res}</td><td>${p.metodo}</td></tr>`;
    }).join('')}
    </tbody></table>` : ''}
  `;

  const footer = document.getElementById('detalle-footer');
  if (canReview) {
    footer.innerHTML = `
      <button class="btn btn-ghost" onclick="closeModal('modal-detalle')">CERRAR</button>
      <button class="btn btn-danger" onclick="closeModal('modal-detalle');openRejectModal('boxeador','${id}')">RECHAZAR</button>
      <button class="btn btn-green" onclick="approveRecord('boxeador','${id}');closeModal('modal-detalle')">APROBAR</button>
    `;
  } else {
    footer.innerHTML = `<button class="btn btn-ghost" onclick="closeModal('modal-detalle')">CERRAR</button>`;
  }
  openModal('modal-detalle');
}

function editBoxeador(id) {
  const b = load('boxeadores').find(x=>x.id===id);
  if (!b) return;
  document.getElementById('boxeador-edit-id').value = id;
  document.getElementById('modal-boxeador-title').textContent = 'Editar Boxeador';
  document.getElementById('b-nombre').value = b.nombre;
  document.getElementById('b-rut').value = b.rut;
  document.getElementById('b-nacimiento').value = b.nacimiento;
  document.getElementById('b-genero').value = b.genero;
  updateCategoriasModal();
  document.getElementById('b-categoria').value = b.categoria;
  document.getElementById('b-asociacion').value = b.asociacion;
  document.getElementById('b-region').value = b.region;
  document.getElementById('b-gimnasio').value = b.gimnasio || '';
  openModal('modal-boxeador');
}

function saveBoxeador() {
  const nombre = document.getElementById('b-nombre').value.trim();
  const rut = document.getElementById('b-rut').value.trim();
  const nacimiento = document.getElementById('b-nacimiento').value;
  const genero = document.getElementById('b-genero').value;
  const categoria = document.getElementById('b-categoria').value;
  const asociacion = document.getElementById('b-asociacion').value;
  const region = document.getElementById('b-region').value;
  const gimnasio = document.getElementById('b-gimnasio').value.trim();

  if (!nombre || !rut || !nacimiento || !categoria || !asociacion) { showToast('Complete todos los campos requeridos', 'error'); return; }

  const editId = document.getElementById('boxeador-edit-id').value;
  const all = load('boxeadores');

  if (editId) {
    const idx = all.findIndex(b=>b.id===editId);
    if (idx >= 0) {
      all[idx] = { ...all[idx], nombre, rut, nacimiento, genero, categoria, asociacion, region, gimnasio, status:'PENDIENTE', uploadedBy:currentUser.id, uploadedAt:new Date().toISOString(), approvedBy:null, approvedAt:null, rechazoRazon:null };
      save('boxeadores', all);
      addAudit('update', 'boxeador', editId, `Actualizó boxeador ${nombre} (vuelve a PENDIENTE)`);
      showToast('Boxeador actualizado — vuelve a revisión', 'info');
    }
  } else {
    const b = { id:'b'+Date.now(), nombre, rut, nacimiento, genero, categoria, asociacion, region, gimnasio, victorias:0, empates:0, derrotas:0, status:'PENDIENTE', uploadedBy:currentUser.id, uploadedAt:new Date().toISOString(), approvedBy:null, approvedAt:null, rechazoRazon:null };
    all.push(b);
    save('boxeadores', all);
    addAudit('create', 'boxeador', b.id, `Registró boxeador ${nombre}`);
    showToast('Boxeador registrado — pendiente de aprobación', 'success');
  }

  closeModal('modal-boxeador');
  document.getElementById('boxeador-edit-id').value = '';
  document.getElementById('modal-boxeador-title').textContent = 'Registrar Boxeador';
  renderBoxeadores();
  updatePendingCount();
}

// ── EVENTOS ────────────────────────────────────────────────────────────────────
function renderEventos() {
  let data = load('eventos');
  const q = document.getElementById('search-eventos')?.value?.toLowerCase() || '';
  const filterStatus = document.getElementById('filter-status-evt')?.value || '';
  const users = load('users');

  if (currentUser.rol === 'ADMIN_ASOCIACION') data = data.filter(e => e.asociacion === currentUser.asociacion);
  if (q) data = data.filter(e => e.nombre.toLowerCase().includes(q));
  if (filterStatus) data = data.filter(e => e.status === filterStatus);

  const canReview = currentUser.rol === 'SUPER_ADMIN' || currentUser.rol === 'FISCALIZADOR';

  const tbody = document.getElementById('tbody-eventos');
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty"><div class="icon">📅</div><p>No se encontraron eventos</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(e => {
    const uploader = users.find(u=>u.id===e.uploadedBy);
    return `<tr>
      <td class="td-primary">${e.nombre}</td>
      <td>${formatDate(e.fecha)}</td>
      <td><span class="badge badge-cat">${e.tipo}</span></td>
      <td>${e.ciudad}${e.recinto?` — ${e.recinto}`:''}</td>
      <td>${getAsocName(e.asociacion)}</td>
      <td>${statusBadge(e.status)}</td>
      <td class="text-sm text-muted">${uploader?.nombre||'—'}<br><span style="font-size:10px">${formatDate(e.uploadedAt)}</span></td>
      <td>
        <div class="flex gap-2">
          ${canReview && e.status==='PENDIENTE' ? `<button class="btn btn-green btn-sm" onclick="quickApprove('evento','${e.id}')">✓</button><button class="btn btn-danger btn-sm" onclick="quickReject('evento','${e.id}')">✗</button>` : ''}
        </div>
      </td>
    </tr>`;
  }).join('');
}

function saveEvento() {
  const nombre = document.getElementById('e-nombre').value.trim();
  const fecha = document.getElementById('e-fecha').value;
  const tipo = document.getElementById('e-tipo').value;
  const ciudad = document.getElementById('e-ciudad').value.trim();
  const recinto = document.getElementById('e-recinto').value.trim();
  const asociacion = document.getElementById('e-asociacion').value;
  const descripcion = document.getElementById('e-descripcion').value.trim();

  if (!nombre || !fecha || !asociacion) { showToast('Complete los campos requeridos', 'error'); return; }

  const editId = document.getElementById('evento-edit-id').value;
  const all = load('eventos');
  const evt = { id: editId || 'e'+Date.now(), nombre, fecha, tipo, ciudad, recinto, asociacion, descripcion, status:'PENDIENTE', uploadedBy:currentUser.id, uploadedAt:new Date().toISOString(), approvedBy:null, approvedAt:null };

  if (editId) { const i = all.findIndex(e=>e.id===editId); if(i>=0) all[i]=evt; }
  else all.push(evt);

  save('eventos', all);
  addAudit('create', 'evento', evt.id, `Creó evento ${nombre}`);
  showToast('Evento guardado — pendiente de aprobación', 'success');
  closeModal('modal-evento');
  ['e-nombre','e-fecha','e-ciudad','e-recinto','e-descripcion'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('evento-edit-id').value='';
  renderEventos();
  updatePendingCount();
}

// ── PELEAS ─────────────────────────────────────────────────────────────────────
function renderPeleas() {
  let data = load('peleas');
  const q = document.getElementById('search-peleas')?.value?.toLowerCase() || '';
  const filterStatus = document.getElementById('filter-status-fight')?.value || '';
  const boxeadores = load('boxeadores');
  const eventos = load('eventos');
  const users = load('users');

  if (currentUser.rol === 'ADMIN_ASOCIACION') {
    const myAsoc = currentUser.asociacion;
    const myBoxIds = boxeadores.filter(b=>b.asociacion===myAsoc).map(b=>b.id);
    data = data.filter(p => myBoxIds.includes(p.rojo) || myBoxIds.includes(p.azul));
  }
  if (filterStatus) data = data.filter(p=>p.status===filterStatus);
  if (q) {
    data = data.filter(p => {
      const r = boxeadores.find(b=>b.id===p.rojo);
      const a = boxeadores.find(b=>b.id===p.azul);
      const e = eventos.find(e=>e.id===p.evento);
      return (r&&r.nombre.toLowerCase().includes(q))||(a&&a.nombre.toLowerCase().includes(q))||(e&&e.nombre.toLowerCase().includes(q));
    });
  }

  const canReview = currentUser.rol === 'SUPER_ADMIN' || currentUser.rol === 'FISCALIZADOR';

  const tbody = document.getElementById('tbody-peleas');
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty"><div class="icon">⚔️</div><p>No se encontraron peleas</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(p => {
    const r = boxeadores.find(b=>b.id===p.rojo);
    const a = boxeadores.find(b=>b.id===p.azul);
    const e = eventos.find(ev=>ev.id===p.evento);
    const uploader = users.find(u=>u.id===p.uploadedBy);
    const resLabel = p.ganador==='ROJO'?`🔴 ${r?.nombre||'—'}`:p.ganador==='AZUL'?`🔵 ${a?.nombre||'—'}`:p.ganador==='EMPATE'?'Empate':'NC';
    return `<tr>
      <td class="td-primary">🔴 ${r?.nombre||'?'}</td>
      <td style="color:var(--gray3);text-align:center">VS</td>
      <td class="td-primary">🔵 ${a?.nombre||'?'}</td>
      <td>${resLabel}<br><span class="text-sm text-muted">${p.metodo}</span></td>
      <td><span class="badge badge-cat">${p.categoria}</span></td>
      <td class="text-sm">${e?.nombre||'—'}</td>
      <td>${statusBadge(p.status)}</td>
      <td class="text-sm text-muted">${uploader?.nombre||'—'}<br><span style="font-size:10px">${formatDate(p.uploadedAt)}</span></td>
      <td>
        ${canReview && p.status==='PENDIENTE' ? `<div class="flex gap-2"><button class="btn btn-green btn-sm" onclick="quickApprove('pelea','${p.id}')">✓</button><button class="btn btn-danger btn-sm" onclick="quickReject('pelea','${p.id}')">✗</button></div>` : ''}
      </td>
    </tr>`;
  }).join('');
}

function savePelea() {
  const evento = document.getElementById('p-evento').value;
  const rojo = document.getElementById('p-rojo').value;
  const azul = document.getElementById('p-azul').value;
  const categoria = document.getElementById('p-categoria').value;
  const rounds = document.getElementById('p-rounds').value;
  const ganador = document.getElementById('p-ganador').value;
  const metodo = document.getElementById('p-metodo').value;

  if (!evento || !rojo || !azul || !ganador) { showToast('Complete todos los campos requeridos', 'error'); return; }
  if (rojo === azul) { showToast('Los boxeadores no pueden ser el mismo', 'error'); return; }

  const all = load('peleas');
  const p = { id:'p'+Date.now(), evento, rojo, azul, categoria, rounds, ganador, metodo, status:'PENDIENTE', uploadedBy:currentUser.id, uploadedAt:new Date().toISOString(), approvedBy:null, approvedAt:null };
  all.push(p);
  save('peleas', all);
  addAudit('create', 'pelea', p.id, `Registró pelea`);
  showToast('Pelea registrada — pendiente de aprobación', 'success');
  closeModal('modal-pelea');
  renderPeleas();
  updatePendingCount();
}

// ── RANKINGS ───────────────────────────────────────────────────────────────────
function renderRankings() {
  const catFilter = document.getElementById('ranking-cat')?.value || '';
  const boxeadores = load('boxeadores').filter(b=>b.status==='APROBADO');
  const asocs = load('asocs');

  const cats = catFilter ? [catFilter] : [...new Set([...CATS_M,...CATS_F])];
  let html = '';

  cats.forEach(cat => {
    const fighters = boxeadores
      .filter(b=>b.categoria===cat)
      .sort((a,b)=>{
        const ptsA = a.victorias*3 + a.empates - a.derrotas;
        const ptsB = b.victorias*3 + b.empates - b.derrotas;
        if (ptsB !== ptsA) return ptsB-ptsA;
        return b.victorias - a.victorias;
      });
    if (fighters.length === 0) return;

    html += `<div class="section-card" style="margin-bottom:20px">
      <div class="section-card-header">
        <div class="section-card-title">🏆 ${cat} — ${fighters.length} boxeador${fighters.length!==1?'es':''}</div>
      </div>
      <div class="section-card-body"><table><thead><tr>
        <th style="width:40px">#</th><th>NOMBRE</th><th>ASOCIACIÓN</th><th>REGIÓN</th>
        <th>RÉCORD (G-E-D)</th><th>PELEAS</th>
      </tr></thead><tbody>
      ${fighters.map((b,i)=>{
        const total = b.victorias+b.empates+b.derrotas;
        return `<tr>
          <td><span class="rank-num ${i===0?'top1':i===1?'top2':i===2?'top3':''}">${i+1}</span></td>
          <td class="td-primary">${b.nombre}</td>
          <td>${getAsocName(b.asociacion)}</td>
          <td class="text-muted text-sm">${b.region}</td>
          <td><span class="record-display"><span class="record-g">${b.victorias}</span>-<span class="record-e">${b.empates}</span>-<span class="record-p">${b.derrotas}</span></span></td>
          <td class="text-muted">${total}</td>
        </tr>`;
      }).join('')}
      </tbody></table></div></div>`;
  });

  document.getElementById('rankings-container').innerHTML = html || `<div class="empty"><div class="icon">🏆</div><p>No hay boxeadores aprobados aún</p></div>`;
}

// ── PENDIENTES ─────────────────────────────────────────────────────────────────
function renderPendientes() {
  const users = load('users');
  const asocs = load('asocs');
  const tab = currentPendingTab;

  if (tab === 'boxeadores') {
    const pending = load('boxeadores').filter(b=>b.status==='PENDIENTE');
    document.getElementById('pending-boxeadores-list').innerHTML = pending.length === 0
      ? `<div class="empty"><div class="icon">✅</div><p>No hay boxeadores pendientes</p></div>`
      : pending.map(b => renderReviewCard('boxeador', b, users, asocs)).join('');
  } else if (tab === 'eventos') {
    const pending = load('eventos').filter(e=>e.status==='PENDIENTE');
    document.getElementById('pending-eventos-list').innerHTML = pending.length === 0
      ? `<div class="empty"><div class="icon">✅</div><p>No hay eventos pendientes</p></div>`
      : pending.map(e => renderReviewCard('evento', e, users, asocs)).join('');
  } else {
    const pending = load('peleas').filter(p=>p.status==='PENDIENTE');
    const boxeadores = load('boxeadores');
    const eventos = load('eventos');
    document.getElementById('pending-peleas-list').innerHTML = pending.length === 0
      ? `<div class="empty"><div class="icon">✅</div><p>No hay peleas pendientes</p></div>`
      : pending.map(p => renderReviewCard('pelea', p, users, asocs, boxeadores, eventos)).join('');
  }
}

function renderReviewCard(type, item, users, asocs, boxeadores, eventos) {
  const uploader = users.find(u=>u.id===item.uploadedBy);
  let title = '', details = '';

  if (type === 'boxeador') {
    title = `🥊 ${item.nombre}`;
    details = `
      <div class="review-field"><label>RUT:</label><span class="val td-mono">${item.rut}</span></div>
      <div class="review-field"><label>Nacimiento:</label><span class="val">${item.nacimiento}</span></div>
      <div class="review-field"><label>Género:</label><span class="val">${item.genero==='F'?'Femenino':'Masculino'}</span></div>
      <div class="review-field"><label>Categoría:</label><span class="val"><span class="badge badge-cat">${item.categoria}</span></span></div>
      <div class="review-field"><label>Asociación:</label><span class="val">${getAsocName(item.asociacion)}</span></div>
      <div class="review-field"><label>Región:</label><span class="val">${item.region}</span></div>
      <div class="review-field"><label>Gimnasio:</label><span class="val">${item.gimnasio||'—'}</span></div>
    `;
  } else if (type === 'evento') {
    title = `📅 ${item.nombre}`;
    details = `
      <div class="review-field"><label>Fecha:</label><span class="val">${item.fecha}</span></div>
      <div class="review-field"><label>Tipo:</label><span class="val">${item.tipo}</span></div>
      <div class="review-field"><label>Ciudad:</label><span class="val">${item.ciudad} — ${item.recinto||'S/D'}</span></div>
      <div class="review-field"><label>Asociación:</label><span class="val">${getAsocName(item.asociacion)}</span></div>
      ${item.descripcion?`<div class="review-field"><label>Descripción:</label><span class="val">${item.descripcion}</span></div>`:''}
    `;
  } else if (type === 'pelea') {
    const r = boxeadores?.find(b=>b.id===item.rojo);
    const a = boxeadores?.find(b=>b.id===item.azul);
    const e = eventos?.find(ev=>ev.id===item.evento);
    title = `⚔️ ${r?.nombre||'?'} vs ${a?.nombre||'?'}`;
    details = `
      <div class="review-field"><label>Evento:</label><span class="val">${e?.nombre||'—'}</span></div>
      <div class="review-field"><label>Categoría:</label><span class="val">${item.categoria}</span></div>
      <div class="review-field"><label>Rounds:</label><span class="val">${item.rounds}</span></div>
      <div class="review-field"><label>Ganador:</label><span class="val">${item.ganador==='ROJO'?`🔴 ${r?.nombre}`:item.ganador==='AZUL'?`🔵 ${a?.nombre}`:item.ganador}</span></div>
      <div class="review-field"><label>Método:</label><span class="val">${item.metodo}</span></div>
    `;
  }

  const rejectId = `reject-form-${type}-${item.id}`;
  return `
    <div class="review-card">
      <div class="review-card-header">
        <div>
          <strong>${title}</strong>
          <div class="text-sm text-muted mt-1">Subido por <strong>${uploader?.nombre||'—'}</strong> · ${formatDate(item.uploadedAt)}</div>
        </div>
        <span class="badge badge-pending">⏳ PENDIENTE</span>
      </div>
      <div class="review-card-body">
        ${details}
        <div class="review-actions">
          <button class="btn btn-green" onclick="approveRecord('${type}','${item.id}')">✓ APROBAR</button>
          <button class="btn btn-danger" onclick="toggleRejectForm('${rejectId}')">✗ RECHAZAR</button>
        </div>
        <div class="reject-form" id="${rejectId}">
          <div class="form-group" style="margin-bottom:10px"><label>Motivo del rechazo *</label>
            <textarea id="reject-reason-${type}-${item.id}" placeholder="Indique el motivo del rechazo..."></textarea>
          </div>
          <button class="btn btn-danger btn-sm" onclick="rejectRecord('${type}','${item.id}')">CONFIRMAR RECHAZO</button>
        </div>
      </div>
    </div>
  `;
}

function toggleRejectForm(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'none' || !el.style.display ? 'block' : 'none';
}

// ── APPROVAL WORKFLOW ──────────────────────────────────────────────────────────
function quickApprove(type, id) {
  if (!confirm('¿Aprobar este registro?')) return;
  approveRecord(type, id);
}

function approveRecord(type, id) {
  const key = type === 'boxeador' ? 'boxeadores' : type === 'evento' ? 'eventos' : 'peleas';
  const all = load(key);
  const idx = all.findIndex(x=>x.id===id);
  if (idx < 0) return;

  all[idx].status = 'APROBADO';
  all[idx].approvedBy = currentUser.id;
  all[idx].approvedAt = new Date().toISOString();
  all[idx].rechazoRazon = null;

  // Update records for fights
  if (type === 'pelea') {
    const p = all[idx];
    updateBoxRecord(p.rojo, p.ganador==='ROJO'?'win':p.ganador==='EMPATE'?'draw':'loss');
    updateBoxRecord(p.azul, p.ganador==='AZUL'?'win':p.ganador==='EMPATE'?'draw':'loss');
    if (p.ganador === 'NC') { /* no record change */ }
  }

  save(key, all);
  addAudit('approve', type, id, `Aprobó ${type}: ${getEntityName(type, all[idx])}`);
  showToast('Registro aprobado exitosamente', 'success');
  renderPendientes();
  renderBoxeadores();
  renderEventos();
  renderPeleas();
  updatePendingCount();
}

function updateBoxRecord(boxId, result) {
  const all = load('boxeadores');
  const idx = all.findIndex(b=>b.id===boxId);
  if (idx < 0) return;
  if (result === 'win') all[idx].victorias++;
  else if (result === 'draw') all[idx].empates++;
  else if (result === 'loss') all[idx].derrotas++;
  save('boxeadores', all);
}

function quickReject(type, id) {
  const reason = prompt('Motivo del rechazo:');
  if (!reason || !reason.trim()) return;
  rejectRecordWithReason(type, id, reason.trim());
}

function rejectRecord(type, id) {
  const reason = document.getElementById(`reject-reason-${type}-${id}`)?.value?.trim();
  if (!reason) { showToast('Ingrese el motivo del rechazo', 'error'); return; }
  rejectRecordWithReason(type, id, reason);
}

function rejectRecordWithReason(type, id, reason) {
  const key = type === 'boxeador' ? 'boxeadores' : type === 'evento' ? 'eventos' : 'peleas';
  const all = load(key);
  const idx = all.findIndex(x=>x.id===id);
  if (idx < 0) return;
  all[idx].status = 'RECHAZADO';
  all[idx].rechazoRazon = reason;
  save(key, all);
  addAudit('reject', type, id, `Rechazó ${type}: ${reason}`);
  showToast('Registro rechazado', 'info');
  renderPendientes();
  renderBoxeadores();
  renderEventos();
  renderPeleas();
  updatePendingCount();
}

function openRejectModal(type, id) {
  // fallback: use prompt
  const reason = prompt('Motivo del rechazo:');
  if (reason && reason.trim()) rejectRecordWithReason(type, id, reason.trim());
}

function getEntityName(type, item) {
  if (type === 'boxeador') return item.nombre;
  if (type === 'evento') return item.nombre;
  if (type === 'pelea') return `Pelea ${item.id}`;
  return item.id;
}

// ── AUDITORÍA ──────────────────────────────────────────────────────────────────
function renderAudit() {
  const filter = document.getElementById('filter-audit-type')?.value || '';
  let data = load('audit');
  const users = load('users');
  if (filter) data = data.filter(a=>a.action===filter);

  const list = document.getElementById('audit-list');
  if (data.length === 0) {
    list.innerHTML = `<div class="empty"><div class="icon">📋</div><p>Sin registros de auditoría</p></div>`;
    return;
  }
  list.innerHTML = data.map(a => renderAuditItem(a, users)).join('');
}

function renderAuditItem(a, users) {
  const user = users.find(u=>u.id===a.userId);
  const icons = { create:'🟢', approve:'🔵', reject:'🔴', login:'🟡', update:'🟠', delete:'⭕' };
  return `<div class="audit-item">
    <span style="font-size:16px">${icons[a.action]||'⚪'}</span>
    <div class="audit-content">
      <div class="audit-action">${a.desc}</div>
      <div class="audit-meta">${user?.nombre||'Sistema'} · ${ROLES[user?.rol]||'—'} · ${formatDateTime(a.ts)}</div>
    </div>
  </div>`;
}

// ── ASOCIACIONES ───────────────────────────────────────────────────────────────
function renderAsociaciones() {
  const asocs = load('asocs');
  const boxeadores = load('boxeadores');
  const eventos = load('eventos');

  document.getElementById('tbody-asociaciones').innerHTML = asocs.map(a => {
    const numBox = boxeadores.filter(b=>b.asociacion===a.id&&b.status==='APROBADO').length;
    const numEvt = eventos.filter(e=>e.asociacion===a.id&&e.status==='APROBADO').length;
    return `<tr>
      <td class="td-primary">${a.nombre}</td>
      <td>${a.region}</td>
      <td>${a.presidente}</td>
      <td>${numBox}</td>
      <td>${numEvt}</td>
      <td><span class="badge ${a.activa?'badge-approved':'badge-rejected'}">${a.activa?'Activa':'Inactiva'}</span></td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="toggleAsoc('${a.id}')">${a.activa?'DESACTIVAR':'ACTIVAR'}</button>
      </td>
    </tr>`;
  }).join('');
}

function saveAsociacion() {
  const nombre = document.getElementById('a-nombre').value.trim();
  const region = document.getElementById('a-region').value;
  const presidente = document.getElementById('a-presidente').value.trim();
  const direccion = document.getElementById('a-direccion').value.trim();
  const telefono = document.getElementById('a-telefono').value.trim();

  if (!nombre || !presidente) { showToast('Complete nombre y presidente', 'error'); return; }

  const all = load('asocs');
  const a = { id:'a'+Date.now(), nombre, region, presidente, direccion, telefono, activa:true };
  all.push(a);
  save('asocs', all);
  addAudit('create', 'asociacion', a.id, `Creó asociación ${nombre}`);
  showToast('Asociación creada', 'success');
  closeModal('modal-asociacion');
  renderAsociaciones();
  populateSelects();
}

function toggleAsoc(id) {
  const all = load('asocs');
  const idx = all.findIndex(a=>a.id===id);
  if (idx>=0) { all[idx].activa = !all[idx].activa; save('asocs', all); renderAsociaciones(); }
}

// ── USUARIOS ───────────────────────────────────────────────────────────────────
function renderUsuarios() {
  const users = load('users');
  const asocs = load('asocs');

  document.getElementById('tbody-usuarios').innerHTML = users.map(u => {
    const asoc = asocs.find(a=>a.id===u.asociacion);
    return `<tr>
      <td class="td-primary">${u.nombre}<br><span class="text-sm text-muted">${u.cargo||''}</span></td>
      <td class="td-mono text-sm">${u.email}</td>
      <td>${rolBadge(u.rol)}</td>
      <td class="text-sm">${asoc?.nombre||'—'}</td>
      <td class="text-sm text-muted">${u.ultimoAcceso?formatDateTime(u.ultimoAcceso):'Nunca'}</td>
      <td><span class="badge ${u.activo?'badge-approved':'badge-rejected'}">${u.activo?'Activo':'Inactivo'}</span></td>
      <td>
        ${u.id !== currentUser.id ? `<button class="btn btn-ghost btn-sm" onclick="toggleUser('${u.id}')">${u.activo?'DESACTIVAR':'ACTIVAR'}</button>` : '<span class="text-muted text-sm">Tú</span>'}
      </td>
    </tr>`;
  }).join('');
}

function saveUsuario() {
  const nombre = document.getElementById('u-nombre').value.trim();
  const email = document.getElementById('u-email').value.trim();
  const pass = document.getElementById('u-pass').value;
  const rol = document.getElementById('u-rol').value;
  const cargo = document.getElementById('u-cargo').value.trim();
  const asociacion = rol === 'ADMIN_ASOCIACION' ? document.getElementById('u-asociacion').value : null;

  if (!nombre || !email || !pass) { showToast('Complete todos los campos requeridos', 'error'); return; }
  if (pass.length < 6) { showToast('La contraseña debe tener al menos 6 caracteres', 'error'); return; }

  const all = load('users');
  if (all.find(u=>u.email===email)) { showToast('Ya existe un usuario con ese correo', 'error'); return; }

  const u = { id:'u'+Date.now(), nombre, email, password:pass, rol, cargo, asociacion, activo:true, ultimoAcceso:null };
  all.push(u);
  save('users', all);
  addAudit('create', 'usuario', u.id, `Creó usuario ${nombre} con rol ${ROLES[rol]}`);
  showToast('Usuario creado exitosamente', 'success');
  closeModal('modal-usuario');
  renderUsuarios();
}

function toggleUser(id) {
  const all = load('users');
  const idx = all.findIndex(u=>u.id===id);
  if (idx>=0) {
    all[idx].activo = !all[idx].activo;
    save('users', all);
    addAudit('update', 'usuario', id, `${all[idx].activo?'Activó':'Desactivó'} usuario ${all[idx].nombre}`);
    renderUsuarios();
    showToast(`Usuario ${all[idx].activo?'activado':'desactivado'}`, 'info');
  }
}

// ── HELPERS ────────────────────────────────────────────────────────────────────
function getAsocName(id) {
  const a = load('asocs').find(x=>x.id===id);
  return a ? a.nombre.replace('Asociación de Boxeo Amateur ','') : '—';
}

function statusBadge(status) {
  const map = { PENDIENTE:'badge-pending', APROBADO:'badge-approved', RECHAZADO:'badge-rejected' };
  const label = { PENDIENTE:'⏳ Pendiente', APROBADO:'✅ Aprobado', RECHAZADO:'❌ Rechazado' };
  return `<span class="badge ${map[status]||''}">${label[status]||status}</span>`;
}

function rolBadge(rol) {
  const map = { SUPER_ADMIN:'badge-super', FISCALIZADOR:'badge-fiscal', ADMIN_ASOCIACION:'badge-admin' };
  return `<span class="badge ${map[rol]||''}">${ROLES[rol]||rol}</span>`;
}

function formatDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleDateString('es-CL', { day:'2-digit', month:'2-digit', year:'numeric' });
}

function formatDateTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleString('es-CL', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function updatePendingCount() {
  const count = load('boxeadores').filter(b=>b.status==='PENDIENTE').length
    + load('eventos').filter(e=>e.status==='PENDIENTE').length
    + load('peleas').filter(p=>p.status==='PENDIENTE').length;
  const el = document.getElementById('pending-count');
  if (el) { el.textContent = count; el.style.display = count > 0 ? 'inline-block' : 'none'; }
}

// ── MODAL ──────────────────────────────────────────────────────────────────────
function openModal(id) {
  if (id === 'modal-pelea') {
    // refresh selects
    const evAprobados = load('eventos').filter(e=>e.status==='APROBADO');
    fillSelect('p-evento', evAprobados, 'id', 'nombre');
    const boxAprobados = load('boxeadores').filter(b=>b.status==='APROBADO');
    fillSelect('p-rojo', boxAprobados, 'id', 'nombre');
    fillSelect('p-azul', boxAprobados, 'id', 'nombre');
  }
  if (id === 'modal-boxeador') {
    const editId = document.getElementById('boxeador-edit-id').value;
    if (!editId) {
      ['b-nombre','b-rut','b-nacimiento','b-gimnasio'].forEach(f=>{const el=document.getElementById(f);if(el)el.value='';});
    }
  }
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ── TOAST ──────────────────────────────────────────────────────────────────────
function showToast(msg, type='info') {
  const container = document.getElementById('toast');
  const t = document.createElement('div');
  t.className = `toast-item ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ── INIT ───────────────────────────────────────────────────────────────────────
seedData();
