/* ===== Store: localStorage 数据管理 ===== */
var Store = (function() {
  var STORAGE_KEY = 'degree_english_app';
  var DEFAULT_DATA = {
    version: '1.0.0',
    wrongAnswers: [],
    practiceHistory: [],
    examHistory: [],
    flashcardProgress: {},
    preferences: {
      beginnerMode: true
    },
    stats: {
      totalStudyDays: 0,
      totalQuestionsDone: 0,
      totalCorrectCount: 0,
      currentStreak: 0,
      lastStudyDate: null,
      examDate: null
    }
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
      var data = JSON.parse(raw);
      // Merge with defaults for missing keys
      if (!data.stats) data.stats = JSON.parse(JSON.stringify(DEFAULT_DATA.stats));
      if (!data.wrongAnswers) data.wrongAnswers = [];
      if (!data.practiceHistory) data.practiceHistory = [];
      if (!data.examHistory) data.examHistory = [];
      if (!data.flashcardProgress) data.flashcardProgress = {};
      if (!data.preferences) data.preferences = JSON.parse(JSON.stringify(DEFAULT_DATA.preferences));
      return data;
    } catch(e) {
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch(e) {
      console.error('Failed to save data:', e);
    }
  }

  // Update study stats for today
  function recordStudy() {
    var data = load();
    var today = Utils.today();
    if (data.stats.lastStudyDate !== today) {
      if (data.stats.lastStudyDate) {
        var gap = Utils.daysBetween(data.stats.lastStudyDate, today);
        data.stats.currentStreak = (gap === 1) ? data.stats.currentStreak + 1 : 1;
      } else {
        data.stats.currentStreak = 1;
      }
      data.stats.totalStudyDays++;
      data.stats.lastStudyDate = today;
    }
    save(data);
  }

  return {
    load: load,
    save: save,
    recordStudy: recordStudy,

    // Record an answer
    recordAnswer: function(questionId, type, tag, userAnswer, correctAnswer, isCorrect) {
      var data = load();
      data.stats.totalQuestionsDone++;
      if (isCorrect) data.stats.totalCorrectCount++;

      if (!isCorrect) {
        // Add to wrong book
        var existing = null;
        for (var i = 0; i < data.wrongAnswers.length; i++) {
          if (data.wrongAnswers[i].questionId === questionId) {
            existing = data.wrongAnswers[i];
            break;
          }
        }
        if (existing) {
          existing.wrongCount++;
          existing.userAnswer = userAnswer;
          existing.lastWrongAt = Date.now();
          existing.mastered = false;
          existing.correctCount = 0;
        } else {
          data.wrongAnswers.push({
            questionId: questionId,
            type: type,
            tag: tag || '',
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            wrongCount: 1,
            correctCount: 0,
            firstWrongAt: Date.now(),
            lastWrongAt: Date.now(),
            mastered: false
          });
        }
      } else {
        // If this question was in wrong book, increment correct count
        for (var i = 0; i < data.wrongAnswers.length; i++) {
          if (data.wrongAnswers[i].questionId === questionId) {
            data.wrongAnswers[i].correctCount++;
            if (data.wrongAnswers[i].correctCount >= 2) {
              data.wrongAnswers[i].mastered = true;
            }
            break;
          }
        }
      }

      save(data);
      recordStudy();
    },

    // Get wrong answers
    getWrongAnswers: function(typeFilter) {
      var data = load();
      var list = data.wrongAnswers;
      if (typeFilter && typeFilter !== 'all') {
        list = list.filter(function(w) { return w.type === typeFilter; });
      }
      // Sort: not mastered first, then by wrongCount desc
      list.sort(function(a, b) {
        if (a.mastered !== b.mastered) return a.mastered ? 1 : -1;
        return b.wrongCount - a.wrongCount;
      });
      return list;
    },

    // Get wrong count
    getWrongCount: function() {
      var data = load();
      return data.wrongAnswers.filter(function(w) { return !w.mastered; }).length;
    },

    // Remove mastered items
    clearMastered: function() {
      var data = load();
      data.wrongAnswers = data.wrongAnswers.filter(function(w) { return !w.mastered; });
      save(data);
    },

    // Record practice session
    recordPractice: function(type, totalQuestions, correctCount, duration) {
      var data = load();
      data.practiceHistory.push({
        date: Utils.today(),
        type: type,
        totalQuestions: totalQuestions,
        correctCount: correctCount,
        duration: duration,
        timestamp: Date.now()
      });
      save(data);
    },

    // Record exam
    recordExam: function(totalScore, breakdown, duration) {
      var data = load();
      data.examHistory.push({
        date: Utils.today(),
        totalScore: totalScore,
        breakdown: breakdown,
        duration: duration,
        timestamp: Date.now()
      });
      save(data);
    },

    // Flashcard progress
    getFlashcardProgress: function(cardId) {
      var data = load();
      return data.flashcardProgress[cardId] || { mastery: 0, lastReviewAt: null, reviewCount: 0 };
    },

    updateFlashcard: function(cardId, remembered) {
      var data = load();
      var p = data.flashcardProgress[cardId] || { mastery: 0, lastReviewAt: null, reviewCount: 0 };
      p.lastReviewAt = Date.now();
      p.reviewCount++;
      if (remembered) {
        p.mastery = Math.min(2, p.mastery + 1);
      } else {
        p.mastery = 0;
      }
      data.flashcardProgress[cardId] = p;
      save(data);
      recordStudy();
    },

    // Get accuracy rate by type
    getAccuracyByType: function(type) {
      var data = load();
      var total = 0, correct = 0;
      data.practiceHistory.forEach(function(h) {
        if (!type || h.type === type) {
          total += h.totalQuestions;
          correct += h.correctCount;
        }
      });
      return total > 0 ? Math.round(correct / total * 100) : 0;
    },

    // Get stats
    getStats: function() {
      var data = load();
      return data.stats;
    },

    getPreferences: function() {
      var data = load();
      return data.preferences || JSON.parse(JSON.stringify(DEFAULT_DATA.preferences));
    },

    isBeginnerMode: function() {
      return this.getPreferences().beginnerMode !== false;
    },

    setBeginnerMode: function(enabled) {
      var data = load();
      if (!data.preferences) data.preferences = JSON.parse(JSON.stringify(DEFAULT_DATA.preferences));
      data.preferences.beginnerMode = !!enabled;
      save(data);
    },

    // Set exam date
    setExamDate: function(dateStr) {
      var data = load();
      data.stats.examDate = dateStr;
      save(data);
    },

    // Export data
    exportData: function() {
      return JSON.stringify(load(), null, 2);
    },

    // Import data
    importData: function(jsonStr) {
      try {
        var data = JSON.parse(jsonStr);
        save(data);
        return true;
      } catch(e) {
        return false;
      }
    },

    // Clear all data
    clearAll: function() {
      localStorage.removeItem(STORAGE_KEY);
    }
  };
})();
