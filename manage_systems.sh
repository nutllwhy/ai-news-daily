#!/bin/bash
# Clawdbot 三系统管理脚本
# 用于恢复和管理三个自动推送系统

echo "🤖 Clawdbot 三系统管理工具"
echo "============================"
echo ""

# 检查工作目录
if [ ! -d "/root/.openclaw/workspace/ai-news-daily" ]; then
    echo "❌ 错误：工作目录不存在"
    echo "正在从GitHub恢复..."
    git clone https://github.com/nutllwhy/ai-news-daily.git /root/.openclaw/workspace/ai-news-daily
fi

cd /root/.openclaw/workspace/ai-news-daily

echo "📁 当前位置：$(pwd)"
echo ""

# 显示系统状态
echo "📊 三系统状态检查"
echo "-------------------"

# 1. AI日报
echo ""
echo "1️⃣ AI日报系统"
if [ -f "AI_DAILY_TASK.md" ]; then
    echo "   ✅ 配置文件存在"
    echo "   📄 最新日报：$(ls -t 2026*.html 2>/dev/null | head -1 || echo '无')"
else
    echo "   ❌ 配置文件缺失"
fi

# 2. Reddit情报
echo ""
echo "2️⃣ Reddit情报系统"
if [ -f "REDDIT_INTEL_TASK.md" ]; then
    echo "   ✅ 配置文件存在"
    if [ -d "reddit_intel" ]; then
        echo "   📁 情报目录存在"
    else
        echo "   ⚠️  情报目录待创建"
    fi
else
    echo "   ❌ 配置文件缺失"
fi

# 3. 基金管理
echo ""
echo "3️⃣ 基金管理系统"
if [ -f "FUND_MANAGEMENT_TASK.md" ]; then
    echo "   ✅ 配置文件存在"
    if [ -f "fund_portfolio.json" ]; then
        echo "   📄 持仓档案已建立"
    else
        echo "   ⚠️  持仓档案待填写"
    fi
else
    echo "   ❌ 配置文件缺失"
fi

echo ""
echo "🔧 可用操作"
echo "-----------"
echo "1. 查看AI日报配置"
echo "2. 查看Reddit情报配置"
echo "3. 查看基金管理配置"
echo "4. 检查Git状态"
echo "5. 推送到GitHub备份"
echo "6. 退出"
echo ""

read -p "请选择操作 [1-6]: " choice

case $choice in
    1)
        cat AI_DAILY_TASK.md | head -50
        ;;
    2)
        cat REDDIT_INTEL_TASK.md
        ;;
    3)
        cat FUND_MANAGEMENT_TASK.md
        ;;
    4)
        git status
        ;;
    5)
        git add -A
        git commit -m "Backup: $(date '+%Y-%m-%d %H:%M:%S')"
        git push origin main
        echo "✅ 已推送到GitHub"
        ;;
    6)
        echo "再见！"
        exit 0
        ;;
    *)
        echo "无效选择"
        ;;
esac