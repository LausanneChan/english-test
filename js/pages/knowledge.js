/* ===== 考点速查 ===== */
var KnowledgePage = (function() {
  var currentCategory = 'all';
  var expandedPoint = null;

  function render() {
    var container = document.getElementById('page-container');
    var html = '<div class="page-header"><h2>考点速查</h2>';
    html += '<p>高频考点快速查阅，点击展开详情</p></div>';

    // Category tabs
    html += '<div class="tab-bar mb-16">';
    html += '<button class="tab-btn' + (currentCategory === 'all' ? ' active' : '') + '" onclick="KnowledgePage.setCategory(\'all\')">全部</button>';
    html += '<button class="tab-btn' + (currentCategory === 'grammar' ? ' active' : '') + '" onclick="KnowledgePage.setCategory(\'grammar\')">语法</button>';
    html += '<button class="tab-btn' + (currentCategory === 'vocabulary' ? ' active' : '') + '" onclick="KnowledgePage.setCategory(\'vocabulary\')">词汇</button>';
    html += '</div>';

    var filtered = currentCategory === 'all' ? KNOWLEDGE_POINTS :
      KNOWLEDGE_POINTS.filter(function(k) { return k.category === currentCategory; });

    filtered.forEach(function(category) {
      html += '<div class="knowledge-category">';
      html += '<div class="knowledge-category-title">' + category.title + '</div>';

      category.points.forEach(function(point) {
        var isExpanded = expandedPoint === point.title;

        if (isExpanded) {
          html += '<div class="knowledge-detail">';
          html += '<div class="audio-actions">' + Utils.renderSpeakButton([point.title, point.formula].concat(point.examples || []).join(' '), '朗读英文') + '</div>';
          html += '<h3>' + Utils.escapeHtml(point.title) + '</h3>';
          html += '<p class="text-secondary">' + Utils.escapeHtml(point.summary) + '</p>';
          html += '<div class="knowledge-formula">' + Utils.escapeHtml(point.formula) + '</div>';
          html += '<ul class="knowledge-examples">';
          point.examples.forEach(function(ex) {
            html += '<li>' + Utils.escapeHtml(ex) + '</li>';
          });
          html += '</ul>';
          html += '<div class="knowledge-exam-tips">考试技巧：' + Utils.escapeHtml(point.examTips) + '</div>';
          html += '<div class="mt-16"><a href="#/practice/vocab-grammar" class="btn btn-sm btn-primary">做相关题目</a></div>';
          html += '<div class="mt-8"><button class="btn btn-sm btn-outline" onclick="KnowledgePage.collapse()">收起</button></div>';
          html += '</div>';
        } else {
          html += '<div class="knowledge-item" onclick="KnowledgePage.expand(\'' + Utils.escapeHtml(point.title).replace(/'/g, "\\'") + '\')">';
          html += '<h4>' + Utils.escapeHtml(point.title) + '</h4>';
          html += '<p>' + Utils.escapeHtml(point.summary) + '</p>';
          html += '</div>';
        }
      });

      html += '</div>';
    });

    container.innerHTML = html;
  }

  function expand(title) {
    expandedPoint = title;
    render();
  }

  function collapse() {
    expandedPoint = null;
    render();
  }

  function setCategory(cat) {
    currentCategory = cat;
    expandedPoint = null;
    render();
  }

  return { render: render, expand: expand, collapse: collapse, setCategory: setCategory };
})();
