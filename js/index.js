const buttomAddCart = document.querySelectorAll('.add-to-cart');

buttomAddCart.forEach(button => { 
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = productElement.dataset.id;
        const nameProduct = productElement.querySelector('.name').textContent;
        const productImage = productElement.querySelector('img').getAttribute('src');
        const priceProduct = parseFloat(productElement.querySelector('.price').textContent.replace("R$ ", "").replace(".", "").replace(",", "."));

        //buscar a lista de prdoutos no localStorage;
        const cart = getProduct();        
        //testar se o produto já existe no carrinho
        const productExists = cart.find(product => product.id === productId);
        if(productExists){
            //se existe produto, incrimentar a quantidade
            productExists.quantity += 1;
        }else{
             //se não existir o produto, adcionar o produto com a quantidade 1.
            const product = {
                id: productId,
                name: nameProduct,
                image: productImage,
                price: priceProduct,
                quantity: 1 //Inicia a quantidade como 1.
            }
            cart.push(product);
        } 
        saveProduct(cart);       
    })
})

function saveProduct (cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function getProduct(){
    const products = localStorage.getItem("cart");
     try {
        const parsed = JSON.parse(products);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}