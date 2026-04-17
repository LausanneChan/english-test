/* ===== Utils ===== */
var Utils = {
  // Shuffle array
  shuffle: function(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },

  // Format date
  formatDate: function(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  },

  // Format duration (seconds -> Xm Xs)
  formatDuration: function(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    if (m === 0) return s + '秒';
    return m + '分' + (s > 0 ? s + '秒' : '');
  },

  // Format timer (seconds -> HH:MM:SS)
  formatTimer: function(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    return String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0');
  },

  // Get today date string
  today: function() {
    return Utils.formatDate(Date.now());
  },

  // Calculate days between two dates
  daysBetween: function(d1, d2) {
    var t1 = new Date(d1).setHours(0,0,0,0);
    var t2 = new Date(d2).setHours(0,0,0,0);
    return Math.round((t2 - t1) / 86400000);
  },

  // Escape HTML
  escapeHtml: function(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Simple template: replace {{key}} in template with data
  tpl: function(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, function(match, key) {
      return data[key] !== undefined ? data[key] : match;
    });
  },

  // DOM helper
  $: function(selector) { return document.querySelector(selector); },
  $all: function(selector) { return document.querySelectorAll(selector); },

  canSpeak: function() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
  },

  hasEnglish: function(text) {
    return /[A-Za-z]/.test(String(text || ''));
  },

  speakText: function(text) {
    if (!text) return;
    if (!Utils.canSpeak()) {
      alert('当前浏览器不支持朗读功能，请换 Safari 或 Chrome 试试。');
      return;
    }

    var cleaned = String(text).replace(/\s+/g, ' ').trim();
    if (!cleaned) return;

    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    var voices = window.speechSynthesis.getVoices();
    if (voices && voices.length) {
      for (var i = 0; i < voices.length; i++) {
        if ((voices[i].lang || '').toLowerCase().indexOf('en') === 0) {
          utterance.voice = voices[i];
          break;
        }
      }
    }

    window.speechSynthesis.speak(utterance);
  },

  renderSpeakButton: function(text, label) {
    if (!text || !Utils.hasEnglish(text)) return '';
    var safeText = encodeURIComponent(String(text));
    return '<button class="speak-btn" type="button" onclick="Utils.speakText(decodeURIComponent(\'' + safeText + '\'))">' +
      '<span class="speak-icon">🔊</span><span>' + Utils.escapeHtml(label || '朗读') + '</span></button>';
  },

  renderInlineSpeakButton: function(text, label) {
    if (!text || !Utils.hasEnglish(text)) return '';
    var safeText = encodeURIComponent(String(text));
    return '<button class="inline-speak-btn" type="button" onclick="event.stopPropagation(); Utils.speakText(decodeURIComponent(\'' + safeText + '\'))">' +
      '<span class="speak-icon">🔊</span><span>' + Utils.escapeHtml(label || '朗读') + '</span></button>';
  },

  hasChineseTranslation: function(question) {
    if (!question) return false;
    if (Utils.getQuestionCn(question) || Utils.getSourceCn(question) || Utils.getReferenceCn(question) || Utils.getTitleCn(question) || Utils.getPassageCn(question)) return true;
    if (question.dialogue) {
      for (var i = 0; i < question.dialogue.length; i++) {
        if (question.dialogue[i].cn) return true;
      }
    }
    if (question.options) {
      for (var j = 0; j < question.options.length; j++) {
        if (Utils.getOptionCn(question, question.options[j])) return true;
      }
    }
    if (question.passageParagraphsCn && question.passageParagraphsCn.length) return true;
    return false;
  },

  getSupplementalQuestionCn: function(id) {
    if (typeof SUPPLEMENTAL_TRANSLATIONS === 'undefined' || !SUPPLEMENTAL_TRANSLATIONS.questions) return '';
    return SUPPLEMENTAL_TRANSLATIONS.questions[id] || '';
  },

  getSupplementalOptionCn: function(id, label) {
    if (typeof SUPPLEMENTAL_TRANSLATIONS === 'undefined' || !SUPPLEMENTAL_TRANSLATIONS.options) return '';
    var group = SUPPLEMENTAL_TRANSLATIONS.options[id];
    return group ? (group[label] || '') : '';
  },

  getSupplementalPassageCn: function(id) {
    if (typeof SUPPLEMENTAL_TRANSLATIONS === 'undefined' || !SUPPLEMENTAL_TRANSLATIONS.passages) return '';
    return SUPPLEMENTAL_TRANSLATIONS.passages[id] || '';
  },

  getSupplementalTitleCn: function(id) {
    if (typeof SUPPLEMENTAL_TRANSLATIONS === 'undefined' || !SUPPLEMENTAL_TRANSLATIONS.titles) return '';
    return SUPPLEMENTAL_TRANSLATIONS.titles[id] || '';
  },

  getQuestionCn: function(question) {
    if (!question) return '';
    return question.questionCn || Utils.getSupplementalQuestionCn(question.id);
  },

  getOptionCn: function(question, option) {
    if (!option) return '';
    if (option.cn) return option.cn;
    if (!question || !question.id) return '';
    return Utils.getSupplementalOptionCn(question.id, option.label);
  },

  getSourceCn: function(question) {
    if (!question) return '';
    if (question.sourceCn) return question.sourceCn;
    if (question.direction === 'en2cn' && question.reference) return question.reference;
    return '';
  },

  getReferenceCn: function(question) {
    if (!question) return '';
    if (question.referenceCn) return question.referenceCn;
    if (question.direction === 'cn2en' && question.source) return question.source;
    if (question.direction === 'en2cn' && question.reference) return question.reference;
    return '';
  },

  getTitleCn: function(item) {
    if (!item) return '';
    return item.titleCn || Utils.getSupplementalTitleCn(item.id);
  },

  getPassageParagraphCn: function(item, idx) {
    if (!item) return '';
    if (item.passageParagraphsCn && item.passageParagraphsCn[idx]) return item.passageParagraphsCn[idx];
    return '';
  },

  getPassageCn: function(item) {
    if (!item) return '';
    if (item.passageCn) return item.passageCn;
    return Utils.getSupplementalPassageCn(item.id);
  },

  renderChineseToggle: function(isOpen, onclickName) {
    return '<button class="cn-toggle-btn" type="button" onclick="' + onclickName + '">' +
      (isOpen ? '收起中文' : '显示中文') + '</button>';
  },

  getChineseTogglePosition: function() {
    var fallback = { side: 'right', top: 200 };
    try {
      var raw = localStorage.getItem('degree_english_cn_toggle_pos');
      if (!raw) return fallback;
      var saved = JSON.parse(raw);
      return {
        side: saved && saved.side === 'left' ? 'left' : 'right',
        top: saved && typeof saved.top === 'number' ? saved.top : fallback.top
      };
    } catch (e) {
      return fallback;
    }
  },

  saveChineseTogglePosition: function(pos) {
    try {
      localStorage.setItem('degree_english_cn_toggle_pos', JSON.stringify({
        side: pos && pos.side === 'left' ? 'left' : 'right',
        top: pos && typeof pos.top === 'number' ? pos.top : 200
      }));
    } catch (e) {}
  },

  renderFloatingChineseToggle: function(isOpen, onclickName) {
    var pos = Utils.getChineseTogglePosition();
    var sideStyle = pos.side === 'left' ? 'left:12px;' : 'right:12px;';
    return '<div id="floating-cn-toggle" class="floating-cn-toggle ' + (isOpen ? 'open' : '') + '" style="' + sideStyle + 'top:' + pos.top + 'px;" data-onclick="' + onclickName + '">' +
      '<button class="floating-cn-toggle-btn" type="button">' +
      '<span class="floating-cn-toggle-icon">中</span>' +
      '<span class="floating-cn-toggle-text">' + (isOpen ? '收起中文' : '显示中文') + '</span>' +
      '</button>' +
      '<div class="floating-cn-toggle-tip">可拖动</div>' +
      '</div>';
  },

  initFloatingChineseToggle: function() {
    var root = document.getElementById('floating-cn-toggle');
    if (!root) return;

    var button = root.querySelector('.floating-cn-toggle-btn');
    if (!button) return;

    var moved = false;
    var startX = 0;
    var startY = 0;
    var originLeft = 0;
    var originTop = 0;
    var pointerActive = false;
    var activePointerId = null;

    function getBounds() {
      var rect = root.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        maxLeft: Math.max(12, window.innerWidth - rect.width - 12),
        maxTop: Math.max(88, window.innerHeight - rect.height - 90)
      };
    }

    function applyPosition(left, top) {
      var bounds = getBounds();
      var nextLeft = Math.max(12, Math.min(left, bounds.maxLeft));
      var nextTop = Math.max(88, Math.min(top, bounds.maxTop));
      root.style.left = nextLeft + 'px';
      root.style.right = 'auto';
      root.style.top = nextTop + 'px';
    }

    function persistPosition() {
      var rect = root.getBoundingClientRect();
      var side = rect.left + rect.width / 2 < window.innerWidth / 2 ? 'left' : 'right';
      var payload = {
        side: side,
        top: Math.max(88, Math.round(rect.top))
      };

      if (side === 'left') {
        root.style.left = '12px';
        root.style.right = 'auto';
      } else {
        root.style.right = '12px';
        root.style.left = 'auto';
      }
      root.style.top = payload.top + 'px';
      Utils.saveChineseTogglePosition(payload);
    }

    (function clampInitialPosition() {
      var rect = root.getBoundingClientRect();
      var nextTop = Math.max(88, Math.min(rect.top, Math.max(88, window.innerHeight - rect.height - 90)));
      root.style.top = nextTop + 'px';
    })();

    button.addEventListener('click', function(event) {
      event.stopPropagation();
      if (moved) return;
      var onclickName = root.getAttribute('data-onclick');
      if (onclickName) {
        new Function(onclickName)();
      }
    });

    root.addEventListener('pointerdown', function(event) {
      if (event.target !== button && !button.contains(event.target)) return;
      pointerActive = true;
      activePointerId = event.pointerId;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      var rect = root.getBoundingClientRect();
      originLeft = rect.left;
      originTop = rect.top;
    });

    root.addEventListener('pointermove', function(event) {
      if (!pointerActive || activePointerId !== event.pointerId) return;
      var deltaX = event.clientX - startX;
      var deltaY = event.clientY - startY;
      if (!moved && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        moved = true;
        root.classList.add('dragging');
        if (root.setPointerCapture) {
          try { root.setPointerCapture(event.pointerId); } catch (e) {}
        }
      }
      if (!moved) {
        return;
      }
      event.preventDefault();
      applyPosition(originLeft + deltaX, originTop + deltaY);
    });

    function endDrag(event) {
      if (!pointerActive || (event && activePointerId !== null && event.pointerId !== activePointerId)) return;
      if (root.releasePointerCapture && event && event.pointerId !== undefined && root.classList.contains('dragging')) {
        try { root.releasePointerCapture(event.pointerId); } catch (e) {}
      }
      pointerActive = false;
      activePointerId = null;
      root.classList.remove('dragging');
      if (moved) {
        persistPosition();
        setTimeout(function() { moved = false; }, 0);
      } else {
        moved = false;
      }
    }

    root.addEventListener('pointerup', endDrag);
    root.addEventListener('pointercancel', endDrag);
  },

  // Create element
  createElement: function(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(key) {
        if (key === 'className') el.className = attrs[key];
        else if (key === 'innerHTML') el.innerHTML = attrs[key];
        else if (key === 'textContent') el.textContent = attrs[key];
        else if (key.indexOf('on') === 0) el.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        else el.setAttribute(key, attrs[key]);
      });
    }
    if (children) {
      if (typeof children === 'string') el.innerHTML = children;
      else if (Array.isArray(children)) children.forEach(function(c) { if (c) el.appendChild(c); });
      else el.appendChild(children);
    }
    return el;
  }
};
