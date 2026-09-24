const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = 8080;
const CWD = __dirname;

function runCmd(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { cwd: CWD }, (err, stdout, stderr) => {
      resolve({ err, stdout: stdout || '', stderr: stderr || '' });
    });
  });
}

async function getStatus() {
  const { stdout } = await runCmd('docker ps --filter "name=brandseotool-browser" --format "{{.Status}}"');
  const statusStr = stdout.trim();
  const isRunning = statusStr.length > 0;
  return {
    running: isRunning,
    statusText: isRunning ? statusStr : 'Offline (Container Stopped)'
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // API endpoints
  if (url.pathname === '/api/status') {
    const status = await getStatus();
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    return res.end(JSON.stringify(status));
  }

  if (url.pathname === '/api/start' && req.method === 'POST') {
    const result = await runCmd('docker compose up -d');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: !result.err, output: result.stdout || result.stderr }));
  }

  if (url.pathname === '/api/stop' && req.method === 'POST') {
    const result = await runCmd('docker compose down');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: !result.err, output: result.stdout || result.stderr }));
  }

  if (url.pathname === '/api/restart' && req.method === 'POST') {
    const result = await runCmd('docker compose restart');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: !result.err, output: result.stdout || result.stderr }));
  }

  // Dashboard HTML
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brandseotool - Isolated Browser Sandbox</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(22, 30, 46, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-blue: #3b82f6;
      --accent-green: #10b981;
      --accent-red: #ef4444;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      background: radial-gradient(circle at 50% 0%, #1e293b 0%, #090d16 80%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .container {
      width: 100%;
      max-width: 580px;
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .header p {
      font-size: 14px;
      color: var(--text-muted);
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      backdrop-filter: blur(16px);
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      margin-bottom: 20px;
    }

    .status-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 15px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    .dot.online {
      background: var(--accent-green);
      box-shadow: 0 0 12px var(--accent-green);
      animation: pulse 2s infinite;
    }
    .dot.offline {
      background: var(--accent-red);
      box-shadow: 0 0 12px var(--accent-red);
    }
    .status-text {
      font-size: 13px;
      color: var(--text-muted);
      font-family: monospace;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.15); }
    }

    .actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }

    button {
      font-family: inherit;
      border: none;
      border-radius: 12px;
      padding: 16px 20px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
    }
    button:active { transform: scale(0.98); }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn-on {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.4);
    }
    .btn-on:hover:not(:disabled) {
      box-shadow: 0 12px 24px -4px rgba(16, 185, 129, 0.6);
      filter: brightness(1.08);
    }

    .btn-off {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #ffffff;
      box-shadow: 0 8px 20px -4px rgba(239, 68, 68, 0.4);
    }
    .btn-off:hover:not(:disabled) {
      box-shadow: 0 12px 24px -4px rgba(239, 68, 68, 0.6);
      filter: brightness(1.08);
    }

    .btn-launch {
      width: 100%;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff;
      box-shadow: 0 10px 25px -4px rgba(59, 130, 246, 0.4);
      text-decoration: none;
      padding: 16px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 15px;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-launch:hover {
      box-shadow: 0 14px 28px -4px rgba(59, 130, 246, 0.6);
      filter: brightness(1.1);
    }
    .btn-launch.hidden { display: none; }

    .guide-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 20px;
    }
    .guide-card h3 {
      font-size: 14px;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .steps {
      list-style: none;
      counter-reset: step-counter;
    }
    .steps li {
      counter-increment: step-counter;
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 8px;
      position: relative;
      padding-left: 26px;
    }
    .steps li::before {
      content: counter(step-counter);
      position: absolute;
      left: 0;
      top: 2px;
      width: 18px;
      height: 18px;
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
      font-size: 11px;
      font-weight: 700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .steps code {
      background: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      color: #93c5fd;
      font-family: monospace;
    }

    .loading-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Isolated Browser Sandbox</h1>
      <p>Protected Chromium container with Web GUI & Extension Isolation</p>
    </div>

    <div class="card">
      <div class="status-bar">
        <div class="status-indicator">
          <span id="dot" class="dot offline"></span>
          <span id="label">Checking status...</span>
        </div>
        <span id="detail" class="status-text">--</span>
      </div>

      <div class="actions-grid">
        <button id="btnOn" class="btn-on" onclick="toggleState('start')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
          Turn ON
        </button>
        <button id="btnOff" class="btn-off" onclick="toggleState('stop')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
          Turn OFF
        </button>
      </div>

      <a id="btnLaunch" href="http://localhost:3000" target="_blank" class="btn-launch hidden">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        Open Isolated Browser GUI (Webpage) &rarr;
      </a>
    </div>

    <div class="guide-card">
      <h3>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        How to Load the Extension in Container
      </h3>
      <ol class="steps">
        <li>Click <strong>Turn ON</strong> above, then click <strong>Open Isolated Browser GUI</strong>.</li>
        <li>Inside the container's browser, open a tab to <code>chrome://extensions</code>.</li>
        <li>Enable <strong>Developer mode</strong> (top right toggle).</li>
        <li>Click <strong>Load unpacked</strong> and select the <code>/extension</code> folder.</li>
        <li>Now log into <code>tools.brandseotool.com</code> to use Udemy, Coursera, or Skillshare securely!</li>
      </ol>
    </div>
  </div>

  <script>
    let isProcessing = false;

    async function fetchStatus() {
      if (isProcessing) return;
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        updateUI(data.running, data.statusText);
      } catch (e) {
        updateUI(false, 'Controller Disconnected');
      }
    }

    function updateUI(running, text) {
      const dot = document.getElementById('dot');
      const label = document.getElementById('label');
      const detail = document.getElementById('detail');
      const btnOn = document.getElementById('btnOn');
      const btnOff = document.getElementById('btnOff');
      const btnLaunch = document.getElementById('btnLaunch');

      if (running) {
        dot.className = 'dot online';
        label.textContent = 'ONLINE (Running)';
        detail.textContent = text || 'Ready on port 3000';
        btnOn.disabled = true;
        btnOff.disabled = false;
        btnLaunch.classList.remove('hidden');
      } else {
        dot.className = 'dot offline';
        label.textContent = 'OFFLINE';
        detail.textContent = 'Container stopped';
        btnOn.disabled = false;
        btnOff.disabled = true;
        btnLaunch.classList.add('hidden');
      }
    }

    async function toggleState(action) {
      isProcessing = true;
      const btnOn = document.getElementById('btnOn');
      const btnOff = document.getElementById('btnOff');
      const label = document.getElementById('label');

      btnOn.disabled = true;
      btnOff.disabled = true;
      label.innerHTML = '<span class="loading-spinner"></span> ' + (action === 'start' ? 'Starting...' : 'Stopping...');

      try {
        await fetch('/api/' + action, { method: 'POST' });
      } catch (err) {
        alert('Action error: ' + err.message);
      } finally {
        isProcessing = false;
        setTimeout(fetchStatus, 1500);
      }
    }

    setInterval(fetchStatus, 3000);
    fetchStatus();
  </script>
</body>
</html>
`);
});

server.listen(PORT, () => {
  console.log('========================================================');
  console.log(`Web Control Panel running at: http://localhost:${PORT}`);
  console.log('Open this URL in your browser to Turn ON/OFF the container!');
  console.log('========================================================');
});
