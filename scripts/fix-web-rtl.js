const fs = require('fs');
const path = require('path');

const indexPath = path.join(process.cwd(), 'dist-web', 'index.html');

if (!fs.existsSync(indexPath)) {
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace('<html lang="en">', '<html lang="ar" dir="rtl">');
html = html.replace(
  '<style id="expo-reset">',
  `<style id="expo-reset">
      html,
      body,
      #root {
        direction: rtl !important;
        text-align: right !important;
      }
`
);
html = html.replace(
  'You need to enable JavaScript to run this app.',
  'يجب تفعيل JavaScript لتشغيل هذا التطبيق.'
);

fs.writeFileSync(indexPath, html);
