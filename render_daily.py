import json
import os
import sys
from datetime import datetime

# 读取输入数据
def load_data(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# 读取模板
def load_template(template_path):
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

# 渲染新闻列表项
def render_news_items(items):
    html = ""
    for news in items:
        html += f"""
            <article class="article-card">
                <div class="section-header">
                    <span class="section-icon">{news.get('icon', '📰')}</span>
                    <span class="section-title">{news.get('category', '行业动态')}</span>
                </div>
                <h3 class="article-title">{news.get('title', '')}</h3>
                <div class="article-meta">{news.get('meta', '')}</div>
                <div class="article-body">
                    {news.get('body', '')}
                </div>
                <div class="sources">
                    <span style="color: var(--text-muted); font-size: 0.85em;">来源：</span>
                    <a href="{news.get('source_url', '#')}" class="source-link" target="_blank">{news.get('source_name', 'Source')}</a>
                </div>
            </article>
        """
    return html

# 渲染数据侧边栏
def render_stats(stats):
    html = ""
    for stat in stats:
        html += f"""
            <li class="data-item">
                <div class="data-number" style="color: {stat.get('color', '#c41e3a')}">{stat.get('value', '')}</div>
                <div class="data-label">{stat.get('label', '')}</div>
            </li>
        """
    return html

# 渲染回顾
def render_review(items):
    html = ""
    for item in items:
        html += f'<p style="margin-bottom: 12px;">{item}</p>'
    return html

# 主函数
def main():
    if len(sys.argv) < 2:
        print("Usage: python render_daily.py <data.json>")
        sys.exit(1)
        
    data_path = sys.argv[1]
    template_path = os.path.join(os.path.dirname(__file__), 'template_v3.html')
    output_path = os.path.join(os.path.dirname(__file__), f"{datetime.now().strftime('%Y-%m-%d')}.html")
    index_path = os.path.join(os.path.dirname(__file__), 'index.html')
    
    data = load_data(data_path)
    template = load_template(template_path)
    
    # 填空
    html = template.replace('{{DATE_STR}}', data.get('date_str', ''))
    html = html.replace('{{DATE_FULL}}', data.get('date_full', ''))
    html = html.replace('{{ISSUE_NO}}', data.get('issue_no', '第 00X 期'))
    
    # 头条
    hl = data.get('headline', {})
    html = html.replace('{{HEADLINE_TITLE}}', hl.get('title', ''))
    html = html.replace('{{HEADLINE_SUBTITLE}}', hl.get('subtitle', ''))
    html = html.replace('{{HEADLINE_TIME}}', hl.get('time', ''))
    html = html.replace('{{HEADLINE_CONTENT}}', hl.get('content', ''))
    
    sources_html = ""
    for s in hl.get('sources', []):
        sources_html += f'<a href="{s["url"]}" class="source-link" target="_blank">{s["name"]}</a>'
    html = html.replace('{{HEADLINE_SOURCES}}', sources_html)
    
    # 列表
    html = html.replace('{{NEWS_ITEMS}}', render_news_items(data.get('news_list', [])))
    html = html.replace('{{STATS_ITEMS}}', render_stats(data.get('stats', [])))
    html = html.replace('{{REVIEW_ITEMS}}', render_review(data.get('review', [])))
    
    # 写入
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    # 更新首页
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"Generated {output_path} and index.html")

if __name__ == "__main__":
    main()
