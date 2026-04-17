/* ===== 交际用语题目数据 (10题) ===== */
var CONVERSATION_QUESTIONS = [
  {
    id: "conv_001",
    type: "conversation",
    scene: "感谢",
    dialogue: [
      { speaker: "A", text: "Thank you so much for your help." },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "No thanks" },
      { label: "B", text: "My pleasure" },
      { label: "C", text: "Never mind" },
      { label: "D", text: "That's right" }
    ],
    answer: "B",
    explanation: "回答感谢用 My pleasure（我的荣幸）或 You're welcome。Never mind 是回答道歉的。",
    tips: "感谢回答：My pleasure. / You're welcome. / It's my pleasure."
  },
  {
    id: "conv_002",
    type: "conversation",
    scene: "道歉",
    dialogue: [
      { speaker: "A", text: "I'm sorry I'm late." },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Sure" },
      { label: "B", text: "It doesn't matter" },
      { label: "C", text: "Not at all" },
      { label: "D", text: "Thank you" }
    ],
    answer: "B",
    explanation: "回答道歉用 It doesn't matter（没关系）或 Never mind。Sure 是回答请求的。",
    tips: "道歉回答：It doesn't matter. / Never mind. / That's OK. / Don't worry."
  },
  {
    id: "conv_003",
    type: "conversation",
    scene: "邀请",
    dialogue: [
      { speaker: "A", text: "Would you like some coffee?" },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Yes, I would" },
      { label: "B", text: "No, I wouldn't" },
      { label: "C", text: "Yes, please" },
      { label: "D", text: "Yes, I like" }
    ],
    answer: "C",
    explanation: "Would you like...? 的肯定回答是 Yes, please. 否定回答是 No, thanks. 注意不能说 Yes, I would。",
    tips: "Would you like...? → Yes, please. / No, thanks."
  },
  {
    id: "conv_004",
    type: "conversation",
    scene: "问候",
    dialogue: [
      { speaker: "A", text: "How is everything going?" },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Fine, thanks" },
      { label: "B", text: "You're welcome" },
      { label: "C", text: "That's all right" },
      { label: "D", text: "Not at all" }
    ],
    answer: "A",
    explanation: "How is everything going?（最近怎么样？）回答 Fine, thanks（挺好的，谢谢）。",
    tips: "问候回答：Fine, thanks. / Very well. / Not bad."
  },
  {
    id: "conv_005",
    type: "conversation",
    scene: "请求",
    dialogue: [
      { speaker: "A", text: "May I use your dictionary?" },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Yes, you may" },
      { label: "B", text: "Yes, here you are" },
      { label: "C", text: "No, you don't" },
      { label: "D", text: "It doesn't matter" }
    ],
    answer: "B",
    explanation: "请求借东西，回答 Yes, here you are（好的，给你）。不能机械重复 Yes, you may。",
    tips: "借东西：Here you are. / Of course. / Go ahead."
  },
  {
    id: "conv_006",
    type: "conversation",
    scene: "购物",
    dialogue: [
      { speaker: "A", text: "What can I do for you?" },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "I want a T-shirt" },
      { label: "B", text: "Thank you" },
      { label: "C", text: "Not bad" },
      { label: "D", text: "Here you are" }
    ],
    answer: "A",
    explanation: "What can I do for you?（能帮您什么？）是购物场景用语，回答说出你要买的东西。",
    tips: "购物：What can I do for you? / Can I help you? → I'd like... / I want..."
  },
  {
    id: "conv_007",
    type: "conversation",
    scene: "建议",
    dialogue: [
      { speaker: "A", text: "Shall we go for a walk?" },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "That's a good idea" },
      { label: "B", text: "You're right" },
      { label: "C", text: "Yes, we do" },
      { label: "D", text: "That's OK" }
    ],
    answer: "A",
    explanation: "Shall we...?（我们...好吗？）是建议句型，赞同用 That's a good idea.",
    tips: "建议回答：That's a good idea. / Sounds great. / I'd love to."
  },
  {
    id: "conv_008",
    type: "conversation",
    scene: "赞同",
    dialogue: [
      { speaker: "A", text: "I think English is very useful." },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "All right" },
      { label: "B", text: "That's all" },
      { label: "C", text: "I agree with you" },
      { label: "D", text: "No problem" }
    ],
    answer: "C",
    explanation: "表达赞同某人的观点用 I agree with you（我同意你的看法）。",
    tips: "赞同：I agree with you. / I think so too. / You're right."
  },
  {
    id: "conv_009",
    type: "conversation",
    scene: "请求帮助",
    dialogue: [
      { speaker: "A", text: "Could you help me carry the box?" },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "With pleasure" },
      { label: "B", text: "It's a pleasure" },
      { label: "C", text: "That's right" },
      { label: "D", text: "No, thanks" }
    ],
    answer: "A",
    explanation: "With pleasure（乐意效劳）是回答请求帮助的。It's a pleasure 是回答感谢的，注意区分！",
    tips: "请求→With pleasure. 感谢→My pleasure. / It's a pleasure."
  },
  {
    id: "conv_010",
    type: "conversation",
    scene: "告别",
    dialogue: [
      { speaker: "A", text: "See you tomorrow." },
      { speaker: "B", text: "______" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Good morning" },
      { label: "B", text: "See you" },
      { label: "C", text: "Thank you" },
      { label: "D", text: "Fine" }
    ],
    answer: "B",
    explanation: "See you tomorrow 回答 See you（明天见）。告别场景最简单的回应。",
    tips: "告别：See you. / See you later. / Goodbye."
  }
];
