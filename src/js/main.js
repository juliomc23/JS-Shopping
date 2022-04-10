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
        price: 150,
        description: "Descripcion del producto 2",
        image: "./src/assets/img/productos-ropa/5e799e33-1b7d-41f9-b40b-1a8e2d648240.webp",
        category: "Categoria 2",
        stock: 10
    },
    {
        id: 3,
        name: "Producto 3",
        price: 70,
        description: "Descripcion del producto 3",
        image: "./src/assets/img/productos-ropa/66e3bbf3-0592-466d-807d-8a9e869b8cf3.webp",
        category: "Categoria 3",
        stock: 10
    },
    {
        id: 4,
        name: "Producto 4",
        price: 120,
        description: "Descripcion del producto 4",
        image: "./src/assets/img/productos-ropa/a5b1ea3c-b0ab-424d-9e85-726e3f9d96e8.webp",
        category: "Categoria 4",
        stock: 10
    },
    {
        id: 5,
        name: "Producto 5",
        price: 40,
        description: "Descripcion del producto 5",
        image: "./src/assets/img/productos-ropa/b8644f9e44fd4010b3d8ad9201309bcb_9366.webp",
        category: "Categoria 5",
        stock: 10
    },
    {
        id: 6,
        name: "Producto 6",
        price: 99,
        description: "Descripcion del producto 6",
        image: "./src/assets/img/productos-ropa/e261e8eb77a64fd69b0cad6e00619ab2_9366.webp",
        category: "Categoria 6",
        stock: 10
    },
]
let cart  = [];
//Mostrar array de productos

function muestraArrayProductos() {

    const clothes_container = document.querySelector('.clothes_container');

    array_products.forEach(product => {

        const product_article = document.createElement('article');

        product_article.classList.add('product_article')

        product_article.innerHTML = `
        <img src="${product.image}" />
        <h1>${product.name}</h1>
        <span>${product.description}</span>
        <span class="product_price">${product.price}€</span>
        <div class='button_div_products'>
            <button id="view_product" class="${product.id}">View product</button>
            <button id="add_to_cart" class="${product.id}">Add to cart</button>
        </div>
        `;

        clothes_container.appendChild(product_article);
    })
}

muestraArrayProductos();

//Mostrar array de productos

//Clicks en botones viewProduct

function viewProduct() {
    const divClothes = document.querySelector('#div_clothes');
    const divProducts = document.querySelector('.div_products');
    const viewProduct = document.querySelectorAll('#view_product');
    


    Array.from(viewProduct).forEach(viewProductButton => {
        viewProductButton.addEventListener('click', () => {
            divClothes.style.display = "none";
            divProducts.style.display = "grid";

            array_products.forEach( product =>{
                if(viewProductButton.className == product.id){


                    const productDescr = document.querySelector('.productDescr');
                    const info = document.querySelector('.info');

                    info.innerHTML = `
                    <h2>${product.name}</h2>
                    <p class="price">${product.price}€</p> 
                    `;
                    productDescr.prepend(info);

                    const mainProduct = document.querySelector('.mainProduct');
                    const divImage = document.createElement('div');

                    divImage.innerHTML = `<img src="${product.image}">`;

                    mainProduct.appendChild(divImage);


                    //meter al carrito el producto

                    const buttonAddToCart = document.querySelector('.buy_button');
                    buttonAddToCart.addEventListener('click', () => {
                        cart.push({
                            name: product.name,
                            img: product.image,
                            price: product.price,
                            description: product.description
                        })

                        notification();
                    })
                }
            })
        })
    })
}

viewProduct();

//Clicks en botones viewProduct

//Añadir al carrito

function addToCart(){
    
    const addToCartButton = document.querySelectorAll('#add_to_cart');
    

    Array.from(addToCartButton).forEach(addToCartButton => {
        addToCartButton.addEventListener('click', () => {
            
            array_products.forEach(product => {
                if(addToCartButton.className == product.id){
                    cart.push({
                        name: product.name, 
                        img: product.image, 
                        price: product.price, 
                        description: product.description
                    });

                    product.stock--;
                }
            })

            //Llamamos a la funcion de notification para que cada vez que hagamos click en el boton de añadir al carrito, se muestre una notificacion
            notification();
        })
    })

    
    
}

