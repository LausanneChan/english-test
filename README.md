# 学位英语冲刺助手

这是一个面向弱基础成人本科考生的 H5 / PWA 练习应用，目标不是做一个“功能很多”的英语 App，而是帮助用户在复习时间紧、英语基础一般的情况下，更稳地冲到 60 分。

项目当前重点服务对象：

- 成人本科备考用户
- 目标考试：国开广东学位英语
- 目标分数：先过线，优先 60 分
- 学习特点：语法不牢、词汇记不住、需要白话讲解、需要错题反复复习

## 项目目标

这个项目的核心目标有 5 个：

1. 能用、稳定、不要复杂配置
2. 帮用户快速刷题并形成错题闭环
3. 用通俗中文解释题目，帮助理解和记忆
4. 支持 iPhone 上以“接近 App”的方式使用
5. 让后续 AI agent 可以低成本接力维护

## 当前功能

- 首页仪表盘
- 交际用语练习
- 词汇语法练习
- 阅读理解练习
- 完形填空练习
- 翻译练习
- 错题本
- 速记卡
- 模拟考试
- 考点速查
- 设置页

辅助能力：

- 本地错题本
- 本地学习统计
- 小白模式讲解
- 英文朗读
- 中文翻译辅助展示
- 移动端顶部 / 底部安全区适配
- PWA 基础清单与离线缓存骨架

## 技术形态

这是一个纯前端静态项目，没有后端、没有打包器、没有数据库。

技术特点：

- 页面入口：`index.html`
- 路由模式：Hash 路由，例如 `#/practice/vocab-grammar`
- UI：原生 HTML + CSS + 原生 JavaScript
- 数据：题库直接写在 `data/*.js`
- 本地存储：`localStorage`
- 离线支持：`manifest.webmanifest` + `sw.js`

这意味着：

- 上手简单，容易部署
- 改动直接、调试成本低
- 适合单人项目、AI 快速接力
- 但不适合多人并发编辑复杂数据结构，也不适合大规模题库后台管理

## 目录结构

```text
.
├── index.html                      # 页面入口，挂载导航、页面容器、脚本顺序
├── css/
│   └── style.css                   # 全局样式、响应式、移动端安全区、悬浮控件样式
├── js/
│   ├── app.js                      # 路由、导航状态、移动端抽屉、SW 注册逻辑
│   ├── store.js                    # 本地缓存、错题本、练习记录、设置项
│   ├── utils.js                    # 工具函数、朗读、中文翻译兜底、悬浮中文按钮
│   ├── coach.js                    # 小白模式讲解生成逻辑
│   └── pages/                      # 各页面渲染与交互逻辑
├── data/
│   ├── conversation.js             # 交际用语题库
│   ├── vocab-grammar.js            # 词汇语法题库
│   ├── reading.js                  # 阅读理解题库
│   ├── cloze.js                    # 完形填空题库
│   ├── translation.js              # 翻译题库
│   ├── flashcards.js               # 速记卡数据
│   ├── knowledge.js                # 考点速查数据
│   └── translation-maps.js         # 中文翻译兜底映射表
├── manifest.webmanifest            # PWA 清单
├── sw.js                           # Service Worker 离线缓存
├── PROJECT_MEMORY.md               # 项目长期背景与设计原则
├── project-memory/
│   ├── user-profile.json           # 用户画像结构化数据
│   ├── question-expansion-guide.md # 题库扩展字段与风格指南
│   └── ai-maintenance-guide.md     # AI agent 接力维护手册
└── source-data/
    └── question-template.csv       # 原始题库导入模板
```

## 文档入口

后续接力维护时，推荐按下面顺序阅读：

1. `README.md`
2. `PROJECT_MEMORY.md`
3. `project-memory/user-profile.json`
4. `project-memory/question-expansion-guide.md`
5. `project-memory/ai-maintenance-guide.md`

这 5 份文档分别解决不同问题：

- `README.md`：这个项目是什么、怎么跑、怎么改
- `PROJECT_MEMORY.md`：为什么这样做，产品目标是什么
- `user-profile.json`：用户画像的结构化表达
- `question-expansion-guide.md`：以后怎么继续扩题库
- `ai-maintenance-guide.md`：后续 AI 接手时优先看什么、不要踩什么坑

## 页面与路由

当前主要路由：

- `#/`：首页
- `#/practice/conversation`：交际用语
- `#/practice/vocab-grammar`：词汇语法
- `#/practice/reading`：阅读理解
- `#/practice/cloze`：完形填空
- `#/practice/translation`：翻译练习
- `#/wrong-book`：错题本
- `#/flashcard`：速记卡
- `#/exam`：模拟考试
- `#/knowledge`：考点速查
- `#/settings`：设置

路由总入口在 `js/app.js`。

## 数据设计

### 1. 用户数据

所有用户相关数据保存在 `localStorage`，核心键名为：

