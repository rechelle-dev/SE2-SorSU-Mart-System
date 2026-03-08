const products = [{
        name: "Pork Sisig with Rice",
        price: 140.00,
        rating: 4,
        reviews: 0,
        category: "Meals",
        desc: "A sizzling Filipino favorite. Chopped pork, onions, and chili peppers...",
        img: "licensed-image.jfif"
    },
    {
        name: "Leche Flan",
        price: 90.00,
        rating: 5,
        reviews: 0,
        category: "Desserts",
        desc: "A rich and creamy caramel custard dessert. Made with a traditional...",
        img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=400"
    },
    {
        name: "Cheesy Baked Macaroni",
        price: 150.00,
        rating: 4,
        reviews: 2,
        category: "Meals",
        desc: "A classic comfort food, our baked macaroni is loaded with a rich, meat...",
        img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=400"
    },
    {
        name: "Chocolate Chip Cookies",
        price: 75.00,
        rating: 5,
        reviews: 8,
        category: "Snacks",
        desc: "Homemade chocolate chip cookies loaded with chunky dark and milk chocolate...",
        img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400"
    },
    {
        name: "Chicken Adobo",
        price: 160.00,
        rating: 4,
        reviews: 12,
        category: "Meals",
        desc: "Tender chicken simmered in a savory soy-vinegar sauce with garlic and bay leaves...",
        img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd11b16?q=80&w=400"
    },

];

let currentCategory = 'all';
const MAX_CART_ITEMS = 30;
let cart = [];

// Cart Management
function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (!product) return;

    // Get total items currently in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Check if adding 1 more item exceeds limit
    if (totalItems >= MAX_CART_ITEMS) {
        showAlert(`Cart limit reached! Maximum ${MAX_CART_ITEMS} items allowed.`);
        return;
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        if (existingItem.quantity < MAX_CART_ITEMS) {
            existingItem.quantity++;
        } else {
            showAlert(`Cannot add more. Cart limit is ${MAX_CART_ITEMS} items.`);
            return;
        }
    } else {
        cart.push({
            name: productName,
            price: product.price,
            quantity: 1,
            img: product.img
        });
    }

    updateCart();
    showAlert(`${productName} added to cart!`);
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function updateQuantity(productName, quantity) {
    const cartItem = cart.find(item => item.name === productName);
    if (cartItem) {
        if (quantity <= 0) {
            removeFromCart(productName);
        } else if (quantity <= MAX_CART_ITEMS) {
            // Check total items don't exceed limit
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const difference = quantity - cartItem.quantity;

            if (totalItems + difference <= MAX_CART_ITEMS) {
                cartItem.quantity = quantity;
                updateCart();
            } else {
                showAlert(`Cannot exceed ${MAX_CART_ITEMS} items total.`);
            }
        }
    }
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart count badge
    document.getElementById('cart-count').textContent = totalItems;

    // Update cart items display
    const cartItemsContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₱${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    <p>₱${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-btn" onclick="removeFromCart('${item.name}')" title="Remove"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-items').textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    document.getElementById('cart-subtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `₱${subtotal.toFixed(2)}`;
}

function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'cart-alert';
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => alert.classList.add('show'), 100);
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('active');
}

function getCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.sort();
}

function loadProducts(filterCategory = 'all') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filteredProducts = filterCategory === 'all' ?
        products :
        products.filter(p => p.category === filterCategory);

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products in this category yet.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-badge">${product.category}</div>
                <div class="wishlist-icon"><i class="fa-regular fa-heart"></i></div>
                <img src="${product.img}" alt="${product.name}">
                <div class="card-body">
                    <h3>${product.name}</h3>
                    <div class="rating">
                        ${'<i class="fa-solid fa-star"></i>'.repeat(product.rating)}
                        ${'<i class="fa-regular fa-star"></i>'.repeat(5 - product.rating)}
                        <span style="color: grey">(${product.reviews} reviews)</span>
                    </div>
                    <p class="description">${product.desc}</p>
                    <div class="card-footer">
                        <span class="price">₱${product.price.toFixed(2)}</span>
                        <button class="add-cart-btn" onclick="addToCart('${product.name}')"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}

function loadCategories() {
    const filterContainer = document.getElementById('category-filter');
    const categories = getCategories();

    // Add category buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.setAttribute('data-category', category);
        btn.innerHTML = `
            <i class="fa-solid fa-tag"></i>
            <span>${category}</span>
        `;
        btn.addEventListener('click', () => filterByCategory(category));
        filterContainer.appendChild(btn);
    });
}

function filterByCategory(category) {
    currentCategory = category;

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Load filtered products
    loadProducts(category);
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();

    // Add click handler to 'All Products' button
    document.querySelector('[data-category="all"]').addEventListener('click', () => filterByCategory('all'));

    // Cart modal handlers
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showAlert('Your cart is empty!');
        } else {
            showAlert(`Proceeding to checkout with ${cart.reduce((sum, item) => sum + item.quantity, 0)} items!`);
            setTimeout(() => {
                cart = [];
                updateCart();
                toggleCart();
            }, 1500);
        }
    });
});