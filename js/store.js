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

  function cloneDefaultData() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function normalizeData(data) {
    var normalized = cloneDefaultData();
    var source = data && typeof data === 'object' ? data : {};

    normalized.version = source.version || normalized.version;
    normalized.wrongAnswers = Array.isArray(source.wrongAnswers) ? source.wrongAnswers : [];
    normalized.practiceHistory = Array.isArray(source.practiceHistory) ? source.practiceHistory : [];
    normalized.examHistory = Array.isArray(source.examHistory) ? source.examHistory : [];
    normalized.flashcardProgress = source.flashcardProgress && typeof source.flashcardProgress === 'object'
      ? source.flashcardProgress
      : {};

    if (source.preferences && typeof source.preferences === 'object') {
      normalized.preferences.beginnerMode = source.preferences.beginnerMode !== false;
    }

    if (source.stats && typeof source.stats === 'object') {
      normalized.stats.totalStudyDays = Number(source.stats.totalStudyDays) || 0;
      normalized.stats.totalQuestionsDone = Number(source.stats.totalQuestionsDone) || 0;
      normalized.stats.totalCorrectCount = Number(source.stats.totalCorrectCount) || 0;
      normalized.stats.currentStreak = Number(source.stats.currentStreak) || 0;
      normalized.stats.lastStudyDate = source.stats.lastStudyDate || null;
      normalized.stats.examDate = source.stats.examDate || null;
    }

    return normalized;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefaultData();
      var data = JSON.parse(raw);
      return normalizeData(data);
    } catch(e) {
      return cloneDefaultData();
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeData(data)));
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
      return data.preferences || cloneDefaultData().preferences;
    },

    isBeginnerMode: function() {
      return this.getPreferences().beginnerMode !== false;
    },

    setBeginnerMode: function(enabled) {
      var data = load();
      if (!data.preferences) data.preferences = cloneDefaultData().preferences;
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
        save(normalizeData(data));
        return true;
      } catch(e) {
        return false;
      }
    },

    // Clear all data
    clearAll: function() {
      localStorage.removeItem(STORAGE_KEY);
      if (window.sessionStorage) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      if (window.caches && window.caches.keys) {
        return window.caches.keys().then(function(keys) {
          var targets = keys.filter(function(key) {
            return key.indexOf('degree-english') !== -1 || key.indexOf('app-cache') !== -1;
          });
          return Promise.all(targets.map(function(key) {
            return window.caches.delete(key);
          }));
        }).catch(function(err) {
          console.warn('Failed to clear caches:', err);
        });
      }
      return Promise.resolve();
    },

    getStorageKey: function() {
      return STORAGE_KEY;
    }
  };
})();
