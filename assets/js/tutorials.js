// Tutorials Page JavaScript - Authentication Required
(function() {
    'use strict';

    // Check authentication on page load
    document.addEventListener('DOMContentLoaded', function() {
        checkAuthenticationOnLoad();
        initTutorialsPage();
    });

    function checkAuthenticationOnLoad() {
        const currentUser = localStorage.getItem('currentUser');
        
        if (!currentUser) {
            // User is not authenticated, redirect to main page
            alert('Please sign in to access tutorials.');
            window.location.href = 'index.html';
            return;
        }

        // User is authenticated, show welcome message
        const user = JSON.parse(currentUser);
        const userWelcome = document.getElementById('user-welcome');
        if (userWelcome) {
            userWelcome.textContent = `Welcome, ${user.firstName}`;
        }
    }

    function initTutorialsPage() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('currentUser');
                alert('You have been logged out successfully.');
                window.location.href = 'index.html';
            });
        }

        // Tutorial cards functionality
        const tutorialCards = document.querySelectorAll('.tutorial-card');
        tutorialCards.forEach(card => {
            card.addEventListener('click', function() {
                const tutorial = this.getAttribute('data-tutorial');
                openTutorialModal(tutorial);
            });
        });

        // Modal functionality
        initModals();

        // Scroll effects
        initScrollEffects();
    }

    function initModals() {
        const modal = document.getElementById('tutorial-modal');
        const modalClose = document.querySelector('.modal-close');

        if (modalClose) {
            modalClose.addEventListener('click', closeTutorialModal);
        }

        // Close modal on outside click
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTutorialModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeTutorialModal();
            }
        });
    }

    function openTutorialModal(tutorial) {
        const modal = document.getElementById('tutorial-modal');
        const modalBody = document.getElementById('tutorial-modal-body');
        const content = getTutorialContent(tutorial);
        
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeTutorialModal() {
        const modal = document.getElementById('tutorial-modal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function getTutorialContent(tutorial) {
        const tutorialContent = {
            'api': {
                title: 'REST API Testing',
                content: `
                    <div class="modal-tutorial">
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
                        <div class="tutorial-actions">
                            <button class="btn btn-primary">Download Resources</button>
                            <button class="btn btn-secondary">Mark as Complete</button>
                        </div>
                    </div>
                `
            },
            'automation': {
                title: 'Introduction to Automation Testing',
                content: `
                    <div class="modal-tutorial">
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
                        <div class="tutorial-actions">
                            <button class="btn btn-primary">Download Resources</button>
                            <button class="btn btn-secondary">Mark as Complete</button>
                        </div>
                    </div>
                `
            },
            'ci': {
                title: 'Continuous Integration',
                content: `
                    <div class="modal-tutorial">
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
                        <div class="tutorial-actions">
                            <button class="btn btn-primary">Download Resources</button>
                            <button class="btn btn-secondary">Mark as Complete</button>
                        </div>
                    </div>
                `
            },
            'mobile': {
                title: 'Mobile Automation',
                content: `
                    <div class="modal-tutorial">
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
                        <div class="tutorial-actions">
                            <button class="btn btn-primary">Download Resources</button>
                            <button class="btn btn-secondary">Mark as Complete</button>
                        </div>
                    </div>
                `
            },
            'framework': {
                title: 'Choosing Test Automation Framework',
                content: `
                    <div class="modal-tutorial">
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
                        <div class="tutorial-actions">
                            <button class="btn btn-primary">Download Resources</button>
                            <button class="btn btn-secondary">Mark as Complete</button>
                        </div>
                    </div>
                `
            },
            'browser': {
                title: 'Cross Browser Testing',
                content: `
                    <div class="modal-tutorial">
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
                        <div class="tutorial-actions">
                            <button class="btn btn-primary">Download Resources</button>
                            <button class="btn btn-secondary">Mark as Complete</button>
                        </div>
                    </div>
                `
            }
        };

        return tutorialContent[tutorial]?.content || '<p>Tutorial content not available.</p>';
    }

    function initScrollEffects() {
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            
            // Navbar background on scroll
            if (scrolled > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }

            // Animate tutorial cards on scroll
            const tutorialCards = document.querySelectorAll('.tutorial-card');
            tutorialCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });

        // Set initial states for animated elements and make them immediately visible
        const tutorialCards = document.querySelectorAll('.tutorial-card');
        tutorialCards.forEach((card, index) => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            // Make cards visible immediately with a slight staggered animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100); // Stagger by 100ms per card
        });
    }

    // Add CSS for tutorials page
    const style = document.createElement('style');
    style.textContent = `
        .tutorials-page {
            padding: 120px 0 80px;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .tutorials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .tutorial-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .tutorial-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .tutorial-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        
        .tutorial-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        
        .tutorial-icon i {
            font-size: 1.5rem;
            color: white;
        }
        
        .tutorial-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1rem;
        }
        
        .tutorial-card p {
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .tutorial-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .tutorial-meta span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: #64748b;
        }
        
        .tutorial-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .tutorial-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .modal-tutorial {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .modal-tutorial h2 {
            color: #2d3748;
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        
        .modal-tutorial h3 {
            color: #2563eb;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }
        
        .modal-tutorial ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .modal-tutorial li {
            margin-bottom: 0.5rem;
            color: #64748b;
            line-height: 1.6;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            margin: 2rem 0;
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
        }
        
        .tutorial-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .tutorial-actions .btn {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }
        
        .tutorial-actions .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .tutorial-actions .btn-secondary {
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
        }
        
        .tutorial-actions .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .tutorials-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .tutorial-card {
                padding: 1.5rem;
            }
            
            .tutorial-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

})();
