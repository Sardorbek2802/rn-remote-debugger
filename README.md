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

## Installation & Usage

### 1. Install npm package in React Native project

```bash
npm install rn-remote-debugger
# or
yarn add rn-remote-debugger
```

### 2. Import in project entry file

Add at the top of `index.js` or `App.js`:

```javascript
import initRemoteDebugger from "rn-remote-debugger";

// Use default configuration
initRemoteDebugger();

// Or with custom configuration
initRemoteDebugger({
  port: 8989, // WebSocket port (default: 8989)
  enableConsole: true, // Enable console interception (default: true)
  enableNetwork: true, // Enable network interception (default: true)
});
```

### 3. Launch debugger application

Download and open the RN Remote Debugger application (DMG file).

### 4. Start React Native application

Start your RN application normally, and the debugger will automatically connect and begin displaying logs and network requests.

## Development Mode

To run the debugger in development mode:

```bash
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
# Install build tool
yarn add -D electron-builder

# Package
yarn dist:mac
```

After packaging, the DMG file will be in the `release` directory.

## UI Overview

### Top Bar

- **Project Name**: Shows the currently connected project
- **Connection Status**: Green link icon indicates connected, red indicates disconnected
- **DevTools Button**: Click to open/close Chrome DevTools

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

## Configuration Options

```javascript
initRemoteDebugger({
  port: 8989, // WebSocket server port
  enableConsole: true, // Whether to intercept console logs
  enableNetwork: true, // Whether to intercept network requests
});
```

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

4. **Host Configuration**: For remote debugging on physical devices, configure your development machine's IP in the debugger app settings.

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
