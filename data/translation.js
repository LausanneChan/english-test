/* ===== 翻译题目数据 (30题) ===== */
var TRANSLATION_QUESTIONS = [
  // ===== 英译汉 (1-15) =====
  {
    id: "trans_en2cn_001", type: "translation", direction: "en2cn",
    source: "It is important to learn English well.",
    reference: "学好英语很重要。",
    keywords: ["important", "learn English well"],
    hints: ["It is important to... = 做...很重要"]
  },
  {
    id: "trans_en2cn_002", type: "translation", direction: "en2cn",
    source: "He is looking forward to hearing from you.",
    reference: "他期待收到你的来信。",
    keywords: ["look forward to", "hear from"],
    hints: ["look forward to = 期待", "hear from = 收到...的来信"]
  },
  {
    id: "trans_en2cn_003", type: "translation", direction: "en2cn",
    source: "She spent two hours doing her homework.",
    reference: "她花了两个小时做作业。",
    keywords: ["spend", "doing"],
    hints: ["spend + 时间 + doing = 花时间做"]
  },
  {
    id: "trans_en2cn_004", type: "translation", direction: "en2cn",
    source: "The book is worth reading.",
    reference: "这本书值得一读。",
    keywords: ["worth", "reading"],
    hints: ["be worth doing = 值得做"]
  },
  {
    id: "trans_en2cn_005", type: "translation", direction: "en2cn",
    source: "We should take good care of the old.",
    reference: "我们应该好好照顾老人。",
    keywords: ["take care of", "the old"],
    hints: ["take good care of = 好好照顾"]
  },
  {
    id: "trans_en2cn_006", type: "translation", direction: "en2cn",
    source: "He is used to getting up early.",
    reference: "他习惯早起。",
    keywords: ["be used to", "getting up early"],
    hints: ["be used to doing = 习惯做"]
  },
  {
    id: "trans_en2cn_007", type: "translation", direction: "en2cn",
    source: "I have lived here since 2010.",
    reference: "我从2010年就住在这里。",
    keywords: ["have lived", "since 2010"],
    hints: ["have lived = 已经住了（现在完成时）", "since = 自从"]
  },
  {
    id: "trans_en2cn_008", type: "translation", direction: "en2cn",
    source: "English is spoken all over the world.",
    reference: "全世界都讲英语。",
    keywords: ["is spoken", "all over the world"],
    hints: ["is spoken = 被讲（被动语态）", "all over the world = 全世界"]
  },
  {
    id: "trans_en2cn_009", type: "translation", direction: "en2cn",
    source: "The work must be finished today.",
    reference: "这项工作必须今天完成。",
    keywords: ["must be finished", "today"],
    hints: ["must be finished = 必须被完成"]
  },
  {
    id: "trans_en2cn_010", type: "translation", direction: "en2cn",
    source: "This is the school where I studied.",
    reference: "这就是我曾经学习的学校。",
    keywords: ["where", "studied"],
    hints: ["where = 在那里（定语从句）"]
  },
  {
    id: "trans_en2cn_011", type: "translation", direction: "en2cn",
    source: "He is so tired that he can't walk.",
    reference: "他太累了，走不动了。",
    keywords: ["so...that", "can't walk"],
    hints: ["so...that... = 如此...以至于..."]
  },
  {
    id: "trans_en2cn_012", type: "translation", direction: "en2cn",
    source: "It is said that he is a famous writer.",
    reference: "据说他是一位著名作家。",
    keywords: ["It is said that", "famous"],
    hints: ["It is said that... = 据说..."]
  },
  {
    id: "trans_en2cn_013", type: "translation", direction: "en2cn",
    source: "I won't go unless you go with me.",
    reference: "除非你和我一起去，否则我不去。",
    keywords: ["won't", "unless"],
    hints: ["unless = 除非 = if...not"]
  },
  {
    id: "trans_en2cn_014", type: "translation", direction: "en2cn",
    source: "The more you read, the more you know.",
    reference: "你读得越多，懂得就越多。",
    keywords: ["the more...the more"],
    hints: ["the + 比较级, the + 比较级 = 越...越..."]
  },
  {
    id: "trans_en2cn_015", type: "translation", direction: "en2cn",
    source: "He didn't go to bed until he finished his work.",
    reference: "他直到做完工作才去睡觉。",
    keywords: ["not...until", "finished"],
    hints: ["not...until... = 直到...才..."]
  },
  // ===== 汉译英 (16-30) =====
  {
    id: "trans_cn2en_001", type: "translation", direction: "cn2en",
    source: "我每天早上六点起床。",
    reference: "I get up at six every morning.",
    keywords: ["get up", "at six", "every morning"],
    hints: ["get up = 起床", "every morning = 每天早上（一般现在时）"]
  },
  {
    id: "trans_cn2en_002", type: "translation", direction: "cn2en",
    source: "他擅长打篮球。",
    reference: "He is good at playing basketball.",
    keywords: ["be good at", "playing basketball"],
    hints: ["be good at + doing = 擅长做"]
  },
  {
    id: "trans_cn2en_003", type: "translation", direction: "cn2en",
    source: "我们应该互相学习。",
    reference: "We should learn from each other.",
    keywords: ["learn from", "each other"],
    hints: ["learn from = 向...学习", "each other = 互相"]
  },
  {
    id: "trans_cn2en_004", type: "translation", direction: "cn2en",
    source: "我对英语很感兴趣。",
    reference: "I am very interested in English.",
    keywords: ["be interested in"],
    hints: ["be interested in = 对...感兴趣"]
  },
  {
    id: "trans_cn2en_005", type: "translation", direction: "cn2en",
    source: "他昨天去北京了。",
    reference: "He went to Beijing yesterday.",
    keywords: ["went", "yesterday"],
    hints: ["yesterday → 一般过去时", "go 的过去式 → went"]
  },
  {
    id: "trans_cn2en_006", type: "translation", direction: "cn2en",
    source: "我已经学了五年英语。",
    reference: "I have learned English for five years.",
    keywords: ["have learned", "for five years"],
    hints: ["for five years → 现在完成时", "have + 过去分词"]
  },
  {
    id: "trans_cn2en_007", type: "translation", direction: "cn2en",
    source: "请认真听老师讲课。",
    reference: "Please listen to the teacher carefully.",
    keywords: ["listen to", "carefully"],
    hints: ["listen to = 听", "carefully = 认真地"]
  },
  {
    id: "trans_cn2en_008", type: "translation", direction: "cn2en",
    source: "他不仅聪明而且勤奋。",
    reference: "He is not only clever but also hard-working.",
    keywords: ["not only...but also"],
    hints: ["not only...but also... = 不仅...而且..."]
  },
  {
    id: "trans_cn2en_009", type: "translation", direction: "cn2en",
    source: "我一到就给你打电话。",
    reference: "I will call you as soon as I arrive.",
    keywords: ["will call", "as soon as", "arrive"],
    hints: ["as soon as = 一...就...", "主将从现：主句will，从句一般现在时"]
  },
  {
    id: "trans_cn2en_010", type: "translation", direction: "cn2en",
    source: "如果你努力学习，就会成功。",
    reference: "You will succeed if you work hard.",
    keywords: ["will succeed", "if", "work hard"],
    hints: ["主将从现：if + 一般现在时", "succeed in doing = 成功做"]
  },
  {
    id: "trans_cn2en_011", type: "translation", direction: "cn2en",
    source: "这是我看过的最好的电影。",
    reference: "This is the best film I have ever seen.",
    keywords: ["the best", "have ever seen"],
    hints: ["最高级 the best", "I have ever seen = 我曾经看过的（定语从句）"]
  },
  {
    id: "trans_cn2en_012", type: "translation", direction: "cn2en",
    source: "他太小了不能上学。",
    reference: "He is too young to go to school.",
    keywords: ["too...to"],
    hints: ["too + adj. + to do = 太...而不能..."]
  },
  {
    id: "trans_cn2en_013", type: "translation", direction: "cn2en",
    source: "我们必须按时完成作业。",
    reference: "We must finish our homework on time.",
    keywords: ["must", "finish", "on time"],
    hints: ["must = 必须", "on time = 按时"]
  },
  {
    id: "trans_cn2en_014", type: "translation", direction: "cn2en",
    source: "他成功通过了考试。",
    reference: "He succeeded in passing the exam.",
    keywords: ["succeed in", "passing"],
    hints: ["succeed in doing = 成功做某事"]
  },
  {
    id: "trans_cn2en_015", type: "translation", direction: "cn2en",
    source: "我想知道他明天是否会来。",
    reference: "I want to know if he will come tomorrow.",
    keywords: ["want to know", "if", "will come"],
    hints: ["宾语从句用陈述语序", "if = 是否", "tomorrow → 将来时"]
  }
];
