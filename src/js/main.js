let input = document.getElementsByClassName("form_input");

Array.from(input).forEach(input => {

    input.addEventListener('keyup', function () {
        if (input.value.length >= 1) {
            input.nextElementSibling.classList.add("set");
        } else {
            input.nextElementSibling.classList.remove("set");
        }
    })

})



console.log(countryCode);
