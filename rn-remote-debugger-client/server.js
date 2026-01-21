const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8989;

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const LOCAL_IP = getLocalIP();

const server = http.createServer((req, res) => {
  if (req.url === '/ip') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ ip: LOCAL_IP, port: PORT }));
  } else if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('✅ needle2020 connected');

  ws.on('message', (message) => {
    // 转换 Buffer 为字符串
    const messageStr = message.toString();

    // 转发给所有其他客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ needle2020 disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const os = require('os');

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Remote Console Debugger running on:`);
  console.log(`   WebSocket: ws://${LOCAL_IP}:${PORT}`);
  console.log(`   Browser:   http://${LOCAL_IP}:${PORT}`);
  console.log(`   IP API:    http://${LOCAL_IP}:${PORT}/ip`);
  console.log(`\n📱 iOS: Auto-connect to ${LOCAL_IP}`);
  console.log(`📱 Android: Run 'adb reverse tcp:${PORT} tcp:${PORT}'`);
});
