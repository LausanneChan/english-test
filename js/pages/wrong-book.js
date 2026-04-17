/* ===== 错题本 ===== */
var WrongBookPage = (function() {
  var currentFilter = 'all';
  var cnOpenMap = {};

  function render() {
    var container = document.getElementById('page-container');
    var wrongList = Store.getWrongAnswers(currentFilter);
    var totalCount = Store.getWrongCount();

    var html = '<div class="page-header">';
    html += '<h2>错题本</h2>';
    html += '<p>共 ' + totalCount + ' 道未掌握错题（错题自动记录）</p>';
    html += '</div>';

    // Filters
    html += '<div class="wrong-filters">';
    var filters = [
      { value: 'all', label: '全部' },
      { value: 'conversation', label: '交际用语' },
      { value: 'vocab_grammar', label: '词汇语法' },
      { value: 'reading', label: '阅读理解' },
      { value: 'cloze', label: '完形填空' },
      { value: 'translation', label: '翻译' }
    ];
    filters.forEach(function(f) {
      html += '<button class="filter-btn' + (currentFilter === f.value ? ' active' : '') + '" onclick="WrongBookPage.setFilter(\'' + f.value + '\')">' + f.label + '</button>';
    });
    html += '</div>';

    if (wrongList.length === 0) {
      html += '<div class="empty-state"><div class="empty-state-icon">🎉</div>';
      html += '<h3>太棒了！</h3><p>目前没有错题，继续刷题吧。</p>';
      html += '<a href="#/practice/vocab-grammar" class="btn btn-primary mt-16">去做题</a></div>';
    } else {
      // Action buttons
      html += '<div class="flex-between mb-16">';
      html += '<button class="btn btn-sm btn-error" onclick="WrongBookPage.repractice()">重做错题</button>';
      html += '<button class="btn btn-sm btn-outline" onclick="WrongBookPage.clearMastered()">清空已掌握</button>';
      html += '</div>';

      wrongList.forEach(function(w) {
        // Find the question data
        var q = findQuestion(w.questionId);
        html += '<div class="wrong-item' + (w.mastered ? ' mastered' : '') + '">';
        html += '<div class="wrong-item-header">';
        html += '<span class="tag ' + (w.mastered ? 'tag-success' : 'tag-error') + '">' + (w.mastered ? '已掌握' : '未掌握') + '</span>';
        if (w.tag) html += '<span class="tag tag-primary ml-8">' + w.tag + '</span>';
        html += '</div>';

        if (q) {
          var showCn = !!cnOpenMap[w.questionId];
          if (Utils.hasChineseTranslation(q)) {
            html += '<div class="helper-actions">' + Utils.renderChineseToggle(showCn, "WrongBookPage.toggleCnById('" + w.questionId + "')") + '</div>';
          }
          if (q.dialogue) {
            var dialogueText = q.dialogue.map(function(line) { return line.text; }).join(' ');
            html += '<div class="audio-actions">' + Utils.renderSpeakButton(dialogueText, '朗读英文') + '</div>';
            html += '<div class="wrong-item-text">';
            q.dialogue.forEach(function(line) {
              html += Utils.escapeHtml(line.speaker + ': ' + line.text) + ' ';
            });
            html += '</div>';
            if (showCn) {
              q.dialogue.forEach(function(line) {
                if (line.cn) html += '<div class="cn-line">' + Utils.escapeHtml(line.cn) + '</div>';
              });
            }
          } else if (q.question) {
            html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.question, '朗读英文') + '</div>';
            html += '<div class="wrong-item-text">' + Utils.escapeHtml(q.question) + '</div>';
            if (showCn && q.questionCn) {
              html += '<div class="cn-block">' + Utils.escapeHtml(q.questionCn) + '</div>';
            }
          } else if (q.source) {
            html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.source, '朗读英文') + '</div>';
            html += '<div class="wrong-item-text">' + Utils.escapeHtml(q.source) + '</div>';
            if (showCn && q.sourceCn) {
              html += '<div class="cn-block">' + Utils.escapeHtml(q.sourceCn) + '</div>';
            }
          }

          html += '<div class="wrong-item-meta">';
          html += '<span class="text-error">你的答案: ' + w.userAnswer + '</span>';
          html += '<span class="text-success">正确答案: ' + w.correctAnswer + '</span>';
          html += '<span>错误次数: ' + w.wrongCount + '</span>';
          html += '</div>';

          if (q.explanation) {
            html += '<div class="mt-8" style="font-size:0.85rem;color:var(--text-secondary);">' + Utils.escapeHtml(q.explanation) + '</div>';
          }
        } else {
          html += '<div class="wrong-item-text">题目ID: ' + w.questionId + '</div>';
        }

        html += '</div>';
      });
    }

    container.innerHTML = html;
  }

  function findQuestion(id) {
    // Search in all question banks
    var all = [].concat(CONVERSATION_QUESTIONS || [], VOCAB_GRAMMAR_QUESTIONS || [],
      READING_QUESTIONS || [], CLOZE_QUESTIONS || [], TRANSLATION_QUESTIONS || []);
    // For reading, flatten sub-questions
    var flat = [];
    all.forEach(function(q) {
      if (q.questions) {
        q.questions.forEach(function(sq) { flat.push(sq); });
      }
      flat.push(q);
    });
    for (var i = 0; i < flat.length; i++) {
      if (flat[i].id === id) return flat[i];
    }
    return null;
  }

  function setFilter(filter) {
    currentFilter = filter;
    render();
  }

  function toggleCnById(id) {
    cnOpenMap[id] = !cnOpenMap[id];
    render();
  }

  function repractice() {
    var wrongList = Store.getWrongAnswers(currentFilter);
    var unmastered = wrongList.filter(function(w) { return !w.mastered; });
    if (unmastered.length === 0) {
      alert('没有需要重做的错题！');
      return;
    }
    // Navigate to a special repractice mode
    RepracticeEngine.start(unmastered);
  }

  function clearMastered() {
    if (confirm('确定清空所有已掌握的错题记录？')) {
      Store.clearMastered();
      render();
    }
  }

  return {
    render: render,
    setFilter: setFilter,
    toggleCnById: toggleCnById,
    repractice: repractice,
    clearMastered: clearMastered
  };
})();

