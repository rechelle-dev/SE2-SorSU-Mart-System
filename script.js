const products = [
    {
        name: "Pork Sisig with Rice",
        price: 140.00,
        rating: 4,
        reviews: 0,
        desc: "A sizzling Filipino favorite. Chopped pork, onions, and chili peppers...",
        img: "licensed-image.jfif"
    },
    {
        name: "Leche Flan",
        price: 90.00,
        rating: 5,
        reviews: 0,
        desc: "A rich and creamy caramel custard dessert. Made with a traditional...",
        img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=400"
    },
    {
        name: "Cheesy Baked Macaroni",
        price: 150.00,
        rating: 4,
        reviews: 2,
        desc: "A classic comfort food, our baked macaroni is loaded with a rich, meat...",
        img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=400"
    },
    {
        name: "Ube Cheese Pandesal",
        price: 180.00,
        rating: 5,
        reviews: 1,
        desc: "A delightful twist on the classic Filipino bread. Soft, fluffy pandesal...",
        img: "https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=400"
    }
];

function loadProducts() {
    const grid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
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
                        <button class="add-cart-btn"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', loadProducts);