#!/bin/bash

# AI News Daily - 自动化日报生成脚本
# 每天北京时间8:00（UTC 00:00）自动执行

set -e

echo "🤖 开始生成 AI 日报..."
echo "📅 日期: $(date '+%Y-%m-%d')"
echo "⏰ 时间: $(date '+%H:%M:%S')"

# 设置工作目录
WORK_DIR="/root/.openclaw/workspace/ai-news-daily"
cd "$WORK_DIR"

# 获取当前日期
TODAY=$(date '+%Y-%m-%d')
YESTERDAY=$(date -d "yesterday" '+%Y-%m-%d' 2>/dev/null || date -v-1d '+%Y-%m-%d' 2>/dev/null || echo "yesterday")

echo "📊 开始搜索新闻..."

# 这里将由 OpenClaw Agent 执行实际的搜索和生成
# 通过 cron 触发 agent 任务
echo "✅ 日报生成任务已触发"

# 如果有新生成的文件，推送到GitHub
if [ -f "${TODAY}.html" ]; then
    echo "📤 推送到 GitHub..."
    git add .
    git commit -m "Update: AI News Daily - ${TODAY}" || echo "No changes to commit"
    git push origin main
    echo "✅ 推送完成！"
else
    echo "⚠️ 未找到新生成的日报文件"
fi

echo "🎉 任务完成！"
echo "🌐 访问地址: https://nutllwhy.github.io/ai-news-daily/"