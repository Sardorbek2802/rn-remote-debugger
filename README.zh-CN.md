# RN Remote Debugger

[English](README.md) | [简体中文](README.zh-CN.md)

一个用于 React Native 应用的远程调试工具，通过 WebSocket 实时查看 console 日志和网络请求。

## 功能特性

- 📝 实时查看 console 日志（log, warn, error, info, debug）
- 🌐 拦截并展示所有网络请求（fetch 和 XMLHttpRequest）
- 🔍 搜索过滤功能（支持 URL、请求头、请求体、响应体）
- 📊 查看请求详情（Request、Response、cURL）
- 🎨 美观的界面设计
- ⚡️ 实时连接状态显示
- 📱 应用重启时自动清空日志

## 快速开始

### 1. 在 React Native 项目中安装 npm 包

```bash
npm install rn-remote-debugger
# 或
yarn add rn-remote-debugger
```

### 2. 创建配置文件（推荐）

在项目根目录运行以下命令：

```bash
npx rn-remote-debugger-create
```

这会自动创建 `rn-remote-debug.js` 配置文件，包含你电脑的 IP 地址：

```javascript
if (__DEV__) {
  module.exports = {
    host: '192.168.1.100', // 自动检测的 IP
    port: 8989,
    enableConsole: true,
    enableNetwork: true
  };
} else {
  module.exports = {};
}
```

### 3. 在项目入口文件中引入

在 `index.js` 或 `App.js` 的最顶部添加：

```javascript
import initRemoteDebugger from "rn-remote-debugger";

initRemoteDebugger();
```

调试器会自动读取配置文件并连接。

### 4. Android 设备设置

在启动应用前，在终端运行以下命令：

```bash
adb reverse tcp:8989 tcp:8989
```

### 5. 启动调试器应用

下载并打开 RN Remote Debugger 桌面应用，开始查看日志和网络请求。

## 配置方式

### 使用配置文件（推荐）

在项目根目录创建 `rn-remote-debug.js`：

```javascript
if (__DEV__) {
  module.exports = {
    host: '192.168.1.100',
    port: 8989,
    enableConsole: true,
    enableNetwork: true
  };
} else {
  module.exports = {};
}
```

**优先级**：配置文件 > 代码参数

### 使用代码参数

```javascript
import initRemoteDebugger from "rn-remote-debugger";

initRemoteDebugger({
  port: 8989,
  enableConsole: true,
  enableNetwork: true
});
```

**注意**：如果存在配置文件，它会覆盖代码中的参数。

## CLI 命令

### 查看本机 IP

显示所有可用的 IP 地址：

```bash
npx rn-remote-debugger-ip
```

输出示例：
```
📡 Your local IP addresses:

  en0             →  192.168.1.100
  en1             →  10.0.0.5

💡 Usage in rn-remote-debug.js:

  module.exports = {
    host: '192.168.1.100',
    port: 8989
  };
```

### 创建配置文件

在项目根目录生成 `rn-remote-debug.js`：

```bash
npx rn-remote-debugger-create
```

命令会：
- 自动检测本机 IP 地址
- 创建配置文件
- 显示后续操作步骤

## 开发模式

如果你想运行调试器的开发模式：

```bash
# 进入 client 目录
cd rn-remote-debugger-client

# 安装依赖
yarn install

# 启动 Vite 开发服务器（终端 1）
yarn dev

# 启动 Electron 应用（终端 2）
yarn start
```

## 打包应用

### 构建前端

```bash
yarn build
```

### 打包成 DMG（macOS）

```bash
yarn dist:mac
```

打包完成后，DMG 文件位于 `release` 目录。

## 界面说明

### 顶部栏

- **项目名称**：显示当前连接的项目
- **连接状态**：绿色链接图标表示已连接，红色表示断开
- **开发工具按钮**：点击打开/关闭 Chrome DevTools
- **Android 提示按钮**：点击查看 adb reverse 命令

### 左侧面板 - 网络请求列表

- **时间戳**：请求发起时间
- **方法**：HTTP 方法（GET、POST 等）
- **状态码**：响应状态码（200、404 等）
- **URL**：请求地址
- **耗时**：请求响应时间（毫秒）
- **搜索框**：支持搜索 URL、请求头、请求体、响应体

### 右侧面板 - 请求详情

- **Request 标签**：查看请求 URL、Headers、Body
- **Response 标签**：查看响应状态、Body
- **cURL 标签**：生成 cURL 命令，可直接复制使用

### Console 日志

所有 console 日志会在 Chrome DevTools 中显示（点击顶部开发工具按钮打开）。

## 注意事项

1. **端口冲突**：确保端口 8989 未被占用，或修改为其他端口
2. **生产环境**：建议只在开发环境启用，避免影响生产性能
3. **Android 设备**：需要使用 `adb reverse` 进行端口转发

   在运行 React Native 应用之前，执行以下命令：
   ```bash
   adb reverse tcp:8989 tcp:8989
   ```

   该命令将 Android 设备的 8989 端口转发到开发机的 8989 端口，使 Android 应用能够连接到调试器。

   如果修改了默认端口，需要相应调整：
   ```bash
   # 如果使用了其他端口，如 8990
   adb reverse tcp:8990 tcp:8990
   ```

   取消端口转发：
   ```bash
   adb reverse --remove tcp:8989
   ```

## 常见问题

### Q: 调试器显示"等待连接"？

A: 确保 RN 应用已启动并正确引入了 `initRemoteDebugger()`。

### Q: 看不到网络请求？

A: 检查是否启用了网络拦截（`enableNetwork: true`）。

### Q: 端口被占用？

A: 修改端口配置：`initRemoteDebugger({ port: 8990 })`。

### Q: 如何在生产环境禁用？

A: 使用环境变量控制：

```javascript
if (__DEV__) {
  initRemoteDebugger();
}
```

## 技术栈

- **Electron**：桌面应用框架
- **React**：前端 UI 框架
- **Vite**：构建工具
- **Ant Design**：UI 组件库
- **WebSocket**：实时通信

## License

MIT
