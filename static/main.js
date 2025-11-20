async function loadAnnouncements() {
  try {
    const response = await fetch("./data/announcements.json");
    const announcements = await response.json();
    const container = document.getElementById("announcements-container");

    // Load announcements grid (only on home page)
    if (container) {
      container.innerHTML = announcements
        .map((announcement) => {
          const hasLink =
            typeof announcement.link === "string" &&
            announcement.link.trim() !== "";
          return `
        <div class="announcement-card">
          <h3>${announcement.title}</h3>
          <p>${announcement.abstract}</p>
          ${hasLink ? `<a href="${announcement.link}">Read More</a>` : ""}
        </div>
      `;
        })
        .join("");
    }

    // Load registration info from announcements (on both pages)
    const registrationAnnouncement = announcements.find(
      (a) => a.isRegistration
    );
    if (registrationAnnouncement) {
      const regInfo = document.getElementById("registration-info");
      if (regInfo) {
        regInfo.innerHTML = `
          <div class="registration-banner">
            <h3>${registrationAnnouncement.title}</h3>
            <p>${registrationAnnouncement.abstract}</p>
            <a href="${registrationAnnouncement.link}" target="_blank" class="registration-link">
              Start Registration →
            </a>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Error loading announcements:", error);
  }
}

async function loadNotification() {
  try {
    const response = await fetch("./data/notification.json");
    const notification = await response.json();
    const container = document.getElementById("notification-container");

    container.innerHTML = `
      <h3>📅 Next Exam</h3>
      <div class="exam-date">${notification.examDate}</div>
      <p>${notification.abstract}</p>
    `;
  } catch (error) {
    console.error("Error loading notification:", error);
  }
}

async function loadSchedule() {
  try {
    const response = await fetch("./data/schedule.json");
    const schedule = await response.json();
    const container = document.getElementById("schedule-container");

    container.innerHTML = schedule
      .map(
        (item) => `
      <div class="schedule-item">
        <span class="class-name">${item.class}</span>
        <span class="pickup-time">${item.pickupTime}</span>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading schedule:", error);
  }
}

async function loadContacts() {
  try {
    const response = await fetch("./data/contacts.json");
    const contacts = await response.json();
    const container = document.getElementById("contacts-container");

    container.innerHTML = contacts
      .map(
        (contact) => `
      <div class="contact-card">
        <h3>${contact.name}</h3>
        <div class="title">${contact.title}</div>
        <a href="mailto:${contact.email}">${contact.email}</a>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}

async function loadContent() {
  try {
    const response = await fetch("./data/content.json");
    const content = await response.json();

    const bullyingList = document.getElementById("bullying-list");
    bullyingList.innerHTML = content.bullying
      .map((item) => `<li>${item}</li>`)
      .join("");

    document.getElementById("our-school-content").textContent =
      content.ourSchool;
    document.getElementById("tagdv-content").textContent = content.tagdv;

    const mapContainer = document.getElementById("map-container");
    mapContainer.innerHTML = `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(
      content.location
    )}&output=embed" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

async function loadCalendarData() {
  try {
    console.log('Loading calendar data...');
    const response = await fetch('./data/calendar.json?t=' + Date.now());
    const data = await response.json();
    console.log('Calendar data loaded:', data);

    // Update academic year
    const yearValueEl = document.getElementById('year-value');
    console.log('Year value element:', yearValueEl);
    if (yearValueEl) {
      yearValueEl.textContent = data.academicYear;
      console.log('Set academic year to:', data.academicYear);
    }

    // Load calendar events
    const eventsContainer = document.getElementById('calendar-events');
    if (eventsContainer && data.events) {
      // Sort events by date
      const sortedEvents = data.events.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Group events by month
      const eventsByMonth = {};
      sortedEvents.forEach(event => {
        const date = new Date(event.date);
        const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!eventsByMonth[monthYear]) {
          eventsByMonth[monthYear] = [];
        }
        eventsByMonth[monthYear].push(event);
      });

      // Generate HTML for each month
      let html = '';
      Object.keys(eventsByMonth).forEach(monthYear => {
        html += `
          <div class="calendar-month">
            <h3 class="month-title">${monthYear}</h3>
            <div class="events-list">
        `;
        
        eventsByMonth[monthYear].forEach(event => {
          const date = new Date(event.date);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
          const day = date.getDate();
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          
          const eventClass = getEventClass(event.type);
          
          html += `
            <div class="event-item ${eventClass}">
              <div class="event-date">
                <div class="event-day">${day}</div>
                <div class="event-month">${month}</div>
                <div class="event-weekday">${dayOfWeek}</div>
              </div>
              <div class="event-details">
                <h4 class="event-title">${event.title}</h4>
                <p class="event-description">${event.description}</p>
              </div>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      eventsContainer.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading calendar data:', error);
  }
}

function getEventClass(type) {
  const classMap = {
    'opening': 'event-opening',
    'working': 'event-working',
    'holiday': 'event-holiday',
    'assessment': 'event-assessment',
    'annual': 'event-annual',
    'lastday': 'event-lastday',
    'conference': 'event-conference'
  };
  return classMap[type] || 'event-working';
}

async function loadContactUsData() {
  try {
    // Load contacts
    const contactsResponse = await fetch('/data/contacts.json');
    const contacts = await contactsResponse.json();
    
    // Load location from content
    const contentResponse = await fetch('/data/content.json');
    const contentData = await contentResponse.json();
    
    // Populate contacts grid
    const contactsGrid = document.getElementById('contacts-grid');
    if (contactsGrid) {
      contactsGrid.innerHTML = contacts.map(contact => `
        <div class="contact-card-large">
          <div class="contact-photo">
            <img src="/${contact.photo}" alt="${contact.name}" onerror="this.src='/images/default-avatar.png'">
          </div>
          <h3 class="contact-name">${contact.name}</h3>
          <p class="contact-title">${contact.title}</p>
          <a href="mailto:${contact.email}" class="contact-email">
            <span class="email-icon">✉️</span>
            ${contact.email}
          </a>
        </div>
      `).join('');
    }
    
    // Populate location
    const locationAddress = document.getElementById('location-address');
    if (locationAddress) {
      locationAddress.textContent = contentData.location;
    }
    
    // Update directions link
    const directionsLink = document.getElementById('directions-link');
    if (directionsLink) {
      directionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contentData.location)}`;
    }
    
    // Load map
    const mapContainer = document.getElementById('contact-map-container');
    if (mapContainer) {
      mapContainer.innerHTML = `<iframe src="https://www.google.com/maps?q=${encodeURIComponent(contentData.location)}&output=embed" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
    
  } catch (error) {
    console.error('Error loading contact us data:', error);
  }
}

async function loadTeamData() {
  try {
    const response = await fetch('./data/team.json?t=' + Date.now());
    const data = await response.json();
    
    // Populate team years menu in all pages
    const teamYearsMenu = document.getElementById('team-years-menu');
    if (teamYearsMenu) {
      teamYearsMenu.innerHTML = data.academicYears.map(yearData => `
        <li><a href="./team.html?year=${yearData.year}">${yearData.year}</a></li>
      `).join('');
    }
    
    // Only proceed if we're on the team page
    const teamContent = document.getElementById('team-content');
    if (!teamContent) return;
    
    // Get year from URL parameter or default to first year
    const urlParams = new URLSearchParams(window.location.search);
    const selectedYear = urlParams.get('year') || data.academicYears[0].year;
    
    // Find the selected year data
    const yearData = data.academicYears.find(y => y.year === selectedYear) || data.academicYears[0];
    
    // Populate year selector
    const yearSelector = document.getElementById('year-selector');
    if (yearSelector) {
      yearSelector.innerHTML = data.academicYears.map(y => `
        <button class="year-tab ${y.year === yearData.year ? 'active' : ''}" 
                onclick="window.location.href='/team.html?year=${y.year}'">
          ${y.year}
        </button>
      `).join('');
    }
    
    // Build team content HTML
    let html = '';
    
    // Core Team Section
    if (yearData.coreTeam && yearData.coreTeam.length > 0) {
      html += `
        <div class="core-team-section">
          <h2 class="section-heading">Core Team</h2>
          <div class="core-team-grid">
      `;
      
      yearData.coreTeam.forEach(member => {
        html += `
          <div class="core-team-card">
            <div class="core-team-photo">
              <img src="/${member.photo}" alt="${member.name}" onerror="this.src='/images/default-avatar.png'">
            </div>
            <h3 class="core-team-name">${member.name}</h3>
            <p class="core-team-role">${member.role}</p>
            <p class="core-team-role-tamil">${member.roleTamil}</p>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    // Classes Section
    if (yearData.classes && yearData.classes.length > 0) {
      html += `
        <div class="classes-section">
          <h2 class="section-heading">Teachers & Assistants</h2>
      `;
      
      yearData.classes.forEach(classData => {
        html += `
          <div class="class-card">
            <h3 class="class-title">${classData.title}</h3>
            <div class="class-content">
        `;
        
        // Teachers
        if (classData.teachers && classData.teachers.length > 0) {
          html += `
            <div class="teachers-section">
              <h4 class="subsection-title">Teachers</h4>
              <ul class="teacher-list">
                ${classData.teachers.map(teacher => `<li>${teacher}</li>`).join('')}
              </ul>
            </div>
          `;
        }
        
        // Assistants
        if (classData.assistants && classData.assistants.length > 0) {
          html += `
            <div class="assistants-section">
              <h4 class="subsection-title">Assistants</h4>
              <ul class="assistant-list">
                ${classData.assistants.map(assistant => `<li>${assistant}</li>`).join('')}
              </ul>
            </div>
          `;
        }
        
        html += `
            </div>
          </div>
        `;
      });
      
      html += `
        </div>
      `;
    }
    
    // Show message if no data
    if (!html) {
      html = `
        <div class="no-data-message">
          <p>Team information for ${yearData.year} will be updated soon.</p>
        </div>
      `;
    }
    
    teamContent.innerHTML = html;
    
  } catch (error) {
    console.error('Error loading team data:', error);
  }
}

function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".main-nav");
  const dropdowns = document.querySelectorAll(".has-dropdown");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 968) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  });

  document.querySelectorAll('.main-nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 968) {
        nav.classList.remove("active");
      }
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || !href) return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function initActiveNav() {
  // Check which page we're on
  const currentPath = window.location.pathname;
  const isRegistrationPage = currentPath.includes("registration.html");
  const isCurriculumPage = currentPath.includes("curriculum.html");
  const isFAQPage = currentPath.includes("faq.html");
  const isLibraryPage = currentPath.includes("library.html");
  const isTVAExamsPage = currentPath.includes("tvaexams.html");
  const isCalendarPage = currentPath.includes("calendar.html");
  const isContactUsPage = currentPath.includes("contactus.html");
  const isTeamPage = currentPath.includes("team.html");

  // Pages that should highlight Parents dropdown
  const isParentSubPage = isCurriculumPage || isFAQPage || isLibraryPage || isTVAExamsPage;

  if (isRegistrationPage) {
    // Highlight Registration menu item
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === "registration.html" ||
        link.getAttribute("href") === "/registration.html"
      ) {
        link.classList.add("active");
      }
    });
    return; // Exit early for registration page
  }

  if (isCalendarPage) {
    // Highlight Calendar menu item
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === "calendar.html" ||
        link.getAttribute("href") === "/calendar.html"
      ) {
        link.classList.add("active");
      }
    });
    return; // Exit early for calendar page
  }

  if (isContactUsPage) {
    // Highlight Contact Us menu item
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === "contactus.html" ||
        link.getAttribute("href") === "/contactus.html"
      ) {
        link.classList.add("active");
      }
    });
    return; // Exit early for contact us page
  }

  if (isTeamPage) {
    // Highlight About Us menu item for team pages
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      
      // Highlight parent "About Us" link
      if (href === "#about" || href === "/index.html#about") {
        link.classList.add("active");
      }
    });
    
    // Highlight the active year in the dropdown
    const urlParams = new URLSearchParams(window.location.search);
    const currentYear = urlParams.get("year");
    if (currentYear) {
      const dropdownLinks = document.querySelectorAll("#team-years-menu a");
      dropdownLinks.forEach((link) => {
        if (link.textContent.trim() === currentYear) {
          link.classList.add("active");
        }
      });
    }
    return; // Exit early for team page
  }

  if (isParentSubPage) {
    // Highlight the Parents menu item and the specific sub-menu item
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      
      // Highlight parent "Parents" link
      if (href === "#parents" || href === "/index.html#parents") {
        link.classList.add("active");
      }
      // The specific page link is already marked active in the HTML
    });
    return; // Exit early for parent sub-pages
  }

  // Original scroll-based navigation for home page
  const sections = document.querySelectorAll("section[id], main[id]");
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const hero = document.querySelector(".hero");

  function updateActiveNav() {
    let current = "";
    const scrollPosition = window.pageYOffset + 200;

    // Check if at top of page (hero section)
    if (window.pageYOffset < 300) {
      current = "home";
    } else {
      // Find current section based on scroll position
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });
    }

    // Update active class on nav links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (
        href === `#${current}` ||
        (href === "#home" && current === "home") ||
        (href === "#home" && !current)
      ) {
        link.classList.add("active");
      }
    });
  }

  // Initial call
  updateActiveNav();

  // Update on scroll with debouncing
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      updateActiveNav();
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation classes to sections
  document
    .querySelectorAll(
      ".section, .announcement-card, .contact-card, .schedule-item"
    )
    .forEach((el) => {
      el.classList.add("animate-on-scroll");
      observer.observe(el);
    });
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

