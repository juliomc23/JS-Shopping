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
let cart = [];
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

            array_products.forEach(product => {
                if (viewProductButton.className == product.id) {


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

function addToCart() {

    const addToCartButton = document.querySelectorAll('#add_to_cart');


    Array.from(addToCartButton).forEach(addToCartButton => {
        addToCartButton.addEventListener('click', () => {

            array_products.forEach(product => {
                if (addToCartButton.className == product.id) {
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

function showCart() {

    const divCart = document.querySelector('.cart');

    divCart.addEventListener('click', () => {

        if (cart.length >= 1) {
            const productsCartDiv = document.querySelector('#products_cart_div');
            const shoppingCartDiv = document.querySelector('#shopping_cart_div');

            shoppingCartDiv.style.cssText = "border-top: 1px solid rgb(216, 216, 216); border-bottom: 1px solid rgb(216, 216, 216);";

            if (productsCartDiv.hasChildNodes() === true) {

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

        } else {
            alert('No hay productos en el carrito');
        }

        showTotalShop();
    })
}

showCart();

//Mostrar el carrito

// Creamos la notificacion de los elementos que hay en el carrito

function notification() {

    const notificationDiv = document.querySelector('.notification');

    notificationDiv.style.display = 'flex';

    const cartLenght = document.createElement('p');

    cartLenght.innerHTML += `${cart.length}`;

    while (notificationDiv.firstChild) {
        notificationDiv.removeChild(notificationDiv.firstChild);
    }
    notificationDiv.appendChild(cartLenght);
}

// Creamos la notificacion de los elementos que hay en el carrito

//Mostrar total de la compra

function showTotalShop() {

    const totalShop = document.querySelector('#total_info');

    const totalText = document.createElement('p');
    const total = document.createElement('p');

    totalText.innerHTML = 'Total: ';

    //Calculamos el total de la compra con el metodo reduce, tiene que recibir una funcion y 4 parametros, en este caso solo se usan 2
    // el primero es el "total" y el segundo es el numero que va recorriendo
    // tambien tiene que recibir el 0 ese para que sume ese numero, si no le ponemos nada no suma nada

    total.innerHTML = `${cart.reduce((acum, num_actual) => {
        return acum + num_actual.price;
    }, 0)}€`;

    //Eliminamos los hijos del div para que no salgan duplicados
    while (totalShop.firstChild) {
        totalShop.removeChild(totalShop.firstChild);
    }

    totalShop.appendChild(totalText);
    totalShop.appendChild(total);

}

//Mostrar total de la compra

//Mostrar formulario del perfil

function userInfo() {

    const profileImg = document.querySelector('.user');

    profileImg.addEventListener('click', () => {

        const divClothes = document.querySelector('#div_clothes');
        const divProfileForm = document.querySelector('#profile_form_div');
        const divProducts = document.querySelector('.div_products');

        divClothes.style.cssText = 'display: none;';
        divProfileForm.style.cssText = 'display: flex;';
        divProducts.style.cssText = 'display: none;';

    })
}

userInfo();

//Mostrar formulario del perfil


//Obtener datos del usuario

let dataUserArray = [];
let allOk = true;

function getUserData() {

    const sendValuesButton = document.querySelector('#next_step');

    sendValuesButton.addEventListener('click', (event) => {

        event.preventDefault();

        const username = document.querySelector('#username');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const conf_password = document.querySelector('#conf_password');

        const formProfile = document.querySelector('#profile_form_div');

        const circleProfile = document.querySelector('.profile');

        //Campos vacios
        if (username.value === '' || email.value === '' || password.value === '' || conf_password.value === '') {


            username.style.borderColor = 'red';
            email.style.borderColor = 'red';
            password.style.borderColor = 'red';
            conf_password.style.borderColor = 'red';

            const alertSpan = document.createElement('span');
            alertSpan.innerHTML = '<p>Rellena todos los campos</p>';
            alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

            formProfile.append(alertSpan);

            setTimeout(() => {
                formProfile.removeChild(alertSpan);
                username.style.borderColor = 'black';
                email.style.borderColor = 'black';
                password.style.borderColor = 'black';
                conf_password.style.borderColor = 'black';
            }, 3000);

            allOk = false;
        } else {

            //Contraseñas no coinciden
            if (password.value !== conf_password.value) {

                password.style.borderColor = 'red';
                conf_password.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>Las contraseñas no coinciden</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    password.style.borderColor = 'black';
                    conf_password.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            }else{
                allOk = true;
            }


            //Longitud nombre de usuario

            const nameWithOutSpaces = username.value.replace(/\s/g, '');
            if (nameWithOutSpaces.length < 5 || nameWithOutSpaces.length > 20) {

                username.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El nombre de usuario debe tener entre 5 y 20 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    username.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            }else{
                allOk = true;
            }

            //Validacion email

            const expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
            if (email.value.length > 50) {

                email.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El email no puede tener mas de 50 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    email.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else if (!expresion.test(email.value)) {
                email.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El email no está bien</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    email.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            }else{
                allOk = true;
            }

            //Comprobacion longitud contraseña
            const regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
            if (password.value.length < 8 || password.value.length > 20 && conf_password.value.length < 8 || conf_password.value.length > 20) {

                password.style.borderColor = 'red';
                conf_password.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>Las contraseñas debe tener entre 8 y 20 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    password.style.borderColor = 'black';
                    conf_password.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            }else if (!regex.test(password.value) || !regex.test(conf_password.value)) {

                password.style.borderColor = 'red';
                conf_password.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>La contraseña debe tener al menos una mayúscula</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    password.style.borderColor = 'black';
                    conf_password.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            }else{
                allOk = true;
            }

            
        }

        if(allOk === true){
            dataUserArray.push({
                username: username.value,
                email: email.value,
                password: password.value,
                conf_password: conf_password.value
            })

            circleProfile.style.backgroundColor = 'black';
            formProfile.style.display = 'none';
            
        }
    }



    );


}

getUserData();


//Obtener datos del usuario


//Limpiar formulario del perfil

function clearFormProfile() {

    const clearButton = document.querySelector('#clear_form');

    clearButton.addEventListener('click', (event) => {

        event.preventDefault();

        const username = document.querySelector('#username');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const conf_password = document.querySelector('#conf_password');

        username.value = '';
        email.value = '';
        password.value = '';
        conf_password.value = '';

        dataUserArray = [];

    })
}

clearFormProfile();
