/* ===== 阅读理解题目数据 (2篇) ===== */
var READING_QUESTIONS = [
  {
    id: "read_001",
    type: "reading",
    title: "The Weather in England",
    titleCn: "英国的天气",
    passageParagraphs: [
      "In England, people often talk about the weather because they can experience four seasons in one day. In the morning, the weather is warm just like in spring. An hour later, black clouds come and then it rains hard. The weather gets a little cold. In the late afternoon, the sky will be sunny, the sun will begin to shine, and it will be summer at this time of a day.",
      "In England, people can also have summer in winter, or have winter in summer. So in winter they can swim sometimes, and in summer sometimes they should take warm clothes.",
      "When you go to England, you will see some English people usually take an umbrella or a raincoat with them on a sunny morning, but you should not laugh at them. If you don't take an umbrella or a raincoat, you will regret later in the day."
    ],
    passageParagraphsCn: [
      "在英国，人们经常谈论天气，因为他们可能在一天里经历四季。早上天气像春天一样暖和；过一会儿乌云来了，大雨也来了，天气又会变冷。到了傍晚，天空放晴，太阳出来，这时又像夏天一样。",
      "在英国，冬天也可能像夏天，夏天也可能像冬天。所以冬天有时能游泳，而夏天有时却要带上保暖衣服。",
      "当你去英国时，你会看到有些英国人在晴天早晨也会带着伞或雨衣，你不要笑他们。如果你不带伞或雨衣，到了当天晚些时候你就会后悔。"
    ],
    questions: [
      {
        id: "read_001_q1",
        question: "Why do people in England often talk about the weather?",
        questionCn: "为什么英国人经常谈论天气？",
        options: [
          { label: "A", text: "Because they like the weather.", cn: "因为他们喜欢天气。" },
          { label: "B", text: "Because they can experience four seasons in one day.", cn: "因为他们一天里能经历四季。" },
          { label: "C", text: "Because it is always raining.", cn: "因为那里总是在下雨。" },
          { label: "D", text: "Because the weather is always warm.", cn: "因为那里的天气总是暖和。" }
        ],
        answer: "B",
        explanation: "文章第一句就给出了答案：because they can experience four seasons in one day。",
        keyParagraph: 0
      },
      {
        id: "read_001_q2",
        question: "What is the weather like in the morning in England?",
        questionCn: "英国早上的天气怎么样？",
        options: [
          { label: "A", text: "It is warm just like in spring.", cn: "天气温暖，像春天一样。" },
          { label: "B", text: "It is always cold.", cn: "总是很冷。" },
          { label: "C", text: "It is always rainy.", cn: "总是在下雨。" },
          { label: "D", text: "It is very hot.", cn: "天气很热。" }
        ],
        answer: "A",
        explanation: "原文：In the morning, the weather is warm just like in spring.",
        keyParagraph: 0
      },
      {
        id: "read_001_q3",
        question: "What may English people take even on a sunny morning?",
        questionCn: "即使在晴天早晨，英国人也可能会带什么？",
        options: [
          { label: "A", text: "A book.", cn: "一本书。" },
          { label: "B", text: "An umbrella or a raincoat.", cn: "一把伞或一件雨衣。" },
          { label: "C", text: "A camera.", cn: "一台相机。" },
          { label: "D", text: "A hat.", cn: "一顶帽子。" }
        ],
        answer: "B",
        explanation: "原文：English people usually take an umbrella or a raincoat with them on a sunny morning.",
        keyParagraph: 2
      },
      {
        id: "read_001_q4",
        question: "What does the word \"regret\" probably mean?",
        questionCn: "单词“regret”大概是什么意思？",
        options: [
          { label: "A", text: "Feel happy.", cn: "感到高兴。" },
          { label: "B", text: "Feel sorry.", cn: "感到后悔 / 遗憾。" },
          { label: "C", text: "Feel angry.", cn: "感到生气。" },
          { label: "D", text: "Feel excited.", cn: "感到兴奋。" }
        ],
        answer: "B",
        explanation: "regret 意思是\"后悔\"，feel sorry = 感到遗憾/后悔。",
        keyParagraph: 2
      },
      {
        id: "read_001_q5",
        question: "Which is the best title for the passage?",
        questionCn: "这篇文章最好的标题是什么？",
        options: [
          { label: "A", text: "Four Seasons.", cn: "四季。" },
          { label: "B", text: "The Weather in England.", cn: "英国的天气。" },
          { label: "C", text: "English People.", cn: "英国人。" },
          { label: "D", text: "Rain in England.", cn: "英国的雨。" }
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
    titleCn: "旅行",
    passageParagraphs: [
      "Nowadays, more and more people like to travel in their holidays. Some people like to go to the countryside, while others enjoy the seaside. Different people have different ideas about how to travel.",
      "Some people prefer to travel alone. They think they can make their own plans and do what they like. However, other people like to travel with friends. They believe it is more interesting to share happiness with others.",
      "Traveling is a good way to learn new things. We can learn about different cultures, food and history. It also helps us relax and keep healthy."
    ],
    passageParagraphsCn: [
      "如今，越来越多的人喜欢在假期旅行。有的人喜欢去乡村，有的人喜欢海边。不同的人对怎样旅行有不同的看法。",
      "有些人更喜欢独自旅行。他们认为这样可以自己做计划，做自己喜欢的事。不过，也有人喜欢和朋友一起旅行，因为他们觉得和别人分享快乐更有意思。",
      "旅行是学习新事物的好方式。我们可以了解不同的文化、食物和历史。旅行也能帮助我们放松并保持健康。"
    ],
    questions: [
      {
        id: "read_002_q1",
        question: "What do more and more people like to do in holidays?",
        questionCn: "越来越多的人在假期喜欢做什么？",
        options: [
          { label: "A", text: "They like to travel.", cn: "他们喜欢旅行。" },
          { label: "B", text: "They like to stay at home.", cn: "他们喜欢待在家里。" },
          { label: "C", text: "They like to read books.", cn: "他们喜欢读书。" },
          { label: "D", text: "They like to watch TV.", cn: "他们喜欢看电视。" }
        ],
        answer: "A",
        explanation: "原文首句：more and more people like to travel in their holidays.",
        keyParagraph: 0
      },
      {
        id: "read_002_q2",
        question: "Where do some people like to go?",
        questionCn: "有些人喜欢去哪里？",
        options: [
          { label: "A", text: "To the countryside or the seaside.", cn: "去乡村或海边。" },
          { label: "B", text: "To the cinema.", cn: "去电影院。" },
          { label: "C", text: "To the library.", cn: "去图书馆。" },
          { label: "D", text: "To the supermarket.", cn: "去超市。" }
        ],
        answer: "A",
        explanation: "原文：Some people like to go to the countryside, while others enjoy the seaside.",
        keyParagraph: 0
      },
      {
        id: "read_002_q3",
        question: "Why do some people like to travel alone?",
        questionCn: "为什么有些人喜欢独自旅行？",
        options: [
          { label: "A", text: "Because they can make their own plans.", cn: "因为他们可以自己做计划。" },
          { label: "B", text: "Because it is cheaper.", cn: "因为更便宜。" },
          { label: "C", text: "Because they don't like friends.", cn: "因为他们不喜欢朋友。" },
          { label: "D", text: "Because it is safer.", cn: "因为更安全。" }
        ],
        answer: "A",
        explanation: "原文：They think they can make their own plans and do what they like.",
        keyParagraph: 1
      },
      {
        id: "read_002_q4",
        question: "What can we learn by traveling?",
        questionCn: "通过旅行我们可以学到什么？",
        options: [
          { label: "A", text: "Only history.", cn: "只有历史。" },
          { label: "B", text: "Only food.", cn: "只有食物。" },
          { label: "C", text: "Different cultures, food and history.", cn: "不同的文化、食物和历史。" },
          { label: "D", text: "Nothing useful.", cn: "没有任何有用的东西。" }
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
