const { spawn } = require('child_process');
const path = require('path');

// Grab arguments and resolve any paths relative to this root directory
const args = process.argv.slice(2);
const backendArgs = [];

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--map' || args[i] === '--bookings') && args[i + 1]) {
    backendArgs.push(args[i]);
    backendArgs.push(path.resolve(__dirname, args[i + 1])); // Make path absolute from root
    i++; 
  } else {
    backendArgs.push(args[i]);
  }
}

console.log('Starting Azure Horizon Resort Web App...');

// 1. Start the Backend
const backend = spawn('npx', ['tsx', 'src/server.ts', ...backendArgs], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true 
});

// 2. Start the Frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Clean up processes on exit
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit();
});