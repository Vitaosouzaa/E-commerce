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
    document.querySelector("#subtotal .value").textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

function updateAll() {
    updateCart();
    updateTotalPrice();
    renderTableCart();
}

updateAll();

async function freightCalculate(zipcode) {
    calculateFreight.disabled = true;
    const originalTextButton = calculateFreight.textContent;
    calculateFreight.textContent = "Calculando frete...";

    const url = 'http://localhost:5678/webhook/0ed9fca0-65b8-4d66-b50d-de5f718936fd';
    try {
        console.log('Iniciando cálculo de frete para o CEP:', zipcode);

        const medidasResponse = await fetch('./js/medidas.json');
        if (!medidasResponse.ok) {
            throw new Error(`Erro ao carregar medidas.json: ${medidasResponse.status}`);
        }
        const medidas = await medidasResponse.json();
        console.log('Medidas carregadas:', medidas);

        const cart = getProduct();
        console.log('Produtos no carrinho:', cart);

        const products = cart.map(product => {
            const medida = medidas.find(m => m.id === product.id);
            return {
                quantity: product.quantity,
                height: medida ? medida.height : 4,
                length: medida ? medida.length : 30,
                width: medida ? medida.width : 25,
                weight: medida ? medida.weight : 0.25
            };
        });
        console.log('Dados dos produtos para envio:', products);

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ zipcode, products })
        });

        console.log('Status da resposta da API:', resposta.status);

        if (!resposta.ok) {
            throw new Error(`Erro na API de frete: ${resposta.status}`);
        }

        const resultado = await resposta.json();
        console.log('Resposta completa da API:', resultado);

        // Extraindo o valor correto do frete
        if (!resultado || typeof resultado.price !== 'number') {
            console.error('Resposta inválida da API:', resultado);
            throw new Error('Resposta da API não contém a propriedade "price" ou ela não é um número.');
        }

        return resultado.price; // Usando a propriedade "price" como valor do frete
    } catch (erro) {
        console.error('Erro ao calcular frete:', erro);
        return null;
    } finally {
        calculateFreight.disabled = false;
        calculateFreight.textContent = originalTextButton;
    }
}

const calculateFreight = document.getElementById('calculate-freight');
const inputZipcode = document.getElementById('input-zipcode');
const freightValue = document.getElementById('freight-value');

inputZipcode.addEventListener("keydown", () => {
    if (event.key === "Enter") {
        calculateFreight.click();
    };
});

calculateFreight.addEventListener('click', async () => {
    const zipcode = inputZipcode.value.trim();
    
    const errorZipCode = document.querySelector(".error");
    if (!zipcodeValidate(zipcode)) {
        errorZipCode.textContent = "CEP inválido";
        errorZipCode.style.display = "block";
        return;
    }

    const freightValue = await freightCalculate(zipcode);
    if (freightValue === null || isNaN(freightValue)) {
        errorZipCode.textContent = "Erro ao calcular frete";
        errorZipCode.style.display = "block";
        return;
    }

    const formatedPrice = freightValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('freight-value').textContent = `Valor do Frete: ${formatedPrice}`;

    const cartTotal = document.getElementById("total-carrinho");
    const totalValueText = cartTotal.textContent.replace("Total: R$ ", "").replace(/\./g, "").replace(",", ".");
    const totalValue = parseFloat(totalValueText);

    if (isNaN(totalValue)) {
        console.error("Erro: Total do carrinho não é um número válido.");
        return;
    }

    const totalWithFreight = totalValue + freightValue;
    const totalFormated = totalWithFreight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    cartTotal.textContent = `Total: ${totalFormated}`;
});


function zipcodeValidate(zipcode){
    const regexCep = /^[0-9]{5}-?[0-9]{3}$/;
	return regexCep.test(zipcode);
}