# Clawdbot 三系统自动推送 - 总配置文档

> 创建时间：2026-02-01
> 系统版本：v1.0
> 负责人：栗噔噔的AI助手

---

## 📋 系统总览

| 系统名称 | 任务ID | 执行频率 | 推送方式 | 状态 |
|---------|--------|---------|---------|------|
| AI日报 | ai-news-daily | 每日8:00 | 飞书+GitHub | ✅ 运行中 |
| Reddit情报 | reddit-intel | 每2-12小时 | 飞书 | ⚠️ 待配置 |
| 基金管理 | fund-mgmt | 每日13:00/21:00 | 飞书 | ⚠️ 待配置 |

---

## 📁 文件结构

```
ai-news-daily/
├── AI_DAILY_TASK.md              # AI日报配置 ⭐
├── REDDIT_INTEL_TASK.md          # Reddit情报配置 ⭐
├── FUND_MANAGEMENT_TASK.md       # 基金管理配置 ⭐
├── manage_systems.sh             # 管理脚本 ⭐
├── restore_ai_daily.sh           # 恢复脚本
├── fund_portfolio_template.md    # 基金档案模板
├── fund_notification_templates.md # 通知模板
├── index.html                    # 日报首页
├── 2026MMDD.html                 # 每日日报归档
├── wechat-brief-YYYYMMDD.txt     # 微信简报
└── reported_news.json            # 去重记录
```

> ⭐ 表示核心配置文件，已备份到GitHub

---

## ⏰ 推送时间表（北京时间）

| 时间 | 系统 | 内容 | 备注 |
|------|------|------|------|
| 08:00 | AI日报 | AI行业新闻汇总 | 每日必发 |
| 09:00 | Reddit | 早盘情报 | 美股隔夜讨论 |
| 13:00 | 基金 | 盘中提醒 | 有条件触发 |
| 13:00 | Reddit | 午盘情报 | 有条件触发 |
| 15:00 | Reddit | 收盘情报 | 有条件触发 |
| 21:00 | 基金 | 日报 | 每日必发 |
| 21:00 | Reddit | 情报汇总 | 每日必发 |
| 周日21:00 | 基金 | 周报 | 每周必发 |

---

## 🔧 快速操作

### 查看配置
cat AI_DAILY_TASK.md
cat REDDIT_INTEL_TASK.md
cat FUND_MANAGEMENT_TASK.md

### 运行管理脚本
bash manage_systems.sh

### 手动备份到GitHub
git add -A
git commit -m "Backup: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

### 恢复（服务器重启后）
cd /root/.openclaw/workspace/ai-news-daily
bash restore_ai_daily.sh

---

## ⚠️ 重要提醒

1. **所有配置文件已备份到GitHub**，即使服务器崩溃也能恢复
2. **基金管理系统**需要填写完整持仓档案才能运行
3. **Reddit情报系统**需要配置监控列表和推送规则
4. **AI日报系统**已完全配置，每日8:00自动运行

---

## 📞 联系方式

- GitHub仓库：https://github.com/nutllwhy/ai-news-daily
- 飞书：当前会话
- 用户：栗噔噔

---

*最后更新：2026-02-01*
*下次更新：系统配置变更时*