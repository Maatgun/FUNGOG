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
                        <span class="quantity-handler down" data-id "${id}">-</span>
                        <span class="item-quantity">${quantity}</span>
                        <span class="quantity-handler up" data-id=${id}>+</span>
                    </div>
                </div> 
    `
  }

  const rCart = () => {
    if (!cart.length) {
      cartItems.innerHTML = `<p class="alert-msg"> No products.</p>`;
      return;
    }
    cartItems.innerHTML = cart.map(cartProductsArticles).join("");

  };

  const cashTotal = () => {
    return cart.reduce((acc, val) => {
      return acc + Number(val.price) + val.quantity;
    }, 0)
  };

  const cartTotal = () => {
    total.innerHTML = `$${cashTotal().toFixed(2)} USD`;
  };

  const createProductsOrder = (products) => {
    const {id, name, price, img} = products;
    return {id, name, price, img};
  };

  const OnecartProduct = (productsId) => {
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

  const successful = (msg) => {
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
    if(!cart.lenght) {
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
    rCart();
    cartTotal();
    disabledBothBtn(payBtn);
    disabledBothBtn(deleteBtn);
    renderCartCounter();


  };

  const add = (e) => {
    if (!e.target.classList.contains("btn-add")){
      return;
    }
    const products = createProductsOrder(e.target.dataset);
    if (OnecartProduct (products.id)) {
        addSomeProduct(products);
        successful("Your product was added successfully !");
    }
    else {
      productsArticles(products);
      successful("Product added succesfully!");
    }

    updateCart();
  };

  

 
  
  const init = () => {
    renderProducts(appState.products[appState.productsIndex]);
    loadButton.addEventListener("click", showOtherProducts);
    cartBtn.addEventListener("click", toggleCart);
    menuB.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", justCloseScroll);
    bars.addEventListener("click", justClose);
    overlay.addEventListener("click", justCloseOverlay);
    document.addEventListener("DOMContentLoaded", rCart);
    document.addEventListener("DOMContentLoaded", cartTotal);
    boxProducts.addEventListener("click", add);
    disabledBothBtn(payBtn);
    disabledBothBtn(deleteBtn);
    renderCartCounter();
  };

init ();