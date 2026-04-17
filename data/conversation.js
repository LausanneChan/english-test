/* ===== 交际用语题目数据 (10题) ===== */
var CONVERSATION_QUESTIONS = [
  {
    id: "conv_001",
    type: "conversation",
    scene: "感谢",
    dialogue: [
      { speaker: "A", text: "Thank you so much for your help.", cn: "非常感谢你的帮助。" },
      { speaker: "B", text: "______", cn: "不客气 / 很乐意。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "No thanks", cn: "不用了，谢谢" },
      { label: "B", text: "My pleasure", cn: "我的荣幸；不客气" },
      { label: "C", text: "Never mind", cn: "没关系" },
      { label: "D", text: "That's right", cn: "那是对的" }
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
      { speaker: "A", text: "I'm sorry I'm late.", cn: "对不起，我迟到了。" },
      { speaker: "B", text: "______", cn: "没关系。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Sure", cn: "当然" },
      { label: "B", text: "It doesn't matter", cn: "没关系" },
      { label: "C", text: "Not at all", cn: "一点也不" },
      { label: "D", text: "Thank you", cn: "谢谢你" }
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
      { speaker: "A", text: "Would you like some coffee?", cn: "你想来点咖啡吗？" },
      { speaker: "B", text: "______", cn: "好的，请来一点。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Yes, I would", cn: "是的，我会" },
      { label: "B", text: "No, I wouldn't", cn: "不，我不会" },
      { label: "C", text: "Yes, please", cn: "好的，请给我来点" },
      { label: "D", text: "Yes, I like", cn: "是的，我喜欢" }
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
      { speaker: "A", text: "How is everything going?", cn: "最近一切怎么样？" },
      { speaker: "B", text: "______", cn: "挺好的，谢谢。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Fine, thanks", cn: "挺好的，谢谢" },
      { label: "B", text: "You're welcome", cn: "不客气" },
      { label: "C", text: "That's all right", cn: "没关系" },
      { label: "D", text: "Not at all", cn: "一点也不" }
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
      { speaker: "A", text: "May I use your dictionary?", cn: "我可以用一下你的字典吗？" },
      { speaker: "B", text: "______", cn: "可以，给你。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Yes, you may", cn: "是的，你可以" },
      { label: "B", text: "Yes, here you are", cn: "可以，给你" },
      { label: "C", text: "No, you don't", cn: "不，你不" },
      { label: "D", text: "It doesn't matter", cn: "没关系" }
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
      { speaker: "A", text: "What can I do for you?", cn: "我能为您做点什么？" },
      { speaker: "B", text: "______", cn: "我想买一件 T 恤。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "I want a T-shirt", cn: "我想买一件 T 恤" },
      { label: "B", text: "Thank you", cn: "谢谢你" },
      { label: "C", text: "Not bad", cn: "还不错" },
      { label: "D", text: "Here you are", cn: "给你" }
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
      { speaker: "A", text: "Shall we go for a walk?", cn: "我们去散步好吗？" },
      { speaker: "B", text: "______", cn: "这是个好主意。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "That's a good idea", cn: "这是个好主意" },
      { label: "B", text: "You're right", cn: "你说得对" },
      { label: "C", text: "Yes, we do", cn: "是的，我们是" },
      { label: "D", text: "That's OK", cn: "那没关系" }
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
      { speaker: "A", text: "I think English is very useful.", cn: "我认为英语很有用。" },
      { speaker: "B", text: "______", cn: "我同意你的看法。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "All right", cn: "好的" },
      { label: "B", text: "That's all", cn: "就这些" },
      { label: "C", text: "I agree with you", cn: "我同意你的看法" },
      { label: "D", text: "No problem", cn: "没问题" }
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
      { speaker: "A", text: "Could you help me carry the box?", cn: "你能帮我搬这个箱子吗？" },
      { speaker: "B", text: "______", cn: "很乐意。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "With pleasure", cn: "很乐意" },
      { label: "B", text: "It's a pleasure", cn: "这是我的荣幸" },
      { label: "C", text: "That's right", cn: "那是对的" },
      { label: "D", text: "No, thanks", cn: "不了，谢谢" }
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
      { speaker: "A", text: "See you tomorrow.", cn: "明天见。" },
      { speaker: "B", text: "______", cn: "再见 / 明天见。" }
    ],
    blankIndex: 1,
    options: [
      { label: "A", text: "Good morning", cn: "早上好" },
      { label: "B", text: "See you", cn: "再见 / 回头见" },
      { label: "C", text: "Thank you", cn: "谢谢你" },
      { label: "D", text: "Fine", cn: "很好" }
    ],
    answer: "B",
    explanation: "See you tomorrow 回答 See you（明天见）。告别场景最简单的回应。",
    tips: "告别：See you. / See you later. / Goodbye."
  }
];
