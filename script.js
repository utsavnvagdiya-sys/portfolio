
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


const style = document.createElement('style');
style.innerHTML = `
    .nav-link.active {
        opacity: 1;
        border-bottom: 2px solid white;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        if (!scrollToTopBtn) {
            const btn = document.createElement('button');
            btn.className = 'scroll-to-top';
            btn.innerHTML = '↑';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
                font-size: 20px;
                z-index: 999;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            `;
            btn.onmouseover = () => btn.style.opacity = '1';
            btn.onmouseout = () => btn.style.opacity = '0.8';
            btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.appendChild(btn);
        }
    }
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Contact Popup Logic
document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.querySelector('.close-popup');
    const contactPopup = document.getElementById('contactPopup');
    const popupContactForm = document.getElementById('popupContactForm');

    if (openPopupBtn && contactPopup && closePopupBtn) {
        // Open Popup
        openPopupBtn.addEventListener('click', () => {
            contactPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close Popup (X button)
        closePopupBtn.addEventListener('click', () => {
            contactPopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });

        // Close Popup (Clicking outside content)
        contactPopup.addEventListener('click', (e) => {
            if (e.target === contactPopup) {
                contactPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (popupContactForm) {
        popupContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = popupContactForm.querySelector('.popup-submit-btn');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                popupContactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                contactPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
    }
});

// Project Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400); // Match transition time
                    }
                });
            });
        });
    }
});

// Skills Progress Bar Animation
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.skill-bar-progress');
    
    if (progressBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        progressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
});

// Main Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const mainContactForm = document.getElementById('mainContactForm');
    
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = mainContactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.innerText;
            
            btnText.innerText = 'Sending Message...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Success! Your message has been sent. I will get back to you soon.');
                mainContactForm.reset();
                btnText.innerText = originalText;
                submitBtn.disabled = false;
            }, 1800);
        });
    }
});
