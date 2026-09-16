# 🏛️ Ishan Admin Panel — Master Workflow & Operations Guide

> **The Definitive Non-Technical Operations Manual**: How any staff member, administrator, or content manager can easily operate, manage, and update all 7 websites across the Ishan Group of Institutions without touching any code.

---

## 🌐 Quick Access Hub & Live Portals Directory

| Portal Key | Institution / Website | Live Website URL | What is Managed Here? |
| :--- | :--- | :--- | :--- |
| **Admin** | 🔐 **Ishan Master Admin Panel** | [ishan-admin.vercel.app](https://ishan-admin.vercel.app/) | Central control hub for all content, leads & users |
| `hospital` | 🏥 **Ishan Teaching Hospital** | [hospital.ishaninstitute.edu.in](https://hospital.ishaninstitute.edu.in) | OPD specs, doctor schedules, Panchkarma, bed availability |
| `iimt` | 🎓 **IIMT (Management & Tech)** | [iimt.ishaninstitute.edu.in](https://iimt.ishaninstitute.edu.in) | BBA, BCA, B.Com courses, placements, faculty, events |
| `legal` | ⚖️ **Ishan Law School** | [law.ishaninstitute.edu.in](https://law.ishaninstitute.edu.in) | LLB, BA-LLB, Moot Court, legal aid clinic, notifications |
| `landing1` | 🌐 **Ishan Group Central Portal** | [landingpage1.ishaninstitute.edu.in](https://landingpage1.ishaninstitute.edu.in/) | Group-level home, campus facilities, leadership, stories |
| `landing2` | 🎯 **Admissions Campaign Portal** | [landingpage2.ishaninstitute.edu.in](https://landingpage2.ishaninstitute.edu.in/) | Lead capture landing pages, high-converting promo banners |
| `pharmacy` | 💊 **Ishan Institute of Pharmacy** | [pharmacy.ishaninstitute.edu.in](https://pharmacy.ishaninstitute.edu.in/) | D.Pharm, B.Pharm, lab infrastructure, PCI compliance |
| `ayurveda` | 🌿 **Ishan Ayurvedic Medical College** | [ayurveda.ishaninstitute.edu.in](https://ayurveda.ishaninstitute.edu.in/) | BAMS programme, herbal garden registry, NCISM disclosures |

---

## ⚡ 60-Second Quick Start (For Urgent Edits)

Need to quickly update a phone number, fix a spelling error, or change a date? Follow these **3 simple steps**:

```
 ┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
 │ 1. LOCATE              │      │ 2. EDIT                │      │ 3. PUBLISH             │
 │ Log in & pick portal   │ ───► │ Type your changes      │ ───► │ Click the Blue 'Save'  │
 │ & section from sidebar │      │ directly in the box    │      │ button in the top bar  │
 └────────────────────────┘      └────────────────────────┘      └────────────────────────┘
                                                                       ▲
                                                                       └─ Goes live instantly!
```

1. Go to **[ishan-admin.vercel.app](https://ishan-admin.vercel.app/)** and log in.
2. In the **Left Sidebar**, click your institution (e.g. *IIMT*), then click the page (e.g. *About Us*), then click the section.
3. Edit the text and click the blue **Save** button in the top right. **Done! It is live on the site.**

---

## 📋 Table of Contents

1. [Quick Access Hub & Live Portals Directory](#-quick-access-hub--live-portals-directory)
2. [60-Second Quick Start (For Urgent Edits)](#-60-second-quick-start-for-urgent-edits)
3. [Visual Layout of the Admin Panel](#-visual-layout-of-the-admin-panel)
4. [Master Feature Inventory](#-master-feature-inventory)
   - [A. Real-Time Analytics & Dashboard](#a-real-time-analytics--dashboard)
   - [B. Consolidated Leads & Admissions CRM](#b-consolidated-leads--admissions-crm)
   - [C. Dynamic Content Editor (Singletons & Collections)](#c-dynamic-content-editor-singletons--collections)
   - [D. Section Movement & Page Layout Manager](#d-section-movement--page-layout-manager)
   - [E. Dynamic & Custom Pages Manager](#e-dynamic--custom-pages-manager)
   - [F. Role Management & Access Control (Super Admin)](#f-role-management--access-control-super-admin)
5. [Step-by-Step Standard Operating Procedures (SOPs)](#-step-by-step-standard-operating-procedures-sops)
   - [SOP 1: Editing Existing Text, Dates, or Phone Numbers](#sop-1-editing-existing-text-dates-or-phone-numbers)
   - [SOP 2: Uploading Photos & PDF Documents (Brochures, Disclosures)](#sop-2-uploading-photos--pdf-documents-brochures-disclosures)
   - [SOP 3: Managing Lists & Directories (Faculty, Doctors, FAQs, Courses)](#sop-3-managing-lists--directories-faculty-doctors-faqs-courses)
   - [SOP 4: Hiding or Showing a Section on the Live Website (1-Click)](#sop-4-hiding-or-showing-a-section-on-the-live-website-1-click)
   - [SOP 5: Reordering Sections on a Webpage](#sop-5-reordering-sections-on-a-webpage)
   - [SOP 6: Creating a Brand-New Custom Webpage (No Code)](#sop-6-creating-a-brand-new-custom-webpage-no-code)
   - [SOP 7: Multi-Site Broadcast (Post News to Multiple Colleges at Once)](#sop-7-multi-site-broadcast-post-news-to-multiple-colleges-at-once)
   - [SOP 8: Managing Student Leads & Exporting to Excel/CSV](#sop-8-managing-student-leads--exporting-to-excelcsv)
   - [SOP 9: Creating User Accounts & Restricting Access](#sop-9-creating-user-accounts--restricting-access)
6. [Real-World Scenarios ("How Do I...")](#-real-world-scenarios-how-do-i)
7. [Troubleshooting, Cache Clearing & Pro Tips](#-troubleshooting-cache-clearing--pro-tips)

---

## 🖥️ Visual Layout of the Admin Panel

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  ISHAN ADMIN   │ Current Path: IIMT > About Us > Mission     [View Live Page ↗] [SAVE] │ ◄ Top Action Bar
├────────────────┬───────────────────────────────────────────────────────────────────────┤
│ 🔍 Search...   │                                                                       │
│                │ ╔═══════════════════════════════════════════════════════════════════╗ │
│ 📊 Dashboard   │ ║ Section Title: Mission & Core Values                              ║ │
│ 📥 Leads CRM   │ ║                                                                   ║ │
│ 👥 Roles       │ ║ Subtitle: [ Empowering Next-Gen Global Leaders                  ] ║ │
│ ────────────── │ ║                                                                   ║ │
│ 🌐 MAIN SITES  │ ║ Description (Rich Text Editor):                                   ║ │
│ ▸ Landing 1    │ ║ [ B  I  U  H2  H3  🔗  📷  ≡ ]                                    ║ │
│ ▸ Landing 2    │ ║ Our mission is to provide industry-ready education...             ║ │
│ 🏛️ COLLEGES    │ ║                                                                   ║ │
│ ▾ IIMT         │ ║ Feature Image:                                                    ║ │
│   ▾ About Us   │ ║ [ Upload Image ]  [ https://res.cloudinary.com/.../img.webp     ] ║ │
│     • Hero     │ ║                                                                   ║ │
│     • Mission  │ ║ Status: [👁️ Visible on Live Site]     [Duplicate Section ❐]      ║ │
│     • Faculty  │ ╚═══════════════════════════════════════════════════════════════════╝ │
│ ▸ Ayurveda     │                                                                       │
│ ▸ Hospital     │ ┌───────────────────────────────────────────────────────────────────┐ │
│ ▸ Legal (Law)  │ │ Collections (e.g. Faculty / Doctors List):                        │ │
│ ▸ Pharmacy     │ │ [+ Add Item]                                                      │ │
│                │ │  Card 1: Dr. Sharma [✎ Edit] [🗑 Del]                              │ │
│                │ │  Card 2: Prof. Verma [✎ Edit] [🗑 Del]                             │ │
│                │ └───────────────────────────────────────────────────────────────────┘ │
└────────────────┴───────────────────────────────────────────────────────────────────────┘
  ▲ Left Sidebar                     ▲ Main Content Workspace
```

---

## 🌟 Master Feature Inventory

### A. Real-Time Analytics & Dashboard
- **Total Inquiries Counter**: Live metric tracking all student leads across all 7 web properties.
- **Recent Leads Preview**: A real-time table displaying the newest inquiries with applicant name, phone, course, and institution.
- **System Health Monitor**: Instant visual verification confirming backend database connectivity and API uptime.

### B. Consolidated Leads & Admissions CRM
- **Single Master Inbox**: Every inquiry form, brochure download, and popup submission from all 7 websites flows into one centralized CRM table.
- **Instant Search & Filter**: Filter leads by specific college (e.g., *Ishan Institute of Pharmacy*) or search by student phone/email.
- **One-Click Export to Excel / CSV**: Download the filtered leads table for your counseling and telecalling teams.

### C. Dynamic Content Editor (Singletons & Collections)
- **Singleton Editing**: For sections that exist only once on a page (Banner headline, Director's message, Contact details). Edit inline and click **Save**.
- **Collection Editing**: For repeating items (Faculty directory, Doctor roster, FAQ lists, Photo galleries, News articles). 
  - Add new cards using the **+ Add Item** button.
  - Modify existing cards by clicking **Edit (Pencil icon)**.
  - Remove cards using **Delete (Trash icon)** with a safety confirmation prompt.
- **Jodit WYSIWYG Rich-Text Editor**: Format announcements with bold text, bullet points, hyperlinks, custom headings, and tables.
- **Automatic Cloud Media Upload**: Upload photos directly from your computer; they are automatically optimized and securely hosted on Cloudinary.
- **PDF & Document Hosting**: Upload syllabus copies, mandatory disclosures, and fee structure PDFs with automated direct download links.

### D. Section Movement & Page Layout Manager
- **Reorder Sections**: Move sections up or down on any webpage using simple **↑** and **↓** buttons to change what visitors see first.
- **1-Click Visibility Toggle**: Temporarily hide any section on the live website by toggling the **Eye icon (👁️)** without losing any data.
- **Prebuilt Section Templates**: Insert ready-to-use sections (Hero Banners, Two-Column Split, Feature Cards, FAQ Accordion, Call-to-Action).

### E. Dynamic & Custom Pages Manager
- **Create New Pages Without Code**: Launch new URLs on any portal (e.g. `https://law.ishaninstitute.edu.in/p/national-moot-court-2026`).
- **Flexible Templates**: Choose from Standard Article, Photo Gallery, or Embedded HTML.
- **Draft vs. Live**: Keep work hidden in Draft mode; flip to **Published** only when finalized.
- **Automatic Clean URLs**: Automatically formats titles into SEO-friendly URLs (`/p/alumni-meet-2026`).

### F. Role Management & Access Control (Super Admin)
- **Role Tiers**:
  - **Super Admin**: Full master access to all portals, leads, settings, and user permissions.
  - **Administrator**: Full editing access to one or more assigned institutions.
  - **Team Member**: Restricted operator who can only view or edit explicitly assigned sections.
- **Granular CRUD Flags**: Grant or revoke **Create**, **Update**, or **Delete** abilities independently per staff member.
- **Section-Level Locking**: Allow an operator to update only their department (e.g., `pharmacy:faculty` or `hospital:doctors`) and nothing else.

---

## 📖 Step-by-Step Standard Operating Procedures (SOPs)

---

### SOP 1: Editing Existing Text, Dates, or Phone Numbers

> **Scenario**: You need to update the admission contact number or the last date to apply.

1. Open **[ishan-admin.vercel.app](https://ishan-admin.vercel.app/)**.
2. On the **Left Sidebar**, click your college (e.g., **IIMT**).
3. Click the page containing the content (e.g., **Contact Us** or **Admissions**).
4. Click the target section (e.g., **Contact Info**).
5. The form will load in the main workspace. Click into any text field and make your changes.
6. Click the blue **Save** button in the top action bar.
7. A green notification `Section saved successfully!` will appear.
8. Click **View live page ↗** in the top bar to verify the change on the live website.

---

### SOP 2: Uploading Photos & PDF Documents (Brochures, Disclosures)

> **Scenario**: You want to upload a new campus photo or a Mandatory Disclosure PDF.

1. Navigate to the section requiring the image or document.
2. Locate the **Image / Document** field.
3. Click the **Upload Image** (or **Upload File**) button.
4. Select the file from your computer (JPG, PNG, WebP, or PDF).
5. Wait 2–3 seconds while the progress indicator uploads it to the secure cloud server.
6. The preview box will immediately display your newly uploaded picture or file link.
7. Click the blue **Save** button (or **Update Item** if inside a collection drawer).

> [!TIP]
> **Recommended Image Guidelines**:
> - **Banner / Hero Photos**: 1920 × 800 px (Landscape)
> - **Faculty / Doctor Portraits**: 600 × 600 px (Square)
> - **Event & Gallery Images**: 1200 × 800 px (3:2 Landscape)
> - **Max File Size**: Keep images under 5 MB for fast web loading.

---

### SOP 3: Managing Lists & Directories (Faculty, Doctors, FAQs, Courses)

> **Scenario**: A new professor has joined the Ayurvedic Medical College, or you need to update a doctor's OPD timing.

#### To Add a New Item:
1. Open the collection section in the sidebar (e.g., **Ayurveda > Faculty** or **Hospital > Doctors**).
2. Click the **+ Add Item** button at the top right of the cards area.
3. A slide-over drawer will appear on the right side of your screen.
4. Fill in the fields:
   - Full Name
   - Designation / Specialization
   - Qualification
   - Upload Profile Photo
   - Bio or Experience details
5. Click **Save Item** at the bottom of the drawer. The new card immediately appears on screen and is live!

#### To Edit an Existing Item:
1. Find the member or item card on the screen.
2. Click the **Pencil icon (Edit)**.
3. The drawer will open with their current information. Update any detail or replace their picture.
4. Click **Update Item**.

#### To Remove an Item:
1. Find the card and click the **Trash icon (Delete)**.
2. Click **Confirm Delete** in the warning prompt. *(If you want to keep the data for later, see SOP 4 to hide instead of deleting).*

---

### SOP 4: Hiding or Showing a Section on the Live Website (1-Click)

> **Scenario**: An admissions campaign has ended and you want to temporarily remove the promotional banner without deleting the text and images.

1. In the sidebar, click the section you want to hide.
2. At the top of the main workspace, look for the **Visibility Toggle** (marked with an **Eye icon 👁️**).
3. Click **Hide Section**.
4. The icon will change to **EyeOff 🚫**, and the section is immediately hidden from the live website.
5. In the sidebar, an indicator will show that this section is currently inactive.
6. When the campaign returns next season, simply navigate back and click **Show Section**. Everything is restored instantly!

---

### SOP 5: Reordering Sections on a Webpage

> **Scenario**: You want the "Student Testimonials" section to appear above the "FAQ" section on the Law School homepage.

1. Select your portal in the sidebar (e.g., **Ishan Law School**).
2. In the top bar, toggle the mode from **Fields Editor** to **Section Movement & Layout**.
3. Select the page you wish to modify from the dropdown (e.g., **Home Page**).
4. You will see a vertical list of all sections on that page with their order numbers.
5. Click the **Up Arrow (↑)** or **Down Arrow (↓)** buttons next to any section to move it higher or lower.
6. The order updates immediately on the live website.

---

### SOP 6: Creating a Brand-New Custom Webpage (No Code)

> **Scenario**: You want to publish a dedicated page for a National Seminar or Alumni Meet with its own link.

1. In the sidebar, expand your target portal (e.g., **Ishan Teaching Hospital**).
2. Click **Custom Pages** (or **Dynamic Pages**).
3. Click the **+ Create New Page** button in the top right.
4. Enter the **Page Title** (e.g., `Panchkarma Health Camp 2026`).
5. Notice that the URL slug is generated automatically:
   `https://hospital.ishaninstitute.edu.in/p/panchkarma-health-camp-2026`
6. Select your page template:
   - **Standard Article**: Best for news, event details, and announcements (Title + Cover Image + Formatted Body text).
   - **Photo Gallery**: Best for campus festivals, hospital camps, and infrastructure showcases.
   - **Custom HTML**: For specialized third-party forms or interactive embeds.
7. Fill out the content and upload photos.
8. Ensure the **Status** toggle is set to **Published** (leave as **Draft** if you are still working on it).
9. Click **Save Page**. Your new webpage is now live!

---

### SOP 7: Multi-Site Broadcast (Post News to Multiple Colleges at Once)

> **Scenario**: The Ishan Group has announced an upcoming Annual Sports Day or Convocation that must appear on the IIMT, Pharmacy, Ayurveda, and Law websites at the same time.

1. Go to the **News & Events** section of any portal (e.g., *Ishan Group Central Portal*).
2. Click **+ Add Item**.
3. Enter the Headline, Event Date, Cover Image, and Description.
4. At the bottom of the form drawer, locate the **Broadcast to other portals?** section.
5. Check the boxes for each website where this news should be published:
   - [x] Ishan Institute of Management & Technology (`iimt`)
   - [x] Ishan Institute of Pharmacy (`pharmacy`)
   - [x] Ishan Ayurvedic Medical College (`ayurveda`)
   - [x] Ishan Law School (`legal`)
   - [x] Ishan Teaching Hospital (`hospital`)
6. Click **Save Item**. The backend automatically clones and publishes the announcement across all selected websites at once!

---

### SOP 8: Managing Student Leads & Exporting to Excel/CSV

> **Scenario**: The admissions counseling team needs a spreadsheet of all students who inquired about Pharmacy and Ayurveda courses this week.

1. In the left sidebar, click **Consolidated Leads** (near the top).
2. The central table will display all incoming leads in reverse chronological order.
3. **Filter by College**: Click the **All Institutions** dropdown and select **Ishan Institute of Pharmacy** or **Ishan Ayurvedic Medical College**.
4. **Search**: Type an applicant's name, phone number, or course in the search bar to find a specific inquiry.
5. **Export**: Click the **Export All (CSV)** button in the top right.
6. A `.csv` file will download to your computer, which you can open directly in **Microsoft Excel** or **Google Sheets**.

---

### SOP 9: Creating User Accounts & Restricting Access

> **Scenario**: You want to grant an assistant access to update only the Pharmacy Faculty and Pharmacy Notices, preventing them from modifying anything else.

*(This operation requires Super Admin privileges)*

1. In the left sidebar, click **Role Management**.
2. Click **+ Add New User**.
3. Enter their institutional email and assign a temporary password.
4. Set their Role to **Team Member**.
5. Click **Deploy User**.
6. On the new user card that appears:
   - **Permissions**: Check **Create** and **Update** (uncheck **Delete** to prevent accidental removals).
   - **Portal Assignment**: Leave *Full Access* OFF.
   - **Specific Sections**: Click to activate only the allowed tags:
     `pharmacy:faculty`, `pharmacy:news`, `pharmacy:notices`.
7. When that user logs in at **[ishan-admin.vercel.app](https://ishan-admin.vercel.app/)**, they will only see the specific sections you permitted.

---

## 🎯 Real-World Scenarios ("How Do I...")

| What do you want to do? | Where to go in the Admin Panel | SOP Reference |
| :--- | :--- | :--- |
| **Change the Director's Welcome Message** | Pick Portal ➔ `About Us` ➔ `Director's Desk` ➔ Edit text ➔ Click **Save** | [SOP 1](#sop-1-editing-existing-text-dates-or-phone-numbers) |
| **Add a new Doctor to the OPD Schedule** | `Hospital` ➔ `Doctors & Specialties` ➔ Click **+ Add Item** | [SOP 3](#sop-3-managing-lists--directories-faculty-doctors-faqs-courses) |
| **Upload NCISM / PCI / AICTE Mandatory Disclosure PDF** | Pick Portal ➔ `Disclosures` ➔ Click **Upload File** ➔ Select PDF ➔ Click **Save** | [SOP 2](#sop-2-uploading-photos--pdf-documents-brochures-disclosures) |
| **Download this week's admission inquiries** | Click **Consolidated Leads** ➔ Select College ➔ Click **Export All (CSV)** | [SOP 8](#sop-8-managing-student-leads--exporting-to-excelcsv) |
| **Take down an expired holiday notice** | Pick Portal ➔ `News & Events` ➔ Click **Delete** or toggle to **Hide** | [SOP 3](#sop-3-managing-lists--directories-faculty-doctors-faqs-courses) / [SOP 4](#sop-4-hiding-or-showing-a-section-on-the-live-website-1-click) |
| **Create a page for an upcoming College Festival** | Pick Portal ➔ `Custom Pages` ➔ Click **+ Create New Page** ➔ Publish | [SOP 6](#sop-6-creating-a-brand-new-custom-webpage-no-code) |
| **Swap the order of sections on the Homepage** | Pick Portal ➔ Switch to **Section Movement & Layout** ➔ Use **↑** / **↓** | [SOP 5](#sop-5-reordering-sections-on-a-webpage) |

---

## 💡 Troubleshooting, Cache Clearing & Pro Tips

#### 1. "I clicked Save, but the live website still shows old text."
Web browsers (Chrome, Edge, Safari) save copies of websites in their memory cache.
- **Solution**: Open the live website and press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac) to perform a hard refresh.
- Alternatively, check the live website in an **Incognito / Private Window**.

#### 2. "An image upload is taking too long or failing."
- Check the file size: files over 10 MB will take longer or fail on slow internet connections.
- Ensure the image file format is standard: `.jpg`, `.png`, `.webp`, or `.pdf` for documents.
- Avoid uploading RAW camera files directly; resize them to under 2 MB for best speed.

#### 3. "I accidentally deleted something. Can I undo it?"
- Deleted collection cards cannot be restored automatically.
- **Pro Tip**: If you aren't sure whether you will need a section again, **do not delete it**. Instead, click the **Hide (Eye icon 👁️)** to hide it from visitors while safely keeping all text and pictures saved in the system!

#### 4. "How do I preview a page before the public sees it?"
- In the top action bar, click **View live page ↗**. This opens the live site directly in a new browser tab.
- For custom pages, save them as **Draft** first. They will not be accessible to search engines or website visitors until you toggle the status to **Published**.

---

*Ishan Group of Institutions — Master Operations & Content Administration Workflow Manual*
