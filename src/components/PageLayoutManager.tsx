import { useState, useEffect, useMemo } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Code,
  Layers,
  Sparkles,
  HelpCircle,
  Maximize2,
  Search,
  RotateCcw
} from 'lucide-react';
import { livePageUrl } from '../config/siteUrls';
import api from '../api';

interface SectionItem {
  id: string;
  name: string;
  type: 'builtin' | 'custom_html' | 'hero' | 'split' | 'cards' | 'cta' | 'faq';
  order: number;
  isHidden: boolean;
  heading?: string;
  subheading?: string;
  description?: string;
  htmlContent?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: any[];
  settings?: any;
}

const PORTAL_PAGES: Record<string, { id: string; label: string; path: string; category: string }[]> = {
  hospital: [
    { id: 'homepage', label: 'Homepage', path: '/', category: 'Overview' },
    { id: 'about_us', label: 'Institutional Profile (Why Ishan)', path: '/why-ishan', category: 'About Us' },
    { id: 'doctors', label: 'Medical Staff / Doctors', path: '/doctors', category: 'Clinical Staff' },
    { id: 'departments', label: 'Clinical Departments', path: '/departments', category: 'Departments' },
    { id: 'services', label: 'Patient Services', path: '/patient-services', category: 'Patient Care' },
    { id: 'faqs', label: 'Patient FAQs', path: '/patient-services/faqs', category: 'Patient Care' },
    { id: 'appointment', label: 'Appointment Booking', path: '/appointment', category: 'Patient Care' },
    { id: 'contact', label: 'Contact & Location', path: '/contact', category: 'Contact' }
  ],
  ayurveda: [
    { id: 'homepage', label: 'Homepage', path: '/', category: 'Overview' },
    // About Us
    { id: 'about_us', label: 'About IAMC Overview', path: '/about', category: 'About Us' },
    { id: 'principal_message', label: "Principal's Message", path: '/principal-message', category: 'About Us' },
    { id: 'mission_vision', label: 'Mission & Vision', path: '/mission-vision', category: 'About Us' },
    { id: 'approvals', label: 'Approvals & Recognition', path: '/approvals', category: 'About Us' },
    { id: 'why_choose_us', label: 'Why Choose IAMC', path: '/why-choose-us', category: 'About Us' },
    { id: 'mandatory_disclosure', label: 'Mandatory Disclosure', path: '/mandatory-disclosure', category: 'About Us' },
    { id: 'code_of_conduct', label: 'Code of Conduct', path: '/code-of-conduct', category: 'About Us' },
    { id: 'faqs', label: 'Frequently Asked Questions', path: '/faqs', category: 'About Us' },

    // Academics & BAMS
    { id: 'departments', label: '14 Departments Index', path: '/departments', category: 'Academics & BAMS' },
    { id: 'scope_of_bams', label: 'Scope of BAMS', path: '/scope-of-bams', category: 'Academics & BAMS' },
    { id: 'syllabus', label: 'Curriculum & Syllabus', path: '/syllabus', category: 'Academics & BAMS' },
    { id: 'admissions', label: 'Admissions & Scholarships', path: '/admissions', category: 'Academics & BAMS' },
    { id: 'scholarships', label: 'Scholarships & Merit', path: '/scholarships', category: 'Academics & BAMS' },
    { id: 'certificate_programs', label: 'Certificate Programs', path: '/certificate-programs', category: 'Academics & BAMS' },

    // Campus & Hospital
    { id: 'facilities', label: 'Campus Infrastructure', path: '/infrastructure', category: 'Campus & Hospital' },
    { id: 'herbal_garden', label: 'Herbal Garden & Dravyaguna Lab', path: '/herbal-garden', category: 'Campus & Hospital' },
    { id: 'hostel', label: 'Hostel Facilities', path: '/hostel', category: 'Campus & Hospital' },
    { id: 'auditorium_sports', label: 'Auditorium & Sports', path: '/auditorium-sports', category: 'Campus & Hospital' },

    // Faculty
    { id: 'faculty', label: 'Faculty & Vaidyas', path: '/faculty', category: 'Faculty' },
    { id: 'visiting_faculty', label: 'Visiting & Guest Doctors', path: '/visiting-faculty', category: 'Faculty' },

    // Media & Events
    { id: 'news_events', label: 'News & Events', path: '/news-events', category: 'Media & Gallery' },
    { id: 'events_calendar', label: 'Events Calendar', path: '/events-calendar', category: 'Media & Gallery' },
    { id: 'photo_gallery', label: 'Photo Gallery', path: '/photo-gallery', category: 'Media & Gallery' },
    { id: 'video_gallery', label: 'Video Gallery', path: '/video-gallery', category: 'Media & Gallery' },
    { id: 'press_coverage', label: 'Press & Media Coverage', path: '/press-coverage', category: 'Media & Gallery' },

    // Student Zone
    { id: 'downloads', label: 'Downloads & Forms', path: '/downloads', category: 'Student Zone' },
    { id: 'past_papers', label: 'Previous Question Papers', path: '/past-papers', category: 'Student Zone' },
    { id: 'fee_payment', label: 'Online Fee Payment', path: '/fee-payment', category: 'Student Zone' },
    { id: 'student_portal', label: 'Student Portal', path: '/student-portal', category: 'Student Zone' },

    // Research & Placements
    { id: 'placements', label: 'Placements & Career', path: '/placements', category: 'Research & Placements' },
    { id: 'research', label: 'Research & Publications', path: '/research-projects', category: 'Research & Placements' },
    { id: 'research_journal', label: 'Research Journal', path: '/research-journal', category: 'Research & Placements' },
    { id: 'publications', label: 'Research Publications', path: '/publications', category: 'Research & Placements' },
    { id: 'alumni_network', label: 'Alumni Network', path: '/alumni-network', category: 'Research & Placements' },

    // Contact
    { id: 'contact', label: 'Contact Us', path: '/contact', category: 'Contact' },
    { id: 'feedback', label: 'Feedback & Suggestions', path: '/feedback', category: 'Contact' },
    { id: 'careers', label: 'Careers at IAMC', path: '/careers', category: 'Contact' }
  ],
  iimt: [
    { id: 'homepage', label: 'Homepage', path: '/', category: 'Overview' },

    // About Us (8 pages)
    { id: 'about_us', label: 'About Us Overview', path: '/about', category: 'About Us' },
    { id: 'director_message', label: "Director's Message", path: '/director-message', category: 'About Us' },
    { id: 'mission_vision', label: 'Mission & Vision', path: '/mission-vision', category: 'About Us' },
    { id: 'approvals', label: 'Approvals & Recognition', path: '/approvals', category: 'About Us' },
    { id: 'why_iimt', label: 'Why Choose IIMT', path: '/why-iimt', category: 'About Us' },
    { id: 'best_practices', label: 'Best Practices', path: '/best-practices', category: 'About Us' },
    { id: 'green_initiatives', label: 'Green Initiatives', path: '/green-initiatives', category: 'About Us' },
    { id: 'mandatory_disclosure', label: 'Mandatory Disclosure', path: '/mandatory-disclosure', category: 'About Us' },

    // Academics & Learning (9 pages)
    { id: 'education_overview', label: 'Education & Academics Overview', path: '/education-overview', category: 'Academics' },
    { id: 'pedagogy_labs', label: 'Pedagogy & Labs', path: '/pedagogy-labs', category: 'Academics' },
    { id: 'certificate_programs', label: 'Certificate Programs', path: '/certificate-programs', category: 'Academics' },
    { id: 'skill_development', label: 'Skill Development Cell', path: '/skill-development', category: 'Academics' },
    { id: 'e_cell', label: 'E-Cell & Entrepreneurship', path: '/e-cell', category: 'Academics' },
    { id: 'guest_lectures', label: 'Guest Lectures', path: '/guest-lectures', category: 'Academics' },
    { id: 'industrial_visits', label: 'Industrial Visits', path: '/industrial-visits', category: 'Academics' },
    { id: 'debates_gd', label: 'Debates & Group Discussions', path: '/debates-gd', category: 'Academics' },
    { id: 'news_events', label: 'News & Events', path: '/news-events', category: 'Academics' },

    // Campus Life (7 pages)
    { id: 'infrastructure', label: 'Campus Infrastructure', path: '/infrastructure', category: 'Campus Life' },
    { id: 'auditorium', label: 'Auditorium', path: '/auditorium', category: 'Campus Life' },
    { id: 'sports', label: 'Sports & Athletics', path: '/sports', category: 'Campus Life' },
    { id: 'library', label: 'Central Library', path: '/library', category: 'Campus Life' },
    { id: 'it_lab', label: 'IT & Research Lab', path: '/it-lab', category: 'Campus Life' },
    { id: 'hostel', label: 'Hostel & Residence', path: '/hostel', category: 'Campus Life' },
    { id: 'cultural_activities', label: 'Cultural Activities (Kshitiz)', path: '/cultural-activities', category: 'Campus Life' },

    // Student Zone (10 pages)
    { id: 'events_calendar', label: 'Events Calendar', path: '/events-calendar', category: 'Student Zone' },
    { id: 'faqs', label: 'Frequently Asked Questions', path: '/faqs', category: 'Student Zone' },
    { id: 'photo_gallery', label: 'Photo Gallery', path: '/photo-gallery', category: 'Student Zone' },
    { id: 'video_gallery', label: 'Video Gallery', path: '/video-gallery', category: 'Student Zone' },
    { id: 'press_coverage', label: 'Press & Media Coverage', path: '/press-coverage', category: 'Student Zone' },
    { id: 'downloads', label: 'Downloads & Forms', path: '/downloads', category: 'Student Zone' },
    { id: 'past_papers', label: 'Previous Question Papers', path: '/past-papers', category: 'Student Zone' },
    { id: 'code_of_conduct', label: 'Code of Conduct', path: '/code-of-conduct', category: 'Student Zone' },
    { id: 'fee_payment', label: 'Fee Payment Portal', path: '/fee-payment', category: 'Student Zone' },
    { id: 'student_portal', label: 'Student Portal', path: '/student-portal', category: 'Student Zone' },

    // Admissions & Placements (6 pages)
    { id: 'admissions', label: 'Admissions Overview', path: '/admissions', category: 'Admissions & Placements' },
    { id: 'admissions_enquiry', label: 'Admissions Enquiry Form', path: '/admissions-enquiry', category: 'Admissions & Placements' },
    { id: 'consultation', label: 'Career Consultation', path: '/consultation', category: 'Admissions & Placements' },
    { id: 'scholarships', label: 'Scholarships & Financial Aid', path: '/scholarships', category: 'Admissions & Placements' },
    { id: 'placements', label: 'Corporate Placements & Recruiters', path: '/placements', category: 'Admissions & Placements' },
    { id: 'research_journal', label: 'Research Journal', path: '/research-journal', category: 'Admissions & Placements' },

    // Faculty (2 pages)
    { id: 'faculty', label: 'Faculty Directory', path: '/faculty', category: 'Faculty' },
    { id: 'visiting_faculty', label: 'Visiting & Guest Faculty', path: '/visiting-faculty', category: 'Faculty' },

    // Contact & Policies (6 pages)
    { id: 'contact', label: 'Contact Us', path: '/contact', category: 'Contact & Policies' },
    { id: 'careers', label: 'Careers / Job Openings', path: '/careers', category: 'Contact & Policies' },
    { id: 'feedback', label: 'Feedback & Suggestions', path: '/feedback', category: 'Contact & Policies' },
    { id: 'anti_ragging', label: 'Anti-Ragging Committee', path: '/anti-ragging', category: 'Contact & Policies' },
    { id: 'grievance_redressal', label: 'Grievance Redressal', path: '/grievance-redressal', category: 'Contact & Policies' },
    { id: 'privacy_policy', label: 'Privacy Policy', path: '/privacy-policy', category: 'Contact & Policies' }
  ],
  legal: [
    { id: 'homepage', label: 'Homepage', path: '/', category: 'Overview' },

    // About Us
    { id: 'about_us', label: 'About Ishan Law Overview', path: '/about', category: 'About Us' },
    { id: 'principal_message', label: "Principal's Message", path: '/principal-message', category: 'About Us' },
    { id: 'director_message', label: "Director's Message", path: '/director-message', category: 'About Us' },
    { id: 'mission_vision', label: 'Mission & Vision', path: '/mission-vision', category: 'About Us' },
    { id: 'approvals', label: 'Approvals & Recognition (BCI)', path: '/approvals', category: 'About Us' },
    { id: 'why_choose_us', label: 'Why Choose Ishan Law', path: '/why-choose-us', category: 'About Us' },
    { id: 'best_practices', label: 'Best Practices', path: '/best-practices', category: 'About Us' },
    { id: 'green_initiatives', label: 'Green Initiatives', path: '/green-initiatives', category: 'About Us' },
    { id: 'mandatory_disclosure', label: 'Mandatory Disclosure', path: '/mandatory-disclosure', category: 'About Us' },

    // Clinical Legal Education & Academics
    { id: 'moot_court', label: 'Moot Court Hall', path: '/moot-court', category: 'Clinical Legal Education' },
    { id: 'legal_aid_cell', label: 'Legal Aid Cell & Clinic', path: '/legal-aid-cell', category: 'Clinical Legal Education' },
    { id: 'court_jail_visits', label: 'Court & Jail Visits', path: '/court-jail-visits', category: 'Clinical Legal Education' },
    { id: 'guest_lectures', label: 'Guest Lectures', path: '/guest-lectures', category: 'Clinical Legal Education' },
    { id: 'debates_gd', label: 'Debates & Group Discussions', path: '/debates-gd', category: 'Clinical Legal Education' },
    { id: 'skill_development', label: 'Skill Development Cell', path: '/skill-development', category: 'Clinical Legal Education' },
    { id: 'cultural_activities', label: 'Cultural Activities', path: '/cultural-activities', category: 'Clinical Legal Education' },
    { id: 'internship_externship', label: 'Internships & Externships', path: '/internship-externship', category: 'Clinical Legal Education' },
    { id: 'education_overview', label: 'Programs Overview (BA LLB & LLB)', path: '/programs-overview', category: 'Clinical Legal Education' },
    { id: 'certificate_programs', label: 'Certificate Programs', path: '/certificate-programs', category: 'Clinical Legal Education' },

    // Campus & Infrastructure
    { id: 'infrastructure', label: 'Campus Infrastructure', path: '/infrastructure', category: 'Campus & Infrastructure' },
    { id: 'library', label: 'Legal Library', path: '/library', category: 'Campus & Infrastructure' },
    { id: 'it_lab', label: 'IT & Research Lab', path: '/it-lab', category: 'Campus & Infrastructure' },
    { id: 'auditorium', label: 'Auditorium', path: '/auditorium', category: 'Campus & Infrastructure' },
    { id: 'hostel', label: 'Hostel Facilities', path: '/hostel', category: 'Campus & Infrastructure' },
    { id: 'sports', label: 'Sports & Athletics', path: '/sports', category: 'Campus & Infrastructure' },

    // Admissions & Placements
    { id: 'admissions', label: 'Admissions Overview', path: '/admissions', category: 'Admissions & Placements' },
    { id: 'admissions_enquiry', label: 'Admissions Enquiry Form', path: '/admissions-enquiry', category: 'Admissions & Placements' },
    { id: 'consultation', label: 'Career Consultation Form', path: '/consultation', category: 'Admissions & Placements' },
    { id: 'scholarships', label: 'Scholarships & Aid', path: '/scholarships', category: 'Admissions & Placements' },
    { id: 'placements', label: 'Corporate Placements & Chambers', path: '/placements', category: 'Admissions & Placements' },
    { id: 'alumni_network', label: 'Alumni Network', path: '/alumni-network', category: 'Admissions & Placements' },
    { id: 'research_journal', label: 'Research Journal (Law Review)', path: '/research-journal', category: 'Admissions & Placements' },
    { id: 'publications', label: 'Research Publications', path: '/publications', category: 'Admissions & Placements' },

    // Faculty
    { id: 'faculty', label: 'Faculty Directory', path: '/faculty', category: 'Faculty' },
    { id: 'visiting_faculty', label: 'Visiting Faculty & Jurists', path: '/visiting-faculty', category: 'Faculty' },

    // Media & Student Zone
    { id: 'news_events', label: 'News & Events', path: '/news-events', category: 'Media & Student Zone' },
    { id: 'events_calendar', label: 'Events Calendar', path: '/events-calendar', category: 'Media & Student Zone' },
    { id: 'photo_gallery', label: 'Photo Gallery', path: '/photo-gallery', category: 'Media & Student Zone' },
    { id: 'video_gallery', label: 'Video Gallery', path: '/video-gallery', category: 'Media & Student Zone' },
    { id: 'press_coverage', label: 'Press Coverage', path: '/press-coverage', category: 'Media & Student Zone' },
    { id: 'downloads', label: 'Downloads & Forms', path: '/downloads', category: 'Media & Student Zone' },
    { id: 'past_papers', label: 'Past Papers', path: '/past-papers', category: 'Media & Student Zone' },
    { id: 'code_of_conduct', label: 'Code of Conduct', path: '/code-of-conduct', category: 'Media & Student Zone' },
    { id: 'fee_payment', label: 'Fee Payment Portal', path: '/fee-payment', category: 'Media & Student Zone' },
    { id: 'student_portal', label: 'Student Portal', path: '/student-portal', category: 'Media & Student Zone' },
    { id: 'faqs', label: 'FAQs', path: '/faqs', category: 'Media & Student Zone' },

    // Contact & Policies
    { id: 'contact', label: 'Contact Us', path: '/contact', category: 'Contact & Policies' },
    { id: 'careers', label: 'Careers', path: '/careers', category: 'Contact & Policies' },
    { id: 'feedback', label: 'Feedback Form', path: '/feedback', category: 'Contact & Policies' },
    { id: 'anti_ragging', label: 'Anti-Ragging Committee', path: '/anti-ragging', category: 'Contact & Policies' },
    { id: 'grievance_redressal', label: 'Grievance Redressal', path: '/grievance-redressal', category: 'Contact & Policies' },
    { id: 'privacy_policy', label: 'Privacy Policy', path: '/privacy-policy', category: 'Contact & Policies' }
  ],
  pharmacy: [
    { id: 'homepage', label: 'Homepage', path: '/', category: 'Overview' },

    // Institutional Profile
    { id: 'about_us', label: 'About Ishan Pharmacy', path: '/about', category: 'Institutional Profile' },
    { id: 'principal_message', label: "Principal's Message", path: '/principal-message', category: 'Institutional Profile' },
    { id: 'mission_vision', label: 'Mission & Vision', path: '/mission-vision', category: 'Institutional Profile' },
    { id: 'why_choose_us', label: 'Why Choose Us', path: '/why-choose-us', category: 'Institutional Profile' },
    { id: 'approvals', label: 'Approvals & Affiliations (PCI/AKTU)', path: '/approvals', category: 'Institutional Profile' },
    { id: 'mandatory_disclosure', label: 'Mandatory Disclosure', path: '/mandatory-disclosure', category: 'Institutional Profile' },
    { id: 'code_of_conduct', label: 'Code of Conduct & Discipline', path: '/code-of-conduct-discipline', category: 'Institutional Profile' },
    { id: 'faqs', label: 'Frequently Asked Questions', path: '/faqs', category: 'Institutional Profile' },

    // Academic Programs & Admissions
    { id: 'education_overview', label: 'Programs Overview (B.Pharm & D.Pharm)', path: '/programs-overview', category: 'Academic Programs' },
    { id: 'admissions', label: 'Admission Procedure', path: '/admissions', category: 'Academic Programs' },
    { id: 'admissions_enquiry', label: 'Admissions Enquiry Form', path: '/admissions-enquiry', category: 'Academic Programs' },
    { id: 'scholarships', label: 'Scholarships & Merit Aid', path: '/scholarships', category: 'Academic Programs' },
    { id: 'certificate_programs', label: 'Certificate Programmes', path: '/certificate-programs', category: 'Academic Programs' },
    { id: 'consultation', label: 'Admissions Consultation', path: '/consultation', category: 'Academic Programs' },
    { id: 'fee_payment', label: 'Online Fee Payment', path: '/fee-payment', category: 'Academic Programs' },

    // Faculty
    { id: 'faculty', label: 'Faculty Directory', path: '/faculty', category: 'Faculty' },
    { id: 'visiting_faculty', label: 'Visiting Faculty & Scientists', path: '/visiting-faculty', category: 'Faculty' },

    // 10 Specialized Labs & Units
    { id: 'pharmaceutical_chemistry', label: 'Pharmaceutical Chemistry Lab', path: '/pharmaceutical-chemistry', category: '10 Specialized Labs' },
    { id: 'pharmaceutics', label: 'Pharmaceutics Lab', path: '/pharmaceutics', category: '10 Specialized Labs' },
    { id: 'pharmacognosy', label: 'Pharmacognosy & Phytochemistry Lab', path: '/pharmacognosy', category: '10 Specialized Labs' },
    { id: 'pharmacology', label: 'Pharmacology Lab', path: '/pharmacology', category: '10 Specialized Labs' },
    { id: 'pharmacy_practice', label: 'Pharmacy Practice & Clinical Unit', path: '/pharmacy-practice', category: '10 Specialized Labs' },
    { id: 'human_anatomy', label: 'Human Anatomy & Physiology Lab', path: '/human-anatomy', category: '10 Specialized Labs' },
    { id: 'herbal_garden', label: 'Medicinal Plant Herbal Garden', path: '/herbal-garden', category: '10 Specialized Labs' },
    { id: 'machine_room', label: 'Industrial Machine Room', path: '/machine-room', category: '10 Specialized Labs' },
    { id: 'museum_computer_lab', label: 'Pharma Museum & Digital Computer Lab', path: '/museum-computer-lab', category: '10 Specialized Labs' },

    // Campus Facilities
    { id: 'infrastructure', label: 'Campus Infrastructure', path: '/infrastructure', category: 'Campus Facilities' },
    { id: 'library', label: 'Central Pharmacy Library', path: '/library', category: 'Campus Facilities' },
    { id: 'hostel', label: 'Hostel Facilities', path: '/hostel', category: 'Campus Facilities' },
    { id: 'auditorium_sports', label: 'Auditorium & Sports Complex', path: '/auditorium-sports', category: 'Campus Facilities' },

    // Learning & Events
    { id: 'news_events', label: 'News & Events', path: '/news-events', category: 'Learning & Events' },
    { id: 'events_calendar', label: 'Events Calendar', path: '/events-calendar', category: 'Learning & Events' },
    { id: 'guest_lectures', label: 'Guest Lectures & Seminars', path: '/guest-lectures', category: 'Learning & Events' },
    { id: 'industrial_visits', label: 'Industrial Visits', path: '/industrial-visits', category: 'Learning & Events' },
    { id: 'photo_gallery', label: 'Photo Gallery', path: '/photo-gallery', category: 'Learning & Events' },
    { id: 'video_gallery', label: 'Video Gallery', path: '/video-gallery', category: 'Learning & Events' },
    { id: 'press_coverage', label: 'Press & Media Coverage', path: '/press-coverage', category: 'Learning & Events' },

    // Student Zone
    { id: 'downloads', label: 'Downloads & Syllabi', path: '/downloads', category: 'Student Zone' },
    { id: 'past_papers', label: 'Previous Question Papers', path: '/past-papers', category: 'Student Zone' },
    { id: 'student_portal', label: 'Student Portal ERP', path: '/student-portal', category: 'Student Zone' },

    // Research & Placements
    { id: 'placements', label: 'Placement Cell & Recruiters', path: '/placements', category: 'Research & Careers' },
    { id: 'research_projects', label: 'Research Projects & Innovations', path: '/research-projects', category: 'Research & Careers' },
    { id: 'research_journal', label: 'Research Journal (Pharmacy Review)', path: '/research-journal', category: 'Research & Careers' },
    { id: 'publications', label: 'Faculty & Student Publications', path: '/publications', category: 'Research & Careers' },
    { id: 'alumni_network', label: 'Alumni Network', path: '/alumni-network', category: 'Research & Careers' },

    // Contact & Policies
    { id: 'contact', label: 'Contact Us', path: '/contact', category: 'Contact & Policies' },
    { id: 'careers', label: 'Careers at Pharmacy', path: '/careers', category: 'Contact & Policies' },
    { id: 'feedback', label: 'Feedback Form', path: '/feedback', category: 'Contact & Policies' },
    { id: 'thank_you', label: 'Thank You Page', path: '/thank-you', category: 'Contact & Policies' },
    { id: 'anti_ragging', label: 'Anti-Ragging Committee', path: '/anti-ragging', category: 'Contact & Policies' },
    { id: 'grievance_redressal', label: 'Grievance Redressal', path: '/grievance-redressal', category: 'Contact & Policies' },
    { id: 'privacy_policy', label: 'Privacy Policy', path: '/privacy-policy', category: 'Contact & Policies' }
  ],
  landing1: [
    { id: 'homepage', label: 'Main Landing Page (Variant A)', path: '/', category: 'Landing Page 1' }
  ],
  landing2: [
    { id: 'homepage', label: 'High-Conversion Landing Page (Variant B)', path: '/', category: 'Landing Page 2' }
  ]
};

