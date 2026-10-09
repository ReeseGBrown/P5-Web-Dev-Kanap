async function getData () {
    let response = await fetch('http://localhost:3000/api/products/');
    let data = await response.json();
    console.log(response);
    console.log(data);
    return data;
}

let cart = [/*ID, color, quantity */];
// Use a loop to check if the product is already a part of the array, and if it is, increase the quantity by however much is needed
console.log("The product ID is " + localStorage.getItem("productID"));
console.log("The product quantity is " + localStorage.getItem("productQuantity"));
console.log("The product color is " + localStorage.getItem("productColor"));
console.log("THE TEST ARRAY : " + localStorage.getItem("testArray"));
let testingVar = localStorage.getItem("testArray");
console.log("Testing Var: " + testingVar);
cart = testingVar.split(",");

/*cart.push(localStorage.getItem("testArray"));

cart.push(localStorage.getItem("productID"));
cart.push(localStorage.getItem("productColor"));
cart.push(localStorage.getItem("productQuantity"));
*/
console.log(cart);
let holderArray = [];
let holderCart = [...cart];
let products = [];
const cartItems = document.getElementById('cart__items');
const cart_Item = document.getElementsByClassName('cart__item');
const cartContent = document.getElementsByClassName('cart__item__content');
const cartDescription = document.getElementsByClassName('cart__item__content__description');
const cartSettings = document.getElementsByClassName('cart__item__content__settings');
const cartQuantity = document.getElementsByClassName('cart__item__content__settings__quantity');
const itemQuantityNum = document.getElementsByClassName('itemQuantity');
const cartDelete = document.getElementsByClassName('cart__item__content__settings__delete');
const itemDelete = document.getElementsByClassName("deleteItem");
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
const testingQuery = document.querySelector('.cart__item__content__settings__delete');
let priceSum = 0;
let totalSum = 0;
let currentQuantity = 0;
let testVar;
let testVar2;
document.addEventListener("DOMContentLoaded", async function(){
    let arr = await getData();
    for (let k = 0; k <= cart.length-3; k+=3) {
        products.push(cart[k]);
    }
    console.log("PRODUCTS wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    console.log(products);
    for (let i = 0; i <= cart.length; i+=3) {
        console.log("this is cart at i: ");
        console.log(cart[i]);
        console.log("This is the cart length: " + cart.length);
        console.log("This is cart at 6: ");
        console.log(cart[i+6]);
        for (j in arr) {
            let testObj = arr[j];
            console.log("This is the obj: ");
            console.log(testObj);
            let newArticle = document.createElement('article');
            let newDiv1 = document.createElement('div');
            let newDiv2 = document.createElement('div');
            let newDiv3 = document.createElement('div');
            let newDiv4 = document.createElement('div');
            let newDiv5 = document.createElement('div');
            let newDiv6 = document.createElement('div');
            let newImg = document.createElement('img');
            let newH2 = document.createElement('h2');
            let newP1 = document.createElement('p');
            let newP2 = document.createElement('p');
            let newP3 = document.createElement('p');
            let newP4 = document.createElement('p');
            let newInput = document.createElement('input');
            if (cart[i] == testObj._id) {
                
                console.log("they are successfully equal to each other");
                newArticle.appendChild(newDiv1);
                newArticle.classList.add('cart__item');
                newArticle.setAttribute('data-id', testObj._id);
                newArticle.setAttribute('data-color', cart[i+1]);
                newDiv1.appendChild(newImg);
                newDiv1.classList.add('cart__item__img');
                newImg.setAttribute('src', testObj.imageUrl);
                newImg.setAttribute('alt', testObj.altTxt);
                newArticle.appendChild(newDiv2);
                newDiv2.classList.add('cart__item__content');
                newDiv2.appendChild(newDiv3);
                newDiv3.classList.add('cart__item__content__description');
                newDiv3.appendChild(newH2);
                newH2.textContent = testObj.name;
                newDiv3.appendChild(newP1);
                newP1.textContent = cart[i+1];
                newDiv3.appendChild(newP2);
                newP2.textContent = "$" + testObj.price;
                newDiv2.appendChild(newDiv4);
                newDiv4.classList.add('cart__item__content__settings');
                newDiv4.appendChild(newDiv5);
                newDiv5.classList.add('cart__item__content__settings__quantity');
                newDiv5.appendChild(newP3);
                newP3.textContent = "Quantity: ";
                newDiv5.appendChild(newInput);
                newInput.classList.add('itemQuantity');
                newInput.setAttribute('type', 'number');
                newInput.setAttribute('name', 'itemQuantity');
                newInput.setAttribute('min', "1");
                newInput.setAttribute('max', "100");
                newInput.setAttribute('value', cart[i+2]);
                newInput.addEventListener('change', ($event) => {
                    currentQuantity = $event.target.value;
                    console.log("Current quan: " + currentQuantity);
                    testVar = testObj._id;
                    testVar2 = cart[i+1];
                    console.log("closest id: " + testVar);
                    console.log("the color: " + testVar2);
                    
                    for (let k = 0; k <= holderCart.length; k+=3) {
                        if (holderCart[k] == testVar && holderCart[k+1] == testVar2) {
                            holderCart[k+2] = parseInt(currentQuantity);
                            totalSum = 0;
                            priceSum = 0;
                            
                            for (let l = 0; l <= holderCart.length; l+=3) {
                                
                                for (m in arr) {
                                    
                                    let testObj = arr[m];
                                    if (holderCart[l] == testObj._id) {
                                        totalSum += parseInt(holderCart[l+2]);
                                        priceSum += (parseInt(holderCart[l+2]) * parseInt(testObj.price));
                                        
                                        
                                    }
                                }
                            }
                            
                            // this is probably why it keeps resetting even after I delete: cart is being changed and updated to testArray, while in the 
                            // delete, holderCart is being updated to testArray
                            console.log("HOLDER CART: ");
                            console.log(holderCart);
                            localStorage.setItem("testArray", holderCart);
                            totalQuantity.textContent = totalSum;
                            totalPrice.textContent = priceSum;
                        }
                    }Z
                    
                })
                newDiv4.appendChild(newDiv6);
                newDiv6.classList.add('cart__item__content__settings__delete');
                newDiv6.appendChild(newP4);
                newP4.classList.add('deleteItem');
                newP4.textContent = "Delete";
                newP4.addEventListener('click', () => {
                    console.log("The clicking is working");
                    console.log(holderCart);
                    
                    newP4.closest("article").remove();
                    testVar = testObj._id;
                    testVar2 = cart[i+1];
                    console.log(testVar);
                    console.log(testVar2);
                    console.log("at i: " + cart[i]);
                    for (let k = 0; k <= holderCart.length-3; k+=3) {
                        
                        console.log("ONE: " + holderCart.length); 
                        if ((holderCart[k] == testVar && holderCart[k+1] != testVar2) || holderCart[k] != testVar) {
                            console.log(holderCart[k]);
                            console.log(testVar);
                            console.log(holderCart[k+1]);
                            console.log(testVar2);
                            console.log("TWO: " + holderCart.length);
                            holderArray.push(holderCart[k]);
                            holderArray.push(holderCart[k+1]);
                            holderArray.push(holderCart[k+2]);
                            console.log("THREE: " + holderCart.length);
                            continue;
                        }
                    }
                    totalSum = 0;
                    priceSum = 0;
                    console.log(holderArray);
                    for (let m = 0; m <= holderArray.length-3; m+=3) {
                        console.log("at m: " + holderArray[m]);
                        
                        for (n in arr) {
                            let priceObj = arr[n];
                            if (holderArray[m] == priceObj._id) {
                                totalSum += parseInt(holderArray[m+2]);
                                priceSum += (parseInt(holderArray[m+2]) * parseInt(priceObj.price));
                                
                            }

                        }
                    }
                    totalQuantity.textContent = totalSum;
                    totalPrice.textContent = priceSum;
                    console.log("cart: ");
                    console.log(holderCart);
                    console.log("holder: ");
                    console.log(holderArray);
                    holderCart = [...holderArray];
                    console.log(holderCart);
                    console.log("FOUR: " + holderCart.length);
                    if (holderArray.length == 0) {
                        localStorage.clear();
                        console.log("IT IS TRUE");
                    }
                    else {
                        localStorage.setItem("testArray", holderArray);
                    }

                    holderArray = [];
                    for (let k = 0; k <= holderCart.length-3; k+=3) {
                        holderArray.push(holderCart[k]);
                    }
                    products = [...holderArray];
                    holderArray = [];
                    console.log("PRODUCTS");
                    console.log(products);
                });
                cartItems.appendChild(newArticle);
                
            }
        }
        
    }
    for (let i = 0; i <= cart.length; i+=3) {
        for (j in arr) {
            let testObj = arr[j];
            if (cart[i] == testObj._id) {
                totalSum += parseInt(cart[i+2]);
                priceSum += (parseInt(cart[i+2]) * parseInt(testObj.price));
            }
        }
    }
    totalQuantity.textContent = totalSum;
    totalPrice.textContent = priceSum;
   
});
const orderForm = document.getElementsByClassName("cart__order__form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameError = document.getElementById("lastNameErrorMsg");
const addressError = document.getElementById("addressErrorMsg");
const cityError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");
const order = document.getElementById("order");
const invalidName = new RegExp('[ 0123456789!@#$%^&*=_+|;:\'\"\\,<.>/?`~]');
const invalidCity = new RegExp('[0123456789!@#$%^&*=_+|;:\'\"\\,<.>/?`~]');
const invalidAddress = new RegExp(/^\(?([0-9]{1,5})\)?[ ](?:[A-Za-z]+[ -]?)+[A-Za-z]$/g);
const invalidEmail =  new RegExp(/\S+@\S+\.\S+/g);
console.log("=================================================================");
console.log("regtest: " + invalidName.test("testName"));
console.log("regtest: " + invalidName.test("t3stN4m3"));

let body = {
    contact: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: ""
    },
    products: [""]
    }
let firstNameCheck = false;
let lastNameCheck = false;
let addressCheck = false;
let cityCheck = false;
let emailCheck = false;
firstName.addEventListener('input', ($event) => {
    let tempTest = firstName.value;
    console.log("length: " + firstName.value.trim().length);
    if (invalidName.test(tempTest) || tempTest.length < 2 || firstName.value.trim().length === 0) {
        firstNameError.textContent = "Invalid First Name";
        firstNameCheck = false;
    }
    else if (invalidName.test(tempTest) == false || tempTest.length >= 2 || firstName.value.trim().length === 0){
        firstNameError.textContent = "";
        body.contact.firstName = tempTest;
        firstNameCheck = true;

    }
});
lastName.addEventListener('input', ($event) => {
    let tempTest = lastName.value;
    if (invalidName.test(tempTest) || tempTest.length < 2 || lastName.value.trim().length === 0) {
        lastNameError.textContent = "Invalid Last Name";
        lastNameCheck = false;
    }
    else if (invalidName.test(tempTest) == false || tempTest.length >= 2 || lastName.value.trim().length === 0){
        lastNameError.textContent = "";
        body.contact.lastName = tempTest;
        lastNameCheck = true;

    }
});
address.addEventListener('input', ($event) => {
    let tempTest = address.value;
    console.log("")
    if (invalidAddress.test(tempTest)) {
        addressError.textContent = "";
        addressCheck = true;
        
    }
    else if (invalidAddress.test(tempTest) == false){
        addressError.textContent = "Invalid address";
        body.contact.address = tempTest;
        addressCheck = false;
    }
});
city.addEventListener('input', ($event) => {
    let tempTest = city.value;
    if (invalidCity.test(tempTest) || tempTest.length < 2 || city.value.trim().length === 0) {
        cityError.textContent = "Invalid City Name";
        cityCheck = false;
        
    }
    else if (invalidCity.test(tempTest) == false || tempTest.length >= 2 || city.value.trim().length === 0){
        cityError.textContent = "";
        body.contact.city = tempTest;
        cityCheck = true;
        

    }
});
email.addEventListener('input', ($event) => {
    let tempTest = email.value;
    if (invalidEmail.test(tempTest)) {
        emailError.textContent = "";
        emailCheck = true;
        
        
    }
    else if (invalidEmail.test(tempTest) == false){
        emailError.textContent = "Invalid email";
        body.contact.email = tempTest;
        emailCheck = false;
        
    }
});

body.products = products;
async function sendData () {
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    let response = await fetch('http://localhost:3000/api/products/order/', options);
    let data = await response.json();
    //console.log(body);
    //console.log(JSON.stringify(body));
    //console.log(response);
    //console.log(data);
    return data;
}
order.addEventListener('click', async (e) => {
    if (firstNameCheck == true && lastNameCheck == true && addressCheck == true && cityCheck == true && emailCheck == true) {
        e.preventDefault();
        let arr2 = await sendData();
        order.setAttribute('href', './confirmation.html?orderId=' + arr2.orderId);
        //console.log("============================================= SEND DATA RESULT ==========================================")
        //console.log(arr2);
        //console.log(arr2.orderId); 
        localStorage.clear();
        window.location.href='./confirmation.html?orderId=' + arr2.orderId;
    }
    else {
        if (firstName.value.trim().length == 0) {
            firstNameError.textContent = "Invalid First Name";
        }
        if (lastName.value.trim().length == 0) {
            lastNameError.textContent = "Invalid Last Name";
        }
        if (address.value.trim().length == 0) {
            addressError.textContent = "Invalid Address";
        }
        if (city.value.trim().length == 0) {
            cityError.textContent = "Invalid City Name";
        }
        if (email.value.trim().length == 0) {
            emailError.textContent = "Invalid Email";
        }
    }
    /*e.preventDefault();
    let arr2 = await sendData();
    order.setAttribute('href', './confirmation.html?orderId=' + arr2.orderId);
    console.log("============================================= SEND DATA RESULT ==========================================")
    console.log(arr2);
    console.log(arr2.orderId); 
    localStorage.clear();
    window.location.href='./confirmation.html?orderId=' + arr2.orderId; 
    */ 
});

// filter method
/*
newP4.addEventListener('click', () => {
                    console.log("----------------------------The clicking is working");
                    //newP4.closest("article").remove();
                    testVar = testObj._id;
                    testVar2 = cart[i+1];
                    let holderArray = [];
                    for (let k = 0; k < cart.length; k+=3) {
                        console.log("The cart length is: " + cart.length);
                        if (((cart[k] == testVar && cart[k+1] != testVar2) || cart[k] != testVar) && cart[k] != "") {
                            console.log("isTrue");
                            console.log(cart[k]);
                            //console.log(" uhh");
                            //console.log(cart[k-2]);
                            console.log(k);
                            console.log("testVar: " + testVar);
                            console.log(cart[k+1]);
                            console.log("testVar2: " + testVar2);
                            console.log(cart[i]);
                            console.log(i);
                            holderArray.push(cart[k]);
                            holderArray.push(cart[k+1]);
                            holderArray.push(cart[k+2]);
                            continue;
                        }
                    }
                    
                    console.log("cart: ");
                    console.log(cart);
                    console.log("holder: ");
                    console.log(holderArray);
                    cart = holderArray;
                    console.log(cart);
                    console.log("The cart length: ");
                    console.log(cart.length);
                    //localStorage.setItem("testArray", cart);
                });
                */