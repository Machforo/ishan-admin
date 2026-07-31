const fs = require('fs');
let content = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');

// Remove all pageGallery objects
const target = '{ key: "pageGallery", type: "object", label: "Page Gallery", fields: [{ key: "title", type: "text", label: "Gallery Title" }, { key: "images", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }] },';
content = content.split(target).join('');

const target2 = ',{ key: "pageGallery", type: "object", label: "Page Gallery", fields: [{ key: "title", type: "text", label: "Gallery Title" }, { key: "images", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }] }';
content = content.split(target2).join('');

// Now add 'URL-Based Galleries' page to every portal
const galleryPageStr = `
      { 
        id: 'url_based_galleries', 
        title: 'URL-Based Galleries', 
        sections: [
          {
            id: 'galleries',
            title: 'Manage Galleries',
            endpoint: 'page-galleries',
            type: 'collection',
            fields: [
              { key: 'urlPath', type: 'text', label: 'Exact Page URL (e.g. /about)' },
              { key: 'title', type: 'text', label: 'Gallery Section Title' },
              { key: 'images', type: 'array', label: 'Gallery Images', fields: [ { key: 'url', type: 'image', label: 'Image' }, { key: 'caption', type: 'text', label: 'Image Caption' } ] }
            ]
          }
        ]
      },`;

content = content.replace(/pages:\s*\[/g, 'pages: [' + galleryPageStr);

fs.writeFileSync('src/config/siteConfigs.ts', content, 'utf8');
console.log('Updated siteConfigs.ts');
