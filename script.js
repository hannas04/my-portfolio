
        document.addEventListener('DOMContentLoaded', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('a[href^="#"]');
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuIcon = document.getElementById('mobileMenuIcon'); // Get the icon element
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');


            // Initially hide all sections except the hero section
            sections.forEach(section => {
                if (section.id !== 'hero') {
                    section.style.display = 'none';
                } else {
                    // Ensure hero section content is initially animated
                    section.querySelectorAll('.animated-content').forEach(element => {
                        element.classList.add('animate-in');
                    });
                }
            });

            navLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        // Hide all sections
                        sections.forEach(sec => {
                            sec.style.display = 'none';
                            // Remove animate-in class to reset animation for next view
                            sec.querySelectorAll('.animated-content').forEach(element => {
                                element.classList.remove('animate-in');
                            });
                        });

                        // Show the target section
                        targetSection.style.display = 'flex'; // Use flex for sections to center content

                        // Scroll to the top of the target section (or nearly top, considering sticky header)
                        const headerOffset = document.querySelector('.main-header').offsetHeight;
                        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Trigger fade-in animation for content within the target section
                        setTimeout(() => { // Small delay to ensure display:flex takes effect before animation
                            targetSection.querySelectorAll('.animated-content').forEach(element => {
                                element.classList.add('animate-in');
                            });
                            // Re-apply hero title animation if navigating back to hero
                            if (targetId === '#hero') {
                                document.querySelector('#hero .hero-title').style.animation = 'none'; // Reset animation
                                void document.querySelector('#hero .hero-title').offsetWidth; // Trigger reflow
                                document.querySelector('#hero .hero-title').style.animation = null; // Re-apply animation
                            }
                        }, 50); // A very small delay, adjust if needed

                        // Close mobile menu if open
                        if (mobileMenu && mobileMenu.classList.contains('active')) {
                            mobileMenu.classList.remove('active');
                            mobileMenuIcon.classList.remove('fa-xmark'); // Change icon back to bars
                            mobileMenuIcon.classList.add('fa-bars');
                        }
                    }
                });
            });

            // Update current year in the footer
            document.getElementById('currentYear').textContent = new Date().getFullYear();

            // Mobile menu toggle functionality
            if (mobileMenuButton && mobileMenu && mobileMenuIcon) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('active');
                    // Toggle icon between bars and xmark
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenuIcon.classList.remove('fa-bars');
                        mobileMenuIcon.classList.add('fa-xmark');
                    } else {
                        mobileMenuIcon.classList.remove('fa-xmark');
                        mobileMenuIcon.classList.add('fa-bars');
                    }
                });
            }

            // Handle contact form submission
            // Removed the old JavaScript handler as Formspree handles the submission directly
            // and redirects or sends a success message implicitly.
            // Formspree's default behavior is to redirect to a "Thank You" page or your specified URL.
            // You can configure Formspree to use AJAX for submission if you want to stay on the same page.
            // For now, we'll let Formspree handle the full form submission.

            // If you later decide to use AJAX for no page refresh, you would re-implement:
            /*
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    const formData = new FormData(this); // Use FormData to get all fields

                    try {
                        const response = await fetch(this.action, { // Use form's action attribute
                            method: this.method,
                            body: formData,
                            headers: {
                                'Accept': 'application/json' // Important for Formspree AJAX
                            }
                        });

                        if (response.ok) {
                            formMessage.textContent = 'Thank you for your message! I will get back to you shortly.';
                            formMessage.classList.remove('hidden');
                            formMessage.classList.add('text-green-600');
                        } else {
                            // Handle errors from Formspree
                            const data = await response.json();
                            if (data.errors) {
                                formMessage.textContent = data.errors.map(err => err.message).join(', ');
                            } else {
                                formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                            }
                            formMessage.classList.remove('hidden');
                            formMessage.classList.add('text-red-500');
                        }
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        formMessage.textContent = 'Network error. Please check your connection and try again.';
                        formMessage.classList.remove('hidden');
                        formMessage.classList.add('text-red-500');
                    }

                    contactForm.reset();
                    setTimeout(() => { formMessage.classList.add('hidden'); }, 5000);
                });
            }
            */
        });
    