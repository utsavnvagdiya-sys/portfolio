

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const currentTheme = localStorage.getItem('portfolio_theme');
        
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.replace('ph-sun', 'ph-moon');
                localStorage.setItem('portfolio_theme', 'light');
            } else {
                themeIcon.classList.replace('ph-moon', 'ph-sun');
                localStorage.setItem('portfolio_theme', 'dark');
            }
        });
    }

    // --- SCROLL REVEAL (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .separator, .separator-left, .separator-center, .separator-full');

    const revealOptions = {
        threshold: 0.05, // trigger sooner
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Basic toggle for mobile view
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-mobile-menu)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '2rem 0';
                navLinks.style.alignItems = 'center';
                navLinks.style.borderBottom = '1px solid var(--border)';
            }
        });
    }

    // --- CUSTOM SMOOTH SCROLL (Offset for fixed header) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // If mobile menu is open, close it on click
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }

                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- PROJECT MODALS LOGIC ---
    const projectsData = {
        "1": {
            title: "Maison Vue",
            category: "E-Commerce Architecture",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
            description: "Maison Vue is a luxurious digital storefront built for a high-end furniture brand. The objective was to create an elegant, seamless browsing experience that felt like flipping through a premium interior design magazine. <br><br>The project features custom webGL product viewers to inspect furniture from all angles, fluid page transitions that preserve context, and an elegant typographic scale based on Cormorant Garamond.",
            tech: ["React.js", "Three.js", "GSAP Animations", "Tailwind CSS", "Shopify API"]
        },
        "2": {
            title: "Aura Agency",
            category: "Corporate Identity & Web",
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600",
            description: "Aura Agency required a monochromatic, sophisticated web presence that communicated their creative expertise without overwhelming the user. <br><br>We developed a minimalist platform with dynamic scroll triggers, subtle noise maps for texture, and immersive storytelling elements that guide users through their portfolio.",
            tech: ["Vanilla JavaScript", "HTML5 Canvas", "CSS3 Variables", "Lenis Smooth Scroll"]
        },
        "3": {
            title: "Château",
            category: "Hospitality Platform",
            image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1600",
            description: "A breathtaking reservation platform for an exclusive winery and estate. Château needed a platform that invoked a sense of heritage while offering a modern booking experience. <br><br>The design utilizes classical typography, majestic imagery, and a custom-built availability calendar that feels bespoke and deeply integrated into the aesthetic.",
            tech: ["Next.js", "PostgreSQL", "Framer Motion", "Stripe API", "Node.js"]
        },
        "4": {
            title: "1998 Vintage",
            category: "Branding & Collection",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1600",
            description: "1998 Vintage is a dedicated platform for classic car enthusiasts. The project involved creating a digital brand identity that reflects the heritage and engineering excellence of vintage automobiles. <br><br>The website features a curated gallery of high-resolution professional photography, detailed specification sheets, and a 'heritage' timeline that tells the story of each vehicle.",
            tech: ["Vite", "Astro", "Tailwind CSS", "Intersection Observer"]
        },
        "5": {
            title: "Glow Essentials",
            category: "Skincare E-Commerce",
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1600",
            description: "Glow Essentials is a premium skincare platform that marries nature with science. The website showcases a range of 100% natural products, from argan oil night creams to vitamin C complexes. <br><br>The digital experience was designed to be as clean and soothing as the products themselves, using a light, breathable layout, high-key photography, and smooth interactions that emphasize the brand's commitment to sustainability and purity.",
            tech: ["HTML5", "CSS3 Variables", "Vanilla JavaScript", "GitHub Pages", "Responsive Design"]
        },
        "6": {
            title: "Grandview Realty",
            category: "Real Estate Architecture",
            image: "https://utsavnvagdiya-sys.github.io/Property-Listing/p4.png",
            description: "Grandview Realty is a sophisticated property listing platform dedicated to luxury real estate. The goal was to create a digital experience that reflects the elegance and refinement of the properties themselves. <br><br>The platform features high-resolution imagery, a minimalist interface, and an intuitive search system that allows users to explore prestigious residences with ease. Every element, from typography to layout, was carefully crafted to provide a premium and seamless journey for potential homeowners.",
            tech: ["Vanilla JavaScript", "HTML5", "CSS3", "Responsive Web Design", "UI/UX Optimization"]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const projectBtns = document.querySelectorAll('.project-btn');

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        // Populate Modal
        modalBody.innerHTML = `
            <img src="${data.image}" alt="${data.title}" class="modal-hero-img" loading="lazy">
            <p class="modal-category">${data.category}</p>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-text">${data.description}</p>
            <ul class="modal-tech-list">
                ${data.tech.map(t => `<li>${t}</li>`).join('')}
            </ul>
        `;

        // Show Modal
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (modalBody) modalBody.innerHTML = ''; // clear out after animation
        }, 500); // match css transition speed
    }

    if (projectBtns) {
        projectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                openModal(projectId);
            });
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // --- CUSTOM CURSOR LOGIC ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        if (cursorOutline) {
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .project-btn, .footer-social a').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'var(--accent-transparent)';
            }
            if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
            }
            if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = `${scrolled}%`;
    });

    // --- IMAGE PARALLAX EFFECT ---
    window.addEventListener('scroll', () => {
        const projectImages = document.querySelectorAll('.project-visual img');
        projectImages.forEach(img => {
            const parent = img.parentElement;
            const rect = parent.getBoundingClientRect();
            const winHeight = window.innerHeight;

            // Only animate if the element is in view
            if (rect.top < winHeight && rect.bottom > 0) {
                const shift = (rect.top - winHeight / 2) * -0.1;
                // Keep shift within reasonable bounds to avoid disappearing images
                const constrainedShift = Math.max(-80, Math.min(80, shift));
                img.style.transform = `scale(1.1) translateY(${constrainedShift}px)`;
            }
        });
    });
});


