#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '../src/screens');

// Get all JS files in screens directory
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.js'));

let totalReplacements = 0;

files.forEach(file => {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Remove all shadow imports
  content = content.replace(/,\s*shadows/g, '');
  content = content.replace(/import.*shadows.*from.*theme['"];\s*/g, '');
  
  // Replace shadow usage with borders
  const shadowReplacements = [
    { pattern: /\.\.\.shadows\.sm/g, replacement: 'borderWidth: 1, borderColor: colors.borderLight' },
    { pattern: /\.\.\.shadows\.md/g, replacement: 'borderWidth: 1, borderColor: colors.borderLight' },
    { pattern: /\.\.\.shadows\.lg/g, replacement: 'borderWidth: 1, borderColor: colors.borderLight' },
    { pattern: /\.\.\.shadows\.xl/g, replacement: 'borderWidth: 1, borderColor: colors.borderLight' },
    { pattern: /\.\.\.shadows\.float/g, replacement: 'borderWidth: 1, borderColor: colors.borderLight' },
  ];
  
  shadowReplacements.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      totalReplacements += matches.length;
      content = content.replace(pattern, replacement);
    }
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed: ${file}`);
  }
});

console.log(`\n✅ Total shadow replacements: ${totalReplacements}`);
console.log('✅ All screens updated to use borders instead of shadows');
