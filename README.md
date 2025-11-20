# Exton Tamil Palli (ETP) Website

A modern, responsive website for the Exton Tamil Palli community school, dedicated to teaching Tamil language, culture, and values to the next generation.

## 🌟 Overview

Exton Tamil Palli is a community-driven, nonprofit initiative that brings together passionate teachers, supportive families, and eager learners to create an enriching environment where children can read, write, speak, and celebrate Tamil with confidence.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Data Management](#data-management)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Dynamic Content Loading**: JSON-based data management for easy updates
- **Multi-Page Architecture**: Organized navigation with 9 main pages
- **Interactive Navigation**: Active state detection and smooth scrolling
- **SEO Optimized**: Meta descriptions and proper semantic HTML
- **Performance Optimized**: Lazy loading images, cache busting for JSON data

### Key Sections
- **Home Page**: Announcements, notifications, contacts, and location
- **Registration**: Multi-step registration process with clear instructions
- **Curriculum**: TVA (Tamil Virtues Academy) curriculum overview
- **Calendar**: Color-coded academic events with monthly grouping
- **Library**: Book checkout system with rules and access information
- **Team**: Multi-year team structure with core team and teachers by class
- **FAQ**: Comprehensive answers to common questions
- **Contact**: Staff contact information with interactive map
- **TVA Exams**: Examination policies and guidelines

## 🛠 Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **Vanilla JavaScript**: ES6+ features, async/await, fetch API
- **JSON**: Data storage for dynamic content
- **Google Fonts**: Poppins and Noto Sans Tamil
- **Google Maps**: Embedded location map

## 📁 Project Structure

```
Src/
├── index.html              # Home page
├── registration.html       # Registration process
├── curriculum.html         # TVA curriculum
├── faq.html               # Frequently asked questions
├── library.html           # Library access and rules
├── tvaexams.html          # TVA exam information
├── calendar.html          # Academic calendar
├── contactus.html         # Contact information
├── team.html              # Team by academic year
├── data/
│   ├── announcements.json # Home page announcements
│   ├── contacts.json      # Staff contact details
│   ├── content.json       # General content (location, policies)
│   ├── notification.json  # Important notifications
│   ├── schedule.json      # Class schedule
│   ├── calendar.json      # Academic events
│   └── team.json          # Team structure by year
├── static/
│   ├── style.css          # Main stylesheet (~3200 lines)
│   └── main.js            # Main JavaScript (~1100 lines)
├── images/
│   ├── etp-logo.png       # School logo
│   ├── icon.png           # Favicon
│   ├── banner.png         # Hero banner
│   └── *.jpeg|*.png       # Team photos
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)
- Text editor (VS Code recommended)

### Installation

1. **Clone or download the project**
   ```bash
   cd "c:\Src\Tamil School Project\Src"
   ```

2. **Start a local server**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Using VS Code Live Server extension:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📄 Pages Overview

### Home Page (`index.html`)
- Hero section with school banner
- Dynamic announcements from `announcements.json`
- Important notifications from `notification.json`
- Class schedule from `schedule.json`
- Contact cards from `contacts.json`
- Embedded Google Maps location
- About sections (Our School, TAGDV, Bullying Prevention)

### Registration Page (`registration.html`)
- Four-step registration process
- Important notes and requirements
- Links to registration forms
- Registration fee information
- Documents needed section

### Curriculum Page (`curriculum.html`)
- TVA curriculum overview
- Level-wise breakdown (Pre-Primary to Grade 8)
- Learning objectives for each level
- Assessment criteria

### Calendar Page (`calendar.html`)
- Academic year display from `calendar.json`
- Monthly grouped events
- Color-coded event types:
  - 🏫 School Events (Blue)
  - 📚 Academic (Purple)
  - 🎉 Cultural (Orange)
  - 📝 Exams (Red)
  - 🔔 Reminders (Yellow)
  - ❌ No Classes (Gray)
  - ℹ️ Information (Cyan)

### Library Page (`library.html`)
- ETP Library portal access
- Library rules and policies
- Checkout instructions
- Contact information for queries

### Team Page (`team.html`)
- About ETP description
- Year selector (2025-2026 through 2018-2019)
- Core team with photos (Principal, VP, Treasurer)
- Class-wise teacher listings
- Assistant teacher information

### FAQ Page (`faq.html`)
- Categorized questions and answers
- Expandable/collapsible sections
- Academic year information
- Comprehensive school policies

### Contact Page (`contactus.html`)
- Staff contact cards with photos
- Email addresses
- Location map
- Contact roles and titles

### TVA Exams Page (`tvaexams.html`)
- TVA vs ATA comparison
- Exam policies and rules
- Registration information
- Important guidelines

## 📊 Data Management

### JSON Files Structure

#### `announcements.json`
```json
[
  {
    "title": "Announcement Title",
    "content": "Announcement content",
    "date": "2025-11-15"
  }
]
```

#### `calendar.json`
```json
{
  "academicYear": "2025-2026",
  "events": [
    {
      "date": "2025-12-20",
      "title": "Event Name",
      "type": "school",
      "description": "Event description"
    }
  ]
}
```

#### `team.json`
```json
{
  "academicYears": [
    {
      "year": "2025-2026",
      "coreTeam": [
        {
          "role": "Principal",
          "roleTamil": "தலைமை ஒருங்கிணைப்பாளர்",
          "name": "Name",
          "photo": "images/photo.jpeg"
        }
      ],
      "classes": [
        {
          "level": "level1",
          "title": "நிலை 1",
          "teachers": ["Teacher 1", "Teacher 2"],
          "assistants": ["Assistant 1"]
        }
      ]
    }
  ]
}
```

#### `contacts.json`
```json
[
  {
    "name": "Contact Name",
    "title": "Position",
    "email": "email@domain.com",
    "photo": "images/photo.png"
  }
]
```

## 🎨 Customization Guide

### Updating Content

#### 1. Change Announcements
Edit `data/announcements.json`:
```json
[
  {
    "title": "New Announcement",
    "content": "Your announcement text here",
    "date": "2025-11-20"
  }
]
```

#### 2. Update Calendar Events
Edit `data/calendar.json`:
- Modify `academicYear` for current year
- Add/remove events in `events` array
- Use event types: `school`, `academic`, `cultural`, `exam`, `reminder`, `no-class`, `information`

#### 3. Add/Update Team Members
Edit `data/team.json`:
- Update `coreTeam` for leadership
- Modify `classes` array for teachers and assistants
- Add photos to `images/` folder

#### 4. Update Contact Information
Edit `data/contacts.json`:
- Add/remove contact cards
- Update email addresses
- Add profile photos

### Styling Customization

#### CSS Variables
Modify colors in `static/style.css`:
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #f093fb;
  --text-dark: #2c3e50;
  --text-light: #5a6c7d;
  --background: #f8f9fa;
  --background-light: #f1f3f5;
  --white: #ffffff;
  --spacing-unit: 8px;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
```

#### Typography
Font families are loaded from Google Fonts:
- English: Poppins
- Tamil: Noto Sans Tamil

To change fonts, update the `<link>` in HTML head sections.

### Adding New Pages

1. **Create HTML file** based on existing page templates
2. **Include required elements**:
   - Favicon link
   - Meta description
   - CSS and JS links
   - Header with navigation
   - Footer
3. **Add navigation link** to all existing pages
4. **Update active state detection** in `static/main.js`

## 🌐 Deployment

### Local Testing
Test all pages before deployment:
```bash
# Check all links work
# Verify JSON data loads correctly
# Test on different screen sizes
# Validate HTML/CSS
```

### Production Deployment

#### Option 1: Static Hosting (Recommended)
- **Netlify**: Drop the `Src` folder or connect to Git
- **Vercel**: Import project and deploy
- **GitHub Pages**: Push to repository and enable Pages
- **AWS S3**: Upload files and configure bucket for static hosting

#### Option 2: Traditional Web Hosting
1. Upload entire `Src` folder via FTP/SFTP
2. Ensure proper file permissions
3. Configure web server for SPA routing if needed

### Pre-Deployment Checklist
- [ ] Update all content in JSON files
- [ ] Verify all images are uploaded
- [ ] Test all external links
- [ ] Check mobile responsiveness
- [ ] Validate all forms work
- [ ] Test navigation across all pages
- [ ] Verify favicon displays correctly
- [ ] Check page load times
- [ ] Test on multiple browsers

## 🌍 Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### Required Features
- ES6 JavaScript support
- CSS Grid and Flexbox
- Fetch API
- CSS Custom Properties

## 📱 Responsive Breakpoints

```css
/* Mobile First - Default styles */

/* Tablet - 768px and up */
@media (min-width: 768px) { }

/* Desktop - 968px and up */
@media (min-width: 968px) { }

/* Small mobile - 640px and down */
@media (max-width: 640px) { }
```

## 🔧 Maintenance

### Regular Updates
- **Weekly**: Update announcements and notifications
- **Monthly**: Add calendar events
- **Quarterly**: Review and update FAQ
- **Yearly**: Update team information for new academic year

### Performance Monitoring
- Check page load speeds
- Monitor JSON file sizes
- Optimize images (compress without quality loss)
- Review and remove unused CSS/JS

### Backup Strategy
- Keep backups of all JSON data files
- Version control with Git recommended
- Regular exports of content

## 🤝 Contributing

### For Content Updates
1. Edit the appropriate JSON file
2. Test locally
3. Deploy changes

### For Code Changes
1. Test thoroughly in all browsers
2. Maintain consistent code style
3. Update this README if adding features
4. Ensure backward compatibility

## 📞 Support

For technical issues or questions:
- **Email**: etp@s.tagdv.org
- **Website**: Visit the Contact Us page

## 📝 License

This project is created for Exton Tamil Palli, a nonprofit community initiative under TAGDV (Tamil Association of Greater Delaware Valley).

## 🙏 Acknowledgments

- TVA (Tamil Virtues Academy) for curriculum framework
- TAGDV for community support
- All teachers, volunteers, and families of ETP

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Maintained by**: ETP Technical Team
