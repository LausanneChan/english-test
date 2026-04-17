/* ===== 阅读理解题目数据 (2篇) ===== */
var READING_QUESTIONS = [
  {
    id: "read_001",
    type: "reading",
    title: "The Weather in England",
    passageParagraphs: [
      "In England, people often talk about the weather because they can experience four seasons in one day. In the morning, the weather is warm just like in spring. An hour later, black clouds come and then it rains hard. The weather gets a little cold. In the late afternoon, the sky will be sunny, the sun will begin to shine, and it will be summer at this time of a day.",
      "In England, people can also have summer in winter, or have winter in summer. So in winter they can swim sometimes, and in summer sometimes they should take warm clothes.",
      "When you go to England, you will see some English people usually take an umbrella or a raincoat with them on a sunny morning, but you should not laugh at them. If you don't take an umbrella or a raincoat, you will regret later in the day."
    ],
    questions: [
      {
        id: "read_001_q1",
        question: "Why do people in England often talk about the weather?",
        options: [
          { label: "A", text: "Because they like the weather." },
          { label: "B", text: "Because they can experience four seasons in one day." },
          { label: "C", text: "Because it is always raining." },
          { label: "D", text: "Because the weather is always warm." }
        ],
        answer: "B",
        explanation: "文章第一句就给出了答案：because they can experience four seasons in one day。",
        keyParagraph: 0
      },
      {
        id: "read_001_q2",
        question: "What is the weather like in the morning in England?",
        options: [
          { label: "A", text: "It is warm just like in spring." },
          { label: "B", text: "It is always cold." },
          { label: "C", text: "It is always rainy." },
          { label: "D", text: "It is very hot." }
        ],
        answer: "A",
        explanation: "原文：In the morning, the weather is warm just like in spring.",
        keyParagraph: 0
      },
      {
        id: "read_001_q3",
        question: "What may English people take even on a sunny morning?",
        options: [
          { label: "A", text: "A book." },
          { label: "B", text: "An umbrella or a raincoat." },
          { label: "C", text: "A camera." },
          { label: "D", text: "A hat." }
        ],
        answer: "B",
        explanation: "原文：English people usually take an umbrella or a raincoat with them on a sunny morning.",
        keyParagraph: 2
      },
      {
        id: "read_001_q4",
        question: "What does the word \"regret\" probably mean?",
        options: [
          { label: "A", text: "Feel happy." },
          { label: "B", text: "Feel sorry." },
          { label: "C", text: "Feel angry." },
          { label: "D", text: "Feel excited." }
        ],
        answer: "B",
        explanation: "regret 意思是\"后悔\"，feel sorry = 感到遗憾/后悔。",
        keyParagraph: 2
      },
      {
        id: "read_001_q5",
        question: "Which is the best title for the passage?",
        options: [
          { label: "A", text: "Four Seasons." },
          { label: "B", text: "The Weather in England." },
          { label: "C", text: "English People." },
          { label: "D", text: "Rain in England." }
        ],
        answer: "B",
        explanation: "全文都在讲英国的天气变化无常，The Weather in England 最能概括全文。",
        keyParagraph: 0
      }
    ]
  },
  {
    id: "read_002",
    type: "reading",
    title: "Traveling",
    passageParagraphs: [
      "Nowadays, more and more people like to travel in their holidays. Some people like to go to the countryside, while others enjoy the seaside. Different people have different ideas about how to travel.",
      "Some people prefer to travel alone. They think they can make their own plans and do what they like. However, other people like to travel with friends. They believe it is more interesting to share happiness with others.",
      "Traveling is a good way to learn new things. We can learn about different cultures, food and history. It also helps us relax and keep healthy."
    ],
    questions: [
      {
        id: "read_002_q1",
        question: "What do more and more people like to do in holidays?",
        options: [
          { label: "A", text: "They like to travel." },
          { label: "B", text: "They like to stay at home." },
          { label: "C", text: "They like to read books." },
          { label: "D", text: "They like to watch TV." }
        ],
        answer: "A",
        explanation: "原文首句：more and more people like to travel in their holidays.",
        keyParagraph: 0
      },
      {
        id: "read_002_q2",
        question: "Where do some people like to go?",
        options: [
          { label: "A", text: "To the countryside or the seaside." },
          { label: "B", text: "To the cinema." },
          { label: "C", text: "To the library." },
          { label: "D", text: "To the supermarket." }
        ],
        answer: "A",
        explanation: "原文：Some people like to go to the countryside, while others enjoy the seaside.",
        keyParagraph: 0
      },
      {
        id: "read_002_q3",
        question: "Why do some people like to travel alone?",
        options: [
          { label: "A", text: "Because they can make their own plans." },
          { label: "B", text: "Because it is cheaper." },
          { label: "C", text: "Because they don't like friends." },
          { label: "D", text: "Because it is safer." }
        ],
        answer: "A",
        explanation: "原文：They think they can make their own plans and do what they like.",
        keyParagraph: 1
      },
      {
        id: "read_002_q4",
        question: "What can we learn by traveling?",
        options: [
          { label: "A", text: "Only history." },
          { label: "B", text: "Only food." },
          { label: "C", text: "Different cultures, food and history." },
          { label: "D", text: "Nothing useful." }
        ],
        answer: "C",
        explanation: "原文：We can learn about different cultures, food and history.",
        keyParagraph: 2
      },
      {
        id: "read_002_q5",
        question: "What does the writer think of traveling?",
        options: [
          { label: "A", text: "It is boring." },
          { label: "B", text: "It is a good way to learn and relax." },
          { label: "C", text: "It is too expensive." },
          { label: "D", text: "It is dangerous." }
        ],
        answer: "B",
        explanation: "原文：Traveling is a good way to learn new things. It also helps us relax.",
        keyParagraph: 2
      }
    ]
  }
];
