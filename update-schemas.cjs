const fs = require('fs');

// 1. Update legalModels.js
const modelsFile = 'd:/FreeLance/ishan-backend/models/legalModels.js';
let modelsData = fs.readFileSync(modelsFile, 'utf8');
modelsData = modelsData.replace(
  /const mandatoryDisclosureSchema = new mongoose\.Schema\(\{\r?\n\s*statement: String,/m,
  \`const mandatoryDisclosureSchema = new mongoose.Schema({
  bannerImage: String,
  statement: String,\`
);
fs.writeFileSync(modelsFile, modelsData);

// 2. Update siteConfigs.ts
const configsFile = 'd:/FreeLance/ishan-admin/src/config/siteConfigs.ts';
let configsData = fs.readFileSync(configsFile, 'utf8');

// programs_overview
configsData = configsData.replace(
  /{ key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'keyPoints', type: 'array', label: 'Key Points', fields: \['point'\] }\]/,
  \`{ key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'bannerImage', type: 'image', label: 'Banner Image' }, { key: 'editorialPhotos', type: 'array', label: 'Editorial Photos', fields: [{ key: 'url', type: 'image', label: 'Image' }] }, { key: 'keyPoints', type: 'array', label: 'Key Points', fields: ['point'] }]\`
);

// mandatory_disclosure
configsData = configsData.replace(
  /{ key: 'statement', type: 'longtext', label: 'PCI\/BCI Compliance Statement' }, { key: 'disclosureItems', type: 'array', label: 'Disclosure Items', fields: \['category', { key: 'items', type: 'longtext', label: 'Items \(newline separated\)' }\] }\]/,
  \`{ key: 'bannerImage', type: 'image', label: 'Banner Image' }, { key: 'statement', type: 'longtext', label: 'PCI/BCI Compliance Statement' }, { key: 'disclosureItems', type: 'array', label: 'Disclosure Items', fields: ['category', { key: 'items', type: 'longtext', label: 'Items (newline separated)' }] }]\`
);

fs.writeFileSync(configsFile, configsData);
