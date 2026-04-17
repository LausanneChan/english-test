/* ===== 首页仪表盘 ===== */
var DashboardPage = (function() {
  function render() {
    var container = document.getElementById('page-container');
    var stats = Store.getStats();
    var wrongCount = Store.getWrongCount();
    var data = Store.load();

    // Accuracy by type
    var accConversation = Store.getAccuracyByType('conversation');
    var accVocabGrammar = Store.getAccuracyByType('vocab_grammar');
    var accReading = Store.getAccuracyByType('reading');
    var accTranslation = Store.getAccuracyByType('translation');

    // Total accuracy
    var totalAcc = stats.totalQuestionsDone > 0 ?
      Math.round(stats.totalCorrectCount / stats.totalQuestionsDone * 100) : 0;

    // Exam countdown
    var countdownHtml = '';
    if (stats.examDate) {
      var days = Utils.daysBetween(Utils.today(), stats.examDate);
      if (days > 0) {
        countdownHtml = '<div class="countdown">距考试还有 <strong>' + days + '</strong> 天</div>';
      } else if (days === 0) {
        countdownHtml = '<div class="countdown text-error">今天考试！加油！</div>';
      }
    }

    // Tip
    var tips = [
      '交际用语10分最容易拿，建议先练！',
      '词汇语法30分是大头，每天刷10道！',
      '阅读理解要学会\"先看题再找答案\"的技巧。',
      '翻译题背模板就能拿到基础分！',
      '每天做10道题，坚持7天效果明显。',
      '错题是提分最快的方式，多看错题本。'
    ];
    var tip = tips[Math.floor(Math.random() * tips.length)];

    var html = '';

    // Tip banner
    html += '<div class="dashboard-tip">';
    html += '<h3>今日建议</h3>';
    html += '<p>' + tip + '</p>';
    if (countdownHtml) html += '<div class="mt-8">' + countdownHtml + '</div>';
    html += '</div>';

    // Stats
    html += '<div class="stats-grid">';
    html += '<div class="stat-card"><div class="stat-value">' + stats.totalQuestionsDone + '</div><div class="stat-label">总做题数</div></div>';
    html += '<div class="stat-card success"><div class="stat-value">' + totalAcc + '%</div><div class="stat-label">总正确率</div></div>';
    html += '<div class="stat-card ' + (wrongCount > 0 ? 'error' : 'success') + '"><div class="stat-value">' + wrongCount + '</div><div class="stat-label">待复习错题</div></div>';
    html += '<div class="stat-card warning"><div class="stat-value">' + stats.currentStreak + '</div><div class="stat-label">连续学习(天)</div></div>';
    html += '</div>';

    // Score bars
    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">各题型得分率</span></div>';
    html += '<div class="score-bars">';
    html += renderScoreBar('交际用语', accConversation, 10);
    html += renderScoreBar('词汇语法', accVocabGrammar, 30);
    html += renderScoreBar('阅读理解', accReading, 30);
    html += renderScoreBar('翻译练习', accTranslation, 20);
    html += '</div></div>';

    // Quick actions
    html += '<div class="dashboard-section">';
    html += '<div class="dashboard-section-title">快速开始</div>';
    html += '<div class="quick-actions">';
    html += '<a href="#/practice/conversation" class="quick-action"><h4>💬 交际用语</h4><p>10分送分题，必须拿满</p></a>';
	    html += '<a href="#/practice/vocab-grammar" class="quick-action"><h4>📝 词汇语法</h4><p>30分大头，按考点练习</p></a>';
	    html += '<a href="#/practice/reading" class="quick-action"><h4>📖 阅读理解</h4><p>30分，练习定位技巧</p></a>';
	    html += '<a href="#/practice/cloze" class="quick-action"><h4>🔤 完形填空</h4><p>10分题型，练语感和搭配</p></a>';
	    html += '<a href="#/practice/translation" class="quick-action"><h4>🔄 翻译练习</h4><p>20分，背模板拿基础分</p></a>';
	    html += '<a href="#/wrong-book" class="quick-action"><h4>❌ 错题本</h4><p>' + wrongCount + '道错题待复习</p></a>';
	    html += '<a href="#/flashcard" class="quick-action"><h4>🃏 速记卡</h4><p>碎片时间背考点</p></a>';
	    html += '<a href="#/exam" class="quick-action"><h4>⏱️ 模拟考试</h4><p>限时模拟，检验水平</p></a>';
	    html += '<a href="#/knowledge" class="quick-action"><h4>📚 考点速查</h4><p>高频语法和词汇速查</p></a>';
	    html += '<a href="#/settings" class="quick-action"><h4>⚙️ 设置</h4><p>考试日期、学习习惯和模式设置</p></a>';
	    html += '</div></div>';

    // 60分策略
    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">60分冲刺建议</span></div>';
    html += '<div style="font-size:0.9rem;line-height:1.8;">';
    html += '<p><strong>交际用语</strong>：优先拿稳，短时间最容易提分。</p>';
    html += '<p><strong>词汇语法</strong>：按考点反复刷，先保住基础题。</p>';
    html += '<p><strong>阅读理解</strong>：先看题干，再回文中定位答案。</p>';
    html += '<p><strong>翻译</strong>：背高频句型和模板，先拿基础分。</p>';
    html += '<p><strong>完形填空</strong>：保持手感，目标先拿一半分。</p>';
    html += '<p class="mt-8 text-primary"><strong>先把最容易提分的题型拿稳，比追求全会更重要。</strong></p>';
    html += '</div></div>';

    container.innerHTML = html;
  }

  function renderScoreBar(label, accuracy, score) {
    var cls = accuracy >= 70 ? 'high' : (accuracy >= 40 ? 'mid' : 'low');
    return '<div class="score-bar-item">' +
      '<span class="score-bar-label">' + label + '</span>' +
      '<div class="score-bar-track"><div class="score-bar-fill ' + cls + '" style="width:' + accuracy + '%"></div></div>' +
      '<span class="score-bar-value">' + (accuracy > 0 ? accuracy + '%' : '-') + '</span>' +
      '</div>';
  }

  return { render: render };
})();
