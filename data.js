const productsOrder = [
{
    id: 1,
    name: "BABY ROCKET",
    price: 12,
    category:"Rocket",
    cardImg: "./assets/baby-rocket.png",
},
{
    id: 2,
    name: "COSMO",
    price: 12,
    category: "Extras",
    cardImg: "./assets/cosmo.png",
},
{
    id: 3,
    name: "DRAX",
    price: 12,
    category: "Guardians",
    cardImg: "./assets/drax.png",
},
{
    id: 4,
    name: "GAMORA",
    price: 12,
    category: "Guardians",
    cardImg: "./assets/gamora.png",
},
{
    id: 5,
    name: "GROOT",
    category: "Guardians",
    price: 12,
    cardImg: "./assets/groot.png",
},
{
    id: 6,
    name: "KRAGLIN",
    price: 12,
    category: "Extras",
    cardImg: "./assets/kraglin.png",
},
{
    id: 7,
    name: "MANTIS",
    price: 12,
    category: "Guardians",
    cardImg: "./assets/mantis.png",
},
{
    id: 8,
    name: "ROCKET RACCON",
    price: 12,
    category: "Rocket",
    cardImg: "./assets/rocket.png",
},
{
    id: 9,
    name: "NEBULA",
    category: "Guardians",
    price: 12,
    cardImg: "./assets/nebula.png",
},
{
    id: 10,
    name: "STAR LORD",
    category: "Guardians",
    price: 12,
    cardImg: "./assets/starlord.png",
},

];


const articlesDivided = (size) => {
    let productsList = [];
    for (let i = 0; i < productsOrder.length; i += size) {
      productsList.push(productsOrder.slice(i, i + size));
    }
  
    return productsList;
  };
  
  const appState = {
    products: articlesDivided(5),
    productsIndex: 0,
    productsLimit: articlesDivided(5).length,
    activeFilter: null,
  };