addToCart();

//Añadir al carrito

//Mostrar el carrito

function showCart(){

    const divCart = document.querySelector('.cart');

    divCart.addEventListener('click', ()=>{

        if(cart.length >= 1){
            const productsCartDiv = document.querySelector('#products_cart_div');
            const shoppingCartDiv = document.querySelector('#shopping_cart_div');

            shoppingCartDiv.style.cssText = "border-top: 1px solid rgb(216, 216, 216); border-bottom: 1px solid rgb(216, 216, 216);";

            if(productsCartDiv.hasChildNodes() === true){

                //Elimina los hijos del div para que no salgan duplicados
                productsCartDiv.innerHTML = '';

                //Luego los vuelve a pintar con los nuevos productos
                cart.forEach(product => {
                
                    const productDiv = document.createElement('article');
                    const divImgProduct = document.createElement('div');
                    const divProductsInfo = document.createElement('div');
    
                    const divButtons = document.createElement('div');
                    const addProductButton = document.createElement('button');
                    const removeProductButton = document.createElement('button');
    
                    addProductButton.innerHTML = '+';
                    removeProductButton.innerHTML = '-';
    
                    divButtons.appendChild(addProductButton);
                    divButtons.appendChild(removeProductButton);
    
                    productDiv.appendChild(divButtons);
    
                    productDiv.classList.add('product_cart_article');
                    divImgProduct.classList.add('div_img_product');
                    divProductsInfo.classList.add('div_products_info');
                    divButtons.classList.add('div_buttons');
    
                    divImgProduct.innerHTML = `<img src="${product.img}">`;
                    divProductsInfo.innerHTML = `
                    <h2>${product.name}</h2>
                    <p class="price">${product.price}€</p>
                    <p>${product.description}</p>
                    `
    
                    productDiv.appendChild(divImgProduct);
                    productDiv.appendChild(divProductsInfo);
    
    
    
                    productDiv.appendChild(divButtons);
    
                    productsCartDiv.appendChild(productDiv);
                    
                    
                })
            }
            
        }else{
            alert('No hay productos en el carrito');
        }
        
        showTotalShop();
    })
}

showCart();

//Mostrar el carrito

// Creamos la notificacion de los elementos que hay en el carrito

function notification(){

    const notificationDiv = document.querySelector('.notification');

    notificationDiv.style.display = 'flex';

    const cartLenght = document.createElement('p');

    cartLenght.innerHTML += `${cart.length}`;

    while(notificationDiv.firstChild){
        notificationDiv.removeChild(notificationDiv.firstChild);
    }
    notificationDiv.appendChild(cartLenght);
}

// Creamos la notificacion de los elementos que hay en el carrito

//Mostrar total de la compra

function showTotalShop(){

    const totalShop = document.querySelector('#total_info');

    const totalText = document.createElement('p');
    const total = document.createElement('p');

    totalText.innerHTML = 'Total: ';

    //Calculamos el total de la compra con el metodo reduce, tiene que recibir una funcion y 4 parametros, en este caso solo se usan 2
    // el primero es el "total" y el segundo es el numero que va recorriendo
    // tambien tiene que recibir el 0 ese para que sume ese numero, si no le ponemos nada no suma nada

    total.innerHTML = `${cart.reduce((acum, num_actual) =>{
        return acum + num_actual.price;
    }, 0)}€`;
    
    //Eliminamos los hijos del div para que no salgan duplicados
    while(totalShop.firstChild){
        totalShop.removeChild(totalShop.firstChild);
    }

    totalShop.appendChild(totalText);
    totalShop.appendChild(total);
    
}

//Mostrar total de la compra


/**
 * restarura el array del carrito
 */
function clearCart(){
    carrito = []
    console.log(carrito);
   
}


