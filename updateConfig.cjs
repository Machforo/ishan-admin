const fs = require('fs');
const filePath = 'D:/FreeLance/ishan-admin/src/config/siteConfigs.ts';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\{ id: "courses", title: "Courses", sections: \[\{ id: "courses_list".+?\] \},\s+\{ id: "campus_life", title: "Campus Life", sections: \[\{ id: "infrastructure".+?\] \},\s+\{ id: "admissions", title: "Admissions", sections: \[\{ id: "how_to_apply".+?\] \},\s+\{ id: "placements", title: "Placements", sections: \[\{ id: "numbers".+?\] \},/s;

const newConfig = fs.readFileSync('D:/FreeLance/ishan-admin/newConfig.txt', 'utf8');

if (regex.test(content)) {
  const newContent = content.replace(regex, newConfig);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('? Replaced successfully');
} else {
  console.log('? Regex did not match');
}
