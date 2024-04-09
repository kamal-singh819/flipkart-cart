import { tShirtData } from "../data/data.mjs";
import { addHTML } from "./html-creation.mjs";

const content = document.querySelector(".content");
const countInCart = document.querySelector(".count-in-cart");
const cartIcon = document.querySelector(".cart-image");
const loginBtn = document.querySelector('.login-button');
const userNameText = document.querySelector('.user-name');
const logoutBtn = document.querySelector('.logout-button');
const searchBar = document.querySelector('.search');
const allCategory = document.querySelector('.all');
const menCategory = document.querySelector('.men');
const womenCategory = document.querySelector('.women');
const electronicsCategory = document.querySelector('.electronics');
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
const currentUserEmail = currentUser.length === 1 ? currentUser[0].userEmail : "";
const quantityInCart = JSON.parse(localStorage.getItem('quantity', '{}'));

let searchedProductsArray = [];

function updateCategory(content, target) {
    const parent = target.parentNode;
    parent.querySelectorAll('p').forEach(element => {
        element.classList.remove('active');
    });
    const categoryVal = target.innerText.toLowerCase();
    target.classList.add('active');
    content.innerHTML = "";
    if (categoryVal === 'all') {
        addHTML(currentUserEmail, tShirtData, content, "home");
        return;
    }
    const productsArray = tShirtData.filter(item => item.category.toLowerCase().split(' ').includes(categoryVal));
    if (productsArray.length) addHTML(currentUserEmail, productsArray, content, ["home", countInCart]);
}

addHTML(currentUserEmail, tShirtData, content, ["home", countInCart]);

if (quantityInCart && currentUserEmail in quantityInCart) countInCart.innerText = quantityInCart[currentUserEmail].length;
if (currentUser.length) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    const username = currentUser[0].userName.substring(0, currentUser[0].userName.indexOf(' ')) || currentUser[0].userName;
    userNameText.innerText = `Hey_${username}!`;
    cartIcon.addEventListener('click', () => {
        location.href = "./pages/cart.html";
    });
}
else {
    cartIcon.addEventListener('click', () => {
        alert("First Login yourself.!");
        location.href = "./pages/login.html";
    })
}

logoutBtn.addEventListener('click', () => {
    location.href = "./pages/login-signup.html";
    currentUser.pop();
    localStorage.setItem("currentUser", "[]");
});

searchBar.addEventListener('input', () => {
    const val = searchBar.value.toLowerCase();
    content.innerHTML = "";
    searchedProductsArray = tShirtData.filter(item => item.name.toLowerCase().includes(val));
    if (searchedProductsArray.length) addHTML(currentUserEmail, searchedProductsArray, content, "home");
});

menCategory.addEventListener('click', (e) => {
    updateCategory(content, e.target);
});

womenCategory.addEventListener('click', (e) => {
    updateCategory(content, e.target);
});

electronicsCategory.addEventListener('click', (e) => {
    updateCategory(content, e.target);
});

allCategory.addEventListener('click', (e) => {
    updateCategory(content, e.target);
});
