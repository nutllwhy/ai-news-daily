# Vercel 部署迁移方案

## 📊 方案对比

| 特性 | GitHub Pages | Vercel |
|------|-------------|--------|
| 微信内访问 | ❌ 经常打不开 | ✅ 稳定访问 |
| 自动部署 | ✅ 支持 | ✅ 支持（更快） |
| 国内CDN | ❌ 无 | ✅ 有边缘节点 |
| 自定义域名 | ✅ 支持 | ✅ 支持 |
| 费用 | 免费 | 免费 |
| HTTPS | ✅ 自动 | ✅ 自动 |

## 🚀 迁移步骤

### 第一步：准备 Vercel 账号

1. 访问 https://vercel.com
2. 点击 "Sign Up" 用 GitHub 账号登录
3. 授权 Vercel 访问你的 GitHub 仓库

### 第二步：导入项目

1. 在 Vercel Dashboard 点击 "Add New Project"
2. 选择 "Import Git Repository"
3. 找到你的仓库 `nutllwhy/ai-news-daily`
4. 点击 "Import"

### 第三步：配置部署

**Project Settings:**
- **Framework Preset**: `Other` (纯静态网站)
- **Build Command**: 留空（不需要构建）
- **Output Directory**: 留空（使用根目录）
- **Install Command**: 留空

**Environment Variables:**
- 不需要设置（纯静态HTML）

点击 "Deploy"

### 第四步：配置自定义域名（可选）

如果你想用自己的域名（比如 `ai.lidengdeng.com`）：

1. 在 Vercel 项目设置 → Domains
2. 添加域名：`ai.lidengdeng.com`
3. 按照提示在 DNS 服务商添加 CNAME 记录：
   ```
   CNAME ai.lidengdeng.com → cname.vercel-dns.com
   ```

### 第五步：更新日报代码

修改日报生成脚本中的域名：

```python
# 旧链接
OLD_URL = "https://nutllwhy.github.io/ai-news-daily/"

# 新链接（Vercel自动生成）
NEW_URL = "https://ai-news-daily.vercel.app/"
# 或自定义域名
NEW_URL = "https://ai.lidengdeng.com/"
```

## 📁 需要修改的文件

1. **`generate-daily.js`** 或日报生成脚本
   - 替换所有 `nutllwhy.github.io/ai-news-daily` 为新的 Vercel 域名

2. **定时任务中的发送消息**
   - 更新简报中的链接地址

3. **`reported_news.json`** 中的链接（如果有）

## 🔄 自动部署流程

迁移后，每次更新的工作流程：

1. 你/AI 生成新的日报 HTML
2. `git push` 到 GitHub
3. Vercel 自动检测变更并重新部署（通常 10-30 秒）
4. 新内容立即上线

## 📱 微信访问测试

部署完成后，测试以下场景：

- [ ] 微信内置浏览器直接打开
- [ ] 朋友圈分享链接
- [ ] 群聊中点击链接
- [ ] 手机自带浏览器打开

## ⚠️ 注意事项

1. **Vercel 免费版限制**：
   - 每月 100GB 带宽（对日报网站完全够用）
   - 每天 100 次构建（远超需求）

2. **国内访问优化**：
   - Vercel 在国内有边缘节点，访问速度比 GitHub Pages 快
   - 如果追求极致，可以配合 Cloudflare CDN

3. **域名备案**（如果使用国内域名）：
   - 如果使用 `.com`/`.net` 等国际域名，无需备案
   - 如果使用 `.cn` 域名，需要备案

## 📝 迁移检查清单

- [ ] Vercel 账号注册完成
- [ ] GitHub 仓库导入成功
- [ ] 首次部署成功
- [ ] 自定义域名配置（可选）
- [ ] 日报生成脚本更新链接
- [ ] 微信内访问测试通过
- [ ] GitHub Pages 可保留作为备份

## 💡 推荐域名方案

**方案 A：使用 Vercel 子域名（最快）**
- 域名：`ai-news-daily.vercel.app`
- 成本：免费
- 配置：无需额外设置

**方案 B：使用自定义域名（推荐）**
- 域名：`ai.lidengdeng.com` 或 `daily.lidengdeng.com`
- 成本：域名费用（约 60-100 元/年）
- 配置：需要 DNS 解析

**方案 C：使用 Cloudflare Pages（备选）**
- 如果 Vercel 也有问题，Cloudflare Pages 国内访问更好
- 同样免费、自动部署

## 🎯 下一步行动

1. 你先注册 Vercel 账号并导入仓库
2. 告诉我部署成功后的域名
3. 我帮你更新日报生成脚本中的链接
4. 测试微信内访问是否正常

需要我帮你操作哪一步？