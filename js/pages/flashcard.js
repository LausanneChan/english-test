/* ===== 速记卡 ===== */
var FlashcardPage = (function() {
  var cards = [];
  var currentIndex = 0;
  var flipped = false;
  var currentCategory = 'all';
  var sessionResults = [];

  function init() {
    cards = FLASHCARDS.slice();
    currentCategory = 'all';
    currentIndex = 0;
    flipped = false;
    sessionResults = [];
    // Sort: unmastered first
    sortCards();
    render();
  }

  function sortCards() {
    cards.sort(function(a, b) {
      var pa = Store.getFlashcardProgress(a.id);
      var pb = Store.getFlashcardProgress(b.id);
      return pa.mastery - pb.mastery;
    });
  }

  function render() {
    var container = document.getElementById('page-container');
    var filtered = currentCategory === 'all' ? cards :
      cards.filter(function(c) { return c.category === currentCategory; });

    var totalCards = filtered.length;
    var masteredCount = filtered.filter(function(c) {
      return Store.getFlashcardProgress(c.id).mastery >= 2;
    }).length;

    var html = '<div class="page-header"><h2>速记卡</h2>';
    html += '<p>已掌握 ' + masteredCount + ' / ' + totalCards + ' 张</p></div>';

    // Category tabs
    html += '<div class="tab-bar">';
    var cats = [
      { value: 'all', label: '全部' },
      { value: 'vocabulary', label: '词汇' },
      { value: 'grammar', label: '语法' },
      { value: 'translation', label: '翻译' },
      { value: 'conversation', label: '交际' },
      { value: 'cheat_sheet', label: '考前速记' }
    ];
    cats.forEach(function(c) {
      html += '<button class="tab-btn' + (currentCategory === c.value ? ' active' : '') + '" onclick="FlashcardPage.setCategory(\'' + c.value + '\')">' + c.label + '</button>';
    });
    html += '</div>';

    if (currentIndex >= filtered.length) {
      // Session complete
      var remembered = sessionResults.filter(function(r) { return r; }).length;
      html += '<div class="card report-card">';
      html += '<div class="report-score pass">复习完毕！</div>';
      html += '<p class="text-secondary mb-16">本轮记住 ' + remembered + ' / ' + sessionResults.length + ' 张</p>';
      html += '<div class="report-actions">';
      html += '<button class="btn btn-primary" onclick="FlashcardPage.init()">再来一轮</button>';
      html += '<a href="#/" class="btn btn-outline">回到首页</a>';
      html += '</div></div>';
      container.innerHTML = html;
      return;
    }

    var card = filtered[currentIndex];
    var progress = Store.getFlashcardProgress(card.id);
    var masteryLabel = progress.mastery === 0 ? '未学' : (progress.mastery === 1 ? '认识' : '已掌握');

    html += '<div class="flashcard-container">';
    html += '<div class="flashcard' + (flipped ? ' flipped' : '') + '" onclick="FlashcardPage.flip()">';
    html += '<div class="flashcard-inner">';

    // Front
    html += '<div class="flashcard-front">';
    html += '<span class="flashcard-category">' + card.tag + '</span>';
    html += Utils.renderSpeakButton(card.front, '朗读正面');
    html += '<h3>' + Utils.escapeHtml(card.front) + '</h3>';
    if (!flipped) {
      html += '<p style="margin-top:20px;opacity:0.7;font-size:0.85rem;">点击翻转查看答案</p>';
    }
    html += '</div>';

    // Back
    html += '<div class="flashcard-back">';
    html += '<span class="flashcard-category">' + masteryLabel + '</span>';
    html += Utils.renderSpeakButton(card.front + ' ' + card.back, '朗读卡片');
    html += '<h3>' + Utils.escapeHtml(card.front) + '</h3>';
    html += '<p>' + Utils.escapeHtml(card.back) + '</p>';
    html += '</div>';

    html += '</div></div>'; // flashcard-inner, flashcard

    // Action buttons (only when flipped)
    if (flipped) {
      html += '<div class="flashcard-actions">';
      html += '<button class="btn btn-error" onclick="FlashcardPage.mark(false)">没记住</button>';
      html += '<button class="btn btn-success" onclick="FlashcardPage.mark(true)">记住了</button>';
      html += '</div>';
    }

    html += '<div class="flashcard-progress">第 ' + (currentIndex + 1) + ' / ' + filtered.length + ' 张</div>';
    html += '</div>'; // flashcard-container

    container.innerHTML = html;
  }

  function flip() {
    if (!flipped) {
      flipped = true;
      render();
    }
  }

  function mark(remembered) {
    var filtered = currentCategory === 'all' ? cards :
      cards.filter(function(c) { return c.category === currentCategory; });
    if (currentIndex < filtered.length) {
      Store.updateFlashcard(filtered[currentIndex].id, remembered);
      sessionResults.push(remembered);
    }
    currentIndex++;
    flipped = false;
    render();
  }

  function setCategory(cat) {
    currentCategory = cat;
    currentIndex = 0;
    flipped = false;
    sessionResults = [];
    render();
  }

  return { init: init, flip: flip, mark: mark, setCategory: setCategory };
})();
