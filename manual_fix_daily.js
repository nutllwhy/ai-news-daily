
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// 今天的日期
const date = '2026-02-04';
const outputDir = '/root/.openclaw/workspace/ai-news-daily';

// 硬编码的新闻数据（基于刚才的搜索结果）
const newsItems = [
  {
    title: "Anthropic 发布新 AI 自动化工具，全球软件股单日蒸发近 1 万亿美元",
    description: "Anthropic 推出了针对法律和文书工作的自动化工具，直接导致 Relx、Pearson 等专业服务和数据公司股价大跌。市场恐慌在于：AI 开始真正替代昂贵的白领专业服务了。",
    source: "Bloomberg / The Guardian",
    age: "1天前",
    url: "https://www.bloomberg.com/news/articles/2026-02-03/legal-software-stocks-plunge-as-anthropic-releases-new-ai-tool",
    score: 100
  },
  {
    title: "Google 1月 AI 更新回顾：Gemini 全面接管企业服务",
    description: "Google 发布博客回顾 1 月进展，重点强调 AI 在零售和企业服务中的深度集成，以及 Gemini 模型在各产品线的全面铺开。",
    source: "Google Blog",
    age: "10小时前",
    url: "https://blog.google/innovation-and-ai/products/google-ai-updates-january-2026/",
    score: 90
  },
  {
    title: "Oura CEO：可穿戴设备将进入“预测医疗”时代",
    description: "在世界政府峰会上，Oura CEO 表示，结合 AI 的可穿戴设备将不再只是记录步数，而是能提前数年预测长期健康结果，重塑医疗体系。",
    source: "BusinessToday",
    age: "19小时前",
    url: "https://www.businesstoday.in/technology/news/story/world-governments-summit-2026-oura-ceo-tom-hale-sees-ai-wearables-forecasting-health-years-ahead-514543-2026-02-04",
    score: 85
  },
  {
    title: "Wispr Flow：语音写作新利器，不仅仅是听写",
    description: "Product Hunt 上备受关注的 AI 听写工具，主打精准、隐私保护，让语音转文字不仅仅是记录，而是直接辅助写作。",
    source: "Product Hunt",
    age: "5小时前",
    url: "https://www.producthunt.com/categories/ai-dictation-apps",
    score: 80
  },
  {
    title: "NexaSDK：让多模态 AI 轻松跑在手机上",
    description: "为开发者提供的移动端部署方案，大幅降低了多模态模型在本地设备上运行的门槛。",
    source: "Product Hunt",
    age: "19小时前",
    url: "https://www.producthunt.com/categories/ai-infrastructure",
    score: 75
  }
];

