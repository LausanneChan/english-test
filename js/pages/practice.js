/* ===== 通用练习引擎 ===== */
var PracticePage = (function() {
  var questions = [];
  var currentIndex = 0;
  var results = [];
  var startTime = 0;
  var answered = false;
  var currentType = '';
  var tags = [];
  var selectedTag = 'all';
  var showChinese = false;

  function init(type) {
    currentType = type;
    questions = [];
    currentIndex = 0;
    results = [];
    answered = false;
    selectedTag = 'all';
    showChinese = false;

    if (type === 'conversation') {
      questions = CONVERSATION_QUESTIONS.slice();
    } else if (type === 'vocab-grammar') {
      questions = VOCAB_GRAMMAR_QUESTIONS.slice();
      // Get unique tags
      tags = [];
      var tagSet = {};
      questions.forEach(function(q) {
        if (!tagSet[q.tag]) { tagSet[q.tag] = true; tags.push(q.tag); }
      });
    }

    questions = Utils.shuffle(questions);
    startTime = Date.now();
    render();
  }

  function render() {
    var container = document.getElementById('page-container');
    var typeNames = {
      'conversation': '交际用语练习',
      'vocab-grammar': '词汇与语法练习'
    };
    var typeName = typeNames[currentType] || '练习';

    if (questions.length === 0) {
      container.innerHTML = '<div class="page-header"><h2>' + typeName + '</h2></div>' +
        '<div class="empty-state"><div class="empty-state-icon">📭</div>' +
        '<h3>暂无题目</h3><p>题目数据加载中...</p></div>';
      return;
    }

    // If practice is complete, show report
    if (currentIndex >= questions.length) {
      renderReport();
      return;
    }

    var q = questions[currentIndex];
    var html = '<div class="page-header"><h2>' + typeName + '</h2></div>';

    // Tag filter (only for vocab-grammar)
    if (currentType === 'vocab-grammar' && currentIndex === 0) {
      html += '<div class="wrong-filters mb-16">';
      html += '<button class="filter-btn active" onclick="PracticePage.filterByTag(\'all\')">全部</button>';
      tags.forEach(function(tag) {
        html += '<button class="filter-btn" onclick="PracticePage.filterByTag(\'' + tag + '\')">' + tag + '</button>';
      });
      html += '</div>';
    }

    // Progress bar
    var correctCount = results.filter(function(r) { return r.correct; }).length;
    html += '<div class="practice-progress">';
    html += '<span class="practice-progress-text">第 ' + (currentIndex + 1) + ' / ' + questions.length + ' 题</span>';
    html += '<div class="practice-progress-bar progress-bar"><div class="progress-fill" style="width:' + (currentIndex / questions.length * 100) + '%"></div></div>';
    html += '</div>';

    // Question card
    html += '<div class="question-card">';

    // Tag display
    if (q.tag) {
      html += '<div class="question-tag"><span class="tag tag-primary">' + q.tag + '</span></div>';
    }

    html += Coach.renderGuide(q.type === 'vocab_grammar' ? 'vocab_grammar' : q.type, q);

    // Question content
    if (q.dialogue) {
      // Conversation type
      var dialogueText = q.dialogue.map(function(line, idx) {
        return idx === q.blankIndex ? '' : line.text;
      }).join(' ');
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(dialogueText, '朗读对话') + '</div>';
      html += '<div class="dialogue-box">';
      q.dialogue.forEach(function(line, idx) {
        if (idx === q.blankIndex) {
          html += '<div class="dialogue-line"><span class="dialogue-speaker">' + line.speaker + ':</span> <span class="dialog-blank">______</span></div>';
        } else {
          html += '<div class="dialogue-line"><span class="dialogue-speaker">' + line.speaker + ':</span> ' + Utils.escapeHtml(line.text) + '</div>';
        }
        if (showChinese && line.cn) {
          html += '<div class="cn-line">' + Utils.escapeHtml(line.cn) + '</div>';
        }
      });
      html += '</div>';
    } else {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.question, '朗读题干') + '</div>';
      html += '<div class="question-text">' + Utils.escapeHtml(q.question) + '</div>';
      if (showChinese && Utils.getQuestionCn(q)) {
        html += '<div class="cn-block">' + Utils.escapeHtml(Utils.getQuestionCn(q)) + '</div>';
      }
    }

    // Options
    html += '<div class="options-list">';
    q.options.forEach(function(opt) {
      html += '<button class="option-btn" data-label="' + opt.label + '" onclick="PracticePage.selectAnswer(\'' + opt.label + '\')">';
      html += '<span class="option-label">' + opt.label + '</span>';
      html += '<span class="option-content">';
      html += '<span><span>' + Utils.escapeHtml(opt.text) + '</span>' +
        (showChinese && Utils.getOptionCn(q, opt) ? '<div class="option-cn">' + Utils.escapeHtml(Utils.getOptionCn(q, opt)) + '</div>' : '') +
        '</span>';
      html += Utils.renderInlineSpeakButton(opt.text, '朗读选项');
      html += '</span>';
      html += '</button>';
    });
    html += '</div>';

    html += '</div>'; // question-card

    // Score display
    html += '<div class="practice-footer">';
    html += '<span class="practice-score">已答对 <strong>' + correctCount + '</strong> / ' + results.length + ' 题</span>';
    html += '</div>';

    if (Utils.hasChineseTranslation(q)) {
      html += Utils.renderFloatingChineseToggle(showChinese, 'PracticePage.toggleChinese()');
    }

    container.innerHTML = html;
    Utils.initFloatingChineseToggle();
  }

  function selectAnswer(label) {
    if (answered) return;
    answered = true;

    var q = questions[currentIndex];
    var isCorrect = label === q.answer;

    // Record answer
    Store.recordAnswer(q.id, q.type, q.tag || '', label, q.answer, isCorrect);
    results.push({ questionId: q.id, correct: isCorrect, userAnswer: label });
    updateWrongBadge();

    // Visual feedback
    var btns = document.querySelectorAll('.option-btn');
    btns.forEach(function(btn) {
      var btnLabel = btn.getAttribute('data-label');
      if (btnLabel === q.answer) {
        btn.classList.add('correct');
      } else if (btnLabel === label && !isCorrect) {
        btn.classList.add('wrong');
      }
      btn.classList.add('disabled');
    });

    // Show feedback
    var feedbackHtml = '<div class="feedback ' + (isCorrect ? 'correct' : 'wrong') + '">';
    feedbackHtml += '<div class="feedback-title">' + (isCorrect ? '回答正确！' : '答案有误') + '</div>';
    feedbackHtml += '<div class="feedback-text">' + Utils.escapeHtml(q.explanation) + '</div>';
    if (q.rule && !isCorrect) {
      feedbackHtml += '<div class="feedback-rule">考点：' + Utils.escapeHtml(q.rule) + '</div>';
    }
    if (q.tips) {
      feedbackHtml += '<div class="feedback-rule">' + Utils.escapeHtml(q.tips) + '</div>';
    }
    feedbackHtml += Coach.renderAfterAnswer(q.type === 'vocab_grammar' ? 'vocab_grammar' : q.type, q);
    feedbackHtml += '</div>';

    // Next button
    var isLast = currentIndex >= questions.length - 1;
    feedbackHtml += '<div class="text-center mt-16">';
    feedbackHtml += '<button class="btn btn-primary" onclick="PracticePage.next()">' + (isLast ? '查看报告' : '下一题') + '</button>';
    feedbackHtml += '</div>';

    var card = document.querySelector('.question-card');
    if (card) {
      var div = document.createElement('div');
      div.innerHTML = feedbackHtml;
      while (div.firstChild) card.appendChild(div.firstChild);
    }
  }

  function next() {
    currentIndex++;
    answered = false;
    if (currentIndex >= questions.length) {
      renderReport();
    } else {
      render();
    }
  }

  function renderReport() {
    var container = document.getElementById('page-container');
    var duration = Math.round((Date.now() - startTime) / 1000);
    var correctCount = results.filter(function(r) { return r.correct; }).length;
    var accuracy = results.length > 0 ? Math.round(correctCount / results.length * 100) : 0;
    var historyType = currentType === 'vocab-grammar' ? 'vocab_grammar' : currentType;

    // Record practice
    Store.recordPractice(historyType, results.length, correctCount, duration);

    var typeNames = { 'conversation': '交际用语', 'vocab-grammar': '词汇与语法' };
    var typeName = typeNames[currentType] || '练习';

    var html = '<div class="card report-card">';
    html += '<div class="report-score ' + (accuracy >= 60 ? 'pass' : 'fail') + '">' + accuracy + '%</div>';
    html += '<p class="text-secondary mb-16">' + typeName + ' · 本次练习报告</p>';
    html += '<div class="report-detail">';
    html += '<div class="report-item"><div class="report-item-value text-success">' + correctCount + '</div><div class="report-item-label">答对</div></div>';
    html += '<div class="report-item"><div class="report-item-value text-error">' + (results.length - correctCount) + '</div><div class="report-item-label">答错</div></div>';
    html += '<div class="report-item"><div class="report-item-value text-primary">' + Utils.formatDuration(duration) + '</div><div class="report-item-label">用时</div></div>';
    html += '</div>';

    if (accuracy >= 80) {
      html += '<p class="text-success">表现不错！继续保持！</p>';
    } else if (accuracy >= 60) {
      html += '<p class="text-primary">还不错，再做几轮巩固一下。</p>';
    } else {
      html += '<p class="text-warning">多看看错题解析，再来一次会更好的。</p>';
    }

    html += '<div class="report-actions">';
    html += '<a href="#/practice/' + currentType + '" class="btn btn-primary" onclick="PracticePage.init(\'' + currentType + '\')">再练一轮</a>';
    html += '<a href="#/wrong-book" class="btn btn-outline">查看错题</a>';
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
  }

  function filterByTag(tag) {
    selectedTag = tag;
    if (currentType === 'vocab-grammar') {
      if (tag === 'all') {
        questions = VOCAB_GRAMMAR_QUESTIONS.slice();
      } else {
        questions = VOCAB_GRAMMAR_QUESTIONS.filter(function(q) { return q.tag === tag; });
      }
    }
    questions = Utils.shuffle(questions);
    currentIndex = 0;
    results = [];
    answered = false;
    showChinese = false;
    startTime = Date.now();
    render();
  }

  function toggleChinese() {
    showChinese = !showChinese;
    render();
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

  return {
    init: init,
    selectAnswer: selectAnswer,
    next: next,
    filterByTag: filterByTag,
    toggleChinese: toggleChinese
  };
})();
