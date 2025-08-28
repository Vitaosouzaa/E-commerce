const filterButton = document.querySelector('.filter-button');

filterButton.addEventListener('click', () => {
    const selectCategory = document.getElementById('category').value;
    const selectPrice = document.getElementById('price').value;

    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-categoria');
        const productPrice = parseFloat(product.getAttribute('data-preco'));

        let showProduct = true;

        // Filtrar por categoria
        if (selectCategory !== 'all' && productCategory !== selectCategory) {
            showProduct = false;
        }

        // Filtrar por preço
        if (selectPrice !== '' && productPrice > parseFloat(selectPrice)) {
            showProduct = false;
        }

        // Mostrar ou ocultar o produto
        if (showProduct) {
            product.classList.add('show');
            product.classList.remove('hide');
        } else {
            product.classList.remove('show');
            product.classList.add('hide');
        }
    });
});