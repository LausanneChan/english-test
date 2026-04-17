/* ===== 词汇与语法题目数据 (90题) ===== */
var VOCAB_GRAMMAR_QUESTIONS = [
  // ===== 非谓语动词 (11-20) =====
  {
    id: "vg_011", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "I am looking forward ________ from you soon.",
    options: [
      { label: "A", text: "to hear" },
      { label: "B", text: "to hearing" },
      { label: "C", text: "hearing" },
      { label: "D", text: "hear" }
    ],
    answer: "B",
    explanation: "look forward to 中的 to 是介词，后面接动名词 doing，不是不定式。",
    rule: "look forward to + doing（注意 to 是介词，不是不定式）"
  },
  {
    id: "vg_012", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "He is used to ________ up early.",
    options: [
      { label: "A", text: "get" },
      { label: "B", text: "getting" },
      { label: "C", text: "got" },
      { label: "D", text: "gets" }
    ],
    answer: "B",
    explanation: "be used to（习惯于）中的 to 是介词，后接动名词 doing。注意区分 used to do（过去常常）。",
    rule: "be used to + doing（习惯于） vs used to + do（过去常常）"
  },
  {
    id: "vg_013", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "She spent two hours ________ her homework.",
    options: [
      { label: "A", text: "do" },
      { label: "B", text: "to do" },
      { label: "C", text: "doing" },
      { label: "D", text: "did" }
    ],
    answer: "C",
    explanation: "spend time doing sth. 是固定搭配，表示\"花费时间做某事\"。",
    rule: "spend + 时间 + doing sth."
  },
  {
    id: "vg_014", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "It took him three days ________ the work.",
    options: [
      { label: "A", text: "finish" },
      { label: "B", text: "finishing" },
      { label: "C", text: "to finish" },
      { label: "D", text: "finished" }
    ],
    answer: "C",
    explanation: "It takes sb. time to do sth. 是固定句型，用不定式 to do。",
    rule: "It takes sb. + 时间 + to do sth."
  },
  {
    id: "vg_015", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "The book is worth ________.",
    options: [
      { label: "A", text: "read" },
      { label: "B", text: "reading" },
      { label: "C", text: "to read" },
      { label: "D", text: "being read" }
    ],
    answer: "B",
    explanation: "be worth doing 是固定搭配，表示\"值得做\"。注意 worth 后直接加 doing。",
    rule: "be worth + doing（值得做）"
  },
  {
    id: "vg_016", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "We are looking forward to ________ you again.",
    options: [
      { label: "A", text: "see" },
      { label: "B", text: "seeing" },
      { label: "C", text: "seen" },
      { label: "D", text: "saw" }
    ],
    answer: "B",
    explanation: "look forward to + doing，to 是介词，see 的动名词是 seeing。",
    rule: "look forward to + doing"
  },
  {
    id: "vg_017", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "He kept ________ until midnight.",
    options: [
      { label: "A", text: "work" },
      { label: "B", text: "to work" },
      { label: "C", text: "working" },
      { label: "D", text: "worked" }
    ],
    answer: "C",
    explanation: "keep doing sth.（一直做某事）是固定搭配。",
    rule: "keep + doing（一直做/不断做）"
  },
  {
    id: "vg_018", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "My parents often encourage me ________ hard.",
    options: [
      { label: "A", text: "study" },
      { label: "B", text: "studying" },
      { label: "C", text: "to study" },
      { label: "D", text: "studied" }
    ],
    answer: "C",
    explanation: "encourage sb. to do sth.（鼓励某人做某事），用不定式。",
    rule: "encourage sb. + to do sth."
  },
  {
    id: "vg_019", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "The teacher told us ________ late for school.",
    options: [
      { label: "A", text: "not be" },
      { label: "B", text: "not to be" },
      { label: "C", text: "don't be" },
      { label: "D", text: "not being" }
    ],
    answer: "B",
    explanation: "tell sb. not to do sth.（告诉某人不要做某事），否定形式在 to 前加 not。",
    rule: "tell sb. (not) + to do sth."
  },
  {
    id: "vg_020", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "Would you mind ________ the window?",
    options: [
      { label: "A", text: "open" },
      { label: "B", text: "to open" },
      { label: "C", text: "opening" },
      { label: "D", text: "opened" }
    ],
    answer: "C",
    explanation: "mind doing sth.（介意做某事），后接动名词。",
    rule: "mind + doing sth."
  },
  // ===== 非谓语动词 (续) =====
  {
    id: "vg_021", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "I remember ________ her somewhere before.",
    options: [
      { label: "A", text: "meet" },
      { label: "B", text: "to meet" },
      { label: "C", text: "meeting" },
      { label: "D", text: "met" }
    ],
    answer: "C",
    explanation: "remember doing（记得做过）vs remember to do（记得要做）。这里\"以前见过\"，是已发生的事。",
    rule: "remember doing（记得做过） vs remember to do（记得要做）"
  },
  {
    id: "vg_022", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "He stopped ________ a rest because he was tired.",
    options: [
      { label: "A", text: "have" },
      { label: "B", text: "to have" },
      { label: "C", text: "having" },
      { label: "D", text: "had" }
    ],
    answer: "B",
    explanation: "stop to do（停下来去做）vs stop doing（停止做）。这里\"停下来休息\"，用 to do。",
    rule: "stop to do（停下来去做） vs stop doing（停止做）"
  },
  {
    id: "vg_023", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "He finished ________ the letter just now.",
    options: [
      { label: "A", text: "write" },
      { label: "B", text: "to write" },
      { label: "C", text: "writing" },
      { label: "D", text: "wrote" }
    ],
    answer: "C",
    explanation: "finish doing sth.（完成做某事）后接动名词。",
    rule: "finish + doing sth."
  },
  {
    id: "vg_024", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "The movie is well worth ________ twice.",
    options: [
      { label: "A", text: "seeing" },
      { label: "B", text: "to see" },
      { label: "C", text: "see" },
      { label: "D", text: "seen" }
    ],
    answer: "A",
    explanation: "be worth doing（值得做），well worth 表示\"非常值得\"。",
    rule: "be worth + doing"
  },
  {
    id: "vg_025", type: "vocab_grammar", category: "grammar", tag: "非谓语动词",
    question: "Please pay attention to ________ the teacher carefully.",
    options: [
      { label: "A", text: "listen to" },
      { label: "B", text: "listening to" },
      { label: "C", text: "listened to" },
      { label: "D", text: "to listen to" }
    ],
    answer: "B",
    explanation: "pay attention to 中的 to 是介词，后接动名词 doing。",
    rule: "pay attention to + doing"
  },
  // ===== 时态语态 (26-40) =====
  {
    id: "vg_026", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "I have lived here ________ 2010.",
    options: [
      { label: "A", text: "for" },
      { label: "B", text: "since" },
      { label: "C", text: "in" },
      { label: "D", text: "at" }
    ],
    answer: "B",
    explanation: "since + 过去的时间点（2010年），用现在完成时。",
    rule: "since + 时间点 → 现在完成时; for + 时间段"
  },
  {
    id: "vg_027", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "He has been ill ________ three days.",
    options: [
      { label: "A", text: "for" },
      { label: "B", text: "since" },
      { label: "C", text: "in" },
      { label: "D", text: "on" }
    ],
    answer: "A",
    explanation: "for + 时间段（三天），用现在完成时。",
    rule: "for + 时间段 → 现在完成时; since + 时间点"
  },
  {
    id: "vg_028", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "I ________ this book for two weeks.",
    options: [
      { label: "A", text: "bought" },
      { label: "B", text: "have bought" },
      { label: "C", text: "have had" },
      { label: "D", text: "had" }
    ],
    answer: "C",
    explanation: "for two weeks 表示持续状态，用现在完成时。buy 是短暂性动词，不能和 for 连用，要换成 have had。",
    rule: "短暂性动词(buy)不能和 for/since 连用，需换成延续性动词(have)"
  },
  {
    id: "vg_029", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "When I got home, my mother ________ dinner.",
    options: [
      { label: "A", text: "cooks" },
      { label: "B", text: "is cooking" },
      { label: "C", text: "was cooking" },
      { label: "D", text: "cooked" }
    ],
    answer: "C",
    explanation: "\"当我到家时，妈妈正在做饭\"。过去某个时刻正在进行的动作，用过去进行时 was/were doing。",
    rule: "过去进行时：was/were + doing（过去某时正在做）"
  },
  {
    id: "vg_030", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "By the time you came back, we ________ our work.",
    options: [
      { label: "A", text: "finished" },
      { label: "B", text: "have finished" },
      { label: "C", text: "had finished" },
      { label: "D", text: "finish" }
    ],
    answer: "C",
    explanation: "\"到你回来之前\"，工作已经完成了。过去的过去，用过去完成时 had done。",
    rule: "过去完成时：had + done（过去的过去）"
  },
  // ===== 被动语态 =====
  {
    id: "vg_031", type: "vocab_grammar", category: "grammar", tag: "被动语态",
    question: "The Great Wall ________ all over the world.",
    options: [
      { label: "A", text: "knows" },
      { label: "B", text: "knew" },
      { label: "C", text: "is known" },
      { label: "D", text: "was known" }
    ],
    answer: "C",
    explanation: "长城被全世界所知，用一般现在时的被动语态 is known。描述客观事实用一般现在时。",
    rule: "被动语态：be + done（一般现在时：is/are + done）"
  },
  {
    id: "vg_032", type: "vocab_grammar", category: "grammar", tag: "被动语态",
    question: "English ________ in many countries.",
    options: [
      { label: "A", text: "speaks" },
      { label: "B", text: "spoke" },
      { label: "C", text: "is spoken" },
      { label: "D", text: "was spoken" }
    ],
    answer: "C",
    explanation: "英语被许多国家使用，用被动语态。客观事实用一般现在时 is spoken。",
    rule: "客观事实用一般现在时被动：is/are + done"
  },
  {
    id: "vg_033", type: "vocab_grammar", category: "grammar", tag: "被动语态",
    question: "The bridge ________ last year.",
    options: [
      { label: "A", text: "built" },
      { label: "B", text: "is built" },
      { label: "C", text: "was built" },
      { label: "D", text: "builds" }
    ],
    answer: "C",
    explanation: "桥是\"被建造\"的，用被动语态。last year 表示过去，用一般过去时被动 was built。",
    rule: "一般过去时被动：was/were + done"
  },
  {
    id: "vg_034", type: "vocab_grammar", category: "grammar", tag: "被动语态",
    question: "The work must ________ at once.",
    options: [
      { label: "A", text: "do" },
      { label: "B", text: "be done" },
      { label: "C", text: "did" },
      { label: "D", text: "doing" }
    ],
    answer: "B",
    explanation: "含情态动词的被动语态：情态动词 + be done。must be done（必须被做）。",
    rule: "情态动词被动：must/can/should + be done"
  },
  {
    id: "vg_035", type: "vocab_grammar", category: "grammar", tag: "被动语态",
    question: "The letter ________ already.",
    options: [
      { label: "A", text: "has sent" },
      { label: "B", text: "has been sent" },
      { label: "C", text: "sent" },
      { label: "D", text: "sends" }
    ],
    answer: "B",
    explanation: "信已经被寄出，用现在完成时被动语态 has been done。already 常与完成时连用。",
    rule: "现在完成时被动：have/has been + done"
  },
  // ===== 从句 =====
  {
    id: "vg_036", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "This is the school ________ I studied ten years ago.",
    options: [
      { label: "A", text: "where" },
      { label: "B", text: "which" },
      { label: "C", text: "that" },
      { label: "D", text: "what" }
    ],
    answer: "A",
    explanation: "先行词是地点 the school，在从句中作地点状语（studied in the school），用 where。",
    rule: "定语从句：先行词是地点 + 从句缺状语 → where"
  },
  {
    id: "vg_037", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "The man ________ is standing there is my uncle.",
    options: [
      { label: "A", text: "which" },
      { label: "B", text: "who" },
      { label: "C", text: "whom" },
      { label: "D", text: "whose" }
    ],
    answer: "B",
    explanation: "先行词是人 the man，在从句中作主语（is standing），用 who。",
    rule: "定语从句：先行词是人 + 作主语 → who"
  },
  {
    id: "vg_038", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "I like the book ________ you bought yesterday.",
    options: [
      { label: "A", text: "who" },
      { label: "B", text: "whom" },
      { label: "C", text: "which" },
      { label: "D", text: "whose" }
    ],
    answer: "C",
    explanation: "先行词是物 the book，在从句中作宾语（bought the book），用 which 或 that。",
    rule: "定语从句：先行词是物 → which/that"
  },
  {
    id: "vg_039", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "This is the boy ________ father is a doctor.",
    options: [
      { label: "A", text: "who" },
      { label: "B", text: "whom" },
      { label: "C", text: "which" },
      { label: "D", text: "whose" }
    ],
    answer: "D",
    explanation: "whose 表示\"...的\"。whose father = the boy's father（那个男孩的爸爸）。",
    rule: "定语从句：whose = 某人的（表示所属关系）"
  },
  {
    id: "vg_040", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "I don't know ________ he will come tomorrow.",
    options: [
      { label: "A", text: "that" },
      { label: "B", text: "whether" },
      { label: "C", text: "which" },
      { label: "D", text: "what" }
    ],
    answer: "B",
    explanation: "\"是否\"用 whether 或 if。不知道他\"是否\"会来。后面有 or not 时只能用 whether。",
    rule: "宾语从句表\"是否\"：whether/if（有or not只能用whether）"
  },
  {
    id: "vg_041", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "Could you tell me ________?",
    options: [
      { label: "A", text: "where is the station" },
      { label: "B", text: "where the station is" },
      { label: "C", text: "where was the station" },
      { label: "D", text: "where the station was" }
    ],
    answer: "B",
    explanation: "宾语从句用陈述语序（主语在前，谓语在后）：where the station is，不是 where is the station。",
    rule: "宾语从句：必须用陈述语序！主语 + 谓语"
  },
  {
    id: "vg_042", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "He asked me ________ I liked the movie.",
    options: [
      { label: "A", text: "if" },
      { label: "B", text: "that" },
      { label: "C", text: "which" },
      { label: "D", text: "what" }
    ],
    answer: "A",
    explanation: "ask 后面的宾语从句表示\"是否\"，用 if 或 whether。",
    rule: "宾语从句表\"是否\"：if / whether"
  },
  // ===== 状语从句 =====
  {
    id: "vg_043", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "I will go to the park if it ________ fine tomorrow.",
    options: [
      { label: "A", text: "is" },
      { label: "B", text: "will be" },
      { label: "C", text: "was" },
      { label: "D", text: "would be" }
    ],
    answer: "A",
    explanation: "主将从现：主句用将来时(will go)，if 条件句用一般现在时(is)表将来。",
    rule: "主将从现：if/unless/when + 一般现在时表将来"
  },
  {
    id: "vg_044", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "I won't go there ________ you go.",
    options: [
      { label: "A", text: "unless" },
      { label: "B", text: "if" },
      { label: "C", text: "because" },
      { label: "D", text: "though" }
    ],
    answer: "A",
    explanation: "unless = if...not（除非）。\"除非你去，否则我不去\"。",
    rule: "unless = if...not（除非，如果不）"
  },
  {
    id: "vg_045", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "Although he is very old, ________ he still works hard.",
    options: [
      { label: "A", text: "but" },
      { label: "B", text: "so" },
      { label: "C", text: "and" },
      { label: "D", text: "/" }
    ],
    answer: "D",
    explanation: "although 和 but 不能同时使用！有 although 就不用 but。选\"/\"表示不填。",
    rule: "although 和 but 不能同时使用！"
  },
  {
    id: "vg_046", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "He didn't go to school ________ he was ill.",
    options: [
      { label: "A", text: "because" },
      { label: "B", text: "if" },
      { label: "C", text: "though" },
      { label: "D", text: "so" }
    ],
    answer: "A",
    explanation: "because（因为）引导原因状语从句。因为他生病了，所以没去上学。",
    rule: "because（因为）引导原因状语从句"
  },
  // ===== 固定句型 =====
  {
    id: "vg_047", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "He is ________ tired that he can't walk on.",
    options: [
      { label: "A", text: "very" },
      { label: "B", text: "so" },
      { label: "C", text: "too" },
      { label: "D", text: "such" }
    ],
    answer: "B",
    explanation: "so...that...（如此...以至于...）。so 后接形容词/副词。",
    rule: "so + adj./adv. + that...（如此...以至于...）"
  },
  {
    id: "vg_048", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "It is ________ a nice day that we all want to go out.",
    options: [
      { label: "A", text: "so" },
      { label: "B", text: "such" },
      { label: "C", text: "very" },
      { label: "D", text: "too" }
    ],
    answer: "B",
    explanation: "such...that...（如此...以至于...）。such 后接名词（短语）a nice day。",
    rule: "such + n. + that...（如此...以至于...）"
  },
  {
    id: "vg_049", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "The box is ________ heavy for me to carry.",
    options: [
      { label: "A", text: "so" },
      { label: "B", text: "very" },
      { label: "C", text: "too" },
      { label: "D", text: "such" }
    ],
    answer: "C",
    explanation: "too...to...（太...而不能...）。too heavy to carry = 太重了搬不动。",
    rule: "too + adj./adv. + to do（太...而不能...）"
  },
  {
    id: "vg_050", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "He is old enough ________ to school.",
    options: [
      { label: "A", text: "go" },
      { label: "B", text: "to go" },
      { label: "C", text: "going" },
      { label: "D", text: "went" }
    ],
    answer: "B",
    explanation: "enough to do（足够...可以...）。enough + adj. + to do sth.。",
    rule: "adj. + enough + to do（足够...可以...）"
  },
  // ===== 主谓一致 =====
  {
    id: "vg_051", type: "vocab_grammar", category: "grammar", tag: "主谓一致",
    question: "Not only you but also I ________ wrong.",
    options: [
      { label: "A", text: "am" },
      { label: "B", text: "is" },
      { label: "C", text: "are" },
      { label: "D", text: "be" }
    ],
    answer: "A",
    explanation: "not only...but also... 就近原则，谓语动词与最近的主语 I 一致，用 am。",
    rule: "not only...but also... / neither...nor... / either...or... → 就近原则"
  },
  {
    id: "vg_052", type: "vocab_grammar", category: "grammar", tag: "主谓一致",
    question: "Neither he nor I ________ a teacher.",
    options: [
      { label: "A", text: "am" },
      { label: "B", text: "is" },
      { label: "C", text: "are" },
      { label: "D", text: "be" }
    ],
    answer: "A",
    explanation: "neither...nor... 就近原则，谓语与最近的 I 一致，用 am。",
    rule: "neither...nor... → 就近原则，谓语与最近的主语一致"
  },
  {
    id: "vg_053", type: "vocab_grammar", category: "grammar", tag: "主谓一致",
    question: "There ________ a book and two pens on the desk.",
    options: [
      { label: "A", text: "is" },
      { label: "B", text: "are" },
      { label: "C", text: "have" },
      { label: "D", text: "has" }
    ],
    answer: "A",
    explanation: "There be 句型就近原则，最近的名词 a book 是单数，用 is。",
    rule: "There be 就近原则：看最近的名词"
  },
  {
    id: "vg_054", type: "vocab_grammar", category: "grammar", tag: "主谓一致",
    question: "The number of students in our class ________ 50.",
    options: [
      { label: "A", text: "is" },
      { label: "B", text: "are" },
      { label: "C", text: "have" },
      { label: "D", text: "has" }
    ],
    answer: "A",
    explanation: "the number of...（...的数量）作主语，谓语用单数 is。",
    rule: "the number of + 名词 → 单数（...的数量）"
  },
  {
    id: "vg_055", type: "vocab_grammar", category: "grammar", tag: "主谓一致",
    question: "A number of students ________ playing basketball.",
    options: [
      { label: "A", text: "is" },
      { label: "B", text: "are" },
      { label: "C", text: "have" },
      { label: "D", text: "has" }
    ],
    answer: "B",
    explanation: "a number of...（许多...）相当于 many，谓语用复数 are。注意区分 the number of！",
    rule: "a number of + 名词 → 复数（许多...）"
  },
  // ===== 情态动词 =====
  {
    id: "vg_056", type: "vocab_grammar", category: "grammar", tag: "情态动词",
    question: "You ________ finish your homework first.",
    options: [
      { label: "A", text: "must" },
      { label: "B", text: "may" },
      { label: "C", text: "can" },
      { label: "D", text: "need" }
    ],
    answer: "A",
    explanation: "must 表示\"必须\"，强调义务和必要性。",
    rule: "must 必须（强调义务）；may 可以/可能；can 能够；need 需要"
  },
  {
    id: "vg_057", type: "vocab_grammar", category: "grammar", tag: "情态动词",
    question: "________ I use your pen?",
    options: [
      { label: "A", text: "Must" },
      { label: "B", text: "Should" },
      { label: "C", text: "May" },
      { label: "D", text: "Need" }
    ],
    answer: "C",
    explanation: "May I...? 是请求许可的礼貌表达（我可以...吗？）。",
    rule: "May I...? 请求许可（我可以...吗？）"
  },
  {
    id: "vg_058", type: "vocab_grammar", category: "grammar", tag: "情态动词",
    question: "He ________ be in the classroom. I saw him there just now.",
    options: [
      { label: "A", text: "must" },
      { label: "B", text: "can" },
      { label: "C", text: "may" },
      { label: "D", text: "should" }
    ],
    answer: "A",
    explanation: "must be 表示肯定推测（一定在）。\"我刚看到他在那里\"说明很确定。",
    rule: "must be（肯定推测：一定...） / may be（可能推测）"
  },
  {
    id: "vg_059", type: "vocab_grammar", category: "grammar", tag: "情态动词",
    question: "You ________ smoke here. It's dangerous.",
    options: [
      { label: "A", text: "mustn't" },
      { label: "B", text: "needn't" },
      { label: "C", text: "may not" },
      { label: "D", text: "can't" }
    ],
    answer: "A",
    explanation: "mustn't 表示禁止（不允许）。\"这里禁止吸烟，很危险\"。",
    rule: "mustn't 禁止（不允许）；needn't 不必"
  },
  {
    id: "vg_060", type: "vocab_grammar", category: "grammar", tag: "情态动词",
    question: "He ________ come, but I'm not sure.",
    options: [
      { label: "A", text: "must" },
      { label: "B", text: "may" },
      { label: "C", text: "should" },
      { label: "D", text: "need" }
    ],
    answer: "B",
    explanation: "may 表示可能性推测（可能）。\"但我不确定\"说明是不太确定的推测。",
    rule: "may/might + do（可能推测，不太确定）"
  },
  // ===== 虚拟语气 =====
  {
    id: "vg_061", type: "vocab_grammar", category: "grammar", tag: "虚拟语气",
    question: "If I ________ you, I would study harder.",
    options: [
      { label: "A", text: "am" },
      { label: "B", text: "was" },
      { label: "C", text: "were" },
      { label: "D", text: "be" }
    ],
    answer: "C",
    explanation: "虚拟语气（与现在事实相反），if 从句用过去式，be 动词一律用 were。",
    rule: "虚拟语气（与现在相反）：if + 过去式(be用were), 主句 + would + 动词原形"
  },
  {
    id: "vg_062", type: "vocab_grammar", category: "grammar", tag: "虚拟语气",
    question: "I wish I ________ a bird.",
    options: [
      { label: "A", text: "am" },
      { label: "B", text: "was" },
      { label: "C", text: "were" },
      { label: "D", text: "be" }
    ],
    answer: "C",
    explanation: "wish 后的虚拟语气，be 动词用 were。I wish I were...（我希望我是...）。",
    rule: "wish + 虚拟语气：be 动词一律用 were"
  },
  // ===== 固定句型(续) =====
  {
    id: "vg_063", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "It is important ________ English well.",
    options: [
      { label: "A", text: "learn" },
      { label: "B", text: "to learn" },
      { label: "C", text: "learning" },
      { label: "D", text: "learned" }
    ],
    answer: "B",
    explanation: "It is + adj. + to do sth. 是固定句型，it 是形式主语，真正主语是 to learn。",
    rule: "It is + adj. + to do sth.（做某事是...的）"
  },
  {
    id: "vg_064", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "It's no use ________ over spilt milk.",
    options: [
      { label: "A", text: "cry" },
      { label: "B", text: "to cry" },
      { label: "C", text: "crying" },
      { label: "D", text: "cried" }
    ],
    answer: "C",
    explanation: "It's no use doing sth.（做某事没有用）。固定搭配，后接动名词。",
    rule: "It's no use + doing（做某事没用）"
  },
  // ===== 比较级/最高级 =====
  {
    id: "vg_065", type: "vocab_grammar", category: "grammar", tag: "形容词副词",
    question: "He is one of the ________ in our school.",
    options: [
      { label: "A", text: "good teacher" },
      { label: "B", text: "best teachers" },
      { label: "C", text: "better teacher" },
      { label: "D", text: "best teacher" }
    ],
    answer: "B",
    explanation: "one of the + 最高级 + 复数名词。最好的老师之一 → one of the best teachers。",
    rule: "one of the + 最高级 + 复数名词（最...之一）"
  },
  {
    id: "vg_066", type: "vocab_grammar", category: "grammar", tag: "形容词副词",
    question: "This is ________ book I have ever read.",
    options: [
      { label: "A", text: "interesting" },
      { label: "B", text: "more interesting" },
      { label: "C", text: "most interesting" },
      { label: "D", text: "the most interesting" }
    ],
    answer: "D",
    explanation: "I have ever read 表示\"读过的\"范围，用最高级。最高级前要加 the。",
    rule: "最高级：the + most + adj. / the + -est"
  },
  {
    id: "vg_067", type: "vocab_grammar", category: "grammar", tag: "形容词副词",
    question: "The ________ you work, the ________ grades you will get.",
    options: [
      { label: "A", text: "hard; good" },
      { label: "B", text: "harder; better" },
      { label: "C", text: "hardest; best" },
      { label: "D", text: "harder; good" }
    ],
    answer: "B",
    explanation: "the + 比较级..., the + 比较级...（越...越...）。越努力，成绩越好。",
    rule: "the + 比较级, the + 比较级（越...越...）"
  },
  // ===== 连词/状语从句(续) =====
  {
    id: "vg_068", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "He didn't go to bed ________ he finished his homework.",
    options: [
      { label: "A", text: "until" },
      { label: "B", text: "when" },
      { label: "C", text: "while" },
      { label: "D", text: "since" }
    ],
    answer: "A",
    explanation: "not...until...（直到...才...）。他直到做完作业才睡觉。",
    rule: "not...until...（直到...才...）"
  },
  {
    id: "vg_069", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "I will call you as soon as I ________ there.",
    options: [
      { label: "A", text: "arrive" },
      { label: "B", text: "will arrive" },
      { label: "C", text: "arrived" },
      { label: "D", text: "am arriving" }
    ],
    answer: "A",
    explanation: "as soon as 引导的时间状语从句，遵循\"主将从现\"原则，用一般现在时。",
    rule: "主将从现：as soon as / when / if + 一般现在时表将来"
  },
  {
    id: "vg_070", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "We will have a sports meeting if it ________ rain tomorrow.",
    options: [
      { label: "A", text: "won't" },
      { label: "B", text: "isn't" },
      { label: "C", text: "doesn't" },
      { label: "D", text: "didn't" }
    ],
    answer: "C",
    explanation: "主将从现：if 条件句用一般现在时。rain 是实义动词，否定用 doesn't。",
    rule: "主将从现：if + 主语 + doesn't/don't + 动词原形"
  },
  // ===== 介词搭配 =====
  {
    id: "vg_071", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He is looking forward to ________ his parents.",
    options: [
      { label: "A", text: "see" },
      { label: "B", text: "seeing" },
      { label: "C", text: "seen" },
      { label: "D", text: "saw" }
    ],
    answer: "B",
    explanation: "look forward to + doing。to 是介词，后接动名词。",
    rule: "look forward to + doing"
  },
  {
    id: "vg_072", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "She is proud ________ her son.",
    options: [
      { label: "A", text: "of" },
      { label: "B", text: "in" },
      { label: "C", text: "for" },
      { label: "D", text: "at" }
    ],
    answer: "A",
    explanation: "be proud of（为...感到骄傲）是固定搭配。",
    rule: "be proud of（为...骄傲）"
  },
  {
    id: "vg_073", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "We should take good care ________ the old.",
    options: [
      { label: "A", text: "of" },
      { label: "B", text: "for" },
      { label: "C", text: "at" },
      { label: "D", text: "with" }
    ],
    answer: "A",
    explanation: "take care of（照顾）是固定搭配。",
    rule: "take care of = look after（照顾）"
  },
  {
    id: "vg_074", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He is good ________ playing football.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "for" }
    ],
    answer: "C",
    explanation: "be good at（擅长）是固定搭配。",
    rule: "be good at（擅长）vs be good for（对...有益）"
  },
  {
    id: "vg_075", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "We arrived ________ the station at nine.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "for" }
    ],
    answer: "C",
    explanation: "arrive at + 小地点（车站、学校）；arrive in + 大地点（城市、国家）。",
    rule: "arrive at + 小地点; arrive in + 大地点"
  },
  {
    id: "vg_076", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "Please listen ________ me carefully.",
    options: [
      { label: "A", text: "at" },
      { label: "B", text: "to" },
      { label: "C", text: "for" },
      { label: "D", text: "on" }
    ],
    answer: "B",
    explanation: "listen to sb.（听某人说话）是固定搭配。",
    rule: "listen to（听）"
  },
  {
    id: "vg_077", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He is interested ________ English.",
    options: [
      { label: "A", text: "at" },
      { label: "B", text: "in" },
      { label: "C", text: "on" },
      { label: "D", text: "for" }
    ],
    answer: "B",
    explanation: "be interested in（对...感兴趣）是固定搭配。",
    rule: "be interested in（对...感兴趣）"
  },
  {
    id: "vg_078", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "We should learn ________ each other.",
    options: [
      { label: "A", text: "about" },
      { label: "B", text: "from" },
      { label: "C", text: "for" },
      { label: "D", text: "at" }
    ],
    answer: "B",
    explanation: "learn from sb.（向某人学习）是固定搭配。",
    rule: "learn from（向...学习）"
  },
  {
    id: "vg_079", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He succeeded ________ passing the exam.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "for" }
    ],
    answer: "A",
    explanation: "succeed in doing sth.（成功做某事）是固定搭配。",
    rule: "succeed in + doing（成功做某事）"
  },
  {
    id: "vg_080", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "I agree ________ you.",
    options: [
      { label: "A", text: "to" },
      { label: "B", text: "with" },
      { label: "C", text: "on" },
      { label: "D", text: "at" }
    ],
    answer: "B",
    explanation: "agree with sb.（同意某人）是固定搭配。",
    rule: "agree with sb.（同意某人）; agree to sth.（同意某事）"
  },
  // ===== 时间介词 =====
  {
    id: "vg_081", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "The sun rises ________ the east.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "from" }
    ],
    answer: "A",
    explanation: "in the east（在东方），方位用 in。",
    rule: "方位介词：in the east/west/south/north"
  },
  {
    id: "vg_082", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He went to Beijing ________ train.",
    options: [
      { label: "A", text: "on" },
      { label: "B", text: "in" },
      { label: "C", text: "by" },
      { label: "D", text: "at" }
    ],
    answer: "C",
    explanation: "by + 交通工具（乘/坐...），不加冠词。",
    rule: "by + 交通工具（by bus/train/car/plane）"
  },
  {
    id: "vg_083", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "We usually go to school ________ foot.",
    options: [
      { label: "A", text: "by" },
      { label: "B", text: "on" },
      { label: "C", text: "in" },
      { label: "D", text: "at" }
    ],
    answer: "B",
    explanation: "on foot（步行）是固定搭配。注意不是 by foot。",
    rule: "on foot（步行）; by bus/car/train"
  },
  {
    id: "vg_084", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He was born ________ 1990.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "for" }
    ],
    answer: "A",
    explanation: "in + 年份/月份（in 1990, in January）。",
    rule: "in + 年/月/季节; on + 日/星期; at + 时刻"
  },
  {
    id: "vg_085", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "We will have a meeting ________ Monday.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "for" }
    ],
    answer: "B",
    explanation: "on + 星期/具体日期（on Monday, on May 1st）。",
    rule: "on + 星期/日期; in + 年月; at + 时刻"
  },
  {
    id: "vg_086", type: "vocab_grammar", category: "vocabulary", tag: "介词搭配",
    question: "He gets up ________ six every morning.",
    options: [
      { label: "A", text: "in" },
      { label: "B", text: "on" },
      { label: "C", text: "at" },
      { label: "D", text: "for" }
    ],
    answer: "C",
    explanation: "at + 具体时刻（at six, at 8:30）。",
    rule: "at + 时刻; in + 年月; on + 日期"
  },
  // ===== 连词/逻辑 =====
  {
    id: "vg_087", type: "vocab_grammar", category: "vocabulary", tag: "固定句型",
    question: "He is too short ________ reach the book.",
    options: [
      { label: "A", text: "to" },
      { label: "B", text: "for" },
      { label: "C", text: "in" },
      { label: "D", text: "that" }
    ],
    answer: "A",
    explanation: "too...to...（太...而不能...）固定搭配。",
    rule: "too + adj. + to do（太...而不能...）"
  },
  {
    id: "vg_088", type: "vocab_grammar", category: "grammar", tag: "连词",
    question: "It is raining hard, ________ we have to stay at home.",
    options: [
      { label: "A", text: "but" },
      { label: "B", text: "so" },
      { label: "C", text: "or" },
      { label: "D", text: "and" }
    ],
    answer: "B",
    explanation: "so 表示因果关系。\"雨下得很大，所以我们不得不待在家里\"。",
    rule: "so（因此，所以）; but（但是）; or（否则）"
  },
  {
    id: "vg_089", type: "vocab_grammar", category: "grammar", tag: "连词",
    question: "Hurry up, ________ you will be late.",
    options: [
      { label: "A", text: "and" },
      { label: "B", text: "but" },
      { label: "C", text: "or" },
      { label: "D", text: "so" }
    ],
    answer: "C",
    explanation: "or 表示\"否则\"。\"快点，否则你会迟到\"。",
    rule: "祈使句 + or + 结果（...否则...）"
  },
  {
    id: "vg_090", type: "vocab_grammar", category: "grammar", tag: "连词",
    question: "He is very clever, ________ he doesn't study hard.",
    options: [
      { label: "A", text: "and" },
      { label: "B", text: "but" },
      { label: "C", text: "so" },
      { label: "D", text: "or" }
    ],
    answer: "B",
    explanation: "but 表示转折。\"他很聪明，但不努力学习\"。",
    rule: "but（但是，表转折）"
  },
  // ===== 其他高频题 =====
  {
    id: "vg_091", type: "vocab_grammar", category: "grammar", tag: "从句",
    question: "________ you work hard, you will succeed.",
    options: [
      { label: "A", text: "As long as" },
      { label: "B", text: "Although" },
      { label: "C", text: "Before" },
      { label: "D", text: "Since" }
    ],
    answer: "A",
    explanation: "as long as（只要）引导条件状语从句。\"只要你努力，你就会成功\"。",
    rule: "as long as（只要）= if"
  },
  {
    id: "vg_092", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "I don't know ________ to do next.",
    options: [
      { label: "A", text: "what" },
      { label: "B", text: "how" },
      { label: "C", text: "which" },
      { label: "D", text: "that" }
    ],
    answer: "A",
    explanation: "what to do（做什么）。疑问词 + to do 做宾语，这里缺少动作的\"内容\"用 what。",
    rule: "疑问词 + to do：what to do / how to do it / where to go"
  },
  {
    id: "vg_093", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "Please tell me ________ to get to the station.",
    options: [
      { label: "A", text: "what" },
      { label: "B", text: "how" },
      { label: "C", text: "which" },
      { label: "D", text: "where" }
    ],
    answer: "B",
    explanation: "how to get to（怎么到达）。\"怎样\"用 how。",
    rule: "how to + do（怎么做）"
  },
  {
    id: "vg_094", type: "vocab_grammar", category: "grammar", tag: "固定句型",
    question: "He is ________ a kind man that everyone likes him.",
    options: [
      { label: "A", text: "so" },
      { label: "B", text: "such" },
      { label: "C", text: "very" },
      { label: "D", text: "too" }
    ],
    answer: "B",
    explanation: "such + a/an + adj. + n. + that...。such a kind man（如此善良的人）。",
    rule: "such + a/an + adj. + n. + that..."
  },
  // ===== 代词 =====
  {
    id: "vg_095", type: "vocab_grammar", category: "grammar", tag: "代词",
    question: "I have ________ friends here, so I feel happy.",
    options: [
      { label: "A", text: "few" },
      { label: "B", text: "a few" },
      { label: "C", text: "little" },
      { label: "D", text: "a little" }
    ],
    answer: "B",
    explanation: "a few + 可数名词（一些朋友），表肯定。few 表示\"几乎没有\"（否定）。",
    rule: "a few + 可数名词（一些）; few + 可数名词（几乎没有）; a little/little + 不可数名词"
  },
  {
    id: "vg_096", type: "vocab_grammar", category: "grammar", tag: "代词",
    question: "There is ________ water in the bottle.",
    options: [
      { label: "A", text: "few" },
      { label: "B", text: "a few" },
      { label: "C", text: "little" },
      { label: "D", text: "a little" }
    ],
    answer: "C",
    explanation: "water 是不可数名词，排除 few/a few。little 表示\"几乎没有\"（瓶子里几乎没有水了）。",
    rule: "little + 不可数名词（几乎没有）; a little + 不可数名词（有一点）"
  },
  // ===== 时态(续) =====
  {
    id: "vg_097", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "He ________ to Beijing last year.",
    options: [
      { label: "A", text: "goes" },
      { label: "B", text: "went" },
      { label: "C", text: "has gone" },
      { label: "D", text: "will go" }
    ],
    answer: "B",
    explanation: "last year 表示过去的时间，用一般过去时 went。",
    rule: "last year / yesterday / in 2020 → 一般过去时"
  },
  {
    id: "vg_098", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "They ________ TV at eight yesterday evening.",
    options: [
      { label: "A", text: "watched" },
      { label: "B", text: "were watching" },
      { label: "C", text: "watch" },
      { label: "D", text: "are watching" }
    ],
    answer: "B",
    explanation: "\"昨天晚上八点\"是过去某个具体时刻正在进行的动作，用过去进行时。",
    rule: "过去具体时刻正在做 → 过去进行时 was/were doing"
  },
  {
    id: "vg_099", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "I ________ my homework when my mother came in.",
    options: [
      { label: "A", text: "did" },
      { label: "B", text: "have done" },
      { label: "C", text: "was doing" },
      { label: "D", text: "do" }
    ],
    answer: "C",
    explanation: "\"妈妈进来时\"我正在做作业。过去某时正在进行的动作用过去进行时。",
    rule: "when + 过去动作（短暂）+ was/were doing（正在进行）"
  },
  {
    id: "vg_100", type: "vocab_grammar", category: "grammar", tag: "时态",
    question: "By the end of last term, we ________ 2000 words.",
    options: [
      { label: "A", text: "learned" },
      { label: "B", text: "have learned" },
      { label: "C", text: "had learned" },
      { label: "D", text: "learn" }
    ],
    answer: "C",
    explanation: "\"到上学期末为止\"已经学了，是过去的过去，用过去完成时 had done。",
    rule: "by the end of + 过去时间 → 过去完成时 had done"
  }
];
