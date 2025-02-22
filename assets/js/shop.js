document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Fix hamburger menu toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Shop functionality
    const productGrid = document.querySelector('.product-grid');
    const sortSelect = document.getElementById('sort');
    const filters = document.querySelectorAll('.filter-group input');
    const priceRange = document.getElementById('price');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');

    // Load products from featured collection
    const products = [
        {
            id: 1,
            name: 'T-Shirts',
            price: 35000,
            image: 'assets/images/peach.png',
            category: 'tshirts'
        },
        {
            id: 2,
            name: 'Long Sleeves',
            price: 45000,
            image: 'assets/images/long_sleeve_black.png',
            category: 'tshirts'
        },
        {
            id: 3,
            name: 'Hoodies',
            price: 55000,
            image: 'assets/images/yellow_hoodie.png',
            category: 'hoodies'
        },
        {
            id: 4,
            name: 'Collar Shirt',
            price: 40000,
            image: 'assets/images/collar_white.png',
            category: 'tshirts'
        },
        {
            id: 5,
            name: 'Caps',
            price: 20000,
            image: 'assets/images/cap.png',
            category: 'caps'
        },
        {
            id: 6,
            name: 'Jerseys',
            price: 35000,
            image: 'assets/images/brown_hoodie.png',
            category: 'jerseys'
        }
    ];

    function renderProducts(productsToRender) {
        productGrid.innerHTML = productsToRender.map(product => `
            <div class="product-card" data-category="${product.category}" data-price="${product.price}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>UGX ${product.price.toLocaleString()}</p>
                <button onclick="addToCart({
                    id: ${product.id},
                    name: '${product.name}',
                    price: ${product.price},
                    image: '${product.image}'
                })">Add to Cart</button>
            </div>
        `).join('');
    }

    // Initial render
    renderProducts(products);

    // Sort functionality
    sortSelect.addEventListener('change', () => {
        const sortedProducts = [...products];
        switch(sortSelect.value) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Default sorting (by ID)
                sortedProducts.sort((a, b) => a.id - b.id);
        }
        renderProducts(sortedProducts);
    });

    // Filter functionality
    function applyFilters() {
        const selectedCategories = Array.from(filters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);

        const minPriceValue = parseInt(minPrice.value) || 0;
        const maxPriceValue = parseInt(maxPrice.value) || Infinity;

        const filteredProducts = products.filter(product => {
            const matchesCategory = selectedCategories.length === 0 || 
                                  selectedCategories.includes(product.category);
            const matchesPrice = product.price >= minPriceValue && 
                               product.price <= maxPriceValue;
            return matchesCategory && matchesPrice;
        });

        renderProducts(filteredProducts);
    }

    // Move toggleFilters outside of DOMContentLoaded
    function toggleFilters() {
        const filters = document.querySelector('.filters');
        const filterToggle = document.querySelector('.filter-toggle');
        
        filters.classList.toggle('active');
        filterToggle.classList.toggle('active');
        
        // Update button text
        const buttonText = filters.classList.contains('active') ? 'Close Filters' : 'Show Filters';
        filterToggle.innerHTML = `<i class="fas fa-filter"></i> ${buttonText}`;
    }

    function renderProducts(productsToRender) {
        productGrid.innerHTML = productsToRender.map(product => `
            <div class="product-card" data-category="${product.category}" data-price="${product.price}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>UGX ${product.price.toLocaleString()}</p>
                <button onclick="addToCart({
                    id: ${product.id},
                    name: '${product.name}',
                    price: ${product.price},
                    image: '${product.image}'
                })">Add to Cart</button>
            </div>
        `).join('');
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Add filter toggle button dynamically
        const productsHeader = document.querySelector('.products-header');
        const filterToggle = document.createElement('button');
        filterToggle.className = 'filter-toggle';
        filterToggle.innerHTML = '<i class="fas fa-filter"></i> Show Filters';
        filterToggle.onclick = toggleFilters;
        productsHeader.insertAdjacentElement('afterend', filterToggle);

        // Close filters when clicking outside
        document.addEventListener('click', (e) => {
            const filters = document.querySelector('.filters');
            const filterToggle = document.querySelector('.filter-toggle');
            if (!filters.contains(e.target) && !filterToggle.contains(e.target) && filters.classList.contains('active')) {
                toggleFilters();
            }
        });
    });
    filters.forEach(filter => filter.addEventListener('change', applyFilters));
    minPrice.addEventListener('input', applyFilters);
    maxPrice.addEventListener('input', applyFilters);
    priceRange.addEventListener('input', (e) => {
        maxPrice.value = e.target.value;
        applyFilters();
    });
    // Add this near the top of your existing code
    const filterToggleBtn = document.getElementById('filterToggle');
    const filtersPanel = document.querySelector('.filters');

    filterToggleBtn.addEventListener('click', () => {
        filtersPanel.classList.toggle('active');
        filterToggleBtn.classList.toggle('active');
        const isActive = filtersPanel.classList.contains('active');
        filterToggleBtn.innerHTML = `<i class="fas fa-filter"></i> ${isActive ? 'Hide Filters' : 'Show Filters'}`;
    });

    // Close filters when clicking outside
    document.addEventListener('click', (e) => {
        if (!filtersPanel.contains(e.target) && 
            !filterToggleBtn.contains(e.target) && 
            filtersPanel.classList.contains('active')) {
            filtersPanel.classList.remove('active');
            filterToggleBtn.classList.remove('active');
            filterToggleBtn.innerHTML = '<i class="fas fa-filter"></i> Show Filters';
        }
    });
});