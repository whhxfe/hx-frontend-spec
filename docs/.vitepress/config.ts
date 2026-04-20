import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Hx前端技术规范文档',
  description: 'Hx前端技术规范文档',
  
  // Vite 配置
  vite: {
    server: {
      // 开发服务器配置
      // 端口被占用时自动尝试下一个可用端口
      strictPort: false,
      // 使用其他端口避免权限问题
      port: 4300,
      // 监听所有地址
      host: '0.0.0.0'
    },
    preview: {
      // 预览服务器配置
      // 端口被占用时自动尝试下一个可用端口
      strictPort: false,
      // 默认端口
      port: 5173,
      // 监听所有地址
      host: '0.0.0.0'
    }
  },
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '开发指南', link: '/guide/' },
      { text: '代码规范', link: '/standard/' },
      { text: '工具链', link: '/tools/' }
    ],
    
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '开发指南',
          items: [
            { text: '概述', link: '/guide/' },
            { text: '环境搭建', link: '/guide/environment' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '开发流程', link: '/guide/development' },
            { text: '常用命令', link: '/guide/commands' },
            { text: '环境变量', link: '/guide/env-variables' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/standard/': [
        {
          text: '代码规范',
          items: [
            { text: '概述', link: '/standard/' },
            { text: 'HTML 编写规范', link: '/standard/html' },
            { text: 'CSS 编写规范', link: '/standard/css' },
            { text: 'JavaScript 编写规范', link: '/standard/javascript' },
            { text: '项目结构规范', link: '/standard/project-structure' },
            { text: '性能优化规范', link: '/standard/performance' },
            { text: '安全规范', link: '/standard/security' },
            { text: 'Git 提交规范', link: '/standard/git-commits' },
            { text: 'Vue2 开发规范', link: '/standard/vue2' },
            { text: 'Vue3 开发规范', link: '/standard/vue3' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具链',
          items: [
            { text: '概述', link: '/tools/' },
            { text: 'Prettier 配置', link: '/tools/prettier' },
            { text: 'ESLint 配置', link: '/tools/eslint' },
            { text: 'Git Hooks 配置', link: '/tools/git-hooks' },
            { text: 'VS Code 配置', link: '/tools/vscode' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})