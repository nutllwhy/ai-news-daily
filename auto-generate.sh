#!/bin/bash
# AI日报生成脚本 - 使用系统web_search工具
# 每天早上8:00运行

echo "================================"
echo "🤖 AI日报生成"
echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "================================"
echo ""

DATE=$(date '+%Y-%m-%d')
OUTPUT_DIR="/root/.openclaw/workspace/ai-news-daily"

cd "$OUTPUT_DIR"

# 检查是否有未发送的日报
if [ -f "wechat-brief-${DATE}.txt" ]; then
    echo "✅ 今日日报已生成"
    echo ""
    echo "📱 微信简报内容:"
    cat "wechat-brief-${DATE}.txt"
    echo ""
    echo "💡 如果还没发送给用户，请复制以上内容到飞书"
    exit 0
fi

echo "⚠️ 今日日报尚未生成"
echo ""
echo "请手动运行以下命令生成日报:"
echo "  cd /root/.openclaw/workspace/ai-news-daily"
echo "  # 方法1: 使用系统web_search工具（推荐）"
echo "  # 运行6轮搜索并整理新闻"
echo ""
echo "  # 方法2: 手动整理后创建文件:"
echo "  vim ${DATE}.html        # HTML完整版"
echo "  vim wechat-brief-${DATE}.txt  # 微信简报"
echo ""
echo "然后执行:"
echo "  git add -A && git commit -m \"Add daily news ${DATE}\" && git push"
echo ""
echo "📝 日报结构参考:"
echo "  1. 6轮搜索: AI新闻/OpenAI/Google/Anthropic/中国AI/前沿研究"
echo "  2. 筛选过去24小时新闻"
echo "  3. 去重（查reported_news.json）"
echo "  4. 生成TOP4头条+研究+工具板块"
echo "  5. 输出HTML和微信简报"

echo ""
echo "================================"