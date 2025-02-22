document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForm = document.getElementById('payment-form');
    const phoneInput = document.getElementById('phone');
    const modal = document.querySelector('.payment-modal');
    const closeModal = document.querySelector('.close-modal');
    let selectedProvider = '';

    // Load cart items and calculate total
    loadOrderSummary();

    // Payment provider selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedProvider = option.dataset.provider;
        });
    });

    // Phone number validation
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Form submission
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!selectedProvider) {
            alert('Please select a payment method');
            return;
        }

        const formData = new FormData(paymentForm);
        const phoneNumber = formData.get('phone');

        if (!validatePhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number');
            return;
        }

        // Show payment modal
        modal.classList.add('active');

        // Simulate payment processing
        setTimeout(() => {
            modal.classList.remove('active');
            alert('Payment successful! Thank you for your purchase.');
            window.location.href = 'index.html';
        }, 5000);
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    function validatePhoneNumber(phone) {
        return phone.length === 9 && /^[7][0-9]{8}$/.test(phone);
    }

    function loadOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderItems = document.querySelector('.order-items');
        const subtotalElement = document.querySelector('.subtotal .amount');
        const totalElement = document.querySelector('.total .amount');

        let subtotal = 0;
        const shipping = 5000;

        orderItems.innerHTML = cart.map(item => {
            subtotal += item.price * item.quantity;
            return `
                <div class="order-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>UGX ${item.price.toLocaleString()}</span>
                </div>
            `;
        }).join('');

        subtotalElement.textContent = `UGX ${subtotal.toLocaleString()}`;
        totalElement.textContent = `UGX ${(subtotal + shipping).toLocaleString()}`;
    }
});