function addStaggerAnimation() {
  const cards = document.querySelectorAll(".announcement-card, .contact-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

function initHeroInteractions() {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  // Mouse move parallax effect
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty("--mouse-x", `${x}%`);
    hero.style.setProperty("--mouse-y", `${y}%`);
  });

  // Add click ripple effect to CTA button
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }
}

async function loadRegistrationData() {
  try {
    const response = await fetch("./data/registration.json");
    const data = await response.json();

    // Update dropdown options with values from JSON
    updateDropdownOptions(data);

    // Load fee structure
    loadFeeStructure(data);

    // Load payment instructions
    loadPaymentInstructions(data);

    // Initialize fee calculator
    initFeeCalculator(data);
  } catch (error) {
    console.error("Error loading registration data:", error);
  }
}

function updateDropdownOptions(data) {
  // Update membership dropdown
  const membershipSelect = document.getElementById("membership");
  if (membershipSelect) {
    membershipSelect.innerHTML = `
      <option value="${data.membershipFees.new}">New Membership - $${data.membershipFees.new}</option>
      <option value="${data.membershipFees.existing}">Existing Membership Renewal - $${data.membershipFees.existing}</option>
      <option value="${data.membershipFees.life}">Life Membership - $${data.membershipFees.life}</option>
      <option value="${data.membershipFees.existingLife}">Existing Life Member - No Fee</option>
    `;
  }

  // Update payment mode help text with actual values
  const paymentLabel = document
    .querySelector('input[name="payment"][value="paypal"]')
    ?.parentElement?.parentElement?.querySelector("label");
  if (paymentLabel) {
    const helpText = paymentLabel.querySelector(".help-text");
    if (helpText) {
      helpText.textContent = `For PayPal: ${data.paymentModes.paypal.percentage}% + $${data.paymentModes.paypal.fee} transaction fee`;
    }
  }

  // Update teacher volunteer help text
  const teacherLabel = document
    .querySelector('input[name="teacher"]')
    ?.parentElement?.parentElement?.querySelector("label");
  if (teacherLabel) {
    const helpText = teacherLabel.querySelector(".help-text");
    if (helpText) {
      helpText.textContent = `Teacher volunteer gets $${data.discounts.teacherVolunteer} discount per family`;
    }
  }
}

