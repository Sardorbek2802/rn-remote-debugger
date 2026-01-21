# RN Remote Debugger

Remote debugger for React Native - intercept console logs and network requests via WebSocket.

## Installation

```bash
npm install rn-remote-debugger
# or
yarn add rn-remote-debugger
```

## Quick Start

### Step 1: Create Configuration File (Recommended)

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

### Step 2: Initialize in Your App

In your React Native app's entry file (e.g., `index.js`):

```javascript
import initRemoteDebugger from "rn-remote-debugger";

initRemoteDebugger();
```

The debugger will automatically read the configuration file and connect.

### Step 3: Android Setup

For Android devices/emulators, run this command in terminal before starting your app:

```bash
adb reverse tcp:8989 tcp:8989
```

### Step 4: Start the Desktop App

Download and open the [RN Remote Debugger desktop app](#desktop-app) to view logs and network requests.

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

## Features

- 📝 Intercept all console logs (log, warn, error, info, debug)
- 🌐 Intercept network requests (fetch & XMLHttpRequest)
- 🔍 Search and filter requests
- 📊 View request/response details
- 🎨 Beautiful UI with Ant Design
- ⚡️ Real-time WebSocket connection
- 🚀 Auto-disabled in production (`__DEV__` check)
- 📱 Auto-clear logs on app restart

## Options

- `host` (string): WebSocket server host. Default: auto-detect from config file
- `port` (number): WebSocket server port. Default: `8989`
- `enableConsole` (boolean): Enable console interception. Default: `true`
- `enableNetwork` (boolean): Enable network interception. Default: `true`

## Desktop App

Download the desktop debugger app to view logs and network requests:

- macOS: [Download DMG](https://github.com/yinminqian/rn-remote-debugger/releases)

The desktop app will automatically connect to your React Native app via WebSocket.

## How It Works

1. The npm package intercepts console logs and network requests in your RN app
2. Data is sent via WebSocket to the desktop debugger app
3. View all logs and requests in real-time with a beautiful UI
4. When the app restarts, all logs are automatically cleared

## Production Safety

The debugger automatically checks `__DEV__` and only runs in development mode. In production builds, it returns immediately without any overhead.

## Android Tips

### Why `adb reverse`?

Android emulators and devices need port forwarding to connect to your development machine. The `adb reverse` command forwards the device's port 8989 to your computer's port 8989.

### Quick Setup

```bash
# Run once before starting your app
adb reverse tcp:8989 tcp:8989

# Start your React Native app
npx react-native run-android
```

## License

MIT
