const fs = require('fs');
let content = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');

const target = '{ key: "pageGallery", type: "array", label: "Page Gallery", fields: [{ key: "url", type: "image", label: "Image" }] }';
const replacement = '{ key: "pageGallery", type: "object", label: "Page Gallery", fields: [{ key: "title", type: "text", label: "Gallery Title" }, { key: "images", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }] }';

content = content.split(target).join(replacement);

fs.writeFileSync('src/config/siteConfigs.ts', content, 'utf8');
console.log('Updated siteConfigs.ts');
