#!/usr/bin/env node

const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 跳过内部 IP 和 IPv6
      if (!iface.internal && iface.family === 'IPv4') {
        ips.push({
          interface: name,
          ip: iface.address,
          netmask: iface.netmask
        });
      }
    }
  }

  return ips;
}

function main() {
  const ips = getLocalIP();

  if (ips.length === 0) {
    console.log('❌ No local IP found');
    process.exit(1);
  }

  console.log('\n📡 Your local IP addresses:\n');

  ips.forEach(({ interface: name, ip }) => {
    console.log(`  ${name.padEnd(15)} →  ${ip}`);
  });

  console.log('\n💡 Usage in rn-remote-debug.js:\n');
  console.log(`  module.exports = {`);
  console.log(`    host: '${ips[0].ip}',`);
  console.log(`    port: 8989`);
  console.log(`  };\n`);

  console.log('💡 Usage with adb:\n');
  console.log(`  adb reverse tcp:8989 tcp:8989\n`);
}

main();
