
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// 今天的日期
const date = '2026-02-04';
const outputDir = '/root/.openclaw/workspace/ai-news-daily';

// 1. 定义数据
const data = {
  dateStr: '2026年2月4日 星期三 | 农历腊月十七',
  headline: {
    label: '今日头条',
    title: 'Anthropic 引发万亿崩盘：AI 替代白领工作的「狼」真的来了',
    subtitle: '自动化工具重创专业服务板块，Relx、Pearson 股价暴跌，市场重新定价「AI 颠覆性」',
    byline: '栗噔噔 · 发自北京 | 发布时间：1天前',
    content: `
      <p><strong>一场由 AI 产品发布引发的资本海啸，正在席卷全球金融市场。</strong></p>
      <p>昨日，AI 独角兽 <strong>Anthropic</strong> 正式推出了一款针对法律、税务和文书工作的全新自动化协作工具（Cowork相关功能）。这一看似常规的产品更新，却成为了压垮传统专业服务巨头股价的“最后一根稻草”。</p>
      
      <h3>📉 软件板块的“黑色星期二”</h3>
      <p>市场反应极其剧烈且迅速。全球软件和服务板块在单日内市值蒸发接近 <strong>1 万亿美元</strong>。其中，受冲击最严重的是那些依赖专有数据和人力服务的公司：</p>
      <ul style="margin: 15px 0; padding-left: 20px; color: var(--text-secondary);">
          <li>数据分析巨头 <strong>Relx</strong> 和教育出版集团 <strong>Pearson</strong> 股价遭受重挫；</li>
          <li>伦敦证券交易所集团（LSEG）等金融数据服务商也未能幸免；</li>
          <li>甚至连 Adobe、Salesforce 等 SaaS 巨头也因“AI 替代逻辑”被波及。</li>
      </ul>

      <h3>🧠 为什么市场如此恐慌？</h3>
      <p>AJ Bell 的市场主管 Dan Coatue 指出：“这不再是概念演示，投资者突然意识到，AI 开始真正切入并替代昂贵的白领专业服务了。”</p>
      <p>过去，市场认为法律检索、合规审查等高门槛工作有“护城河”。但 Anthropic 的新工具证明，AI 能够以极低的成本、极高的准确率完成这些工作。这意味着，那些依然按“人头”或“订阅席位”收费的传统软件公司，其商业模式的基础正在坍塌。</p>
      
      <p><strong>结论很残酷：</strong>AI 不再只是辅助工具（Copilot），它正在成为替代者（Autopilot）。资本市场正在用脚投票，抛弃旧时代的“收租者”，转而寻找能在这场生产力革命中生存下来的新物种。</p>
    `,
    sources: [
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2026-02-03/legal-software-stocks-plunge-as-anthropic-releases-new-ai-tool' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/technology/2026/feb/03/anthropic-ai-legal-tool-shares-data-services-pearson' },
      { name: 'Reuters', url: 'https://www.reuters.com/business/media-telecom/global-software-stocks-hit-by-anthropic-wake-up-call-ai-disruption-2026-02-04/' }
    ]
  },
  newsList: [
    {
      icon: '🏢',
      category: '大厂动态',
      title: 'Google 1月 AI 更新回顾：Gemini 全面接管企业服务',
      meta: 'Google Blog | 发布时间：10小时前',
      body: `
        <p>Google 发布了官方博客，详细梳理了 1 月份的 AI 进展。与其说是“更新”，不如说是 Gemini 模型对 Google 生态的<strong>全面接管</strong>。核心变化集中在零售和企业服务领域：</p>
        <p><strong>1. 零售业的深度集成：</strong> Google 推出了新的 AI 代理功能，帮助零售商自动处理客户咨询、库存管理甚至是个性化推荐。这不仅是聊天机器人，而是能直接调用后端 API 执行任务的 Agent。</p>
        <p><strong>2. Workspace 生产力跃升：</strong> Gemini 在 Docs、Sheets 和 Slides 中的能力进一步增强。现在的 Gemini 不仅能“写”，还能“读懂”复杂的企业知识库，帮助员工在海量文档中快速提取关键信息。</p>
        <p>这表明 Google 的策略正在从“通用大模型比拼”转向“场景化落地”，利用其庞大的 B 端客户群构建 AI 护城河。</p>
      `,
      source: { name: 'Google Blog', url: 'https://blog.google/innovation-and-ai/products/google-ai-updates-january-2026/' }
    },
    {
      icon: '💬',
      category: '行业声音',
      title: 'Oura CEO：可穿戴设备将进入“预测医疗”时代',
      meta: 'BusinessToday | 发布时间：19小时前',
      body: `
        <p>在迪拜举行的世界政府峰会上，智能戒指品牌 Oura 的 CEO Tom Hale 发表了关于数字健康的重磅观点。他认为，现在的可穿戴设备大多停留在“记录过去”（走了多少步、睡了多久），而下一阶段的核心是<strong>“预测未来”</strong>。</p>
        <p>Hale 表示，结合 AI 大模型分析能力，可穿戴设备将能够：</p>
        <ul style="margin-bottom:10px; padding-left:15px; color:var(--text-secondary);">
          <li>利用连续的生物特征数据（心率变异性、体温趋势等），提前数年识别出慢性病的早期信号；</li>
          <li>在用户生病<strong>之前</strong>发出预警，从而彻底重塑医疗体系——从“治病”转向“防病”。</li>
        </ul>
        <p>这一愿景强调了 AI 在处理海量纵向健康数据方面的独特优势，也是未来几年 HealthTech 领域最大的增长点。</p>
      `,
      source: { name: 'BusinessToday', url: 'https://www.businesstoday.in/technology/news/story/world-governments-summit-2026-oura-ceo-tom-hale-sees-ai-wearables-forecasting-health-years-ahead-514543-2026-02-04' }
    },
    {
      icon: '🛠️',
      category: '新工具',
      title: 'Wispr Flow：不仅是听写，更是“读心”的写作助手',
      meta: 'Product Hunt | 发布时间：5小时前',
      body: `
        <p>Product Hunt 上备受关注的 <strong>Wispr Flow</strong> 并不是又一个普通的语音转文字工具。它的核心痛点解决得非常精准：<strong>我们说话的方式和写作的方式是完全不同的。</strong></p>
        <p>传统的听写工具（如 Siri）只是忠实记录你的口语（包括“呃”、“那个”），结果往往是一堆需要大量修整的废话。而 Wispr Flow 利用大模型能力，能够理解你的<strong>意图</strong>。</p>
        <p>你可以对着它语无伦次地倾诉想法，它会自动整理逻辑、润色措辞，直接生成一篇结构清晰的邮件或文章草稿。它还主打<strong>隐私优先</strong>，所有音频处理都经过严格加密，适合对数据安全敏感的专业人士。</p>
      `,
      source: { name: 'Product Hunt', url: 'https://www.producthunt.com/categories/ai-dictation-apps' }
    },
    {
      icon: '📱',
      category: '开发者工具',
      title: 'NexaSDK：让多模态 AI 跑在用户的口袋里',
      meta: 'Product Hunt | 发布时间：19小时前',
      body: `
        <p>随着端侧 AI（On-device AI）成为趋势，开发者面临的最大难题是如何将庞大的多模态模型塞进手机里。<strong>NexaSDK</strong> 就是为了解决这个问题而生的。</p>
        <p>它提供了一套完整的移动端部署方案，支持 iOS 和 Android。通过极致的模型量化和推理优化，它能让手机在<strong>离线状态</strong>下运行复杂的多模态任务（如图像识别、语音交互）。</p>
        <p><strong>价值点：</strong></p>
        <ul style="margin-bottom:10px; padding-left:15px; color:var(--text-secondary);">
          <li><strong>零延迟：</strong>无需网络请求，交互极快；</li>
          <li><strong>隐私安全：</strong>数据不出设备，解决了用户对上传照片/语音的顾虑；</li>
          <li><strong>零成本：</strong>省去了昂贵的云端 GPU 推理费用。</li>
        </ul>
      `,
      source: { name: 'Product Hunt', url: 'https://www.producthunt.com/categories/ai-infrastructure' }
    }
  ],
  sidebar: {
    stats: [
      { label: '软件板块市值蒸发', value: '$1 Trillion', color: '#c41e3a' },
      { label: 'CIO AI 采用率增长', value: '+282%', color: '#2563eb' },
      { label: 'Snowflake 客户数', value: '12,600+', color: '#1a1a1a' },
      { label: '今日重要新闻', value: '5', color: '#1a1a1a' }
    ],
    review: [
      '<strong>2月3日</strong><br>Anthropic发布Cowork自动化工具',
      '<strong>2月2日</strong><br>DeepSeek发布多模态新模型',
      '<strong>2月1日</strong><br>OpenAI宣布GPT-4.5预览版测试',
      '<strong>1月31日</strong><br>Meta开源Llama 4早期权重'
    ]
  }
};

