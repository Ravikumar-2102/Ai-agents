 const UI = {
  $: (s, r = document) => r.querySelector(s),
  $$: (s, r = document) => [...r.querySelectorAll(s)],
  toast(message) {
    let toast = this.$('#toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  },
  save(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  theme() {
    const dark = localStorage.getItem('agent_theme') === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    this.$$('.theme-toggle').forEach(button => {
      button.textContent = dark ? '☀ Light mode' : '☾ Dark mode';
    });
  },
  navigate(path) { window.location.href = path; }
};

document.addEventListener('DOMContentLoaded', () => {
  UI.theme();
  UI.$$('.theme-toggle').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.setItem('agent_theme', localStorage.getItem('agent_theme') === 'dark' ? 'light' : 'dark');
      UI.theme();
    });
  });
});


const templates = [
  ['1','AI Agent Dashboard','../ai-agent-dashboard/index.html'],
  ['2','AI Agent List','../ai-agent-list/index.html'],
  ['3','AI Agent Profile','../ai-agent-profile/index.html'],
  ['4','Agent Status Monitoring','../agent-status-monitoring/index.html']
];
function renderShell(active, title, subtitle) {
  const nav = templates.map(([icon,name,href]) => `<a class="${name===active?'active':''}" href="${href}"><span class="icon">${icon}</span><span>${name}</span></a>`).join('');
  return `<div class="app"><aside class="sidebar"><div class="brand"><div class="logo">✦</div><span>AgentOS UI</span></div><nav class="nav">${nav}</nav><div class="sidebar-bottom"><button class="theme-toggle">☾ Dark mode</button></div></aside><main class="main"><header class="topbar"><div class="crumb">AgentOS / <strong>${title}</strong></div><div class="top-actions"><button class="icon-btn" onclick="location.reload()">↻</button><div class="avatar">H</div></div></header><section class="content"><div class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div></div>`;
}
function closeShell(){return `</section></main></div><div id="toast" class="toast"></div><script src="../shared/core.js"></script><script src="../shared/nav.js"></script>`}
