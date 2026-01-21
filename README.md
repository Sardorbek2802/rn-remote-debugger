# RN Remote Debugger

[English](README.md) | [简体中文](README.zh-CN.md)

A remote debugging tool for React Native applications that allows real-time viewing of console logs and network requests via WebSocket.

## Features

- 📝 Real-time console log monitoring (log, warn, error, info, debug)
- 🌐 Intercept and display all network requests (fetch and XMLHttpRequest)
- 🔍 Search and filter functionality (URL, headers, request body, response body)
- 📊 View request details (Request, Response, cURL)
- 🎨 Beautiful UI design
- ⚡️ Real-time connection status
- 📱 Auto-clear logs on app restart

## Quick Start

### 1. Install npm package in React Native project

```bash
npm install rn-remote-debugger
# or
yarn add rn-remote-debugger
```

### 2. Create Configuration File (Recommended)

Generate a configuration file in your project root:

```bash
npx rn-remote-debugger-create
```

This creates a `rn-remote-debug.js` file with your computer's IP address:

```javascript
if (__DEV__) {
  module.exports = {
    host: '192.168.1.100', // Auto-detected IP
    port: 8989,
    enableConsole: true,
    enableNetwork: true
  };
} else {
  module.exports = {};
}
```

### 3. Import in project entry file

Add at the top of `index.js` or `App.js`:

```javascript
import initRemoteDebugger from "rn-remote-debugger";

initRemoteDebugger();
```

The debugger will automatically read the configuration file and connect.

### 4. Android Setup

For Android devices/emulators, run this command in terminal before starting your app:

```bash
adb reverse tcp:8989 tcp:8989
```

### 5. Start the Desktop App

Download and open the RN Remote Debugger desktop app to view logs and network requests.

## Configuration

### Using Configuration File (Recommended)

Create `rn-remote-debug.js` in your project root:

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

**Priority**: Configuration file > Code parameters

### Using Code Parameters

```javascript
import initRemoteDebugger from "rn-remote-debugger";

initRemoteDebugger({
  port: 8989,
  enableConsole: true,
  enableNetwork: true
});
```

**Note**: If a configuration file exists, it will override code parameters.

## CLI Commands

### Get Local IP

View all available IP addresses on your machine:

```bash
npx rn-remote-debugger-ip
```

Output:
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

### Create Configuration File

Generate `rn-remote-debug.js` in your project root:

```bash
npx rn-remote-debugger-create
```

This will:
- Auto-detect your local IP address
- Create the configuration file
- Show setup instructions

## Development Mode

To run the debugger in development mode:

```bash
# Go to client directory
cd rn-remote-debugger-client

# Install dependencies
yarn install

# Start Vite dev server (Terminal 1)
yarn dev

# Start Electron app (Terminal 2)
yarn start
```

## Building Application

### Build frontend

```bash
yarn build
```

### Package as DMG (macOS)

```bash
yarn dist:mac
```

After packaging, the DMG file will be in the `release` directory.

## UI Overview

### Top Bar

- **Project Name**: Shows the currently connected project
- **Connection Status**: Green link icon indicates connected, red indicates disconnected
- **DevTools Button**: Click to open/close Chrome DevTools
- **Android Tip Button**: Click to view adb reverse command

### Left Panel - Network Request List

- **Timestamp**: Request initiation time
- **Method**: HTTP method (GET, POST, etc.)
- **Status Code**: Response status code (200, 404, etc.)
- **URL**: Request URL
- **Duration**: Response time in milliseconds
- **Search Box**: Search URL, headers, request body, response body

### Right Panel - Request Details

- **Request Tab**: View request URL, Headers, Body
- **Response Tab**: View response status, Body
- **cURL Tab**: Generate cURL command for direct use

### Console Logs

All console logs are displayed in Chrome DevTools (click the DevTools button in the top bar to open).

## Important Notes

1. **Port Conflicts**: Ensure port 8989 is not in use, or modify to another port
2. **Production Environment**: Recommended to enable only in development environment to avoid performance impact
3. **Android Devices**: Requires `adb reverse` for port forwarding

   Before running your React Native app, execute:
   ```bash
   adb reverse tcp:8989 tcp:8989
   ```

   This forwards port 8989 from the Android device to your development machine, allowing the Android app to connect to the debugger.

   If you changed the default port, adjust accordingly:
   ```bash
   # For custom port like 8990
   adb reverse tcp:8990 tcp:8990
   ```

   Remove port forwarding:
   ```bash
   adb reverse --remove tcp:8989
   ```

## FAQ

### Q: Debugger shows "Waiting for connection"?

A: Ensure the RN app has started and `initRemoteDebugger()` is properly imported.

### Q: Can't see network requests?

A: Check if network interception is enabled (`enableNetwork: true`).

### Q: Port already in use?

A: Modify the port configuration: `initRemoteDebugger({ port: 8990 })`.

### Q: How to disable in production?

A: Use environment variable:

```javascript
if (__DEV__) {
  initRemoteDebugger();
}
```

## Tech Stack

- **Electron**: Desktop application framework
- **React**: Frontend UI framework
- **Vite**: Build tool
- **Ant Design**: UI component library
- **WebSocket**: Real-time communication

## License

MIT
