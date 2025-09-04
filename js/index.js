import { removeFromCart, updateAll, saveProduct, getProduct } from './services/carrinho-service.js';
import { freightCalculate } from './services/freight-service.js'

const buttomAddCart = document.querySelectorAll('.add-to-cart');

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
    }else{
        errorZipCode.style.display = 'none';
    }

    const freightValue = await freightCalculate(zipcode, calculateFreight);
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