function loadFeeStructure(data) {
  const container = document.getElementById("fee-structure");
  if (!container) return;

  const { feeStructure } = data;

  container.innerHTML = `
    <div class="fee-structure-card">
      <h3>${feeStructure.title}</h3>
      <p class="formula">${feeStructure.formula}</p>
      
      <div class="fee-section">
        <h4>A) ${feeStructure.sections.A.title}</h4>
        <ul>
          <li>$${data.studentFees.new} for new student</li>
          <li>$${data.studentFees.existing} for existing student</li>
        </ul>
      </div>

      <div class="fee-section">
        <h4>B) ${feeStructure.sections.B.title}</h4>
        <p>${feeStructure.sections.B.description}</p>
        <p class="note"><em>${feeStructure.sections.B.note}</em></p>
        <table class="fee-table">
          <thead>
            <tr>
              <th>TAGDV Membership Category</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${feeStructure.sections.B.categories[0].category}</td>
              <td>$${data.membershipFees.new} per family</td>
            </tr>
            <tr>
              <td>${feeStructure.sections.B.categories[1].category}</td>
              <td>$${data.membershipFees.existing} per family</td>
            </tr>
            <tr>
              <td>${feeStructure.sections.B.categories[2].category}</td>
              <td>$${data.membershipFees.life} per family</td>
            </tr>
            <tr>
              <td>${feeStructure.sections.B.categories[3].category}</td>
              <td>$${data.membershipFees.existingLife} per family</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="fee-section">
        <h4>C) ${feeStructure.sections.C.title}</h4>
        <p>${feeStructure.sections.C.description}</p>
      </div>
    </div>
  `;
}

