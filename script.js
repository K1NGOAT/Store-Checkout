// Store items with barcode, name, and price
const storeItems = {
  '860004186236': { name: 'N95 Face Masks', price: 15.99 },
  '036000214000': { name: 'Kleenex', price: 3.99 },
  '8809568749985': { name: 'Hand Sanitizer', price: 7.99 },
  '036500060480': { name: 'Printer Paper', price: 9.99 },
  '085014561877': { name: 'Brush Pens', price: 10.99 },
  'X0032YGP2T': { name: 'Multiport Adapter', price: 25.99 },
  '9780134682334': { name: 'iOS Programming Textbook', price: 119.99 },
  '718103230759': { name: 'Spiral Notebook', price: 1.99 },
  '888462022224': { name: 'iPad Mini', price: 599.99 }
};

// Cart object to store scanned items and their quantities
const cart = {};

// Function to validate the barcode and return item details
function getItem(barcode) {
  return storeItems[barcode] || null;
}

// Function to update the cart with scanned items
function addToCart(barcode, quantity) {
  const item = getItem(barcode);
  if (item) {
    // Ensure quantity is a valid number
    quantity = quantity ? quantity : 1;
    if (cart[barcode]) {
      cart[barcode].quantity += quantity;
    } else {
      cart[barcode] = { ...item, quantity };
    }
    updateTotal();
    displayCart();
  } else {
    console.log('Item not found.');
  }
}

// Function to calculate total price of items in the cart
function calculateTotal() {
  let total = 0;
  for (const barcode in cart) {
    if (cart.hasOwnProperty(barcode)) {
      total += cart[barcode].price * cart[barcode].quantity;
    }
  }
  return total.toFixed(2); // Returns total price with 2 decimal places
}

// Function to calculate grand total including tax
function calculateGrandTotal(total) {
  const taxRate = 0.0925;
  const grandTotal = total * (1 + taxRate);
  return grandTotal.toFixed(2); // Returns grand total with 2 decimal places
}

// Function to update the total price in the DOM
function updateTotal() {
  const total = calculateTotal();
  document.querySelector('#total').textContent = 'Total before tax: $' + total;
  document.querySelector('#grand-total').textContent = 'Grand Total (with tax): $' + calculateGrandTotal(total);
}

// Function to display the cart items in the DOM
function displayCart() {
  const cartElement = document.querySelector('#cart-items');
  cartElement.innerHTML = ''; // Clear the cart display
  for (const barcode in cart) {
    if (cart.hasOwnProperty(barcode)) {
      const item = cart[barcode];
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <span>${item.quantity}</span>
      `;
      cartElement.appendChild(itemElement);
    }
  }
}

// Event listeners
document.querySelector('#add-btn').addEventListener('click', () => {
  const barcode = document.querySelector('#barcode-input').value;
  let quantity = parseInt(document.querySelector('#quantity-input').value, 10);
  // Ensure quantity is a valid number
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }
  addToCart(barcode, quantity);
});
