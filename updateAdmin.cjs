const fs = require('fs');
let content = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');

content = content.replace(
  /{ key: 'name', type: 'text', label: 'Event Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'venue', type: 'text', label: 'Venue' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'description', type: 'textarea', label: 'Description' }/g,
  `{ key: 'title', type: 'text', label: 'Event Title' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'venue', type: 'text', label: 'Venue' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'description', type: 'textarea', label: 'Description' }, { key: 'link', type: 'text', label: 'Registration Link' }`
);

content = content.replace(
  `id: 'student_life',\n        title: 'Student Life',\n        sections: [`,
  `id: 'student_life',\n        title: 'Student Life',\n        sections: [\n          {\n            id: 'guestlectures', title: 'Guest Lectures', endpoint: 'guestlectures', type: 'collection', fields: [\n              { key: 'title', type: 'text', label: 'Topic / Title' }, { key: 'speaker', type: 'text', label: 'Speaker Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'textarea', label: 'Description' }, { key: 'image', type: 'image', label: 'Image' }]\n          },\n          {\n            id: 'industrialvisits', title: 'Industrial Visits', endpoint: 'industrialvisits', type: 'collection', fields: [\n              { key: 'title', type: 'text', label: 'Visit Title' }, { key: 'company', type: 'text', label: 'Company Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'textarea', label: 'Description' }, { key: 'image', type: 'image', label: 'Image' }]\n          },`
);

fs.writeFileSync('src/config/siteConfigs.ts', content);
