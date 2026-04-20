---
title: 开发流程
---

# 开发流程

本文档介绍前端项目的标准开发流程。

## 开发流程概述

```
1. 创建功能分支 → 2. 开发与调试 → 3. 代码检查 → 4. 提交代码 → 5. 创建 PR → 6. Code Review → 7. 合并代码
```

## 1. 创建功能分支

### 拉取最新代码

```bash
# 切换到主分支
git checkout main

# 拉取最新代码
git pull origin main
```

### 创建新分支

```bash
# 创建并切换到新分支
git checkout -b feature/your-feature-name

# 或使用两步操作
git branch feature/your-feature-name
git checkout feature/your-feature-name
```

### 分支命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| 新功能 | `feature/功能名称` | `feature/user-login` |
| Bug 修复 | `fix/问题描述` | `fix/login-error` |
| 性能优化 | `perf/优化描述` | `perf/image-loading` |
| 文档更新 | `docs/文档描述` | `docs/api-docs` |
| 重构 | `refactor/重构描述` | `refactor/user-module` |

## 2. 开发与调试

### 编写代码

1. **遵循代码规范**
   - 参考 [HTML 编写规范](/standard/html)
   - 参考 [CSS 编写规范](/standard/css)
   - 参考 [JavaScript 编写规范](/standard/javascript)
   - 参考 [Vue3 开发规范](/standard/vue3)

2. **组件开发**
   - 保持组件单一职责
   - 合理拆分组件
   - 添加必要的注释

3. **API 调用**
   - 使用统一的 API 封装
   - 处理错误情况
   - 添加 loading 状态

### 调试技巧

```javascript
// 1. 使用 console.log 调试
console.log('调试信息:', data)

// 2. 使用 console.table 查看对象/数组
console.table(users)

// 3. 使用 debugger 断点
debugger

// 4. 使用 Vue Devtools 调试组件
```

### 浏览器开发者工具

- **Elements**: 查看和修改 DOM/CSS
- **Console**: 查看日志和执行代码
- **Sources**: 调试 JavaScript
- **Network**: 查看网络请求
- **Performance**: 性能分析
- **Application**: 查看存储、缓存等

## 3. 代码检查

### 运行检查命令

```bash
# ESLint 检查并自动修复
pnpm run lint

# Prettier 格式化
pnpm run format

# TypeScript 类型检查
pnpm run type-check
```

### 检查清单

- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 Prettier 格式化
- [ ] 没有 TypeScript 类型错误
- [ ] 功能正常运行
- [ ] 没有控制台报错

## 4. 提交代码

### 查看修改内容

```bash
# 查看修改的文件
git status

# 查看具体修改
git diff

# 查看某个文件的修改
git diff src/components/Button.vue
```

### 添加文件

```bash
# 添加所有修改的文件
git add .

# 添加指定文件
git add src/components/Button.vue

# 添加某个目录下的所有文件
git add src/components/
```

### 提交代码

```bash
# 提交并添加信息
git commit -m "feat: 添加用户登录功能"

# 添加详细描述
git commit -m "feat: 添加用户登录功能

- 实现登录表单
- 添加登录验证
- 集成认证 API"
```

::: tip 提示
项目已配置 Git Hooks，提交时会自动运行 lint-staged 检查代码。
:::

### 推送代码

```bash
# 推送到远程仓库
git push origin feature/your-feature-name

# 首次推送设置上游分支
git push -u origin feature/your-feature-name
```

## 5. 创建 Pull Request

### 在 GitHub/GitLab 上创建 PR

1. 访问远程仓库页面
2. 点击 "New Pull Request" 或 "Create Merge Request"
3. 选择源分支和目标分支
4. 填写 PR 标题和描述

### PR 描述模板

```markdown
## 变更说明

简要描述本次变更的内容。

## 变更类型

- [ ] 新功能
- [ ] Bug 修复
- [ ] 性能优化
- [ ] 代码重构
- [ ] 文档更新

## 测试

- [ ] 已通过单元测试
- [ ] 已通过集成测试
- [ ] 已进行手动测试

## 截图（如有）

添加相关的截图。

## 关联 Issue

Closes #123
```

## 6. Code Review

### Review 流程

1. **等待 Review**
   - 指定 Reviewer
   - 等待代码审查

2. **处理 Review 意见**
   - 认真阅读反馈
   - 讨论有争议的部分
   - 根据意见修改代码

3. **修改后更新**
   ```bash
   # 修改代码后重新提交
   git add .
   git commit -m "fix: 根据 review 意见修改"
   git push origin feature/your-feature-name
   ```

### Review 最佳实践

- 保持开放心态
- 及时响应反馈
- 认真对待每条意见
- 不理解的地方主动沟通

## 7. 合并代码

### 合并前准备

```bash
# 确保代码是最新的
git checkout main
git pull origin main
git checkout feature/your-feature-name
git merge main

# 解决冲突（如有）
# 冲突解决后重新提交
git add .
git commit -m "merge: 合并主分支"
git push origin feature/your-feature-name
```

### 合并方式

- **Squash and Merge**: 将多个提交压缩为一个（推荐）
- **Merge Commit**: 保留所有提交历史
- **Rebase and Merge**: 线性提交历史

### 合并后清理

```bash
# 删除本地分支
git branch -d feature/your-feature-name

# 删除远程分支
git push origin --delete feature/your-feature-name
```

## 特殊场景处理

### 代码冲突解决

```bash
# 拉取最新代码时可能遇到冲突
git pull origin main

# 查看冲突文件
git status

# 手动编辑冲突文件，解决冲突标记
# <<<<<<< HEAD
# 当前分支的代码
# =======
# 其他分支的代码
# >>>>>>> main

# 解决后添加文件
git add .

# 继续合并
git commit
```

### 撤销操作

```bash
# 撤销工作区修改
git checkout -- <file>

# 撤销暂存区修改
git reset HEAD <file>

# 撤销最近一次提交
git reset --soft HEAD~1

# 撤销并丢弃修改
git reset --hard HEAD~1
```

### 临时保存工作

```bash
# 临时保存当前修改
git stash

# 查看保存列表
git stash list

# 恢复最近的保存
git stash pop

# 恢复指定的保存
git stash apply stash@{0}
```

## 流程检查清单

### 提交前检查

- [ ] 代码功能正常
- [ ] 通过 ESLint 检查
- [ ] 通过 Prettier 格式化
- [ ] 添加了必要的注释
- [ ] 提交信息符合规范

### PR 检查

- [ ] PR 描述清晰
- [ ] 关联了相关 Issue
- [ ] 添加了测试（如需要）
- [ ] 添加了文档（如需要）
- [ ] 截图/录屏（如需要）

### 合并前检查

- [ ] Code Review 通过
- [ ] 所有检查通过（CI/CD）
- [ ] 没有代码冲突
- [ ] 功能测试通过

## 相关资源

- [Git 提交规范](/standard/git-commits)
- [项目结构规范](/standard/project-structure)
- [代码规范](/standard/)