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
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          {
            id: "header_settings",
            title: "Header & Navigation",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "header", type: "object", label: "Header Configuration", fields: [
                  { key: "phone", type: "text", label: "Contact Phone" },
                  { key: "email", type: "text", label: "Contact Email" },
                  { key: "logoText", type: "text", label: "Logo Text (e.g. ISHAN)" },
                  { key: "logoSubtext", type: "text", label: "Logo Subtext" },
                  { key: "alertText", type: "text", label: "Alert Notification Text" },
                  { key: "alertLink", type: "text", label: "Alert Link URL" },
                  { key: "alertLinkText", type: "text", label: "Alert Link Text" },
                  { key: "portalLinks", type: "array", label: "Top Bar Links", fields: ["label", "href"] },
                  {
                    key: "navLinks", type: "array", label: "Main Navigation Links", fields: [
                      { key: "label", type: "text", label: "Menu Label (e.g. About Us)" },
                      { key: "href", type: "text", label: "Main Redirection Link (Optional for Dropdowns)" },
                      {
                        key: "featured", type: "object", label: "Featured Section", fields: [
                          { key: "img", type: "image", label: "Image" },
                          { key: "title", type: "text", label: "Title" },
                          { key: "desc", type: "text", label: "Description" },
                          { key: "href", type: "text", label: "Redirection Link" }
                        ]
                      },
                      {
                        key: "columns", type: "array", label: "Menu Columns", fields: [
                          { key: "heading", type: "text", label: "Column Heading" },
                          { key: "icon", type: "text", label: "Icon Name" },
                          {
                            key: "links", type: 'array', label: 'Column Links', fields: [
                              { key: "label", type: "text", label: "Link Title (e.g. Anti-Ragging)" },
                              { key: "href", type: "text", label: "Redirection Link" }
                            ]
                          }
                        ]
                      },
                      {
                        key: "extraImgs", type: "array", label: "Extra Images", fields: [
                          { key: "img", type: "image", label: "Image" },
                          { key: "caption", type: "text", label: "Caption" },
                          { key: "href", type: "text", label: "Redirection Link" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
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
      { id: "courses", title: "Courses", sections: [{ id: "courses_list", title: "Course Catalog", endpoint: "courses", type: "collection", fields: [{ key: "programName", type: "text", label: "Program Name" }, { key: "overview", type: "textarea", label: "Program Overview" }, { key: "homepageSummary", type: "textarea", label: "Summary on Homepage" }, { key: "curriculumStructure", type: "textarea", label: "Curriculum Structure" }, { key: "careerScope", type: "textarea", label: "Career Scope" }, { key: "quickFacts", type: "textarea", label: "Quick Facts" }, { key: "careerOutcome", type: "textarea", label: "Career Outcome (Homepage)" }, { key: "duration", type: "text", label: "Duration" }, { key: "annualFee", type: "text", label: "Annual Fee" }, { key: "annualIntake", type: "text", label: "Annual Intake" }, { key: "eligibility", type: "textarea", label: "Eligibility" }, { key: "slug", type: "text", label: "Slug" }] }] },
      { id: "academics", title: "Academics", sections: [{ id: "education_overview", title: "Education Overview", endpoint: "academics", type: "singleton", fields: [{ key: "educationOverview", type: "object", label: "Overview", fields: [{ key: "description", type: "textarea", label: "Description" }, { key: "highlights", type: "array", label: "Highlights", fields: ["text"] }] }] }, { id: "pedagogy_labs", title: "Pedagogy Labs", endpoint: "academics", type: "singleton", fields: [{ key: "pedagogyLabs", type: "object", label: "Labs Info", fields: [{ key: "introTitle", type: "text", label: "Intro Title" }, { key: "introDesc", type: "textarea", label: "Intro Description" }, { key: "introPoints", type: "array", label: "Intro Points", fields: ["text"] }, { key: "facilities", type: "array", label: "Facilities", fields: ["title", "description", "icon"] }, { key: "practiceTeachingDesc", type: "textarea", label: "Practice Teaching Description" }] }] }, { id: "certificate_programs", title: "Certificate Programs", endpoint: "academics", type: "singleton", fields: [{ key: "certificatePrograms", type: "object", label: "Programs Info", fields: [{ key: "introText", type: "textarea", label: "Intro Text" }, { key: "programs", type: "array", label: "Programs", fields: ["name", "duration", "fee", "eligibility", "desc"] }] }] }] },
      {
        id: "campus_life", title: "Campus Life", sections: [
          { id: "infrastructure", title: "Infrastructure", endpoint: "campuslife", type: "singleton", fields: [{ key: "infrastructure", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, { key: "content", type: "textarea", label: "Content" }, { key: "facilities", type: "array", label: "Facilities", fields: ["icon", "title", "desc", "link"] }] }] },
          { id: "it_labs", title: "IT Labs", endpoint: "campuslife", type: "singleton", fields: [{ key: "itLabs", type: "object", label: "Lab Info", fields: [{ key: "specs", type: "object", label: "Specifications", fields: ["computers", "internetSpeed", "software", "timings"] }, { key: "rules", type: "array", label: "Lab Rules", fields: ["text"] }] }] },
          { id: "library", title: "Library", endpoint: "campuslife", type: "singleton", fields: [{ key: "library", type: "object", label: "Library Assets", fields: [{ key: "image", type: "image", label: "Image" }, { key: "content", type: "textarea", label: "Content" }, { key: "specs", type: "array", label: "Specifications", fields: ["label", "value"] }] }] },
          { id: "auditorium", title: "Auditorium", endpoint: "campuslife", type: "singleton", fields: [{ key: "auditorium", type: "object", label: "Event Space", fields: [{ key: "image", type: "image", label: "Image" }, { key: "content", type: "textarea", label: "Content" }, { key: "specs", type: "array", label: "Specifications", fields: ["label", "value"] }] }] },
          { id: "sports", title: "Sports", endpoint: "campuslife", type: "singleton", fields: [{ key: "sports", type: "object", label: "Facilities", fields: [{ key: "content", type: "textarea", label: "Content" }, { key: "specs", type: "array", label: "Specifications", fields: ["label", "value"] }] }] },
          { id: "hostel", title: "Hostel", endpoint: "campuslife", type: "singleton", fields: [{ key: "hostel", type: "object", label: "Details", fields: [{ key: "image", type: "image", label: "Image" }, { key: "content", type: "textarea", label: "Content" }, { key: "amenities", type: "array", label: "Amenities", fields: ["text"] }, { key: "specs", type: "array", label: "Fees & Specs", fields: ["label", "value"] }] }] },
          { id: "cultural", title: "Cultural Activities", endpoint: "campuslife", type: "singleton", fields: [{ key: "culturalActivities", type: "object", label: "Highlights", fields: [{ key: "content", type: "textarea", label: "Content" }, { key: "specs", type: "array", label: "Specifications", fields: ["label", "value"] }] }] },
          { id: "faculty", title: "Faculty Directory", endpoint: "campuslife", type: "singleton", fields: [{ key: "faculty", type: "array", label: "Faculty Directory", fields: ["name", "designation", "dept", "qualification", "specialisation", { key: "image", type: "image", label: "Image" }] }] },
          { id: "visiting_faculty", title: "Visiting Faculty", endpoint: "campuslife", type: "singleton", fields: [{ key: "visitingFaculty", type: "array", label: "Visiting Faculty Directory", fields: ["name", "org", "specialisation", "dept"] }] },
          // --- Redirections for Learning & Activities ---
          { id: "redir_news", title: "News & Events", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "news", targetSection: "news_list", message: "Manage News & Events in the dedicated News section." } },
          { id: "redir_calendar", title: "Events Calendar", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "learning_activities", targetSection: "calendar_events", message: "Manage Events Calendar in Learning & Activities." } },
          { id: "redir_skill", title: "Skill Development", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "learning_activities", targetSection: "skill_development", message: "Manage Skill Development in Learning & Activities." } },
          { id: "redir_debates", title: "Debates & GD", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "learning_activities", targetSection: "debates_gd", message: "Manage Debates & GD in Learning & Activities." } },
          { id: "redir_visits", title: "Industrial Visits", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "learning_activities", targetSection: "industrial_visits", message: "Manage Industrial Visits in Learning & Activities." } },
          { id: "redir_guest", title: "Guest Lectures", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "learning_activities", targetSection: "guest_lectures", message: "Manage Guest Lectures in Learning & Activities." } },
          // --- Redirections for Gallery & Media ---
          { id: "redir_photos", title: "Photo Gallery", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "gallery", targetSection: "photos", message: "Manage Photo Gallery in the dedicated Gallery section." } },
          { id: "redir_videos", title: "Video Gallery", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "gallery", targetSection: "videos", message: "Manage Video Gallery in the dedicated Gallery section." } },
          { id: "redir_press", title: "Press Coverage", endpoint: "", type: "singleton", fields: [], redirect: { targetPage: "gallery", targetSection: "press", message: "Manage Press Coverage in the dedicated Gallery section." } }
        ]
      },
      {
        id: "learning_activities", title: "Learning & Activities", sections: [
          { id: "calendar_events", title: "Events Calendar", endpoint: "learning", type: "singleton", fields: [{ key: "eventsCalendar", type: "object", label: "Events Calendar", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "heading", type: "text", label: "Heading" }, { key: "description", type: "textarea", label: "Description" }, { key: "ctaText1", type: "text", label: "CTA Button 1" }, { key: "ctaText2", type: "text", label: "CTA Button 2" }, { key: "registerText", type: "text", label: "Register Button Text" }, { key: "events", type: "array", label: "Events", fields: ["name", "date", "venue", "category", "description"] }] }] },
          { id: "skill_development", title: "Skill Development", endpoint: "learning", type: "singleton", fields: [{ key: "skillDevelopment", type: "object", label: "Skill Dev", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "description", type: "textarea", label: "Description" }, { key: "skills", type: "array", label: "Skills List", fields: ["text"] }] }] },
          { id: "debates_gd", title: "Debates & GD", endpoint: "learning", type: "singleton", fields: [{ key: "debatesGD", type: "object", label: "Debates Info", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "heading", type: "text", label: "Heading" }, { key: "description", type: "textarea", label: "Description" }, { key: "participationLabel", type: "text", label: "Participation Label" }, { key: "participationPoints", type: "array", label: "Participation Info", fields: ["text"] }, { key: "activities", type: "array", label: "Activities", fields: ["title", "description", "icon"] }, { key: "highlightsHeading", type: "text", label: "Highlights Heading" }, { key: "pastHighlights", type: "textarea", label: "Past Highlights" }, { key: "highlightsFooter", type: "textarea", label: "Highlights Footer Text" }] }] },
          { id: "industrial_visits", title: "Industrial Visits", endpoint: "learning", type: "singleton", fields: [{ key: "industrialVisits", type: "object", label: "Visits Info", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "heading", type: "text", label: "Heading" }, { key: "description", type: "textarea", label: "Description" }, { key: "sectors", type: "array", label: "Sectors Grid", fields: ["label", "icon"] }, { key: "whyVisitsMatterHeading", type: "text", label: "Why Visits Matter Heading" }, { key: "whyVisitsMatter", type: "array", label: "Why Visits Matter", fields: ["text"] }, { key: "recentVisitsHeading", type: "text", label: "Recent Visits Heading" }, { key: "visits", type: "array", label: "Visits", fields: ["company", "sector", "program", "year", "outcome"] }] }] },
          { id: "guest_lectures", title: "Guest Lectures", endpoint: "learning", type: "singleton", fields: [{ key: "guestLectures", type: "object", label: "Lectures Info", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "heading", type: "text", label: "Heading" }, { key: "description", type: "textarea", label: "Description" }, { key: "whatToExpectTitle", type: "text", label: "What To Expect Title" }, { key: "whatToExpectDesc", type: "textarea", label: "What To Expect Description" }, { key: "nationalSeminarsHeading", type: "text", label: "Seminars Heading" }, { key: "nationalSeminars", type: "textarea", label: "Seminars Text" }, { key: "events", type: "array", label: "Lecture Events", fields: ["speaker", "designation", "topic", "date", "takeaways"] }] }] }
        ]
      },
      {
        id: "student_zone", title: "Student Zone", sections: [
          { id: "downloads", title: "Downloads", endpoint: "studentzone", type: "singleton", fields: [{ key: "downloads", type: "object", label: "Downloads Config", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "files", type: "array", label: "Files", fields: ["name", "fileType", "category", "size", "link"] }] }] },
          { id: "past_papers", title: "Past Exam Papers", endpoint: "studentzone", type: "singleton", fields: [{ key: "pastPapers", type: "object", label: "Past Papers Config", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "subheading", type: "text", label: "Subheading" }, { key: "heading", type: "text", label: "Heading" }, { key: "description", type: "textarea", label: "Description" }, { key: "footerText", type: "text", label: "Footer Text" }, { key: "papers", type: "array", label: "Papers", fields: ["program", "year", "name", "size", "link", "semester"] }] }] },
          { id: "code_of_conduct", title: "Code of Conduct", endpoint: "studentzone", type: "singleton", fields: [{ key: "codeOfConduct", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] },
          { id: "anti_ragging", title: "Anti-Ragging", endpoint: "studentzone", type: "singleton", fields: [{ key: "antiRagging", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "helplinePhone", type: "text", label: "Helpline Phone" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] },
          { id: "grievance_redressal", title: "Grievance Redressal", endpoint: "studentzone", type: "singleton", fields: [{ key: "grievanceRedressal", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] },
          { id: "privacy_policy", title: "Privacy Policy", endpoint: "studentzone", type: "singleton", fields: [{ key: "privacyPolicy", type: "object", label: "Content", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "content", type: "textarea", label: "Rich Text Content" }] }] }
        ]
      },
      { id: "admissions", title: "Admissions", sections: [{ id: "enquiry_page", title: "Enquiry Page", endpoint: "admissions", type: "singleton", fields: [{ key: "enquiryPage", type: "object", label: "Enquiry Content", fields: [{ key: "introText", type: "textarea", label: "Intro Text" }, { key: "counsellingPoints", type: "array", label: "Counselling Points", fields: ["text"] }, { key: "onlinePortalText", type: "textarea", label: "Online Portal Text" }] }] }, { id: "how_to_apply", title: "How to Apply", endpoint: "admissions", type: "singleton", fields: [{ key: "howToApply", type: "object", label: "Process", fields: [{ key: "highlight", type: "text", label: "Highlight Message" }, { key: "admissionProcess", type: "array", label: "Steps", fields: ["step", "desc"] }, { key: "documentChecklist", type: "array", label: "Required Documents", fields: ["text"] }, { key: "helpContact", type: "text", label: "Help Info" }] }] }, { id: "scholarships", title: "Scholarships", endpoint: "admissions", type: "singleton", fields: [{ key: "scholarships", type: "array", label: "List", fields: ["category", "description"] }] }, { id: "faqs", title: "FAQs", endpoint: "admissions", type: "singleton", fields: [{ key: "faqs", type: "array", label: "List", fields: ["question", "answer"] }] }] },
      { id: "placements", title: "Placements", sections: [{ id: "placement_headings", title: "Page Headings", endpoint: "placements", type: "singleton", fields: [{ key: "heading", type: "text", label: "Section Heading" }, { key: "subheading", type: "text", label: "Section Subheading" }, { key: "partnersHeading", type: "text", label: "Partners Subheading" }] }, { id: "numbers", title: "Placement Stats", endpoint: "placements", type: "singleton", fields: [{ key: "stats", type: "array", label: "Stats", fields: ["label", "value", "description"] }] }, { id: "process", title: "Placement Process", endpoint: "placements", type: "singleton", fields: [{ key: "process", type: "array", label: "Steps", fields: ["step", "desc"] }] }, { id: "partners", title: "Recruitment Partners", endpoint: "placements", type: "singleton", fields: [{ key: "partners", type: "array", label: "Companies", fields: ["name", { key: "logo", type: "image", label: "Logo" }] }] }, { id: "stories", title: "Success Stories", endpoint: "placements", type: "singleton", fields: [{ key: "studentSuccess", type: "array", label: "Alumni Feed", fields: ["name", "company", "feedback", "photo"] }] }, { id: "e_cell", title: "E-Cell & Internships", endpoint: "placements", type: "singleton", fields: [{ key: "eCell", type: "object", label: "E-Cell Content", fields: [{ key: "aboutTitle", type: "text", label: "About E-Cell Title" }, { key: "aboutDescription", type: "textarea", label: "About E-Cell Description" }, { key: "offerings", type: "array", label: "E-Cell Offerings", fields: ["title", "description", "icon"] }, { key: "internshipTitle", type: "text", label: "Internship Section Title" }, { key: "internshipDescription", type: "textarea", label: "Internship Description" }, { key: "internshipPoints", type: "array", label: "Internship Highlights", fields: ["text"] }, { key: "internshipCtaText", type: "text", label: "CTA Button Text" }, { key: "internshipCtaLink", type: "text", label: "CTA Button Link" }, { key: "alumniSpotlightTitle", type: "text", label: "Alumni Spotlight Title" }, { key: "alumniSpotlightDescription", type: "textarea", label: "Alumni Spotlight Description" }] }] }] },
      { id: "gallery", title: "Gallery", sections: [{ id: "photos", title: "Photos", endpoint: "gallery", type: "singleton", fields: [{ key: "photos", type: "array", label: "Image List", fields: ["title", { key: "url", type: "image", label: "Image" }] }] }, { id: "videos", title: "Videos", endpoint: "gallery", type: "singleton", fields: [{ key: "videos", type: "array", label: "Video Links", fields: ["title", { key: "url", type: "image", label: "Image" }] }] }, { id: "press", title: "Press Coverage", endpoint: "gallery", type: "singleton", fields: [{ key: "pressCoverage", type: "array", label: "Clippings", fields: ["title", { key: "url", type: "image", label: "Image" }, "date"] }] }] },
      {
        id: "contact", title: "Contact Us", sections: [
          { id: "main_contact", title: "Main Contact", endpoint: "contact", type: "singleton", fields: [{ key: "mainContact", type: "object", label: "Main Contact", fields: ["address", "phone", "email", "mapEmbed"] }] },
          { id: "college_contacts", title: "College Contacts", endpoint: "contact", type: "singleton", fields: [{ key: "collegeContacts", type: "array", label: "College Contacts", fields: ["collegeName", "phone", "email", "address"] }] },
          { id: "feedback", title: "Feedback", endpoint: "contact", type: "singleton", fields: [{ key: "feedback", type: "object", label: "Feedback Form Config", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "description", type: "textarea", label: "Description" }] }] },
          { id: "careers", title: "Careers", endpoint: "contact", type: "singleton", fields: [{ key: "careers", type: "object", label: "Careers Config", fields: [{ key: "pageTitle", type: "text", label: "Page Title" }, { key: "pageSubtitle", type: "textarea", label: "Page Subtitle" }, { key: "description", type: "textarea", label: "Description" }, { key: "email", type: "text", label: "HR Email" }, { key: "jobs", type: "array", label: "Open Positions", fields: ["title", "qualification", "dept", "type"] }] }] }
        ]
      },
      { id: "student_portal", title: "Student Portal", sections: [{ id: "portal_info", title: "Portal Info", endpoint: "studentportal", type: "singleton", fields: [{ key: "title", type: "text", label: "Title" }, { key: "description", type: "textarea", label: "Description" }, { key: "cta", type: "text", label: "CTA Text" }, { key: "link", type: "text", label: "URL" }] }] },
      { id: "news", title: "News and Events", sections: [{ id: "news_list", title: "News Listing", endpoint: "newsevents", type: "collection", fields: [{ key: "image", type: "image", label: "Cover Image" }, { key: "title", type: "text", label: "Heading" }, { key: "date", type: "date", label: "Date" }, { key: "description", type: "textarea", label: "Description" }] }] },
      { id: "fee_payment", title: "Fee Payment Portal", sections: [{ id: "payment_info", title: "Payment Info", endpoint: "feepayment", type: "singleton", fields: [{ key: "title", type: "text", label: "Title" }, { key: "description", type: "textarea", label: "Description" }, { key: "cta", type: "text", label: "CTA Text" }, { key: "link", type: "text", label: "URL" }] }] },
      { id: "applicant_submissions", title: "Applicant Submissions", sections: [{ id: "leads", title: "Leads", endpoint: "leads", type: "collection", fields: [] }, { id: "job_apps", title: "Job Applications", endpoint: "job-applications", type: "collection", fields: [] }] }
    ]
  },
  hospital: {
    name: "Hospital",
    baseUrl: "hospital",
    pages: [
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          {
            id: "banner",
            title: "Hospital Banners & Settings",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "opdHours", type: "text", label: "OPD Hours (e.g. Mon�Sat, 9 AM � 4 PM)" },
              { key: "experienceText", type: "text", label: "Experience (e.g. 30+ Years of Trust)" },
              { key: "contactPhone", type: "text", label: "Contact Phone" },
              { key: "contactEmail", type: "text", label: "Contact Email" },
              { key: "contactAddress", type: "textarea", label: "Contact Address" },
              { key: "footerDescription", type: "textarea", label: "Footer Description" },
              { key: "facebookUrl", type: "text", label: "Facebook Page URL" },
              { key: "instagramUrl", type: "text", label: "Instagram Page URL" },
              { key: "youtubeUrl", type: "text", label: "YouTube Channel URL" },
              {
                key: "banners",
                type: "array",
                label: "Slides",
                fields: ["heading", "subheading", { key: "image", type: "image", label: "Image" }, "ctaText"]
              }
            ]
          },
          {
            id: "stats",
            title: "Patient Care Stats",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "stats",
                type: "array",
                label: "Stats",
                fields: ["label", "value", "description"]
              }
            ]
          },
          {
            id: "institutionalProfile",
            title: "Institutional Profile",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "institutionalProfile",
                type: "object",
                label: "Institutional Profile",
                fields: ["heading", "subheading", { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }, "ctaText", "ctaLink"]
              }
            ]
          },
          {
            id: "whyChooseUs",
            title: "Why Choose Us",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "whyChooseUsSub", type: "text", label: "Section Tagline (e.g. WHY CHOOSE US)" },
              { key: "whyChooseUsHeading", type: "text", label: "Section Heading (e.g. Excellence in Ayurvedic Care)" },
              {
                key: "whyChooseUs",
                type: "array",
                label: "Value Points",
                fields: ["heading", { key: "description", type: "textarea", label: "Description" }, "icon"]
              }
            ]
          },
          {
            id: "panchkarmaHighlight",
            title: "Panchkarma Highlight",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "panchkarmaHeading", type: "text", label: "Section Heading" },
              { key: "panchkarmaDescription", type: "textarea", label: "Section Description" },
              { key: "panchkarmaImage", type: "image", label: "Feature Image" },
              {
                key: "panchkarmaBenefits",
                type: "array",
                label: "Benefits List",
                fields: ["text"]
              }
            ]
          },
          {
            id: "gallery",
            title: "Hospital Gallery",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "gallery",
                type: "array",
                label: "Gallery Images",
                fields: [{ key: "image", type: "image", label: "Image" }]
              }
            ]
          },
          {
            id: "accreditations",
            title: "Accreditations",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "accreditationsSubheading", type: "text", label: "Section Subheading (e.g. Trust & Quality)" },
              { key: "accreditationsHeading", type: "text", label: "Section Heading (e.g. Accreditations & Approvals)" },
              {
                key: "accreditations",
                type: "array",
                label: "Accreditations",
                fields: ["text"]
              }
            ]
          }
        ]
      },
      {
        id: "about_us",
        title: "About Us",
        sections: [
          {
            id: "content",
            title: "About Content",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "title", type: "text", label: "Page Title" },
              { key: "subtitle", type: "textarea", label: "Page Subheading" },
              {
                key: "ourStory",
                type: "object",
                label: "Our Story",
                fields: [
                  { key: "image", type: "image", label: "Cover Image" },
                  { key: "description", type: "textarea", label: "Description" }
                ]
              },
              {
                key: "missionVision",
                type: "object",
                label: "Mission & Vision",
                fields: [
                  { key: "vision", type: "textarea", label: "Vision Statement" },
                  { key: "mission", type: "textarea", label: "Mission Statement" },
                  {
                    key: "values",
                    type: "array",
                    label: "Core Values",
                    fields: ["text"]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "testimonials",
        title: "Patient Reviews",
        sections: [
          {
            id: "reviews_list",
            title: "Testimonials",
            endpoint: "testimonials",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Name" },
              { key: "image", type: "image", label: "Photo" },
              { key: "designation", type: "text", label: "Designation/Role" },
              { key: "feedback", type: "textarea", label: "Feedback/Quote" },
              { key: "type", type: "text", label: "Type (e.g. Ayurveda)" },
              { key: "rating", type: "number", label: "Rating (1-5)" }
            ]
          }
        ]
      },
      {
        id: "departments",
        title: "Clinical Departments",
        sections: [
          {
            id: "header",
            title: "Page Header",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "departmentsHeading", type: "text", label: "Section Heading (e.g. 9 OPD Departments)" },
              { key: "departmentsSubheading", type: "textarea", label: "Section Subheading" }
            ]
          },
          {
            id: "dept_list",
            title: "Departments List",
            endpoint: "departments",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Dept Name" },
              { key: "subtitle", type: "text", label: "Subtitle" },
              { key: "slug", type: "text", label: "Slug (e.g. kayachikitsa)" },
              { key: "path", type: "text", label: "Route Path" },
              { key: "category", type: "text", label: "Category (e.g. Medicine)" },
              { key: "color", type: "text", label: "Color Gradient (Tailwind/CSS classes)" },
              { key: "icon", type: "text", label: "Icon Name (e.g. Leaf, Heart, Scissors, Baby)" },
              { key: "description", type: "textarea", label: "Description" },
              { key: "image", type: "image", label: "Dept Image" },
              { key: "treatments", type: "array", label: "Treatments", fields: ["text"] }
            ]
          }
        ]
      },
      {
        id: "doctors",
        title: "Medical Staff",
        sections: [
          {
            id: "header",
            title: "Page Header",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "doctorsSubheading", type: "text", label: "Page Subheading (e.g. Expert Care)" },
              { key: "doctorsHeading", type: "text", label: "Page Heading (e.g. Meet Our Ayurvedic Doctors)" },
              { key: "doctorsDescription", type: "textarea", label: "Page Description" }
            ]
          },
          {
            id: "doctor_list",
            title: "Doctors List",
            endpoint: "doctors",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Doctor Name" },
              { key: "designation", type: "text", label: "Designation" },
              { key: "department", type: "text", label: "Department" },
              { key: "qualification", type: "text", label: "Qualification" },
              { key: "experience", type: "text", label: "Experience" },
              { key: "image", type: "image", label: "Photo" },
              { key: "opdTimings", type: "text", label: "OPD Timings" },
              { key: "specialization", type: "array", label: "Specializations", fields: ["text"] },
              { key: "category", type: "text", label: "Category (e.g. Medicine/Therapy/Surgery)" },
              { key: "days", type: "text", label: "OPD Days" }
            ]
          }
        ]
      },
      {
        id: "services",
        title: "Patient Services",
        sections: [
          {
            id: "service_info",
            title: "Care Services",
            endpoint: "services",
            type: "singleton",
            fields: [
              { key: "title", type: "text", label: "Title" },
              { key: "description", type: "textarea", label: "Description" },
              {
                key: "servicesList",
                type: "array",
                label: "Services List",
                fields: [
                  { key: "name", type: "text", label: "Service Name" },
                  { key: "desc", type: "textarea", label: "Description" },
                  { key: "icon", type: "text", label: "Icon Name (e.g. Calendar, Stethoscope, BookOpen, HelpCircle, FileText, User)" },
                  { key: "path", type: "text", label: "Route Path" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "panchkarma",
        title: "Panchkarma",
        sections: [
          {
            id: "header",
            title: "Page Header",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "panchkarmaPageTitle", type: "text", label: "Page Heading (e.g. Panchkarma Therapies)" },
              { key: "panchkarmaPageSub", type: "textarea", label: "Page Subheading" }
            ]
          },
          {
            id: "about_section",
            title: "What is Panchkarma?",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "whatIsPanchkarmaTitle", type: "text", label: "Section Title" },
              { key: "whatIsPanchkarmaDesc1", type: "textarea", label: "Description Paragraph 1" },
              { key: "whatIsPanchkarmaDesc2", type: "textarea", label: "Description Paragraph 2" }
            ]
          },
          {
            id: "panchkarma_list",
            title: "Panchkarma Therapies List",
            endpoint: "panchkarma",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Therapy Name" },
              { key: "slug", type: "text", label: "Slug (e.g. vamana)" },
              { key: "description", type: "textarea", label: "Description" },
              { key: "image", type: "image", label: "Cover Image" },
              { key: "conditions", type: "array", label: "Conditions Treated", fields: ["text"] },
              { key: "procedure", type: "textarea", label: "Procedure" },
              { key: "duration", type: "text", label: "Duration" },
              { key: "eligibility", type: "textarea", label: "Eligibility" }
            ]
          }
        ]
      },
      {
        id: "submissions",
        title: "Appointments & Leads",
        sections: [
          {
            id: "leads",
            title: "Hospital Enquiries",
            endpoint: "leads",
            type: "collection",
            fields: []
          }
        ]
      },
      {
        id: "header_footer",
        title: "Header & Footer",
        sections: [
          {
            id: "header_settings",
            title: "Header Settings",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "opdHours", type: "text", label: "OPD Hours" },
              { key: "contactPhone", type: "text", label: "Contact Phone" },
              { key: "contactEmail", type: "text", label: "Contact Email" },
              { key: "contactAddress", type: "textarea", label: "Contact Address" }
            ]
          },
          {
            id: "navbar_menu",
            title: "Navbar Menu",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "navItems",
                type: "array",
                label: "Navbar Links",
                fields: [
                  { key: "label", type: "text", label: "Link Label" },
                  { key: "path", type: "text", label: "Link Path (e.g. /doctors)" },
                  { key: "disabled", type: "boolean", label: "Disabled?" },
                  {
                    key: "children",
                    type: "array",
                    label: "Dropdown Submenu Links",
                    fields: [
                      { key: "label", type: "text", label: "Sublink Label" },
                      { key: "path", type: "text", label: "Sublink Path" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "footer_settings",
            title: "Footer Settings",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "footerDescription", type: "textarea", label: "Footer Description" },
              { key: "facebookUrl", type: "text", label: "Facebook Page URL" },
              { key: "instagramUrl", type: "text", label: "Instagram Page URL" },
              { key: "youtubeUrl", type: "text", label: "YouTube Channel URL" }
            ]
          },
          {
            id: "footer_menu",
            title: "Footer Menus",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "quickLinks",
                type: "array",
                label: "Quick Links Menu",
                fields: [
                  { key: "label", type: "text", label: "Label" },
                  { key: "path", type: "text", label: "Path" },
                  { key: "disabled", type: "boolean", label: "Disabled?" }
                ]
              },
              {
                key: "patientLinks",
                type: "array",
                label: "Patient Services Menu",
                fields: [
                  { key: "label", type: "text", label: "Label" },
                  { key: "path", type: "text", label: "Path" },
                  { key: "disabled", type: "boolean", label: "Disabled?" }
                ]
              },
              {
                key: "legalLinks",
                type: "array",
                label: "Legal Links Menu",
                fields: [
                  { key: "label", type: "text", label: "Label" },
                  { key: "path", type: "text", label: "Path" },
                  { key: "disabled", type: "boolean", label: "Disabled?" }
                ]
              }
            ]
          },
          {
            id: "footer_cta",
            title: "Footer CTA Banner",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "footerCtaHeading", type: "text", label: "Banner Heading" },
              { key: "footerCtaSubtext", type: "textarea", label: "Banner Subtext" },
              { key: "footerCtaBtnText", type: "text", label: "Banner Button Text" }
            ]
          }
        ]
      }
    ]
  },
  legal: {
    name: "Legal",
    baseUrl: "legal",
    pages: [
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
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
              {
                key: 'navLinks', type: 'array', label: 'Navigation Links', fields: [
                  { key: 'label', type: 'text', label: 'Label' },
                  { key: 'featured', type: 'object', label: 'Featured Section', fields: ['img', 'title', 'desc', 'href'] },
                  { key: 'columns', type: 'array', label: 'Menu Columns', fields: ['heading', 'icon', { key: 'links', type: 'array', label: 'Links', fields: ['label', 'href'] }] },
                  { key: 'extraImgs', type: 'array', label: 'Extra Images', fields: ['img', 'caption', 'href'] }
                ]
              },
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
          { id: 'pages_list', title: 'Static Pages', endpoint: 'pages', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'slug', type: 'text', label: 'Page URL Slug' }, { key: 'content', type: 'textarea', label: 'Page Content (HTML/Text)' }, { key: 'images', type: 'array', label: 'Gallery Images', fields: [{ key: 'image', type: 'image', label: 'Image' }] }, { key: 'seo', type: 'object', label: 'SEO Settings', fields: ['metaTitle', 'metaDescription'] }] }
        ]
      },

      {
        id: 'homepage',
        title: 'Homepage',
        sections: [
          { id: 'banner', title: 'Hero Banners', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'banners', type: 'array', label: 'Slides', fields: ['heading', 'subheading', { key: 'image', type: 'image', label: 'Image' }, 'ctaText'] }] },
          { id: 'stats', title: 'Stats & Achievements', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'stats', type: 'array', label: 'Stats', fields: ['label', 'value', { key: 'icon', type: 'image', label: 'Icon' }] }] },
          { id: 'brands', title: 'Approved Brands', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'brands', type: 'array', label: 'Brands', fields: ['name', { key: 'logo', type: 'image', label: 'Logo Image' }] }] },
          { id: 'about', title: 'About Legal', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'aboutSnippet', type: 'object', label: 'Intro', fields: ['title', 'content', { key: 'image', type: 'image', label: 'Image' }] }] },
          { id: 'why_ishan', title: 'Why Ishan Legal', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'whyIshanObj', type: 'object', label: 'Section Info', fields: ['title', { key: 'description', type: 'textarea', label: 'Description' }] }, { key: 'whyIshan', type: 'array', label: 'Features', fields: ['title', 'description', { key: 'icon', type: 'image', label: 'Icon' }] }] },
          { id: 'campus', title: 'Campus Experience', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'gallery', type: 'array', label: 'Gallery Images', fields: [{ key: 'image', type: 'image', label: 'Image' }] }] },
          { id: 'placements_home', title: 'Placements Overview', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'placements', type: 'object', label: 'Placements Info', fields: ['heading', { key: 'subheading', type: 'textarea', label: 'Subheading' }, { key: 'stats', type: 'array', label: 'Stats', fields: ['label', 'value'] }, { key: 'recruitingPartners', type: 'array', label: 'Recruiting Partners', fields: ['name', { key: 'logo', type: 'image', label: 'Logo' }] }] }] },
          { id: 'faculty_home', title: 'Faculty Section Setup', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'facultyConfig', type: 'object', label: 'Faculty Section Info', fields: ['title', { key: 'description', type: 'textarea', label: 'Description' }, 'subheading'] }] },
          { id: 'faculty_list', title: 'Faculty Members', endpoint: 'faculty', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'designation', type: 'text', label: 'Designation' }, { key: 'qualification', type: 'text', label: 'Qualification' }, { key: 'specialisation', type: 'text', label: 'Specialization' }, { key: 'dept', type: 'text', label: 'Department' }, { key: 'bio', type: 'textarea', label: 'Bio' }, { key: 'publications', type: 'text', label: 'Publications count' }, { key: 'image', type: 'image', label: 'Photo' }] },
          { id: 'testimonials_list', title: 'Testimonials', endpoint: 'testimonials', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'image', type: 'image', label: 'Photo' }, { key: 'designation', type: 'text', label: 'Designation / Batch' }, { key: 'feedback', type: 'textarea', label: 'Feedback' }, { key: 'type', type: 'text', label: 'Type (e.g. Alumni)' }] },
          { id: 'news_home', title: 'News Section Setup', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'newsConfig', type: 'object', label: 'News Section Info', fields: ['title', 'subheading'] }] },
          { id: 'news_list', title: 'News Items', endpoint: 'news', type: 'collection', fields: [{ key: 'image', type: 'image', label: 'Cover' }, 'title', 'date', 'category', { key: 'description', type: 'textarea', label: 'Description' }, 'link'] },
          { id: 'contact_home', title: 'Contact Us / CTA', endpoint: 'homepage', type: 'singleton', fields: [{ key: 'contactUs', type: 'object', label: 'CTA Info', fields: ['title', { key: 'content', type: 'textarea', label: 'Content' }, 'phone', 'address', 'workingHours'] }] }
        ]
      },
      {
        id: 'about_us',
        title: 'About Us',
        sections: [
          { id: 'aboutus', title: 'About Us Page', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'ourStory', type: 'object', label: 'Our Story', fields: ['title', { key: 'content', type: 'longtext', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }] }, { key: 'keyDifferentiators', type: 'array', label: 'Key Differentiators', fields: ['title'] }, { key: 'milestones', type: 'array', label: 'Milestones', fields: ['year', 'title', 'desc'] }] },
          { id: 'principal_message', title: "Principal's Message", endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'principalMessage', type: 'object', label: "Principal's Message", fields: ['name', 'designation', { key: 'message', type: 'longtext', label: 'Message' }, { key: 'image', type: 'image', label: 'Image' }] }] },
          { id: 'mission_vision', title: 'Mission & Vision', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'missionVision', type: 'object', label: 'Mission & Vision', fields: [{ key: 'mission', type: 'longtext', label: 'Mission' }, { key: 'vision', type: 'longtext', label: 'Vision' }, { key: 'coreValues', type: 'longtext', label: 'Core Values (newline separated)' }, { key: 'image1', type: 'image', label: 'Image 1' }, { key: 'image2', type: 'image', label: 'Image 2' }] }] },
          { id: 'approvals', title: 'Approvals & Affiliations', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'approvals', type: 'array', label: 'Approvals', fields: ['title', { key: 'description', type: 'longtext', label: 'Description' }, { key: 'logo', type: 'image', label: 'Logo' }] }] },
          { id: 'why_ishan_law', title: 'Why Choose Us', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'WhyIshanLaw', type: 'object', label: 'Why Choose Us', fields: [{ key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'reasons', type: 'array', label: 'Reasons', fields: ['title', { key: 'description', type: 'textarea', label: 'Description' }, 'icon'] }] }] },
          { id: 'best_practices', title: 'Best Practices', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'bestPractices', type: 'array', label: 'Best Practices', fields: ['title', { key: 'content', type: 'textarea', label: 'Content' }] }] },
          { id: 'green_initiatives', title: 'Green Initiatives', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'greenInitiatives', type: 'object', label: 'Green Initiatives', fields: [{ key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'initiatives', type: 'array', label: 'Initiatives', fields: ['title', 'desc', 'stat', 'icon'] }] }] },
          { id: 'faqs', title: 'FAQs', endpoint: 'faqs', type: 'collection', fields: [{ key: 'question', type: 'text', label: 'Question' }, { key: 'answer', type: 'longtext', label: 'Answer' }] },
          { id: 'mandatory_disclosure', title: 'Mandatory Disclosure', endpoint: 'mandatorydisclosure', type: 'singleton', fields: [{ key: 'statement', type: 'longtext', label: 'PCI/BCI Compliance Statement' }, { key: 'disclosureItems', type: 'array', label: 'Disclosure Items', fields: ['category', { key: 'items', type: 'longtext', label: 'Items (newline separated)' }] }] },
          { id: 'anti_ragging', title: 'Anti-Ragging', endpoint: 'mandatorydisclosure', type: 'singleton', fields: [{ key: 'antiRagging', type: 'object', label: 'Anti-Ragging Config', fields: ['helpline', { key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'committeeText', type: 'textarea', label: 'Committee Text' }, { key: 'reportMethods', type: 'array', label: 'Report Methods', fields: ['method'] }] }] },
          { id: 'grievance_redressal', title: 'Grievance Redressal', endpoint: 'mandatorydisclosure', type: 'singleton', fields: [{ key: 'grievanceRedressal', type: 'object', label: 'Grievance Redressal Config', fields: [{ key: 'content', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, 'portalLink', { key: 'process', type: 'array', label: 'Redressal Process', fields: ['step', { key: 'description', type: 'textarea', label: 'Description' }] }] }] },
          { id: 'code_of_conduct', title: 'Code of Conduct', endpoint: 'codeofconduct', type: 'singleton', fields: [{ key: 'intro', type: 'longtext', label: 'Introductory Statement' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'rules', type: 'array', label: 'Rules Categories', fields: ['category', { key: 'items', type: 'longtext', label: 'Items (newline separated)' }] }] }
        ]
      },
      {
        id: 'programs_admissions',
        title: 'Programs & Admissions',
        sections: [
          { id: 'programs_overview', title: 'Programs Overview', endpoint: 'programsoverview', type: 'singleton', fields: [{ key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'keyPoints', type: 'array', label: 'Key Points', fields: ['point'] }] },
          { id: 'programs', title: 'Academic Programs', endpoint: 'programs', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Program Name' }, { key: 'slug', type: 'text', label: 'Slug (e.g. ba-llb)' }, { key: 'duration', type: 'text', label: 'Duration' }, { key: 'annualIntake', type: 'text', label: 'Annual Intake' }, { key: 'annualFee', type: 'text', label: 'Annual Fee' }, { key: 'eligibility', type: 'text', label: 'Eligibility' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'overview', type: 'longtext', label: 'Overview' }, { key: 'curriculumStructure', type: 'longtext', label: 'Curriculum Structure' }, { key: 'careerScope', type: 'longtext', label: 'Career Scope' }] },
          { id: 'certificate_overview', title: 'Certificate Overview', endpoint: 'certificateoverview', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Introduction Content' }, { key: 'image', type: 'image', label: 'Cover Image' }] },
          { id: 'certificates', title: 'Certificate Programs', endpoint: 'certificates', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Program Name' }, { key: 'duration', type: 'text', label: 'Duration' }, { key: 'fee', type: 'text', label: 'Fee' }, { key: 'eligibility', type: 'text', label: 'Eligibility' }, { key: 'desc', type: 'longtext', label: 'Description' }] },
          { id: 'internship_externship', title: 'Internship & Externship', endpoint: 'internshipexternship', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'overview', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'opportunities', type: 'array', label: 'Opportunities', fields: ['title', { key: 'desc', type: 'longtext', label: 'Description' }] }] },
          { id: 'admissions', title: 'Admissions & Scholarships', endpoint: 'admissions', type: 'singleton', fields: [{ key: 'howToApply', type: 'array', label: 'Admission Steps', fields: [{ key: 'num', type: 'text', label: 'Step Number' }, { key: 'title', type: 'text', label: 'Title' }, { key: 'desc', type: 'textarea', label: 'Description' }] }, { key: 'documents', type: 'array', label: 'Required Documents', fields: [{ key: 'docName', type: 'text', label: 'Document Name' }] }, { key: 'alertBanner', type: 'object', label: 'Alert Banner', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'content', type: 'textarea', label: 'Content' }, { key: 'isActive', type: 'boolean', label: 'Is Active?' }] }, { key: 'admissionContact', type: 'object', label: 'Admission Contact', fields: [{ key: 'phone', type: 'text', label: 'Phone' }, { key: 'email', type: 'text', label: 'Email' }] }, { key: 'scholarships', type: 'array', label: 'Scholarships', fields: [{ key: 'category', type: 'text', label: 'Category' }, { key: 'concession', type: 'text', label: 'Concession' }, { key: 'description', type: 'textarea', label: 'Description' }] }] },
          { id: 'feepayment', title: 'Fee Payment', endpoint: 'feepayment', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'instructions', type: 'textarea', label: 'Instructions' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'link', type: 'text', label: 'Portal Link' }] }
        ]
      },
      {
        id: 'faculty_team',
        title: 'Faculty',
        sections: [
          { id: 'faculty', title: 'Faculty Directory', endpoint: 'faculty', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'designation', type: 'text', label: 'Designation' }, { key: 'qualification', type: 'text', label: 'Qualification' }, { key: 'specialisation', type: 'text', label: 'Specialization' }, { key: 'dept', type: 'text', label: 'Department' }, { key: 'bio', type: 'textarea', label: 'Bio' }, { key: 'publications', type: 'text', label: 'Publications count' }, { key: 'image', type: 'image', label: 'Photo' }] },
          { id: 'visitingfaculty', title: 'Visiting Faculty', endpoint: 'visitingfaculty', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'org', type: 'text', label: 'Organization / Designation' }, { key: 'specialisation', type: 'text', label: 'Specialization' }, { key: 'impact', type: 'textarea', label: 'Impact' }, { key: 'bar', type: 'text', label: 'Extra Info / Tag' }] }
        ]
      },
      {
        id: 'labs_campus',
        title: 'Campus & Gallery',
        sections: [
          { id: 'facilities', title: 'Facilities & Labs', endpoint: 'facilities', type: 'collection', fields: [{ key: 'slug', type: 'text', label: 'Page URL Slug' }, { key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'textarea', label: 'Page Subtitle' }, { key: 'overviewHeading', type: 'text', label: 'Overview Heading' }, { key: 'overviewContent', type: 'textarea', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'highlights', type: 'array', label: 'Highlights / Equipment', fields: ['title', 'description'] }] },
          { id: 'photos', title: 'Photo Gallery', endpoint: 'photos', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Image Title / Caption' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'url', type: 'image', label: 'Upload Image' }] },
          { id: 'videos', title: 'Video Gallery', endpoint: 'videos', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Video Title' }, { key: 'category', type: 'text', label: 'Category' }, { key: 'url', type: 'text', label: 'YouTube URL' }] },
          { id: 'press', title: 'Press Coverage', endpoint: 'press', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Headline / Title' }, { key: 'publication', type: 'text', label: 'Publication Name' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'link', type: 'text', label: 'Article Link' }, { key: 'image', type: 'image', label: 'Cover Image' }] }
        ]
      },
      {
        id: 'clinical_training',
        title: 'Clinical Training',
        sections: [
          { id: 'mootcourt', title: 'Moot Court Sessions', endpoint: 'mootcourt', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'items', type: 'array', label: 'Features', fields: ['title', { key: 'desc', type: 'longtext', label: 'Description' }, 'icon'] }] },
          { id: 'legalaidcell', title: 'Legal Aid Cell', endpoint: 'legalaidcell', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'items', type: 'array', label: 'Objectives', fields: ['title', { key: 'desc', type: 'longtext', label: 'Description' }, 'icon'] }] },
          { id: 'courtjailvisits', title: 'Court & Jail Visits', endpoint: 'industrialvisits', type: 'collection', fields: [{ key: 'company', type: 'text', label: 'Court / Jail Name' }, { key: 'location', type: 'text', label: 'Location' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'description', type: 'longtext', label: 'Description' }, { key: 'takeaways', type: 'longtext', label: 'Key Takeaways' }] },
          { id: 'skilldevelopment', title: 'Skill Development', endpoint: 'skilldevelopment', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'items', type: 'array', label: 'Activities', fields: ['title', { key: 'desc', type: 'longtext', label: 'Description' }, 'icon'] }] }
        ]
      },
      {
        id: 'events_activities',
        title: 'Events',
        sections: [
          { id: 'news', title: 'News & Events', endpoint: 'news', type: 'collection', fields: [{ key: 'image', type: 'image', label: 'Cover' }, 'title', 'date', 'category', { key: 'description', type: 'textarea', label: 'Description' }, 'link'] },
          { id: 'debatesgd', title: 'Debates & GD', endpoint: 'debatesgd', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'items', type: 'array', label: 'Activities', fields: ['title', { key: 'desc', type: 'longtext', label: 'Description' }, 'icon'] }] },
          { id: 'culturalactivities', title: 'Cultural Activities', endpoint: 'culturalactivities', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'items', type: 'array', label: 'Events', fields: ['title', { key: 'desc', type: 'longtext', label: 'Description' }, 'icon'] }] },
          { id: 'guestlecturespage', title: 'Guest Lectures Page Header', endpoint: 'guestlecturespage', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'overview', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }] },
          { id: 'guestlectures', title: 'Guest Lectures (Individual Cards)', endpoint: 'guestlectures', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Lecture Title' }, { key: 'speaker', type: 'text', label: 'Speaker Name' }, { key: 'designation', type: 'text', label: 'Designation / Organization' }, { key: 'date', type: 'text', label: 'Date' }, { key: 'image', type: 'image', label: 'Image' }, { key: 'description', type: 'longtext', label: 'Description' }, { key: 'topics', type: 'text', label: 'Topics Covered' }] }
        ]
      },
      {
        id: 'student_zone',
        title: 'Student Zone',
        sections: [
          // Academic Hub
          { id: 'downloads', title: 'Downloads', endpoint: 'downloads', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'files', type: 'array', label: 'Files', fields: ['name', 'fileType', 'category', 'size', { key: 'url', type: 'file', label: 'Upload PDF' }] }] },
          { id: 'pastpapers', title: 'Past Exam Papers', endpoint: 'pastpapers', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'files', type: 'array', label: 'Files', fields: ['name', 'fileType', 'category', 'size', { key: 'url', type: 'file', label: 'Upload PDF' }] }] },
          { id: 'codeofconduct', title: 'Code of Conduct', endpoint: 'codeofconduct', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Page Title' }, { key: 'subtitle', type: 'text', label: 'Page Subtitle' }, { key: 'content', type: 'longtext', label: 'Content' }, { key: 'image', type: 'image', label: 'Cover Image' }] },
          { id: 'studentportal', title: 'Student Portal', endpoint: 'studentportal', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'instructions', type: 'textarea', label: 'Instructions' }, { key: 'link', type: 'text', label: 'Portal Link' }, { key: 'image', type: 'image', label: 'Cover Image' }] },

          // Career & Research
          { id: 'placements', title: 'Placements', endpoint: 'placements', type: 'singleton', fields: [{ key: 'placementNumbers', type: 'array', label: 'Placement Numbers', fields: ['number', 'label'] }, { key: 'recruitingPartners', type: 'array', label: 'Recruiting Partners', fields: ['name', { key: 'logo', type: 'image', label: 'Logo' }] }, { key: 'successStories', type: 'array', label: 'Success Stories', fields: ['name', 'company', 'role', 'batch', { key: 'image', type: 'image', label: 'Image' }] }, { key: 'placementProcess', type: 'array', label: 'Placement Process', fields: ['step', 'title', 'desc'] }] },
          { id: 'researchjournal', title: 'Research Journal', endpoint: 'researchjournal', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'content', type: 'longtext', label: 'Overview Content' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'stats', type: 'array', label: 'Journal Stats', fields: ['label', 'value'] }, { key: 'guidelinesLink', type: 'text', label: 'Guidelines Link' }] },
          { id: 'publications', title: 'Publications', endpoint: 'publications', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'authors', type: 'text', label: 'Authors' }, { key: 'journal', type: 'text', label: 'Journal / Publisher' }, { key: 'year', type: 'text', label: 'Year' }, { key: 'impactFactor', type: 'text', label: 'Impact Factor' }, { key: 'link', type: 'text', label: 'Link' }] },
          { id: 'alumninetwork', title: 'Alumni Network', endpoint: 'alumninetwork', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'batch', type: 'text', label: 'Batch' }, { key: 'currentRole', type: 'text', label: 'Current Role / Company' }, { key: 'quote', type: 'textarea', label: 'Quote' }, { key: 'image', type: 'image', label: 'Photo' }] }
        ]
      },
      {
        id: 'connect',
        title: 'Connect & Reach',
        sections: [
          { id: 'research', title: 'Research Projects', endpoint: 'researchprojects', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Project Title' }, { key: 'investigator', type: 'text', label: 'Principal Investigator' }, { key: 'fundingAgency', type: 'text', label: 'Funding Agency' }, { key: 'grantAmount', type: 'text', label: 'Grant Amount' }, { key: 'status', type: 'text', label: 'Status' }, { key: 'duration', type: 'text', label: 'Duration' }] },
          { id: 'careers', title: 'Careers', endpoint: 'careers', type: 'collection', fields: [{ key: 'title', type: 'text', label: 'Job Title' }, { key: 'department', type: 'text', label: 'Department' }, { key: 'type', type: 'text', label: 'Employment Type' }, { key: 'location', type: 'text', label: 'Location' }, { key: 'description', type: 'textarea', label: 'Job Description' }, { key: 'requirements', type: 'textarea', label: 'Requirements' }, { key: 'status', type: 'text', label: 'Status' }] },
          { id: 'contact', title: 'Contact Us', endpoint: 'contact', type: 'singleton', fields: [{ key: 'address', type: 'text', label: 'Address' }, { key: 'phone', type: 'text', label: 'Phone Number' }, { key: 'email', type: 'text', label: 'Email' }, { key: 'mapEmbed', type: 'text', label: 'Map Embed URL (iframe src)' }] },
          { id: 'feedback', title: 'Feedback Submissions', endpoint: 'feedback', type: 'collection', fields: [{ key: 'name', type: 'text', label: 'Name' }, { key: 'userType', type: 'text', label: 'User Type / Role' }, { key: 'programme', type: 'text', label: 'Programme' }, { key: 'subject', type: 'text', label: 'Subject' }, { key: 'message', type: 'textarea', label: 'Message' }, { key: 'rating', type: 'number', label: 'Rating' }] },
          { id: 'leads', title: 'Admission Leads', endpoint: 'leads', type: 'collection', fields: [] }
        ]
      }
    ]
  },
  pharmacy: {
    name: "Pharmacy",
    baseUrl: "pharmacy",
    pages: [
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
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
              {
                key: 'navLinks', type: 'array', label: 'Navigation Links', fields: [
                  { key: 'label', type: 'text', label: 'Label' },
                  { key: 'featured', type: 'object', label: 'Featured Section', fields: ['img', 'title', 'desc', 'href'] },
                  { key: 'columns', type: 'array', label: 'Menu Columns', fields: ['heading', 'icon', { key: 'links', type: 'array', label: 'Links', fields: ['label', 'href'] }] },
                  { key: 'extraImgs', type: 'array', label: 'Extra Images', fields: ['img', 'caption', 'href'] }
                ]
              },
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
          { id: 'aboutus', title: 'About Us Page', endpoint: 'aboutus', type: 'singleton', fields: [{ key: 'ourStory', type: 'object', label: 'Our Story', fields: ['title', { key: 'content', type: 'longtext', label: 'Content' }, { key: 'image', type: 'image', label: 'Image' }] }, { key: 'keyDifferentiators', type: 'array', label: 'Key Differentiators', fields: ['title'] }, { key: 'milestones', type: 'array', label: 'Milestones', fields: ['year', 'title', 'desc'] }] },
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
          { id: 'admissions', title: 'Admissions & Scholarships', endpoint: 'admissions', type: 'singleton', fields: [{ key: 'howToApply', type: 'array', label: 'Admission Steps', fields: [{ key: 'num', type: 'text', label: 'Step Number' }, { key: 'title', type: 'text', label: 'Title' }, { key: 'desc', type: 'textarea', label: 'Description' }] }, { key: 'documents', type: 'array', label: 'Required Documents', fields: [{ key: 'docName', type: 'text', label: 'Document Name' }] }, { key: 'alertBanner', type: 'object', label: 'Alert Banner', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'content', type: 'textarea', label: 'Content' }, { key: 'isActive', type: 'boolean', label: 'Is Active?' }] }, { key: 'admissionContact', type: 'object', label: 'Admission Contact', fields: [{ key: 'phone', type: 'text', label: 'Phone' }, { key: 'email', type: 'text', label: 'Email' }] }, { key: 'scholarships', type: 'array', label: 'Scholarships', fields: [{ key: 'category', type: 'text', label: 'Category' }, { key: 'concession', type: 'text', label: 'Concession' }, { key: 'description', type: 'textarea', label: 'Description' }] }] },
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
          { id: 'downloads', title: 'Downloads', endpoint: 'downloads', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'files', type: 'array', label: 'Files', fields: ['name', 'fileType', 'category', 'size', { key: 'url', type: 'file', label: 'Upload PDF' }] }] },
          { id: 'pastpapers', title: 'Past Exam Papers', endpoint: 'pastpapers', type: 'singleton', fields: [{ key: 'title', type: 'text', label: 'Title' }, { key: 'subtitle', type: 'text', label: 'Subtitle' }, { key: 'overview', type: 'textarea', label: 'Overview' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'files', type: 'array', label: 'Files', fields: ['name', 'fileType', 'category', 'size', { key: 'url', type: 'file', label: 'Upload PDF' }] }] },
          { id: 'codeofconduct', title: 'Code of Conduct', endpoint: 'codeofconduct', type: 'singleton', fields: [{ key: 'intro', type: 'text', label: 'Intro Text' }, { key: 'image', type: 'image', label: 'Cover Image' }, { key: 'rules', type: 'array', label: 'Rules', fields: [{ key: 'category', type: 'text', label: 'Rule Category / Title' }, { key: 'items', type: 'textarea', label: 'Rule Content' }] }] },
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
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
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
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
      {
        id: "homepage",
        title: "Landing Content",
        sections: [
          { id: "marquee", title: "Global Marquee", endpoint: "^marquee", type: "singleton", fields: [{ key: "text", type: "text", label: "Marquee Text" }] },
          {
            id: "heroV2Content", title: "Hero Section Content", endpoint: "^hero-v2", type: "singleton", fields: [
              { key: "badgeText", type: "text", label: "Badge Text (e.g. Admissions Live � 2026-27)" },
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
  ,

  ayurveda: {
    name: "Ayurvedic Medical College",
    baseUrl: "ayurveda",
    pages: [
      { id: 'dynamic_pages', title: 'Custom Pages', sections: [] },
      {
        id: "homepage",
        title: "Homepage",
        sections: [
          {
            id: "hero",
            title: "Hero Banners",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "banners", type: "array", label: "Hero Slides", fields: [
                  { key: "image", type: "image", label: "Banner Image" },
                  { key: "heading", type: "text", label: "Heading (Line 1)" },
                  { key: "subheading", type: "text", label: "Subheading (Line 2)" },
                  { key: "ctaText", type: "text", label: "CTA Button Text" },
                  { key: "ctaLink", type: "text", label: "CTA Button Link" },
                  { key: "cta2Text", type: "text", label: "CTA2 Button Text" },
                  { key: "cta2Link", type: "text", label: "CTA2 Button Link" }
                ]
              }
            ]
          },
          {
            id: "stats",
            title: "Stats Bar",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "stats", type: "array", label: "Stats", fields: ["label", "value"] }
            ]
          },
          {
            id: "institutional_profile",
            title: "About Preview (Institutional Profile)",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "institutionalProfile", type: "object", label: "About Section", fields: [
                  "heading",
                  "subheading",
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "image", type: "image", label: "Image" },
                  "ctaText",
                  "ctaLink"
                ]
              }
            ]
          },
          {
            id: "why_iamc",
            title: "Why Choose IAMC",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              {
                key: "whySection", type: "object", label: "Why Section Headers", fields: [
                  { key: "heading", type: "text", label: "Main Heading" },
                  { key: "description", type: "textarea", label: "Main Paragraph" },
                  { key: "ctaText", type: "text", label: "CTA Text" },
                  { key: "ctaLink", type: "text", label: "CTA Link" }
                ]
              },
              {
                key: "whyChooseUs", type: "array", label: "Features", fields: [
                  { key: "heading", type: "text", label: "Feature Heading" },
                  { key: "description", type: "textarea", label: "Feature Description" },
                  { key: "icon", type: "text", label: "Icon Name (lucide)" }
                ]
              }
            ]
          },
          {
            id: "life_at_iamc",
            title: "Life at IAMC (Gallery)",
            endpoint: "homepage",
            type: "singleton",
            fields: [
              { key: "lifeAtIshan", type: "array", label: "Gallery Images", fields: [{ key: "image", type: "image", label: "Gallery Image" }] }
            ]
          },
          {
            id: "news_link",
            title: "News & Events",
            endpoint: "news",
            type: "singleton",
            fields: [],
            redirect: { targetPage: "news_events", targetSection: "news_list", message: "Manage News & Events in the dedicated News section." }
          },
          {
            id: "testimonials_link",
            title: "Student Testimonials",
            endpoint: "testimonials",
            type: "singleton",
            fields: [],
            redirect: { targetPage: "testimonials", targetSection: "testimonials_list", message: "Manage Testimonials in the dedicated Testimonials section." }
          },
          {
            id: "faqs_link",
            title: "FAQs",
            endpoint: "faqs",
            type: "singleton",
            fields: [],
            redirect: { targetPage: "faqs", targetSection: "faqs_list", message: "Manage FAQs in the dedicated FAQ section." }
          }
        ]
      },
      {
        id: "about_us",
        title: "About Us & Regulatory",
        sections: [
          {
            id: "our_story",
            title: "About IAMC",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "ourStory", type: "object", label: "Our Story", fields: [{ key: "subtitle", type: "text", label: "Small Subtitle (e.g. Our Story)" }, { key: "title", type: "text", label: "Main Heading" }, { key: "image", type: "image", label: "Image" }, { key: "description", type: "textarea", label: "Description" }] }
            ]
          },
          {
            id: "group_history",
            title: "Group History",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "groupHistory", type: "object", label: "Group History", fields: [{ key: "content", type: "textarea", label: "Content" }] }
            ]
          },
          {
            id: "chairman_message",
            title: "Chairman's Message",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "chairmanMessage", type: "object", label: "Chairman Message", fields: ["name", { key: "image", type: "image", label: "Photo" }, { key: "message", type: "textarea", label: "Message" }] }
            ]
          },
          {
            id: "principal_message",
            title: "Principal's Message",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "principalMessage", type: "object", label: "Principal Message", fields: [{ key: "name", type: "text", label: "Name" }, { key: "designation", type: "text", label: "Designation" }, { key: "experience", type: "text", label: "Experience" }, { key: "message", type: "textarea", label: "Message" }, { key: "image", type: "image", label: "Image" }] }
            ]
          },
          {
            id: "mission_vision",
            title: "Mission & Vision",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "missionVision", type: "object", label: "Mission & Vision", fields: [{ key: "vision", type: "textarea", label: "Vision" }, { key: "mission", type: "textarea", label: "Mission" }, { key: "values", type: "array", label: "Core Values (Simple Array of Strings)", fields: [{ key: "value", type: "text", label: "Value" }] }] }
            ]
          },
          {
            id: "our_journey",
            title: "Milestones / Journey",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "milestonesSection", type: "object", label: "Section Titles", fields: [{ key: "subtitle", type: "text", label: "Small Subtitle" }, { key: "title", type: "text", label: "Main Heading" }] },
              { key: "milestones", type: "array", label: "Milestones", fields: [{ key: "year", type: "text", label: "Year" }, { key: "event", type: "textarea", label: "Event" }] }
            ]
          },
          {
            id: "key_differentiators",
            title: "Key Differentiators",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "keyDifferentiatorsSection", type: "object", label: "Section Titles", fields: [{ key: "title", type: "text", label: "Main Heading" }] },
              { key: "keyDifferentiators", type: "array", label: "Key Differentiators", fields: [{ key: "title", type: "text", label: "Differentiator" }] }
            ]
          },
          {
            id: "approvals",
            title: "Approvals & Affiliations",
            endpoint: "aboutus",
            type: "singleton",
            fields: [
              { key: "approvalsSection", type: "object", label: "Section Headings", fields: [{ key: "subtitle", type: "text", label: "Subtitle" }, { key: "title", type: "text", label: "Main Heading" }, { key: "description", type: "textarea", label: "Description" }] },
              { key: "approvals", type: "array", label: "Approvals", fields: [{ key: "name", type: "text", label: "Body Name" }, { key: "image", type: "image", label: "Logo/Image" }, { key: "description", type: "textarea", label: "Description" }] }
            ]
          },
          {
            id: "mandatory_disclosure",
            title: "Mandatory Disclosure",
            endpoint: "mandatorydisclosure",
            type: "singleton",
            fields: [
              { key: "statement", type: "textarea", label: "Opening Statement" },
              { key: "disclosureItems", type: "array", label: "Disclosure Documents", fields: [{ key: "category", type: "text", label: "Category" }, { key: "items", type: "textarea", label: "Items (HTML/Text)" }] }
            ]
          },
          {
            id: "code_of_conduct",
            title: "Code of Conduct",
            endpoint: "codeofconduct",
            type: "singleton",
            fields: [
              { key: "title", type: "text", label: "Title" },
              { key: "subtitle", type: "text", label: "Subtitle" },
              { key: "content", type: "textarea", label: "Main Content" },
              { key: "intro", type: "textarea", label: "Introduction" },
              { key: "image", type: "image", label: "Header Image" },
              { key: "rules", type: "array", label: "Rules & Policies", fields: [{ key: "category", type: "text", label: "Category Name" }, { key: "items", type: "textarea", label: "Rule Details" }] }
            ]
          },
          {
            id: "faqs_list",
            title: "FAQs",
            endpoint: "faqs",
            type: "collection",
            fields: [
              { key: "question", type: "text", label: "Question" },
              { key: "answer", type: "textarea", label: "Answer" }
            ]
          }
        ]
      },
      {
        id: "academics",
        title: "BAMS Programme",
        sections: [
          {
            id: "about_bams",
            title: "About BAMS",
            endpoint: "academics",
            type: "singleton",
            fields: [
              {
                key: "bamsProgram", type: "object", label: "BAMS Program", fields: [
                  { key: "overview", type: "textarea", label: "Programme Overview" },
                  { key: "duration", type: "text", label: "Duration" },
                  { key: "intake", type: "text", label: "Intake Seats" },
                  { key: "eligibility", type: "array", label: "Eligibility Criteria", fields: [{ key: "text", type: "text", label: "Criteria" }] },
                  { key: "outcomes", type: "array", label: "Career Outcomes", fields: [{ key: "text", type: "text", label: "Outcome" }] }
                ]
              }
            ]
          },
          {
            id: "scope_of_bams",
            title: "Scope of BAMS",
            endpoint: "academics",
            type: "singleton",
            fields: [
              {
                key: "scopeOfBams", type: "object", label: "Scope of BAMS", fields: [
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "sectors", type: "array", label: "Sectors", fields: [{ key: "icon", type: "text", label: "Lucide Icon Name" }, { key: "title", type: "text", label: "Title" }, { key: "desc", type: "textarea", label: "Description" }] }
                ]
              }
            ]
          },
          {
            id: "syllabus",
            title: "Syllabus (Year Wise)",
            endpoint: "academics",
            type: "singleton",
            fields: [
              {
                key: "syllabus", type: "object", label: "Syllabus", fields: [
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "phases", type: "array", label: "Phases", fields: [{ key: "phase", type: "text", label: "Phase Title" }, { key: "years", type: "text", label: "Years" }, { key: "subjects", type: "textarea", label: "Subjects (Comma Separated)" }, { key: "pdf", type: "file", label: "Syllabus PDF" }] }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "admissions",
        title: "Admissions",
        sections: [
          {
            id: "admission_process",
            title: "Admission Process",
            endpoint: "admissions",
            type: "singleton",
            fields: [
              {
                key: "admissionProcess", type: "object", label: "Admission Process", fields: [
                  { key: "description", type: "textarea", label: "Intro Description" },
                  { key: "steps", type: "array", label: "Steps", fields: [{ key: "step", type: "text", label: "Step Number (e.g. 01)" }, { key: "title", type: "text", label: "Title" }, { key: "desc", type: "textarea", label: "Description" }] },
                  { key: "documents", type: "array", label: "Required Documents", fields: [{ key: "text", type: "text", label: "Document Name" }] },
                  { key: "helpContact", type: "text", label: "Helpline (Phone)" },
                  { key: "whatsappContact", type: "text", label: "WhatsApp Contact" }
                ]
              }
            ]
          },
          {
            id: "scholarships",
            title: "Scholarships",
            endpoint: "admissions",
            type: "singleton",
            fields: [
              {
                key: "scholarships", type: "object", label: "Scholarships", fields: [
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "schemes", type: "array", label: "Scholarship Schemes", fields: [{ key: "name", type: "text", label: "Name" }, { key: "typeStr", type: "text", label: "Type (e.g. Government)" }, { key: "eligibility", type: "textarea", label: "Eligibility" }, { key: "benefit", type: "textarea", label: "Benefit" }] },
                  { key: "howToApply", type: "array", label: "How to Apply", fields: [{ key: "text", type: "text", label: "Step" }] }
                ]
              }
            ]
          },
          {
            id: "fee_structure",
            title: "Fee Structure",
            endpoint: "admissions",
            type: "singleton",
            fields: [
              {
                key: "feeStructure", type: "object", label: "Fee Payment Details", fields: [
                  { key: "instructions", type: "textarea", label: "Instructions" },
                  { key: "link", type: "text", label: "Payment Portal Link" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "departments",
        title: "Departments",
        sections: [
          {
            id: "department_directory",
            title: "Department Directory",
            endpoint: "departments",
            type: "collection",
            fields: [
              { key: "slug", type: "text", label: "URL Slug (e.g., ayurvedic-siddhanta)" },
              { key: "name", type: "text", label: "Department Name" },
              { key: "type", type: "select", label: "Department Type", options: [{ label: "Foundational", value: "Foundational" }, { label: "Clinical", value: "Clinical" }] },
              { key: "subtitle", type: "textarea", label: "Subtitle / Short Description" },
              { key: "description", type: "textarea", label: "Main Overview" },
              { key: "image", type: "image", label: "Department Image" },
              {
                key: "highlights",
                type: "array",
                label: "Highlights / Key Areas",
                fields: [
                  { key: "icon", type: "text", label: "Lucide Icon (e.g. BookOpen)" },
                  { key: "title", type: "text", label: "Highlight Title" },
                  { key: "description", type: "textarea", label: "Description" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "hospital",
        title: "Teaching Hospital",
        sections: [
          {
            id: "hospital_overview",
            title: "Hospital Overview",
            endpoint: "hospital",
            type: "singleton",
            fields: [
              {
                key: "overview", type: "object", label: "Overview", fields: [
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "bedCount", type: "text", label: "Bed Count" },
                  { key: "opdCount", type: "text", label: "Daily OPD Count" },
                  { key: "image", type: "image", label: "Hospital Image" }
                ]
              }
            ]
          },
          {
            id: "opd_departments",
            title: "OPD Departments",
            endpoint: "hospital",
            type: "singleton",
            fields: [
              { key: "opdDepartments", type: "array", label: "OPD Departments", fields: ["name", { key: "description", type: "textarea", label: "Description" }] }
            ]
          },
          {
            id: "panchkarma",
            title: "Panchkarma Centre",
            endpoint: "hospital",
            type: "singleton",
            fields: [
              { key: "panchkarma", type: "object", label: "Panchkarma", fields: [{ key: "description", type: "textarea", label: "Description" }, { key: "therapies", type: "array", label: "Therapies Offered", fields: ["name", "description"] }, { key: "image", type: "image", label: "Image" }] }
            ]
          }
        ]
      },
      {
        id: "faculty_page",
        title: "Faculty",
        sections: [
          {
            id: "faculty_list",
            title: "Faculty Directory",
            endpoint: "faculty",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Full Name" },
              { key: "designation", type: "text", label: "Designation" },
              { key: "qualification", type: "text", label: "Qualification" },
              { key: "specialization", type: "text", label: "Specialization / Department" },
              { key: "experience", type: "text", label: "Experience (Years)" },
              { key: "image", type: "image", label: "Profile Photo" },
              { key: "bio", type: "textarea", label: "Short Biography" }
            ]
          },
          {
            id: "visiting_faculty_list",
            title: "Visiting Faculty",
            endpoint: "visiting-faculty",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Full Name" },
              { key: "org", type: "text", label: "Organization/Title" },
              { key: "specialisation", type: "text", label: "Specialisation" },
              { key: "impact", type: "textarea", label: "Impact/Description" },
              { key: "image", type: "image", label: "Profile Photo" }
            ]
          }
        ]
      },
      {
        id: "facilities",
        title: "Facilities",
        sections: [
          {
            id: "infrastructure",
            title: "Infrastructure",
            endpoint: "facilities",
            type: "singleton",
            fields: [
              { key: "infrastructure", type: "object", label: "Infrastructure", fields: [{ key: "content", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }, { key: "features", type: "array", label: "Key Facilities", fields: [{ key: "icon", type: "text", label: "Lucide Icon" }, { key: "title", type: "text", label: "Title" }, { key: "desc", type: "textarea", label: "Description" }] }] }
            ]
          },
          {
            id: "herbal_garden",
            title: "Herbal Garden",
            endpoint: "facilities",
            type: "singleton",
            fields: [
              { key: "herbalGarden", type: "object", label: "Herbal Garden", fields: [{ key: "description", type: "textarea", label: "Description" }, { key: "speciesCount", type: "text", label: "Species Count" }, { key: "image", type: "image", label: "Image" }, { key: "plants", type: "array", label: "Key Plants", fields: ["sanskrit", "latin", "part", "use"] }] }
            ]
          },
          {
            id: "hostel",
            title: "Hostel",
            endpoint: "facilities",
            type: "singleton",
            fields: [
              { key: "hostel", type: "object", label: "Hostel", fields: [{ key: "content", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }] }
            ]
          },
          {
            id: "auditorium_sports",
            title: "Auditorium & Sports",
            endpoint: "facilities",
            type: "singleton",
            fields: [
              { key: "auditorium", type: "object", label: "Auditorium", fields: [{ key: "seating", type: "text", label: "Seating Capacity" }, { key: "image", type: "image", label: "Image" }] },
              { key: "sports", type: "object", label: "Sports", fields: [{ key: "content", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }] }
            ]
          }
        ]
      },
      {
        id: "student_zone",
        title: "Student Zone",
        sections: [
          {
            id: "student_portal",
            title: "Student Portal & Fee",
            endpoint: "digital",
            type: "singleton",
            fields: [
              { key: "studentPortal", type: "object", label: "Student Portal", fields: [{ key: "title", type: "text", label: "Portal Title" }, { key: "subtitle", type: "text", label: "Subtitle" }, { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }, { key: "link", type: "text", label: "Login Link" }] },
              { key: "feePayment", type: "object", label: "Fee Payment", fields: [{ key: "title", type: "text", label: "Title" }, { key: "subtitle", type: "text", label: "Subtitle" }, { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }, { key: "instructions", type: "textarea", label: "Instructions" }, { key: "link", type: "text", label: "Payment Link" }] }
            ]
          },
          {
            id: "downloads_papers",
            title: "Downloads & Exam Papers",
            endpoint: "digital",
            type: "singleton",
            fields: [
              { key: "downloadsSection", type: "object", label: "Downloads Section", fields: [{ key: "title", type: "text", label: "Title" }, { key: "subtitle", type: "text", label: "Subtitle" }, { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }] },
              { key: "downloads", type: "array", label: "Downloads", fields: [{ key: "title", type: "text", label: "Title" }, { key: "fileUrl", type: "file", label: "File Upload" }] },
              { key: "pastPapersSection", type: "object", label: "Past Papers Section", fields: [{ key: "tag", type: "text", label: "Tag" }, { key: "title", type: "text", label: "Title" }, { key: "subtitle", type: "text", label: "Subtitle" }, { key: "description", type: "textarea", label: "Description" }, { key: "image", type: "image", label: "Image" }] },
              { key: "pastPapers", type: "array", label: "Past Exam Papers", fields: [{ key: "title", type: "text", label: "Paper Title" }, { key: "year", type: "text", label: "Year" }, { key: "fileUrl", type: "file", label: "File Upload" }] }
            ]
          }
        ]
      },
      {
        id: "research",
        title: "Research & Placements",
        sections: [
          {
            id: "research_journal",
            title: "Research Journal",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "researchJournal", type: "object", label: "Research Journal", fields: [
                  { key: "title", type: "text", label: "Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "image", type: "image", label: "Image" },
                  { key: "guidelinesLink", type: "text", label: "Guidelines Link" },
                  { key: "stats", type: "array", label: "Stats", fields: [{ key: "label", type: "text", label: "Label" }, { key: "value", type: "text", label: "Value" }] }
                ]
              }
            ]
          },
          {
            id: "publications",
            title: "Publications",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "publications", type: "object", label: "Publications", fields: [
                  { key: "title", type: "text", label: "Page Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "description", type: "textarea", label: "Intro Description" },
                  {
                    key: "items", type: "array", label: "Publications List", fields: [
                      { key: "title", type: "text", label: "Paper Title" },
                      { key: "authors", type: "text", label: "Authors" },
                      { key: "journal", type: "text", label: "Journal Name" },
                      { key: "year", type: "text", label: "Year" },
                      { key: "doi", type: "text", label: "DOI / Link" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "research_projects",
            title: "Research Projects",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "researchProjects", type: "object", label: "Research Projects", fields: [
                  { key: "title", type: "text", label: "Page Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "stats", type: "array", label: "Stats", fields: [{ key: "value", type: "text", label: "Value" }, { key: "label", type: "text", label: "Label" }] },
                  {
                    key: "items", type: "array", label: "Projects List", fields: [
                      { key: "title", type: "text", label: "Project Title" },
                      { key: "pi", type: "text", label: "Principal Investigator" },
                      { key: "department", type: "text", label: "Department" },
                      { key: "status", type: "text", label: "Status" },
                      { key: "funding", type: "text", label: "Funding Source" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "alumni_network",
            title: "Alumni Network",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "alumni", type: "object", label: "Alumni Network", fields: [
                  { key: "title", type: "text", label: "Page Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "stats", type: "array", label: "Stats", fields: [{ key: "value", type: "text", label: "Value" }, { key: "label", type: "text", label: "Label" }] },
                  {
                    key: "items", type: "array", label: "Alumni List", fields: [
                      { key: "name", type: "text", label: "Name" },
                      { key: "batch", type: "text", label: "Batch" },
                      { key: "company", type: "text", label: "Organisation" },
                      { key: "role", type: "text", label: "Role" },
                      { key: "image", type: "image", label: "Photo" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "placements",
            title: "Placements",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "placements", type: "object", label: "Placements", fields: [
                  { key: "title", type: "text", label: "Page Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "summary", type: "textarea", label: "Summary Text" },
                  { key: "placementNumbers", type: "array", label: "Stats", fields: [{ key: "number", type: "text", label: "Number" }, { key: "label", type: "text", label: "Label" }] },
                  { key: "companies", type: "array", label: "Recruiting Partners", fields: [{ key: "name", type: "text", label: "Name" }, { key: "logo", type: "image", label: "Logo" }] },
                  {
                    key: "successStories", type: "array", label: "Success Stories", fields: [
                      { key: "name", type: "text", label: "Name" },
                      { key: "company", type: "text", label: "Company" },
                      { key: "role", type: "text", label: "Role" },
                      { key: "batch", type: "text", label: "Batch" },
                      { key: "quote", type: "textarea", label: "Quote" },
                      { key: "image", type: "image", label: "Photo" }
                    ]
                  },
                  {
                    key: "placementProcess", type: "array", label: "Process Steps", fields: [
                      { key: "step", type: "text", label: "Step Number" },
                      { key: "title", type: "text", label: "Step Title" },
                      { key: "desc", type: "textarea", label: "Description" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "careers",
            title: "Careers",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "careers", type: "object", label: "Careers", fields: [
                  { key: "title", type: "text", label: "Page Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "description", type: "textarea", label: "Intro Description" },
                  { key: "image", type: "image", label: "Image" },
                  { key: "applyEmail", type: "text", label: "Apply Email" },
                  {
                    key: "openings", type: "array", label: "Current Openings", fields: [
                      { key: "title", type: "text", label: "Job Title" },
                      { key: "qualification", type: "text", label: "Qualification" },
                      { key: "experience", type: "text", label: "Experience" },
                      { key: "dept", type: "text", label: "Department" },
                      { key: "jobType", type: "text", label: "Type (Full-time/Part-time)" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "feedback",
            title: "Feedback",
            endpoint: "research",
            type: "singleton",
            fields: [
              {
                key: "feedback", type: "object", label: "Feedback Page", fields: [
                  { key: "title", type: "text", label: "Page Title" },
                  { key: "subtitle", type: "text", label: "Subtitle" },
                  { key: "description", type: "textarea", label: "Description" },
                  { key: "image", type: "image", label: "Image" },
                  { key: "programmes", type: "array", label: "Programme Options", fields: [{ key: "label", type: "text", label: "Programme Name" }] }
                ]
              }
            ]
          }
        ]
      }, {
        id: "news_events",
        title: "News, Events & Gallery",
        sections: [
          {
            id: "news_list",
            title: "News & Announcements",
            endpoint: "news",
            type: "collection",
            fields: [
              { key: "title", type: "text", label: "Title" },
              { key: "date", type: "date", label: "Date" },
              { key: "category", type: "text", label: "Category" },
              { key: "image", type: "image", label: "Cover Image" },
              { key: "description", type: "textarea", label: "Description" },
              { key: "link", type: "text", label: "Link" }
            ]
          },
          {
            id: "events_list",
            title: "Events Calendar",
            endpoint: "events",
            type: "collection",
            fields: [
              { key: "title", type: "text", label: "Event Title" },
              { key: "date", type: "date", label: "Event Date" },
              { key: "location", type: "text", label: "Location" },
              { key: "image", type: "image", label: "Event Image" },
              { key: "description", type: "textarea", label: "Description" }
            ]
          },
          {
            id: "photo_gallery",
            title: "Photo Gallery",
            endpoint: "photo-gallery",
            type: "collection",
            fields: [
              { key: "title", type: "text", label: "Photo Title" },
              { key: "category", type: "text", label: "Category (e.g. Campus, Convocation)" },
              { key: "image", type: "image", label: "Photo" }
            ]
          },
          {
            id: "video_gallery",
            title: "Video Gallery",
            endpoint: "video-gallery",
            type: "collection",
            fields: [
              { key: "title", type: "text", label: "Video Title" },
              { key: "category", type: "text", label: "Category" },
              { key: "videoUrl", type: "text", label: "YouTube Embed URL" }
            ]
          },
          {
            id: "press_coverage",
            title: "Press Coverage",
            endpoint: "press-coverage",
            type: "collection",
            fields: [
              { key: "title", type: "text", label: "Headline" },
              { key: "date", type: "date", label: "Date" },
              { key: "source", type: "text", label: "Newspaper / Media Source" },
              { key: "link", type: "text", label: "Link to Article" },
              { key: "image", type: "image", label: "Press Clipping Image" }
            ]
          }
        ]
      },
      {
        id: "testimonials",
        title: "Testimonials",
        sections: [
          {
            id: "testimonials_list",
            title: "Student & Parent Testimonials",
            endpoint: "testimonials",
            type: "collection",
            fields: [
              { key: "name", type: "text", label: "Name" },
              { key: "designation", type: "text", label: "Designation / Batch" },
              { key: "feedback", type: "textarea", label: "Testimonial / Feedback" },
              { key: "image", type: "image", label: "Photo" },
              { key: "rating", type: "text", label: "Rating (1�5)" }
            ]
          }
        ]
      },
      {
        id: "contact",
        title: "Contact",
        sections: [
          {
            id: "contact_details",
            title: "Contact Details",
            endpoint: "contact",
            type: "singleton",
            fields: [
              {
                key: "mainContact", type: "object", label: "Main Contact Info", fields: [
                  { key: "address", type: "textarea", label: "Campus Address" },
                  { key: "phone", type: "text", label: "Phone Number (Admissions)" },
                  { key: "email", type: "text", label: "Email Address" },
                  { key: "mapEmbed", type: "text", label: "Google Maps Embed URL" }
                ]
              },
              {
                key: "socialLinks", type: "array", label: "Social Media Links", fields: [
                  { key: "platform", type: "text", label: "Platform (Facebook, Instagram, etc.)" },
                  { key: "href", type: "text", label: "URL" }
                ]
              },
              {
                key: "collegeContacts", type: "array", label: "Department Contacts", fields: [
                  { key: "collegeName", type: "text", label: "Department Name" },
                  { key: "phone", type: "text", label: "Phone" },
                  { key: "email", type: "text", label: "Email" },
                  { key: "address", type: "textarea", label: "Address" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "site_settings",
        title: "Site Settings",
        sections: [
          {
            id: "siteconfig",
            title: "Navbar & Footer Settings",
            endpoint: "siteconfig",
            type: "singleton",
            fields: [
              {
                key: "navbar",
                type: "object",
                label: "Navbar Settings",
                fields: [
                  {
                    key: "logo",
                    type: "object",
                    label: "Logo Settings",
                    fields: [
                      { key: "text", type: "text", label: "Logo Main Text" },
                      { key: "subtext", type: "text", label: "Logo Subtext" },
                      { key: "imageUrl", type: "image", label: "Logo Image" }
                    ]
                  },
                  {
                    key: "topBar",
                    type: "object",
                    label: "Top Bar Settings",
                    fields: [
                      { key: "phone", type: "text", label: "Phone Number" },
                      { key: "email", type: "text", label: "Email Address" },
                      {
                        key: "utilityLinks",
                        type: "array",
                        label: "Utility Links",
                        fields: [
                          { key: "label", type: "text", label: "Label" },
                          { key: "href", type: "text", label: "Link URL" }
                        ]
                      }
                    ]
                  },
                  {
                    key: "ctaButton",
                    type: "object",
                    label: "CTA Button",
                    fields: [
                      { key: "label", type: "text", label: "Button Label" },
                      { key: "href", type: "text", label: "Button URL" }
                    ]
                  }
                ]
              },
              {
                key: "footer",
                type: "object",
                label: "Footer Settings",
                fields: [
                  { key: "brandDescription", type: "textarea", label: "Brand Description" },
                  {
                    key: "quickLinks",
                    type: "array",
                    label: "Quick Links",
                    fields: [
                      { key: "label", type: "text", label: "Label" },
                      { key: "href", type: "text", label: "Link URL" }
                    ]
                  },
                  {
                    key: "departmentLinks",
                    type: "array",
                    label: "Department Links",
                    fields: [
                      { key: "label", type: "text", label: "Label" },
                      { key: "href", type: "text", label: "Link URL" }
                    ]
                  },
                  {
                    key: "socialLinks",
                    type: "array",
                    label: "Social Links",
                    fields: [
                      { key: "platform", type: "text", label: "Platform Name (e.g. Facebook, Instagram)" },
                      { key: "href", type: "text", label: "URL Link" }
                    ]
                  },
                  {
                    key: "contact",
                    type: "object",
                    label: "Contact Info",
                    fields: [
                      { key: "address", type: "text", label: "Address" },
                      { key: "phone", type: "text", label: "Phone" },
                      { key: "email", type: "text", label: "Email" }
                    ]
                  },
                  {
                    key: "bottomLinks",
                    type: "array",
                    label: "Footer Bottom Links",
                    fields: [
                      { key: "label", type: "text", label: "Label" },
                      { key: "href", type: "text", label: "Link URL" }
                    ]
                  },
                  { key: "copyrightText", type: "text", label: "Copyright Text" }
                ]
              }
            ]
          }
        ]
      }

    ]
  }
};

export default siteConfigs;
