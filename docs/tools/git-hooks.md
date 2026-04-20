# Git Hooks 配置

使用 Git Hooks 在代码提交前自动执行检查，确保代码质量。

## Husky

Husky 是一个 Git hooks 工具，可以轻松配置各种 Git 钩子。

### 安装

```bash
npm install --save-dev husky
npx husky install
```

### 初始化

在 `package.json` 中添加 prepare 脚本（可选）：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

这样其他开发者克隆项目后执行 `npm install` 时会自动安装 Husky。

### 配置 pre-commit hook

```bash
npx husky add .husky/pre-commit "npm run lint"
```

这会在 `.husky/pre-commit` 文件中添加：

```bash
npm run lint
```

### 配置 commit-msg hook

用于验证提交信息格式：

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### 常用钩子

| 钩子 | 触发时机 | 常用场景 |
|------|---------|---------|
| `pre-commit` | 提交前 | 代码检查、格式化 |
| `commit-msg` | 编写提交信息时 | 验证提交信息格式 |
| `pre-push` | 推送前 | 运行测试 |
| `post-merge` | 合并后 | 安装依赖 |

## lint-staged

只对暂存（staged）的文件运行 lint，提高效率。

### 安装

```bash
npm install --save-dev lint-staged
```

### 配置

在 `package.json` 中添加：

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 与 Husky 配合

修改 `.husky/pre-commit`：

```bash
npx lint-staged
```

这样提交时只会检查暂存的文件，速度更快。

## commitlint

用于验证 Git 提交信息格式，确保提交信息规范。

### 安装

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### 配置

创建 `commitlint.config.js`：

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复
        'docs',     // 文档
        'style',    // 格式
        'refactor', // 重构
        'perf',     // 性能
        'test',     // 测试
        'build',    // 构建
        'ci',       // CI
        'chore',    // 杂务
        'revert'    // 回退
      ]
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']]
  }
}
```

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

示例：

```bash
feat(user): 添加用户登录功能
fix(auth): 修复 token 过期问题
docs: 更新 README 文档
```

## 完整配置示例

### package.json

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
    "format": "prettier --write \"src/**/*.{js,ts,vue,json,css,scss,md}\"",
    "lint:check": "eslint . --ext .vue,.js,.ts,.jsx,.tsx",
    "format:check": "prettier --check \"src/**/*.{js,ts,vue,json,css,scss,md}\"",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  },
  "devDependencies": {
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-vue": "^9.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0",
    "prettier": "^2.8.0"
  }
}
```

### .husky/pre-commit

```bash
npx lint-staged
```

### .husky/commit-msg

```bash
npx --no -- commitlint --edit $1
```

## 工作流程

1. **开发者提交代码**
   ```bash
   git add .
   git commit -m "feat: 新增功能"
   ```

2. **pre-commit 钩子触发**
   - lint-staged 运行
   - 只对暂存文件执行 ESLint 和 Prettier

3. **commit-msg 钩子触发**
   - commitlint 验证提交信息格式

4. **验证通过，提交成功**

## 跳过检查

如果需要跳过检查（不推荐）：

```bash
# 跳过 pre-commit
git commit --no-verify -m "临时提交"

# 跳过特定检查
SKIP=lint git commit -m "跳过 lint 检查"
```

## 故障排除

### Husky 不生效

1. 确保已执行 `npx husky install`
2. 检查 `.husky/` 目录是否存在
3. 检查文件是否有执行权限

### lint-staged 运行缓慢

1. 检查配置是否只检查需要的文件类型
2. 排除 `node_modules` 等目录
3. 考虑使用更具体的文件匹配模式

### commitlint 报错

1. 检查提交信息格式是否正确
2. 确认 `commitlint.config.js` 配置正确
3. 查看 [commitlint 文档](https://commitlint.js.org/) 了解详细规则