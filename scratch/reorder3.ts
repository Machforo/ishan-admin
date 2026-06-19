import * as fs from 'fs';

const path = 'd:/FreeLance/ishan-admin/src/config/siteConfigs.ts';
let content = fs.readFileSync(path, 'utf8');

const ayurvedaStart = content.lastIndexOf('ayurveda: {');
if (ayurvedaStart === -1) throw new Error("not found");

const pagesStart = content.indexOf('pages: [', ayurvedaStart);
if (pagesStart === -1) throw new Error("not found pages");

const arrayStartIndex = pagesStart + 'pages: ['.length;

// Use parsing to find the matching ']' for 'pages: ['
let depth = 1;
let arrayEndIndex = -1;
for (let i = arrayStartIndex; i < content.length; i++) {
  if (content[i] === '[') depth++;
  else if (content[i] === ']') {
    depth--;
    if (depth === 0) {
      arrayEndIndex = i;
      break;
    }
  }
}

if (arrayEndIndex === -1) throw new Error("not found end");

const arrayContent = content.substring(arrayStartIndex, arrayEndIndex);

// Split array content into objects.
const sections = arrayContent.split(/(?=\r?\n      \{\r?\n        id: [\"\'])/g).filter(s => s.trim().length > 0);
console.log("Found sections:", sections.length);

const order = [
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

let newSections = [];
for (const id of order) {
  const match = sections.find(s => s.includes(`id: "${id}"`) || s.includes(`id: '${id}'`));
  if (match) {
    newSections.push(match);
  } else {
    console.error("Missing:", id);
  }
}

if (newSections.length === sections.length) {
  // we need to be careful with commas. We can strip trailing commas and join with ",\n"
  const cleaned = newSections.map(s => s.replace(/,\s*$/, ''));
  const newContent = content.substring(0, arrayStartIndex) + cleaned.join(",") + "\n    " + content.substring(arrayEndIndex);
  fs.writeFileSync(path, newContent);
  console.log("Success!");
} else {
  console.log("Mismatch, length is", newSections.length);
}
