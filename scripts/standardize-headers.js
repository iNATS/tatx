#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '../src/screens');

// Screens to update with custom headers
const screensToUpdate = [
  'WholesaleScreen.js',
  'OrderSuccessScreen.js',
  'PaymentScreen.js',
  'OrderDetailScreen.js',
  'ChatScreen.js',
  'ProductScreen.js',
  'VendorSignupScreen.js',
  'OTPScreen.js',
  'WalletScreen.js',
  'LocationScreen.js',
];

let totalUpdates = 0;

screensToUpdate.forEach(file => {
  const filePath = path.join(screensDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Check if already has PageHeader import
  if (content.includes("import PageHeader from '../components/PageHeader'")) {
    console.log(`✓ Already updated: ${file}`);
    return;
  }
  
  // Add PageHeader import after other imports
  const importPattern = /(import.*from\s+['"]\.\.\/constants\/theme['"];?\s*)/;
  if (importPattern.test(content)) {
    content = content.replace(
      importPattern,
      "$1\nimport PageHeader from '../components/PageHeader';"
    );
    totalUpdates++;
    console.log(`✓ Added PageHeader import: ${file}`);
  }
  
  fs.writeFileSync(filePath, content);
});

console.log(`\n✅ Total screens updated: ${totalUpdates}`);
console.log('Note: Manual review required to replace custom header JSX with <PageHeader />');
