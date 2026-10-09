let orderId = document.getElementById('orderId');
document.addEventListener("DOMContentLoaded", async function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id_type = urlParams.get('orderId');
    pageID = id_type;
    console.log(pageID);
    orderId.textContent = pageID;
});