// 2. HTML 模板 (CSS 复用 20260201-newstyle.html)
const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI圈日报 - ${date}</title>
    <style>
        :root {
            /* 浅色主题（默认） */
            --bg-primary: #faf9f7;
            --bg-secondary: #f0ede8;
            --bg-card: #ffffff;
            --text-primary: #1a1a1a;
            --text-secondary: #5c5c5c;
            --text-muted: #8a8a8a;
            --border-color: #e0ddd5;
            --accent-color: #c41e3a;
            --accent-light: #fef2f2;
            --link-color: #2563eb;
            --link-hover: #1d4ed8;
            --shadow: 0 1px 3px rgba(0,0,0,0.05);
            --header-bg: #1a1a1a;
            --header-text: #ffffff;
        }

        [data-theme="dark"] {
            /* 深色主题 */
            --bg-primary: #1a1a1a;
            --bg-secondary: #242424;
            --bg-card: #2a2a2a;
            --text-primary: #f5f5f5;
            --text-secondary: #b0b0b0;
            --text-muted: #808080;
            --border-color: #404040;
            --accent-color: #ff6b6b;
            --accent-light: #3a2a2a;
            --link-color: #60a5fa;
            --link-hover: #93c5fd;
            --shadow: 0 1px 3px rgba(0,0,0,0.3);
            --header-bg: #0a0a0a;
            --header-text: #f5f5f5;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.8;
            transition: background 0.3s, color 0.3s;
        }

        /* 顶部栏 */
        .top-bar {
            background: var(--header-bg);
            color: var(--header-text);
            padding: 12px 0;
            border-bottom: 3px solid var(--accent-color);
        }
        .top-bar-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .date-weather { font-size: 0.9em; opacity: 0.9; font-family: -apple-system, sans-serif; }
        
        /* 主题切换开关 */
        .theme-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 20px;
            background: rgba(255,255,255,0.1);
            transition: background 0.2s;
        }
        .theme-toggle:hover { background: rgba(255,255,255,0.2); }
        .theme-toggle span { font-size: 0.85em; font-family: -apple-system, sans-serif; }
        .toggle-switch {
            width: 44px;
            height: 24px;
            background: rgba(255,255,255,0.3);
            border-radius: 12px;
            position: relative;
            transition: background 0.3s;
        }
        .toggle-switch::after {
            content: "☀️";
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            transition: transform 0.3s;
        }
        [data-theme="dark"] .toggle-switch::after { content: "🌙"; transform: translateX(20px); }

        /* 报头 */
        .masthead {
            text-align: center;
            padding: 40px 20px;
            background: var(--bg-primary);
            border-bottom: 1px solid var(--border-color);
        }
        .newspaper-title {
            font-size: 4em;
            font-weight: 900;
            letter-spacing: 0.1em;
            color: var(--text-primary);
            margin-bottom: 10px;
        }
        .tagline { font-size: 1.1em; color: var(--text-muted); font-style: italic; letter-spacing: 0.05em; }
        .edition-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-family: -apple-system, sans-serif;
            font-size: 0.9em;
            color: var(--text-secondary);
        }

        /* 导航 */
        .nav-bar {
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            justify-content: center;
            gap: 40px;
            flex-wrap: wrap;
        }
        .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.95em;
            font-weight: 500;
            padding: 5px 0;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
            font-family: -apple-system, sans-serif;
        }
        .nav-link:hover { color: var(--accent-color); border-bottom-color: var(--accent-color); }

        /* 主内容区 */
        .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
        }

        /* 头版新闻 */
        .front-page {
            grid-column: 1 / -1;
            background: var(--bg-card);
            padding: 40px;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow);
            margin-bottom: 20px;
        }
        .headline-label {
            display: inline-block;
            background: var(--accent-color);
            color: white;
            padding: 4px 12px;
            font-size: 0.75em;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 20px;
            font-family: -apple-system, sans-serif;
        }
        .headline { font-size: 2.5em; font-weight: 700; line-height: 1.3; margin-bottom: 20px; color: var(--text-primary); }
        .subheadline { font-size: 1.3em; color: var(--text-secondary); margin-bottom: 25px; font-weight: 400; }
        .byline {
            font-size: 0.9em;
            color: var(--text-muted);
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
            font-family: -apple-system, sans-serif;
        }
        .lead { font-size: 1.15em; line-height: 1.9; color: var(--text-primary); text-align: justify; }
        .lead strong { color: var(--accent-color); }
        .lead h3 { font-size: 1.3em; margin: 25px 0 15px; color: var(--text-primary); border-left: 4px solid var(--accent-color); padding-left: 10px; }

        /* 新闻网格 */
        .news-grid { grid-column: 1; display: flex; flex-direction: column; gap: 30px; }
        .article-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 30px;
            box-shadow: var(--shadow);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .article-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        
        .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid var(--accent-color);
        }
        .section-icon { font-size: 1.5em; }
        .section-title { font-size: 1.3em; font-weight: 700; color: var(--text-primary); text-transform: uppercase; }
        
        .article-title { font-size: 1.5em; font-weight: 700; margin-bottom: 12px; line-height: 1.4; color: var(--text-primary); }
        .article-meta { font-size: 0.85em; color: var(--text-muted); margin-bottom: 15px; font-family: -apple-system, sans-serif; }
        .article-body { color: var(--text-secondary); line-height: 1.8; }
        .article-body p { margin-bottom: 1em; }
        .article-body strong { color: var(--text-primary); font-weight: 600; }

        /* 侧边栏 */
        .sidebar { grid-column: 2; display: flex; flex-direction: column; gap: 30px; }
        .sidebar-box {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 25px;
            box-shadow: var(--shadow);
        }
        .sidebar-title {
            font-size: 1.1em;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-color);
            color: var(--text-primary);
            text-transform: uppercase;
        }
        .data-list { list-style: none; }
        .data-item { padding: 15px 0; border-bottom: 1px solid var(--border-color); }
        .data-item:last-child { border-bottom: none; }
        .data-number { font-size: 2em; font-weight: 700; color: var(--accent-color); font-family: -apple-system, sans-serif; }
        .data-label { font-size: 0.9em; color: var(--text-secondary); margin-top: 5px; }

        /* 研究卡片特殊样式 */
        .research-highlight {
            background: var(--accent-light);
            border-left: 4px solid var(--accent-color);
            padding: 20px;
            margin: 15px 0;
        }
        .research-title { font-weight: 700; color: var(--accent-color); margin-bottom: 10px; }

        /* 来源链接 */
        .sources { margin-top: 20px; padding-top: 15px; border-top: 1px dashed var(--border-color); }
        .source-link {
            display: inline-block;
            color: var(--link-color);
            text-decoration: none;
            font-size: 0.85em;
            margin-right: 15px;
            font-family: -apple-system, sans-serif;
        }
        .source-link:hover { color: var(--link-hover); text-decoration: underline; }

        /* 底部 */
        .footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            padding: 40px;
            text-align: center;
            margin-top: 40px;
        }
        .footer-title { font-size: 1.5em; font-weight: 700; margin-bottom: 10px; color: var(--text-primary); }
        .footer-text { color: var(--text-muted); font-size: 0.9em; }

        @media (max-width: 900px) {
            .main-content { grid-template-columns: 1fr; padding: 20px; }
            .sidebar { grid-column: 1; }
            .newspaper-title { font-size: 2.5em; }
            .headline { font-size: 1.8em; }
            .top-bar-content, .nav-content { padding: 0 20px; }
        }
    </style>