const TEMPLATE_OPTIONS = [
  {
    type: 'custom_html',
    name: 'Custom HTML / Dangerous HTML',
    description: 'Raw HTML with Tailwind classes, embeds, and custom formatting',
    icon: Code,
    defaultHtml: `<div class="py-16 bg-slate-50 border-y border-slate-200">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <span class="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">Special Notice</span>
    <h2 class="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4">Comprehensive Ayurvedic Healthcare</h2>
    <p class="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed mb-8">
      Dedicated to authentic holistic wellness, traditional Panchkarma therapies, and modern diagnostic standards.
    </p>
    <a href="/appointment" class="inline-flex items-center justify-center px-8 py-3 bg-emerald-800 text-white font-semibold rounded-xl hover:bg-emerald-900 transition shadow-md">
      Book Consultation
    </a>
  </div>
</div>`
  },
  {
    type: 'hero',
    name: 'Hero / Banner Strip',
    description: 'High-impact headline, subheading, background image, and CTA',
    icon: Maximize2
  },
  {
    type: 'split',
    name: 'Content & Image Split',
    description: 'Two-column layout with text on one side and an image on the other',
    icon: Layers
  },
  {
    type: 'cards',
    name: 'Features / Cards Grid',
    description: 'Grid of cards with icons, titles, and descriptions',
    icon: Sparkles
  },
  {
    type: 'cta',
    name: 'Call To Action (CTA)',
    description: 'Full-width banner inviting patients to book appointments or contact',
    icon: Sparkles
  },
  {
    type: 'faq',
    name: 'FAQ Accordion',
    description: 'List of frequently asked questions with collapsible answers',
    icon: HelpCircle
  }
];

