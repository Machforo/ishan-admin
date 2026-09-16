# 🏛️ Ishan Admin Panel — Master Workflow Guide

> **The Definitive Operations Manual**: How any person can operate, manage, and understand all functionalities of the Ishan Multi-Portal Admin Panel without technical knowledge.

---

## 📋 Table of Contents
1. [Overview & Core Purpose](#1-overview--core-purpose)
2. [How a Normal Person Can Use It (Simple 3-Step Principle)](#2-how-a-normal-person-can-use-it-simple-3-step-principle)
3. [Full Feature & Functionality Inventory](#3-full-feature--functionality-inventory)
   - [A. System Overview & Real-Time Dashboard](#a-system-overview--real-time-dashboard)
   - [B. Consolidated Leads & Enquiry CRM](#b-consolidated-leads--enquiry-crm)
   - [C. Content Editor (Generic Dynamic Editor)](#c-content-editor-generic-dynamic-editor)
   - [D. Section Movement & Page Layout Manager](#d-section-movement--page-layout-manager)
   - [E. Dynamic & Custom Pages Manager](#e-dynamic--custom-pages-manager)
   - [F. Role Management & Access Security](#f-role-management--access-security)
4. [Master End-to-End Visual Workflow](#4-master-end-to-end-visual-workflow)
5. [Standard Operating Procedures (How to Do Anything)](#5-standard-operating-procedures-how-to-do-anything)
   - [Workflow 1: Editing Existing Text, Dates, or Links](#workflow-1-editing-existing-text-dates-or-links)
   - [Workflow 2: Uploading Images and PDF Documents](#workflow-2-uploading-images-and-pdf-documents)
   - [Workflow 3: Adding or Editing Lists (Faculty, Courses, Cards)](#workflow-3-adding-or-editing-lists-faculty-courses-cards)
   - [Workflow 4: Hiding or Showing a Section on the Live Website](#workflow-4-hiding-or-showing-a-section-on-the-live-website)
   - [Workflow 5: Reordering Sections on a Page](#workflow-5-reordering-sections-on-a-page)
   - [Workflow 6: Creating a Completely New Webpage](#workflow-6-creating-a-completely-new-webpage)
   - [Workflow 7: Cross-Portal News & Event Broadcasting](#workflow-7-cross-portal-news--event-broadcasting)
   - [Workflow 8: Managing Leads & Exporting to Excel/CSV](#workflow-8-managing-leads--exporting-to-excelcsv)
   - [Workflow 9: Creating a User & Setting Restrictive Access](#workflow-9-creating-a-user--setting-restrictive-access)
6. [Supported Portals & URL Directory](#6-supported-portals--url-directory)
7. [Troubleshooting & Common Questions](#7-troubleshooting--common-questions)

---

## 1. Overview & Core Purpose

The **Ishan Admin Panel** is a centralized control dashboard designed to control and publish content for **7 websites and portals** belonging to the Ishan Group of Institutions:
1. **Ishan Group Main Landing Portal** (landing1)
2. **Admissions Campaign Portal** (landing2)
3. **IIMT Portal** (Management, Commerce, Technology)
4. **Ishan Ayurvedic Medical College & Hospital** (Ayurveda)
5. **Ishan Teaching Hospital**
6. **Ishan Law School / Legal Portal**
7. **Ishan Institute of Pharmacy**

### What does it replace?
Instead of needing a web developer to change a phone number, upload a faculty member, post news, hide an outdated announcement, or export admissions leads, any staff member can log in and do it in under 60 seconds with instant live updates.

---

## 2. How a Normal Person Can Use It (Simple 3-Step Principle)

You do **not** need to know HTML, CSS, or programming. The entire interface follows a simple 3-step rhythm:

`
[ STEP 1: LOCATE ]                [ STEP 2: EDIT ]                [ STEP 3: PUBLISH ]
Find the website & section  --->  Type, upload, or toggle  --->  Click 'Save' or 'Update'
via the left sidebar              directly on the screen          Changes reflect on the live site!
`

### Key Elements on Screen:
- **Left Sidebar (Navigation Tree)**: 
  - Top level: Global tools (Dashboard, Consolidated Leads, Role Management).
  - Categorized websites: Click any portal (e.g. *Ayurvedic College*), then click a page (e.g. *About Us*), then select a section (e.g. *Mission & Vision*).
  - Quick Search box: Just type a keyword (like hostel or principal) to jump straight to that section without digging through menus.
- **Top Bar (Action Bar)**: Shows your current location, toggle between **Fields Editor** and **Section Movement & Layout**, a search bar, and your logout button.
- **Main Workspace**: Where all the editing happens. Forms are self-explanatory with clear labels, image upload buttons, and rich-text formatters.

---

## 3. Full Feature & Functionality Inventory

### A. System Overview & Real-Time Dashboard
- **Total Lead Counters**: Displays live aggregated count of student leads, active sessions, formal applications, and contact enquiries.
- **Recent Leads Preview**: A live snapshot table showing the newest inquiries with student name, intended course, portal source, and date.
- **Portal Health & Status**: Visual status monitor verifying that institutional websites and APIs are connected and online.

### B. Consolidated Leads & Enquiry CRM
- **Cross-Institutional Aggregation**: Collects every lead submitted through contact forms, popup modals, or admissions applications from all 7 websites in one table.
- **Instant Search**: Search by applicant name, email, or course name.
- **Filter by Portal**: Narrow down leads to a specific institution (e.g., show only Ayurveda or Pharmacy leads).
- **One-Click Export**: Download all filtered enquiries into an offline format to import directly into Excel, Google Sheets, or telecaller CRMs.
- **Sync & Refresh**: Real-time pull to fetch the newest inquiries submitted just seconds ago.

### C. Content Editor (Generic Dynamic Editor)
- **Singleton Section Editing**: For single-layout sections (Headers, Contact information, Director message, Overview blocks). Edit the text and hit **Save**.
- **Collection / Card Editing**: For lists that have multiple items (Faculty members, Photo galleries, News items, FAQs, Hospital doctors, Courses).
  - **Add Item**: Opens a popup form with all relevant fields.
  - **Edit Item**: Click the pencil icon to modify text or replace photos.
  - **Delete Item**: Remove outdated items with a safety confirmation prompt.
- **Rich Text Editor (Jodit WYSIWYG)**: 
  - Write formatted articles, policies, and course descriptions.
  - Supports bold, italics, underline, numbered lists, bullet lists, tables, clean headings (H2, H3), and link insertions.
- **Integrated Cloud Media Upload**: 
  - Click **Upload Image** to select any picture from your computer; it is automatically uploaded to the cloud (Cloudinary) and linked.
  - Alternatively, paste any direct image URL.
- **PDF & Document Upload**: Upload brochures, syllabi, and mandatory disclosure PDF files with automated links.
- **Section Duplication / Cloning**: Duplicate any existing section to make an independent copy with a custom URL slug (e.g., making a separate page for a special event).
- **Cross-Portal Broadcasting**: Check multiple portal boxes while creating a news item or announcement to publish it across multiple websites in one click.
- **Live Preview Link**: Click the  View live page link in the top bar to immediately inspect the live page in a new tab.

### D. Section Movement & Page Layout Manager
- **Visual Section Reordering**: Move sections up or down on any webpage using ↑ and ↓ buttons to change which content appears first to visitors.
- **Instant Section Visibility Toggle**: Hide or unhide entire sections on the live website with a single click on the eye icon 👁️ (useful during seasonal campaigns or revisions).
- **Prebuilt Section Templates**: Insert ready-to-use sections onto any page:
  - Hero Banner: Giant headline with background image and call-to-action button.
  - Split Content: Two columns (photo on one side, formatted text on the other).
  - Cards Grid: Feature boxes for facilities, services, or stats.
  - Call to Action (CTA): High-converting lead prompts with click buttons.
  - FAQ Accordion: Expandable question & answer lists.
  - Custom HTML: Advanced custom snippets for unique embed widgets.

### E. Dynamic & Custom Pages Manager
- **Build New Pages Without Code**: Create a brand-new page on any portal (e.g., https://iimt.ishan.ac/p/sports-meet-2026).
- **Template Options**:
  1. *Standard Article*: Title, cover picture, and rich text body.
  2. *Photo Gallery*: Multi-image photo grid created just by providing picture links.
  3. *Custom HTML (With Navbar & Footer)*: Embedded custom layouts that keep the site header and footer intact.
  4. *Raw HTML (Blank Canvas)*: Complete blank canvas for special landing pages or micro-tools.
- **Draft vs. Published Status**: Save unfinished pages as drafts; switch to **Published** only when ready for public eyes.
- **Automatic Slug Generator**: Automatically converts human titles into web-safe URL paths (e.g. Alumni Meet -> /p/alumni-meet).

### F. Role Management & Access Security (Super Admin)
- **Role Hierarchy**:
  - **Super Admin**: Complete master control over all websites, leads, system settings, and user permissions.
  - **Admin**: Full editing control over assigned portals.
  - **Team Member**: Highly granular operative who can only view or edit specific sections explicitly assigned to them.
- **Granular CRUD Toggles**: Grant or revoke the ability to **Create**, **Update**, or **Delete** independently for each account.
- **Portal & Section Locks**: Lock down an operator so they can only edit, for example, the *Ayurveda Faculty section* and nothing else in the entire system.

---

## 4. Master End-to-End Visual Workflow

`
                             ┌──────────────────────────────┐
                             │       LOGIN SCREEN           │
                             │ (Enter Email & Master Pass)  │
                             └──────────────┬───────────────┘
                                            │
                                            ▼
                             ┌──────────────────────────────┐
                             │          DASHBOARD           │
                             │   System Overview & Stats    │
                             └──────────────┬───────────────┘
                                            │
       ┌────────────────────┬───────────────┼────────────────────┬────────────────────┐
       ▼                    ▼               ▼                    ▼                    ▼
┌──────────────┐   ┌────────────────┐ ┌──────────────┐   ┌──────────────┐   ┌─────────────────┐
│ CONSOLIDATED │   │ SELECT PORTAL  │ │ PAGE LAYOUT  │   │ DYNAMIC /    │   │ ROLE MANAGEMENT │
│    LEADS     │   │   & SECTION    │ │   MANAGER    │   │ CUSTOM PAGES │   │ (Super Admin)   │
└──────┬───────┘   └────────┬───────┘ └──────┬───────┘   └──────┬───────┘   └────────┬────────┘
       │                    │                │                  │                    │
       ├─ Filter / Search   ├─ Singleton     ├─ Reorder ↑/↓     ├─ New Page          ├─ Add New User
       ├─ Review details    │   (Edit/Save)  ├─ Hide/Show 👁    ├─ Pick Template     ├─ Grant Sites
       └─ Export to CSV     ├─ Collection    ├─ Add Section     ├─ Edit Rich Text    ├─ Grant Sections
                            │  (Add/Edit/Del)└─ Delete Section  └─ Publish Live      └─ Set Create/Edit
                            ├─ Upload Media                                             Delete rights
                            ├─ Broadcast                                               
                            └─ Hide / Clone                                            
`

---

## 5. Standard Operating Procedures (How to Do Anything)

### Workflow 1: Editing Existing Text, Dates, or Links
1. Look at the left sidebar. Click the institution (e.g., **Ishan Ayurvedic College**).
2. Click the page (e.g., **About Us**).
3. Click the section (e.g., **Mission & Vision**).
4. The fields appear in the center of the screen.
5. Click inside any text box or rich-text editor and make your changes.
6. Click the blue **Save** button in the top right corner.
7. A green notification will confirm your changes are saved. Click **View live page** to see it on the website!

### Workflow 2: Uploading Images and PDF Documents
1. Navigate to the section containing the image or brochure field.
2. Click the **Upload Image** (or **Upload File**) button.
3. Select the file from your computer.
4. Wait 2–3 seconds while it uploads securely to the cloud.
5. The preview box will immediately display your newly uploaded picture or file link.
6. Click **Save** (for singleton sections) or **Update Item** (if inside a collection drawer).

### Workflow 3: Adding or Editing Lists (Faculty, Courses, Cards)
1. Open the collection section (e.g., **Clinical Staff / Doctors**).
2. **To Add a New Member**:
   - Click the **Add Item** button at the top right.
   - A side drawer opens. Type the Name, Qualification, Department, and upload their picture.
   - Click **Save Item**.
3. **To Edit an Existing Member**:
   - Locate their card on the screen.
   - Click the pencil icon (**Edit**).
   - Adjust their details in the drawer and click **Update Item**.
4. **To Remove a Member**:
   - Click the trash icon (**Delete**) on their card and confirm.

### Workflow 4: Hiding or Showing a Section on the Live Website
1. Open the section in the editor.
2. At the top of the workspace, click the **Hide** button (marked with an Eye icon).
3. The section will immediately be hidden from the live website without deleting any information.
4. An **EyeOff** indicator will appear next to the section in the sidebar.
5. Whenever you want to display it again, return to the section and click **Unhide**.

### Workflow 5: Reordering Sections on a Page
1. Select the portal from the sidebar.
2. In the top bar mode switch, click **Section Movement & Layout**.
3. Select which page you want to modify from the page dropdown (e.g., *Homepage*).
4. You will see a vertical list of all sections on that page.
5. Click **Arrow Up (↑)** or **Arrow Down (↓)** to shift sections higher or lower on the live page.
6. Changes save immediately.

### Workflow 6: Creating a Completely New Webpage
1. In the sidebar, select the portal where you want the new page.
2. Click **Custom Pages** (or **Dynamic Pages**).
3. Click the **Create New Page** button.
4. Enter the **Page Title** (e.g., Independence Day Celebrations 2026).
5. Notice the URL slug is automatically created (e.g., /p/independence-day-celebrations-2026).
6. Select your layout:
   - Choose **Standard Text Page** for an article with a banner image.
   - Choose **Gallery Page** for an image showcase.
7. Fill in your content, headlines, and pictures.
8. Ensure the **Published** switch is toggled ON.
9. Click **Save Page**. The page is instantly live on the web!

### Workflow 7: Cross-Portal News & Event Broadcasting
1. Navigate to the News & Events section of any portal (e.g. *IIMT Portal*).
2. Click **Add Item**.
3. Enter the headline, date, cover photo, and story body.
4. Scroll to the bottom of the drawer to find **Broadcast to other portals?**.
5. Check the boxes for the other institutions where this announcement should appear (e.g. *Ayurveda*, *Hospital*, *Pharmacy*).
6. Click **Save Item**. The backend automatically duplicates and displays the announcement across all selected websites at once!

### Workflow 8: Managing Leads & Exporting to Excel/CSV
1. Click **Consolidated Leads** in the left sidebar.
2. To find a specific applicant, type their name, email, or course in the search bar.
3. To view leads for a specific college only, choose it from the **All Institutions** dropdown.
4. To export: Click **Export All** in the top right to download a spreadsheet for your admissions counselors.

### Workflow 9: Creating a User & Setting Restrictive Access (Super Admin Only)
1. Click **Role Management** in the sidebar.
2. Click **Add New User**.
3. Type their official email, create a secure password, and select role (**Team Member** or **Administrator**).
4. Click **Deploy User**.
5. On their newly created user card:
   - Check or uncheck **Create**, **Update**, or **Delete** to control their editing privileges.
   - To give them access to an entire college website, toggle **Full Access** on that portal.
   - To restrict them to specific sections only: Leave Full Access OFF, and click only the allowed section tags (e.g., Pharmacy:faculty, Pharmacy:news).
6. Permissions update automatically. When that user logs in, they will only see what you permitted!

---

## 6. Supported Portals & URL Directory

| Portal Key | Institution Name | Default Live Website Domain |
| :--- | :--- | :--- |
| landing1 | **Ishan Group Central Portal** | https://ishan.ac |
| landing2 | **Admissions Campaign Portal** | Active campaign deployment |
| iimt | **Ishan Institute of Management & Tech** | https://iimt.ishan.ac |
| yurveda | **Ishan Ayurvedic Medical College** | https://ayurveda.ishan.ac |
| hospital | **Ishan Teaching Hospital** | https://hospital.ishan.ac |
| legal | **Ishan Law School / Legal Portal** | https://law.ishan.ac |
| pharmacy | **Ishan Institute of Pharmacy** | https://pharmacy.ishan.ac |

---

## 7. Troubleshooting & Common Questions

#### Q: I made an edit and clicked Save, but the live website still shows the old text. Why?
- **A**: Web browsers store cached versions of websites to load faster. Open the website and press Ctrl + Shift + R (or Cmd + Shift + R on Mac) to perform a hard refresh, or check in an Incognito window.

#### Q: An image fails to upload. What should I do?
- **A**: Ensure your image file is a standard format (JPG, PNG, or WebP) and under 10MB in size. High-resolution photos straight from cameras should be compressed before uploading.

#### Q: A team member cannot edit a section. What should the Super Admin check?
- **A**: Go to **Role Management**, locate the team member's card, and verify:
  1. The **Update** checkbox is checked.
  2. Either the portal has **Full Access** turned on, OR that specific section pill is highlighted.

#### Q: Can I recover deleted items?
- **A**: Deleted collection items or custom pages cannot be undeleted automatically. If you simply want to temporarily remove something from the public eye, use the **Hide (Eye icon)** toggle instead of deleting!

---

*Ishan Admin Panel Operations Manual — Created for the Ishan Group of Institutions.*
