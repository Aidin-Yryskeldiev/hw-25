let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
let total = parseFloat(sessionStorage.getItem("total")) || 0;
let cartItemsElement = document.querySelector("#cart-items");
let cartTotalElement = document.querySelector("#cart-total");

function saveCart() {
	sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
	sessionStorage.setItem("total", total);
}

function addToCart(item, price) {
	let existingItem = cartItems.find((cartItem) => cartItem.item === item);
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cartItems.push({ item: item, price: price, quantity: 1 });
	}
	total += price;
	saveCart();
	updateCart();
}

function deleteItem(index) {
	total -= cartItems[index].price * cartItems[index].quantity;
	cartItems.splice(index, 1);
	saveCart();
	updateCart();
}

function updateCart() {
	cartItemsElement.innerHTML = "";
	cartItems.forEach(function (cartItem, index) {
		let p = document.createElement("p");
		p.textContent =
			cartItem.item +
			" x" +
			cartItem.quantity +
			" - KGZ " +
			cartItem.price * cartItem.quantity;
		let deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Delete";
		deleteBtn.onclick = function () {
			deleteItem(index);
		};
		p.appendChild(deleteBtn);
		cartItemsElement.appendChild(p);
	});
	cartTotalElement.textContent = total.toFixed(2);
}
window.onload = updateCart;
