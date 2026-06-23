// danmo-hst | utils.js

// ── Datas ──────────────────────────────────────────────
function formatarData(dataStr) {
  if (!dataStr) return '—';
  const d = new Date(dataStr);
  return d.toLocaleDateString('pt-MZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatarDataHora(dataStr) {
  if (!dataStr) return '—';
  const d = new Date(dataStr);
  return d.toLocaleString('pt-MZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function dataHoje() {
  return new Date().toISOString().split('T')[0];
}

function calcularIdade(nascimento) {
  if (!nascimento) return '—';
  const hoje = new Date();
  const nasc = new Date(nascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

function calcularAnosTrab(admissao) {
  if (!admissao) return '—';
  const hoje = new Date();
  const adm = new Date(admissao);
  const anos = hoje.getFullYear() - adm.getFullYear();
  const meses = hoje.getMonth() - adm.getMonth();
  const m = meses < 0 ? meses + 12 : meses;
  const a = meses < 0 ? anos - 1 : anos;
  return `${a} ano${a !== 1 ? 's' : ''} e ${m} mês${m !== 1 ? 'es' : ''}`;
}

// ── Saúde — Tensão Arterial ────────────────────────────
function classificarTensao(sis, dia) {
  if (sis < 90 || dia < 60)   return { nivel: 'Hipotensão',          cor: 'azul',    emoji: '🔵', recomendacao: 'Tensão baixa. Aumentar ingestão de água e sal moderado. Evitar exposição prolongada ao calor. Consultar médico se persistir.' };
  if (sis < 120 && dia < 80)  return { nivel: 'Normal',              cor: 'verde',   emoji: '🟢', recomendacao: 'Tensão arterial óptima. Manter hábitos saudáveis, hidratação e actividade física regular.' };
  if (sis < 130 && dia < 80)  return { nivel: 'Normal-Alta',         cor: 'verde',   emoji: '🟢', recomendacao: 'Tensão dentro do normal mas no limite superior. Reduzir sal, evitar stress e monitorizar regularmente.' };
  if (sis < 140 && dia < 90)  return { nivel: 'Hipertensão Grau 1',  cor: 'laranja', emoji: '🟠', recomendacao: 'Hipertensão ligeira. Reduzir sal e gorduras, evitar álcool e tabaco, praticar exercício moderado. Verificar medicação.' };
  if (sis < 180 && dia < 110) return { nivel: 'Hipertensão Grau 2',  cor: 'vermelho',emoji: '🔴', recomendacao: 'Hipertensão moderada a grave. Verificar imediatamente a medicação. Repouso e encaminhar ao posto médico hoje.' };
  return                              { nivel: 'Crise Hipertensiva',  cor: 'critico', emoji: '🚨', recomendacao: 'CRISE HIPERTENSIVA. Encaminhar URGENTE ao posto médico. Não deixar o colaborador sozinho.' };
}

function classificarPulso(bpm) {
  if (bpm < 60)  return { nivel: 'Bradicardia',        cor: 'azul',     emoji: '🔵' };
  if (bpm <= 100) return { nivel: 'Normal',             cor: 'verde',    emoji: '🟢' };
  if (bpm <= 120) return { nivel: 'Taquicardia Leve',   cor: 'laranja',  emoji: '🟠' };
  if (bpm <= 150) return { nivel: 'Taquicardia Moder.', cor: 'vermelho', emoji: '🔴' };
  return                  { nivel: 'Taquicardia Grave', cor: 'critico',  emoji: '🚨' };
}

// ── Saúde — Glicemia (mmol/L) ─────────────────────────
function classificarGlicemia(valor) {
  if (valor < 3.9)  return { nivel: 'Hipoglicemia',   cor: 'azul',    emoji: '🔵', recomendacao: 'Glicemia muito baixa. Ingerir açúcar ou sumo imediatamente. Não deixar o colaborador sozinho. Encaminhar ao posto médico.' };
  if (valor <= 5.5) return { nivel: 'Normal',          cor: 'verde',   emoji: '🟢', recomendacao: 'Glicemia em jejum normal. Manter alimentação equilibrada e actividade física regular.' };
  if (valor <= 6.9) return { nivel: 'Pré-Diabetes',    cor: 'laranja', emoji: '🟠', recomendacao: 'Pré-diabetes. Reduzir açúcares e carbohidratos refinados. Aumentar actividade física. Repetir análise em 3 meses.' };
  if (valor <= 11.0)return { nivel: 'Diabetes',        cor: 'vermelho',emoji: '🔴', recomendacao: 'Diabetes. Verificar se está a tomar a medicação correctamente. Encaminhar ao posto médico para avaliação.' };
  return                   { nivel: 'Diabetes Grave',  cor: 'critico', emoji: '🚨', recomendacao: 'Glicemia criticamente elevada. Encaminhar URGENTE ao posto médico. Pode ser necessária insulina.' };
}

// ── Saúde — IMC ───────────────────────────────────────
function calcularIMC(peso, altura_cm) {
  if (!peso || !altura_cm) return null;
  const h = altura_cm / 100;
  return +(peso / (h * h)).toFixed(1);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { nivel: 'Abaixo do Peso',  cor: 'azul',    emoji: '🔵', recomendacao: 'Peso abaixo do normal. Melhorar a alimentação com refeições mais nutritivas e calóricas. Consultar nutricionista.' };
  if (imc < 25)   return { nivel: 'Peso Normal',      cor: 'verde',   emoji: '🟢', recomendacao: 'IMC saudável. Manter alimentação equilibrada e actividade física regular.' };
  if (imc < 30)   return { nivel: 'Excesso de Peso',  cor: 'laranja', emoji: '🟠', recomendacao: 'Excesso de peso. Reduzir gorduras e açúcares, aumentar vegetais e frutas. Praticar exercício físico diariamente.' };
  if (imc < 35)   return { nivel: 'Obesidade Grau 1', cor: 'vermelho',emoji: '🔴', recomendacao: 'Obesidade. Acompanhamento nutricional recomendado. Reduzir sal e gorduras. Actividade física orientada.' };
  return                  { nivel: 'Obesidade Grau 2+',cor: 'critico', emoji: '🚨', recomendacao: 'Obesidade grave. Encaminhar ao posto médico para avaliação completa e acompanhamento especializado.' };
}

// ── UI Helpers ─────────────────────────────────────────
function mostrarToast(mensagem, tipo = 'sucesso') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = mensagem;
  t.className = `toast toast-${tipo} visivel`;
  setTimeout(() => t.classList.remove('visivel'), 3500);
}

function mostrarCarregando(id, estado) {
  const el = document.getElementById(id);
  if (el) el.style.display = estado ? 'flex' : 'none';
}

function badgeCor(cor) {
  const mapa = {
    verde: '#22c55e', laranja: '#f97316', vermelho: '#ef4444',
    azul: '#3b82f6', critico: '#dc2626'
  };
  return mapa[cor] || '#94a3b8';
}

// ── Navbar ─────────────────────────────────────────────
function renderNavbar(paginaActiva) {
  const sessao = obterSessao();
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const paginas = [
    { id: 'dashboard',  label: '🏠 Início',      href: 'index.html' },
    { id: 'ficha',      label: '👤 Fichas',       href: 'ficha.html' },
    { id: 'saude',      label: '❤️ Saúde',        href: 'saude.html' },
    { id: 'medicacao',  label: '💊 Medicação',    href: 'medicacao.html' },
    { id: 'acidentes',  label: '⚠️ Acidentes',    href: 'acidentes.html' },
    { id: 'ferias',     label: '🏖️ Férias',       href: 'ferias.html' },
    { id: 'relatorios', label: '📄 Relatórios',   href: 'relatorios.html' },
  ];

  nav.innerHTML = `
    <div class="nav-marca">
      <span class="nav-logo">🏥</span>
      <span class="nav-titulo">DSS <span class="nav-sub">Portal HST</span></span>
    </div>
    <div class="nav-links">
      ${paginas.map(p => `
        <a href="${p.href}" class="nav-link ${paginaActiva === p.id ? 'activo' : ''}">${p.label}</a>
      `).join('')}
    </div>
    <div class="nav-utilizador">
      <span class="nav-user-nome">${sessao ? sessao.codigo : ''}</span>
      <button class="btn-sair" onclick="terminarSessao()">Sair</button>
    </div>
  `;
}
