// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Initialize cart count
// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    updateCartCount(); // Ensure cart count is updated on all pages
});

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
    showNotification('Item added to cart');
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update quantity function
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.querySelectorAll('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const subtotal = document.querySelector('.subtotal');
    const totalAmount = document.querySelector('.total-amount');
    
    // Update cart count everywhere
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.forEach(count => count.textContent = totalItems);

    // If not on cart page, stop here
    if (!cartItems) return;

    // Handle empty cart
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        if (subtotal) subtotal.textContent = 'UGX 0';
        if (totalAmount) totalAmount.textContent = 'UGX 0';
        return;
    }

    // Update cart items display with correct image paths
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="assets/images/${item.image.split('/').pop()}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>UGX ${item.price.toLocaleString()}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5000 : 0;
    const total = subtotalAmount + shipping;

    if (subtotal) subtotal.textContent = `UGX ${subtotalAmount.toLocaleString()}`;
    if (totalAmount) totalAmount.textContent = `UGX ${total.toLocaleString()}`;
}

// Show notification when item is added
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 100);
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});
// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
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
});
// Add this function to handle checkout navigation
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Update the checkout button state when cart changes
function updateCheckoutButton() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
    }
}

// Add this line to your existing updateCart function
function updateCart() {
    // ... existing updateCart code ...
    updateCheckoutButton();
}