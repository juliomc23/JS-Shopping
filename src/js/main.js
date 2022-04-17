
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


function Gifts() {
    // Get the checkbox
    var checkBox = document.getElementById("gift");

    // Get the output text
    var message_text = document.getElementById("message_text");
    var tit = document.getElementById("tit");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        message_text.style.display = "block";
        tit.style.display = "block";
    } else {
        message_text.style.display = "none";
        tit.style.display = "none";
    }
}

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
                        product.stock--;

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
            const divClothes = document.querySelector('#div_clothes');
            const divProgressBar = document.querySelector('#div_progress_bar');
            const divProducts = document.querySelector('.div_products');

            shoppingCartDiv.style.display = "flex";
            divClothes.style.display = "none";
            divProgressBar.style.display = "none";
            divProducts.style.display = "none";

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
    const totalPrice = document.createElement('p');

    totalText.innerHTML = 'Total: ';

    //Calculamos el total de la compra con el metodo reduce, tiene que recibir una funcion y 4 parametros, en este caso solo se usan 2
    // el primero es el "total" y el segundo es el numero que va recorriendo
    // tambien tiene que recibir el 0 ese para que sume ese numero, si no le ponemos nada no suma nada

    const shopPrice = cart.reduce((acum, num_actual) => {

        return acum + num_actual.price;

    }, 0);

    totalPrice.innerHTML = `${priceShipping + shopPrice}€`;

    //Eliminamos los hijos del div para que no salgan duplicados
    while (totalShop.firstChild) {
        totalShop.removeChild(totalShop.firstChild);
    }

    totalShop.appendChild(totalText);
    totalShop.appendChild(totalPrice);

}

//Mostrar total de la compra

//Mostrar formulario del perfil

function userInfo() {

    const profileImg = document.querySelector('.user');

    profileImg.addEventListener('click', () => {

        const divClothes = document.querySelector('#div_clothes');
        const divProfileForm = document.querySelector('#profile_form_div');
        const divProducts = document.querySelector('.div_products');
        const shoppingCartDiv = document.querySelector('#shopping_cart_div');

        divClothes.style.cssText = 'display: none;';
        divProfileForm.style.cssText = 'display: flex;';
        divProducts.style.cssText = 'display: none;';
        shoppingCartDiv.style.display = "none";

    })
}

userInfo();

//Mostrar formulario del perfil


//Obtener datos del usuario

let userInfoArray = [];

