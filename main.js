const boxProducts = document.querySelector(".box-products");

const productsArticles = (products) => {
    const {id, name, price, cardImg} = products;

    return `
    <div class="products">
    <img src=${cardImg} alt="name">
    <h3>${name}</h3>
    <p>${price}</p>
    <button
       class="btn-add"
       data-id="${id}"
       data-name="${name}"
       data-price="${price}"
       data-img="${cardImg}"
       >
       Add
    </button>
</div>
    `;
};

const renderProducts = (productsList) => {
 boxProducts.innerHTML = productsList.map(productsArticles).join("");
};


const init = () => {
    renderProducts(productsOrder);
};

init();