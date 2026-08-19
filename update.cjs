const fs = require('fs');
const file = 'd:/FreeLance/ishan-admin/src/config/siteConfigs.ts';
let data = fs.readFileSync(file, 'utf8');

// aboutus
data = data.replace(
  /{ key: 'ourStory', type: 'object', label: 'Our Story', fields: \['title', { key: 'content', type: 'longtext', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }\] }, { key: 'keyDifferentiators', type: 'array', label: 'Key Differentiators', fields: \['title'\] }, { key: 'milestones', type: 'array', label: 'Milestones', fields: \['year', 'title', 'desc'\] }\]/,
  `{ key: 'ourStory', type: 'object', label: 'Our Story', fields: ['title', { key: 'content', type: 'longtext', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }] }, { key: 'keyDifferentiators', type: 'array', label: 'Key Differentiators', fields: ['title'] }, { key: 'milestones', type: 'array', label: 'Milestones', fields: ['year', 'title', 'desc'] }, { key: 'bannerImage', type: 'image', label: 'Banner Image' }, { key: 'editorialPhotos', type: 'array', label: 'Editorial Photos', fields: [{ key: 'url', type: 'image', label: 'Image' }] }]`
);

// approvals
data = data.replace(
  /{ key: 'approvals', type: 'array', label: 'Approvals', fields: \['title', { key: 'description', type: 'longtext', label: 'Description' }, { key: 'logo', type: 'image', label: 'Logo' }\] }\]/,
  `{ key: 'approvalsPageBanner', type: 'image', label: 'Banner Image' }, { key: 'approvalsHeading', type: 'text', label: 'Heading' }, { key: 'approvalsDescription', type: 'longtext', label: 'Description' }, { key: 'approvals', type: 'array', label: 'Approvals', fields: ['title', { key: 'description', type: 'longtext', label: 'Description' }, { key: 'logo', type: 'image', label: 'Logo' }] }]`
);

// bestPractices
data = data.replace(
  /{ key: 'bestPractices', type: 'array', label: 'Best Practices', fields: \['title', { key: 'content', type: 'textarea', label: 'Content' }\] }\]/,
  `{ key: 'bestPracticesBanner', type: 'image', label: 'Banner Image' }, { key: 'bestPractices', type: 'array', label: 'Best Practices', fields: ['title', { key: 'content', type: 'textarea', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }] }]`
);

// greenInitiatives
data = data.replace(
  /{ key: 'greenInitiatives', type: 'object', label: 'Green Initiatives', fields: \[{ key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'initiatives', type: 'array', label: 'Initiatives', fields: \['title', 'desc', 'stat', 'icon'\] }\] }\]/,
  `{ key: 'greenInitiatives', type: 'object', label: 'Green Initiatives', fields: [{ key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'bannerImage', type: 'image', label: 'Banner Image' }, { key: 'images', type: 'array', label: 'Images', fields: [{ key: 'url', type: 'image', label: 'Image' }] }, { key: 'initiatives', type: 'array', label: 'Initiatives', fields: ['title', 'desc', 'stat', 'icon'] }] }]`
);

// antiRagging
data = data.replace(
  /{ key: 'antiRagging', type: 'object', label: 'Anti-Ragging Config', fields: \['helpline', { key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'committeeText', type: 'textarea', label: 'Committee Text' }, { key: 'reportMethods', type: 'array', label: 'Report Methods', fields: \['method'\] }\] }\]/,
  `{ key: 'antiRagging', type: 'object', label: 'Anti-Ragging Config', fields: ['helpline', { key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'committeeText', type: 'textarea', label: 'Committee Text' }, { key: 'reportMethods', type: 'array', label: 'Report Methods', fields: ['method'] }, { key: 'pledgeTitle', type: 'text', label: 'Pledge Title' }, { key: 'pledgeText', type: 'textarea', label: 'Pledge Text' }] }]`
);

fs.writeFileSync(file, data);
