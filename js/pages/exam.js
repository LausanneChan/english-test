/* ===== 模拟考试 ===== */
var ExamPage = (function() {
  var questions = [];
  var currentIndex = 0;
  var answers = {};
  var answered = false;
  var timer = null;
  var timeLeft = 0;
  var examStarted = false;
  var examMode = 'view'; // view / result
  var showChinese = false;

  function render() {
    var container = document.getElementById('page-container');

    if (!examStarted) {
      renderStart();
      return;
    }

    if (examMode === 'result') {
      renderResult();
      return;
    }

    renderQuestion();
  }

  function renderStart() {
    var container = document.getElementById('page-container');
    var html = '<div class="page-header"><h2>模拟考试</h2></div>';

    html += '<div class="card" style="text-align:center;padding:40px 20px;">';
    html += '<h3 style="font-size:1.3rem;margin-bottom:16px;">国开广东学位英语模拟考试</h3>';
    html += '<div style="font-size:0.9rem;color:var(--text-secondary);line-height:2;">';
    html += '<p>交际用语 10题 / 10分</p>';
    html += '<p>词汇语法 30题 / 30分</p>';
    html += '<p>阅读理解 5题 / 10分（精选）</p>';
    html += '<p>翻译 10题 / 20分</p>';
    html += '<p style="color:var(--text-light);">共 55题，满分 70分，42分及格（60%）</p>';
    html += '</div>';
    html += '<div class="mt-24"><button class="btn btn-primary btn-lg" onclick="ExamPage.start()">开始考试</button></div>';
    html += '</div>';

    // Previous exam history
    var data = Store.load();
    if (data.examHistory.length > 0) {
      html += '<div class="card mt-16"><div class="card-header"><span class="card-title">历史成绩</span></div>';
      data.examHistory.slice(-5).reverse().forEach(function(exam) {
        var score = exam.totalScore;
        html += '<div class="flex-between" style="padding:8px 0;border-bottom:1px solid var(--bg);">';
        html += '<span class="text-secondary">' + exam.date + '</span>';
        html += '<span class="' + (score >= 42 ? 'text-success' : 'text-error') + '" style="font-weight:600;">' + score + '分</span>';
        html += '</div>';
      });
      html += '</div>';
    }

    container.innerHTML = html;
  }

  function start() {
    examStarted = true;
    examMode = 'view';
    answers = {};
    currentIndex = 0;
    answered = false;
    timeLeft = 90 * 60; // 90 minutes
    showChinese = false;

    // Build question set
    questions = [];
    // 10 conversation
    questions = questions.concat(Utils.shuffle(CONVERSATION_QUESTIONS).slice(0, 10).map(function(q) {
      return Object.assign({}, q, { _examType: 'conversation', _examScore: 1 });
    }));
    // 30 vocab grammar
    questions = questions.concat(Utils.shuffle(VOCAB_GRAMMAR_QUESTIONS).slice(0, 30).map(function(q) {
      return Object.assign({}, q, { _examType: 'vocab_grammar', _examScore: 1 });
    }));
    // 5 reading (from one passage)
    if (READING_QUESTIONS.length > 0) {
      var rp = READING_QUESTIONS[Math.floor(Math.random() * READING_QUESTIONS.length)];
      questions = questions.concat(Utils.shuffle(rp.questions).slice(0, 5).map(function(q) {
        return Object.assign({}, q, { _examType: 'reading', _examScore: 2, _passageTitle: rp.title, _passageParagraphs: rp.passageParagraphs, _passageParagraphsCn: rp.passageParagraphsCn });
      }));
    }
    // 10 translation (5 en2cn + 5 cn2en)
    var en2cn = Utils.shuffle(TRANSLATION_QUESTIONS.filter(function(q) { return q.direction === 'en2cn'; })).slice(0, 5);
    var cn2en = Utils.shuffle(TRANSLATION_QUESTIONS.filter(function(q) { return q.direction === 'cn2en'; })).slice(0, 5);
    questions = questions.concat(en2cn.map(function(q) {
      return Object.assign({}, q, { _examType: 'translation', _examScore: 2 });
    }));
    questions = questions.concat(cn2en.map(function(q) {
      return Object.assign({}, q, { _examType: 'translation', _examScore: 2 });
    }));

    // Start timer
    if (timer) clearInterval(timer);
    timer = setInterval(function() {
      timeLeft--;
      var timerEl = document.getElementById('exam-timer');
      if (timerEl) {
        timerEl.textContent = Utils.formatTimer(timeLeft);
        timerEl.className = 'exam-timer' + (timeLeft < 600 ? ' danger' : (timeLeft < 1800 ? ' warning' : ''));
      }
      if (timeLeft <= 0) {
        clearInterval(timer);
        finishExam();
      }
    }, 1000);

    render();
  }

  function renderQuestion() {
    var container = document.getElementById('page-container');

    if (currentIndex >= questions.length) {
      finishExam();
      return;
    }

    var q = questions[currentIndex];
    var typeLabels = {
      'conversation': '交际用语',
      'vocab_grammar': '词汇语法',
      'reading': '阅读理解',
      'translation': '翻译'
    };

    var html = '';

    // Header
    html += '<div class="exam-header">';
    html += '<span class="exam-timer" id="exam-timer">' + Utils.formatTimer(timeLeft) + '</span>';
    html += '<span class="text-secondary" style="font-size:0.85rem;">第 ' + (currentIndex + 1) + ' / ' + questions.length + ' 题</span>';
    html += '<button class="btn btn-sm btn-primary" onclick="ExamPage.finishExam()">交卷</button>';
    html += '</div>';

    // Answer sheet
    html += '<div class="answer-sheet">';
    questions.forEach(function(qq, idx) {
      var cls = 'answer-sheet-item';
      if (answers[qq.id]) cls += ' answered';
      if (idx === currentIndex) cls += ' current';
      html += '<button class="' + cls + '" onclick="ExamPage.goTo(' + idx + ')">' + (idx + 1) + '</button>';
    });
    html += '</div>';

    // Question type label
    html += '<span class="tag tag-primary mb-8">' + typeLabels[q._examType] + '</span>';
    // Passage for reading
    if (q._examType === 'reading' && q._passageParagraphs) {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q._passageParagraphs.join(' '), '朗读短文') + '</div>';
      html += '<div class="passage-text">';
      q._passageParagraphs.forEach(function(p, idx) {
        html += '<p style="margin-bottom:8px;">' + Utils.escapeHtml(p) + '</p>';
        if (showChinese && q._passageParagraphsCn && q._passageParagraphsCn[idx]) {
          html += '<div class="cn-line mb-8">' + Utils.escapeHtml(q._passageParagraphsCn[idx]) + '</div>';
        }
      });
      html += '</div>';
    }

    html += '<div class="question-card">';

    // Question content
    if (q.dialogue) {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.dialogue.map(function(line) { return line.text; }).join(' '), '朗读对话') + '</div>';
      html += '<div class="dialogue-box">';
      q.dialogue.forEach(function(line, idx) {
        if (idx === q.blankIndex) {
          html += '<div class="dialogue-line"><span class="dialogue-speaker">' + line.speaker + ':</span> <span class="dialog-blank">______</span></div>';
        } else {
          html += '<div class="dialogue-line"><span class="dialogue-speaker">' + line.speaker + ':</span> ' + Utils.escapeHtml(line.text) + '</div>';
        }
      });
      html += '</div>';
    } else if (q._examType === 'translation') {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.direction === 'en2cn' ? q.source : q.reference, '朗读英文') + '</div>';
      html += '<div class="translation-source">' + Utils.escapeHtml(q.source) + '</div>';
      if (showChinese && Utils.getSourceCn(q)) {
        html += '<div class="cn-block">' + Utils.escapeHtml(Utils.getSourceCn(q)) + '</div>';
      }
      if (q.hints) {
        html += '<div class="translation-hints">';
        q.hints.forEach(function(h) { html += '<span class="hint-tag">' + Utils.escapeHtml(h) + '</span>'; });
        html += '</div>';
      }
      html += '<div class="text-center mt-16"><p class="text-secondary mb-8">先想好翻译，点击查看参考答案</p>';
      html += '<button class="btn btn-outline" onclick="ExamPage.showTranslationRef()">查看参考</button></div>';
      html += '<div id="trans-ref" class="hidden"><div class="translation-reference mt-16"><p>' + Utils.escapeHtml(q.reference) + '</p></div>';
      if (showChinese && Utils.getReferenceCn(q) && Utils.getReferenceCn(q) !== q.reference) {
        html += '<div class="cn-block">' + Utils.escapeHtml(Utils.getReferenceCn(q)) + '</div>';
      }
      html += '<div class="self-eval-btns mt-8"><button class="btn btn-success btn-sm" onclick="ExamPage.transEval(true)">翻译对了</button>';
      html += '<button class="btn btn-error btn-sm" onclick="ExamPage.transEval(false)">翻译错了</button></div></div>';
    } else {
      html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.question, '朗读题目') + '</div>';
      html += '<div class="question-text">' + Utils.escapeHtml(q.question) + '</div>';
      if (showChinese && Utils.getQuestionCn(q)) {
        html += '<div class="cn-block">' + Utils.escapeHtml(Utils.getQuestionCn(q)) + '</div>';
      }
    }

    // Options (for non-translation)
    if (q._examType !== 'translation' && q.options) {
      html += '<div class="options-list">';
      q.options.forEach(function(opt) {
        var answeredClass = answers[q.id] === opt.label ? ' selected' : '';
        html += '<button class="option-btn' + answeredClass + '" data-label="' + opt.label + '" onclick="ExamPage.selectAnswer(\'' + opt.label + '\')">';
        html += '<span class="option-label">' + opt.label + '</span><span class="option-content"><span><span>' + Utils.escapeHtml(opt.text) + '</span>' + (showChinese && Utils.getOptionCn(q, opt) ? '<div class="option-cn">' + Utils.escapeHtml(Utils.getOptionCn(q, opt)) + '</div>' : '') + '</span>' + Utils.renderInlineSpeakButton(opt.text, '朗读选项') + '</span></button>';
      });
      html += '</div>';
    }

    // Navigation
    html += '<div class="flex-between mt-24">';
    html += '<button class="btn btn-outline" ' + (currentIndex === 0 ? 'disabled' : '') + ' onclick="ExamPage.goTo(' + (currentIndex - 1) + ')">上一题</button>';
    if (currentIndex < questions.length - 1) {
      html += '<button class="btn btn-primary" onclick="ExamPage.goTo(' + (currentIndex + 1) + ')">下一题</button>';
    } else {
      html += '<button class="btn btn-primary" onclick="ExamPage.finishExam()">交卷</button>';
    }
    html += '</div>';

    html += '</div>'; // question-card

    if (Utils.hasChineseTranslation(q) || q._passageParagraphsCn) {
      html += Utils.renderFloatingChineseToggle(showChinese, 'ExamPage.toggleChinese()');
    }

    container.innerHTML = html;
    Utils.initFloatingChineseToggle();
  }

  function selectAnswer(label) {
    var q = questions[currentIndex];
    answers[q.id] = label;
    // Update answer sheet visual
    document.querySelectorAll('.option-btn').forEach(function(btn) {
      var l = btn.getAttribute('data-label');
      if (l === label) btn.classList.add('selected');
      else btn.classList.remove('selected');
    });
    // Auto-advance after short delay
    setTimeout(function() {
      if (currentIndex < questions.length - 1) {
        goTo(currentIndex + 1);
      }
    }, 300);
  }

  function showTranslationRef() {
    var el = document.getElementById('trans-ref');
    if (el) el.classList.remove('hidden');
  }

  function transEval(correct) {
    var q = questions[currentIndex];
    answers[q.id] = correct ? 'pass' : 'fail';
    setTimeout(function() {
      if (currentIndex < questions.length - 1) {
        goTo(currentIndex + 1);
      }
    }, 300);
  }

  function goTo(idx) {
    if (idx < 0 || idx >= questions.length) return;
    currentIndex = idx;
    render();
  }

  function toggleChinese() {
    showChinese = !showChinese;
    render();
  }

  function finishExam() {
    if (timer) clearInterval(timer);
    examMode = 'result';

    // Calculate score
    var totalScore = 0;
    var maxScore = 0;
    var breakdown = {
      conversation: { score: 0, total: 0 },
      vocab_grammar: { score: 0, total: 0 },
      reading: { score: 0, total: 0 },
      translation: { score: 0, total: 0 }
    };

    questions.forEach(function(q) {
      maxScore += q._examScore;
      var type = q._examType;
      if (!breakdown[type]) breakdown[type] = { score: 0, total: 0 };
      breakdown[type].total += q._examScore;

      var userAns = answers[q.id];
      if (q._examType === 'translation') {
        if (userAns === 'pass') {
          totalScore += q._examScore;
          breakdown[type].score += q._examScore;
        }
      } else if (userAns === q.answer) {
        totalScore += q._examScore;
        breakdown[type].score += q._examScore;
      }
    });

    // Record
    Store.recordExam(totalScore, breakdown, (90 * 60 - timeLeft));

    renderResult(totalScore, maxScore, breakdown);
  }

  function renderResult(totalScore, maxScore, breakdown) {
    var container = document.getElementById('page-container');
    var percentage = maxScore > 0 ? Math.round(totalScore / maxScore * 100) : 0;
    var passed = totalScore >= Math.round(maxScore * 0.6);

    var html = '<div class="card report-card">';
    html += '<div class="report-score ' + (passed ? 'pass' : 'fail') + '">' + totalScore + ' / ' + maxScore + '</div>';
    html += '<p class="text-secondary mb-16">模拟考试 · ' + (passed ? '恭喜通过！' : '继续加油！') + '</p>';

    html += '<div class="report-detail">';
    var typeLabels = { conversation: '交际用语', vocab_grammar: '词汇语法', reading: '阅读理解', translation: '翻译' };
    Object.keys(breakdown).forEach(function(type) {
      var b = breakdown[type];
      html += '<div class="report-item">';
      html += '<div class="report-item-value">' + b.score + '/' + b.total + '</div>';
      html += '<div class="report-item-label">' + (typeLabels[type] || type) + '</div>';
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="report-actions">';
    html += '<a href="#/exam" class="btn btn-primary" onclick="ExamPage.reset()">再考一次</a>';
    html += '<a href="#/wrong-book" class="btn btn-outline">查看错题</a>';
    html += '</div></div>';

    container.innerHTML = html;
  }

  function reset() {
    examStarted = false;
    examMode = 'view';
    questions = [];
    answers = {};
    currentIndex = 0;
    if (timer) clearInterval(timer);
    render();
  }

  return {
    render: render,
    start: start,
    selectAnswer: selectAnswer,
    showTranslationRef: showTranslationRef,
    transEval: transEval,
    goTo: goTo,
    toggleChinese: toggleChinese,
    finishExam: finishExam,
    reset: reset
  };
})();
