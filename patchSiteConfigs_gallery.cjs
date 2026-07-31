const fs = require('fs');

let content = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');
const originalContent = content;

const regex = /(type:\s*['"](?:singleton|collection)['"](?:,\s*redirect:[^,]+?)?\s*,\s*fields:\s*\[)/g;
// Wait, redirect can be before or after fields.
// Usually it's:
// type: "singleton",
// fields: [

content = content.replace(/(type:\s*['"](?:singleton|collection)['"]\s*,\s*fields:\s*\[)/g, '$1\n      { key: "pageGallery", type: "array", label: "Page Gallery", fields: [{ key: "url", type: "image", label: "Image" }] },');

fs.writeFileSync('src/config/siteConfigs.ts', content);
console.log('Modified siteConfigs.ts');
