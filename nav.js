// ============================================================
// DANMO RH — Navbar partilhada (injectada via JS, sem repetir HTML)
// Uso: incluir <script src="nav.js"></script> e chamar montarNavbar('dashboard')
// ============================================================

const NAV_ITENS = [
  { id: 'dashboard', href: 'dashboard.html', label: '🏠 Início' }
];

const NAV_SERVICOS = [
  { href: 'setor.html',      label: '👥 Colaboradores por Setor' },
  { href: 'relatorio.html',  label: '📄 Relatório Imprimível' }
];

const NAV_CSS = `
  .nav-dropdown { position:relative; }
  .nav-dropdown-btn {
    background:transparent; border:none; color:var(--text2);
    padding:8px 16px; cursor:pointer; font-family:'Source Sans 3';
    font-size:13px; letter-spacing:1px; text-transform:uppercase;
    border-radius:4px; transition:all 0.2s;
    display:inline-flex; align-items:center; gap:6px;
  }
  .nav-dropdown-btn:hover, .nav-dropdown-btn.open { background:rgba(245,158,11,0.15); color:var(--amber); }
  .nav-dropdown-menu {
    position:absolute; top:calc(100% + 8px); left:0;
    background:var(--navy2); border:1px solid var(--border);
    border-radius:8px; min-width:240px; z-index:999;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);
    padding:6px; display:none;
  }
  .nav-dropdown-menu.open { display:block; }
  .nav-dropdown-item {
    display:flex; align-items:center; gap:10px;
    padding:9px 12px; border-radius:5px; cursor:pointer;
    color:var(--text2); font-size:13px; text-decoration:none;
    transition:all 0.2s; white-space:nowrap;
  }
  .nav-dropdown-item:hover { background:rgba(245,158,11,0.12); color:var(--amber); }
  .nav-home-btn {
    background:transparent; border:none; color:var(--text2);
    padding:8px 16px; cursor:pointer; font-family:'Source Sans 3';
    font-size:13px; letter-spacing:1px; text-transform:uppercase;
    border-radius:4px; transition:all 0.2s; text-decoration:none;
    display:inline-flex; align-items:center; gap:6px;
  }
  .nav-home-btn:hover, .nav-home-btn.active { background:rgba(245,158,11,0.15); color:var(--amber); }
`;

function montarNavbar(paginaAtiva) {
  if (!document.getElementById('nav-css-rh')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'nav-css-rh';
    styleTag.textContent = NAV_CSS;
    document.head.appendChild(styleTag);
  }

  const html = `
  <nav class="navbar">
    <a href="dashboard.html" class="navbar-brand">
      <div class="logo-box">RH</div>
      <div>
        <div class="brand-name">DANMO RH</div>
        <div class="brand-sub">Quadro de Pessoal</div>
      </div>
    </a>

    <div style="display:flex; align-items:center; gap:4px;">
      ${NAV_ITENS.map(i => `
        <a href="${i.href}" class="nav-home-btn ${i.id === paginaAtiva ? 'active' : ''}">${i.label}</a>
      `).join('')}
      <div class="nav-dropdown">
        <button class="nav-dropdown-btn" id="nav-servicos-btn" onclick="toggleDropdownRH()">⚙️ Serviços ▾</button>
        <div class="nav-dropdown-menu" id="nav-servicos-menu">
          ${NAV_SERVICOS.map(s => `<a href="${s.href}" class="nav-dropdown-item">${s.label}</a>`).join('')}
        </div>
      </div>
    </div>

    <div class="navbar-user">
      <div>
        <strong id="nav-user-nome">${(typeof AUTH !== 'undefined' && AUTH.init() && AUTH.nome()) || 'Visitante'}</strong>
        <div id="nav-user-nivel" style="font-size:11px; text-transform:uppercase;">${(typeof AUTH !== 'undefined' && AUTH.nivel()) || ''}</div>
      </div>
      <button id="btn-tema-header" onclick="togglePainelTemas()"
        style="background:transparent; border:1px solid var(--border); color:var(--text2);
               padding:6px 10px; border-radius:5px; cursor:pointer; font-size:14px;
               margin-right:6px; transition:all 0.2s;"
        title="Aparência"
        onmouseover="this.style.borderColor='var(--amber)';this.style.color='var(--amber)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text2)'">🎨</button>
    </div>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  document.addEventListener('click', e => {
    const menu = document.getElementById('nav-servicos-menu');
    const btn  = document.getElementById('nav-servicos-btn');
    if (!menu) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
    }
  });
}

function toggleDropdownRH() {
  document.getElementById('nav-servicos-menu').classList.toggle('open');
  document.getElementById('nav-servicos-btn').classList.toggle('open');
}
