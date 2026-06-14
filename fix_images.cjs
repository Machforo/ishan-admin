const fs = require('fs');
let c = fs.readFileSync('d:/FreeLance/ishan-admin/src/config/siteConfigs.ts', 'utf8');

c = c.replace(/"icon"/g, '{ key: "icon", type: "image", label: "Icon" }');
c = c.replace(/"cover"/g, '{ key: "cover", type: "image", label: "Cover" }');
// "logo" is already handled as an object in siteConfigs.ts typically, but just in case:
c = c.replace(/,\s*"logo"\s*(?=\]|,)/g, ', { key: "logo", type: "image", label: "Logo" }');
c = c.replace(/\[\s*"logo"\s*(?=\]|,)/g, '[{ key: "logo", type: "image", label: "Logo" }');

fs.writeFileSync('d:/FreeLance/ishan-admin/src/config/siteConfigs.ts', c);
console.log('Fixed icon/cover strings!');
