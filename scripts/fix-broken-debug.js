const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const referenceDir = path.join(projectRoot, 'node_modules', 'connect', 'node_modules', 'debug', 'src');
const nodeModulesDir = path.join(projectRoot, 'node_modules');

function hasFiles(dir) {
  try {
    return fs.readdirSync(dir).some((name) => name.endsWith('.js'));
  } catch {
    return false;
  }
} 

function findDebugPackages(rootDir) {
  const results = [];

  function walk(currentDir) {
    let entries = [];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const entryPath = path.join(currentDir, entry.name);

      if (entry.name === 'debug') {
        const packageJsonPath = path.join(entryPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          results.push(entryPath);
        }
        continue;
      }

      walk(entryPath);
    }
  }

  walk(rootDir);
  return results;
}

function copyMissingFiles(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });

  for (const entry of fs.readdirSync(fromDir)) {
    const sourcePath = path.join(fromDir, entry);
    const targetPath = path.join(toDir, entry);
    const stats = fs.statSync(sourcePath);

    if (stats.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function repairBrokenDebugPackages() {
  if (!hasFiles(referenceDir)) {
    return;
  }

  const repaired = [];
  const debugPackageDirs = findDebugPackages(nodeModulesDir);

  for (const debugDir of debugPackageDirs) {
    const targetDir = path.join(debugDir, 'src');

    if (hasFiles(targetDir)) {
      continue;
    }

    const packageJsonPath = path.join(debugDir, 'package.json');
    let packageJson;

    try {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    } catch {
      continue;
    }

    if (packageJson.main !== './src/index.js') {
      continue;
    }

    copyMissingFiles(referenceDir, targetDir);
    repaired.push(path.relative(projectRoot, debugDir));
  }

  if (repaired.length > 0) {
    console.log(`Repaired missing debug source files in: ${repaired.join(', ')}`);
  }
}

repairBrokenDebugPackages();