function loadPaymentInstructions(data) {
  const container = document.getElementById("payment-instructions");
  if (!container) return;

  const { paymentInstructions } = data;

  container.innerHTML = `
    <div class="payment-card">
      <h3>${paymentInstructions.title}</h3>
      
      <div class="payment-method">
        <h4>1. ${paymentInstructions.check.title}</h4>
        <p>${paymentInstructions.check.description}</p>
        <div class="payment-steps">
          <h5>Steps to be followed while filling check:</h5>
          <div>
            ${paymentInstructions.check.steps
              .map((step) => `<p class="note">${step}</p>`)
              .join("")}
          </div>
        </div>
        <p class="collection-info">${
          paymentInstructions.check.collectionInfo
        }</p>
      </div>
      <div class="payment-method">
        <h4>2. ${paymentInstructions.paypal.title}</h4>
        <p class="fee-note">[${paymentInstructions.paypal.fee}]</p>
        <p>${paymentInstructions.paypal.description}</p>
        <div class="paypal-details">
          <strong>PAYPAL ID:</strong> <code>${
            paymentInstructions.paypal.email
          }</code>
        </div>
        <p class="note"><em>${paymentInstructions.paypal.note}</em></p>
        <p class="confirmation-note">${
          paymentInstructions.paypal.confirmationNote
        }</p>
      </div>

      <div class="additional-info">
        <p>Student Registration ID: New students once registered will receive the student registration ID.</p>
        <p>
        <strong>
            <a href="https://extontamilschool.org/faq.html" target="_blank">School/Classes Information</a>
        </strong></p>
      </div>
    </div>
  `;
}

