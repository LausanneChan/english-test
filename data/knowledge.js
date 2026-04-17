/* ===== 高频考点数据 ===== */
var KNOWLEDGE_POINTS = [
  {
    id: "kp_001", category: "grammar", title: "时态语态",
    points: [
      {
        title: "现在完成时",
        summary: "表示过去发生、持续到现在的动作或状态",
        formula: "have/has + 过去分词(done)",
        examples: ["I have lived here since 2010.", "He has been ill for three days.", "I have already finished my homework."],
        examTips: "看到 for/since/already/yet/just → 现在完成时。for + 时间段, since + 时间点。短暂性动词(buy/borrow)不能和 for 连用，换成延续性动词(have/keep)。"
      },
      {
        title: "过去进行时",
        summary: "过去某个时刻正在进行的动作",
        formula: "was/were + doing",
        examples: ["I was doing homework when he came in.", "They were watching TV at eight yesterday."],
        examTips: "看到 at + 过去时间 / when + 过去动作 → 过去进行时。"
      },
      {
        title: "过去完成时",
        summary: "过去的过去，在某过去动作之前已完成的动作",
        formula: "had + 过去分词(done)",
        examples: ["By the time I arrived, he had left.", "By the end of last term, we had learned 2000 words."],
        examTips: "看到 by the time / by the end of + 过去时间 → 过去完成时。"
      },
      {
        title: "主将从现",
        summary: "主句将来时，从句用一般现在时表将来",
        formula: "主句(will do) + if/when/unless/as soon as + 从句(do/does)",
        examples: ["I will go if it is fine tomorrow.", "I will call you as soon as I arrive."],
        examTips: "if / when / as soon as / until / unless 后面不用 will！用一般现在时。"
      }
    ]
  },
  {
    id: "kp_002", category: "grammar", title: "被动语态",
    points: [
      {
        title: "被动语态",
        summary: "主语是动作的承受者",
        formula: "be + done（各种时态）",
        examples: ["English is spoken in many countries. (一般现在)", "The bridge was built last year. (一般过去)", "The work must be done at once. (情态动词)", "The letter has been sent. (现在完成)"],
        examTips: "被动语态核心：be + done。注意 be 动词随时态变化：is/was/been。情态动词后直接加 be done。"
      }
    ]
  },
  {
    id: "kp_003", category: "grammar", title: "非谓语动词",
    points: [
      {
        title: "to do vs doing",
        summary: "两种非谓语形式，接不同的动词",
        formula: "to do（不定式）/ doing（动名词）",
        examples: ["want/hope/decide/encourage/tell + to do", "enjoy/mind/finish/practice/keep + doing", "look forward to / be used to / pay attention to + doing"],
        examTips: "关键：to 有时是介词！look forward to, be used to, pay attention to 后接 doing。stop to do(停下来去做) ≠ stop doing(停止做)。remember to do(记得要做) ≠ remember doing(记得做过)。"
      }
    ]
  },
  {
    id: "kp_004", category: "grammar", title: "从句",
    points: [
      {
        title: "定语从句",
        summary: "修饰名词的从句",
        formula: "先行词 + 关系词 + 从句",
        examples: ["The man who is standing there is my uncle. (who→人)", "I like the book which you bought. (which→物)", "This is the boy whose father is a doctor. (whose→的)", "This is the school where I studied. (where→地点)"],
        examTips: "who 人(主/宾), which 物, that 万能, whose 表所属, where 地点作状语。that 最高频！"
      },
      {
        title: "宾语从句",
        summary: "作宾语的从句",
        formula: "主句 + 引导词 + 从句(陈述语序!)",
        examples: ["I don't know whether he will come.", "Could you tell me where the station is? (不是 where is the station)", "He asked me if I liked the movie."],
        examTips: "必考点：陈述语序！主语在谓语前面。表是否用 if/whether。"
      },
      {
        title: "状语从句",
        summary: "表示时间、条件、原因、让步等",
        formula: "连词 + 从句",
        examples: ["if/unless 条件 (主将从现)", "when/while/as soon as 时间", "because 原因", "although/though 让步 (不与but同用)", "not...until 直到...才"],
        examTips: "although 和 but 不能同时用！unless = if...not。not...until...直到...才。"
      }
    ]
  },
  {
    id: "kp_005", category: "grammar", title: "虚拟语气",
    points: [
      {
        title: "虚拟语气",
        summary: "表达假设、愿望等非真实情况",
        formula: "if + 过去式(be用were), 主句 + would + 动词原形",
        examples: ["If I were you, I would study harder.", "I wish I were a bird."],
        examTips: "虚拟语气 be 动词一律用 were。wish 后也用虚拟。"
      }
    ]
  },
  {
    id: "kp_006", category: "grammar", title: "固定句型",
    points: [
      {
        title: "so/such...that / too...to",
        summary: "结果和程度表达",
        formula: "so + adj./adv. + that / such + n. + that / too + adj. + to do",
        examples: ["He is so tired that he can't walk.", "He is such a kind man that everyone likes him.", "The box is too heavy for me to carry."],
        examTips: "so 后接形容词/副词，such 后接名词。too...to = 太...而不能。"
      },
      {
        title: "其他固定句型",
        summary: "高频必考句型",
        formula: "the+比较级,the+比较级 / not only...but also / It's + adj + to do",
        examples: ["The harder you work, the better grades you will get.", "Not only you but also I am wrong. (就近原则)", "It is important to learn English well."],
        examTips: "the + 比较级，the + 比较级（越...越...）。not only...but also 就近原则。"
      }
    ]
  },
  {
    id: "kp_007", category: "vocabulary", title: "介词搭配",
    points: [
      {
        title: "时间介词",
        summary: "in / on / at 的用法",
        formula: "in + 年/月/季节; on + 日/星期; at + 时刻",
        examples: ["in 1990 / in January / in summer", "on Monday / on May 1st", "at six / at 8:30"],
        examTips: "年月季节用in，日期星期用on，具体时刻用at。"
      },
      {
        title: "交通方式",
        summary: "by / on / in 表示交通方式",
        formula: "by + 交通工具(无冠词); on foot",
        examples: ["by bus / by train / by car / by plane", "on foot (步行)"],
        examTips: "步行是 on foot，不是 by foot。by 后面不加冠词 the/a。"
      },
      {
        title: "固定介词搭配",
        summary: "高频介词短语",
        formula: "be good at / be interested in / be proud of / take care of / learn from / agree with / succeed in",
        examples: ["be good at doing 擅长", "be interested in 对...感兴趣", "be proud of 为...骄傲", "succeed in doing 成功做"],
        examTips: "每年必考3-5题介词搭配。熟记：at(擅长/时刻), in(兴趣/年月/成功), of(骄傲/照顾), from(学习), with(同意)。"
      }
    ]
  },
  {
    id: "kp_008", category: "vocabulary", title: "易混词",
    points: [
      {
        title: "易混词必记",
        summary: "每年考3-5题",
        formula: "区分动词/名词、及物/不及物",
        examples: ["affect(动)/effect(名) 影响", "rise(升,不及物)/raise(举,及物)", "spend(人)/cost(物)/take(it)/pay(人)", "advice(名)/advise(动)", "hard(努力地)/hardly(几乎不)"],
        examTips: "重点区分：affect是动词effect是名词；spend主语是人cost主语是物；hard努力hardly几乎不。"
      }
    ]
  }
];
