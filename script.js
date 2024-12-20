document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is ready!");
    setQuantity(1);

    // Basic JavaScript code that must have at all projects
    function setQuantity(quantity) {
        document.getElementById('quantity').value = quantity;
    }

    // Example function to validate form
    function validateForm() {
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;

        if (!fname || !lname || !email || !phone || !address || !product || !quantity) {
            alert("All fields are required!");
            return false;
        }
        return true;
    }

    // Attach event listener to form submit
    document.querySelector('form').addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
});