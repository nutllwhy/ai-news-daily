#!/bin/bash
# AI日报自动脚本
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
    echo "✅ 日报生成成功"
    
    # 发送飞书通知（如果有配置）
    DATE=$(date '+%Y-%m-%d')
    BRIEF_FILE="wechat-brief-${DATE}.txt"
    
    if [ -f "$BRIEF_FILE" ]; then
        echo ""
        echo "📱 微信简报内容:"
        cat "$BRIEF_FILE"
        echo ""
        echo "💡 请复制以上内容发送到飞书"
    fi
    
    echo ""
    echo "🌐 访问地址: https://nutllwhy.github.io/ai-news-daily/"
else
    echo "❌ 日报生成失败"
    exit 1
fi

echo ""
echo "================================"
echo "✨ 完成！"
echo "下次运行: 明天 08:00"
echo "================================"