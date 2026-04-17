/* ===== 阅读理解练习 ===== */
var ReadingPage = (function() {
  var passages = [];
  var currentPassageIndex = 0;
  var currentQuestionIndex = 0;
  var answered = false;
  var results = [];
  var startTime = 0;

  function init() {
    passages = READING_QUESTIONS.slice();
    currentPassageIndex = 0;
    results = [];
    startTime = Date.now();
    // Select random passage
    if (passages.length > 1) {
      passages = [passages[Math.floor(Math.random() * passages.length)]];
    }
    currentQuestionIndex = 0;
    answered = false;
    render();
  }

  function render() {
    var container = document.getElementById('page-container');
    if (currentPassageIndex >= passages.length) {
      renderReport();
      return;
    }

    var passage = passages[currentPassageIndex];
    var q = passage.questions[currentQuestionIndex];

    var html = '<div class="page-header"><h2>阅读理解</h2>';
    html += '<p>' + passage.title + ' · 第 ' + (currentQuestionIndex + 1) + ' / ' + passage.questions.length + ' 题</p></div>';

    // Passage
    html += '<div class="audio-actions">' + Utils.renderSpeakButton(passage.passageParagraphs.join(' '), '朗读短文') + '</div>';
    html += '<div class="passage-text">';
    passage.passageParagraphs.forEach(function(p) {
      html += '<p style="margin-bottom:12px;">' + Utils.escapeHtml(p) + '</p>';
    });
    html += '</div>';

    // Question
    html += '<div class="question-card">';
    html += Coach.renderGuide('reading', q);
    html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.question, '朗读题目') + '</div>';
    html += '<div class="question-text">' + Utils.escapeHtml(q.question) + '</div>';
    html += '<div class="options-list">';
    q.options.forEach(function(opt) {
      html += '<button class="option-btn" data-label="' + opt.label + '" onclick="ReadingPage.answer(\'' + opt.label + '\')">';
      html += '<span class="option-label">' + opt.label + '</span><span class="option-content"><span>' + Utils.escapeHtml(opt.text) + '</span>' + Utils.renderInlineSpeakButton(opt.text, '朗读选项') + '</span></button>';
    });
    html += '</div></div>';

    container.innerHTML = html;
  }

  function answer(label) {
    if (answered) return;
    answered = true;

    var passage = passages[currentPassageIndex];
    var q = passage.questions[currentQuestionIndex];
    var isCorrect = label === q.answer;

    Store.recordAnswer(q.id, 'reading', '', label, q.answer, isCorrect);
    results.push({ correct: isCorrect });

    // Visual feedback
    document.querySelectorAll('.option-btn').forEach(function(btn) {
      var l = btn.getAttribute('data-label');
      if (l === q.answer) btn.classList.add('correct');
      else if (l === label && !isCorrect) btn.classList.add('wrong');
      btn.classList.add('disabled');
    });

    var card = document.querySelector('.question-card');
    if (card) {
      var html = '<div class="feedback ' + (isCorrect ? 'correct' : 'wrong') + '">';
      html += '<div class="feedback-title">' + (isCorrect ? '回答正确！' : '答案有误') + '</div>';
      html += '<div class="feedback-text">' + Utils.escapeHtml(q.explanation) + '</div>';
      html += Coach.renderAfterAnswer('reading', q);
      html += '</div>';
      var isLast = currentQuestionIndex >= passage.questions.length - 1;
      html += '<div class="text-center mt-16"><button class="btn btn-primary" onclick="ReadingPage.next()">' + (isLast ? '查看报告' : '下一题') + '</button></div>';

      var div = document.createElement('div');
      div.innerHTML = html;
      while (div.firstChild) card.appendChild(div.firstChild);
    }
  }

  function next() {
    var passage = passages[currentPassageIndex];
    currentQuestionIndex++;
    answered = false;

    if (currentQuestionIndex >= passage.questions.length) {
      currentPassageIndex++;
      currentQuestionIndex = 0;
      if (currentPassageIndex >= passages.length) {
        renderReport();
        return;
      }
    }
    render();
  }

  function renderReport() {
    var container = document.getElementById('page-container');
    var correctCount = results.filter(function(r) { return r.correct; }).length;
    var accuracy = results.length > 0 ? Math.round(correctCount / results.length * 100) : 0;
    var duration = Math.round((Date.now() - startTime) / 1000);

    Store.recordPractice('reading', results.length, correctCount, duration);

    container.innerHTML = '<div class="card report-card">' +
      '<div class="report-score ' + (accuracy >= 60 ? 'pass' : 'fail') + '">' + accuracy + '%</div>' +
      '<p class="text-secondary mb-16">阅读理解 · 练习报告</p>' +
      '<div class="report-detail">' +
      '<div class="report-item"><div class="report-item-value text-success">' + correctCount + '</div><div class="report-item-label">答对</div></div>' +
      '<div class="report-item"><div class="report-item-value text-error">' + (results.length - correctCount) + '</div><div class="report-item-label">答错</div></div>' +
      '<div class="report-item"><div class="report-item-value text-primary">' + Utils.formatDuration(duration) + '</div><div class="report-item-label">用时</div></div>' +
      '</div>' +
      '<div class="report-actions">' +
      '<a href="#/practice/reading" class="btn btn-primary" onclick="ReadingPage.init()">再练一篇</a>' +
      '<a href="#/wrong-book" class="btn btn-outline">查看错题</a>' +
      '</div></div>';
  }

  return { init: init, answer: answer, next: next };
})();
