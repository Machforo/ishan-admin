const fs = require('fs');
let content = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');

const sectionPageStr = `
      { 
        id: 'url_based_sections', 
        title: 'URL-Based Sections', 
        sections: [
          {
            id: 'sections',
            title: 'Manage Custom Sections',
            endpoint: 'page-sections',
            type: 'collection',
            fields: [
              { key: 'urlPath', type: 'text', label: 'Exact Page URL (e.g. /about)' },
              { key: 'sections', type: 'array', label: 'Custom HTML Sections', fields: [
                { key: 'templateName', type: 'text', label: 'Template Name / Title' },
                { key: 'htmlContent', type: 'longtext', label: 'HTML Content' }
              ] }
            ]
          }
        ]
      },`;

// Add URL-Based Sections below URL-Based Galleries
content = content.replace(/id: 'url_based_galleries',[\s\S]*?\][\s\S]*?\},/g, match => match + sectionPageStr);

fs.writeFileSync('src/config/siteConfigs.ts', content, 'utf8');
console.log('Added URL-Based Sections to siteConfigs.ts');
