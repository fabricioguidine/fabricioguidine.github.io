(function () {
  'use strict';

  var KEY = 'fg.a11y';
  var TEXT_LEVELS = ['default', 'large', 'xlarge'];

  var STATE_LABELS = {
    en: { default: 'A', large: 'A+', xlarge: 'A++', off: 'Off', on: 'On' },
    pt: { default: 'A', large: 'A+', xlarge: 'A++', off: 'Desl.', on: 'Lig.' }
  };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { textSize: 'default', contrast: false, motion: false, underline: false };
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (_) {} }

  var state = load();
  var toggleBtn = document.getElementById('a11y-toggle');
  var panel     = document.getElementById('a11y-panel');
  if (!toggleBtn || !panel) return;

  function lang() { return document.documentElement.getAttribute('lang') === 'pt' ? 'pt' : 'en'; }

  function apply() {
    var b = document.body;
    b.classList.toggle('a11y-text-large',  state.textSize === 'large');
    b.classList.toggle('a11y-text-xlarge', state.textSize === 'xlarge');
    b.classList.toggle('a11y-high-contrast', state.contrast);
    b.classList.toggle('a11y-reduce-motion', state.motion);
    b.classList.toggle('a11y-underline-links', state.underline);
    repaintButtons();
  }

  function repaintButtons() {
    var L = STATE_LABELS[lang()];
    panel.querySelectorAll('.a11y-btn').forEach(function (btn) {
      var key = btn.getAttribute('data-a11y');
      var stateSpan = btn.querySelector('.a11y-state');
      if (key === 'textSize') {
        stateSpan.textContent = L[state.textSize];
      } else {
        var on = !!state[key];
        stateSpan.textContent = on ? L.on : L.off;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    });
  }

  function openPanel() {
    panel.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    var first = panel.querySelector('button');
    if (first) first.focus();
  }
  function closePanel(returnFocus) {
    panel.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', function () {
    panel.hidden ? openPanel() : closePanel(true);
  });

  panel.addEventListener('click', function (e) {
    var btn = e.target.closest('.a11y-btn, .a11y-reset');
    if (!btn) return;
    var key = btn.getAttribute('data-a11y');
    if (key === 'reset') {
      state = { textSize: 'default', contrast: false, motion: false, underline: false };
    } else if (key === 'textSize') {
      var i = TEXT_LEVELS.indexOf(state.textSize);
      state.textSize = TEXT_LEVELS[(i + 1) % TEXT_LEVELS.length];
    } else {
      state[key] = !state[key];
    }
    save(state);
    apply();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) closePanel(true);
  });
  document.addEventListener('click', function (e) {
    if (panel.hidden) return;
    if (panel.contains(e.target) || toggleBtn.contains(e.target)) return;
    closePanel(false);
  });

  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', function () { setTimeout(repaintButtons, 0); });

  apply();
})();
