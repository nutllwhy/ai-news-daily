# AI日报风格规范

> 本文件记录《AI圈日报》的HTML样式规范，用于指导每日日报生成。
> 最后更新：2026-02-02

## 一、整体风格定位

**报纸头版感设计**，区别于典型AI编程风格的渐变卡片UI。

### 设计原则
- 衬线字体（宋体类），更像传统报纸
- 米色纸张质感（浅色模式）/ 深灰护眼（深色模式）
- 红色点缀（类似传统报纸红标题）
- 清晰的信息层级和分栏布局
- 深色/浅色主题切换功能

---

## 二、页面结构

```
顶部栏（日期 + 主题切换）
    ↓
报头（大字报头 + 副标题 + 版次信息）
    ↓
导航栏（锚点链接）
    ↓
主内容区（2:1 分栏）
    ├── 头版头条（全宽）
    │   ├── 红色「头版头条」标签
    │   ├── 大标题
    │   ├── 副标题
    │   ├── 作者/时间
    │   ├── 📌 关键信息模块（蓝色边框）
    │   ├── 导语正文
    │   └── 📰 信息来源（带链接）
    │
    ├── 新闻列表（左侧2/3）
    │   └── 文章卡片 × N
    │       ├── 分类图标 + 标题
    │       ├── 文章标题
    │       ├── 来源/时间
    │       ├── 📌 关键信息模块
    │       ├── 正文
    │       └── 📰 信息来源（带链接）
    │
    └── 侧边栏（右侧1/3）
        ├── 📊 今日数据
        ├── 📅 昨日回顾
        └── ℹ️ 关于本报
    ↓
页脚
```

---

## 三、关键模块规范

### 1. 顶部信息
```
第 XXX 期 | 栗噔噔AI社群 | 过去24小时精选
```
- **必须**使用「栗噔噔AI社群」，不使用「北京版」等地域标识

### 2. 头版头条模块
```html
<article class="front-page">
    <span class="headline-label">头版头条</span>
    <h2 class="headline">标题</h2>
    <p class="subheadline">副标题</p>
    <div class="byline">作者 | 发布时间</div>
    
    <!-- 关键信息（蓝色边框） -->
    <div class="key-points">
        <div class="key-points-title">📌 关键信息</div>
        <ul>
            <li><strong>时间：</strong>xxx</li>
            <li><strong>地点/公司：</strong>xxx</li>
            <li><strong>核心数据：</strong>xxx</li>
            <li><strong>意义/影响：</strong>xxx</li>
        </ul>
    </div>
    
    <div class="lead">导语正文...</div>
    
    <!-- 信息来源 -->
    <div class="source-box">
        <span class="source-label">📰 信息来源</span>
        <div class="source-links">
            <a href="xxx" class="source-link" target="_blank">来源名称</a>
        </div>
    </div>
</article>
```

### 3. 普通文章卡片
```html
<article class="article-card">
    <div class="section-header">
        <span class="section-icon">⚖️</span>
        <span class="section-title">分类名称</span>
    </div>
    <h3 class="article-title">标题</h3>
    <div class="article-meta">来源 | 发布时间</div>
    
    <div class="key-points">...</div>
    <div class="article-body">正文...</div>
    <div class="source-box">...</div>
</article>
```

### 4. 分类图标规范
| 分类 | 图标 |
|------|------|
| 头版头条 | 🚨 |
| 伦理争议 | ⚖️ |
| 行业动态 | 💬 |
| 投融资 | 💰 |
| 前沿研究 | 📝 |
| 新工具 | 🛠️ |
| 新产品 | 🌐 |

### 5. 侧边栏模块

**今日数据**
- 数据卡片形式
- 大号数字 + 标签说明
- 红色强调数字

**昨日回顾**
- 日期 + 一句话摘要
- 注意数字准确性（如3500亿 vs 350亿）

---

## 四、样式规范

### CSS变量
```css
:root {
    --bg-primary: #faf9f7;      /* 米色纸张 */
    --bg-secondary: #f0ede8;     /* 次要背景 */
    --bg-card: #ffffff;          /* 卡片白 */
    --text-primary: #1a1a1a;     /* 主文字 */
    --text-secondary: #5c5c5c;   /* 次要文字 */
    --text-muted: #8a8a8a;       /* 辅助文字 */
    --border-color: #e0ddd5;     /* 边框 */
    --accent-color: #c41e3a;     /* 红色强调 */
    --accent-light: #fef2f2;     /* 浅红背景 */
    --link-color: #2563eb;       /* 链接蓝 */
    --key-point-bg: #e3f2fd;     /* 关键信息背景 */
}
```

### 字体
- 主字体：`"Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif`
- 辅助字体：`-apple-system, BlinkMacSystemFont, sans-serif`（用于日期、来源等）

### 响应式
- 桌面：2:1 分栏（主内容 : 侧边栏）
- 移动端：<900px 单列布局

---

## 五、内容生成要求

### 每条新闻必须包含
1. ✅ **标题**（简洁有力）
2. ✅ **来源和时间**（增强可信度）
3. ✅ **📌 关键信息模块**（提炼核心数据、时间、参与方）
4. ✅ **正文**（80-150字详细解读）
5. ✅ **📰 信息来源**（可点击的外部链接）

### 关键信息模块格式
```
📌 关键信息 / 📌 融资细节 / 📌 产品细节 / 📌 核心发现
- 时间：xxx
- 公司/参与方：xxx
- 金额/数据：xxx
- 意义/影响：xxx
```

---

## 六、参考文件

- **样式参考**：`20260201-newstyle.html`（报纸风格原型）
- **最新日报**：`20260202.html`（优化后的完整版）
- **本规范文件**：`STYLE.md`

---

## 七、更新记录

| 日期 | 更新内容 |
|------|----------|
| 2026-02-02 | 初始规范，基于报纸头版风格设计 |
