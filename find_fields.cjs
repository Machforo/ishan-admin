const fs = require('fs');
const c = fs.readFileSync('d:/FreeLance/ishan-admin/src/config/siteConfigs.ts', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('"image"') && l.includes('fields: [')) console.log(i + 1, l.trim());
  if (l.includes('"url"') && l.includes('fields: [')) console.log(i + 1, l.trim());
});
