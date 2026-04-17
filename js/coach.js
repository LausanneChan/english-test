/* ===== Beginner Coach: 小白解题思路 ===== */
var Coach = (function() {
  function getTypeLabel(type) {
    var labels = {
      conversation: '交际用语',
      vocab_grammar: '词汇语法',
      reading: '阅读理解',
      cloze: '完形填空',
      translation: '翻译'
    };
    return labels[type] || '练习';
  }

  function stepsFor(type, question) {
    if (type === 'conversation') {
      return [
        '先别急着看四个选项，先判断这是感谢、道歉、请求还是邀请。',
        '记住一句话：交际题考的是“场景配套回答”，不是硬翻译。',
        '如果一句看起来语法也对，就选更符合场景、更自然的那一句。'
      ];
    }

    if (type === 'vocab_grammar') {
      var tag = question.tag || '这个考点';
      return [
        '先找题眼：时间词、固定搭配、介词、to、比较级、被动语态这些最容易出线索。',
        '这题重点通常在“' + tag + '”，别整句硬翻，先看考哪条规则。',
        '实在不会时先排除最明显不顺口、不合搭配的选项，再比较剩下两个。'
      ];
    }

    if (type === 'reading') {
      return [
        '第一步只看题干，先搞清楚它问的是人物、原因、细节还是主旨。',
        '第二步回原文定位关键词，不要整篇从头硬读。',
        '答案一般藏在原文同义替换里，不一定是原句照抄。'
      ];
    }

    if (type === 'cloze') {
      return [
        '先看空前空后，很多题其实不用读完整篇也能判断。',
        '优先判断这空需要的是词性：名词、动词、形容词还是介词。',
        '如果四个词看起来都像认识，就回到上下文看“意思是否顺”和“搭配是否固定”。'
      ];
    }

    if (type === 'translation') {
      return [
        '先抓句子骨架：主语是谁，动作是什么，时间是什么时候。',
        '再找固定搭配和高频句型，比如 look forward to、be used to、not only...but also...',
        '不用一开始追求很高级，先翻对主干、时态和关键词，就能拿基础分。'
      ];
    }

    return [
      '先找关键词，再判断考点。',
      '不会时先排明显错误项。',
      '做完马上记住这道题为什么对。'
    ];
  }

  function memoryFor(type, question) {
    if (type === 'conversation') return '记场景，不记死答案。感谢就回礼貌，道歉就回没关系。';
    if (type === 'vocab_grammar') return '语法题提分靠“识别考点”，不是靠把整句全翻懂。';
    if (type === 'reading') return '阅读先看题，再定位，别一上来通读全文。';
    if (type === 'cloze') return '完形先看空前后，很多答案其实是固定搭配。';
    if (type === 'translation') return '翻译先保主干正确，再慢慢补细节。';
    return '先抓主干，再补细节。';
  }

  function renderGuide(type, question) {
    if (!Store.isBeginnerMode()) return '';
    var steps = stepsFor(type, question);
    var html = '<div class="coach-card">';
    html += '<div class="coach-title">小白解题思路</div>';
    html += '<div class="coach-subtitle">' + getTypeLabel(type) + ' · 先按这个顺序想</div>';
    html += '<ol class="coach-steps">';
    steps.forEach(function(step) {
      html += '<li>' + Utils.escapeHtml(step) + '</li>';
    });
    html += '</ol>';
    html += '<div class="coach-memory">记忆提醒：' + Utils.escapeHtml(memoryFor(type, question)) + '</div>';
    html += '</div>';
    return html;
  }

  function renderAfterAnswer(type, question) {
    if (!Store.isBeginnerMode()) return '';
    var hint = question.rule || question.tips || question.explanation || memoryFor(type, question);
    return '<div class="coach-mini">这题你要带走的是：' + Utils.escapeHtml(hint) + '</div>';
  }

  return {
    renderGuide: renderGuide,
    renderAfterAnswer: renderAfterAnswer
  };
})();
