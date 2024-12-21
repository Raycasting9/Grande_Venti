// First, let's add our food items data and necessary functions
const menuItems = [
    { id: 1, name: "Americano", price: 4.50, image: "/menu/americano.png" },
    { id: 2, name: "Canoli", price: 4.00, image: "/menu/canoli.png" },
    { id: 3, name: "Caramel Machiato", price: 3.00, image: "/menu/caramel_machattio.png" },
    { id: 4, name: "Croissant", price: 3.50, image: "/menu/crossaint.png" },
    { id: 5, name: "Jasmine Tea", price: 2.50, image: "/menu/jasmine_tea.png" },
    { id: 6, name: "Tiramisu", price: 6.50, image: "/menu/tiramisu.png" },
    { id: 7, name: "Garlic Bread", price: 4.50, image: "/menu/garlic_bread.jpg" },
    { id: 8, name: "Vanilla Latte", price: 5.00, image: "/menu/vanilla_latte.png" },
    { id: 9, name: "Matcha Latte", price: 4.00, image: "/menu/matcha_latte.png" },
    { id: 10, name: "Muffin", price: 3.00, image: "/menu/muffin.jpg" },
    { id: 11, name: "Peach Tea", price: 5.50, image: "/menu/peach_tea.png" },
    { id: 12, name: "Scone", price: 2.50, image: "/menu/scone.jpg" }
];

let orderItems = {};

document.addEventListener("DOMContentLoaded", function() {
    displayMenuItems();
    updateTotal();

    // Add event listener for form submission
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Order submitted successfully!');
        }
    });
});

function displayMenuItems() {
    const gallery = document.getElementById('foodGallery');
    menuItems.forEach(item => {
        const itemElement = createFoodItem(item);
        gallery.appendChild(itemElement);
    });
}

function createFoodItem(item) {
    const div = document.createElement('div');
    div.className = 'food-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="food-image">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
            <button type="button" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span id="quantity-${item.id}">0</span>
            <button type="button" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
    `;
    return div;
}

function updateQuantity(itemId, change) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    let currentQuantity = parseInt(quantityElement.textContent);
    let newQuantity = Math.max(0, currentQuantity + change);
    
    quantityElement.textContent = newQuantity;
    
    const item = menuItems.find(i => i.id === itemId);
    if (newQuantity === 0) {
        delete orderItems[itemId];
    } else {
        orderItems[itemId] = {
            quantity: newQuantity,
            price: item.price
        };
    }
    
    updateTotal();
}

function updateTotal() {
    const total = Object.values(orderItems).reduce((sum, item) => {
        return sum + (item.quantity * item.price);
    }, 0);
    
    const orderButton = document.getElementById('orderButton');
    orderButton.textContent = `Order Now - Total: $${total.toFixed(2)}`;
    orderButton.disabled = total === 0;
}

function validateForm() {
    const required = ['name', 'email', 'phone'];
    for (let field of required) {
        const value = document.getElementById(field).value.trim();
        if (!value) {
            alert(`Please fill in your ${field}`);
            return false;
        }
    }
    
    if (Object.keys(orderItems).length === 0) {
        alert('Please select at least one item');
        return false;
    }
    
    return true;
}