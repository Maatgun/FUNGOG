const boxProducts = document.querySelector(".box-products");
const loadButton = document.querySelector(".btn-load");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const menuB = document.querySelector(".menu-label");
const bars = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector(".cart-container");
const total = document.querySelector(".cart-total");
const modal = document.querySelector(".add-modal");
const payBtn = document.querySelector(".btn-add");
const deleteBtn = document.querySelector(".btn-delete");
const cartCounter = document.querySelector(".cart-counter");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsOnCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


const productsArticles = (products) => {
    const {id, name, price, cardImg} = products;

    return `
    <div class="products">
    <img src=${cardImg} alt="${name}">
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

// PRODUCTOS RENDERIZADOS 

const renderProducts = (productsList) => {
    boxProducts.innerHTML += productsList.map(productsArticles).join("");
  };
  
  const lastProducts = () => {
    return appState.productsIndex === appState.productsLimit - 1;
  };
  
  const showOtherProducts = () => {
    appState.productsIndex += 1;
    const { products, productsIndex } = appState;
    renderProducts(products[productsIndex]);
    if (lastProducts()) {
      loadButton.classList.add("hidden");
    }
  };

  // FILTROS DE BUSQUEDA

  const anyInactiveFilterBtn = (element) => {
    return (
      element.classList.contains("categories") &&
      !element.classList.contains("active")
    );
  };

  const BtnActive = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
      if(categoryBtn.dataset.category !== selectedCategory) {
        categoryBtn.classList.remove("active");
        return;
      }
      categoryBtn.classList.add("active");
    });
  };

  const setShowMore = () => {
    if (!appState.activeFilter) {
      loadButton.classList.remove("hidden");
      return;
    }
    loadButton.classList.add("hidden");

  };

  const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    BtnActive(appState.activeFilter);
    setShowMore();
  };

  const renderFilteredProducts = () => {
    const filteredProducts = productsOrder.filter((products) => {
      return products.category === appState.activeFilter;
    });
    renderProducts(filteredProducts);
  };

  const applyFilter = ({target}) => {

    if( anyInactiveFilterBtn(target)) {
      return;
    }

    changeFilterState(target);

    boxProducts.innerHTML = "";
    if(appState.activeFilter) {
      renderFilteredProducts();
      appState.ProductsIndex = 0;
      return;
    }

    renderProducts(appState.products[0]);

  };

  // MENU HAMBURGUESA / CARRITO DE COMPRAS RENDERIZADOS

  const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (bars.classList.contains("open-menu")) {
    bars.classList.remove("open-menu");
    return;
    }
    overlay.classList.toggle("show-overlay");
  };

  const toggleMenu = () => {
    bars.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
    }
    overlay.classList.toggle("show-overlay");
  };

  const justCloseScroll = () => {
    if (!bars.classList.contains ("open-menu") && !cartMenu.classList.contains("open-cart")) {
      return;
    }
    bars.classList.remove("open-menu");
    cartBtn.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  }

  const justClose = (event) => {
    if (!event.target.classList.contains("navbar-a")) {
      return;
    }
    bars.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
  }

  const justCloseOverlay = () => {
    bars.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  };

  // AGREGADO DE PRODUCTOS AL CARRITO
  
  const cartProductsArticles = (cartItem) => {
  const {id, name, price, img, quantity} = cartItem;

    return `
                <div class="cart-item">
                    <img src=${img} alt="">
                    <div class="item-info">
                        <h3 class="item-title">${name}</h3>
                        <span class="item-price">${price}</span>
                    </div>
                    <div class="item-handler">
                        <span class="quantity-handler down" data-id="${id}">-</span>
                        <span class="item-quantity">${quantity}</span>
                        <span class="quantity-handler up" data-id="${id}">+</span>
                    </div>
                </div> 
    `;
  };

  const renderCart = () => {
    if (!cart.length) {
      cartItems.innerHTML = `<p class="alert-msg"> No products.</p>`;
      return;
    }
    cartItems.innerHTML = cart.map(cartProductsArticles).join("");

  };

  const cashTotal = () => {
    return cart.reduce((acc, val) => {
      return acc + Number(val.price) * Number(val.quantity);
    }, 0);
  };

  const cartTotal = () => {
    total.innerHTML = `${cashTotal().toFixed(2)} USD`;
  };

  const createProductData = (products) => {
    const {id, name, price, img} = products;
    return {id, name, price, img};
  };

  const thereIsAProduct = (productsId) => {
    return cart.find((item) => {
      return item.id === productsId;
    });
  };

  const addSomeProduct = (products) => {
    cart = cart.map((cartItem) => {
      return cartItem.id === products.id
       ? {...cartItem, quantity: cartItem.quantity + 1}
       : cartItem;
    });
  };

  const showSuccessful = (msg) => {
    modal.classList.add("active-modal");
    modal.textContent = msg;
    setTimeout (() => {
      modal.classList.remove("active-modal");
    }, 1500);
  };

  const cartProducts = (products) => {
    cart = [
      ...cart,
      {
        ...products,
        quantity: 1,
      },
    ];
  };

  const disabledBothBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
    }
    else {
      btn.classList.remove("disabled");
    }
  };

  const renderCartCounter = () => {
    cartCounter.textContent = cart.reduce((acc, val) => {
      return acc + val.quantity;
    }, 0);
  };

  const updateCart = () => {
    productsOnCart();
    renderCart();
    cartTotal();
    disabledBothBtn(payBtn);
    disabledBothBtn(deleteBtn);
    renderCartCounter();


  };

  const add = (e) => {
    if (!e.target.classList.contains("btn-add")){
      return;
    }
    const products = createProductData(e.target.dataset);
    if (thereIsAProduct(products.id)) {
        addSomeProduct(products);
        showSuccessful("Your product was added successfully !");
    }
    else {
      cartProducts(products);
      showSuccessful("Product added succesfully!");
    }

    updateCart();
  };

  const substractProductFromCart = (existingProduct) => {
    cart = cart.map((products) => {
      return products.id === existingProduct.id
      ? {...products, quantity: Number(products.quantity) - 1}
      : products;
    });
  };

  const removeProduct = (existingProduct) => {
    cart = cart.filter((products) => {
      return products.id !== existingProduct.id;
    });
    updateCart();
  };

  const handlerLessBtnProduct = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    
    if(existingCartProduct.quantity === 1) {
      if(window.confirm("want to remove your product?")) {
        removeProduct(existingCartProduct);
      }
      return;
    }
    substractProductFromCart(existingCartProduct);
  };

  const handlerPlusBtnProducts = (id) => {
    const existingCartProduct = cart.find((item) =>
      item.id === id);
      addSomeProduct(existingCartProduct);
  };

  const handleQuantity = (e) => {
    if(e.target.classList.contains("down")) {
    handlerLessBtnProduct(e.target.dataset.id);
    }
    else if (e.target.classList.contains("up")) {
      handlerPlusBtnProducts(e.target.dataset.id);
    }
    updateCart();
  };

  const resetCartOrder = () => {
    cart = [];
    updateCart();
  };

 const orderCompleteAction = (confirmMsg, successMsg) => {
  if(!cart.length) return;

  if(window.confirm(confirmMsg)) {
    resetCartOrder();
    alert(successMsg);
  }
 };

 const successfulPurchase = () => {
  orderCompleteAction("Do you want to purchase?", "Order Complete!");
  showSuccessful("¡Thank Ü, Enjoy your product!");
 };

 const deleteCart = () => {
  orderCompleteAction("Do you want to empty the cart?", "No products in cart");
 };
  
  const init = () => {
    renderProducts(appState.products[appState.productsIndex]);
    loadButton.addEventListener("click", showOtherProducts);
    categories.addEventListener ("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuB.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", justCloseScroll);
    bars.addEventListener("click", justClose);
    overlay.addEventListener("click", justCloseOverlay);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", cartTotal);
    boxProducts.addEventListener("click", add);
    cartItems.addEventListener("click", handleQuantity);
    payBtn.addEventListener("click", successfulPurchase);
    deleteBtn.addEventListener("click", deleteCart);
    disabledBothBtn(payBtn);
    disabledBothBtn(deleteBtn);
    renderCartCounter();

  };

init ();