- `degree_english_app`

由 `js/store.js` 统一管理，主要内容包括：

- `wrongAnswers`：错题本
- `practiceHistory`：练习记录
- `examHistory`：模拟考试记录
- `flashcardProgress`：速记卡掌握情况
- `preferences`：用户偏好，如小白模式
- `stats`：统计信息，如考试日期、学习天数、总做题数

### 2. 题库数据

题库目前是直接写死在 `data/*.js` 中的。

题型大致分为：

- 单题选择题：交际用语、词汇语法
- 篇章 + 子题：阅读理解
- 篇章 + 空格：完形填空
- 翻译题：英译汉、汉译英

### 3. 中文翻译数据

中文辅助显示采用“两层来源”：

第一层：题库原始字段自带中文

- `questionCn`
- `option.cn`
- `titleCn`
- `passageParagraphsCn`
- `sourceCn`
- `referenceCn`

第二层：兜底映射表 `data/translation-maps.js`

使用场景：

- 原题数据还没来得及完整补中文
- 不想直接大改原始题库文件
- 需要快速补齐已有页面展示能力

统一读取入口在 `js/utils.js`，后续不要在页面里直接到处写 `question.questionCn`，优先走：

- `Utils.getQuestionCn`
- `Utils.getOptionCn`
- `Utils.getSourceCn`
- `Utils.getReferenceCn`
- `Utils.getTitleCn`
- `Utils.getPassageCn`

这样后续题库格式变化时，只需要改一层。

## 小白模式设计原则

这个项目服务的是“弱基础 + 时间紧”的用户，因此设计上有几个硬原则：

- 先帮助用户做对，再慢慢理解
- 先讲动作，再讲规则
- 避免堆语法术语
- 中文辅助不是摆设，要能帮助降低理解门槛
- 错题闭环比题库数量更重要

`js/coach.js` 负责输出“小白解题思路”。

## 朗读与翻译交互

英文朗读：

- 基于浏览器 `speechSynthesis`
- 主要用于读题干、对话、选项、短文
- 声音质量依赖浏览器和系统语音，不能保证非常自然

中文展示：

- 主要页面用悬浮按钮控制
- 悬浮按钮支持拖动，位置会保存到本地
- 错题本保留了按题单独展开中文的形式

## 移动端与 iPhone 说明

这个项目已经做了移动端适配，重点包括：

- 顶部安全区留白
- 底部安全区留白
- 底部导航
- 抽屉菜单补齐 H5 与 Web 功能差异
- 可添加到 iPhone 主屏幕

需要注意：

- 在 `localhost` 或 `127.0.0.1` 下，项目会主动清掉 SW 和缓存，避免本地开发被旧缓存干扰
- 真正想走离线 PWA，更稳妥的方式仍然是 HTTPS 部署

## 离线与缓存策略

`sw.js` 提供离线缓存骨架，会缓存主要静态文件。

但当前策略是“轻量可用”，不是“完整离线产品级方案”。

后续若强化离线能力，要重点检查：

- `sw.js` 是否包含新增数据文件
- `CACHE_NAME` 是否需要升级版本
- iPhone Safari / 添加到主屏幕后是否按预期更新

## 本地运行

这是静态项目，最简单的运行方式：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/#/
```

如果改完代码页面没变化，先手动刷新。当前项目不是基于 Vite / Webpack，没有热更新。

## 后续扩题建议

后续如果用户提供新的题库材料，建议流程是：

1. 先按 `source-data/question-template.csv` 做结构化整理
2. 按 `project-memory/question-expansion-guide.md` 补中文字段与教学字段
3. 优先保证标准答案不变
4. 再落到对应 `data/*.js`
5. 如果一时来不及改原始题库，可先把中文补到 `data/translation-maps.js`

## 当前已知设计决策

- 这是单机本地学习工具，不做账号系统
- 用户数据只保存在本地，不上传
- 题库扩展以用户提供资料为主，AI 负责补教学层
- 页面逻辑以“简单直接、容易读懂”为主，不引入框架
- 为了方便 AI 维护，公共逻辑尽量收口到 `app.js` / `store.js` / `utils.js`

## 不建议轻易改变的地方

- 不要把题目标准答案交给 AI 自动改写
- 不要把“小白模式”改成术语化讲解
- 不要让 H5 和 Web 的可用功能越来越分裂
- 不要把本地缓存结构改得过于频繁
- 不要在页面里散落写死中文取值逻辑，优先收口到 `Utils`

## 下一位维护者的最短上手路径

如果你是新的 AI agent，建议这样开始：

1. 先读 `README.md`
2. 再读 `PROJECT_MEMORY.md`
3. 看 `js/app.js`、`js/store.js`、`js/utils.js`
4. 再进入具体页面文件
5. 涉及扩题时再看 `question-expansion-guide.md`

这样上手最快，也最不容易把项目改偏。
