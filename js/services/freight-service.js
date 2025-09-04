import { getProduct } from './carrinho-service.js';

export async function freightCalculate(zipcode, calculateFreight) {
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