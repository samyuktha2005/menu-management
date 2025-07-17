
document.addEventListener("DOMContentLoaded", () => {
    loadMenuItems();
    document.getElementById('cart-icon').addEventListener('click', toggleCart);
});

async function loadMenuItems() {
    try {
        const response = await fetch('http://localhost:5000/api/menu');
        const data = await response.json();
        
        // Group items by category
        const categories = {};
        data.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });

        // Get containers
        const menuContainer = document.getElementById('menu');
        const categoryNav = document.getElementById('categoryNav');
        menuContainer.innerHTML = '';
        categoryNav.innerHTML = '';

        // Process each category that has items
        for (const [categoryName, items] of Object.entries(categories)) {
            if (items.length === 0) continue; // Skip empty categories
            
            // Create category navigation item
            const navItem = document.createElement('a');
            navItem.href = `#${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
            navItem.innerHTML = `
                <img src="${getCategoryImage(categoryName, items)}" alt="${categoryName}">
                <span>${categoryName.toUpperCase()}</span>
            `;
            categoryNav.appendChild(navItem);

            // Create category section
            const categorySection = document.createElement('div');
            categorySection.id = categoryName.toLowerCase().replace(/\s+/g, '-');
            categorySection.className = 'menu-category';
            
            const heading = document.createElement('h2');
            heading.textContent = categoryName.toUpperCase();
            heading.className = 'category-heading';
            
            const cardGroup = document.createElement('div');
            cardGroup.className = 'card-group';
            
            // Add all items for this category
            items.forEach(item => {
                cardGroup.appendChild(createMenuItemCard(item));
            });
            
            categorySection.appendChild(heading);
            categorySection.appendChild(cardGroup);
            menuContainer.appendChild(categorySection);
        }

        // Attach event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });

    } catch (err) {
        console.error('Error loading menu:', err);
    }
}

function getCategoryImage(categoryName, categoryItems = []) {
    // Try to find the first item in this category that has an image
    const itemWithImage = categoryItems.find(item => item.imageUrl);
    
    // If found, return that item's image
    if (itemWithImage) {
        return itemWithImage.imageUrl;
    }
    
    // If no items have images, fall back to default category images
    const defaultCategoryImages = {
        'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        'noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246',
        'dosa': 'https://images.unsplash.com/photo-1635661537606-d3437a78a7c0',
        'rice': 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
        'juice': 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a',
        'dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307'
    };
    
    // Try to find a matching default category
    const lowerCategory = categoryName.toLowerCase();
    return defaultCategoryImages[lowerCategory]
}

function createMenuItemCard(item) {
    const card = document.createElement('div');
    card.className = 'card m-2';
    card.setAttribute('data-id', item._id);
    card.setAttribute('data-available', item.available); // Add availability to dataset
    
    if (item.available === false) {
        card.classList.add('unavailable');
    }

    card.innerHTML = `
        <img src="${item.imageUrl || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
            <h3 class="card-title">${item.name}</h3>
            <p>$${item.price}</p>
            <p class="description">${item.description || ''}</p>
            ${item.available === false ? 
              '<button class="btn btn-secondary" disabled>Unavailable</button>' : 
              '<button class="btn btn-primary add-to-cart-btn">Add to cart</button>'}
        </div>
    `;
    return card;
}
// ---------------- CART MANAGEMENT ---------------- //

let listProducts = [];

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
}
function addToCart(event) {
    const productCard = event.target.closest('.card');
    const productId = productCard.getAttribute('data-id');
    const isAvailable = productCard.getAttribute('data-available') === 'true';
    
    // Double-check availability
    if (!isAvailable) {
        alert('This item is currently unavailable');
        return;
    }

    // Additional check - ensure the clicked button wasn't disabled
    if (event.target.disabled) {
        return;
    }

    const productName = productCard.querySelector('.card-title').innerText;
    const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));

    const existingProductIndex = listProducts.findIndex(item => item.id === productId);
    if (existingProductIndex > -1) {
        // Check if the existing item in cart is still available
        if (document.querySelector(`.card[data-id="${productId}"]`).getAttribute('data-available') === 'false') {
            listProducts.splice(existingProductIndex, 1); // Remove if now unavailable
            alert('This item is no longer available and has been removed from your cart');
            renderCart();
            return;
        }
        listProducts[existingProductIndex].quantity += 1;
    } else {
        listProducts.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            imageUrl: productCard.querySelector('.card-img-top').src,
            available: true // Track availability in cart
        });
    }

    renderCart();
}
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let totalAmount = 0;
    const unavailableItems = [];

    // First pass to check availability
    listProducts.forEach(product => {
        const itemCard = document.querySelector(`.card[data-id="${product.id}"]`);
        if (!itemCard || itemCard.getAttribute('data-available') === 'false') {
            unavailableItems.push(product.id);
        }
    });

    // Remove unavailable items
    listProducts = listProducts.filter(item => !unavailableItems.includes(item.id));

    // Render available items
    listProducts.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('image');
        imgDiv.innerHTML = `<img src="${product.imageUrl}" alt="${product.name}">`;

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.innerText = product.name;

        const priceDiv = document.createElement('div');
        priceDiv.classList.add('totalprice');
        const totalPrice = product.price * product.quantity;
        totalAmount += totalPrice;
        priceDiv.innerText = `$${totalPrice.toFixed(2)}`;

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity');
        quantityDiv.innerHTML = `
            <span class="minus" onclick="updateQuantity('${product.id}', 'decrease')">-</span>
            <span class="quantity">${product.quantity}</span>
            <span class="plus" onclick="updateQuantity('${product.id}', 'increase')">+</span>
        `;

        itemDiv.appendChild(imgDiv);
        itemDiv.appendChild(nameDiv);
        itemDiv.appendChild(priceDiv);
        itemDiv.appendChild(quantityDiv);

        cartItems.appendChild(itemDiv);
    });

    // Show message if items were removed
    if (unavailableItems.length > 0) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'alert alert-warning';
        messageDiv.textContent = `${unavailableItems.length} unavailable items were removed from your cart`;
        cartItems.prepend(messageDiv);
    }

    // ✅ Add this to ensure cart icon count updates
    updateCartIcon();
}

function updateQuantity(productId, action) {
    const productIndex = listProducts.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        if (action === 'increase') {
            listProducts[productIndex].quantity += 1;
        } else if (action === 'decrease') {
            if (listProducts[productIndex].quantity > 1) {
                listProducts[productIndex].quantity -= 1;
            } else {
                listProducts.splice(productIndex, 1);
            }
        }
    }
    renderCart();
}

function checkout() {
    localStorage.setItem('cartItems', JSON.stringify(listProducts));
    
    const totalAmount = listProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));

    window.location.href = 'checkout.html';
}

function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon').querySelector('span');
    const totalItems = listProducts.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.textContent = totalItems;
}

// Global functions
window.toggleCart = toggleCart;
window.updateQuantity = updateQuantity;
window.checkout = checkout;