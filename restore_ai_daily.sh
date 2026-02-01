#!/bin/bash
# AI日报生成任务 - 恢复脚本
# 使用方法：服务器重启后运行此脚本恢复任务

echo "🤖 正在恢复AI日报生成任务..."

# 1. 检查工作目录
if [ ! -d "/root/.openclaw/workspace/ai-news-daily" ]; then
    echo "❌ 错误：工作目录不存在"
    echo "请从GitHub克隆仓库："
    echo "git clone https://github.com/nutllwhy/ai-news-daily.git"
    exit 1
fi

# 2. 读取配置
echo "📖 读取任务配置..."
cat /root/.openclaw/workspace/AI_DAILY_TASK.md | head -50

# 3. 检查Git状态
echo ""
echo "📁 检查Git仓库状态..."
cd /root/.openclaw/workspace/ai-news-daily
git status
git log --oneline -3

# 4. 确认用户信息
echo ""
echo "👤 用户身份："
grep -A 2 "Name:" /root/.openclaw/workspace/USER.md

echo ""
echo "✅ 恢复检查完成！"
echo ""
echo "下一步："
echo "1. 询问用户是否需要生成今日日报"
echo "2. 如需生成，执行6轮搜索策略"
echo "3. 按撰写规范生成HTML和微信简报"
echo "4. 推送到GitHub并发送给用户"