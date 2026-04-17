/* ===== 完形填空练习 ===== */
var ClozePage = (function() {
  var passages = [];
  var currentPassageIdx = 0;
  var currentBlankIdx = 0;
  var answered = false;
  var results = [];
  var startTime = 0;

  function init() {
    passages = CLOZE_QUESTIONS.slice();
    if (passages.length > 1) {
      passages = [passages[Math.floor(Math.random() * passages.length)]];
    }
    currentPassageIdx = 0;
    currentBlankIdx = 0;
    answered = false;
    results = [];
    startTime = Date.now();
    render();
  }

  function render() {
    var container = document.getElementById('page-container');

    if (currentPassageIdx >= passages.length || !passages.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><h3>暂无完形填空题目</h3></div>';
      return;
    }

    var passage = passages[currentPassageIdx];

    // If all blanks done, show report
    if (currentBlankIdx >= passage.blanks.length) {
      renderReport();
      return;
    }

    var html = '<div class="page-header"><h2>完形填空</h2>';
    html += '<p>' + passage.title + ' · 第 ' + (currentBlankIdx + 1) + ' / ' + passage.blanks.length + ' 空</p></div>';

    // Passage with blanks
    html += '<div class="passage-text">';
    var parts = passage.passageParts;
    var blankCounter = 0;
    parts.forEach(function(part, idx) {
      html += Utils.escapeHtml(part.text);
      if (part.blank && blankCounter < passage.blanks.length) {
        if (blankCounter === currentBlankIdx) {
          html += '<span class="dialog-blank">(' + (blankCounter + 1) + ')______</span>';
        } else {
          // Show previously answered or blank
          var answeredBlank = null;
          for (var i = 0; i < results.length; i++) {
            if (results[i].blankIndex === blankCounter) {
              answeredBlank = results[i];
              break;
            }
          }
          if (answeredBlank) {
            html += '<span style="color:var(--success);font-weight:600;">' + Utils.escapeHtml(answeredBlank.userAnswer) + '</span>';
          } else {
            html += '<span style="color:var(--text-light);">(' + (blankCounter + 1) + ')______</span>';
          }
        }
        blankCounter++;
      }
    });
    html += '</div>';

    // Current blank options
    var blank = passage.blanks[currentBlankIdx];
    html += '<div class="question-card">';
    html += Coach.renderGuide('cloze', blank);
    html += '<div class="question-text">第 ' + (currentBlankIdx + 1) + ' 空应填入：</div>';
    html += '<div class="options-list">';
    blank.options.forEach(function(opt) {
      html += '<button class="option-btn" data-label="' + opt.label + '" onclick="ClozePage.answer(\'' + opt.label + '\')">';
      html += '<span class="option-label">' + opt.label + '</span><span class="option-content"><span>' + Utils.escapeHtml(opt.text) + '</span>' + Utils.renderInlineSpeakButton(opt.text, '朗读选项') + '</span></button>';
    });
    html += '</div></div>';

    container.innerHTML = html;
  }

  function answer(label) {
    if (answered) return;
    answered = true;

    var passage = passages[currentPassageIdx];
    var blank = passage.blanks[currentBlankIdx];
    var isCorrect = label === blank.answer;

    Store.recordAnswer('cloze_' + passage.id + '_' + blank.index, 'cloze', '', label, blank.answer, isCorrect);
    results.push({ blankIndex: currentBlankIdx, correct: isCorrect, userAnswer: label });

    document.querySelectorAll('.option-btn').forEach(function(btn) {
      var l = btn.getAttribute('data-label');
      if (l === blank.answer) btn.classList.add('correct');
      else if (l === label && !isCorrect) btn.classList.add('wrong');
      btn.classList.add('disabled');
    });

    var card = document.querySelector('.question-card');
    if (card) {
      var html = '<div class="feedback ' + (isCorrect ? 'correct' : 'wrong') + '">';
      html += '<div class="feedback-title">' + (isCorrect ? '回答正确！' : '答案有误') + '</div>';
      html += '<div class="feedback-text">' + Utils.escapeHtml(blank.explanation) + '</div>';
      html += Coach.renderAfterAnswer('cloze', blank);
      html += '</div>';
      var isLast = currentBlankIdx >= passage.blanks.length - 1;
      html += '<div class="text-center mt-16"><button class="btn btn-primary" onclick="ClozePage.next()">' + (isLast ? '查看报告' : '下一空') + '</button></div>';

      var div = document.createElement('div');
      div.innerHTML = html;
      while (div.firstChild) card.appendChild(div.firstChild);
    }
  }

  function next() {
    currentBlankIdx++;
    answered = false;
    render();
  }

  function renderReport() {
    var container = document.getElementById('page-container');
    var correctCount = results.filter(function(r) { return r.correct; }).length;
    var accuracy = results.length > 0 ? Math.round(correctCount / results.length * 100) : 0;
    var duration = Math.round((Date.now() - startTime) / 1000);

    Store.recordPractice('cloze', results.length, correctCount, duration);

    container.innerHTML = '<div class="card report-card">' +
      '<div class="report-score ' + (accuracy >= 50 ? 'pass' : 'fail') + '">' + accuracy + '%</div>' +
      '<p class="text-secondary mb-16">完形填空 · 练习报告</p>' +
      '<div class="report-detail">' +
      '<div class="report-item"><div class="report-item-value text-success">' + correctCount + '</div><div class="report-item-label">答对</div></div>' +
      '<div class="report-item"><div class="report-item-value text-error">' + (results.length - correctCount) + '</div><div class="report-item-label">答错</div></div>' +
      '<div class="report-item"><div class="report-item-value text-primary">' + Utils.formatDuration(duration) + '</div><div class="report-item-label">用时</div></div>' +
      '</div>' +
      '<div class="report-actions">' +
      '<a href="#/practice/cloze" class="btn btn-primary" onclick="ClozePage.init()">再练一篇</a>' +
      '<a href="#/wrong-book" class="btn btn-outline">查看错题</a>' +
      '</div></div>';
  }

  return { init: init, answer: answer, next: next };
})();
