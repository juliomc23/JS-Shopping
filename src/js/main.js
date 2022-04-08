
const array_products = [
    {
        id: 1,
        name: "Producto 1",
        price: 100,
        description: "Descripcion del producto 1",
        image: "./src/assets/img/productos-ropa/5ae921bb08034aa2803fad7800abdd7f_9366.webp",
        category: "Categoria 1",
        stock: 10
    },
    {
        id: 2,
        name: "Producto 2",
        price: 100,
        description: "Descripcion del producto 2",
        image: "./src/assets/img/productos-ropa/5e799e33-1b7d-41f9-b40b-1a8e2d648240.webp",
        category: "Categoria 2",
        stock: 10
    },
    {
        id: 3,
        name: "Producto 3",
        price: 100,
        description: "Descripcion del producto 3",
        image: "./src/assets/img/productos-ropa/66e3bbf3-0592-466d-807d-8a9e869b8cf3.webp",
        category: "Categoria 3",
        stock: 10
    },
    {
        id: 4,
        name: "Producto 4",
        price: 100,
        description: "Descripcion del producto 4",
        image: "./src/assets/img/productos-ropa/a5b1ea3c-b0ab-424d-9e85-726e3f9d96e8.webp",
        category: "Categoria 4",
        stock: 10
    },
    {
        id: 5,
        name: "Producto 5",
        price: 100,
        description: "Descripcion del producto 5",
        image: "./src/assets/img/productos-ropa/b8644f9e44fd4010b3d8ad9201309bcb_9366.webp",
        category: "Categoria 5",
        stock: 10
    },
    {
        id: 6,
        name: "Producto 6",
        price: 100,
        description: "Descripcion del producto 6",
        image: "./src/assets/img/productos-ropa/e261e8eb77a64fd69b0cad6e00619ab2_9366.webp",
        category: "Categoria 6",
        stock: 10
    },
]


function muestraProductos(){

    const clothes_container = document.querySelector('.clothes_container');

    array_products.forEach( product =>{

        const product_article = document.createElement('article');

        product_article.classList.add('product_article')

        product_article.innerHTML = `
        <img src="${product.image}" />
        <h1>${product.name}</h1>
        <span>${product.description}</span>
        <span>${product.price}</span>
        <button>View product</button>
        <button>Add to cart</button>
        `;

        clothes_container.appendChild(product_article);
    })
}

muestraProductos();