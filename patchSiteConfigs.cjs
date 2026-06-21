const fs = require('fs');

let content = fs.readFileSync('src/config/siteConfigs.ts', 'utf8');

const studentZoneStr = `      { id: "student_zone", title: "Student Zone", sections: [
        { id: "downloads", title: "Downloads", endpoint: "studentzone", type: "singleton", fields: [{ key: "downloads", type: "object", label: "Downloads Config", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "files", type: "array", label: "Files", fields: ["name", "fileType", "category", "size", "link"] }] }] },
        { id: "past_papers", title: "Past Exam Papers", endpoint: "studentzone", type: "singleton", fields: [{ key: "pastPapers", type: "object", label: "Past Papers Config", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "papers", type: "array", label: "Papers", fields: ["program", "year", "name", "size", "link"] }] }] },
        { id: "code_of_conduct", title: "Code of Conduct", endpoint: "studentzone", type: "singleton", fields: [{ key: "codeOfConduct", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] },
        { id: "anti_ragging", title: "Anti-Ragging", endpoint: "studentzone", type: "singleton", fields: [{ key: "antiRagging", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "helplinePhone", type: "text", label: "Helpline Phone" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] },
        { id: "grievance_redressal", title: "Grievance Redressal", endpoint: "studentzone", type: "singleton", fields: [{ key: "grievanceRedressal", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] },
        { id: "privacy_policy", title: "Privacy Policy", endpoint: "studentzone", type: "singleton", fields: [{ key: "privacyPolicy", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] }
      ] },
      { id: "admissions", title: "Admissions", sections: [{ id: "enquiry_page", title: "Enquiry Page"`;

content = content.replace('{ id: "admissions", title: "Admissions", sections: [{ id: "enquiry_page", title: "Enquiry Page"', studentZoneStr);

fs.writeFileSync('src/config/siteConfigs.ts', content);
console.log("Student Zone added to siteConfigs.ts");
