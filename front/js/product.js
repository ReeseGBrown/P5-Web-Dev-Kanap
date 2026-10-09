async function getData () {
    let response = await fetch('http://localhost:3000/api/products/');
    let data = await response.json();
    console.log(response);
    console.log(data);
    return data;
}

//getData();
const itemsTest = document.getElementById('items');
const productPageImg = document.getElementById('item__img');
const productH1 = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productColors = document.getElementById('colors');
let pageID;
document.addEventListener("DOMContentLoaded", async function(){
    let arr = await getData();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id_type = urlParams.get('id');
    pageID = id_type;

    let pageObj;
    for (i in arr) {
        pageObj = arr[i];
        if (pageID == pageObj._id) {
            break;
        }
    }
    console.log(pageObj);
    let productImg = document.createElement('img');
    productImg.setAttribute('src', pageObj.imageUrl);
    productPageImg.appendChild(productImg);
    productH1.textContent = pageObj.name;
    productPrice.textContent = pageObj.price;
    productDescription.textContent = pageObj.description;
    for (i in pageObj.colors) {
        let productColor = document.createElement('option');
        productColor.setAttribute('value', pageObj.colors[i]);
        productColor.textContent = pageObj.colors[i];
        productColors.appendChild(productColor);
    }
});
// appends product to localStorage
const cartButton = document.getElementById('addToCart');
const articleQuantity = document.getElementById('quantity');
const articleColor = document.getElementById('colors');
let currentColor;
articleColor.addEventListener('change', ($event) => {
    currentColor = $event.target.value;
});
let currentQuantity;
articleQuantity.addEventListener('change', ($event) => {
    currentQuantity = $event.target.value;
});
let testArray = [];
let holderVar;
console.log("Testing if I can access localstorage before use: " + localStorage.getItem("testArray"));
if (localStorage.getItem("testArray") != null) {
    holderVar = localStorage.getItem("testArray");
    testArray = holderVar.split(",");
}

console.log("holder Var: " + holderVar);

console.log("the testarray is : ");
console.log(testArray);
cartButton.addEventListener('click', () => {
    if (testArray.length != 0) {
        for (let i = 0; i <= testArray.length; i++) {
            if (testArray[i] == pageID && testArray[i+1] == currentColor) {
                console.log("this is working correctly");
                console.log("this is also working correctly");
                let turnToInt = parseInt(testArray[i+2]);
                turnToInt += parseInt(currentQuantity);
                testArray[i+2] = turnToInt.toString();
                console.log(testArray);
                localStorage.setItem("testArray", testArray);
                break;

            }
            else if (i == testArray.length) {
                console.log("inside else is being triggered");
                console.log(testArray[i]);
                console.log(i);
                testArray.push(pageID);
                testArray.push(currentColor);
                testArray.push(currentQuantity);
                console.log(testArray);
                localStorage.setItem("testArray", testArray);
                break;
            }
        }
    }
    else {
        console.log(" over else is being triggered");
        testArray.push(pageID);
        testArray.push(currentColor);
        testArray.push(currentQuantity);
        console.log(testArray);
        localStorage.setItem("testArray", testArray);
    }
    localStorage.setItem("productID", pageID);
    localStorage.setItem("productColor", currentColor);
    localStorage.setItem("productQuantity", currentQuantity);
    articleQuantity.value = 0;
    articleColor.value = "";
});