import { addToLocalStorage, removeFromLocalStorage } from "./functions.mjs";
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
let currentUserEmail = currentUser.length === 1 ? currentUser[0].userEmail : "";
function addToCartFunction(e, isCart) {
    if (isCart[0] === "home") {
        isCart[1].innerText = Number(isCart[1].innerText) + 1;
    }
    if (!currentUser.length) {
        alert("User does not exists.!");
        location.href = "./pages/login-signup.html";
        return;
    }
    currentUserEmail = currentUser[0].userEmail;
    const buttonId = e.target.dataset.addcartbuttonid;
    const parent = e.target.parentNode;
    const addRemoveButtons = parent.querySelector('.add-remove-btns');
    const countOfProduct = parent.querySelector('.counter');
    countOfProduct.innerText = 1;
    const item = {
        id: buttonId,
        quantity: 1,
        couponPrice: 0
    };
    e.target.style.display = "none";
    addRemoveButtons.style.display = "block";
    addToLocalStorage(currentUserEmail, item, countOfProduct, isCart);
}

function removeFunction(e, isCart) {
    const buttonId = e.target.dataset.removebuttonid;
    const parent = (e.target.parentNode).parentNode;
    const addRemoveButtons = parent.querySelector('.add-remove-btns');
    const addToCartButton = parent.querySelector('.add-cart-btn');
    const countOfProduct = parent.querySelector('.counter');
    const priceElement = parent.querySelector('.price');
    if (isCart[0] === 'cart') {
        priceElement.innerText = "Rs. " + (isCart[2] * (Number(countOfProduct.innerText) - 1));
        isCart[1].innerText = Number(isCart[1].innerText) - isCart[2];
    }
    removeFromLocalStorage(currentUserEmail, buttonId, addRemoveButtons, addToCartButton, countOfProduct, isCart);
}

function addFunction(e, isCart) {
    const buttonId = e.target.dataset.addbuttonid;
    const parent = (e.target.parentNode).parentNode;
    const countOfProduct = parent.querySelector('.counter');
    const priceElement = parent.querySelector('.price');
    const item = {
        id: buttonId,
        quantity: 1,
        couponPrice: 0
    };
    if (isCart[0] === 'cart') {
        priceElement.innerText = "Rs. " + (isCart[2] * (Number(countOfProduct.innerText) + 1));
        isCart[1].innerText = Number(isCart[1].innerText) + isCart[2];
    }
    addToLocalStorage(currentUserEmail, item, countOfProduct, isCart);
}

function removeFromCartFunction(e, isCart) {
    const buttonId = e.target.dataset.removebuttonidfromcart;
    const parent = (e.target.parentNode).parentNode;
    const countOfProduct = parent.querySelector('.counter');
    const parentOfThisCard = parent.parentNode;
    parentOfThisCard.removeChild(parent);
    isCart[1].innerText = Number(isCart[1].innerText) - (Number(countOfProduct.innerText) * isCart[2]);

    const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
    let currentUserQuantity = quantityInCart[currentUserEmail];
    const index = currentUserQuantity.findIndex(ele => ele.id === buttonId);
    quantityInCart[currentUserEmail].splice(index, 1);
    localStorage.setItem('quantity', JSON.stringify(quantityInCart));
}

export function addHTML(currentUserEmail, data, container, isCart) {
    data.forEach((tShirt) => {
        const quantityInCart = JSON.parse(localStorage.getItem("quantity") || "{}");
        let currentUserQuantity = [];
        if (currentUserEmail in quantityInCart) currentUserQuantity = quantityInCart[currentUserEmail];
        const indexInQuantityArray = currentUserQuantity.findIndex((ele) => Number(ele.id) === tShirt.index);
        const quantityOfProduct = indexInQuantityArray === -1 ? 1 : currentUserQuantity[indexInQuantityArray].quantity;

        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");
        const imgTag = document.createElement("img");
        imgTag.setAttribute("src", tShirt.picture);
        imgTag.setAttribute("alt", "tshirt image");
        cardDiv.appendChild(imgTag);

        const descpDiv = document.createElement("div");
        descpDiv.setAttribute("class", "description");

        const tshirtTitle = document.createElement("p");
        tshirtTitle.innerText = tShirt.name;
        const tshirtPrice = document.createElement("p");
        tshirtPrice.setAttribute("class", "price");
        isCart[0] === 'cart' ? tshirtPrice.innerText = "Rs. " + tShirt.price * currentUserQuantity[indexInQuantityArray].quantity : tshirtPrice.innerText = "Rs. " + tShirt.price;
        const addToCartButton = document.createElement("button");
        addToCartButton.innerText = "Add to Cart";
        addToCartButton.setAttribute("class", "add-cart-btn");
        addToCartButton.setAttribute("data-addcartbuttonid", tShirt.index);
        if (isCart[0] === 'cart') {
            const removeButtonFromCart = document.createElement('button');
            removeButtonFromCart.setAttribute('class', 'remove-button-from-cart');
            removeButtonFromCart.setAttribute("data-removebuttonidfromcart", tShirt.index);
            removeButtonFromCart.innerText = "Remove";
            descpDiv.appendChild(removeButtonFromCart);
            removeButtonFromCart.addEventListener("click", (e) => removeFromCartFunction(e, isCart));
        }
        addToCartButton.addEventListener("click", (e) => addToCartFunction(e, isCart));

        const addRemoveDiv = document.createElement("div");
        addRemoveDiv.setAttribute("class", "add-remove-btns");
        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "remove-btn");
        removeButton.setAttribute("data-removebuttonid", tShirt.index);
        removeButton.addEventListener("click", (e) => {
            isCart[2] = tShirt.price;
            removeFunction(e, isCart);
        });
        removeButton.innerText = "-";
        const counter = document.createElement("span");
        counter.setAttribute("class", "counter");
        counter.innerText = quantityOfProduct;
        const addButton = document.createElement("button");
        addButton.setAttribute("class", "add-btn");
        addButton.setAttribute("data-addbuttonid", tShirt.index);
        addButton.addEventListener("click", (e) => {
            isCart[2] = tShirt.price;
            addFunction(e, isCart)
        });
        addButton.innerText = "+";
        addRemoveDiv.append(removeButton, counter, addButton);
        if (indexInQuantityArray >= 0) {
            addToCartButton.style.display = "none";
            addRemoveDiv.style.display = "block";
        }
        else {
            addToCartButton.style.display = "block";
        }
        descpDiv.append(tshirtTitle, tshirtPrice, addToCartButton, addRemoveDiv);
        cardDiv.appendChild(descpDiv);
        container.appendChild(cardDiv);
    });
}
