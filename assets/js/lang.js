(function () {
  'use strict';

  var STORAGE_KEY = 'fg.lang';
  var DEFAULT = 'en';
  var SUPPORTED = ['en', 'pt'];

  function detect() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (_) { /* private mode */ }

    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('pt') === 0) return 'pt';
    return DEFAULT;
  }

  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  var initial = detect();
  apply(initial);

  var btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('lang');
      apply(current === 'pt' ? 'en' : 'pt');
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
