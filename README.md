# 🛒 E-commerce Master

Um projeto de **E-commerce totalmente funcional**, desenvolvido com
**HTML, CSS, JavaScript puro** e N8N com consumo de API, sem frameworks, focado em demonstrar
habilidades em desenvolvimento front-end, manipulação do DOM e
integração de serviços básicos.

👉 [Repositório no GitHub](https://github.com/Vitaosouzaa/E-commerce)

------------------------------------------------------------------------

## 📌 Funcionalidades

-   ✅ **Catálogo de produtos** organizado por categorias.\
-   ✅ **Filtro de busca** por categoria e preço máximo.\
-   ✅ **Carrinho de compras dinâmico**:
    -   Adição e remoção de produtos\
    -   Alteração de quantidade com atualização automática\
    -   Cálculo automático do subtotal e total\
-   ✅ **Cálculo de frete** integrado via CEP, com validação e exibição
    de mensagens de erro.\
-   ✅ **Menu responsivo estilo "hambúrguer"**.\
-   ✅ **Modal de carrinho** usando
    [MicroModal.js](https://micromodal.vercel.app/).

------------------------------------------------------------------------

## 🖼️ Demonstração

### Página inicial

-   Catálogo com **produtos gamer**, como notebooks, cadeiras, consoles
    e periféricos.\
-   Filtros para facilitar a navegação.

### Carrinho de compras

-   Abre em um **modal interativo**.\
-   Exibe todos os itens adicionados, seus preços, quantidades e valor
    total.\
-   Permite calcular o frete diretamente no carrinho.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   **HTML5** → Estrutura da aplicação\
-   **CSS3** → Estilização responsiva (reset, base, header, filter,
    products, footer e cart-modal)\
-   **JavaScript (ES6+)** →
    -   Manipulação do DOM\
    -   Controle de carrinho e frete\
    -   Filtragem dinâmica de produtos\
    -   Menu mobile\
-   **MicroModal.js** → Gerenciamento do modal do carrinho\
-   **n8n + API Super Frete** → Automação do cálculo de frete integrado
    aos produtos

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    E-commerce/
    ├── index.html
    ├── css/
    │   ├── reset.css
    │   ├── base.css
    │   ├── header.css
    │   ├── filter.css
    │   ├── products.css
    │   ├── footer.css
    │   └── cart-modal.css
    ├── js/
    │   ├── index.js
    │   ├── modal.js
    │   ├── burgerMenu.js
    │   ├── filter.js
    │   └── services/
    │       ├── carrinho-service.js
    │       └── freight-service.js
    ├── assets/
    │   └── images/
    ├── medidas.json
    └── README.md


## 👨‍💻 Autor

**Vitor Souza**\
📍 Desenvolvedor Front-End.\
🔗 [LinkedIn](www.linkedin.com/in/vitor-caruso-de-souza-64629b367) \|
[GitHub](https://github.com/Vitaosouzaa)
