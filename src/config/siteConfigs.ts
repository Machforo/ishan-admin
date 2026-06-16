export interface Field {
  key: string;
  type: 'text' | 'textarea' | 'image' | 'array' | 'object' | 'number' | 'date' | 'select' | 'boolean' | 'file' | 'longtext';
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

export const siteConfigs: Record<string, SiteConfig> = {

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
              {
                key: "banners", type: "array", label: "Banner Slides", fields: [
                  { key: "image", type: "image", label: "Banner Image" },
                  { key: "heading", type: "text", label: "Banner Heading" },
                  { key: "subheading", type: "text", label: "Banner Subheading" },
                  { key: "cta1", type: "text", label: "CTA - 1 (Primary)" },
                  { key: "cta2", type: "text", label: "CTA - 2 (Secondary)" }
                ]
              }
            ]
          },
          { id: "numbers", title: "Numbers & Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "numbers", type: "array", label: "Stats Counter", fields: ["label", "value"] }] },
          { id: "partnerships", title: "Approved & Partnerships", endpoint: "homepage", type: "singleton", fields: [{ key: "partnerships", type: "array", label: "Partners", fields: ["name", { key: "image", type: "image", label: "Image" }] }] },
          { id: "about_home", title: "About IIMT (Homepage)", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutIimt", type: "object", label: "About Section", fields: [{ key: "image", type: "image", label: "Image" }, "heading", "description"] }] },
          { id: "programs_link", title: "Programs Designed", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "courses", targetSection: "courses_list", message: "Redirects to Courses Section" } },
          { id: "stand_apart", title: "What Makes IIMT Stand Apart", endpoint: "homepage", type: "singleton", fields: [{ key: "standApart", type: "object", label: "Content", fields: [{ key: "description", type: "textarea", label: "Description" }, { key: "points", type: "array", label: "Feature Points", fields: ["text"] }, { key: "cta", type: "text", label: "CTA Text" }] }] },
          { id: "placements_link", title: "Placements Preview", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "homepage", targetSection: "partnerships", message: "Redirects to Partnerships Section" } },
          { id: "life_at_iimt", title: "Life at IIMT", endpoint: "homepage", type: "singleton", fields: [{ key: "lifeAtIimt", type: "object", label: "Gallery Preview", fields: [{ key: "heading", type: "text", label: "Heading" }, { key: "images", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }] }] },
          { id: "updates_link", title: "Latest Updates", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "news", targetSection: "news_list", message: "Redirects to News & Events Section" } },
          { id: "success_stories", title: "Success Stories", endpoint: "homepage", type: "singleton", fields: [{ key: "successStories", type: "object", label: "Stories", fields: [{ key: "students", type: "array", label: "Student Feedback", fields: ["name", "photo", "feedback"] }, { key: "parents", type: "array", label: "Parent Feedback", fields: ["name", "photo", "feedback"] }] }] },
          { id: "contact_link", title: "Get In Touch", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "contact", targetSection: "contact_details", message: "Redirects to Contact Section" } },
          {
            id: "footer", title: "Global Footer", endpoint: "homepage", type: "singleton", fields: [
              {
                key: "footer", type: "object", label: "Footer Links", fields: [
                  { key: "quickLinks", type: "array", label: "Quick Links", fields: ["label", "href"] },
                  { key: "programs", type: "array", label: "Programs", fields: ["label", "href"] },
                  { key: "socialLinks", type: "array", label: "Social Links", fields: ["platform", "href"] },
                  { key: "contact", type: "object", label: "Contact Details", fields: ["address", "phone", "email"] }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "about_us",
        title: "About Us",
        sections: [
          { id: "about_iimt", title: "About IIMT Content", endpoint: "aboutus", type: "singleton", fields: [{ key: "ourStory", type: "object", label: "Our Story", fields: [{ key: "image", type: "image", label: "Image" }, "description"] }, { key: "ourJourney", type: "array", label: "Our Journey (Milestones)", fields: ["year", "event"] }, { key: "keyDifferentiators", type: "array", label: "Key Differentiators", fields: ["title", "description"] }] },
          { id: "director_message", title: "Director's Message", endpoint: "aboutus", type: "singleton", fields: [{ key: "directorMessage", type: "object", label: "Message Details", fields: ["name", "designation", { key: "image", type: "image", label: "Image" }, "message"] }] },
          { id: "vision_mission", title: "Mission & Vision", endpoint: "aboutus", type: "singleton", fields: [{ key: "missionVision", type: "object", label: "Foundations", fields: [{ key: "vision", type: "textarea", label: "Our Vision" }, { key: "mission", type: "textarea", label: "Our Mission" }, { key: "coreValues", type: "array", label: "Core Values", fields: ["text"] }] }] },
          { id: "approvals", title: "Approvals & Affiliations", endpoint: "aboutus", type: "singleton", fields: [{ key: "approvalsAffiliations", type: "array", label: "Certifications", fields: [{ key: "name", type: "text", label: "Name" }, { key: "image", type: "image", label: "Logo/Certificate" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "description", type: "textarea", label: "Description" }] }] },
          { id: "why_iimt", title: "Why IIMT?", endpoint: "aboutus", type: "singleton", fields: [{ key: "whyIimt", type: "object", label: "Content", fields: ["content"] }] },
          { id: "best_practices", title: "Best Practices", endpoint: "aboutus", type: "singleton", fields: [{ key: "bestPractices", type: "array", label: "List", fields: ["title", "content"] }] },
          { id: "green_initiatives", title: "Green Initiatives", endpoint: "aboutus", type: "singleton", fields: [{ key: "greenInitiatives", type: "object", label: "Content", fields: ["content"] }] }
        ]
      },
      { id: "courses", title: "Courses", sections: [{ id: "courses_list", title: "Course Catalog", endpoint: "courses", type: "collection", fields: [{ key: "programName", type: "text", label: "Program Name" }, { key: "overview", type: "textarea", label: "Program Overview" }, { key: "homepageSummary", type: "textarea", label: "Summary on Homepage" }, { key: "curriculumStructure", type: "textarea", label: "Curriculum Structure" }, { key: "careerScope", type: "textarea", label: "Career Scope" }, { key: "quickFacts", type: "textarea", label: "Quick Facts" }, { key: "careerOutcome", type: "textarea", label: "Career Outcome (Homepage)" }] }] },
      { id: "campus_life", title: "Campus Life", sections: [{ id: "infrastructure", title: "Infrastructure", endpoint: "campuslife", type: "singleton", fields: [{ key: "infrastructure", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, "content"] }] }, { id: "it_labs", title: "IT Labs", endpoint: "campuslife", type: "singleton", fields: [{ key: "itLabs", type: "object", label: "Lab Info", fields: [{ key: "specs", type: "object", label: "Specifications", fields: ["computers", "internetSpeed", "software", "timings"] }, { key: "rules", type: "array", label: "Lab Rules", fields: ["text"] }] }] }, { id: "library", title: "Library", endpoint: "campuslife", type: "singleton", fields: [{ key: "library", type: "object", label: "Library Assets", fields: [{ key: "image", type: "image", label: "Image" }, "totalBooks", "digitalAccess", "eJournals", "seating"] }] }, { id: "auditorium", title: "Auditorium", endpoint: "campuslife", type: "singleton", fields: [{ key: "auditorium", type: "object", label: "Event Space", fields: [{ key: "image", type: "image", label: "Image" }, "seating", "avStatus", "events"] }] }, { id: "sports", title: "Sports", endpoint: "campuslife", type: "singleton", fields: [{ key: "sports", type: "array", label: "Facilities", fields: [{ key: "image", type: "image", label: "Image" }, "title", "link"] }] }, { id: "hostel", title: "Hostel", endpoint: "campuslife", type: "singleton", fields: [{ key: "hostel", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, "content"] }] }, { id: "cultural", title: "Cultural Activities", endpoint: "campuslife", type: "singleton", fields: [{ key: "culturalActivities", type: "object", label: "Highlights", fields: ["images", "highlights"] }] }, { id: "faculty", title: "Faculty Directory", endpoint: "campuslife", type: "singleton", fields: [{ key: "faculty", type: "array", label: "Faculty Directory", fields: ["name", "designation", "dept", "qualification", "specialisation", { key: "image", type: "image", label: "Image" }] }] }] },
      { id: "admissions", title: "Admissions", sections: [{ id: "how_to_apply", title: "How to Apply", endpoint: "admissions", type: "singleton", fields: [{ key: "howToApply", type: "object", label: "Process", fields: [{ key: "highlight", type: "text", label: "Highlight Message" }, { key: "admissionProcess", type: "array", label: "Steps", fields: ["step", "desc"] }, { key: "documentChecklist", type: "array", label: "Required Documents", fields: ["text"] }, { key: "helpContact", type: "text", label: "Help Info" }] }] }, { id: "scholarships", title: "Scholarships", endpoint: "admissions", type: "singleton", fields: [{ key: "scholarships", type: "array", label: "List", fields: ["category", "description"] }] }, { id: "faqs", title: "FAQs", endpoint: "admissions", type: "singleton", fields: [{ key: "faqs", type: "array", label: "List", fields: ["question", "answer"] }] }] },
      { id: "placements", title: "Placements", sections: [{ id: "numbers", title: "Placement Stats", endpoint: "placements", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "description"] }] }, { id: "process", title: "Placement Process", endpoint: "placements", type: "singleton", fields: [{ key: "process", type: "array", label: "Steps", fields: ["step", "desc"] }] }, { id: "partners", title: "Recruitment Partners", endpoint: "placements", type: "singleton", fields: [{ key: "partners", type: "array", label: "Companies", fields: ["name", { key: "logo", type: "image", label: "Logo" }] }] }, { id: "stories", title: "Success Stories", endpoint: "placements", type: "singleton", fields: [{ key: "studentSuccess", type: "array", label: "Alumni Feed", fields: ["name", "company", "feedback", "photo"] }] }] },
      { id: "gallery", title: "Gallery", sections: [{ id: "photos", title: "Photos", endpoint: "gallery", type: "singleton", fields: [{ key: "photos", type: "array", label: "Image List", fields: ["title", { key: "url", type: "image", label: "Image" }] }] }, { id: "videos", title: "Videos", endpoint: "gallery", type: "singleton", fields: [{ key: "videos", type: "array", label: "Video Links", fields: ["title", { key: "url", type: "image", label: "Image" }] }] }, { id: "press", title: "Press Coverage", endpoint: "gallery", type: "singleton", fields: [{ key: "pressCoverage", type: "array", label: "Clippings", fields: ["title", { key: "url", type: "image", label: "Image" }, "date"] }] }] },
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
          { id: "profile", title: "Institutional Profile", endpoint: "homepage", type: "singleton", fields: [{ key: "institutionalProfile", type: "object", label: "Profile Content", fields: [{ key: "image", type: "image", label: "Image" }, "heading", "subheading", { key: "description", type: "textarea", label: "Description" }, "ctaText", "ctaLink"] }] },
          { id: "why_choose", title: "Why Choose Us", endpoint: "homepage", type: "singleton", fields: [{ key: "whyChooseUs", type: "array", label: "Value Points", fields: [{ key: "icon", type: "image", label: "Icon" }, "heading", "description"] }] },
          { id: "depts_link", title: "Specialised Departments", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "academics", targetSection: "depts", message: "Redirects to Academics Section" } },
          { id: "testimonials", title: "Student Testimonials", endpoint: "testimonials", type: "collection", fields: ["name", { key: "image", type: "image", label: "Photo" }, "designation", { key: "feedback", type: "textarea", label: "Feedback" }] },
          { id: "life_ishan", title: "Life at Ishan", endpoint: "homepage", type: "singleton", fields: [{ key: "lifeAtIshan", type: "array", label: "Gallery", fields: [{ key: "image", type: "image", label: "Image" }] }] },
          { id: "help_link", title: "Counselling Helpline", endpoint: "homepage", type: "singleton", fields: [], redirect: { targetPage: "contact", targetSection: "details", message: "Redirects to Contact Section" } }
        ]
      },
      {
        id: "institute",
        title: "Institute",
        sections: [
          { id: "about", title: "About IAMC", endpoint: "aboutus", type: "singleton", fields: [{ key: "ourStory", type: "object", label: "Content", fields: [{ key: "image", type: "image", label: "Image" }, "description"] }] },
          { id: "history", title: "Group History", endpoint: "aboutus", type: "singleton", fields: [{ key: "groupHistory", type: "object", label: "History", fields: [{ key: "content", type: "textarea", label: "Content" }] }] },
          { id: "chairman", title: "Chairman's Message", endpoint: "aboutus", type: "singleton", fields: [{ key: "chairmanMessage", type: "object", label: "Message", fields: ["name", { key: "image", type: "image", label: "Image" }, { key: "message", type: "textarea", label: "Message" }] }] },
          { id: "principal", title: "Principal's Message", endpoint: "aboutus", type: "singleton", fields: [{ key: "principalMessage", type: "object", label: "Message", fields: ["name", { key: "image", type: "image", label: "Image" }, { key: "message", type: "textarea", label: "Message" }] }] },
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
          { id: "faculty", title: "Faculty Directory", endpoint: "faculty", type: "collection", fields: ["name", "designation", "qualification", "experience", "specialization", { key: "image", type: "image", label: "Image" }] }
        ]
      },
      {
        id: "hospital",
        title: "The Hospital",
        sections: [
          { id: "portal", title: "Hospital Portal", endpoint: "hospital", type: "singleton", fields: [{ key: "overview", type: "object", label: "Overview", fields: [{ key: "image", type: "image", label: "Image" }, { key: "content", type: "textarea", label: "Content" }] }] },
          { id: "panchkarma", title: "Panchkarma Therapy", endpoint: "hospital", type: "singleton", fields: [{ key: "panchkarma", type: "array", label: "Treatments", fields: ["title", "description", { key: "image", type: "image", label: "Image" }] }] },
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
          { id: "placements", title: "Placements & Internships", endpoint: "research", type: "singleton", fields: [{ key: "placements", type: "object", label: "Preview", fields: [{ key: "summary", type: "textarea", label: "Summary" }, { key: "companies", type: "array", label: "Partners", fields: ["name", { key: "logo", type: "image", label: "Logo" }] }] }] },
          { id: "alumni", title: "Alumni Network", endpoint: "research", type: "singleton", fields: [{ key: "alumni", type: "array", label: "Members", fields: ["name", "batch", "testimonial", { key: "image", type: "image", label: "Image" }] }] }
        ]
      },
      {
        id: "campus",
        title: "Campus",
        sections: [
          { id: "infra", title: "Infrastructure", endpoint: "facilities", type: "singleton", fields: [{ key: "infrastructure", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, "content"] }] },
          { id: "garden", title: "Herbal Garden", endpoint: "facilities", type: "singleton", fields: [{ key: "herbalGarden", type: "object", label: "Garden Info", fields: [{ key: "image", type: "image", label: "Image" }, "description", "speciesCount"] }] },
          { id: "hostel", title: "Hostel & Housing", endpoint: "facilities", type: "singleton", fields: [{ key: "hostel", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, "content"] }] },
          { id: "sports", title: "Sports & Athletics", endpoint: "facilities", type: "singleton", fields: [{ key: "sports", type: "object", label: "Facilities", fields: [{ key: "image", type: "image", label: "Image" }, "content"] }] },
          { id: "auditorium", title: "Auditorium", endpoint: "facilities", type: "singleton", fields: [{ key: "auditorium", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, "seating"] }] }
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
          { id: "banner", title: "Hospital Banners", endpoint: "homepage", type: "singleton", fields: [{ key: "banners", type: "array", label: "Slides", fields: ["heading", "subheading", { key: "image", type: "image", label: "Image" }, "ctaText"] }] },
          { id: "stats", title: "Patient Care Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "description"] }] },
          { id: "about", title: "About Hospital", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutHospital", type: "object", label: "Intro", fields: ["title", "content", { key: "image", type: "image", label: "Image" }] }] },
          { id: "gallery", title: "Hospital Gallery", endpoint: "homepage", type: "singleton", fields: [{ key: "gallery", type: "array", label: "Gallery Images", fields: [{ key: "image", type: "image", label: "Image" }] }] }
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
          { id: "banner", title: "Hero Banners", endpoint: "homepage", type: "singleton", fields: [{ key: "banners", type: "array", label: "Slides", fields: ["heading", "subheading", { key: "image", type: "image", label: "Image" }, "ctaText"] }] },
          { id: "stats", title: "Success Stats", endpoint: "homepage", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", { key: "icon", type: "image", label: "Icon" }] }] },
          { id: "about", title: "About Legal", endpoint: "homepage", type: "singleton", fields: [{ key: "aboutSnippet", type: "object", label: "Intro", fields: ["title", "content", { key: "image", type: "image", label: "Image" }] }] },
          { id: "gallery", title: "Campus Gallery", endpoint: "homepage", type: "singleton", fields: [{ key: "gallery", type: "array", label: "Gallery Images", fields: [{ key: "image", type: "image", label: "Image" }] }] }
        ]
      },
      { id: "testimonials", title: "Testimonials", sections: [{ id: "testimonials_list", title: "Testimonials", endpoint: "testimonials", type: "collection", fields: ["name", { key: "image", type: "image", label: "Photo" }, "designation", { key: "feedback", type: "textarea", label: "Feedback" }, "type"] }] },
      { id: "news", title: "News & Events", sections: [{ id: "news_list", title: "News", endpoint: "news", type: "collection", fields: [{ key: "image", type: "image", label: "Cover" }, "title", "date", { key: "description", type: "textarea", label: "Description" }, "link"] }] },
      { id: "programs", title: "Law Programs", sections: [{ id: "program_list", title: "Academic Courses", endpoint: "programs", type: "collection", fields: [{ key: "name", type: "text", label: "Program Name" }, { key: "overview", type: "textarea", label: "Overview" }, { key: "curriculum", type: "textarea", label: "Curriculum" }, { key: "eligibility", type: "text", label: "Eligibility" }] }] },
      { id: "faculty", title: "Legal Faculty", sections: [{ id: "faculty_list", title: "Faculty Members", endpoint: "faculty", type: "collection", fields: [{ key: "name", type: "text", label: "Name" }, { key: "designation", type: "text", label: "Designation" }, { key: "qualification", type: "text", label: "Qualification" }, { key: "image", type: "image", label: "Photo" }] }] },
      { id: "infrastructure", title: "Campus Infra", sections: [{ id: "infra_info", title: "Facilities", endpoint: "infrastructure", type: "singleton", fields: [{ key: "library", type: "object", label: "Library", fields: [{ key: "image", type: "image", label: "Image" }, "content", "totalBooks"] }, { key: "mootCourt", type: "object", label: "Moot Court", fields: [{ key: "image", type: "image", label: "Image" }, "description"] }] }] },
      { id: "submissions", title: "Admissions & Leads", sections: [{ id: "leads", title: "Legal Enquiries", endpoint: "leads", type: "collection", fields: [] }] }
    ]
  },
  pharmacy: {
    name: "Pharmacy",
    baseUrl: "pharmacy",
    pages: [
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
          },
          { id: 'pages_list', title: 'Static Pages', endpoint: 'pages', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'slug', type: 'text', label: 'Page URL Slug' }, { key: 'content', type: 'textarea', label: 'Page Content (HTML/Text)' }, { key: 'images', type: 'array', label: 'Gallery Images', fields: [{ key: 'image', type: 'image', label: 'Image' }] }, { key: 'seo', type: 'object', label: 'SEO Settings', fields: ['metaTitle', 'metaDescription'] }] },
          { id: 'faqs', title: 'FAQs', endpoint: 'faqs', type: 'collection', fields: [{ key: 'question', type: 'text', label: 'Question' }, { key: 'answer', type: 'longtext', label: 'Answer' }] },
          { id: 'mandatory_disclosure', title: 'Mandatory Disclosure', endpoint: 'mandatorydisclosure', type: 'singleton', fields: [{ key: 'statement', type: 'longtext', label: 'PCI Compliance Statement' }, { key: 'disclosureItems', type: 'array', label: 'Disclosure Items', fields: ['category', { key: 'items', type: 'longtext', label: 'Items (newline separated)' }] }] },
          { id: 'code_of_conduct', title: 'Code of Conduct', endpoint: 'codeofconduct', type: 'singleton', fields: [{ key: 'intro', type: 'longtext', label: 'Introductory Statement' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'rules', type: 'array', label: 'Rules Categories', fields: ['category', { key: 'items', type: 'longtext', label: 'Items (newline separated)' }] }] }
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
          { id: 'aboutus', title: 'About Us Page', endpoint: 'aboutus', type: 'singleton', fields: [ { key: 'ourStory', type: 'object', label: 'Our Story', fields: ['title', { key: 'content', type: 'longtext', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }] }, { key: 'keyDifferentiators', type: 'array', label: 'Key Differentiators', fields: ['title'] }, { key: 'milestones', type: 'array', label: 'Milestones', fields: ['year', 'title', 'desc'] } ] },
          { id: 'principal_message', title: "Principal's Message", endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'principalMessage', type: 'object', label: "Principal's Message", fields: ['name', 'designation', { key: 'message', type: 'longtext', label: 'Message' }, { key: 'image', type: 'image', label: 'Image' }] }] },
          { id: 'mission_vision', title: 'Mission & Vision', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'missionVision', type: 'object', label: 'Mission & Vision', fields: [{ key: 'mission', type: 'longtext', label: 'Mission' }, { key: 'vision', type: 'longtext', label: 'Vision' }, { key: 'coreValues', type: 'longtext', label: 'Core Values (newline separated)' }, { key: 'image1', type: 'image', label: 'Image 1' }, { key: 'image2', type: 'image', label: 'Image 2' }] }] },
          { id: 'approvals', title: 'Approvals & Affiliations', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'approvals', type: 'array', label: 'Approvals', fields: ['title', { key: 'description', type: 'longtext', label: 'Description' }, { key: 'logo', type: 'image', label: 'Logo' }] }] }
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
    ]
  },
  landing1: {
        name: "Landing Page 1",
        baseUrl: "landing1",
        pages: [
          {
            id: "homepage",
            title: "Landing Content",
            sections: [
              { id: "marquee", title: "Global Marquee", endpoint: "^marquee", type: "singleton", fields: [{ key: "text", type: "text", label: "Marquee Text" }] },
              { id: "hero", title: "Hero Banners", endpoint: "", type: "singleton", fields: [{ key: "hero", type: "object", label: "Hero", fields: [{ key: "banners", type: "array", label: "Banners", fields: ["title", "subtitle", { key: "image", type: "image", label: "Image" }, "tag", { key: "ctaText", type: "text", label: "CTA Button Text" }, { key: "ctaLink", type: "text", label: "CTA Button Link (e.g. #contact)" }] }] }] },
              { id: "highlights", title: "Highlights", endpoint: "", type: "singleton", fields: [{ key: "highlights", type: "array", label: "Highlights", fields: ["text"] }] },
              { id: "newsFlash", title: "News Flash", endpoint: "", type: "singleton", fields: [{ key: "newsFlash", type: "array", label: "News Flash", fields: ["tag", "date", "title", "body"] }] },
              { id: "aboutContent", title: "About Content", endpoint: "", type: "singleton", fields: [{ key: "aboutContent", type: "object", label: "About Content", fields: ["title", "description"] }] },
              { id: "aboutImages", title: "About Images", endpoint: "", type: "singleton", fields: [{ key: "aboutImages", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }] },
              { id: "programs", title: "Programs", endpoint: "", type: "singleton", fields: [{ key: "programs", type: "object", label: "Programs", fields: [{ key: "ug", type: "array", label: "UG", fields: ["name", "school"] }, { key: "pg", type: "array", label: "PG", fields: ["name", "school"] }, { key: "diploma", type: "array", label: "Diploma", fields: ["name", "school"] }, { key: "doctoral", type: "array", label: "Doctoral", fields: ["name", "school"] }] }] },
              { id: "programmeSection", title: "Programme Headers", endpoint: "^programme-head", type: "singleton", fields: [{ key: "heading", type: "text", label: "Heading" }, { key: "subheading", type: "longtext", label: "Subheading" }, { key: "searchPlaceholder", type: "text", label: "Search Bar Placeholder" }, { key: "ctaApply", type: "text", label: "Apply Now Button Text" }, { key: "ctaViewAll", type: "text", label: "View All Button Text" }] },
              { id: "collegeSection", title: "College Headers", endpoint: "^college-head", type: "singleton", fields: [{ key: "heading", type: "text", label: "Heading" }, { key: "text", type: "longtext", label: "Description Text" }] },
              { id: "colleges", title: "Colleges", endpoint: "", type: "singleton", fields: [{ key: "colleges", type: "array", label: "Colleges", fields: ["name", "short", "desc", { key: "image", type: "image", label: "Image" }, "programs", "accreditation", "ctaText", "ctaLink"] }] },
              { id: "campusLife", title: "Campus Life", endpoint: "", type: "singleton", fields: [{ key: "campusLife", type: "object", label: "Campus Life", fields: ["nationalitiesCount", { key: "sections", type: "array", label: "Sections", fields: ["title", "description", { key: "image", type: "image", label: "Image" }] }] }] },
              { id: "campusLinks", title: "Campus Links", endpoint: "", type: "singleton", fields: [{ key: "campusLinks", type: "array", label: "Campus Links", fields: ["text"] }] },
              { id: "facilityLinks", title: "Facility Links", endpoint: "", type: "singleton", fields: [{ key: "facilityLinks", type: "array", label: "Facility Links", fields: ["text"] }] },
              { id: "researchSection", title: "Research Headers", endpoint: "", type: "singleton", fields: [{ key: "researchSection", type: "object", label: "Research Headers", fields: ["heading", "subheading", "ctaText", "ctaLink"] }] },
              { id: "researchCards", title: "Research Cards", endpoint: "", type: "singleton", fields: [{ key: "researchCards", type: "array", label: "Research Cards", fields: ["tag", "title", { key: "image", type: "image", label: "Image" }] }] },
              { id: "researchLinks", title: "Research Links", endpoint: "", type: "singleton", fields: [{ key: "researchLinks", type: "array", label: "Research Links", fields: ["text"] }] },
              { id: "placementSection", title: "Placement Section Content", endpoint: "^placement-head", type: "singleton", fields: [{ key: "image", type: "image", label: "Section Image" }, { key: "badgeNum", type: "text", label: "Badge Number (e.g. 100%)" }, { key: "badgeText", type: "text", label: "Badge Label" }, { key: "heading", type: "text", label: "Section Heading" }, { key: "highlight", type: "text", label: "Highlighted Subheading" }, { key: "description", type: "longtext", label: "Description" }, { key: "ctaText", type: "text", label: "CTA Button Text" }, { key: "ctaLink", type: "text", label: "CTA Button Link" }, { key: "recruitersHeading", type: "text", label: "Recruiters Section Heading" }] },
              { id: "placementStats", title: "Placement Stats", endpoint: "", type: "singleton", fields: [{ key: "placementStats", type: "array", label: "Placement Stats", fields: ["num", "label"] }] },
              { id: "recruiters", title: "Recruiters", endpoint: "", type: "singleton", fields: [{ key: "recruiters", type: "array", label: "Recruiters", fields: ["name", { key: "icon", type: "image", label: "Icon" }] }] },
              { id: "testimonials", title: "Testimonials", endpoint: "", type: "singleton", fields: [{ key: "testimonials", type: "array", label: "Testimonials", fields: ["quote", "name", "designation", "course", "batch", { key: "image", type: "image", label: "Image" }] }] },
              { id: "achievements", title: "Achievements", endpoint: "", type: "singleton", fields: [{ key: "achievements", type: "array", label: "Achievements", fields: ["title", "desc"] }] },
              { id: "news", title: "News", endpoint: "", type: "singleton", fields: [{ key: "news", type: "array", label: "News", fields: ["date", "title", "description", { key: "image", type: "image", label: "Image" }] }] },
              { id: "socialPosts", title: "Social Posts", endpoint: "", type: "singleton", fields: [{ key: "socialPosts", type: "array", label: "Social Posts", fields: ["likes", "caption", { key: "image", type: "image", label: "Image" }] }] },
              { id: "navMenu", title: "Navigation Menu", endpoint: "", type: "singleton", fields: [{ key: "navMenu", type: "array", label: "Navigation Menu", fields: ["title", { key: "items", type: "array", label: "Items", fields: ["name"] }] }] },
              { id: "contactInfo", title: "Contact Info", endpoint: "", type: "singleton", fields: [{ key: "contactInfo", type: "object", label: "Contact Info", fields: ["location", "admissionNumber", "email", "officeHours", "instagramHandle", "instagramLink"] }] },
              { id: "floatingWidgets", title: "Floating Widgets", endpoint: "", type: "singleton", fields: [{ key: "floatingWidgets", type: "object", label: "Floating Widgets", fields: ["whatsapp", "phone", "applyLink"] }] },
              { id: "footer", title: "Footer Links", endpoint: "", type: "singleton", fields: [{ key: "footerLabels", type: "object", label: "Footer Labels", fields: ["about", "admissions", "quickLinks", "approvals", "group", "copyright", "privacy", "terms", "sitemap"] }, { key: "footerLinks", type: "object", label: "Footer Links", fields: [{ key: "quickLinks", type: "array", label: "Quick Links", fields: ["text"] }, { key: "rankings", type: "array", label: "Rankings", fields: ["text"] }, { key: "group", type: "array", label: "Group", fields: ["text"] }] }] }
            ]
          }
        ]
      },
      landing2: {
        name: "Landing Page 2",
        baseUrl: "landing2",
        pages: [
          {
            id: "homepage",
            title: "Landing Content",
            sections: [
              { id: "marquee", title: "Global Marquee", endpoint: "^marquee", type: "singleton", fields: [{ key: "text", type: "text", label: "Marquee Text" }] },
              {
                id: "heroV2Content", title: "Hero Section Content", endpoint: "^hero-v2", type: "singleton", fields: [
                  { key: "badgeText", type: "text", label: "Badge Text (e.g. Admissions Live · 2026-27)" },
                  { key: "heading", type: "text", label: "Main Heading" },
                  { key: "headingEnd", type: "text", label: "Heading Ending Line (e.g. 30 years of legacy.)" },
                  { key: "subtext", type: "longtext", label: "Subtext Paragraph" },
                  { key: "highlights", type: "array", label: "Highlight Bullet Points", fields: ["text"] },
                  { key: "ctaExploreText", type: "text", label: "Explore CTA Button Text" },
                  { key: "applicationsCount", type: "text", label: "Applications Count (e.g. 2,400+)" },
                  { key: "applicationsLabel", type: "text", label: "Applications Label (e.g. applications this week)" },
                  { key: "formTagline", type: "text", label: "Form Tagline" },
                  { key: "formHeading", type: "text", label: "Form Heading" },
                  { key: "formSubtext", type: "text", label: "Form Subtext" },
                  { key: "formCta", type: "text", label: "Form Submit Button Text" },
                  { key: "offerText", type: "text", label: "Offer Strip Text" },
                  { key: "offerSubtext", type: "text", label: "Offer Strip Sub-label" },
                  { key: "confidentialityText", type: "text", label: "Confidentiality Note" }
                ]
              },
              { id: "statsStrip", title: "Stats Strip", endpoint: "^stats-strip", type: "singleton", fields: [{ key: "items", type: "array", label: "Stats Items", fields: ["icon", { key: "num", type: "text", label: "Number" }, "suffix", "label", "sub"] }] },
              { id: "hero", title: "Hero Banners", endpoint: "", type: "singleton", fields: [{ key: "hero", type: "object", label: "Hero", fields: [{ key: "banners", type: "array", label: "Banners", fields: ["title", "subtitle", { key: "image", type: "image", label: "Image" }, "tag"] }] }] },
              { id: "highlights", title: "Highlights", endpoint: "", type: "singleton", fields: [{ key: "highlights", type: "array", label: "Highlights", fields: ["text"] }] },
              { id: "newsFlash", title: "News Flash", endpoint: "", type: "singleton", fields: [{ key: "newsFlash", type: "array", label: "News Flash", fields: ["tag", "date", "title", "body"] }] },
              { id: "aboutContent", title: "About Content", endpoint: "", type: "singleton", fields: [{ key: "aboutContent", type: "object", label: "About Content", fields: ["title", "description"] }] },
              { id: "aboutImages", title: "About Images", endpoint: "", type: "singleton", fields: [{ key: "aboutImages", type: "array", label: "Images", fields: [{ key: "url", type: "image", label: "Image" }] }] },
              { id: "programs", title: "Programs", endpoint: "", type: "singleton", fields: [{ key: "programs", type: "object", label: "Programs", fields: [{ key: "ug", type: "array", label: "UG", fields: ["name", "school"] }, { key: "pg", type: "array", label: "PG", fields: ["name", "school"] }, { key: "diploma", type: "array", label: "Diploma", fields: ["name", "school"] }, { key: "doctoral", type: "array", label: "Doctoral", fields: ["name", "school"] }] }] },
              { id: "programmeSection", title: "Programme Headers", endpoint: "", type: "singleton", fields: [{ key: "programmeSection", type: "object", label: "Programme Headers", fields: ["heading", "subheading"] }] },
              { id: "collegeSection", title: "College Headers", endpoint: "", type: "singleton", fields: [{ key: "collegeSection", type: "object", label: "College Headers", fields: ["heading", "subheading"] }] },
              { id: "colleges", title: "Colleges", endpoint: "", type: "singleton", fields: [{ key: "colleges", type: "array", label: "Colleges", fields: ["name", "short", "desc", { key: "image", type: "image", label: "Image" }, "programs", "accreditation", "ctaText", "ctaLink"] }] },
              { id: "campusLife", title: "Campus Life", endpoint: "", type: "singleton", fields: [{ key: "campusLife", type: "object", label: "Campus Life", fields: ["nationalitiesCount", { key: "sections", type: "array", label: "Sections", fields: ["title", "description", { key: "image", type: "image", label: "Image" }] }] }] },
              { id: "campusLinks", title: "Campus Links", endpoint: "", type: "singleton", fields: [{ key: "campusLinks", type: "array", label: "Campus Links", fields: ["text"] }] },
              { id: "facilityLinks", title: "Facility Links", endpoint: "", type: "singleton", fields: [{ key: "facilityLinks", type: "array", label: "Facility Links", fields: ["text"] }] },
              { id: "researchSection", title: "Research Headers", endpoint: "", type: "singleton", fields: [{ key: "researchSection", type: "object", label: "Research Headers", fields: ["heading", "subheading", "ctaText", "ctaLink"] }] },
              { id: "researchCards", title: "Research Cards", endpoint: "", type: "singleton", fields: [{ key: "researchCards", type: "array", label: "Research Cards", fields: ["tag", "title", { key: "image", type: "image", label: "Image" }] }] },
              { id: "researchLinks", title: "Research Links", endpoint: "", type: "singleton", fields: [{ key: "researchLinks", type: "array", label: "Research Links", fields: ["text"] }] },
              { id: "placementSection", title: "Placement Section Content", endpoint: "^placement-head-v2", type: "singleton", fields: [{ key: "image", type: "image", label: "Section Image" }, { key: "badgeNum", type: "text", label: "Badge Number (e.g. 100%)" }, { key: "badgeText", type: "text", label: "Badge Label" }, { key: "heading", type: "text", label: "Section Heading" }, { key: "highlight", type: "text", label: "Highlighted Subheading" }, { key: "description", type: "longtext", label: "Description" }, { key: "ctaText", type: "text", label: "CTA Button Text" }, { key: "ctaLink", type: "text", label: "CTA Button Link" }, { key: "recruitersHeading", type: "text", label: "Recruiters Section Heading" }] },
              { id: "placementStats", title: "Placement Stats", endpoint: "", type: "singleton", fields: [{ key: "placementStats", type: "array", label: "Placement Stats", fields: ["num", "label"] }] },
              { id: "recruiters", title: "Recruiters", endpoint: "", type: "singleton", fields: [{ key: "recruiters", type: "array", label: "Recruiters", fields: ["name"] }] },
              { id: "testimonials", title: "Testimonials", endpoint: "", type: "singleton", fields: [{ key: "testimonials", type: "array", label: "Testimonials", fields: ["quote", "name", "designation", "course", "batch", { key: "image", type: "image", label: "Image" }] }] },
              { id: "achievements", title: "Achievements", endpoint: "", type: "singleton", fields: [{ key: "achievements", type: "array", label: "Achievements", fields: ["title", "desc"] }] },
              { id: "news", title: "News", endpoint: "", type: "singleton", fields: [{ key: "news", type: "array", label: "News", fields: ["date", "title", "description", { key: "image", type: "image", label: "Image" }] }] },
              { id: "socialPosts", title: "Social Posts", endpoint: "", type: "singleton", fields: [{ key: "socialPosts", type: "array", label: "Social Posts", fields: ["likes", "caption", { key: "image", type: "image", label: "Image" }] }] },
              { id: "navMenu", title: "Navigation Menu", endpoint: "", type: "singleton", fields: [{ key: "navMenu", type: "array", label: "Navigation Menu", fields: ["title", { key: "items", type: "array", label: "Items", fields: ["name"] }] }] },
              { id: "contactInfo", title: "Contact Info", endpoint: "", type: "singleton", fields: [{ key: "contactInfo", type: "object", label: "Contact Info", fields: ["location", "admissionNumber", "email", "officeHours", "instagramHandle", "instagramLink"] }] },
              { id: "floatingWidgets", title: "Floating Widgets", endpoint: "", type: "singleton", fields: [{ key: "floatingWidgets", type: "object", label: "Floating Widgets", fields: ["whatsapp", "phone", "applyLink"] }] },
              { id: "footer", title: "Footer Links", endpoint: "", type: "singleton", fields: [{ key: "footerLabels", type: "object", label: "Footer Labels", fields: ["about", "admissions", "quickLinks", "approvals", "group", "copyright", "privacy", "terms", "sitemap"] }, { key: "footerLinks", type: "object", label: "Footer Links", fields: [{ key: "quickLinks", type: "array", label: "Quick Links", fields: ["text"] }, { key: "rankings", type: "array", label: "Rankings", fields: ["text"] }, { key: "group", type: "array", label: "Group", fields: ["text"] }] }] }
            ]
          }
        ]
      }
};

export default siteConfigs;
