//localStorage.clear();
async function getData () {
    let response = await fetch('http://localhost:3000/api/products/');
    let data = await response.json();
    console.log(response);
    console.log(data);
    return data;
}

//getData();
const itemsTest = document.getElementById('items');

document.addEventListener("DOMContentLoaded", async function(){
    let arr = await getData();
    //for loop that appends each product gathered from getData into the DOM
    for (i in arr) {
        let testObj = arr[i];
        let newItema = document.createElement('a');
        let newItemArticle = document.createElement('article');
        let newItemImg = document.createElement('img');
        let newItemh3 = document.createElement('h3');
        let newItemp = document.createElement('p');
        newItema.appendChild(newItemArticle);
        newItema.setAttribute('href', './product.html?id=' + testObj._id);
        newItemArticle.appendChild(newItemImg);
        newItemArticle.appendChild(newItemh3);
        newItemArticle.appendChild(newItemp);
        newItemImg.setAttribute('src', testObj.imageUrl);
        newItemImg.setAttribute('alt', testObj.altTxt);
        newItemh3.classList.add('productName');
        newItemh3.textContent = testObj.name;
        newItemp.classList.add('productDescription');
        newItemp.textContent = testObj.description;
        itemsTest.appendChild(newItema);
    }
});

/*.then(post => {
console.log(post.name);
});
*/
/*
const section = document.querySelector('section');
section.appendChild();
*/
/*let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'localhost:3000/api/products/');
apiRequest.send();

apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        const response = JSON.parse(apiRequest.response);
        console.log(response);
    }
}
*/
/*
*getElementsbyID "items"
*for loop in Product.js appending each object under section with ID items
****append product name to h3 element
****append image to img element
****append alt text to alt tag
****append description to p element
****store color and price for product page
*/