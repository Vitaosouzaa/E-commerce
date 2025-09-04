export function saveProduct(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getProduct() {
    const products = localStorage.getItem("cart");
    try {
        const parsed = JSON.parse(products);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function updateCart() {
    const cart = getProduct();
    let total = 0;

    cart.forEach(product => {
        total += product.quantity;
    });

    document.getElementById('cartCount').textContent = total;    
}

function renderTableCart() {
    const products = getProduct();
    const tableBody = document.querySelector("#modal-1-content tbody");
    tableBody.innerHTML = "";

    products.forEach(product => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-product">
            <img
                src="${product.image}"
                alt="${product.name}"
            />
            </td>
            <td>${product.name}</td>
            <td class="td-unitary-price">R$ ${product.price.toFixed(2).replace(".", ",")}</td>
            <td class="td-quantity">
                <input type="number" class="quantity-input" data-id="${product.id}" value="${product.quantity}" min="1">
            </td>
            <td class="td-price-total">R$ ${(product.price * product.quantity).toFixed(2).replace(".", ",")}</td>
            <td><button id="deletar" data-id="${product.id}" class="btn-delete"></button></td>`;
        tableBody.appendChild(tr);
    });
}

export function removeFromCart(id) {
    const products = getProduct();
    const updatedCart = products.filter(product => product.id !== id);

    saveProduct(updatedCart);
    updateAll();
}

function updateTotalPrice(){
    const products = getProduct();
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.price * product.quantity;
    });

    document.querySelector('#total-carrinho').textContent = `Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
    document.querySelector("#subtotal .value").textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

export function updateAll() {
    updateCart();
    updateTotalPrice();
    renderTableCart();
}
