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
        uptadeCart(); 
        renderTableCart();
    
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

//atualizar o contador do carrinho de compras

function uptadeCart() {
    const cart = getProduct();
    let total = 0;

    cart.forEach(product => {
        total += product.quantity;
    })

    document.getElementById('cartCount').textContent = total;    
}

uptadeCart();

// renderizar a tabela do carrinho de compras

function renderTableCart() {
    const products = getProduct();
    const tableBody = document.querySelector("#modal-1-content tbody");
    tableBody.innerHTML = ""; //Limpa a tabela antes de renderizar

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
            <td class="td-quantity"><input type="number" value="${product.quantity}" min="1"></td>
            <td class="td-price-total">R$ ${product.price.toFixed(2).replace(".", ",")}</td>
            <td><button id="deletar" data-id="${product.id} class="btn-delete"></button></td>`;
        tableBody.appendChild(tr);
    });
}

renderTableCart();