/* Re-practice engine for wrong book */
var RepracticeEngine = (function() {
  var items = [];
  var currentIndex = 0;
  var correctStreak = {};
  var answered = false;

  function start(wrongItems) {
    items = wrongItems;
    currentIndex = 0;
    correctStreak = {};
    answered = false;
    showQuestion();
  }

  function showQuestion() {
    if (currentIndex >= items.length) {
      showSummary();
      return;
    }

    var container = document.getElementById('page-container');
    var w = items[currentIndex];
    var q = WrongBookPage.render ? findQ(w.questionId) : null;

    var html = '<div class="page-header"><h2>重做错题</h2>';
    html += '<p>第 ' + (currentIndex + 1) + ' / ' + items.length + ' 题</p></div>';

    if (q && q.options) {
      html += '<div class="question-card">';
      if (q.tag) html += '<div class="question-tag"><span class="tag tag-warning">' + q.tag + '</span></div>';
      if (q.dialogue) {
        html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.dialogue.map(function(line) { return line.text; }).join(' '), '朗读英文') + '</div>';
        html += '<div class="dialogue-box">';
        q.dialogue.forEach(function(line, idx) {
          if (idx === q.blankIndex) {
            html += '<div class="dialogue-line"><span class="dialogue-speaker">' + line.speaker + ':</span> <span class="dialog-blank">______</span></div>';
          } else {
            html += '<div class="dialogue-line"><span class="dialogue-speaker">' + line.speaker + ':</span> ' + Utils.escapeHtml(line.text) + '</div>';
          }
        });
        html += '</div>';
      } else if (q.question) {
        html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.question, '朗读英文') + '</div>';
        html += '<div class="question-text">' + Utils.escapeHtml(q.question) + '</div>';
      } else if (q.source) {
        html += '<div class="audio-actions">' + Utils.renderSpeakButton(q.source, '朗读英文') + '</div>';
        html += '<div class="question-text">' + Utils.escapeHtml(q.source) + '</div>';
      }
      html += '<div class="options-list">';
      q.options.forEach(function(opt) {
        html += '<button class="option-btn" data-label="' + opt.label + '" onclick="RepracticeEngine.answer(\'' + opt.label + '\')">';
        html += '<span class="option-label">' + opt.label + '</span><span class="option-content"><span>' + Utils.escapeHtml(opt.text) + '</span>' + Utils.renderInlineSpeakButton(opt.text, '朗读选项') + '</span></button>';
      });
      html += '</div></div>';
    } else {
      // For non-multiple-choice items, just show info
      html += '<div class="question-card">';
      html += '<div class="question-text">' + Utils.escapeHtml(w.questionId) + '</div>';
      html += '<p class="text-secondary">此题暂不支持重做</p>';
      html += '<button class="btn btn-primary mt-16" onclick="RepracticeEngine.skip()">跳过</button>';
      html += '</div>';
    }

    container.innerHTML = html;
  }

  function answer(label) {
    if (answered) return;
    answered = true;

    var w = items[currentIndex];
    var q = findQ(w.questionId);
    var isCorrect = q && (label === q.answer);

    Store.recordAnswer(w.questionId, w.type, w.tag, label, w.correctAnswer, isCorrect);

    // Visual feedback
    document.querySelectorAll('.option-btn').forEach(function(btn) {
      var l = btn.getAttribute('data-label');
      if (q && l === q.answer) btn.classList.add('correct');
      else if (l === label && !isCorrect) btn.classList.add('wrong');
      btn.classList.add('disabled');
    });

    var card = document.querySelector('.question-card');
    if (card) {
      var fb = document.createElement('div');
      fb.innerHTML = '<div class="feedback ' + (isCorrect ? 'correct' : 'wrong') + '">' +
        '<div class="feedback-title">' + (isCorrect ? '回答正确！' : '还是不对哦') + '</div>' +
        (q && q.explanation ? '<div class="feedback-text">' + Utils.escapeHtml(q.explanation) + '</div>' : '') +
        '</div><div class="text-center mt-16"><button class="btn btn-primary" onclick="RepracticeEngine.next()">下一题</button></div>';
      while (fb.firstChild) card.appendChild(fb.firstChild);
    }
  }

  function next() {
    currentIndex++;
    answered = false;
    showQuestion();
  }

  function skip() {
    currentIndex++;
    answered = false;
    showQuestion();
  }

  function showSummary() {
    var container = document.getElementById('page-container');
    var html = '<div class="card report-card">';
    html += '<div class="report-score pass">完成!</div>';
    html += '<p class="text-secondary mb-16">错题重做完毕</p>';
    html += '<div class="report-actions">';
    html += '<a href="#/wrong-book" class="btn btn-primary">返回错题本</a>';
    html += '<a href="#/" class="btn btn-outline">回到首页</a>';
    html += '</div></div>';
    container.innerHTML = html;
  }

  function findQ(id) {
    var all = [].concat(CONVERSATION_QUESTIONS || [], VOCAB_GRAMMAR_QUESTIONS || [],
      READING_QUESTIONS || [], CLOZE_QUESTIONS || [], TRANSLATION_QUESTIONS || []);
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
      if (all[i].questions) {
        for (var j = 0; j < all[i].questions.length; j++) {
          if (all[i].questions[j].id === id) return all[i].questions[j];
        }
      }
    }
    return null;
  }

  return { start: start, answer: answer, next: next, skip: skip };
})();
