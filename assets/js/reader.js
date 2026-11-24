(function () {
  var STORAGE_KEY = 'mgs-reader-v2';
  var SIZES = ['sm', 'md', 'lg', 'xl'];
  var SIZE_LABELS = {
    sm: '93%',
    md: '100%',
    lg: '108%',
    xl: '117%'
  };

  var root = document.documentElement;
  var topbar = document.getElementById('site-topbar');

  var aaTrigger = document.getElementById('aa-trigger');
  var aaPopover = document.getElementById('aa-popover');
  var sizeDecBtn = document.getElementById('aa-size-dec');
  var sizeIncBtn = document.getElementById('aa-size-inc');
  var sizeLabel = document.getElementById('aa-size-label');

  var mobileTrigger = document.getElementById('mobile-menu-trigger');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconHamburger = document.getElementById('icon-hamburger');
  var iconClose = document.getElementById('icon-close');

  function loadPrefs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function savePrefs(prefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }

  var prefs = loadPrefs();

  function effectiveTheme() {
    if (prefs.theme === 'light' || prefs.theme === 'dark') {
      return prefs.theme;
    }
    return 'auto';
  }

  function effectiveFont() {
    return prefs.font === 'serif' ? 'serif' : 'sans';
  }

  function effectiveSize() {
    return SIZES.indexOf(prefs.size) !== -1 ? prefs.size : 'md';
  }

  function applyAndSyncUI() {
    var theme = effectiveTheme();
    var font = effectiveFont();
    var size = effectiveSize();

    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    root.setAttribute('data-font', font);
    root.setAttribute('data-size', size);

    if (!aaPopover) return;

    var themeBtns = aaPopover.querySelectorAll('[data-set-theme]');
    for (var i = 0; i < themeBtns.length; i++) {
      var isThemeActive = themeBtns[i].getAttribute('data-set-theme') === theme;
      themeBtns[i].classList.toggle('is-active', isThemeActive);
      themeBtns[i].setAttribute('aria-checked', isThemeActive ? 'true' : 'false');
    }

    var fontBtns = aaPopover.querySelectorAll('[data-set-font]');
    for (var j = 0; j < fontBtns.length; j++) {
      var isFontActive = fontBtns[j].getAttribute('data-set-font') === font;
      fontBtns[j].classList.toggle('is-active', isFontActive);
      fontBtns[j].setAttribute('aria-checked', isFontActive ? 'true' : 'false');
    }

    var sizeIdx = SIZES.indexOf(size);
    if (sizeLabel) {
      sizeLabel.textContent = SIZE_LABELS[size] || '100%';
    }
    if (sizeDecBtn) {
      sizeDecBtn.disabled = sizeIdx <= 0;
    }
    if (sizeIncBtn) {
      sizeIncBtn.disabled = sizeIdx >= SIZES.length - 1;
    }
  }

  var isPopoverOpen = false;
  var isMobileMenuOpen = false;

  function setPopoverOpen(open) {
    if (!aaPopover || !aaTrigger) return;
    isPopoverOpen = open;
    aaPopover.classList.toggle('is-open', open);
    aaPopover.setAttribute('aria-hidden', open ? 'false' : 'true');
    aaTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      setMobileMenuOpen(false);
      if (topbar) topbar.classList.remove('is-hidden');
    }
  }

  function setMobileMenuOpen(open) {
    if (!mobileMenu || !mobileTrigger) return;
    isMobileMenuOpen = open;
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    mobileTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileTrigger.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    if (iconHamburger) iconHamburger.classList.toggle('hidden', open);
    if (iconClose) iconClose.classList.toggle('hidden', !open);
    if (open) {
      setPopoverOpen(false);
      if (topbar) topbar.classList.remove('is-hidden');
    }
  }

  if (aaTrigger && aaPopover) {
    aaTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setPopoverOpen(!isPopoverOpen);
    });

    aaPopover.addEventListener('click', function (e) {
      var themeBtn = e.target.closest('[data-set-theme]');
      if (themeBtn) {
        prefs.theme = themeBtn.getAttribute('data-set-theme');
        savePrefs(prefs);
        applyAndSyncUI();
        return;
      }

      var fontBtn = e.target.closest('[data-set-font]');
      if (fontBtn) {
        prefs.font = fontBtn.getAttribute('data-set-font');
        savePrefs(prefs);
        applyAndSyncUI();
      }
    });

    if (sizeDecBtn) {
      sizeDecBtn.addEventListener('click', function () {
        var idx = SIZES.indexOf(effectiveSize());
        if (idx > 0) {
          prefs.size = SIZES[idx - 1];
          savePrefs(prefs);
          applyAndSyncUI();
        }
      });
    }

    if (sizeIncBtn) {
      sizeIncBtn.addEventListener('click', function () {
        var idx = SIZES.indexOf(effectiveSize());
        if (idx < SIZES.length - 1) {
          prefs.size = SIZES[idx + 1];
          savePrefs(prefs);
          applyAndSyncUI();
        }
      });
    }
  }

  if (mobileTrigger && mobileMenu) {
    mobileTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setMobileMenuOpen(!isMobileMenuOpen);
    });
  }

  document.addEventListener('click', function (e) {
    if (isPopoverOpen && aaPopover && aaTrigger && !aaPopover.contains(e.target) && !aaTrigger.contains(e.target)) {
      setPopoverOpen(false);
    }
    if (isMobileMenuOpen && mobileMenu && mobileTrigger && !mobileMenu.contains(e.target) && !mobileTrigger.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (isPopoverOpen) {
        setPopoverOpen(false);
        if (aaTrigger) aaTrigger.focus();
      }
      if (isMobileMenuOpen) {
        setMobileMenuOpen(false);
        if (mobileTrigger) mobileTrigger.focus();
      }
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 640 && isMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  });

  /* Auto-fading Top Bar on Scroll */
  if (topbar) {
    var lastScrollY = window.scrollY || 0;
    var ticking = false;

    function updateTopbar() {
      var currentY = Math.max(0, window.scrollY || 0);
      var delta = currentY - lastScrollY;

      topbar.classList.toggle('is-scrolled', currentY > 24);

      if (currentY <= 56 || isPopoverOpen || isMobileMenuOpen) {
        topbar.classList.remove('is-hidden');
      } else if (delta > 8 && currentY > 100) {
        topbar.classList.add('is-hidden');
      } else if (delta < -5) {
        topbar.classList.remove('is-hidden');
      }

      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateTopbar);
          ticking = true;
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'mousemove',
      function (e) {
        if (e.clientY <= 48 && topbar.classList.contains('is-hidden')) {
          topbar.classList.remove('is-hidden');
        }
      },
      { passive: true }
    );
  }

  applyAndSyncUI();
})();
