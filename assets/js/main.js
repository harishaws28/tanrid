// Modern JavaScript for TanRid Website
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contact-form');
    const serviceModal = document.getElementById('service-modal');
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // Authentication Elements
    const registrationModal = document.getElementById('registration-modal');
    const loginModal = document.getElementById('login-modal');
    const tutorialsAccessModal = document.getElementById('tutorials-access-modal');
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const userStatus = document.getElementById('user-status');
    const userWelcome = document.getElementById('user-welcome');
    const logoutBtn = document.getElementById('logout-btn');
    const tutorialsAccessRequired = document.getElementById('tutorials-access-required');
    const tutorialsContent = document.getElementById('tutorials-content');

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollEffects();
        initModals();
        initContactForm();
        initAnimations();
        initAuthentication();
        initializeAuth();
        checkAuthenticationStatus();
        
        // No need to check hash-based tutorials access since we're using separate page
    });

    // Navigation Functions
    function initNavigation() {
        // Mobile menu toggle
        navToggle.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Update active link
                updateActiveNavLink(this);
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', updateNavOnScroll);
        
        // No need for hash change monitoring with separate tutorials page
    }

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }


    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function updateNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingNavLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Scroll Effects
    function initScrollEffects() {
        window.addEventListener('scroll', handleScroll);
    }

    function handleScroll() {
        const scrolled = window.scrollY;
        
        // Navbar background on scroll
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Animate skill bars when in view
        animateSkillBars();
        
        // Animate elements on scroll
        animateOnScroll();
    }

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .job-card, .career-value');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Modal Functions
    function initModals() {
        // Service modals
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                openServiceModal(service);
            });
        });

        // No portfolio modals needed - tutorials are on separate page

        // Close modals
        modalCloses.forEach(close => {
            close.addEventListener('click', closeModals);
        });

        // Close modals on outside click
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModals();
            }
        });

        // Close modals on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModals();
            }
        });
    }

    function openServiceModal(service) {
        const modalBody = document.getElementById('modal-body');
        const content = getServiceContent(service);
        modalBody.innerHTML = content;
        serviceModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }


    function closeModals() {
        serviceModal.style.display = 'none';
        portfolioModal.style.display = 'none';
        registrationModal.style.display = 'none';
        loginModal.style.display = 'none';
        tutorialsAccessModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Service Content
    function getServiceContent(service) {
        const serviceContent = {
            'product-dev': {
                title: 'Product Development',
                content: `
                    <div class="modal-service">
                        <h2>Product Development</h2>
                        <p>TanRid Software ensures the highest application quality and shortened development cycles by employing best-in-class Java EE application frameworks in our nearshore software development outsourcing engagements.</p>
                        <h3>Our Expertise Includes:</h3>
                        <ul>
                            <li>Application design and development on Java EE Framework</li>
                            <li>Expertise on Entity, Session and Message Beans</li>
                            <li>JSP & Servlets development</li>
                            <li>Java Messaging Services (JMS)</li>
                            <li>XML Web Services and B2B Integration: WSDL, UDDI, SOAP</li>
                            <li>Java EE Design Patterns implementation</li>
                            <li>Java EE-compliant Application Servers: BEA WebLogic, IBM WebSphere, Red Hat JBoss</li>
                        </ul>
                        <p>We provide design and development services designed to deliver software that efficiently utilizes the services available from Java Application Servers and the Java EE Framework.</p>
                    </div>
                `
            },
            'automation': {
                title: 'Automation Testing',
                content: `
                    <div class="modal-service">
                        <h2>Automation Testing</h2>
                        <p>Automated testing using tools like Selenium, JUnit, Quick Test Professional and LoadRunner can save significant amounts of time in testing. Our team has deep, practical experience with all automated testing tools.</p>
                        <h3>TanRid Test Automation Framework Features:</h3>
                        <ul>
                            <li>Flexibility to plug-in test scripts for new tests</li>
                            <li>Easy handling of changes to existing scripts</li>
                            <li>User-friendly execution with choice of script execution</li>
                            <li>Normalized scripts design for reusability and reduced redundancy</li>
                        </ul>
                        <h3>Our Automation Solutions:</h3>
                        <ul>
                            <li>API based automation</li>
                            <li>CLI (Command Line Interface) based automation</li>
                            <li>Unit testing automation</li>
                            <li>Functional testing automation using commercial and open-source tools</li>
                            <li>Performance testing automation</li>
                            <li>Creation of custom automation tools</li>
                        </ul>
                    </div>
                `
            },
            'performance': {
                title: 'Performance Testing',
                content: `
                    <div class="modal-service">
                        <h2>Performance Testing</h2>
                        <p>TanRid understands that performance and optimization are key for any application. We provide specialized techniques for performance testing under various loads and stress environments.</p>
                        <h3>Our Performance Testing Services:</h3>
                        <ul>
                            <li>Load testing to verify application behavior under expected load</li>
                            <li>Stress testing to determine breaking point of applications</li>
                            <li>Volume testing to verify application behavior with large amounts of data</li>
                            <li>Endurance testing for extended periods</li>
                            <li>Spike testing for sudden load increases</li>
                        </ul>
                        <p>The entire process is automated using scripts and the results are provided in easily understandable reports with actionable recommendations for performance improvements.</p>
                    </div>
                `
            },
            'manual': {
                title: 'Manual Testing',
                content: `
                    <div class="modal-service">
                        <h2>Manual Testing</h2>
                        <p>TanRid Quality Assurance team provides unbiased testing throughout the product lifecycle. Starting with development of a systematic test plan, our team conducts thorough testing to ensure your product is ready for market.</p>
                        <h3>Our Manual Testing Services:</h3>
                        <ul>
                            <li>Functionality testing to verify features work as expected</li>
                            <li>Boundary testing to check limits and edge cases</li>
                            <li>Error testing to ensure proper error handling</li>
                            <li>Usability testing for user experience validation</li>
                            <li>Acceptance testing to meet business requirements</li>
                            <li>Regression testing to ensure new changes don't break existing functionality</li>
                        </ul>
                        <p>Our systematic approach ensures comprehensive coverage and high-quality deliverables.</p>
                    </div>
                `
            },
            'management': {
                title: 'Test Management',
                content: `
                    <div class="modal-service">
                        <h2>Test Management</h2>
                        <p>TanRid offers robust Test methodology keeping our customer's budget and situation in mind. Testing software applications requires hundreds to thousands of unique test cases, efficient execution, and results management.</p>
                        <h3>Our Test Management Tools:</h3>
                        <ul>
                            <li>TestLink for open source test case management</li>
                            <li>Quality Center for comprehensive test management</li>
                            <li>Test Director for enterprise-level testing</li>
                            <li>SpiraTest for integrated test management</li>
                            <li>Test Track for defect and test case tracking</li>
                        </ul>
                        <h3>Why Test Strategy Matters:</h3>
                        <ul>
                            <li>Provides clear testing objectives and scope</li>
                            <li>Ensures efficient resource allocation</li>
                            <li>Establishes quality gates and criteria</li>
                            <li>Enables better risk management</li>
                        </ul>
                    </div>
                `
            },
            'mobile': {
                title: 'Mobile Testing',
                content: `
                    <div class="modal-service">
                        <h2>Mobile Testing</h2>
                        <p>With the proliferation of mobile devices, comprehensive mobile testing has become crucial. TanRid provides specialized mobile testing services across different platforms and devices.</p>
                        <h3>Our Mobile Testing Services:</h3>
                        <ul>
                            <li>Functional testing across iOS and Android platforms</li>
                            <li>Performance testing under various network conditions</li>
                            <li>Usability testing for mobile user experience</li>
                            <li>Compatibility testing across different devices and OS versions</li>
                            <li>Security testing for mobile applications</li>
                            <li>Battery and resource usage testing</li>
                        </ul>
                        <h3>Mobile Automation:</h3>
                        <ul>
                            <li>Appium-based test automation</li>
                            <li>Cross-platform test script development</li>
                            <li>Device cloud integration for testing</li>
                            <li>Continuous integration for mobile apps</li>
                        </ul>
                    </div>
                `
            }
        };

        return serviceContent[service]?.content || '<p>Service information not available.</p>';
    }

    // Portfolio Content
    function getPortfolioContent(portfolio) {
        const portfolioContent = {
            'api': {
                title: 'REST API Testing',
                content: `
                    <div class="modal-portfolio">
                        <h2>REST API Testing</h2>
                        <p>REST Assured is a popular framework for API test automation and REST API Testing. This is one of TanRid's framework choices for comprehensive API testing.</p>
                        <h3>API Testing Approach:</h3>
                        <ul>
                            <li>Send specific calls to the API and capture responses</li>
                            <li>Log expected vs actual results for validation</li>
                            <li>Capture timing and performance metrics</li>
                            <li>Test error handling and edge cases</li>
                            <li>Validate data integrity and security</li>
                        </ul>
                        <h3>Tools and Technologies:</h3>
                        <ul>
                            <li>REST Assured for Java-based API testing</li>
                            <li>Postman for manual API testing</li>
                            <li>Newman for automated Postman collection execution</li>
                            <li>JMeter for API performance testing</li>
                        </ul>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/vSgGae3HEgQ" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                `
            },
            'automation': {
                title: 'Introduction to Automation Testing',
                content: `
                    <div class="modal-portfolio">
                        <h2>Introduction to Automation Testing</h2>
                        <p>This tutorial provides a comprehensive introduction to test automation, covering fundamental concepts and best practices.</p>
                        <h3>TanRid Test Automation Methodology:</h3>
                        <p>Automation testing is a strategic approach in the software development cycle that reduces testing cycle time and enhances the quality of testing.</p>
                        <h3>Key Benefits:</h3>
                        <ul>
                            <li>Reduced testing cycle time</li>
                            <li>Enhanced testing quality and coverage</li>
                            <li>Consistent and repeatable test execution</li>
                            <li>Early detection of defects</li>
                            <li>Cost-effective for regression testing</li>
                        </ul>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/RbSlW8jZFe8" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                `
            },
            'ci': {
                title: 'Continuous Integration',
                content: `
                    <div class="modal-portfolio">
                        <h2>Continuous Integration Overview</h2>
                        <p>Continuous Integration (CI) is a software development practice that ensures changes to a project's code base are built, tested, reported on, and rapidly made available to all parties.</p>
                        <h3>CI Benefits:</h3>
                        <ul>
                            <li>Early feedback on software quality</li>
                            <li>Reduced integration issues</li>
                            <li>Automated build and test processes</li>
                            <li>Faster delivery of features</li>
                            <li>Improved team collaboration</li>
                        </ul>
                        <h3>CI Best Practices:</h3>
                        <ul>
                            <li>Frequent code commits</li>
                            <li>Automated testing at multiple levels</li>
                            <li>Fast build and test cycles</li>
                            <li>Immediate feedback on failures</li>
                        </ul>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/vuzQy33mNRA" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                `
            },
            'mobile': {
                title: 'Mobile Automation',
                content: `
                    <div class="modal-portfolio">
                        <h2>Mobile Automation with Appium</h2>
                        <p>Appium is an open-source test automation framework for testing native and hybrid mobile apps. It drives iOS and Android apps using the WebDriver protocol.</p>
                        <h3>Appium Advantages:</h3>
                        <ul>
                            <li>Cross-platform testing (iOS and Android)</li>
                            <li>Support for multiple programming languages</li>
                            <li>No need to modify application code</li>
                            <li>Integration with existing test frameworks</li>
                        </ul>
                        <h3>Mobile Testing Capabilities:</h3>
                        <ul>
                            <li>Native app testing</li>
                            <li>Hybrid app testing</li>
                            <li>Mobile web testing</li>
                            <li>Real device and simulator testing</li>
                        </ul>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/4RiieiylcnU" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                `
            },
            'framework': {
                title: 'Choosing Test Automation Framework',
                content: `
                    <div class="modal-portfolio">
                        <h2>Choosing a Test Automation Framework</h2>
                        <p>This article compares various test automation frameworks to help you make the right choice for your project needs.</p>
                        <h3>Popular Frameworks:</h3>
                        <ul>
                            <li><strong>Selenium:</strong> Web application testing with multiple language support</li>
                            <li><strong>PhantomJS:</strong> Headless browser for automated testing</li>
                            <li><strong>CasperJS:</strong> Navigation scripting and testing utility</li>
                            <li><strong>Cypress:</strong> Modern end-to-end testing framework</li>
                        </ul>
                        <h3>Selection Criteria:</h3>
                        <ul>
                            <li>Application type and technology stack</li>
                            <li>Team expertise and learning curve</li>
                            <li>Integration capabilities</li>
                            <li>Maintenance and support requirements</li>
                        </ul>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/9pVd4r_0K4k" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                `
            },
            'browser': {
                title: 'Cross Browser Testing',
                content: `
                    <div class="modal-portfolio">
                        <h2>Cross Browser Testing</h2>
                        <p>Cross-browser testing is the process of reviewing and comparing website functionality and styles across multiple browser platforms, operating systems, and mobile devices.</p>
                        <h3>Why Cross Browser Testing Matters:</h3>
                        <ul>
                            <li>Different browsers render CSS differently</li>
                            <li>JavaScript compatibility varies across browsers</li>
                            <li>HTML5 support differs between browser versions</li>
                            <li>User experience consistency across platforms</li>
                        </ul>
                        <h3>Testing Strategy:</h3>
                        <ul>
                            <li>Identify target browsers and versions</li>
                            <li>Prioritize based on user analytics</li>
                            <li>Test on real devices and browsers</li>
                            <li>Automate repetitive cross-browser tests</li>
                        </ul>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/aAzHPomVbUY" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                `
            }
        };

        return portfolioContent[portfolio]?.content || '<p>Portfolio information not available.</p>';
    }

    // Contact Form
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
    }

    function handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animations
    function initAnimations() {
        // Set initial states for animated elements
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .job-card, .career-value');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Trigger animations on scroll
        animateOnScroll();
    }

    // Utility function to debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add debounced scroll listener
    window.addEventListener('scroll', debounce(handleScroll, 10));

    // Authentication API Functions
    async function registerUser(userData) {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message);
            }

            // Set as current user in localStorage for session management
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            
            return result.user;
        } catch (error) {
            throw new Error(error.message || 'Registration failed. Please try again.');
        }
    }
    
    async function loginUser(email, password) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message);
            }

            // Set as current user in localStorage for session management
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            
            return result.user;
        } catch (error) {
            throw new Error(error.message || 'Login failed. Please try again.');
        }
    }

    // Authentication Functions
    function initAuthentication() {
        // Registration form
        if (registrationForm) {
            registrationForm.addEventListener('submit', handleRegistration);
        }
        
        // Login form
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Logout button
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        // Tutorial access buttons
        const showTutorialsLogin = document.getElementById('show-tutorials-login');
        const showTutorialsRegister = document.getElementById('show-tutorials-register');
        const accessLogin = document.getElementById('access-login');
        const accessRegister = document.getElementById('access-register');
        const showLogin = document.getElementById('show-login');
        const showRegister = document.getElementById('show-register');
        
        if (showTutorialsLogin) showTutorialsLogin.addEventListener('click', () => openLoginModal());
        if (showTutorialsRegister) showTutorialsRegister.addEventListener('click', () => openRegistrationModal());
        if (accessLogin) accessLogin.addEventListener('click', () => openLoginModal());
        if (accessRegister) accessRegister.addEventListener('click', () => openRegistrationModal());
        if (showLogin) showLogin.addEventListener('click', (e) => { e.preventDefault(); switchToLogin(); });
        if (showRegister) showRegister.addEventListener('click', (e) => { e.preventDefault(); switchToRegister(); });
        
        // Intercept tutorials navigation
        const tutorialsLink = document.getElementById('tutorials-link');
        if (tutorialsLink) {
            tutorialsLink.addEventListener('click', handleTutorialsAccess);
        }
    }
    
    function handleTutorialsAccess(e) {
        if (!isUserAuthenticated()) {
            e.preventDefault();
            tutorialsAccessModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            // User is authenticated, allow navigation to tutorials page
            window.location.href = 'tutorials.html';
        }
    }
    
    async function handleRegistration(e) {
        e.preventDefault();
        
        const formData = new FormData(registrationForm);
        const userData = {
            firstName: formData.get('firstname'),
            lastName: formData.get('lastname'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            company: formData.get('company') || ''
        };
        
        // Validation
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(userData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (userData.password.length < 6) {
            showNotification('Password must be at least 6 characters long.', 'error');
            return;
        }
        
        if (userData.password !== userData.confirmPassword) {
            showNotification('Passwords do not match.', 'error');
            return;
        }
        
        try {
            // Register user via API
            const user = await registerUser(userData);
            
            // Auto-login after registration
            updateUserStatus(user);
            showProtectedContent();
            
            // Close modal and show success
            closeModals();
            showNotification(`Welcome ${user.firstName}! Your account has been created successfully.`, 'success');
            
            // Navigate to tutorials page after successful registration
            window.location.href = 'tutorials.html';
            
            // Reset form
            registrationForm.reset();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
    
    async function handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Validation
        if (!email || !password) {
            showNotification('Please enter both email and password.', 'error');
            return;
        }
        
        try {
            // Login user via API
            const user = await loginUser(email, password);
            
            // Update UI
            updateUserStatus(user);
            showProtectedContent();
            
            // Close modal and show success
            closeModals();
            showNotification(`Welcome back, ${user.firstName}!`, 'success');
            
            // Navigate to tutorials page after successful login
            window.location.href = 'tutorials.html';
            
            // Reset form
            loginForm.reset();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
    
    function isUserAuthenticated() {
        return localStorage.getItem('currentUser') !== null;
    }
    
    function getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
    
    function checkAuthenticationStatus() {
        updateAuthenticationUI();
    }
    
    // Authentication functions
    function initializeAuth() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            updateUserStatus(user);
            showProtectedContent();
        } else {
            hideProtectedContent();
        }
    }

    function updateUserStatus(user) {
        if (userWelcome && userStatus) {
            userWelcome.textContent = `Welcome, ${user.firstName}`;
            userStatus.classList.add('logged-in');
        }
    }

    function showProtectedContent() {
        if (tutorialsAccessRequired && tutorialsContent) {
            tutorialsAccessRequired.style.display = 'none';
            tutorialsContent.style.display = 'grid';
            tutorialsContent.classList.add('authenticated');
        }
    }

    function hideProtectedContent() {
        if (tutorialsAccessRequired && tutorialsContent) {
            tutorialsAccessRequired.style.display = 'block';
            tutorialsContent.style.display = 'none';
            tutorialsContent.classList.remove('authenticated');
        }
    }

    function updateAuthenticationUI() {
        const user = getCurrentUser();
        
        if (user) {
            updateUserStatus(user);
            showProtectedContent();
        } else {
            // Hide user status
            if (userStatus) {
                userStatus.classList.remove('logged-in');
            }
            hideProtectedContent();
        }
    }
    
    function openRegistrationModal() {
        closeModals();
        registrationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function openLoginModal() {
        closeModals();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function switchToLogin() {
        registrationModal.style.display = 'none';
        loginModal.style.display = 'block';
    }
    
    function switchToRegister() {
        loginModal.style.display = 'none';
        registrationModal.style.display = 'block';
    }

    function handleLogout() {
        localStorage.removeItem('currentUser');
        hideProtectedContent();
        if (userStatus) {
            userStatus.classList.remove('logged-in');
        }
        showNotification('You have been logged out successfully.', 'success');
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            margin: 1rem 0;
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
        }
        
        .modal-service ul,
        .modal-portfolio ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .modal-service li,
        .modal-portfolio li {
            margin-bottom: 0.5rem;
            color: #64748b;
        }
        
        .modal-service h3 {
            color: #2563eb;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .tutorials-preview {
            display: flex;
            justify-content: center;
            margin-top: 3rem;
        }
        
        .preview-card {
            background: white;
            border-radius: 1rem;
            padding: 3rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .preview-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        
        .preview-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
        }
        
        .preview-icon i {
            font-size: 2rem;
            color: white;
        }
        
        .preview-card h3 {
            font-size: 2rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1rem;
        }
        
        .preview-card > p {
            color: #64748b;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .preview-features {
            list-style: none;
            padding: 0;
            margin: 2rem 0;
            text-align: left;
        }
        
        .preview-features li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 0;
            color: #4a5568;
            font-weight: 500;
        }
        
        .preview-features i {
            color: #48bb78;
            font-size: 1rem;
        }
        
        .auth-options {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .auth-options .btn {
            flex: 1;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            font-size: 1rem;
        }
        
        .auth-options .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .auth-options .btn-secondary {
            background: #f8fafc;
            color: #667eea;
            border: 2px solid #667eea;
        }
        
        .auth-options .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        @media (max-width: 768px) {
            .preview-card {
                padding: 2rem;
                margin: 0 1rem;
            }
            
            .auth-options {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

})();
