export function addToLocalStorage(currentUserEmail, item, countOfProduct, isCart) {
    const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
    let currentUserQuantity = [];

    if (currentUserEmail in quantityInCart) {
        currentUserQuantity = quantityInCart[currentUserEmail];
        const index = currentUserQuantity.findIndex(ele => ele.id === item.id);
        if (index !== -1) {
            countOfProduct.innerText = Number(countOfProduct.innerText) + 1;
            quantityInCart[currentUserEmail][index].quantity += 1;
            quantityInCart[currentUserEmail][index].couponPrice = item.couponPrice; //if want to update coupon price
        }
        else quantityInCart[currentUserEmail].push(item);
    }
    else quantityInCart[currentUserEmail] = [item];
    localStorage.setItem('quantity', JSON.stringify(quantityInCart));
}

export function removeFromLocalStorage(currentUserEmail, id, addRemoveButtons, addToCartBtn, countOfProduct, isCart) {
    const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
    let currentUserQuantity = quantityInCart[currentUserEmail];
    const index = currentUserQuantity.findIndex(ele => ele.id === id);
    if (currentUserQuantity[index].quantity === 1) {
        addRemoveButtons.style.display = "none";
        addToCartBtn.style.display = "block";
        currentUserQuantity.splice(index, 1);
        quantityInCart[currentUserEmail] = currentUserQuantity;
        if (isCart[0] === 'home') isCart[1].innerText = Number(isCart[1].innerText) - 1;
        if (isCart[0] === 'cart') location.reload();
    }
    else quantityInCart[currentUserEmail][index].quantity -= 1;
    countOfProduct.innerText = Number(countOfProduct.innerText) - 1;
    localStorage.setItem('quantity', JSON.stringify(quantityInCart));
}
