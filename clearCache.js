const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to clear
const directoriesToClear = [
  '.expo',
  'node_modules/.cache',
];

// Clear directories
directoriesToClear.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`Clearing ${dir}...`);
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Successfully cleared ${dir}`);
    } catch (error) {
      console.error(`Error clearing ${dir}:`, error);
    }
  } else {
    console.log(`Directory ${dir} does not exist, skipping...`);
  }
});

// Clear watchman watches
try {
  console.log('Clearing watchman watches...');
  execSync('watchman watch-del-all', { stdio: 'inherit' });
  console.log('Successfully cleared watchman watches');
} catch (error) {
  console.log('Watchman not installed or error clearing watches, skipping...');
}

// Clear Metro bundler cache
try {
  console.log('Clearing Metro bundler cache...');
  execSync('npx react-native start --reset-cache', { stdio: 'inherit' });
  console.log('Successfully cleared Metro bundler cache');
} catch (error) {
  console.error('Error clearing Metro bundler cache:', error);
}

console.log('Cache clearing complete!');
