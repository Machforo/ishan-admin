const fs = require('fs');

const path = 'd:/FreeLance/ishan-admin/src/config/siteConfigs.ts';
let content = fs.readFileSync(path, 'utf8');

// Find the start of ayurveda array
const startIndex = content.indexOf('ayurveda: [');
if (startIndex === -1) throw new Error('Could not find ayurveda array');

// We need to match all the objects within the ayurveda array
// We know it ends with `  ]\n};` at the end of the file
const endIndex = content.lastIndexOf('  ]\n};');

if (endIndex === -1) throw new Error('Could not find end of array');

const arrayContent = content.substring(startIndex + 'ayurveda: ['.length, endIndex);

// A simple parser to extract each object.
// We count brackets { }
let objects = [];
let depth = 0;
let currentObjectStart = -1;

for (let i = 0; i < arrayContent.length; i++) {
  if (arrayContent[i] === '{') {
    if (depth === 0) {
      currentObjectStart = i;
    }
    depth++;
  } else if (arrayContent[i] === '}') {
    depth--;
    if (depth === 0 && currentObjectStart !== -1) {
      objects.push(arrayContent.substring(currentObjectStart, i + 1));
      currentObjectStart = -1;
    }
  }
}

console.log(`Found ${objects.length} objects.`);

const order = [
  'global_settings',
  'homepage',
  'about_us',
  'academics',
  'admissions',
  'departments',
  'hospital',
  'faculty_page',
  'facilities',
  'student_zone',
  'research',
  'news_events',
  'testimonials',
  'contact',
  'site_settings'
];

let newObjects = [];
for (const id of order) {
  const found = objects.find(obj => obj.includes(`id: "${id}"`) || obj.includes(`id: '${id}'`));
  if (found) {
    newObjects.push(found);
    console.log(`Matched ${id}`);
  } else {
    console.error(`Could not find ${id}`);
  }
}

if (newObjects.length !== objects.length) {
  console.log("Mismatched length!");
}

const newArrayContent = '\n    ' + newObjects.join(',\n    ') + '\n  ';

const newContent = content.substring(0, startIndex + 'ayurveda: ['.length) + newArrayContent + content.substring(endIndex);

fs.writeFileSync(path, newContent);
console.log('Reordered successfully!');