function initFeeCalculator(data) {
  const numStudents = document.getElementById("num-students");
  const newStudents = document.getElementById("new-students");
  const membership = document.getElementById("membership");
  const teacherRadios = document.querySelectorAll('input[name="teacher"]');
  const paymentRadios = document.querySelectorAll('input[name="payment"]');

  // Check if all required elements exist (only on registration page)
  if (!numStudents || !newStudents || !membership || teacherRadios.length === 0 || paymentRadios.length === 0) {
    // Not on registration page, skip initialization
    return;
  }

  function calculateFees() {
    const totalStudents = parseInt(numStudents.value);
    const numNew = parseInt(newStudents.value);
    const numExisting = totalStudents - numNew;
    const membershipFee = parseInt(membership.value);
    
    // Add null checks for radio buttons
    const teacherChecked = document.querySelector('input[name="teacher"]:checked');
    const paymentChecked = document.querySelector('input[name="payment"]:checked');
    
    if (!teacherChecked || !paymentChecked) {
      return; // Exit if radio buttons aren't selected yet
    }
    
    const isTeacher = teacherChecked.value === "yes";
    const paymentMode = paymentChecked.value;

    // Calculate school fee (A)
    const schoolFee =
      numNew * data.studentFees.new + numExisting * data.studentFees.existing;

    // Membership fee (B)
    const membershipTotal = membershipFee;

    // Discount (C)
    const discount = isTeacher ? data.discounts.teacherVolunteer : 0;

    // Subtotal before payment fee
    const subtotal = schoolFee + membershipTotal - discount;

    // Payment fee
    let paymentFee = 0;
    if (paymentMode === "paypal") {
      paymentFee =
        (subtotal * data.paymentModes.paypal.percentage) / 100 +
        data.paymentModes.paypal.fee;
    }

    // Total
    const total = subtotal + paymentFee;

    // Update display
    const schoolFeeEl = document.getElementById("school-fee");
    const membershipFeeEl = document.getElementById("membership-fee");
    const discountEl = document.getElementById("discount-amount");
    const paymentFeeEl = document.getElementById("payment-fee");
    const totalEl = document.getElementById("total-amount");

    if (schoolFeeEl) schoolFeeEl.textContent = `$${schoolFee}`;
    if (membershipFeeEl) membershipFeeEl.textContent = `$${membershipTotal}`;
    if (discountEl) discountEl.textContent = `$${discount}`;
    if (paymentFeeEl) paymentFeeEl.textContent = `$${paymentFee.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Animate total
    if (totalEl) {
      totalEl.style.animation = "none";
      setTimeout(() => {
        totalEl.style.animation = "amountPulse 0.6s ease";
      }, 10);
    }
  }

  // Add event listeners
  numStudents.addEventListener("change", calculateFees);
  newStudents.addEventListener("change", calculateFees);
  membership.addEventListener("change", calculateFees);
  teacherRadios.forEach((radio) =>
    radio.addEventListener("change", calculateFees)
  );
  paymentRadios.forEach((radio) =>
    radio.addEventListener("change", calculateFees)
  );

  // Initial calculation
  calculateFees();
}

async function loadRegistrationContacts() {
  try {
    const response = await fetch("./data/contacts.json");
    const contacts = await response.json();
    const container = document.getElementById("registration-contacts");

    if (!container) return;

    // Filter specific contacts for registration page
    const registrationRoles = [
      "தலைமை ஒருங்கிணைப்பாளர்",
      "துணை ஒருங்கிணைப்பாளர்",
      "பொருளாளர்",
    ];
    const filteredContacts = contacts.filter((c) =>
      registrationRoles.some((role) => c.title.includes(role))
    );

    container.innerHTML = filteredContacts
      .map(
        (contact) => `
      <div class="contact-card small">
        <h4>${contact.name}</h4>
        <p class="role">${contact.title}</p>
        <a href="mailto:${contact.email}">${contact.email}</a>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading registration contacts:", error);
  }
}