function getUserData() {

    let allOk = true;

    const sendValuesButton = document.querySelector('#next_step');

    sendValuesButton.addEventListener('click', (event) => {

        event.preventDefault();

        const username = document.querySelector('#username');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const conf_password = document.querySelector('#conf_password');

        const formProfile = document.querySelector('#profile_form_div');
        const shippingFormDiv = document.querySelector('#shipping_form_div');

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
            } else {
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
            } else {
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
            } else {
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
            } else if (!regex.test(password.value) || !regex.test(conf_password.value)) {

                password.style.borderColor = 'red';
                conf_password.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>La contraseña debe tener al menos una mayúscula, un numero y un caracter especial</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formProfile.append(alertSpan);

                setTimeout(() => {
                    formProfile.removeChild(alertSpan);
                    password.style.borderColor = 'black';
                    conf_password.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }


        }

        if (allOk === true) {
            userInfoArray.push({
                username: username.value,
                email: email.value,
                password: password.value,
                conf_password: conf_password.value
            })

            circleProfile.style.backgroundColor = 'black';
            formProfile.style.display = 'none';

            shippingFormDiv.style.display = 'flex';
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

        // dataUserArray = [];

    })
}

clearFormProfile();

//Limpiar formulario del perfil

//Recibir datos del formulario de direccion
let addressInfoArray = [];

function getUserAddressData() {

    let allOk = true;

    const nextStep = document.querySelector('#next_step_shipping');
    const formShippingDiv = document.querySelector('#shipping_form_div');

    nextStep.addEventListener('click', (event) => {

        event.preventDefault();

        const firstName = document.querySelector('#first_name');
        const lastName = document.querySelector('#last_name');
        const birthDay = document.querySelector('#birthday');
        const addressOne = document.querySelector('#address_one');
        const addressTwo = document.querySelector('#address_two');
        const postalCode = document.querySelector('#postal_code');
        const country = document.querySelector('#country');
        const countryCode = document.querySelector('#country_code');
        const telephone = document.querySelector('#telephone_input');

        // regularAddress.checked

        if (firstName.value === '' || lastName.value === '' || birthDay.value === '' || addressOne.value === '' || postalCode.value === '' || country.value === '' || telephone.value === '') {

            firstName.style.borderColor = 'red';
            lastName.style.borderColor = 'red';
            birthDay.style.borderColor = 'red';
            addressOne.style.borderColor = 'red';
            addressTwo.style.borderColor = 'red';
            postalCode.style.borderColor = 'red';
            country.style.borderColor = 'red';
            countryCode.style.borderColor = 'red';
            telephone.style.borderColor = 'red';


            const alertSpan = document.createElement('span');
            alertSpan.innerHTML = '<p>Todos los campos son obligatorios</p>';
            alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

            formShippingDiv.append(alertSpan);

            setTimeout(() => {
                formShippingDiv.removeChild(alertSpan);
                firstName.style.borderColor = 'black';
                lastName.style.borderColor = 'black';
                birthDay.style.borderColor = 'black';
                addressOne.style.borderColor = 'black';
                addressTwo.style.borderColor = 'black';
                postalCode.style.borderColor = 'black';
                country.style.borderColor = 'black';
                countryCode.style.borderColor = 'black';
                telephone.style.borderColor = 'black';
            }, 3000);

            allOk = false;
        } else {

            if (firstName.value.lenght > 20) {

                firstName.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El nombre no puede tener mas de 20 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    firstName.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }

            if (lastName.value.lenght > 20) {

                lastName.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El apellido no puede tener mas de 20 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    lastName.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }

            if (addressOne.value.lenght > 50) {

                addressOne.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>La dirección no puede tener mas de 50 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    addressOne.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }

            if (addressTwo.value.lenght > 50) {

                addressTwo.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>La dirección no puede tener mas de 50 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    addressTwo.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }

            if (postalCode.value.lenght > 5) {

                postalCode.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El codigo postal no puede tener mas de 5 caracteres</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    postalCode.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else if (!isNaN(postalCode.value)) {

                postalCode.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>El codigo postal debe ser un numero</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    postalCode.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }

            if (telephone.value.lenght > 9 && !isNaN(telephone.value)) {

                telephone.style.borderColor = 'red';

                const alertSpan = document.createElement('span');
                alertSpan.innerHTML = '<p>Algo no está bien en tu número telefonico</p>';
                alertSpan.style.cssText = 'color: red; font-size: 1.2rem;';

                formShippingDiv.append(alertSpan);

                setTimeout(() => {
                    formShippingDiv.removeChild(alertSpan);
                    telephone.style.borderColor = 'black';
                }, 3000);

                allOk = false;
            } else {
                allOk = true;
            }

        }

        if (allOk) {
            addressInfoArray.push({
                firstName: firstName.value,
                lastName: lastName.value,
                addressOne: addressOne.value,
                addressTwo: addressTwo.value,
                postalCode: postalCode.value,
                country: country.value,
                countryCode: countryCode.value,
                telephone: telephone.value,
            })

            formShippingDiv.style.display = 'none';
            document.querySelector('.address').style.backgroundColor = 'black';
            document.querySelector('#shipping').style.display = 'flex';
        }

    })

}

getUserAddressData();


function clearFormAddress() {

    const clearButton = document.querySelector('#clear_form_shipping');

    clearButton.addEventListener('click', (event) => {

        event.preventDefault();

        document.querySelector('#first_name').value = '';
        document.querySelector('#last_name').value = '';
        document.querySelector('#birthday').value = '';
        document.querySelector('#address_one').value = '';
        document.querySelector('#address_two').value = '';
        document.querySelector('#postal_code').value = '';
        document.querySelector('#country').value = '';
        document.querySelector('#country_code').value = '';
        document.querySelector('#telephone_input').value = '';

    })
}

clearFormAddress();



//Recibir datos del formulario de direccion
function changeCountryCode() {


    const countryCode = document.querySelector('#country_code');
    const country = document.querySelector('#country');

    country.addEventListener('click', () => {

        if (country.value === 'ESP' || country.value === 'AND' || country.value === 'FRA' || country.value === 'DEU' || country.value === 'GRC') {
            countryCode.value = country.value;
        }

    })

}

changeCountryCode();



let priceShipping = 0;
let shippingChoiceArray = [];

const arriveOrder = () => {

    const radioButtonFree = document.querySelector('#free');
    const radioButtonExtra = document.querySelector('#extra');
    const radioButtonPremium = document.querySelector('#premium');

    const arriveDateDiv = document.querySelector('#arrive_date_div');
    const spanArriveDate = document.createElement('span');

    const today = new Date();

    radioButtonFree.addEventListener('click', () => {
        if (radioButtonFree.checked) {

            spanArriveDate.innerHTML = `<p> <strong>${new Date(today.getTime() + (1000 * 60 * 60 * 72)).getDate()} / 
            ${new Date(today.getTime() + (1000 * 60 * 60 * 72)).getMonth()} / 
            ${new Date(today.getTime() + (1000 * 60 * 60 * 72)).getFullYear()}</strong></p>`;

            arriveDateDiv.append(spanArriveDate);

            shippingChoiceArray.push({
                priceShipping: "free"
            })
        }

    });

    radioButtonExtra.addEventListener('click', () => {
        if (radioButtonExtra.checked) {

            spanArriveDate.innerHTML = `<p> <strong>${new Date(today.getTime() + (1000 * 60 * 60 * 48)).getDate()} / 
            ${new Date(today.getTime() + (1000 * 60 * 60 * 48)).getMonth()} / 
            ${new Date(today.getTime() + (1000 * 60 * 60 * 48)).getFullYear()}</strong></p>`;

            arriveDateDiv.append(spanArriveDate);


            priceShipping = 4.99;

            shippingChoiceArray.push({
                priceShipping: 4.99
            })

        }
    });

    radioButtonPremium.addEventListener('click', () => {
        if (radioButtonPremium.checked) {

            spanArriveDate.innerHTML = `<p> <strong>${new Date(today.getTime() + (1000 * 60 * 60 * 24)).getDate()} / 
            ${new Date(today.getTime() + (1000 * 60 * 60 * 24)).getMonth()} / 
            ${new Date(today.getTime() + (1000 * 60 * 60 * 24)).getFullYear()}</strong></p>`;

            arriveDateDiv.append(spanArriveDate);


            priceShipping = 9.99;

            shippingChoiceArray.push({
                priceShipping: 9.99
            })

        }


    });

}

arriveOrder();

function endShopping() {

    const endShipping = document.querySelector('#end_shipping');
    const shippingDiv = document.querySelector('#shipping');
    const divClothes = document.querySelector('#div_clothes');
    const circleShipping = document.querySelector('.shipping');

    endShipping.addEventListener('click', () => {

        shippingDiv.style.display = "none";
        divClothes.style.display = "flex";
        circleShipping.style.backgroundColor = "black";

    })
}

endShopping();

function endCart() {

    const finishBuyButton = document.querySelector('#finishBuyButton');

    finishBuyButton.addEventListener('click', () => {

        console.log(addressInfoArray, userInfoArray, shippingChoiceArray, cart);

        if (addressInfoArray.length === 0 || userInfoArray === 0 || shippingChoiceArray === 0) {
            alert('No has completado los formularios');
        } else {
            
            const userInfo = document.querySelector('.user_info');
            const CompleteName = document.createElement('p');
            const CompleteAddress = document.createElement('p');
            const Telephone = document.createElement('p');
    
            CompleteName.innerHTML = `Nombre: ${addressInfoArray[0].firstName} ${addressInfoArray[0].lastName}`;
            CompleteAddress.innerHTML = `Direccion: ${addressInfoArray[0].country} / ${addressInfoArray[0].addressOne} / ${addressInfoArray[0].postalCode}`;
            Telephone.innerHTML = `Telefono: ${addressInfoArray[0].telephone}`;
    
            userInfo.appendChild(CompleteName);
            userInfo.appendChild(CompleteAddress);
            userInfo.appendChild(Telephone);
    
            const productInfo = document.querySelector('.product_info');
            const productPrice = document.createElement('p');
            const shippingPrice = document.createElement('p');


            productPrice.innerHTML = `Precio productos: ${cart.reduce((acum, product) =>{
                return acum + product.price
            }, 0)}`;

            const shippingChoice = shippingChoiceArray.pop()

            shippingPrice.innerHTML = `Gastos de envío: ${shippingChoice.priceShipping}`;
    
            productInfo.appendChild(productPrice);
            productInfo.appendChild(shippingPrice);

        }
    })
}

endCart();
