const fs = require('fs');
let c = fs.readFileSync('d:/FreeLance/ishan-admin/src/config/siteConfigs.ts', 'utf8');

c = c.replace(/\[\s*"image"\s*(?=\]|,)/g, '[{ key: "image", type: "image", label: "Image" }');
c = c.replace(/,\s*"image"\s*(?=\]|,)/g, ', { key: "image", type: "image", label: "Image" }');

c = c.replace(/\[\s*"url"\s*(?=\]|,)/g, '[{ key: "url", type: "image", label: "Image" }');
c = c.replace(/,\s*"url"\s*(?=\]|,)/g, ', { key: "url", type: "image", label: "Image" }');

fs.writeFileSync('d:/FreeLance/ishan-admin/src/config/siteConfigs.ts', c);
console.log('Fixed missing image fields properly from disk script!');
