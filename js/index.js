const buttomAddCart = document.querySelectorAll('.add-to-cart');
// Mover o foco para o body ou outro botão visível



buttomAddCart.forEach(button => { 
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = productElement.dataset.id;
        const nameProduct = productElement.querySelector('.name').textContent;
        const productImage = productElement.querySelector('img').getAttribute('src');
        const priceProduct = parseFloat(productElement.querySelector('.price').textContent.replace("R$ ", "").replace(".", "").replace(",", "."));

        const cart = getProduct();        
        const productExists = cart.find(product => product.id === productId);
        if(productExists){
            productExists.quantity += 1;
        }else{
            const product = {
                id: productId,
                name: nameProduct,
                image: productImage,
                price: priceProduct,
                quantity: 1
            }
            cart.push(product);
        } 
        saveProduct(cart);  
        updateAll();
    });
});

function saveProduct(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getProduct() {
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

const tableBody = document.querySelector("#modal-1-content table tbody");

tableBody.addEventListener("click", event => {
    if(event.target.classList.contains('btn-delete')){
        const id = event.target.dataset.id;
        removeFromCart(id);
    }
});

tableBody.addEventListener("input", event => {
    if(event.target.classList.contains("quantity-input")){
        const products = getProduct();
        const product = products.find(p => p.id === event.target.dataset.id);
        let newQuantity = parseInt(event.target.value);
        if (newQuantity < 1) {
            newQuantity = 1;
            event.target.value = 1;
        }
        if(product){
            product.quantity = newQuantity;
        }
        saveProduct(products);
        updateAll();
    }
});

function removeFromCart(id) {
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
}

function updateAll() {
    updateCart();
    updateTotalPrice();
    renderTableCart();
}

updateAll();
