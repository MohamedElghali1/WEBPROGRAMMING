// DARK MODE

(function () {
  const stored = localStorage.getItem('darkMode');
  if (stored === 'true') {
    document.body.classList.add('dark-mode');
  }
})();

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  updateDarkIcon();
}

function updateDarkIcon() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
}

window.addEventListener('DOMContentLoaded', updateDarkIcon);

// SIDEBAR
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) overlay.addEventListener('click', closeSidebar);
});