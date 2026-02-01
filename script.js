// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const svg = mobileMenuBtn.querySelector('svg');
    if (mobileMenu.classList.contains('active')) {
        svg.innerHTML = `
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"></line>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"></line>
        `;
    } else {
        svg.innerHTML = `
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"></line>
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"></line>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"></line>
        `;
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const svg = mobileMenuBtn.querySelector('svg');
        svg.innerHTML = `
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"></line>
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"></line>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"></line>
        `;
    });
});

// Filter Tabs Functionality
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Here you would typically filter the destinations
        // For now, we'll just show the active state
        console.log('Filter selected:', tab.textContent);
    });
});

// Mobile Filter Dropdown
const filterDropdown = document.querySelector('#destination-filter');
if (filterDropdown) {
    filterDropdown.addEventListener('change', (e) => {
        console.log('Mobile filter selected:', e.target.value);
        // Here you would filter the destinations based on selection
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.destination-card, .story-featured, .story-small, .service-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header scroll effect and Scroll to Top button
let lastScroll = 0;
const header = document.querySelector('.header');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Header shadow
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    }
    
    // Scroll to Top Button visibility
    if (currentScroll > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Scroll to Top functionality
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Destination card click handler
// Destination card click handler with Popup Logic
const destinationPopup = document.getElementById('destinationPopup');
const popupCloseBtn = document.querySelector('.popup-close');
const destinationCards = document.querySelectorAll('.destination-card');

destinationCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const title = card.querySelector('h3').textContent;
        const img = card.querySelector('img').src;
        
        // Short description as requested
        const description = `Discover the amazing beauty of ${title}. Explore unique local traditions and create unforgettable memories that will last a lifetime.`;
        
        // Populate Popup
        destinationPopup.querySelector('.popup-title').textContent = title;
        destinationPopup.querySelector('.popup-image img').src = img;
        destinationPopup.querySelector('.popup-description').textContent = description;
        
        // Show Popup
        destinationPopup.classList.add('active');
    });
});

// Close Popup Logic
if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', () => {
        destinationPopup.classList.remove('active');
    });
}

if (destinationPopup) {
    destinationPopup.addEventListener('click', (e) => {
        if (e.target === destinationPopup) {
            destinationPopup.classList.remove('active');
        }
    });
}

// Story card click handler
const storyCards = document.querySelectorAll('.story-featured, .story-small');
storyCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3, h4').textContent;
        console.log('Story clicked:', title);
        // Here you would navigate to story detail page
    });
});

// FAQ Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==========================================
// Multi-Page Initializations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Destinations Page Logic ---
    const categoryFilter = document.getElementById('categoryFilter');
    const destinationSearch = document.getElementById('destinationSearch');
    const destinationGrid = document.getElementById('destinationGrid');

    if (destinationGrid) {
        const cards = destinationGrid.querySelectorAll('.destination-card');
        
        function filterDestinations() {
            const category = categoryFilter ? categoryFilter.value : 'all';
            const query = destinationSearch ? destinationSearch.value.toLowerCase() : '';
            
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const title = card.getAttribute('data-title') ? card.getAttribute('data-title').toLowerCase() : '';
                
                const matchCat = category === 'all' || (cardCategory && cardCategory.includes(category));
                const matchSearch = title.includes(query);
                
                if (matchCat && matchSearch) {
                    card.style.display = 'block';
                    // Reset animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        }

        if (categoryFilter) categoryFilter.addEventListener('change', filterDestinations);
        if (destinationSearch) {
            destinationSearch.addEventListener('input', filterDestinations);
            const searchBtn = destinationSearch.nextElementSibling;
            if(searchBtn) searchBtn.addEventListener('click', filterDestinations);
        }

        // All detail logic is handled by the cards click listener
    }

    // --- Blog Page Logic ---
    const blogSearch = document.getElementById('blogSearch');
    const blogGrid = document.getElementById('blogGrid');
    
    if (blogGrid && blogSearch) {
        const articles = blogGrid.querySelectorAll('.story-item');
        
        blogSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            articles.forEach(article => {
                 const title = article.getAttribute('data-title') ? article.getAttribute('data-title').toLowerCase() : '';
                 if (title.includes(query)) article.style.display = 'flex';
                 else article.style.display = 'none';
            });
        });
    }

    // Blog Pagination (Visual Demo)
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
        const pageBtns = paginationContainer.querySelectorAll('.pagination-btn[data-page]');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                pageBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format WhatsApp Message
            const text = `*New Contact Inquiry from Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
            const encodedText = encodeURIComponent(text);
            
            // Open WhatsApp
            window.open(`https://wa.me/6281234567890?text=${encodedText}`, '_blank');
            
            // Optional: Reset form
            contactForm.reset();
        });
    }

});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Globe Trekker website loaded successfully!');

// --- Blog Detail: TOC & Share Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const tocList = document.querySelector('.toc-list');
    const tocHeader = document.querySelector('.toc-header');
    const blogContent = document.querySelector('.blog-content');

    if (tocList && blogContent) {
        const headings = blogContent.querySelectorAll('h2, h3');
        
        headings.forEach((heading, index) => {
            // Create unique ID for each heading
            const id = `heading-${index}`;
            heading.id = id;

            // Create TOC link
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            
            if (heading.tagName === 'H3') {
                a.classList.add('toc-h3');
            }
            
            li.appendChild(a);
            tocList.appendChild(li);
        });

        // Toggle TOC
        if (tocHeader) {
            tocHeader.addEventListener('click', () => {
                tocList.classList.toggle('hidden');
                const icon = tocHeader.querySelector('i');
                if (icon) {
                    icon.classList.toggle('bi-chevron-down');
                    icon.classList.toggle('bi-chevron-up');
                }
            });
        }
    }

    // Social Share Logic
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';

            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
});
