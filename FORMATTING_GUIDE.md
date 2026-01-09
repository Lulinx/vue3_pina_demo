# 代码格式化工具配置指南

本项目已配置 **Prettier** 和 **ESLint** 用于统一代码风格和检查。

## 📦 已安装工具

- **Prettier**：代码自动格式化
- **ESLint**：代码质量检查
- **EditorConfig**：编辑器通用配置

## 🚀 快速命令

### 1. 安装依赖（首次）
```bash
npm install
```

### 2. 自动格式化代码
```bash
npm run format
```

### 3. 检查代码格式（不修改）
```bash
npm run format:check
```

### 4. ESLint 检查代码质量
```bash
npm run lint
```

### 5. ESLint 自动修复
```bash
npm run lint:fix
```

## ⚙️ 配置文件说明

| 文件 | 用途 |
|-----|------|
| `.prettierrc.json` | Prettier 配置（缩进2空格、单引号、行长100） |
| `.eslintrc.json` | ESLint 配置（推荐规则） |
| `.editorconfig` | 编辑器通用配置（换行符LF、UTF-8编码） |
| `.prettierignore` | Prettier 忽略文件列表 |
| `.eslintignore` | ESLint 忽略文件列表 |

## 🔧 VS Code 集成（推荐）

### 安装扩展
1. 打开 VS Code 扩展市场
2. 搜索并安装：
   - **Prettier - Code formatter**（esbenp.prettier-vscode）
   - **ESLint**（dbaeumer.vscode-eslint）

### 启用自动格式化
在 `.vscode/settings.json` 中添加：
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.autoFixOnSave": true
}
```

## 📝 格式化规则概览

### Prettier
- **缩进**：2个空格
- **引号**：单引号 `'`
- **句尾**：分号 `;`
- **行长**：100字符
- **尾逗号**：es5风格

### ESLint
- **警告**：未使用变量、console 调用
- **推荐**：使用 const、相等比较用 `===`
- **支持**：Vue单文件组件 (.vue)

## ✅ 使用建议

1. **提交前检查**：运行 `npm run lint && npm run format:check`
2. **自动修复**：提交前运行 `npm run lint:fix && npm run format`
3. **CI/CD**：在构建流程中添加格式检查，防止不规范代码合并

## 🐛 常见问题

**Q: 为什么格式化后代码还报错？**  
A: ESLint 和 Prettier 是独立的，先运行 `npm run lint:fix` 修复逻辑错误，再运行 `npm run format` 格式化。

**Q: 怎么在 Cmder 中运行这些命令？**  
A: 和 PowerShell 一样：`npm run format`、`npm run lint:fix` 等。

**Q: 能否定制规则？**  
A: 可以编辑 `.prettierrc.json` 和 `.eslintrc.json` 文件，改完后需重启 VS Code。
