const boxProducts = document.querySelector(".box-products");
const loadButton = document.querySelector(".load");

const productsArticles = (products) => {
    const {id, name, price, cardImg} = products;

    return `
    <div class="products">
    <img src=${cardImg} alt="name">
    <h3>${name}</h3>
    <p>$${price}</p>
    <button
       class="btn-add"
       data-id="${id}"
       data-name="${name}"
       data-price="${price}"
       data-img="${cardImg}"
       >
       ADD TO CART
    </button>
</div>
    `;
};

const renderProducts = (productsList) => {
 boxProducts.innerHTML += productsList.map(productsArticles).join("");
};


const lastProducts = () => {
    return appState.productsIndex === appState.productsLimit;
};

const showOtherProducts = () => {
    appState.productsIndex += 1;
    let { products, productsIndex } = appState;
    renderProducts(products[productsIndex]);
    if (lastProducts()) {
      loadButton.classList.add("load");
    }
  };


const init = () => {
    renderProducts(appState.products[appState.productsIndex]);
    loadButton.addEventListener("click", showOtherProducts);
};

init();