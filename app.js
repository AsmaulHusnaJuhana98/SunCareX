// Product data
const products = [
  {
    id: 1,
    name: "Daily Defense Facial Sunscreen",
    description: "Lightweight, non-greasy formula perfect for everyday use. Protects against UVA and UVB rays while moisturizing your skin.",
    price: 24.99,
    spf: "SPF 30",
    image: "https://images.unsplash.com/photo-1556229174-5e42a09e40c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Ultra Protection Sport Sunscreen",
    description: "Water-resistant formula ideal for outdoor activities. Provides long-lasting protection even during swimming and sweating.",
    price: 19.99,
    spf: "SPF 50",
    image: "https://images.unsplash.com/photo-1594115810247-b4db68103865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Sensitive Skin Mineral Sunscreen",
    description: "Gentle, mineral-based formula designed for sensitive skin. Contains zinc oxide and titanium dioxide for natural protection.",
    price: 29.99,
    spf: "SPF 40",
    image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    name: "Tinted Moisturizer with Sunscreen",
    description: "Provides light coverage with sun protection. Perfect for a natural look while protecting your skin from harmful rays.",
    price: 34.99,
    spf: "SPF 25",
    image: "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    name: "Anti-Aging Sunscreen Serum",
    description: "Combines powerful anti-aging ingredients with broad-spectrum protection. Helps reduce fine lines while preventing sun damage.",
    price: 39.99,
    spf: "SPF 35",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a86c4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    name: "Beach Day Sunscreen Spray",
    description: "Easy-to-apply spray formula perfect for beach days. Provides full coverage with a quick-drying, non-sticky finish.",
    price: 22.99,
    spf: "SPF 50+",
    image: "https://images.unsplash.com/photo-1559303079-7f7f5e9d5a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

// DOM elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
const orderConfirmationModal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
const orderId = document.getElementById('order-id');

// Cart array
let cart = [];

// Display products
function displayProducts() {
  productList.innerHTML = '';
  
  products.forEach(product => {
    const productCol = document.createElement('div');
    productCol.className = 'col-md-4 mb-4';
    
    productCol.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <span class="spf-badge">${product.spf}</span>
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    
    productList.appendChild(productCol);
  });
  
  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Add to cart
function addToCart(event) {
  const productId = parseInt(event.target.getAttribute('data-id'));
  const product = products.find(p => p.id === productId);
  
  // Check if product is already in cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      spf: product.spf,
      image: product.image,
      quantity: 1
    });
  }
  
  updateCart();
  
  // Show notification
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 p-3';
  toast.style.zIndex = '11';
  toast.innerHTML = `
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Product Added</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${product.name} has been added to your cart.
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Update cart
function updateCart() {
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
    cartCount.textContent = '0';
    cartTotal.textContent = '0.00';
    return;
  }
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-2">
          <img src="${item.image}" alt="${item.name}" class="img-fluid">
        </div>
        <div class="col-md-4">
          <h5>${item.name}</h5>
          <p class="text-muted">${item.spf}</p>
        </div>
        <div class="col-md-2">
          $${item.price.toFixed(2)}
        </div>
        <div class="col-md-2">
          <div class="input-group">
            <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
            <span class="form-control text-center">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="col-md-1">
          $${itemTotal.toFixed(2)}
        </div>
        <div class="col-md-1">
          <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    
    cartItems.appendChild(cartItem);
  });
  
  // Update cart count and total
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
  
  // Add event listeners to cart buttons
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });
  
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });
  
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', removeItem);
  });
}

// Increase quantity
function increaseQuantity(event) {
  const productId = parseInt(event.target.getAttribute('data-id'));
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// Decrease quantity
function decreaseQuantity(event) {
  const productId = parseInt(event.target.getAttribute('data-id'));
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity -= 1;
    
    if (item.quantity === 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
  }
}

// Remove item
function removeItem(event) {
  const productId = parseInt(event.target.closest('.remove-item').getAttribute('data-id'));
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Checkout
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add some products before checkout.');
    return;
  }
  
  checkoutModal.show();
});

// Submit order
checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  
  const order = {
    customerName: name,
    email: email,
    phone: phone,
    address: address,
    paymentMethod: 'Cash on Delivery',
    products: cart.map(item => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      spf: item.spf
    })),
    totalPrice: parseFloat(cartTotal.textContent)
  };
  
  try {
    const response = await fetch('https://your-backend-url.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // Show order confirmation
      orderId.textContent = data._id || 'TEMP-' + Math.floor(Math.random() * 10000);
      checkoutModal.hide();
      orderConfirmationModal.show();
      
      // Clear cart
      cart = [];
      updateCart();
      
      // Reset form
      checkoutForm.reset();
    } else {
      // For demo purposes, show confirmation even if backend fails
      orderId.textContent = 'TEMP-' + Math.floor(Math.random() * 10000);
      checkoutModal.hide();
      orderConfirmationModal.show();
      
      // Clear cart
      cart = [];
      updateCart();
      
      // Reset form
      checkoutForm.reset();
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    
    // For demo purposes, show confirmation even if backend fails
    orderId.textContent = 'TEMP-' + Math.floor(Math.random() * 10000);
    checkoutModal.hide();
    orderConfirmationModal.show();
    
    // Clear cart
    cart = [];
    updateCart();
    
    // Reset form
    checkoutForm.reset();
  }
});

// Initialize
displayProducts();
updateCart();