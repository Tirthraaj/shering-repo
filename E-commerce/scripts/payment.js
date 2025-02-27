document.addEventListener("DOMContentLoaded", () => {
    let totalPrice = localStorage.getItem("totalPrice") || 0;
    document.getElementById("final-total").innerText = `Total Amount: ₹${totalPrice}`;
});

function confirmOrder() {
    let paymentMethods = document.getElementsByName("payment-method");
    let selectedMethod = null;

    for (let method of paymentMethods) {
        if (method.checked) {
            selectedMethod = method.value;
            break;
        }
    }

    if (!selectedMethod) {
        alert("Please select a payment method!");
        return;
    }

    alert(`Your order is confirmed! Payment Mode: ${selectedMethod}`);
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    let totalPrice = localStorage.getItem("totalPrice") || 0;
    document.getElementById("final-total").innerText = `Total Amount: ₹${totalPrice}`;
    document.getElementById("confirm-btn").innerText = `Pay ₹${totalPrice}`;
});

function confirmOrder() {
    let paymentMethods = document.getElementsByName("payment-method");
    let selectedMethod = null;

    for (let method of paymentMethods) {
        if (method.checked) {
            selectedMethod = method.value;
            break;
        }
    }

    if (!selectedMethod) {
        alert("Please select a payment method!");
        return;
    }

    alert(`Your order is confirmed! Payment Mode: ${selectedMethod}`);
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    window.location.href = "index.html";
}

function downloadBill() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = localStorage.getItem("totalPrice") || 0;

    doc.setFontSize(16);
    doc.text("Tirthraj' stor Invoice", 80, 10);
    doc.setFontSize(12);
    doc.text("-------------------------------------------------", 10, 20);
    
    let y = 30;
    cartItems.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name}`, 10, y);
        doc.text(`₹${item.price}`, 170, y);
        y += 10;
    });

    doc.text("-------------------------------------------------", 10, y);
    doc.text(`Total: ₹${totalPrice}`, 150, y + 10);

    doc.save("Invoice.pdf");
}

document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let paymentTable = document.getElementById("payment-items");
    let totalPrice = 0;

    if (cartItems.length === 0) {
        paymentTable.innerHTML = "<tr><td colspan='2'>No items in cart</td></tr>";
    } else {
        cartItems.forEach(item => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price}</td>
            `;
            totalPrice += parseFloat(item.price);
            paymentTable.appendChild(row);
        });
    }

    document.getElementById("total-price").innerText = `₹${totalPrice.toFixed(2)}`;
});

document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let billBody = document.getElementById("bill-body");
    let finalTotal = document.getElementById("final-total");
    let confirmBtn = document.getElementById("confirm-btn");

    let totalPrice = 0;
    billBody.innerHTML = "";

    cartItems.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${item.name}</td><td>₹${item.price}</td>`;
        billBody.appendChild(row);
        totalPrice += parseFloat(item.price);
    });

    finalTotal.textContent = `₹${totalPrice.toFixed(2)}`;
    confirmBtn.textContent = `Pay ₹${totalPrice.toFixed(2)}`;
});

// Confirm Order
function confirmOrder() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "order-success.html"; 
}

// Download Bill as PDF
function downloadBill() {
    let billHTML = document.querySelector(".payment-container").innerHTML;
    let newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write("<html><head><title>Invoice</title></head><body>");
    newWindow.document.write(billHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
}
