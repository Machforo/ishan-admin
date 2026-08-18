const fs = require('fs');
const file = 'd:/FreeLance/ishan-admin/src/config/siteConfigs.ts';
let content = fs.readFileSync(file, 'utf8');

const oldGuestLecturesEventsStr = `              { key: 'events', type: 'array', label: 'Guest Lectures List', fields: [
                { key: 'title', type: 'text', label: 'Topic / Title' }, { key: 'speaker', type: 'text', label: 'Speaker Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'richtext', label: 'Description' }, { key: 'image', type: 'image', label: 'Image' }
              ]}`;
const newGuestLecturesEventsStr = `              { key: 'events', type: 'array', label: 'Guest Lectures List', fields: [
                { key: 'speaker', type: 'text', label: 'Speaker Name' }, { key: 'designation', type: 'text', label: 'Designation' }, { key: 'topic', type: 'text', label: 'Topic' }, { key: 'takeaways', type: 'text', label: 'Key Takeaways' }, { key: 'date', type: 'text', label: 'Date' }
              ]}`;
content = content.replace(oldGuestLecturesEventsStr, newGuestLecturesEventsStr);


const oldIndustrialVisitsEventsStr = `              { key: 'visits', type: 'array', label: 'Industrial Visits List', fields: [
                { key: 'title', type: 'text', label: 'Visit Title' }, { key: 'company', type: 'text', label: 'Company Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'richtext', label: 'Description' }, { key: 'image', type: 'image', label: 'Image' }
              ]}`;
const newIndustrialVisitsEventsStr = `              { key: 'visits', type: 'array', label: 'Industrial Visits List', fields: [
                { key: 'company', type: 'text', label: 'Company Name' }, { key: 'location', type: 'text', label: 'Location' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'textarea', label: 'Description' }, { key: 'takeaways', type: 'text', label: 'Key Takeaways' }
              ]}`;
content = content.replace(oldIndustrialVisitsEventsStr, newIndustrialVisitsEventsStr);

fs.writeFileSync(file, content, 'utf8');
console.log('siteConfigs.ts updated');
