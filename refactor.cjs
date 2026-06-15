const fs = require('fs');
const file = 'src/config/siteConfigs.ts';
let code = fs.readFileSync(file, 'utf8');

let newPages = `[
      {
        id: 'global_settings',
        title: 'Global Settings',
        sections: [
          {
            id: 'navbar',
            title: 'Global Navbar',
            endpoint: 'navbar',
            type: 'singleton',
            fields: [
              { key: 'navLinks', type: 'array', label: 'Navigation Links', fields: [
                { key: 'label', type: 'text', label: 'Label' },
                { key: 'featured', type: 'object', label: 'Featured Section', fields: ['img', 'title', 'desc', 'href'] },
                { key: 'columns', type: 'array', label: 'Menu Columns', fields: ['heading', 'icon', { key: 'links', type: 'array', label: 'Links', fields: ['label', 'href'] }] },
                { key: 'extraImgs', type: 'array', label: 'Extra Images', fields: ['img', 'caption', 'href'] }
              ]},
              { key: 'searchableItems', type: 'array', label: 'Searchable Items', fields: ['name', 'href'] },
              { key: 'popularSearches', type: 'array', label: 'Popular Searches', fields: ['text'] }
            ]
          },
          {
            id: 'footer',
            title: 'Global Footer',
            endpoint: 'footer',
            type: 'singleton',
            fields: [
              { key: 'aboutText', type: 'textarea', label: 'About Text' },
              { key: 'socialLinks', type: 'object', label: 'Social Links', fields: ['facebook', 'instagram', 'linkedin', 'youtube'] },
              { key: 'contactInfo', type: 'object', label: 'Contact Info', fields: ['address', 'phone', 'email', 'workingHours'] },
              { key: 'quickLinks', type: 'array', label: 'Quick Links', fields: ['label', 'href'] },
              { key: 'programs', type: 'array', label: 'Programs', fields: ['label', 'href'] },
              { key: 'campus', type: 'array', label: 'Campus Links', fields: ['label', 'href'] }
            ]
          }
        ]
      },
      {
        id: 'homepage',
        title: 'Homepage',
        sections: [
          { id: 'banner', title: 'Hero Banners', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'banners', type: 'array', label: 'Slides', fields: ['heading', 'subheading', { key: 'image', type: 'image', label: 'Image' }, 'ctaText'] }] },
          { id: 'stats', title: 'Stats & Achievements', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'stats', type: 'array', label: 'Stats', fields: ['label', 'value', { key: 'icon', type: 'image', label: 'Icon' }] }] },
          { id: 'brands', title: 'Approved Brands', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'brands', type: 'array', label: 'Brands', fields: ['name', { key: 'logo', type: 'image', label: 'Logo Image' }] }] },
          { id: 'about', title: 'About Pharmacy', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'aboutSnippet', type: 'object', label: 'Intro', fields: ['title', 'content', { key: 'image', type: 'image', label: 'Image' }] }] },
          { id: 'why_ishan', title: 'Why Ishan Pharmacy', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'whyIshan', type: 'array', label: 'Features', fields: ['title', 'description', { key: 'icon', type: 'image', label: 'Icon' }] }] },
          { id: 'campus', title: 'Campus Experience', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'gallery', type: 'array', label: 'Gallery Images', fields: [{ key: 'image', type: 'image', label: 'Image' }] }] }
        ]
      },
      {
        id: 'about_us',
        title: 'About Us',
        sections: [
          { id: 'aboutus', title: 'About Us Page', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'vision', type: 'textarea', label: 'Vision' }, { key: 'mission', type: 'textarea', label: 'Mission' }, { key: 'history', type: 'textarea', label: 'History' }] },
          { id: 'pages_list', title: 'Static Pages', endpoint: 'pages', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'slug', type: 'text', label: 'Page URL Slug' }, { key: 'content', type: 'textarea', label: 'Page Content (HTML/Text)' }, { key: 'images', type: 'array', label: 'Gallery Images', fields: [{ key: 'image', type: 'image', label: 'Image' }] }, { key: 'seo', type: 'object', label: 'SEO Settings', fields: ['metaTitle', 'metaDescription'] }] }
        ]
      },
      {
        id: 'programs_admissions',
        title: 'Programs & Admissions',
        sections: [
          { id: 'courses', title: 'Academic Courses', endpoint: 'courses', type: 'collection', fields: [{ key: 'programName', type: 'text', label: 'Program Name' }, { key: 'duration', type: 'text', label: 'Duration' }, { key: 'eligibility', type: 'text', label: 'Eligibility' }, { key: 'annualIntake', type: 'text', label: 'Annual Intake' }, { key: 'annualFee', type: 'text', label: 'Annual Fee' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'curriculumStructure', type: 'textarea', label: 'Curriculum Structure' }, { key: 'careerScope', type: 'textarea', label: 'Career Scope' }, { key: 'image', type: 'image', label: 'Cover Image' }] },
          { id: 'certificates', title: 'Certificate Programs', endpoint: 'certificates', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Program Name' }, { key: 'duration', type: 'text', label: 'Duration' }, { key: 'fee', type: 'text', label: 'Fee' }, { key: 'eligibility', type: 'text', label: 'Eligibility' }, { key: 'desc', type: 'textarea', label: 'Description' }] },
          { id: 'admissions', title: 'Admissions & Scholarships', endpoint: 'admissions', type: 'singleton', fields: [{ key: 'howToApply', type: 'array', label: 'Admission Steps', fields: [{ key: 'num', type: 'text', label: 'Step Number' }, { key: 'title', type: 'text', label: 'Title' }, { key: 'desc', type: 'textarea', label: 'Description' }]}, { key: 'documents', type: 'array', label: 'Required Documents', fields: [{ key: 'docName', type: 'text', label: 'Document Name' }]}, { key: 'alertBanner', type: 'object', label: 'Alert Banner', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'content', type: 'textarea', label: 'Content' }, { key: 'isActive', type: 'boolean', label: 'Is Active?' }]}, { key: 'admissionContact', type: 'object', label: 'Admission Contact', fields: [{ key: 'phone', type: 'text', label: 'Phone' }, { key: 'email', type: 'text', label: 'Email' }]}, { key: 'scholarships', type: 'array', label: 'Scholarships', fields: [{ key: 'category', type: 'text', label: 'Category' }, { key: 'concession', type: 'text', label: 'Concession' }, { key: 'description', type: 'textarea', label: 'Description' }]}] },
          { id: 'feepayment', title: 'Fee Payment', endpoint: 'feepayment', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'instructions', type: 'textarea', label: 'Instructions' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'link', type: 'text', label: 'Portal Link' }] },
          { id: 'faculty', title: 'Faculty Directory', endpoint: 'faculty', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'designation', type: 'text', label: 'Designation' }, { key: 'qualification', type: 'text', label: 'Qualification' }, { key: 'specialisation', type: 'text', label: 'Specialization' }, { key: 'dept', type: 'text', label: 'Department' }, { key: 'bio', type: 'textarea', label: 'Bio' }, { key: 'publications', type: 'text', label: 'Publications count' }, { key: 'image', type: 'image', label: 'Photo' }] },
          { id: 'visitingfaculty', title: 'Visiting Faculty', endpoint: 'visitingfaculty', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'org', type: 'text', label: 'Organization / Designation' }, { key: 'specialisation', type: 'text', label: 'Specialization' }, { key: 'impact', type: 'textarea', label: 'Impact' }, { key: 'bar', type: 'text', label: 'Extra Info / Tag' }] }
        ]
      },
      {
        id: 'labs_campus',
        title: 'Labs & Campus',
        sections: [
          { id: 'facilities', title: 'Facilities & Labs', endpoint: 'facilities', type: 'collection', fields: [{ key: 'slug', type: 'text', label: 'Page URL Slug' }, { key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'textarea', label: 'Page Subtitle' }, { key: 'overviewHeading', type: 'text', label: 'Overview Heading' }, { key: 'overviewContent', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'highlights', type: 'array', label: 'Highlights / Equipment', fields: ['title', 'description'] }] }
        ]
      },
      {
        id: 'student_life',
        title: 'Student Life',
        sections: [
          { id: 'news', title: 'News & Events', endpoint: 'news', type: 'collection', fields: [{ key: 'image', type: 'image', label: 'Cover' }, 'title', 'date', { key: 'description', type: 'textarea', label: 'Description' }, 'link'] },
          { id: 'calendarevents', title: 'Events Calendar', endpoint: 'calendarevents', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Event Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'venue', type: 'text', label: 'Venue' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'description', type: 'textarea', label: 'Description' }] },
          { id: 'photos', title: 'Photo Gallery', endpoint: 'photos', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Image Title / Caption' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'url', type: 'image', label: 'Upload Image' }] },
          { id: 'videos', title: 'Video Gallery', endpoint: 'videos', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Video Title' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'url', type: 'text', label: 'YouTube URL' }] },
          { id: 'press', title: 'Press Coverage', endpoint: 'press', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Headline / Title' }, { key: 'publication', type: 'text', label: 'Publication Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'link', type: 'text', label: 'Article Link' }, { key: 'image', type: 'image', label: 'Cover Image' }] },
          { id: 'downloads', title: 'Downloads', endpoint: 'downloads', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'files', type: 'array', label: 'Files', fields: ['name', 'fileType', 'category', 'size', 'url'] }] },
          { id: 'pastpapers', title: 'Past Exam Papers', endpoint: 'pastpapers', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'files', type: 'array', label: 'Files', fields: ['name', 'fileType', 'category', 'size', 'url'] }] },
          { id: 'guestlectures', title: 'Guest Lectures', endpoint: 'guestlectures', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Lecture Title' }, { key: 'speaker', type: 'text', label: 'Speaker Name' }, { key: 'designation', type: 'text', label: 'Designation / Organization' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'image', type: 'image', label: 'Image' }, { key: 'description', type: 'textarea', label: 'Description' }, { key: 'topics', type: 'text', label: 'Topics Covered' }] },
          { id: 'industrialvisits', title: 'Industrial Visits', endpoint: 'industrialvisits', type: 'collection', fields: [{ key: 'company', type: 'text', label: 'Company Name' }, { key: 'location', type: 'text', label: 'Location' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'textarea', label: 'Description' }, { key: 'takeaways', type: 'textarea', label: 'Key Takeaways' }] },
          { id: 'studentportal', title: 'Student Portal', endpoint: 'studentportal', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'instructions', type: 'textarea', label: 'Instructions' }, { key: 'link', type: 'text', label: 'Portal Link' }, { key: 'image', type: 'image', label: 'Cover Image' }] }
        ]
      },
      {
        id: 'connect',
        title: 'Connect & Reach',
        sections: [
          { id: 'placements', title: 'Placements', endpoint: 'placements', type: 'singleton', fields: [{ key: 'placementNumbers', type: 'array', label: 'Placement Numbers', fields: ['number', 'label'] }, { key: 'recruitingPartners', type: 'array', label: 'Recruiting Partners', fields: ['name', { key: 'logo', type: 'image', label: 'Logo' }] }, { key: 'successStories', type: 'array', label: 'Success Stories', fields: ['name', 'company', 'role', 'batch', { key: 'image', type: 'image', label: 'Image' }] }, { key: 'placementProcess', type: 'array', label: 'Placement Process', fields: ['step', 'title', 'desc'] }] },
          { id: 'research', title: 'Research Projects', endpoint: 'researchprojects', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Project Title' }, { key: 'investigator', type: 'text', label: 'Principal Investigator' }, { key: 'fundingAgency', type: 'text', label: 'Funding Agency' }, { key: 'grantAmount', type: 'text', label: 'Grant Amount' }, { key: 'status', type: 'text', label: 'Status' }, { key: 'duration', type: 'text', label: 'Duration' }] },
          { id: 'publications', title: 'Publications', endpoint: 'publications', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'authors', type: 'text', label: 'Authors' }, { key: 'journal', type: 'text', label: 'Journal / Publisher' }, { key: 'year', type: 'text', label: 'Year' }, { key: 'impactFactor', type: 'text', label: 'Impact Factor' }, { key: 'link', type: 'text', label: 'Link' }] },
          { id: 'alumninetwork', title: 'Alumni Network', endpoint: 'alumninetwork', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'batch', type: 'text', label: 'Batch' }, { key: 'currentRole', type: 'text', label: 'Current Role / Company' }, { key: 'quote', type: 'textarea', label: 'Quote' }, { key: 'image', type: 'image', label: 'Photo' }] },
          { id: 'careers', title: 'Careers', endpoint: 'careers', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Job Title' }, { key: 'department', type: 'text', label: 'Department' }, { key: 'type', type: 'text', label: 'Employment Type' }, { key: 'location', type: 'text', label: 'Location' }, { key: 'description', type: 'textarea', label: 'Job Description' }, { key: 'requirements', type: 'textarea', label: 'Requirements' }, { key: 'status', type: 'text', label: 'Status' }] },
          { id: 'contact', title: 'Contact Us', endpoint: 'contact', type: 'singleton', fields: [{ key: 'address', type: 'text', label: 'Address' }, { key: 'phones', type: 'array', label: 'Phone Numbers', fields: ['number', 'department'] }, { key: 'emails', type: 'array', label: 'Emails', fields: ['address', 'department'] }, { key: 'workingHours', type: 'text', label: 'Working Hours' }, { key: 'mapUrl', type: 'text', label: 'Map iframe URL' }] },
          { id: 'feedback', title: 'Feedback Submissions', endpoint: 'feedback', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'email', type: 'text', label: 'Email' }, { key: 'role', type: 'text', label: 'Role' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'rating', type: 'text', label: 'Rating' }, { key: 'message', type: 'textarea', label: 'Message' }] },
          { id: 'leads', title: 'Admission Leads', endpoint: 'leads', type: 'collection', fields: [] }
        ]
      }
    ]`;

const regex = /pharmacy:\s*\{\s*name:\s*"Pharmacy",\s*baseUrl:\s*"pharmacy",\s*pages:\s*\[[\s\S]*?(?=\n\s*\},\s*\w+:)/;
let newContent = 'pharmacy: {\n    name: "Pharmacy",\n    baseUrl: "pharmacy",\n    pages: ' + newPages + '\n  }';

let updatedCode = code.replace(regex, newContent);

fs.writeFileSync(file, updatedCode);
console.log('Restructured Pharmacy sidebar successfully!');
