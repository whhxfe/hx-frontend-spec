---
title: 常用命令
---

# 常用命令

本文档整理了项目开发中常用的命令。

## 项目管理

### 依赖管理

```bash
# 安装所有依赖
pnpm install

# 添加生产依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>

# 添加全局依赖
pnpm add -g <package-name>

# 移除依赖
pnpm remove <package-name>

# 更新依赖
pnpm update

# 更新指定依赖
pnpm update <package-name>

# 查看过时的依赖
pnpm outdated

# 清除缓存
pnpm store prune
```

### 项目运行

```bash
# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览构建结果
pnpm run preview

# 预览构建结果（指定端口）
pnpm run preview -- --port 3000
```

## 代码质量

### ESLint

```bash
# 检查并自动修复
pnpm run lint

# 仅检查不修复
pnpm run lint:check

# 修复指定文件
npx eslint src/components/Button.vue --fix
```

### Prettier

```bash
# 格式化所有文件
pnpm run format

# 检查格式化
pnpm run format:check

# 格式化指定文件
npx prettier --write src/components/Button.vue

# 格式化指定目录
npx prettier --write "src/**/*.{js,ts,vue}"
```

### TypeScript

```bash
# 类型检查
pnpm run type-check

# 类型检查（监听模式）
pnpm run type-check --watch
```

## 测试

```bash
# 运行测试
pnpm run test

# 运行测试（监听模式）
pnpm run test:watch

# 生成测试覆盖率报告
pnpm run test:coverage

# 运行指定测试文件
pnpm run test -- Button.test.ts

# 运行测试（调试模式）
pnpm run test -- --inspect
```

## Git 操作

### 基础操作

```bash
# 查看状态
git status

# 查看修改
git diff

# 添加文件
git add .

# 提交代码
git commit -m "feat: 添加新功能"

# 推送代码
git push origin main

# 拉取代码
git pull origin main
```

### 分支操作

```bash
# 查看分支
git branch

# 创建分支
git branch feature/new-feature

# 切换分支
git checkout feature/new-feature

# 创建并切换分支
git checkout -b feature/new-feature

# 删除分支
git branch -d feature/new-feature

# 强制删除分支
git branch -D feature/new-feature
```

### 暂存操作

```bash
# 暂存修改
git stash

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop

# 恢复指定的暂存
git stash apply stash@{0}

# 清除所有暂存
git stash clear
```

### 回滚操作

```bash
# 撤销工作区修改
git checkout -- <file>

# 撤销暂存区修改
git reset HEAD <file>

# 软重置（保留修改）
git reset --soft HEAD~1

# 硬重置（丢弃修改）
git reset --hard HEAD~1

# 反转提交
git revert <commit-hash>
```

## Docker 操作

```bash
# 构建镜像
docker build -t app-name .

# 运行容器
docker run -p 3000:3000 app-name

# 查看运行的容器
docker ps

# 停止容器
docker stop <container-id>

# 删除容器
docker rm <container-id>

# 查看镜像
docker images

# 删除镜像
docker rmi <image-id>
```

## npm scripts 详解

### 开发相关

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite preview"
  }
}
```

### 代码质量

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
    "lint:check": "eslint . --ext .vue,.js,.ts,.jsx,.tsx",
    "format": "prettier --write \"src/**/*.{js,ts,vue,json,css,scss,md}\"",
    "format:check": "prettier --check \"src/**/*.{js,ts,vue,json,css,scss,md}\"",
    "type-check": "vue-tsc --noEmit"
  }
}
```

### 测试相关

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Git 相关

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 自定义命令

### 创建自定义脚本

```javascript
// scripts/clean.js
import { rmSync } from 'fs'
import { resolve } from 'path'

const dirs = ['dist', 'node_modules/.cache']

dirs.forEach(dir => {
  rmSync(resolve(process.cwd(), dir), { recursive: true, force: true })
  console.log(`Cleaned: ${dir}`)
})
```

```json
{
  "scripts": {
    "clean": "node scripts/clean.js"
  }
}
```

## 快捷键

### VS Code 常用快捷键

| 功能 | Windows/Linux | Mac |
|------|---------------|-----|
| 打开命令面板 | Ctrl+Shift+P | Cmd+Shift+P |
| 快速打开文件 | Ctrl+P | Cmd+P |
| 保存文件 | Ctrl+S | Cmd+S |
| 格式化文档 | Shift+Alt+F | Shift+Option+F |
| 注释行 | Ctrl+/ | Cmd+/ |
| 复制行 | Shift+Alt+↑/↓ | Shift+Option+↑/↓ |
| 删除行 | Shift+Delete | Cmd+Delete |
| 查找 | Ctrl+F | Cmd+F |
| 替换 | Ctrl+H | Cmd+H |

### 终端快捷键

| 功能 | 命令 |
|------|------|
| 清屏 | `clear` 或 Ctrl+L |
| 中断 | Ctrl+C |
| 退出 | `exit` 或 Ctrl+D |
| 历史命令 | `history` |
| 上一条命令 | ↑ |
| 下一条命令 | ↓ |

## 故障排除

### 常见问题解决

```bash
# 清除 node_modules 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 清除缓存
pnpm store prune

# 重置 Git
git fetch origin
git reset --hard origin/main

# 检查 Node 版本
node --version

# 检查 pnpm 版本
pnpm --version

# 查看依赖树
pnpm list

# 检查特定依赖
pnpm list <package-name>
```

## 环境相关

```bash
# 查看环境变量
echo $PATH

# 查看 Node 路径
which node

# 查看 pnpm 路径
which pnpm

# 查看磁盘使用
df -h

# 查看内存使用
free -h  # Linux
top -l 1 | head -n 10  # Mac
```

## 相关资源

- [pnpm 文档](https://pnpm.io/)
- [Vite 文档](https://vitejs.dev/)
- [ESLint 文档](https://eslint.org/)
- [Git 文档](https://git-scm.com/doc)