/* ===== 完形填空题目数据 ===== */
var CLOZE_QUESTIONS = [
  {
    id: "cloze_001",
    type: "cloze",
    title: "Learning English",
    passageParts: [
      { text: "Learning a foreign language is not easy. It ", blank: true },
      { text: " time and patience. Many people give up because they think it is too ", blank: true },
      { text: ". But if you ", blank: true },
      { text: " studying, you will succeed.\n\nFirst, you should ", blank: true },
      { text: " a good study plan. For example, you can ", blank: true },
      { text: " 30 minutes every day reading English. It is important to ", blank: true },
      { text: " new words every day. You can write them in a ", blank: true },
      { text: " and review them often.\n\nSecond, try to ", blank: true },
      { text: " English as much as possible. You can talk with your classmates in English or ", blank: true },
      { text: " to English songs.\n\nFinally, don't be ", blank: true },
      { text: " of making mistakes. Everyone makes mistakes when they learn something new. The ", blank: true },
      { text: " important thing is to keep trying. If you work hard, you will ", blank: true },
      { text: " your English exam." }
    ],
    blanks: [
      {
        index: 0,
        options: [
          { label: "A", text: "takes" },
          { label: "B", text: "costs" },
          { label: "C", text: "spends" },
          { label: "D", text: "pays" }
        ],
        answer: "A",
        explanation: "It takes time 是固定搭配，表示\"花费时间\"。cost 指花钱，spend 指人花费，pay 指付款。"
      },
      {
        index: 1,
        options: [
          { label: "A", text: "easy" },
          { label: "B", text: "difficult" },
          { label: "C", text: "interesting" },
          { label: "D", text: "fun" }
        ],
        answer: "B",
        explanation: "前面说 give up（放弃），说明他们认为太难了，用 difficult。"
      },
      {
        index: 2,
        options: [
          { label: "A", text: "stop" },
          { label: "B", text: "give up" },
          { label: "C", text: "keep" },
          { label: "D", text: "finish" }
        ],
        answer: "C",
        explanation: "keep doing（继续做），语境是\"如果你继续学习，就会成功\"。"
      },
      {
        index: 3,
        options: [
          { label: "A", text: "make" },
          { label: "B", text: "do" },
          { label: "C", text: "have" },
          { label: "D", text: "take" }
        ],
        answer: "A",
        explanation: "make a plan（制定计划）是固定搭配。"
      },
      {
        index: 4,
        options: [
          { label: "A", text: "cost" },
          { label: "B", text: "take" },
          { label: "C", text: "spend" },
          { label: "D", text: "use" }
        ],
        answer: "C",
        explanation: "spend time doing sth.（花时间做某事），主语是人。"
      },
      {
        index: 5,
        options: [
          { label: "A", text: "forget" },
          { label: "B", text: "remember" },
          { label: "C", text: "learn" },
          { label: "D", text: "teach" }
        ],
        answer: "C",
        explanation: "学新单词用 learn new words。"
      },
      {
        index: 6,
        options: [
          { label: "A", text: "book" },
          { label: "B", text: "notebook" },
          { label: "C", text: "letter" },
          { label: "D", text: "card" }
        ],
        answer: "B",
        explanation: "把新单词写在笔记本（notebook）里，方便复习。"
      },
      {
        index: 7,
        options: [
          { label: "A", text: "speak" },
          { label: "B", text: "say" },
          { label: "C", text: "tell" },
          { label: "D", text: "talk" }
        ],
        answer: "D",
        explanation: "try to talk in English（尽量用英语交谈）。talk 更强调交谈的互动。"
      },
      {
        index: 8,
        options: [
          { label: "A", text: "listen" },
          { label: "B", text: "hear" },
          { label: "C", text: "look" },
          { label: "D", text: "watch" }
        ],
        answer: "A",
        explanation: "listen to English songs（听英文歌），listen 强调主动听。"
      },
      {
        index: 9,
        options: [
          { label: "A", text: "tired" },
          { label: "B", text: "afraid" },
          { label: "C", text: "proud" },
          { label: "D", text: "sure" }
        ],
        answer: "B",
        explanation: "be afraid of（害怕），不要害怕犯错。"
      },
      {
        index: 10,
        options: [
          { label: "A", text: "more" },
          { label: "B", text: "most" },
          { label: "C", text: "very" },
          { label: "D", text: "much" }
        ],
        answer: "B",
        explanation: "the most important（最重要的），最高级。"
      },
      {
        index: 11,
        options: [
          { label: "A", text: "pass" },
          { label: "B", text: "fail" },
          { label: "C", text: "take" },
          { label: "D", text: "miss" }
        ],
        answer: "A",
        explanation: "pass the exam（通过考试），与文章主题\"成功\"呼应。"
      }
    ]
  }
];