</head>
<body>
    <!-- 顶部栏 -->
    <div class="top-bar">
        <div class="top-bar-content">
            <div class="date-weather">${data.dateStr}</div>
            <div class="theme-toggle" onclick="toggleTheme()">
                <span>浅色</span>
                <div class="toggle-switch"></div>
                <span>深色</span>
            </div>
        </div>
    </div>

    <!-- 报头 -->
    <header class="masthead">
        <h1 class="newspaper-title">AI圈日报</h1>
        <p class="tagline">「 每日精选人工智能行业要闻 」</p>
        <div class="edition-info">
            第 005 期 | 栗噔噔AI社群 | 过去24小时精选
        </div>
    </header>

    <!-- 导航 -->
    <nav class="nav-bar">
        <div class="nav-content">
            <a href="#headlines" class="nav-link">头条新闻</a>
            <a href="#news-list" class="nav-link">行业动态</a>
            <a href="#data" class="nav-link">今日数据</a>
            <a href="#review" class="nav-link">本周回顾</a>
        </div>
    </nav>

    <!-- 主内容 -->
    <main class="main-content">
        <!-- 头版头条 -->
        <article class="front-page" id="headlines">
            <span class="headline-label">${data.headline.label}</span>
            <h2 class="headline">${data.headline.title}</h2>
            <p class="subheadline">${data.headline.subtitle}</p>
            <div class="byline">${data.headline.byline}</div>
            <div class="lead">
                ${data.headline.content}
            </div>
            <div class="sources">
                <span style="color: var(--text-muted); font-size: 0.85em;">参考来源：</span>
                ${data.headline.sources.map(s => `<a href="${s.url}" class="source-link" target="_blank">${s.name}</a>`).join('')}
            </div>
        </article>

        <!-- 新闻网格 -->
        <div class="news-grid" id="news-list">
            ${data.newsList.map(news => `
            <article class="article-card">
                <div class="section-header">
                    <span class="section-icon">${news.icon}</span>
                    <span class="section-title">${news.category}</span>
                </div>
                <h3 class="article-title">${news.title}</h3>
                <div class="article-meta">${news.meta}</div>
                <div class="article-body">
                    ${news.body}
                </div>
                <div class="sources">
                    <span style="color: var(--text-muted); font-size: 0.85em;">来源：</span>
                    <a href="${news.source.url}" class="source-link" target="_blank">${news.source.name}</a>
                </div>
            </article>
            `).join('')}
        </div>

        <!-- 侧边栏 -->
        <aside class="sidebar">
            <div class="sidebar-box" id="data">
                <h3 class="sidebar-title">📊 今日数据</h3>
                <ul class="data-list">
                    ${data.sidebar.stats.map(stat => `
                    <li class="data-item">
                        <div class="data-number" style="color: ${stat.color}">${stat.value}</div>
                        <div class="data-label">${stat.label}</div>
                    </li>
                    `).join('')}
                </ul>
            </div>

            <div class="sidebar-box" id="review">
                <h3 class="sidebar-title">📅 本周回顾</h3>
                <div style="font-size: 0.9em; line-height: 1.8; color: var(--text-secondary);">
                    ${data.sidebar.review.map(item => `<p style="margin-bottom: 12px;">${item}</p>`).join('')}
                </div>
            </div>

            <div class="sidebar-box">
                <h3 class="sidebar-title">ℹ️ 关于本报</h3>
                <div style="font-size: 0.9em; color: var(--text-secondary); line-height: 1.7;">
                    <p style="margin-bottom: 10px;">《AI圈日报》每日北京时间8:00更新，精选过去24小时内人工智能行业重要新闻。</p>
                    <p>编辑：栗噔噔<br>技术支持：OpenClaw AI</p>
                </div>
            </div>
        </aside>
    </main>

    <!-- 底部 -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-title">AI圈日报</div>
            <p class="footer-text">每日精选AI行业要闻 · 早上8点更新<br>数据来源：Reuters、Bloomberg、TechCrunch等权威媒体</p>
        </div>
    </footer>

    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    </script>
</body>
</html>`;

// 3. 写入文件
console.log('Writing HTML...');
fs.writeFileSync(path.join(outputDir, `${date}.html`), htmlTemplate);
fs.writeFileSync(path.join(outputDir, 'index.html'), htmlTemplate);

// 4. Git 推送
console.log('Pushing to GitHub...');
try {
  execSync('git config --global user.email "bot@openclaw.ai"');
  execSync('git config --global user.name "OpenClaw Bot"');
  execSync('git add .', { cwd: outputDir });
  execSync(`git commit -m "Content expansion: Daily AI News ${date} (V3)"`, { cwd: outputDir });
  execSync('git push origin main', { cwd: outputDir });
  console.log('Done.');
} catch (e) {
  console.error('Git push failed:', e.message);
}
