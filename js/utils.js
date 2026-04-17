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
