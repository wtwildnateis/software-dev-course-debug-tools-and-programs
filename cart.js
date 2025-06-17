const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { 
    // debugger; // Used: debugger to inspect loop behavior during error testing

    total += cartItems[i].price;
  }
  return total; // Fixed: Changed loop condition from i <= cartItems.length to i < cartItems.length to avoid undefined access
}

function applyDiscount(total, discountRate) {
  if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
    console.warn("Invalid discountRate. Must be between 0 and 1."); // Used: console.warn() along with console.log() to trace values and invalid input behavior

    return total; // Fixed: Added input validation to ensure discountRate is between 0 and 1
  }
  return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  if (typeof total !== "number" || isNaN(total)) {
    return "Error: Invalid total provided.";
  }

  let receipt = "Items:\n";
  cartItems.forEach(item => {
    receipt += `${item.name}: $${item.price.toFixed(2)}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`;
  return receipt; // Fixed: Added check to ensure total is a valid number before calling toFixed()

}

// Debugging entry point
console.log("Starting shopping cart calculation...");

const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

// Edge Cases:

// Empty Cart Test
console.log("Empty Cart Test:");
console.log(generateReceipt([], applyDiscount(calculateTotal([]), 0.2)));

// Single Item Test
console.log("Single Item Test:");
console.log(generateReceipt([{ name: "Mouse", price: 25 }], applyDiscount(25, 0.1)));

// Discount Edge Cases
console.log("0% Discount Test:");
console.log(applyDiscount(100, 0)); // 100

console.log("100% Discount Test:");
console.log(applyDiscount(100, 1)); // 0

console.log("Invalid Discount Test:");
console.log(applyDiscount(100, -0.5)); // warning + 100


/*
How Developer Tools Helped Me!

Console Tab helped Me identify a runtime error caused by accessing `cartItems[i]` out of bounds.
Call Stack traced the error back to `calculateTotal()` function when rendering the DOM.
Sources Tab allowed placing breakpoints inside loops to inspect each iteration step-by-step.
The "debugger" keyword let me freeze execution and check variable values directly.