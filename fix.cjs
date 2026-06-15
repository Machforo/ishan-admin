const fs = require('fs');
let code = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');

// 1. Remove pages_list from about_us
code = code.replace(
  /\{ id: 'pages_list', title: 'Static Pages', endpoint: 'pages', type: 'collection', fields: \[.*?\] \},?\s*/g,
  ''
);

// 2. Add pages_list to global_settings
const globalSettingsPattern = /(id:\s*'global_settings',\s*title:\s*'Global Settings',\s*sections:\s*\[[\s\S]*?)(?=\s*\]\s*\n\s*\},\s*\{)/;

code = code.replace(globalSettingsPattern, (match, p1) => {
  return p1 + ",\n          { id: 'pages_list', title: 'Static Pages', endpoint: 'pages', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'slug', type: 'text', label: 'Page URL Slug' }, { key: 'content', type: 'textarea', label: 'Page Content (HTML/Text)' }, { key: 'images', type: 'array', label: 'Gallery Images', fields: [{ key: 'image', type: 'image', label: 'Image' }] }, { key: 'seo', type: 'object', label: 'SEO Settings', fields: ['metaTitle', 'metaDescription'] }] }";
});

// 3. Fix aboutus fields
const aboutUsPattern = /\{ id: 'aboutus', title: 'About Us Page', endpoint: 'aboutus', type: 'singleton', fields: \[.*?\] \}/;

const newAboutUs = "{ id: 'aboutus', title: 'About Us Page', endpoint: 'aboutus', type: 'singleton', fields: [ { key: 'ourStory', type: 'object', label: 'Our Story', fields: ['title', { key: 'content', type: 'textarea', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }] }, { key: 'keyDifferentiators', type: 'array', label: 'Key Differentiators', fields: ['title'] }, { key: 'milestones', type: 'array', label: 'Milestones', fields: ['year', 'title', 'desc'] } ] }";

code = code.replace(aboutUsPattern, newAboutUs);

fs.writeFileSync('src/config/siteConfigs.ts', code);
console.log('Fixed siteConfigs.ts');