// 生成 HTML (复用 generate-daily.js 的风格)
function generateHTML(newsItems, date) {
  const headlines = newsItems.slice(0, 5); // 全部作为列表展示
  
  const headlinesHtml = headlines.map((news, i) => `
    <div class="news-card ${i === 0 ? 'hot' : ''}">
      <div class="news-header">
        <div class="news-title">${i + 1}. ${news.title}</div>
        ${i === 0 ? '<span class="news-badge hot" style="background:#c41e3a;color:white;padding:2px 8px;border-radius:4px;font-size:0.8em;">头条</span>' : ''}
      </div>
      <div class="news-meta">
        <span>📅 ${news.age}</span>
        <span>🏢 ${news.source}</span>
      </div>
      <div class="news-content">
        <p>${news.description}</p>
      </div>
      <div class="sources">
        <a href="${news.url}" class="source-link" target="_blank" style="color:#2563eb;text-decoration:none;">查看原文 →</a>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI圈日报 - ${date}</title>
    <style>
        :root {
            --bg-primary: #faf9f7;
            --bg-card: #ffffff;
            --text-primary: #1a1a1a;
            --text-secondary: #5c5c5c;
            --border-color: #e0ddd5;
            --accent-color: #c41e3a;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: "Noto Serif SC", "Songti SC", serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.8;
        }
        .header {
            background: #c41e3a;
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-bottom: 4px solid #8b1528;
        }
        .header h1 { font-size: 2.2em; margin-bottom: 10px; font-weight: 700; letter-spacing: 1px; }
        .header .date { font-size: 0.9em; opacity: 0.9; font-family: sans-serif; }
        .container { max-width: 800px; margin: 0 auto; padding: 30px 20px; }
        .section-title {
            font-size: 1.4em;
            margin: 30px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-color);
            color: var(--accent-color);
            font-weight: bold;
        }
        .news-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            border-radius: 2px;
        }
        .news-card.hot { border-left: 5px solid var(--accent-color); }
        .news-title { font-size: 1.3em; font-weight: 700; margin-bottom: 12px; line-height: 1.4; }
        .news-meta { color: #888; font-size: 0.85em; margin-bottom: 15px; font-family: sans-serif; }
        .news-content { color: #333; font-size: 1.05em; text-align: justify; }
        .footer { text-align: center; padding: 40px; color: #888; font-size: 0.9em; border-top: 1px solid #eee; margin-top: 40px; }
    </style>
</head>
<body>
    <header class="header">
        <h1>栗噔噔AI早报</h1>
        <div class="date">${date} | 每日精选 AI 行业要闻</div>
    </header>
    <div class="container">
        <h2 class="section-title">🚨 今日头条</h2>
        ${headlinesHtml}
    </div>
    <footer class="footer">
        <p>栗噔噔AI早报 | 每日8:00更新</p>
    </footer>
</body>
</html>`;
}

// 生成纯文本简报 (去Markdown)
function generateTxt(newsItems, date) {
  let txt = `【${date} 栗噔噔AI早报】\n\n`;
  txt += `各位早上好！Anthropic 昨天放了个大招，直接把全球软件股吓崩了，AI 替代专业服务的恐慌正在变成现实。\n\n`;
  
  txt += `🚨 头版头条\n`;
  txt += `1. Anthropic 发布新 AI 自动化工具，引发全球软件股暴跌\n`;
  txt += `Anthropic 推出了针对法律和文书工作的自动化工具，直接导致 Relx、Pearson 等专业服务和数据公司股价大跌，全球软件板块单日蒸发近 1 万亿美元。\n\n`;
  
  txt += `2. Google 1月 AI 更新全家桶回顾\n`;
  txt += `Google 发布博客回顾 1 月进展，重点强调 AI 在零售和企业服务中的深度集成，以及 Gemini 模型在各产品线的全面铺开。\n\n`;
  
  txt += `💬 行业声音\n`;
  txt += `3. Oura CEO：可穿戴设备将进入“预测医疗”时代\n`;
  txt += `Oura CEO 表示，结合 AI 的可穿戴设备将不再只是记录步数，而是能提前数年预测长期健康结果。\n\n`;
  
  txt += `🛠️ 新工具 & 资源\n`;
  txt += `4. Wispr Flow：语音写作新利器\n`;
  txt += `主打精准、隐私保护，让语音转文字不仅仅是记录，而是直接辅助写作。\n\n`;
  
  txt += `5. NexaSDK：在手机上跑多模态 AI\n`;
  txt += `为开发者提供的移动端部署方案，降低了多模态模型在本地设备上运行的门槛。\n\n`;
  
  txt += `完整版见链接 👉 https://nutllwhy.github.io/ai-news-daily/index.html\n`;
  
  return txt;
}

// 执行生成
console.log('Generating HTML...');
const html = generateHTML(newsItems, date);
fs.writeFileSync(path.join(outputDir, `${date}.html`), html);

// 更新 index.html
const indexHtml = html; // 简单起见，index 直接用今天的
fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);

console.log('Generating TXT...');
const txt = generateTxt(newsItems, date);
fs.writeFileSync(path.join(outputDir, `wechat-brief-${date}.txt`), txt);

console.log('Pushing to GitHub...');
try {
  execSync('git config --global user.email "bot@openclaw.ai"');
  execSync('git config --global user.name "OpenClaw Bot"');
  execSync('git add .', { cwd: outputDir });
  execSync(`git commit -m "Manual fix: Daily AI News ${date}"`, { cwd: outputDir });
  execSync('git push origin main', { cwd: outputDir });
  console.log('Done.');
} catch (e) {
  console.error('Git push failed:', e.message);
}
