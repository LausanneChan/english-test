/* ===== 设置页面 ===== */
var SettingsPage = (function() {
  function render() {
    var container = document.getElementById('page-container');
    var stats = Store.getStats();
    var prefs = Store.getPreferences();

    var html = '<div class="page-header"><h2>设置</h2></div>';

    // Exam date
    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">考试日期</span></div>';
    html += '<div class="flex" style="gap:12px;align-items:center;">';
    html += '<input type="date" id="exam-date-input" value="' + (stats.examDate || '') + '" style="padding:8px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.9rem;">';
    html += '<button class="btn btn-primary btn-sm" onclick="SettingsPage.saveExamDate()">保存</button>';
    html += '</div></div>';

    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">学习模式</span></div>';
    html += '<div class="settings-item">';
    html += '<div><div class="settings-item-label">小白模式</div>';
    html += '<div class="settings-item-desc">每道题先提示怎么看题、怎么排除、怎么记住</div></div>';
    html += '<button class="btn btn-sm ' + (prefs.beginnerMode ? 'btn-primary' : 'btn-outline') + '" onclick="SettingsPage.toggleBeginnerMode()">' + (prefs.beginnerMode ? '已开启' : '去开启') + '</button>';
    html += '</div>';
    html += '</div>';

    // Data management
    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">数据管理</span></div>';

    html += '<div class="settings-item">';
    html += '<div><div class="settings-item-label">导出学习数据</div>';
    html += '<div class="settings-item-desc">备份错题本、学习进度等数据</div></div>';
    html += '<button class="btn btn-sm btn-outline" onclick="SettingsPage.exportData()">导出</button>';
    html += '</div>';

    html += '<div class="settings-item">';
    html += '<div><div class="settings-item-label">导入学习数据</div>';
    html += '<div class="settings-item-desc">恢复之前导出的数据</div></div>';
    html += '<button class="btn btn-sm btn-outline" onclick="SettingsPage.importData()">导入</button>';
    html += '</div>';

    html += '<div class="settings-item">';
    html += '<div><div class="settings-item-label">清空所有数据</div>';
    html += '<div class="settings-item-desc">删除所有学习记录，不可恢复</div></div>';
    html += '<button class="btn btn-sm btn-error" onclick="SettingsPage.clearAll()">清空</button>';
    html += '</div>';
    html += '</div>';

    // Stats summary
    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">学习统计</span></div>';
    html += '<div style="font-size:0.9rem;line-height:2;">';
    html += '<p>总做题数：<strong>' + stats.totalQuestionsDone + '</strong></p>';
    html += '<p>总正确数：<strong>' + stats.totalCorrectCount + '</strong></p>';
    html += '<p>正确率：<strong>' + (stats.totalQuestionsDone > 0 ? Math.round(stats.totalCorrectCount / stats.totalQuestionsDone * 100) : 0) + '%</strong></p>';
    html += '<p>累计学习天数：<strong>' + stats.totalStudyDays + '</strong></p>';
    html += '<p>连续学习天数：<strong>' + stats.currentStreak + '</strong></p>';
    html += '</div></div>';

    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">iPhone 使用</span></div>';
    html += '<div style="font-size:0.9rem;line-height:1.9;color:var(--text-secondary);">';
    html += '<p>1. 用 Safari 打开这个网址。</p>';
    html += '<p>2. 点底部“分享”。</p>';
    html += '<p>3. 选择“添加到主屏幕”。</p>';
    html += '<p>4. 以后就能像 App 一样从桌面打开。</p>';
    html += '<p class="mt-8 text-primary"><strong>这个版本的数据仍然保存在设备本地，适合你自己单人复习。</strong></p>';
    html += '</div></div>';

    // About
    html += '<div class="card">';
    html += '<div class="card-header"><span class="card-title">关于</span></div>';
    html += '<div style="font-size:0.9rem;color:var(--text-secondary);line-height:1.8;">';
    html += '<p>学位英语冲刺助手 v1.0</p>';
    html += '<p>专为国开广东学位英语考试设计</p>';
    html += '<p>所有数据保存在浏览器本地，不会上传</p>';
    html += '</div></div>';

    container.innerHTML = html;
  }

  function saveExamDate() {
    var input = document.getElementById('exam-date-input');
    if (input && input.value) {
      Store.setExamDate(input.value);
      alert('考试日期已保存：' + input.value);
    }
  }

  function exportData() {
    var data = Store.exportData();
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'degree_english_backup_' + Utils.today() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importData() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        var success = Store.importData(ev.target.result);
        if (success) {
          alert('导入成功！');
          render();
        } else {
          alert('导入失败，文件格式不正确。');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function clearAll() {
    if (confirm('确定要清空所有学习数据吗？此操作不可恢复！')) {
      if (confirm('再次确认：真的要清空吗？')) {
        Store.clearAll();
        alert('数据已清空。');
        render();
      }
    }
  }

  function toggleBeginnerMode() {
    Store.setBeginnerMode(!Store.isBeginnerMode());
    render();
  }

  return {
    render: render,
    saveExamDate: saveExamDate,
    exportData: exportData,
    importData: importData,
    clearAll: clearAll,
    toggleBeginnerMode: toggleBeginnerMode
  };
})();
