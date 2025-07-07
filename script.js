// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Search functionality (basic)
function createSearchFunction() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar direitos...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 10px 15px;
        border: 2px solid #2563eb;
        border-radius: 25px;
        background: white;
        z-index: 999;
        display: none;
        width: 250px;
        font-family: inherit;
    `;
    
    document.body.appendChild(searchInput);
    
    // Toggle search with Ctrl+F or Cmd+F
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
            if (searchInput.style.display === 'block') {
                searchInput.focus();
            }
        }
        
        if (e.key === 'Escape') {
            searchInput.style.display = 'none';
            clearHighlights();
        }
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        clearHighlights();
        
        if (searchTerm.length > 2) {
            highlightText(searchTerm);
        }
    });
}

function highlightText(searchTerm) {
    const cards = document.querySelectorAll('.card, .contact-card');
    cards.forEach(card => {
        const textContent = card.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
            card.style.background = '#fef3c7';
            card.style.border = '2px solid #f59e0b';
        }
    });
}

function clearHighlights() {
    const cards = document.querySelectorAll('.card, .contact-card');
    cards.forEach(card => {
        card.style.background = '';
        card.style.border = '';
    });
}

// Initialize search functionality
createSearchFunction();

// // Accessibility improvements
// document.addEventListener('DOMContentLoaded', function() {
//     // Add skip to content link
//     const skipLink = document.createElement('a');
//     skipLink.href = '#direitos-fundamentais';
//     skipLink.textContent = 'Pular para o conteúdo principal';
//     skipLink.className = 'skip-link';
//     skipLink.style.cssText = `
//         position: absolute;
//         top: -40px;
//         left: 6px;
//         background: #2563eb;
//         color: white;
//         padding: 8px;
//         text-decoration: none;
//         border-radius: 4px;
//         z-index: 1001;
//         transition: top 0.3s;
//     `;
    
//     skipLink.addEventListener('focus', function() {
//         this.style.top = '6px';
//     });
    
//     skipLink.addEventListener('blur', function() {
//         this.style.top = '-40px';
//     });
    
//     document.body.insertBefore(skipLink, document.body.firstChild);
    
//     // Add ARIA labels to cards
//     const cards = document.querySelectorAll('.card');
//     cards.forEach((card, index) => {
//         card.setAttribute('role', 'article');
//         card.setAttribute('aria-labelledby', `card-title-${index}`);
//         const title = card.querySelector('h3');
//         if (title) {
//             title.id = `card-title-${index}`;
//         }
//     });
    
//     // Add ARIA labels to contact cards
//     const contactCards = document.querySelectorAll('.contact-card');
//     contactCards.forEach((card, index) => {
//         card.setAttribute('role', 'article');
//         card.setAttribute('aria-labelledby', `contact-title-${index}`);
//         const title = card.querySelector('h3');
//         if (title) {
//             title.id = `contact-title-${index}`;
//         }
//     });
// });

// Print functionality
function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Imprimir';
    printButton.className = 'btn btn-secondary print-btn';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
}

// Initialize print button
addPrintButton();

// Back to top button
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(backToTopButton);
}

// Initialize back to top button
addBackToTopButton();

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Navigate sections with arrow keys when focused
    if (e.target.matches('.nav-menu a')) {
        const links = Array.from(document.querySelectorAll('.nav-menu a'));
        const currentIndex = links.indexOf(e.target);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % links.length;
            links[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? links.length - 1 : currentIndex - 1;
            links[prevIndex].focus();
        }
    }
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.src && !img.dataset.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=';
            }
            imageObserver.observe(img);
        });
    }
});

console.log('Site "Direitos da Pessoa com Câncer" carregado com sucesso!');

