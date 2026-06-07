export interface Field {
  key: string;
  type: 'text' | 'textarea' | 'image' | 'array' | 'object' | 'number' | 'date' | 'select' | 'boolean';
  label: string;
  fields?: (string | Field)[]; // For array/object types
  options?: { label: string; value: string }[]; // For select type
}

export interface Section {
  id: string;
  title: string;
  endpoint: string; // The API endpoint for this section
  type: 'singleton' | 'collection';
  fields: (string | Field)[];
  redirect?: {
    targetPage: string;
    targetSection: string;
    message: string;
  };
}

export interface Page {
  id: string;
  title: string;
  sections: Section[];
}

export interface SiteConfig {
  name: string;
  baseUrl: string;
  pages: Page[];
}

const commonLandingSections: Section[] = [
  { id: "global", title: "0. Global Settings", endpoint: "", type: "singleton", fields: [
    { key: "navMenu", type: "object", label: "Navigation Menu", fields: [
      { key: "items", type: "array", label: "Menu Items", fields: [{ key: "name", type: "text", label: "Menu Item Name" }] }
    ]},
    { key: "footerLinks", type: "object", label: "Footer Links", fields: [
      { key: "quickLinks", type: "array", label: "Quick Links", fields: [{ key: "text", type: "text", label: "Link Text" }] },
      { key: "campuses", type: "array", label: "Campuses", fields: [{ key: "text", type: "text", label: "Campus Text" }] }
    ]},
    { key: "group", type: "array", label: "Ishan Group Links", fields: [{ key: "text", type: "text", label: "Link Text" }] },
    { key: "rankings", type: "array", label: "Rankings", fields: [{ key: "text", type: "text", label: "Ranking Text" }] }
  ]},
  { id: "hero", title: "1. Home Banner", endpoint: "", type: "singleton", fields: [
    { key: "logo", type: "image", label: "Main Logo (Branding)" },
    { key: "hero", type: "object", label: "Banner Config", fields: [
      { key: "banners", type: "array", label: "Slides", fields: [
        { key: "title", type: "text", label: "Heading" },
        { key: "subtitle", type: "textarea", label: "Subheading" },
        { key: "ctaText", type: "text", label: "CTA Text" },
        { key: "ctaLink", type: "text", label: "CTA Link" },
        { key: "image", type: "image", label: "Banner Image" },
        { key: "tag", type: "text", label: "Top Tag" }
      ]}
    ]},
    { key: "highlights", type: "array", label: "Highlights (Stat Strip)", fields: [{ key: "text", type: "text", label: "Highlight" }] },
    { key: "newsFlash", type: "array", label: "News Reflected (Flash)", fields: [
      { key: "tag", type: "text", label: "Tag (e.g. BREAKING)" },
      { key: "date", type: "text", label: "Date" },
      { key: "title", type: "text", label: "Headline" },
      { key: "body", type: "textarea", label: "Details" }
    ]}
  ]},
  { id: "colleges", title: "2. Our 5 Colleges", endpoint: "", type: "singleton", fields: [
    { key: "collegeSection", type: "object", label: "Section Header", fields: ["heading", "subheading"] },
    { key: "colleges", type: "array", label: "College List", fields: [
      { key: "name", type: "text", label: "College Name" },
      { key: "short", type: "text", label: "Short Name (e.g. LAW)" },
      { key: "desc", type: "textarea", label: "College Description" },
      { key: "programs", type: "text", label: "Programs Offered (e.g. BA LL.B • LL.B)" },
      { key: "accreditation", type: "text", label: "Accreditation" },
      { key: "ctaText", type: "text", label: "CTA Text" },
      { key: "ctaLink", type: "text", label: "CTA Link" },
      { key: "image", type: "image", label: "Image" }
    ]}
  ]},
  { id: "programmes", title: "3. Academic Programmes", endpoint: "", type: "singleton", fields: [
    { key: "programmeSection", type: "object", label: "Section Header", fields: ["heading", "subheading"] },
    { key: "programCategories", type: "array", label: "Categories", fields: [
      { key: "id", type: "text", label: "Category ID (e.g. ug)" },
      { key: "label", type: "text", label: "Display Label" }
    ]},
    { key: "programs", type: "object", label: "Programs by Level", fields: [
      { key: "ug", type: "array", label: "Undergraduate", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "school", type: "text", label: "College" }] },
      { key: "pg", type: "array", label: "Postgraduate", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "school", type: "text", label: "College" }] },
      { key: "diploma", type: "array", label: "Diploma", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "school", type: "text", label: "College" }] },
      { key: "doctoral", type: "array", label: "Doctoral", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "school", type: "text", label: "College" }] }
    ]}
  ]},
  { id: "about", title: "4. About Ishan", endpoint: "", type: "singleton", fields: [
    { key: "aboutContent", type: "object", label: "Content", fields: ["title", "description"] },
    { key: "aboutImages", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }
  ]},
  { id: "campus_life", title: "5. Campus Life", endpoint: "", type: "singleton", fields: [
    { key: "campusLife", type: "object", label: "Campus Life", fields: [
      { key: "nationalitiesCount", type: "text", label: "Number of Nationalities" },
      { key: "sections", type: "array", label: "Gallery Categories", fields: [
        { key: "title", type: "text", label: "Category Name" },
        { key: "description", type: "textarea", label: "Description" },
        { key: "image", type: "image", label: "Cover Image" },
        { key: "gallery", type: "array", label: "Photos", fields: [{ key: "url", type: "image", label: "Photo" }] }
      ]}
    ]}
  ]},
  { id: "research", title: "6. Research", endpoint: "", type: "singleton", fields: [
    { key: "researchSection", type: "object", label: "Section Header", fields: ["heading", "subheading", "ctaText", "ctaLink"] },
    { key: "researchCards", type: "array", label: "Research Photos/Cards", fields: ["title", "tag", "image"] }
  ]},
  { id: "placements", title: "7. Campus Placements", endpoint: "", type: "singleton", fields: [
    { key: "placementStats", type: "array", label: "Numbers", fields: ["num", "label"] }
  ]},
  { id: "recruiters", title: "8. Our Top Recruiters", endpoint: "", type: "singleton", fields: [
    { key: "recruiters", type: "array", label: "Recruiter List", fields: [{ key: "name", type: "text", label: "Company Name" }] }
  ]},
  { id: "feedback", title: "9. Feedback", endpoint: "", type: "singleton", fields: [
    { key: "testimonials", type: "array", label: "Feedback List", fields: [
      { key: "name", type: "text", label: "Name" },
      { key: "designation", type: "text", label: "Designation" },
      { key: "quote", type: "textarea", label: "Feedback" },
      { key: "image", type: "image", label: "Photo" }
    ]}
  ]},
  { id: "news_events", title: "10. News and Events", endpoint: "", type: "singleton", fields: [
    { key: "news", type: "array", label: "Events", fields: ["date", "title", "description", "image"] }
  ]},
  { id: "social_wall", title: "11. Ishan Social Wall", endpoint: "", type: "singleton", fields: [
    { key: "socialPosts", type: "array", label: "Social Posts", fields: ["caption", "image", "likes"] }
  ]},
  { id: "contact", title: "12. Contact Us", endpoint: "", type: "singleton", fields: [
    { key: "contactInfo", type: "object", label: "Contact Details", fields: ["location", "admissionNumber", "email", "officeHours", "instagramHandle", "instagramLink"] }
  ]},
  { id: "leads", title: "13. Main Landing Page Lead", endpoint: "leads", type: "collection", fields: [
    { key: "name", type: "text", label: "Name" },
    { key: "email", type: "text", label: "Email" },
    { key: "phone", type: "text", label: "Phone" },
    { key: "programme", type: "text", label: "Programme" },
    { key: "message", type: "textarea", label: "Message" }
  ]}
];

