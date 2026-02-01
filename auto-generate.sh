#!/bin/bash
# AI日报自动生成脚本
# 每天早上8:00运行

echo "================================"
echo "🤖 AI日报自动生成"
echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "================================"
echo ""

cd /root/.openclaw/workspace/ai-news-daily

# 运行日报生成脚本
echo "🔄 开始生成日报..."
node generate-daily.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 日报生成流程完成"
    echo ""
    echo "📝 请检查:"
    echo "  1. HTML文件是否正确生成"
    echo "  2. 微信简报内容是否完整"
    echo "  3. Git推送是否成功"
    echo ""
    echo "💡 如果生成成功但未推送，请手动执行:"
    echo "  git add -A && git commit -m \"Daily news $(date '+%Y-%m-%d')\" && git push"
else
    echo ""
    echo "❌ 日报生成失败，请检查日志"
    echo "日志: /var/log/ai_daily.log"
fi

echo ""
echo "================================"
echo "✨ 完成！"
echo "下次运行: 明天 08:00"
echo "================================"