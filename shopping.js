
'use strict'

const user = {
    name: 'Renan',
    active: true,
    cart: [],
    purchases: []
}

let userHistory = [];

const compose = (f,g) => (...args) => (f(g(...args)));
purchaseItem(
    emptyUserCart,
    buyItem,
    applyTaxToItems,
    addItemToCart
)(user, {name: 'Laptop', price: 200});

function purchaseItem(...fns) {
    return fns.reduce(compose)
}

function addItemToCart(user, item) {
    userHistory.push(user)
    const updatecart = user.cart.concat(item)
    return Object.assign({}, user, { cart: updatecart });
}

function applyTaxToItems(user) {
    userHistory.push(user)
    const {cart} = user;
    const taxRate = 1.3;
    const updatedCart = cart.map(item => {
        return {
            name: item.name,
            price: item.price*taxRate
        }
    })
    return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
    userHistory.push(user)
    const itemsInCart = user.cart;
    return Object.assign({}, user, { purchases: itemsInCart });
}

function emptyUserCart(user) {
    userHistory.push(user)
    return Object.assign({}, user, {cart: [] });
}

console.log(userHistory);