export const siteConfigs: Record<string, SiteConfig> = {
  landing1: {
    name: "Landing Page 1",
    baseUrl: "landing1",
    pages: [
      {
        id: "main",
        title: "Main Content",
        sections: commonLandingSections
      }
    ]
  },
  landing2: {
    name: "Landing Page 2",
    baseUrl: "landing2",
    pages: [
      {
        id: "main",
        title: "Main Content",
        sections: commonLandingSections
      }
    ]
  },
  iimt: {
    name: "Management and Technology",
    baseUrl: "iimt",
    pages: [
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          {
            id: "banner",
            title: "Homepage Banner",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "banners", type: "array", label: "Banner Slides", fields: [
                { key: "image", type: "image", label: "Banner Image" },
                { key: "heading", type: "text", label: "Banner Heading" },
                { key: "subheading", type: "text", label: "Banner Subheading" },
                { key: "cta1", type: "text", label: "CTA - 1 (Primary)" },
                { key: "cta2", type: "text", label: "CTA - 2 (Secondary)" }
              ]}
            ]
          },
          { id: "numbers", title: "Numbers & Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "numbers", type: "array", label: "Stats Counter", fields: ["label", "value"] }] },
          { id: "partnerships", title: "Approved & Partnerships", endpoint: "homepage", type: "singleton", fields: [{ key: "partnerships", type: "array", label: "Partners", fields: ["name", "image"] }] },
          { id: "about_home", title: "About IIMT (Homepage)", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutIimt", type: "object", label: "About Section", fields: ["image", "heading", "description"] }] },
          { id: "programs_link", title: "Programs Designed", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "courses", targetSection: "courses_list", message: "Redirects to Courses Section" } },
          { id: "stand_apart", title: "What Makes IIMT Stand Apart", endpoint: "homepage", type: "singleton", fields: [{ key: "standApart", type: "object", label: "Content", fields: [{ key: "description", type: "textarea", label: "Description" }, { key: "points", type: "array", label: "Feature Points", fields: ["text"] }, { key: "cta", type: "text", label: "CTA Text" }] }] },
          { id: "placements_link", title: "Placements Preview", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "homepage", targetSection: "partnerships", message: "Redirects to Partnerships Section" } },
          { id: "life_at_iimt", title: "Life at IIMT", endpoint: "homepage", type: "singleton", fields: [{ key: "lifeAtIimt", type: "object", label: "Gallery Preview", fields: [{ key: "heading", type: "text", label: "Heading" }, { key: "images", type: "array", label: "Images", fields: ["url"] }] }] },
          { id: "updates_link", title: "Latest Updates", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "news", targetSection: "news_list", message: "Redirects to News & Events Section" } },
          { id: "success_stories", title: "Success Stories", endpoint: "homepage", type: "singleton", fields: [{ key: "successStories", type: "object", label: "Stories", fields: [{ key: "students", type: "array", label: "Student Feedback", fields: ["name", "photo", "feedback"] }, { key: "parents", type: "array", label: "Parent Feedback", fields: ["name", "photo", "feedback"] }] }] },
          { id: "contact_link", title: "Get In Touch", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "contact", targetSection: "contact_details", message: "Redirects to Contact Section" } }
        ]
      },
      {
        id: "about_us",
        title: "About Us",
        sections: [
          { id: "about_iimt", title: "About IIMT Content", endpoint: "aboutus", type: "singleton", fields: [{ key: "ourStory", type: "object", label: "Our Story", fields: ["image", "description"] }, { key: "ourJourney", type: "array", label: "Our Journey (Milestones)", fields: ["year", "event"] }, { key: "keyDifferentiators", type: "array", label: "Key Differentiators", fields: ["title", "description"] }] },
          { id: "director_message", title: "Director's Message", endpoint: "aboutus", type: "singleton", fields: [{ key: "directorMessage", type: "object", label: "Message Details", fields: ["name", "designation", "image", "message"] }] },
          { id: "vision_mission", title: "Mission & Vision", endpoint: "aboutus", type: "singleton", fields: [{ key: "missionVision", type: "object", label: "Foundations", fields: [{ key: "vision", type: "textarea", label: "Our Vision" }, { key: "mission", type: "textarea", label: "Our Mission" }, { key: "coreValues", type: "array", label: "Core Values", fields: ["text"] }] }] },
          { id: "approvals", title: "Approvals & Affiliations", endpoint: "aboutus", type: "singleton", fields: [{ key: "approvalsAffiliations", type: "array", label: "Certifications", fields: [{ key: "name", type: "text", label: "Name" }, { key: "image", type: "image", label: "Logo/Certificate" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "description", type: "textarea", label: "Description" }] }] },
          { id: "why_iimt", title: "Why IIMT?", endpoint: "aboutus", type: "singleton", fields: [{ key: "whyIimt", type: "object", label: "Content", fields: ["content"] }] },
          { id: "best_practices", title: "Best Practices", endpoint: "aboutus", type: "singleton", fields: [{ key: "bestPractices", type: "array", label: "List", fields: ["title", "content"] }] },
          { id: "green_initiatives", title: "Green Initiatives", endpoint: "aboutus", type: "singleton", fields: [{ key: "greenInitiatives", type: "object", label: "Content", fields: ["content"] }] }
        ]
      },
      { id: "courses", title: "Courses", sections: [{ id: "courses_list", title: "Course Catalog", endpoint: "courses", type: "collection", fields: [{ key: "programName", type: "text", label: "Program Name" }, { key: "overview", type: "textarea", label: "Program Overview" }, { key: "homepageSummary", type: "textarea", label: "Summary on Homepage" }, { key: "curriculumStructure", type: "textarea", label: "Curriculum Structure" }, { key: "careerScope", type: "textarea", label: "Career Scope" }, { key: "quickFacts", type: "textarea", label: "Quick Facts" }, { key: "careerOutcome", type: "textarea", label: "Career Outcome (Homepage)" }] }] },
      { id: "campus_life", title: "Campus Life", sections: [{ id: "infrastructure", title: "Infrastructure", endpoint: "campuslife", type: "singleton", fields: [{ key: "infrastructure", type: "object", label: "Details", fields: ["image", "content"] }] }, { id: "it_labs", title: "IT Labs", endpoint: "campuslife", type: "singleton", fields: [{ key: "itLabs", type: "object", label: "Lab Info", fields: [{ key: "specs", type: "object", label: "Specifications", fields: ["computers", "internetSpeed", "software", "timings"] }, { key: "rules", type: "array", label: "Lab Rules", fields: ["text"] }] }] }, { id: "library", title: "Library", endpoint: "campuslife", type: "singleton", fields: [{ key: "library", type: "object", label: "Library Assets", fields: ["image", "totalBooks", "digitalAccess", "eJournals", "seating"] }] }, { id: "auditorium", title: "Auditorium", endpoint: "campuslife", type: "singleton", fields: [{ key: "auditorium", type: "object", label: "Event Space", fields: ["image", "seating", "avStatus", "events"] }] }, { id: "sports", title: "Sports", endpoint: "campuslife", type: "singleton", fields: [{ key: "sports", type: "array", label: "Facilities", fields: ["image", "title", "link"] }] }, { id: "hostel", title: "Hostel", endpoint: "campuslife", type: "singleton", fields: [{ key: "hostel", type: "object", label: "Details", fields: ["image", "content"] }] }, { id: "cultural", title: "Cultural Activities", endpoint: "campuslife", type: "singleton", fields: [{ key: "culturalActivities", type: "object", label: "Highlights", fields: ["images", "highlights"] }] }] },
      { id: "admissions", title: "Admissions", sections: [{ id: "how_to_apply", title: "How to Apply", endpoint: "admissions", type: "singleton", fields: [{ key: "howToApply", type: "object", label: "Process", fields: [{ key: "highlight", type: "text", label: "Highlight Message" }, { key: "admissionProcess", type: "array", label: "Steps", fields: ["step", "desc"] }, { key: "documentChecklist", type: "array", label: "Required Documents", fields: ["text"] }, { key: "helpContact", type: "text", label: "Help Info" }] }] }, { id: "scholarships", title: "Scholarships", endpoint: "admissions", type: "singleton", fields: [{ key: "scholarships", type: "array", label: "List", fields: ["category", "description"] }] }, { id: "faqs", title: "FAQs", endpoint: "admissions", type: "singleton", fields: [{ key: "faqs", type: "array", label: "List", fields: ["question", "answer"] }] }] },
      { id: "placements", title: "Placements", sections: [{ id: "numbers", title: "Placement Stats", endpoint: "placements", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "description"] }] }, { id: "process", title: "Placement Process", endpoint: "placements", type: "singleton", fields: [{ key: "process", type: "array", label: "Steps", fields: ["step", "desc"] }] }, { id: "partners", title: "Recruitment Partners", endpoint: "placements", type: "singleton", fields: [{ key: "partners", type: "array", label: "Companies", fields: ["name", "logo"] }] }, { id: "stories", title: "Success Stories", endpoint: "placements", type: "singleton", fields: [{ key: "studentSuccess", type: "array", label: "Alumni Feed", fields: ["name", "company", "feedback", "photo"] }] }] },
      { id: "gallery", title: "Gallery", sections: [{ id: "photos", title: "Photos", endpoint: "gallery", type: "singleton", fields: [{ key: "photos", type: "array", label: "Image List", fields: ["title", "url"] }] }, { id: "videos", title: "Videos", endpoint: "gallery", type: "singleton", fields: [{ key: "videos", type: "array", label: "Video Links", fields: ["title", "url"] }] }, { id: "press", title: "Press Coverage", endpoint: "gallery", type: "singleton", fields: [{ key: "pressCoverage", type: "array", label: "Clippings", fields: ["title", "url", "date"] }] }] },
      { id: "contact", title: "Contact Us", sections: [{ id: "contact_details", title: "Get In Touch Details", endpoint: "contact", type: "singleton", fields: [{ key: "details", type: "object", label: "Information", fields: ["address", "phone", "email", "mapEmbed"] }] }] },
      { id: "student_portal", title: "Student Portal", sections: [{ id: "portal_info", title: "Portal Info", endpoint: "studentportal", type: "singleton", fields: [{ key: "title", type: "text", label: "Title" }, { key: "description", type: "textarea", label: "Description" }, { key: "cta", type: "text", label: "CTA Text" }, { key: "link", type: "text", label: "URL" }] }] },
      { id: "news", title: "News and Events", sections: [{ id: "news_list", title: "News Listing", endpoint: "newsevents", type: "collection", fields: [{ key: "image", type: "image", label: "Cover Image" }, { key: "title", type: "text", label: "Heading" }, { key: "date", type: "date", label: "Date" }, { key: "description", type: "textarea", label: "Description" }] }] },
      { id: "fee_payment", title: "Fee Payment Portal", sections: [{ id: "payment_info", title: "Payment Info", endpoint: "feepayment", type: "singleton", fields: [{ key: "title", type: "text", label: "Title" }, { key: "description", type: "textarea", label: "Description" }, { key: "cta", type: "text", label: "CTA Text" }, { key: "link", type: "text", label: "URL" }] }] },
      { id: "applicant_submissions", title: "Applicant Submissions", sections: [{ id: "leads", title: "Leads", endpoint: "leads", type: "collection", fields: [] }, { id: "job_apps", title: "Job Applications", endpoint: "job-applications", type: "collection", fields: [] }] }
    ]
  },
  ayurveda: {
    name: "Ayurveda",
    baseUrl: "ayurveda",
    pages: [
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          { id: "banner", title: "Homepage Banner", endpoint: "homepage", type: "singleton", fields: [{ key: "banners", type: "array", label: "Slides", fields: [{ key: "heading", type: "text", label: "Heading" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "image", type: "image", label: "Image" }, { key: "ctaText", type: "text", label: "CTA Text" }, { key: "ctaLink", type: "text", label: "CTA Link" }] }] },
          { id: "numbers", title: "Numbers & Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "stats", type: "array", label: "Counters", fields: ["label", "value"] }] },
          { id: "profile", title: "Institutional Profile", endpoint: "homepage", type: "singleton", fields: [{ key: "institutionalProfile", type: "object", label: "Profile Content", fields: ["image", "heading", "subheading", { key: "description", type: "textarea", label: "Description" }, "ctaText", "ctaLink"] }] },
          { id: "why_choose", title: "Why Choose Us", endpoint: "homepage", type: "singleton", fields: [{ key: "whyChooseUs", type: "array", label: "Value Points", fields: ["icon", "heading", "description"] }] },
          { id: "depts_link", title: "Specialised Departments", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "academics", targetSection: "depts", message: "Redirects to Academics Section" } },
          { id: "testimonials", title: "Student Testimonials", endpoint: "testimonials", type: "collection", fields: ["name", { key: "image", type: "image", label: "Photo" }, "designation", { key: "feedback", type: "textarea", label: "Feedback" }] },
          { id: "life_ishan", title: "Life at Ishan", endpoint: "homepage", type: "singleton", fields: [{ key: "lifeAtIshan", type: "array", label: "Gallery", fields: ["image"] }] },
          { id: "help_link", title: "Counselling Helpline", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "contact", targetSection: "details", message: "Redirects to Contact Section" } }
        ]
      },
      {
        id: "institute",
        title: "Institute",
        sections: [
          { id: "about", title: "About IAMC", endpoint: "aboutus", type: "singleton", fields: [{ key: "ourStory", type: "object", label: "Content", fields: ["image", "description"] }] },
          { id: "history", title: "Group History", endpoint: "aboutus", type: "singleton", fields: [{ key: "groupHistory", type: "object", label: "History", fields: [{ key: "content", type: "textarea", label: "Content" }] }] },
          { id: "chairman", title: "Chairman's Message", endpoint: "aboutus", type: "singleton", fields: [{ key: "chairmanMessage", type: "object", label: "Message", fields: ["name", "image", { key: "message", type: "textarea", label: "Message" }] }] },
          { id: "principal", title: "Principal's Message", endpoint: "aboutus", type: "singleton", fields: [{ key: "principalMessage", type: "object", label: "Message", fields: ["name", "image", { key: "message", type: "textarea", label: "Message" }] }] },
          { id: "mission", title: "Mission & Vision", endpoint: "aboutus", type: "singleton", fields: [{ key: "missionVision", type: "object", label: "Goals", fields: [{ key: "vision", type: "textarea", label: "Vision" }, { key: "mission", type: "textarea", label: "Mission" }, { key: "values", type: "array", label: "Values", fields: ["text"] }] }] }
        ]
      },
      {
        id: "programs",
        title: "BAMS Program",
        sections: [
          { id: "admissions_home", title: "Admissions Home", endpoint: "admissions", type: "singleton", fields: [{ key: "admissionsHome", type: "object", label: "Hero", fields: ["title", "content"] }] },
          { id: "intake", title: "Eligibility & Intake", endpoint: "admissions", type: "singleton", fields: [{ key: "eligibilityIntake", type: "object", label: "Details", fields: ["eligibility", "intake"] }] },
          { id: "neet", title: "NEET Counselling Guide", endpoint: "admissions", type: "singleton", fields: [{ key: "neetCounselling", type: "object", label: "Guide", fields: ["guide", "link"] }] },
          { id: "faqs_link", title: "Admission FAQs", endpoint: "admissions", type: "singleton", fields: [], redirect: { targetPage: "academic_faqs", targetSection: "list", message: "Redirects to FAQ Section" } },
          { id: "scholarships", title: "Scholarship Schemes", endpoint: "admissions", type: "singleton", fields: [{ key: "scholarships", type: "array", label: "List", fields: ["category", "description"] }] }
        ]
      },
      {
        id: "academics",
        title: "Academics",
        sections: [
          { id: "depts", title: "Academic Departments", endpoint: "academics", type: "singleton", fields: [{ key: "departments", type: "array", label: "Depts", fields: ["name", "description"] }] },
          { id: "faculty", title: "Faculty Directory", endpoint: "faculty", type: "collection", fields: ["name", "designation", "qualification", "experience", "specialization", "image"] }
        ]
      },
      {
        id: "hospital",
        title: "The Hospital",
        sections: [
          { id: "portal", title: "Hospital Portal", endpoint: "hospital", type: "singleton", fields: [{ key: "overview", type: "object", label: "Overview", fields: ["image", { key: "content", type: "textarea", label: "Content" }] }] },
          { id: "panchkarma", title: "Panchkarma Therapy", endpoint: "hospital", type: "singleton", fields: [{ key: "panchkarma", type: "array", label: "Treatments", fields: ["title", "description", "image"] }] },
          { id: "diagnostics", title: "Diagnostics & Labs", endpoint: "hospital", type: "singleton", fields: [{ key: "diagnostics", type: "array", label: "Labs", fields: ["title", "description"] }] },
          { id: "clinical_staff", title: "Clinical Staff", endpoint: "hospital", type: "singleton", fields: [{ key: "departments", type: "array", label: "Staff Groups", fields: ["name", "description"] }] },
          { id: "opd_ipd", title: "OPD & IPD Services", endpoint: "hospital", type: "singleton", fields: [{ key: "services", type: "array", label: "Services", fields: ["title", "description"] }] }
        ]
      },
      {
        id: "students",
        title: "Students Corner",
        sections: [
          { id: "anti_ragging", title: "Anti-Ragging Zone", endpoint: "students", type: "singleton", fields: [{ key: "antiRagging", type: "object", label: "Policy", fields: [{ key: "content", type: "textarea", label: "Content" }] }] },
          { id: "grievance", title: "Grievance Redressal", endpoint: "students", type: "singleton", fields: [{ key: "grievanceRedressal", type: "object", label: "Policy", fields: [{ key: "content", type: "textarea", label: "Content" }] }] },
          { id: "posh", title: "POSH Policy", endpoint: "students", type: "singleton", fields: [{ key: "poshPolicy", type: "object", label: "Policy", fields: [{ key: "content", type: "textarea", label: "Content" }] }] },
          { id: "conduct", title: "Code of Conduct", endpoint: "students", type: "singleton", fields: [{ key: "codeOfConduct", type: "object", label: "Policy", fields: [{ key: "content", type: "textarea", label: "Content" }] }] },
          { id: "privacy", title: "Privacy Policy", endpoint: "students", type: "singleton", fields: [{ key: "privacyPolicy", type: "object", label: "Policy", fields: [{ key: "content", type: "textarea", label: "Content" }] }] }
        ]
      },
      {
        id: "research",
        title: "Research & Careers",
        sections: [
          { id: "journal", title: "Academic Journal (ISSN)", endpoint: "research", type: "singleton", fields: [{ key: "academicJournal", type: "object", label: "Journal Details", fields: ["title", "issn", { key: "content", type: "textarea", label: "Content" }] }] },
          { id: "publications", title: "Faculty Publications", endpoint: "research", type: "singleton", fields: [{ key: "facultyPublications", type: "array", label: "List", fields: ["title", "author", "journal", "year"] }] },
          { id: "projects", title: "Ongoing Projects (AYUSH)", endpoint: "research", type: "singleton", fields: [{ key: "projects", type: "array", label: "Projects", fields: ["title", "body", "status"] }] },
          { id: "placements", title: "Placements & Internships", endpoint: "research", type: "singleton", fields: [{ key: "placements", type: "object", label: "Preview", fields: [{ key: "summary", type: "textarea", label: "Summary" }, { key: "companies", type: "array", label: "Partners", fields: ["name", "logo"] }] }] },
          { id: "alumni", title: "Alumni Network", endpoint: "research", type: "singleton", fields: [{ key: "alumni", type: "array", label: "Members", fields: ["name", "batch", "testimonial", "image"] }] }
        ]
      },
      {
        id: "campus",
        title: "Campus",
        sections: [
          { id: "infra", title: "Infrastructure", endpoint: "facilities", type: "singleton", fields: [{ key: "infrastructure", type: "object", label: "Details", fields: ["image", "content"] }] },
          { id: "garden", title: "Herbal Garden", endpoint: "facilities", type: "singleton", fields: [{ key: "herbalGarden", type: "object", label: "Garden Info", fields: ["image", "description", "speciesCount"] }] },
          { id: "hostel", title: "Hostel & Housing", endpoint: "facilities", type: "singleton", fields: [{ key: "hostel", type: "object", label: "Details", fields: ["image", "content"] }] },
          { id: "sports", title: "Sports & Athletics", endpoint: "facilities", type: "singleton", fields: [{ key: "sports", type: "object", label: "Facilities", fields: ["image", "content"] }] },
          { id: "auditorium", title: "Auditorium", endpoint: "facilities", type: "singleton", fields: [{ key: "auditorium", type: "object", label: "Details", fields: ["image", "seating"] }] }
        ]
      },
      {
        id: "digital",
        title: "Digital Services",
        sections: [
          { id: "student_portal", title: "Students Portal", endpoint: "digital", type: "singleton", fields: [{ key: "studentPortal", type: "object", label: "Link", fields: ["title", "link"] }] },
          { id: "fee_payment", title: "Fee Payment Portal", endpoint: "digital", type: "singleton", fields: [{ key: "feePayment", type: "object", label: "Link", fields: ["title", "link"] }] },
          { id: "downloads", title: "Download Section", endpoint: "digital", type: "singleton", fields: [{ key: "downloads", type: "array", label: "Files", fields: ["title", "fileUrl"] }] },
          { id: "exams", title: "Examination Portal", endpoint: "digital", type: "singleton", fields: [{ key: "examinationPortal", type: "object", label: "Link", fields: ["title", "link"] }] }
        ]
      },
      { id: "contact", title: "Contact Us", sections: [{ id: "details", title: "Contact Details", endpoint: "contact", type: "singleton", fields: [{ key: "address", type: "textarea", label: "Address" }, "phone", "email", "mapEmbed"] }] },
      { id: "academic_faqs", title: "Academic FAQs", sections: [{ id: "list", title: "FAQs", endpoint: "faqs", type: "collection", fields: ["question", { key: "answer", type: "textarea", label: "Answer" }, "category"] }] },
      { id: "news", title: "News & Events", sections: [{ id: "list", title: "News Listing", endpoint: "news", type: "collection", fields: [{ key: "image", type: "image", label: "Cover" }, "title", "date", { key: "description", type: "textarea", label: "Description" }, "link"] }] },
      { id: "blogs", title: "Blogs", sections: [{ id: "list", title: "Blog Posts", endpoint: "blogs", type: "collection", fields: [{ key: "image", type: "image", label: "Cover" }, "title", "date", "author", { key: "content", type: "textarea", label: "Content" }, "slug"] }] },
      { id: "submissions", title: "Admissions & Leads", sections: [{ id: "leads", title: "Ayurveda Enquiries", endpoint: "leads", type: "collection", fields: [] }] }
    ]
  },
  hospital: {
    name: "Hospital",
    baseUrl: "hospital",
    pages: [
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          { id: "banner", title: "Hospital Banners", endpoint: "homepage", type: "singleton", fields: [{ key: "banners", type: "array", label: "Slides", fields: ["heading", "subheading", "image", "ctaText"] }] },
          { id: "stats", title: "Patient Care Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "description"] }] },
          { id: "about", title: "About Hospital", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutHospital", type: "object", label: "Intro", fields: ["title", "content", "image"] }] },
          { id: "gallery", title: "Hospital Gallery", endpoint: "homepage", type: "singleton", fields: [{ key: "gallery", type: "array", label: "Gallery Images", fields: ["image"] }] }
        ]
      },
      { id: "testimonials", title: "Patient Reviews", sections: [{ id: "reviews_list", title: "Testimonials", endpoint: "testimonials", type: "collection", fields: ["name", { key: "image", type: "image", label: "Photo" }, "designation", { key: "feedback", type: "textarea", label: "Feedback" }] }] },
      { id: "departments", title: "Clinical Departments", sections: [{ id: "dept_list", title: "Departments", endpoint: "departments", type: "collection", fields: [{ key: "name", type: "text", label: "Dept Name" }, { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Dept Image" }] }] },
      { id: "doctors", title: "Medical Staff", sections: [{ id: "doctor_list", title: "Doctors", endpoint: "doctors", type: "collection", fields: [{ key: "name", type: "text", label: "Doctor Name" }, { key: "designation", type: "text", label: "Designation" }, { key: "qualification", type: "text", label: "Qualification" }, { key: "image", type: "image", label: "Photo" }] }] },
      { id: "services", title: "Patient Services", sections: [{ id: "service_info", title: "Care Services", endpoint: "services", type: "singleton", fields: [{ key: "title", type: "text", label: "Title" }, { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Service Image" }] }] },
      { id: "submissions", title: "Appointments & Leads", sections: [{ id: "leads", title: "Hospital Enquiries", endpoint: "leads", type: "collection", fields: [] }] }
    ]
  },
  legal: {
    name: "Legal",
    baseUrl: "legal",
    pages: [
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          { id: "banner", title: "Hero Banners", endpoint: "homepage", type: "singleton", fields: [{ key: "banners", type: "array", label: "Slides", fields: ["heading", "subheading", "image", "ctaText"] }] },
          { id: "stats", title: "Success Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "icon"] }] },
          { id: "about", title: "About Legal", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutSnippet", type: "object", label: "Intro", fields: ["title", "content", "image"] }] },
          { id: "gallery", title: "Campus Gallery", endpoint: "homepage", type: "singleton", fields: [{ key: "gallery", type: "array", label: "Gallery Images", fields: ["image"] }] }
        ]
      },
      { id: "testimonials", title: "Testimonials", sections: [{ id: "testimonials_list", title: "Testimonials", endpoint: "testimonials", type: "collection", fields: ["name", { key: "image", type: "image", label: "Photo" }, "designation", { key: "feedback", type: "textarea", label: "Feedback" }, "type"] }] },
      { id: "news", title: "News & Events", sections: [{ id: "news_list", title: "News", endpoint: "news", type: "collection", fields: [{ key: "image", type: "image", label: "Cover" }, "title", "date", { key: "description", type: "textarea", label: "Description" }, "link"] }] },
      { id: "programs", title: "Law Programs", sections: [{ id: "program_list", title: "Academic Courses", endpoint: "programs", type: "collection", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "overview", type: "textarea", label: "Overview" }, { key: "curriculum", type: "textarea", label: "Curriculum" }, { key: "eligibility", type: "text", label: "Eligibility" }] }] },
      { id: "faculty", title: "Legal Faculty", sections: [{ id: "faculty_list", title: "Faculty Members", endpoint: "faculty", type: "collection", fields: [{ key: "name", type: "text", label: "Name" }, { key: "designation", type: "text", label: "Designation" }, { key: "qualification", type: "text", label: "Qualification" }, { key: "image", type: "image", label: "Photo" }] }] },
      { id: "infrastructure", title: "Campus Infra", sections: [{ id: "infra_info", title: "Facilities", endpoint: "infrastructure", type: "singleton", fields: [{ key: "library", type: "object", label: "Library", fields: ["image", "content", "totalBooks"] }, { key: "mootCourt", type: "object", label: "Moot Court", fields: ["image", "description"] }] }] },
      { id: "submissions", title: "Admissions & Leads", sections: [{ id: "leads", title: "Legal Enquiries", endpoint: "leads", type: "collection", fields: [] }] }
    ]
  },
  pharmacy: {
    name: "Pharmacy",
    baseUrl: "pharmacy",
    pages: [
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          { id: "banner", title: "Hero Banners", endpoint: "homepage", type: "singleton", fields: [{ key: "banners", type: "array", label: "Slides", fields: ["heading", "subheading", "image", "ctaText"] }] },
          { id: "stats", title: "Stats & Achievements", endpoint: "homepage", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "icon"] }] },
          { id: "about", title: "About Pharmacy", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutSnippet", type: "object", label: "Intro", fields: ["title", "content", "image"] }] },
          { id: "gallery", title: "Campus Gallery", endpoint: "homepage", type: "singleton", fields: [{ key: "gallery", type: "array", label: "Gallery Images", fields: ["image"] }] }
        ]
      },
      { id: "testimonials", title: "Testimonials", sections: [{ id: "testimonials_list", title: "Testimonials", endpoint: "testimonials", type: "collection", fields: ["name", { key: "image", type: "image", label: "Photo" }, "designation", { key: "feedback", type: "textarea", label: "Feedback" }, "type"] }] },
      { id: "news", title: "News & Events", sections: [{ id: "news_list", title: "News", endpoint: "news", type: "collection", fields: [{ key: "image", type: "image", label: "Cover" }, "title", "date", { key: "description", type: "textarea", label: "Description" }, "link"] }] },
      { id: "programs", title: "B.Pharm & D.Pharm", sections: [{ id: "program_list", title: "Academic Courses", endpoint: "programs", type: "collection", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "overview", type: "textarea", label: "Overview" }, { key: "eligibility", type: "text", label: "Eligibility" }] }] },
      { id: "faculty", title: "Pharmacy Faculty", sections: [{ id: "faculty_list", title: "Faculty Members", endpoint: "faculty", type: "collection", fields: [{ key: "name", type: "text", label: "Name" }, { key: "designation", type: "text", label: "Designation" }, { key: "qualification", type: "text", label: "Qualification" }, { key: "image", type: "image", label: "Photo" }] }] },
      { id: "research", title: "Research & Development", sections: [{ id: "research_info", title: "Innovation", endpoint: "research", type: "singleton", fields: [{ key: "overview", type: "textarea", label: "Research Focus" }, { key: "projects", type: "array", label: "Ongoing Projects", fields: ["title", "description", "status"] }] }] },
      { id: "contact", title: "Contact Us", sections: [{ id: "details", title: "Contact Details", endpoint: "contact", type: "singleton", fields: [{ key: "address", type: "textarea", label: "Address" }, "phone", "email", "mapEmbed"] }] },
      { id: "submissions", title: "Admissions & Leads", sections: [{ id: "leads", title: "Pharmacy Enquiries", endpoint: "leads", type: "collection", fields: [] }] }
    ]
  }
};
