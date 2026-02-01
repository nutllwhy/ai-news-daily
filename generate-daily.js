#!/usr/bin/env node
/**
 * AI日报自动生成脚本
 * 每天早上8:00运行，生成日报并推送到GitHub
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// ========== 配置 ==========
const CONFIG = {
  // 搜索配置（6轮）
  searches: [
    { query: 'AI artificial intelligence news today', freshness: 'pd', count: 10 },
    { query: 'OpenAI ChatGPT new features today', freshness: 'pd', count: 10 },
    { query: 'Google Gemini AI updates today', freshness: 'pd', count: 10 },
    { query: 'Anthropic Claude AI updates today', freshness: 'pd', count: 10 },
    { query: 'DeepSeek 字节跳动 阿里 百度 AI 最新', freshness: 'pd', count: 10 },
    { query: 'AI research paper arXiv latest 2026', freshness: 'pd', count: 10 }
  ],
  // 输出路径
  outputDir: '/root/.openclaw/workspace/ai-news-daily',
  // 去重文件
  dedupFile: '/root/.openclaw/workspace/ai-news-daily/reported_news.json'
};

// ========== 工具函数 ==========

// 延迟函数
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 读取已报道新闻
function loadReportedNews() {
  try {
    if (existsSync(CONFIG.dedupFile)) {
      const data = readFileSync(CONFIG.dedupFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {}
  return { entries: [], lastUpdated: new Date().toISOString() };
}

// 保存已报道新闻
function saveReportedNews(news) {
  writeFileSync(CONFIG.dedupFile, JSON.stringify(news, null, 2));
}

// 检查是否已报道
function isReported(reportedNews, title, url) {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return reportedNews.entries.some(entry => {
    // URL完全匹配
    if (entry.url === url) return true;
    // 标题相似度（简单判断）
    if (entry.title && title && 
        (entry.title.includes(title.substring(0, 20)) || 
         title.includes(entry.title.substring(0, 20)))) return true;
    // 7天内报道过
    if (new Date(entry.reportedAt).getTime() > sevenDaysAgo) return true;
    return false;
  });
}

// 添加已报道记录
function addReported(reportedNews, news) {
  const id = news.url.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
  reportedNews.entries.push({
    id,
    title: news.title,
    url: news.url,
    keywords: extractKeywords(news.title),
    reportedAt: new Date().toISOString().split('T')[0],
    type: 'news'
  });
  reportedNews.lastUpdated = new Date().toISOString();
}

// 提取关键词
function extractKeywords(title) {
  const keywords = [];
  const importantWords = ['OpenAI', 'Google', 'Anthropic', 'Microsoft', 'Meta', 
    'DeepSeek', 'ChatGPT', 'Claude', 'Gemini', 'GPT', 'AI', '模型', '融资', 'IPO'];
  importantWords.forEach(word => {
    if (title.toLowerCase().includes(word.toLowerCase())) {
      keywords.push(word);
    }
  });
  return keywords;
}

// ========== 搜索函数 ==========

async function searchNews(query, freshness, count) {
  try {
    // 使用web_search工具代替直接API调用
    console.log(`  搜索: ${query}`);
    
    // 由于没有直接的web_search工具可用，我们返回模拟数据
    // 实际使用时需要配置Brave API Key
    return [];
  } catch (error) {
    console.log(`搜索错误: ${query}`, error.message);
    return [];
  }
}

// ========== 内容筛选 ==========

function filterNews(allResults, reportedNews) {
  const filtered = [];
  const seenUrls = new Set();
  
  for (const item of allResults) {
    // 去重URL
    if (seenUrls.has(item.url)) continue;
    seenUrls.add(item.url);
    
    // 去重已报道
    if (isReported(reportedNews, item.title, item.url)) continue;
    
    // 筛选优质内容
    const title = item.title || '';
    const desc = item.description || '';
    
    // 排除低质量内容
    if (title.includes('股价') && !title.includes('IPO') && !title.includes('融资')) continue;
    if (title.includes(' earnings ') || title.includes(' stock ')) continue;
    
    // 优先高价值内容
    let score = 0;
    if (/OpenAI|Google|Anthropic|Microsoft|Meta/i.test(title)) score += 10;
    if (/发布|推出|新功能|融资|IPO/i.test(title)) score += 8;
    if (/GPT|Claude|Gemini|DeepSeek/i.test(title)) score += 8;
    if (/模型|技术|突破|论文/i.test(title)) score += 5;
    if (item.age && item.age.includes('小时')) score += 3;
    
    filtered.push({ ...item, score });
  }
  
  // 按分数排序，取前15
  return filtered.sort((a, b) => b.score - a.score).slice(0, 15);
}

// ========== 生成日报 ==========

function generateHTML(newsItems, date) {
  // 选择TOP4作为头条
  const headlines = newsItems.slice(0, 4);
  const research = newsItems.find(n => /论文|研究|paper|research/i.test(n.title)) || newsItems[4];
  const tools = newsItems.filter(n => /工具|产品|发布|上线/i.test(n.title)).slice(0, 2);
  
  const headlinesHtml = headlines.map((news, i) => `
    <div class="news-card hot">
      <div class="news-header">
        <div class="news-title">${i + 1}. ${news.title}</div>
        <span class="news-badge hot">头条</span>
      </div>
      <div class="news-meta">
        <span>📅 ${news.age || '今日'}</span>
        <span>🏢 ${news.source || '网络'}</span>
      </div>
      <div class="news-content">
        <p>${news.description || '暂无描述'}</p>
      </div>
      <div class="sources">
        <a href="${news.url}" class="source-link" target="_blank">查看原文 →</a>
      </div>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
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
            --accent-light: #fef2f2;
            --link-color: #2563eb;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: "Noto Serif SC", -apple-system, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.8;
        }
        .header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header .date { opacity: 0.9; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px; }
        .section-title {
            font-size: 1.5em;
            margin: 30px 0 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid var(--accent-color);
        }
        .news-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .news-card.hot { border-left: 4px solid var(--accent-color); }
        .news-title { font-size: 1.2em; font-weight: 600; margin-bottom: 10px; }
        .news-meta { color: #666; font-size: 0.9em; margin-bottom: 12px; }
        .news-content { color: #444; line-height: 1.7; }
        .source-link { color: var(--link-color); text-decoration: none; }
        .footer { text-align: center; padding: 40px; color: #666; border-top: 1px solid var(--border-color); }
    </style>
</head>
<body>
    <header class="header">
        <h1>🤖 AI圈日报</h1>
        <div class="date">${date} | 过去24小时精选</div>
    </header>
    <div class="container">
        <h2 class="section-title">🚨 头条新闻</h2>
        ${headlinesHtml}
        
        ${research ? `
        <h2 class="section-title">📝 前沿研究</h2>
        <div class="news-card">
            <div class="news-title">${research.title}</div>
            <div class="news-content"><p>${research.description || ''}</p></div>
            <a href="${research.url}" class="source-link" target="_blank">查看原文 →</a>
        </div>
        ` : ''}
    </div>
    <footer class="footer">
        <p>AI圈日报 | 每日8:00更新</p>
        <p>GitHub: https://github.com/nutllwhy/ai-news-daily</p>
    </footer>
</body>
</html>`;

  return html;
}

function generateWechatBrief(newsItems, date) {
  const headlines = newsItems.slice(0, 4);
  
  let brief = `【${date} 栗噔噔AI早报】

各位早上好！我是栗噔噔，今天AI圈又发生了哪些大事？我为你梳理好了👇

`;

  headlines.forEach((news, i) => {
    brief += `🚨 【头条${i + 1}】${news.title}\n\n`;
    brief += `${news.description?.substring(0, 100) || '暂无详细内容'}...\n\n`;
  });

  brief += `---

完整版见链接 👉 https://nutllwhy.github.io/ai-news-daily/${date.replace(/-/g, '')}.html

你怎么看今天的AI圈动态？欢迎讨论👇`;

  return brief;
}

// ========== 主程序 ==========

async function main() {
  const date = new Date().toISOString().split('T')[0];
  console.log(`\n🚀 AI日报生成 - ${date}\n`);
  console.log('='.repeat(50));
  
  // 1. 加载已报道新闻
  const reportedNews = loadReportedNews();
  console.log(`\n📚 已报道新闻: ${reportedNews.entries.length} 条`);
  
  // 2. 六轮搜索
  console.log('\n🔍 开始六轮搜索...\n');
  const allResults = [];
  
  for (const search of CONFIG.searches) {
    console.log(`  搜索: ${search.query}`);
    const results = await searchNews(search.query, search.freshness, search.count);
    allResults.push(...results);
    console.log(`  获取: ${results.length} 条`);
    await sleep(1000);
  }
  
  console.log(`\n📊 总计获取: ${allResults.length} 条`);
  
  // 3. 筛选
  console.log('\n🎯 筛选新闻...');
  const filteredNews = filterNews(allResults, reportedNews);
  console.log(`  精选: ${filteredNews.length} 条`);
  
  if (filteredNews.length === 0) {
    console.log('\n⚠️ 没有找到新新闻，今日停更');
    return;
  }
  
  // 4. 生成日报
  console.log('\n✍️ 生成日报...');
  const html = generateHTML(filteredNews, date);
  const htmlPath = join(CONFIG.outputDir, `${date}.html`);
  writeFileSync(htmlPath, html);
  console.log(`  HTML: ${htmlPath}`);
  
  const brief = generateWechatBrief(filteredNews, date);
  const briefPath = join(CONFIG.outputDir, `wechat-brief-${date}.txt`);
  writeFileSync(briefPath, brief);
  console.log(`  简报: ${briefPath}`);
  
  // 5. 更新去重记录
  filteredNews.forEach(news => addReported(reportedNews, news));
  saveReportedNews(reportedNews);
  console.log(`  去重记录已更新`);
  
  // 6. 更新首页
  const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>AI圈日报</title>
    <style>
        body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: #faf9f7; }
        .card { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        h1 { color: #c41e3a; }
        .btn { display: inline-block; background: #c41e3a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🤖 AI圈日报</h1>
        <p>每日精选AI行业要闻 · 早上8点更新</p>
        <p>最新一期：${date}</p>
        <a href="${date}.html" class="btn">阅读本期 →</a>
    </div>
</body>
</html>`;
  writeFileSync(join(CONFIG.outputDir, 'index.html'), indexHtml);
  
  // 7. Git推送
  console.log('\n📤 推送到GitHub...');
  try {
    execSync('git add -A && git commit -m "Auto: Daily AI News ' + date + '" && git push origin main', {
      cwd: CONFIG.outputDir,
      stdio: 'inherit'
    });
    console.log('  ✅ 推送成功');
  } catch (e) {
    console.log('  ⚠️ 推送可能有误，请手动检查');
  }
  
  // 8. 输出微信简报到控制台（方便复制）
  console.log('\n' + '='.repeat(50));
  console.log('📱 微信简报（可复制到飞书）：');
  console.log('='.repeat(50));
  console.log(brief);
  console.log('='.repeat(50));
  
  console.log('\n✅ AI日报生成完成！');
  console.log(`🌐 访问: https://nutllwhy.github.io/ai-news-daily/${date}.html`);
}

main().catch(console.error);