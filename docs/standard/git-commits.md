---
title: Git 提交规范
---

# Git 提交规范

## 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Header

Header 是必需的，包含三个字段：`type`、`scope`（可选）和 `subject`。

### Type

| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复 bug |
| docs | 文档变更 |
| style | 代码格式（不影响功能） |
| refactor | 重构（不是新功能或修复 bug） |
| perf | 性能优化 |
| test | 添加测试 |
| chore | 构建过程或辅助工具的变动 |

### 示例

```
feat(user): 添加用户登录功能

- 添加用户名密码登录
- 添加记住登录状态

Closes #123
```

### 规则

1. 每行不超过 100 个字符
2. 使用祈使语气（如 "add" 而不是 "added"）
3. 不要在 subject 尾部添加句号
4. 使用 `Closes #issue` 关联问题