export default function PageLayoutManager({
  siteKey = 'hospital',
  initialPageId = 'homepage'
}: {
  siteKey?: string;
  initialPageId?: string;
  onClose?: () => void;
}) {
  const [selectedPage, setSelectedPage] = useState<string>(initialPageId);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Page filtering & search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add Section Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSectionType, setNewSectionType] = useState<string>('custom_html');
  const [newSectionName, setNewSectionName] = useState<string>('');
  const [newSectionPosition, setNewSectionPosition] = useState<'top' | 'bottom' | string>('bottom');
  const [newSectionHeading, setNewSectionHeading] = useState<string>('');
  const [newSectionSubheading, setNewSectionSubheading] = useState<string>('');
  const [newSectionHtml, setNewSectionHtml] = useState<string>('');
  const [newSectionImage, setNewSectionImage] = useState<string>('');
  const [newSectionCtaText, setNewSectionCtaText] = useState<string>('');
  const [newSectionCtaLink, setNewSectionCtaLink] = useState<string>('/appointment');

  // Load layout for selected page
  const fetchLayout = async (pageId: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/page-layouts/${siteKey}/${pageId}`);
      if (res.data && Array.isArray(res.data.sections)) {
        setSections(res.data.sections);
      } else {
        setSections([]);
      }
      setHasChanges(false);
    } catch (err: any) {
      console.error('Failed to load layout:', err);
      setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to load page layout.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveCategory('all');
    setSearchQuery('');
    const pages = PORTAL_PAGES[siteKey] || PORTAL_PAGES.hospital;
    if (pages.length > 0 && !pages.some(p => p.id === selectedPage)) {
      setSelectedPage(pages[0].id);
    }
  }, [siteKey]);

  useEffect(() => {
    fetchLayout(selectedPage);
  }, [selectedPage, siteKey]);

  // Reordering functions
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    // Update order values
    newSections.forEach((s, idx) => {
      s.order = idx;
    });

    setSections(newSections);
    setHasChanges(true);
  };

  const moveSectionToExtremity = (index: number, position: 'top' | 'bottom') => {
    if (position === 'top' && index === 0) return;
    if (position === 'bottom' && index === sections.length - 1) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    if (position === 'top') {
      newSections.unshift(moved);
    } else {
      newSections.push(moved);
    }

    newSections.forEach((s, idx) => {
      s.order = idx;
    });

    setSections(newSections);
    setHasChanges(true);
  };

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isHidden: !s.isHidden } : s))
    );
    setHasChanges(true);
  };

  const handleDeleteSection = (id: string) => {
    if (!window.confirm('Are you sure you want to remove this section from the page?')) return;
    const filtered = sections.filter((s) => s.id !== id);
    filtered.forEach((s, idx) => {
      s.order = idx;
    });
    setSections(filtered);
    setHasChanges(true);
  };

  // Add Section Submit
  const handleAddSection = () => {
    if (!newSectionName.trim()) {
      alert('Please enter a section name');
      return;
    }

    const newSec: SectionItem = {
      id: `custom_${Date.now()}`,
      name: newSectionName.trim(),
      type: newSectionType as any,
      order: 0,
      isHidden: false,
      heading: newSectionHeading.trim(),
      subheading: newSectionSubheading.trim(),
      htmlContent: newSectionHtml || (newSectionType === 'custom_html' ? TEMPLATE_OPTIONS[0].defaultHtml : ''),
      image: newSectionImage.trim(),
      ctaText: newSectionCtaText.trim(),
      ctaLink: newSectionCtaLink.trim(),
      items: []
    };

    let newSections = [...sections];

    if (newSectionPosition === 'top') {
      newSections.unshift(newSec);
    } else if (newSectionPosition === 'bottom') {
      newSections.push(newSec);
    } else {
      // Find index of after-section
      const targetIdx = newSections.findIndex((s) => s.id === newSectionPosition);
      if (targetIdx !== -1) {
        newSections.splice(targetIdx + 1, 0, newSec);
      } else {
        newSections.push(newSec);
      }
    }

    newSections.forEach((s, idx) => {
      s.order = idx;
    });

    setSections(newSections);
    setHasChanges(true);
    setIsAddModalOpen(false);

    // Reset form
    setNewSectionName('');
    setNewSectionHeading('');
    setNewSectionSubheading('');
    setNewSectionHtml('');
    setNewSectionImage('');
    setNewSectionCtaText('');

    setStatus({ type: 'success', message: `Added "${newSec.name}" to page! Save layout to publish.` });
    setTimeout(() => setStatus(null), 3500);
  };

  // Save layout to backend
  const handleSaveLayout = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await api.put(`/page-layouts/${siteKey}/${selectedPage}`, {
        sections
      });
      setHasChanges(false);
      setStatus({ type: 'success', message: 'Page layout and section positions saved successfully!' });
      setTimeout(() => setStatus(null), 4000);
    } catch (err: any) {
      console.error('Failed to save layout:', err);
      setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to save layout.' });
    } finally {
      setSaving(false);
    }
  };

  const currentPortalPages = PORTAL_PAGES[siteKey] || PORTAL_PAGES.hospital;
  const currentPageObj = currentPortalPages.find((p) => p.id === selectedPage) || currentPortalPages[0];

  // Reset page layout to defaults
  const handleResetLayout = async () => {
    if (!window.confirm(`Reset "${currentPageObj?.label}" to its default granular sections? Any custom section adjustments will be restored to default.`)) return;
    try {
      setLoading(true);
      await api.delete(`/page-layouts/${siteKey}/${selectedPage}`);
      await fetchLayout(selectedPage);
      setStatus({ type: 'success', message: 'Layout successfully reset to default sections!' });
      setTimeout(() => setStatus(null), 3500);
    } catch (err: any) {
      console.error('Failed to reset layout:', err);
      setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to reset layout.' });
    } finally {
      setLoading(false);
    }
  };

  // Derive categories for the current portal
  const categories = useMemo(() => {
    const cats = new Set<string>();
    currentPortalPages.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['all', ...Array.from(cats)];
  }, [currentPortalPages]);

  // Filter pages by category and search query
  const filteredPages = useMemo(() => {
    return currentPortalPages.filter((page) => {
      const matchesCategory = activeCategory === 'all' || page.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        page.label.toLowerCase().includes(q) ||
        page.path.toLowerCase().includes(q) ||
        page.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [currentPortalPages, activeCategory, searchQuery]);

  const portalName = siteKey === 'ayurveda'
    ? 'Ishan Ayurvedic Medical College'
    : siteKey === 'hospital'
    ? 'Ishan Ayurvedic Hospital'
    : siteKey === 'iimt'
    ? 'IIMT (Management & Technology)'
    : siteKey === 'legal'
    ? 'Ishan Law College'
    : siteKey === 'pharmacy'
    ? 'Ishan Institute of Pharmacy'
    : siteKey === 'landing1'
    ? 'Landing Page 1 (Variant A)'
    : siteKey === 'landing2'
    ? 'Landing Page 2 (Variant B)'
    : siteKey.toUpperCase();
  const liveUrl = livePageUrl(siteKey, currentPageObj?.path) || (
    siteKey === 'ayurveda' ? `http://localhost:5174${currentPageObj?.path || '/'}` :
    siteKey === 'iimt' ? `http://localhost:5175${currentPageObj?.path || '/'}` :
    siteKey === 'landing1' ? `http://localhost:3000${currentPageObj?.path || '/'}` :
    siteKey === 'landing2' ? `http://localhost:3001${currentPageObj?.path || '/'}` :
    `http://localhost:5173${currentPageObj?.path || '/'}`
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Bar / Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Page Builder
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {portalName}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Section Movement & Layout Organizer</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Organizing <span className="font-bold text-slate-700">{currentPageObj?.label}</span> (<span className="font-mono text-emerald-700 font-bold">{currentPageObj?.path}</span>). Drag, reorder, show/hide, create custom sections, and position URL-based HTML across all {currentPortalPages.length} pages.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Page
          </a>

          <button
            onClick={handleResetLayout}
            title="Reset this page to its default granular sections"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-xl transition shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Section
          </button>

          <button
            onClick={handleSaveLayout}
            disabled={saving || !hasChanges}
            className={`flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-xl transition shadow-md ${
              hasChanges
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-emerald-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : hasChanges ? 'Save & Publish Layout' : 'Saved'}
          </button>
        </div>
      </div>

      {/* Page Selector & Category Filter */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        {/* Filter & Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Categories:</span>
            {categories.map((cat) => {
              const count = cat === 'all' 
                ? currentPortalPages.length 
                : currentPortalPages.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat === 'all' ? 'All Pages' : cat} <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${currentPortalPages.length} pages (e.g. Director, Sports, Auditorium)...`}
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Page Selector Buttons */}
        <div className="flex items-center gap-2 flex-wrap max-h-56 overflow-y-auto pr-1">
          {filteredPages.length === 0 ? (
            <div className="text-xs text-slate-400 italic py-2">
              No pages found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredPages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  if (hasChanges) {
                    if (!window.confirm('You have unsaved changes on this page. Discard them?')) return;
                  }
                  setSelectedPage(page.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  selectedPage === page.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-200 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{page.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    selectedPage === page.id ? 'bg-white/20 text-white' : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  {page.path}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Alert Status Banner */}
      {status && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Scenario Instruction Hint */}
      <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 leading-relaxed">
          <strong>Section Movement & URL-Based Sections in Action:</strong> Use <span className="font-bold">↑ Move Up</span>,{' '}
          <span className="font-bold">↓ Move Down</span>, or <span className="font-bold">Top</span> and <span className="font-bold">Bottom</span> to position any section anywhere on the page.
          Any custom HTML sections created here are automatically synchronized with URL-Based Sections for this page&apos;s URL (<span className="font-mono font-bold">{currentPageObj?.path}</span>)!
        </div>
      </div>

      {/* Sections List */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-medium">Loading page sections...</span>
        </div>
      ) : sections.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-400 text-sm">No sections found for this page.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
          >
            Add First Section
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((sec, index) => {
            const isFirst = index === 0;
            const isLast = index === sections.length - 1;

            return (
              <div
                key={sec.id}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  sec.isHidden
                    ? 'border-slate-200 opacity-60 bg-slate-50/60'
                    : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                {/* Section Header Row */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Position Number & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                      #{index + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{sec.name}</h3>

                        {sec.type === 'builtin' ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                            Built-in
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700">
                            Custom {sec.type.replace('custom_', '').toUpperCase()}
                          </span>
                        )}

                        {sec.isHidden && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-700">
                            Hidden
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-0.5 font-mono">
                        ID: {sec.id} {sec.heading ? `• Heading: "${sec.heading}"` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Right: Action Buttons (Reorder, Visibility, Delete) */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    {/* Move to Top */}
                    <button
                      onClick={() => moveSectionToExtremity(index, 'top')}
                      disabled={isFirst}
                      title="Move directly to Top"
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition ${
                        isFirst
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
                      }`}
                    >
                      Top
                    </button>

                    {/* Move Up */}
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={isFirst}
                      title="Move Up"
                      className={`p-2 rounded-xl transition ${
                        isFirst
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-700'
                      }`}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={isLast}
                      title="Move Down"
                      className={`p-2 rounded-xl transition ${
                        isLast
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-700'
                      }`}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* Move to Bottom */}
                    <button
                      onClick={() => moveSectionToExtremity(index, 'bottom')}
                      disabled={isLast}
                      title="Move directly to Bottom"
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition ${
                        isLast
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
                      }`}
                    >
                      Bottom
                    </button>

                    <div className="w-px h-5 bg-slate-200 mx-1" />

                    {/* Visibility Toggle */}
                    <button
                      onClick={() => toggleVisibility(sec.id)}
                      title={sec.isHidden ? 'Show on Page' : 'Hide from Page'}
                      className={`p-2 rounded-xl transition ${
                        sec.isHidden
                          ? 'text-rose-500 hover:bg-rose-50'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {sec.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    {/* Delete (only for custom sections) */}
                    {sec.type !== 'builtin' && (
                      <button
                        onClick={() => handleDeleteSection(sec.id)}
                        title="Delete Custom Section"
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Section Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Section to {currentPageObj?.label}</h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  Select a template and choose where to place the new section on the page.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Section Template</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TEMPLATE_OPTIONS.map((tmpl) => {
                  const Icon = tmpl.icon;
                  const isSelected = newSectionType === tmpl.type;
                  return (
                    <div
                      key={tmpl.type}
                      onClick={() => {
                        setNewSectionType(tmpl.type);
                        if (tmpl.defaultHtml && !newSectionHtml) {
                          setNewSectionHtml(tmpl.defaultHtml);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{tmpl.name}</div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                            {tmpl.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section Name & Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Section Name / Label <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="e.g. Free Health Camp Banner"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Position on Page</label>
                <select
                  value={newSectionPosition}
                  onChange={(e) => setNewSectionPosition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                >
                  <option value="top">🔝 Top of the Page (Before everything)</option>
                  <option value="bottom">🔻 Bottom of the Page (After everything)</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      After: #{sec.order + 1} {sec.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section Headings & Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={newSectionHeading}
                  onChange={(e) => setNewSectionHeading(e.target.value)}
                  placeholder="e.g. Special Health Camp"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subheading / Tagline</label>
                <input
                  type="text"
                  value={newSectionSubheading}
                  onChange={(e) => setNewSectionSubheading(e.target.value)}
                  placeholder="e.g. THIS SUNDAY ONLY"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Feature Image URL</label>
              <input
                type="text"
                value={newSectionImage}
                onChange={(e) => setNewSectionImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Dangerous HTML input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-purple-600" /> Dangerous HTML / Custom Markup
              </label>
              <textarea
                rows={5}
                value={newSectionHtml}
                onChange={(e) => setNewSectionHtml(e.target.value)}
                placeholder="<div class='py-12 px-6 bg-slate-100 rounded-2xl'>...</div>"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* CTA button fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={newSectionCtaText}
                  onChange={(e) => setNewSectionCtaText(e.target.value)}
                  placeholder="e.g. Register Free"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Link</label>
                <input
                  type="text"
                  value={newSectionCtaLink}
                  onChange={(e) => setNewSectionCtaLink(e.target.value)}
                  placeholder="/appointment"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="px-6 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition shadow-md shadow-emerald-200"
              >
                Add Section to Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
