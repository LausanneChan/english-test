/* ===== App Main: 路由和全局管理 ===== */
var App = (function() {
  var routes = {};
  var LOCAL_HOSTS = ['localhost', '127.0.0.1'];
  var pageTitles = {
    '/': '首页',
    '/practice/conversation': '交际用语',
    '/practice/vocab-grammar': '词汇语法',
    '/practice/reading': '阅读理解',
    '/practice/cloze': '完形填空',
    '/practice/translation': '翻译练习',
    '/wrong-book': '错题本',
    '/flashcard': '速记卡',
    '/exam': '模拟考试',
    '/knowledge': '考点速查',
    '/settings': '设置'
  };

  function init() {
    // Define routes
    routes = {
      '/': function() { DashboardPage.render(); },
      '/practice/conversation': function() { PracticePage.init('conversation'); },
      '/practice/vocab-grammar': function() { PracticePage.init('vocab-grammar'); },
      '/practice/reading': function() { ReadingPage.init(); },
      '/practice/cloze': function() { ClozePage.init(); },
      '/practice/translation': function() { TranslationPage.init(); },
      '/wrong-book': function() { WrongBookPage.render(); },
      '/flashcard': function() { FlashcardPage.init(); },
      '/exam': function() { ExamPage.render(); },
      '/knowledge': function() { KnowledgePage.render(); },
      '/settings': function() { SettingsPage.render(); }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleRoute);
    document.addEventListener('click', handleInternalLinkClick);
    bindMobileShell();

    prepareRuntime().then(function() {
      // Initial route
      if (!window.location.hash || window.location.hash === '#') {
        window.location.hash = '#/';
      } else {
        handleRoute();
      }

      // Update wrong count badge
      updateWrongBadge();
    });
  }

  function handleRoute() {
    var hash = window.location.hash.replace('#', '') || '/';
    var handler = routes[hash];

    // Update navigation active state
    updateNavActive(hash);
    updateMobileTitle(hash);
    closeMobileDrawer();

    if (handler) {
      handler();
    } else {
      document.getElementById('page-container').innerHTML =
        '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>页面未找到</h3><p><a href="#/">回到首页</a></p></div>';
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function handleInternalLinkClick(event) {
    var link = event.target.closest ? event.target.closest('a[href^="#/"]') : null;
    if (!link) return;

    var targetHash = link.getAttribute('href');
    if (!targetHash) return;

    // Clicking the current route should still re-run the page logic.
    if (window.location.hash === targetHash) {
      event.preventDefault();
      handleRoute();
    }
  }

  function prepareRuntime() {
    if (!('serviceWorker' in navigator)) {
      return Promise.resolve();
    }

    if (LOCAL_HOSTS.indexOf(window.location.hostname) !== -1) {
      return navigator.serviceWorker.getRegistrations()
        .then(function(registrations) {
          return Promise.all(registrations.map(function(reg) { return reg.unregister(); }));
        })
        .then(function() {
          if (!window.caches || !window.caches.keys) return;
          return window.caches.keys().then(function(keys) {
            return Promise.all(keys.map(function(key) { return window.caches.delete(key); }));
          });
        })
        .catch(function(err) {
          console.warn('Local cache cleanup failed:', err);
        });
    }

    return navigator.serviceWorker.register('sw.js?v=2').catch(function(err) {
      console.warn('Service worker registration failed:', err);
    });
  }

  function updateNavActive(hash) {
    // Sidebar
    document.querySelectorAll('#sidebar .nav-link').forEach(function(link) {
      var page = link.getAttribute('data-page');
      link.classList.remove('active');
      if (hash === getRouteForDataPage(page)) {
        link.classList.add('active');
      }
    });

    // Bottom nav
    document.querySelectorAll('#bottom-nav .bottom-nav-link').forEach(function(link) {
      var page = link.getAttribute('data-page');
      link.classList.remove('active');
      if (hash === getRouteForDataPage(page)) {
        link.classList.add('active');
      }
    });

    document.querySelectorAll('#mobile-drawer .mobile-drawer-link').forEach(function(link) {
      var page = link.getAttribute('data-page');
      link.classList.remove('active');
      if (hash === getRouteForDataPage(page)) {
        link.classList.add('active');
      }
    });
  }

	  function bindMobileShell() {
	    var btn = document.getElementById('mobile-menu-btn');
	    var closeBtn = document.getElementById('mobile-drawer-close');
	    var overlay = document.getElementById('mobile-drawer-overlay');
	    var bottomMoreBtn = document.getElementById('bottom-more-btn');
	    if (btn) btn.addEventListener('click', toggleMobileDrawer);
	    if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
	    if (overlay) overlay.addEventListener('click', closeMobileDrawer);
	    if (bottomMoreBtn) bottomMoreBtn.addEventListener('click', toggleMobileDrawer);
	  }

  function updateMobileTitle(hash) {
    var titleEl = document.getElementById('mobile-page-title');
    if (titleEl) {
      titleEl.textContent = pageTitles[hash] || '学位英语冲刺助手';
    }
  }

  function toggleMobileDrawer() {
    var drawer = document.getElementById('mobile-drawer');
    var overlay = document.getElementById('mobile-drawer-overlay');
    if (!drawer || !overlay) return;
    var isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    document.body.classList.toggle('drawer-open', !isOpen);
  }

  function closeMobileDrawer() {
    var drawer = document.getElementById('mobile-drawer');
    var overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('drawer-open');
  }

  function getRouteForDataPage(page) {
    var map = {
      'dashboard': '/',
      'practice-conversation': '/practice/conversation',
      'practice-vocab-grammar': '/practice/vocab-grammar',
      'practice-reading': '/practice/reading',
      'practice-cloze': '/practice/cloze',
      'practice-translation': '/practice/translation',
      'wrong-book': '/wrong-book',
      'flashcard': '/flashcard',
      'exam': '/exam',
      'knowledge': '/knowledge',
      'settings': '/settings'
    };
    return map[page] || '/';
  }

  function updateWrongBadge() {
    var badge = document.getElementById('wrong-count-badge');
    if (badge) {
      var count = Store.getWrongCount();
      if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline';
        badge.className = 'nav-badge error-badge';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  return { init: init, updateWrongBadge: updateWrongBadge };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
