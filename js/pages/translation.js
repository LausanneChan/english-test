/* ===== 翻译练习 ===== */
var TranslationPage = (function() {
  var questions = [];
  var currentIndex = 0;
  var showingReference = false;
  var results = [];
  var currentDirection = 'all';
  var showChinese = false;

  function init(direction) {
    currentDirection = direction || 'all';
    questions = TRANSLATION_QUESTIONS.slice();
    if (direction && direction !== 'all') {
      questions = questions.filter(function(q) { return q.direction === direction; });
    }
    questions = Utils.shuffle(questions);
    currentIndex = 0;
    showingReference = false;
    results = [];
    showChinese = false;
    render();
  }

  function render() {
    var container = document.getElementById('page-container');

    if (!questions.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><h3>暂无翻译题目</h3></div>';
      return;
    }

    if (currentIndex >= questions.length) {
      renderReport();
      return;
    }

    var q = questions[currentIndex];
    var isEn2Cn = q.direction === 'en2cn';
    var dirLabel = isEn2Cn ? '英译汉' : '汉译英';

    var html = '<div class="page-header"><h2>翻译练习</h2>';
    html += '<p>' + dirLabel + ' · 第 ' + (currentIndex + 1) + ' / ' + questions.length + ' 题</p></div>';

    // Direction tabs
    html += '<div class="tab-bar mb-16">';
    html += '<button class="tab-btn' + (currentDirection === 'all' ? ' active' : '') + '" onclick="TranslationPage.init(\'all\')">全部</button>';
    html += '<button class="tab-btn' + (currentDirection === 'en2cn' ? ' active' : '') + '" onclick="TranslationPage.init(\'en2cn\')">英译汉</button>';
    html += '<button class="tab-btn' + (currentDirection === 'cn2en' ? ' active' : '') + '" onclick="TranslationPage.init(\'cn2en\')">汉译英</button>';
    html += '</div>';

    html += '<div class="question-card">';
    html += Coach.renderGuide('translation', q);
    if (isEn2Cn) {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.source, '朗读英文') + '</div>';
    } else {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.reference, '朗读参考英文') + '</div>';
    }

    // Source text
    html += '<div class="translation-source">' + Utils.escapeHtml(q.source) + '</div>';
    if (showChinese && Utils.getSourceCn(q) && Utils.getSourceCn(q) !== q.source) {
      html += '<div class="cn-block">' + Utils.escapeHtml(Utils.getSourceCn(q)) + '</div>';
    }

    // Hints
    if (q.hints && q.hints.length > 0) {
      html += '<div class="translation-hints">';
      html += '<span style="font-size:0.85rem;color:var(--text-secondary);">提示：</span>';
      q.hints.forEach(function(h) {
        html += '<span class="hint-tag">' + Utils.escapeHtml(h) + '</span>';
      });
      html += '</div>';
    }

    // Show / hide reference
    if (showingReference) {
      html += '<div class="translation-reference">';
      html += '<p><strong>参考答案：</strong>' + Utils.escapeHtml(q.reference) + '</p>';
      html += '</div>';
      if (showChinese && Utils.getReferenceCn(q) && Utils.getReferenceCn(q) !== q.reference) {
        html += '<div class="cn-block">' + Utils.escapeHtml(Utils.getReferenceCn(q)) + '</div>';
      }
      html += Coach.renderAfterAnswer('translation', q);

      // Self evaluation
      html += '<p class="mt-16 text-secondary" style="font-size:0.9rem;">你觉得自己的翻译如何？</p>';
      html += '<div class="self-eval-btns">';
      html += '<button class="btn btn-success" onclick="TranslationPage.selfEval(true)">我翻译对了</button>';
      html += '<button class="btn btn-error" onclick="TranslationPage.selfEval(false)">还得多练</button>';
      html += '</div>';
    } else {
      html += '<div class="text-center mt-16">';
      html += '<p class="text-secondary mb-16" style="font-size:0.9rem;">先在心里想想怎么翻译，然后点击查看参考答案</p>';
      html += '<button class="btn btn-primary btn-lg" onclick="TranslationPage.showRef()">查看参考答案</button>';
      html += '</div>';
    }

    html += '</div>';

    if (Utils.hasChineseTranslation(q)) {
      html += Utils.renderFloatingChineseToggle(showChinese, 'TranslationPage.toggleChinese()');
    }

    container.innerHTML = html;
    Utils.initFloatingChineseToggle();
  }

  function showRef() {
    showingReference = true;
    render();
  }

  function selfEval(correct) {
    var q = questions[currentIndex];
    Store.recordAnswer(q.id, 'translation', q.direction, correct ? 'pass' : 'fail', q.reference, correct);
    results.push({ correct: correct });

    showingReference = false;
    currentIndex++;
    render();
  }

  function toggleChinese() {
    showChinese = !showChinese;
    render();
  }

  function renderReport() {
    var container = document.getElementById('page-container');
    var correctCount = results.filter(function(r) { return r.correct; }).length;
    var accuracy = results.length > 0 ? Math.round(correctCount / results.length * 100) : 0;
    Store.recordPractice('translation', results.length, correctCount, 0);

    container.innerHTML = '<div class="card report-card">' +
      '<div class="report-score ' + (accuracy >= 50 ? 'pass' : 'fail') + '">' + accuracy + '%</div>' +
      '<p class="text-secondary mb-16">翻译练习 · 练习报告</p>' +
      '<div class="report-detail">' +
      '<div class="report-item"><div class="report-item-value text-success">' + correctCount + '</div><div class="report-item-label">翻译正确</div></div>' +
      '<div class="report-item"><div class="report-item-value text-error">' + (results.length - correctCount) + '</div><div class="report-item-label">需加强</div></div>' +
      '</div>' +
      '<div class="report-actions">' +
      '<a href="#/practice/translation" class="btn btn-primary" onclick="TranslationPage.init()">再练一轮</a>' +
      '<a href="#/wrong-book" class="btn btn-outline">查看错题</a>' +
      '</div></div>';
  }

  return { init: init, showRef: showRef, selfEval: selfEval, toggleChinese: toggleChinese };
})();