async function loadFAQData() {
  try {
    // Load FAQ data
    const faqResponse = await fetch('./data/faq.json');
    const faqData = await faqResponse.json();

    // Load content data for location
    const contentResponse = await fetch('./data/content.json');
    const contentData = await contentResponse.json();

    // Load schedule data for pickup times
    const scheduleResponse = await fetch('./data/schedule.json');
    const scheduleData = await scheduleResponse.json();

    // Update location
    const locationEl = document.getElementById('faq-location');
    if (locationEl) {
      locationEl.textContent = contentData.location;
    }

    // Update academic year and school opens date
    const academicYearEl = document.getElementById('faq-academic-year');
    if (academicYearEl) {
      academicYearEl.textContent = faqData.academicYear;
    }

    const schoolOpensEl = document.getElementById('school-opens-date');
    if (schoolOpensEl) {
      schoolOpensEl.textContent = faqData.schoolOpensDate;
    }

    // Update drop-off time and day
    const dropoffTimeEl = document.getElementById('dropoff-time');
    if (dropoffTimeEl) {
      dropoffTimeEl.textContent = faqData.dropoffTime;
    }

    const dropoffDayEl = document.getElementById('dropoff-day');
    if (dropoffDayEl) {
      dropoffDayEl.textContent = faqData.dropoffDay;
    }

    // Update school district
    const schoolDistrictEl = document.getElementById('school-district');
    if (schoolDistrictEl) {
      schoolDistrictEl.textContent = faqData.schoolDistrict;
    }

    // Update security service
    const securityEl = document.getElementById('security-service');
    if (securityEl) {
      securityEl.textContent = faqData.securityService;
    }

    // Update textbook policy
    const textbookEl = document.getElementById('textbook-policy');
    if (textbookEl) {
      textbookEl.textContent = `${faqData.textbookPolicy}`;
    }

    // Update feedback URL
    const feedbackEl = document.getElementById('feedback-url');
    if (feedbackEl) {
      feedbackEl.href = faqData.feedbackUrl;
    }

    // Update pickup schedule
    const scheduleListEl = document.getElementById('pickup-schedule-list');
    if (scheduleListEl) {
      scheduleListEl.innerHTML = scheduleData.map(item => `
        <div class="schedule-row">
          <span class="class-name">${item.class}</span>
          <span class="pickup-time">${item.pickupTime}</span>
        </div>
      `).join('');
    }

  } catch (error) {
    console.error('Error loading FAQ data:', error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAnnouncements();
  loadNotification();
  loadSchedule();
  loadContacts();
  loadContent();
  loadRegistrationData();
  loadRegistrationContacts();
  loadFAQData();
  loadCalendarData();
  loadContactUsData();
  loadTeamData();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initScrollAnimations();
  initHeaderScroll();
  addStaggerAnimation();
  initHeroInteractions();
});
