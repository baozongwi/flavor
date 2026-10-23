(function() {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  var OVERRIDE_KEY = 'flavor-theme-override';
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Keep the mobile address bar in step with the page (same values as
    // --bg in _variables.scss).
    var meta = document.getElementById('meta-theme-color');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#212737' : '#fdfdfd');
    updateIcon(theme);
  }

  function updateIcon(theme) {
    var sun = toggle.querySelector('.icon-sun');
    var moon = toggle.querySelector('.icon-moon');
    if (sun) sun.style.display = theme === 'dark' ? 'none' : 'block';
    if (moon) moon.style.display = theme === 'dark' ? 'block' : 'none';
    // aria-pressed exposes the toggle state to assistive tech; the icons stay
    // decorative and are switched by CSS/JS only.
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  // 手动切换：写入 sessionStorage，本次会话不再跟随系统
  toggle.addEventListener('click', function() {
    var next = getTheme() === 'dark' ? 'light' : 'dark';
    sessionStorage.setItem(OVERRIDE_KEY, next);
    setTheme(next);
  });

  // 系统主题变化：仅在本次会话无手动选择时才跟随
  mq.addEventListener('change', function(e) {
    if (!sessionStorage.getItem(OVERRIDE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  updateIcon(getTheme());

  // Hamburger menu
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      var open = navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

(function() {
  var btn = document.getElementById('to-top');
  if (!btn) return;
  function onScroll() {
    var show = window.scrollY > 320;
    btn.classList.toggle('is-visible', show);
    btn.setAttribute('aria-hidden', show ? 'false' : 'true');
    btn.tabIndex = show ? 0 : -1;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', function() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
