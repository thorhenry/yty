// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    const closeSearch = document.querySelector('.close-search');
    const productCards = document.querySelectorAll('.product-card');

    // Create search results container
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results-container';
    searchBar.appendChild(searchResultsContainer);

    // Clone product grid for search results
    const productGrid = document.querySelector('.product-grid').cloneNode(true);
    searchResultsContainer.appendChild(productGrid);

    searchIcon.addEventListener('click', () => {
        searchBar.classList.add('active');
        document.body.classList.add('search-active');
        searchInput.focus();
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const cards = productGrid.querySelectorAll('.product-card');
        let hasResults = false;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const price = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || price.includes(searchTerm)) {
                card.classList.remove('hidden');
                hasResults = true;
            } else {
                card.classList.add('hidden');
            }
        });

        if (!hasResults && searchTerm) {
            showNoResults(searchTerm);
        } else {
            const noResults = searchResultsContainer.querySelector('.no-results');
            if (noResults) noResults.remove();
        }
    });

    function showNoResults(searchTerm) {
        const existing = searchResultsContainer.querySelector('.no-results');
        if (!existing) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>No products found for "${searchTerm}"</p>
                <p class="search-suggestion">Try different keywords</p>
            `;
            searchResultsContainer.appendChild(noResults);
        }
    }

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
        document.body.classList.remove('search-active');
        searchInput.value = '';
        const cards = productGrid.querySelectorAll('.product-card');
        cards.forEach(card => card.classList.remove('hidden'));
        const noResults = searchResultsContainer.querySelector('.no-results');
        if (noResults) noResults.remove();
    });
});

    // Search functionality with improved visibility
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let hasResults = false;
        
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const price = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || price.includes(searchTerm);
            
            if (matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                hasResults = true;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
        });

        updateNoResultsMessage(hasResults, searchTerm);
    });

    function updateNoResultsMessage(hasResults, searchTerm) {
        let message = document.querySelector('.no-results');
        
        if (!hasResults && searchTerm) {
            if (!message) {
                message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <p>No products found for "${searchTerm}"</p>
                    <p class="search-suggestion">Try different keywords</p>
                `;
                productGrid.appendChild(message);
            }
        } else if (message) {
            message.remove();
        }
    }

    function resetSearch() {
        productCards.forEach(card => {
            card.style.display = '';
            card.style.opacity = '1';
        });
        
        const message = document.querySelector('.no-results');
        if (message) {
            message.remove();
        }
    }

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            closeSearch.click();
        }
    });


// Single event listener for closing menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add to Cart Animation
const addToCartButtons = document.querySelectorAll('.product-card button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('bounce');
        setTimeout(() => {
            cartIcon.classList.remove('bounce');
        }, 1000);
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'white';
    }
});
// Add at the end of your main.js file
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const storyText = document.querySelector('.story-text');
    
    if (readMoreBtn && storyText) {
        // Set initial state
        const storyMore = storyText.querySelector('.story-more');
        if (storyMore) {
            storyMore.style.display = 'none';
        }
        
        readMoreBtn.addEventListener('click', function() {
            if (storyMore) {
                const isExpanded = storyMore.style.display === 'inline';
                storyMore.style.display = isExpanded ? 'none' : 'inline';
                readMoreBtn.textContent = isExpanded ? 'Read More' : 'Read Less';
            }
        });
    }
});
// Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const aboutMore = document.querySelector('.about-more');
    
    if (readMoreBtn && aboutMore) {
        readMoreBtn.addEventListener('click', function() {
            if (aboutMore.style.display === 'none' || aboutMore.style.display === '') {
                aboutMore.style.display = 'inline';
                readMoreBtn.textContent = 'Read Less';
            } else {
                aboutMore.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            }
        });
    }
});
