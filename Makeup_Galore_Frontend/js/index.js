//------------------ finding HTML elements -----------------//

const makeupDiv = document.querySelector('#makeup-div')

const forwardBtn = document.querySelector('#forward')
const backBtn = document.querySelector('#back')

const blushBtn = document.querySelector('#blush-button')
const bronzerBtn = document.querySelector('#bronzer-button')
const eyesBtn = document.querySelector('#eyes-button')
const foundationBtn = document.querySelector('#foundation-button')
const lipsBtn = document.querySelector('#lips-button')
const mascaraBtn = document.querySelector('#mascara-button')

const blushDiv = document.querySelector('#blush-div')
const bronzerDiv = document.querySelector('#bronzer-div')
const eyesDiv = document.querySelector('#eyes-div')
const foundationDiv = document.querySelector('#foundation-div')
const lipsDiv = document.querySelector('#lips-div')
const mascaraDiv = document.querySelector('#mascara-div')

const cartDiv = document.querySelector('#cart-item-div')
const refreshBtn = document.querySelector('#refresh-btn')
const totalPriceEl = document.querySelector('#total-price')
const payBtn = document.querySelector('#pay-btn')
const purchaseBtn = document.querySelector('#purchase-btn')


const sidebar = document.querySelector('#mySidebar')

const totalPricePaymentEl = document.querySelector('#total-price-payment')


//------------------ global variables -----------------//

let pageNumber = 0
let currentUserId = 6
let currentUser = {}

//------------------ initialise function -----------------//

const init = () => {
    fetchUser(currentUserId).then(user => {
        currentUser = user
        // debugger
        updateCartWithItems()
    }).then(fetchCalls)
}

const fetchCalls = () => {
    fetchBlushProducts().then(renderBlushProducts)
    fetchBronzerProducts().then(renderBronzerProducts)
    fetchEyesProducts().then(renderEyesProducts)
    fetchFoundationProducts().then(renderFoundationProducts)
    fetchLipsProducts().then(renderLipsProducts)
    fetchMascaraProducts().then(renderMascaraProducts)
}

//------------------ render products -----------------//


const renderItem = (item, div) => {
        const makeupCard = document.createElement('div')
        makeupCard.className = 'polaroid'

         if (item.price === "0.0" || item.price === null ) return item.price = 10.0
         if (item.description === null || item.description === "" ) return item.description = 'Click on the image to find out more.'
         if (item.brand === null || item.brand === "") return item.brand = item.name
         if (item.image_link === 'https://static-assets.glossier.com/production/spree/images/attachments/000/001/241/portrait_normal/CP_PDP_02.jpg?1488382023') return item.image_link = 'https://i.ebayimg.com/images/g/UAMAAOSwbrZcdN31/s-l1600.jpg'

        const capitalize = (s) => {
            return s && s[0].toUpperCase() + s.slice(1);
        }

        makeupCard.innerHTML = `
            <h4>${item.name}</h4>

            <a target="_blank" href="${item.product_link}">
            <img src="${item.image_link}">
            </a>
            <p>${capitalize(item.brand)}</p>
            <p> $${item.price} CAD </p>
            <p>${item.description}</p>
            <button id='add-button${item.id}'>Add to cart</button>
        `
        div.append(makeupCard)

        makeupCard.querySelector('button').addEventListener('click', () => {
           addItemToDOM(item, currentUserId)
        })
}

const renderBlushProducts = items => {
    items.forEach(item => renderItem(item, blushDiv))
}

const renderBronzerProducts = items => {
    items.forEach(item => renderItem(item, bronzerDiv))
}

const renderEyesProducts = items => {
    items.forEach(item => renderItem(item, eyesDiv))
}

const renderFoundationProducts = items => {
    items.forEach(item => renderItem(item, foundationDiv))
}

const renderLipsProducts = items => {
    items.forEach(item => renderItem(item, lipsDiv))
}

const renderMascaraProducts = items => {
    items.forEach(item => renderItem(item, mascaraDiv))
}

//------------------- client side add + delete item to cart ----------------------//


const deleteItemFromDOM = (item) => {
    item = currentUser.items.find(currentItem => currentItem.id === item.id)
    currentUser.items = currentUser.items.filter(currentItem => currentItem.id !== item.id)
    return deleteItemFromServer(item)
        .then(updateCartWithItems)
}

const addItemToDOM = (item, currentUserId) => {
    return addItemToServer(item, currentUserId)
        .then(() => {
            currentUser.items.push(item)
            updateCartWithItems()
        })
}

//---------------------------------------------- User's cart ------------------------------------------------//


//-------------------- cart items quantity --------------------//

const increase_by_one = (field, cartItem) => {
    let quantityEl = document.getElementById(field)
    itemQuantity = parseInt(quantityEl.value)
    quantityEl.value = itemQuantity + 1
    let newCartItemQuantity = cartItem.quantity + 1
    cartItem.quantity = newCartItemQuantity
    editItemQuantityInServer(cartItem)
        .then(updatePriceForEachItem(cartItem))
}
    
const decrease_by_one = (field, cartItem) => {
    let quantityEl = document.getElementById(field)
    itemQuantity = parseInt(quantityEl.value)
    if (itemQuantity > 0) {
        if( (itemQuantity - 1) > 0) {
            quantityEl.value = itemQuantity - 1
        }
    }
    let newCartItemQuantity = cartItem.quantity - 1
    cartItem.quantity = newCartItemQuantity
    editItemQuantityInServer(cartItem)
        .then(updatePriceForEachItem(cartItem))
} 

const isInputNumber = (event) => {
    let x = String.fromCharCode(event.which)
    if(!(/[0-9]/.test(x))){
        alert("Please input a number.")
        event.preventDefault()
    }
 }

//-------------------- calculate prices(individual & total) ------------------//

const calculateCartItemsSum = () => {
    let itemsArr = Array.from(document.querySelectorAll('p.item-price')).map(p => parseFloat(p.innerText.replace('$', '')))
    if (itemsArr == 0) {
        cartDiv.innerText = 'Your cart is empty.'
        totalPriceEl.innerText = `Total: $0 CAD`
    } else {
        let cartItemsTotal = parseFloat(itemsArr.reduce((a,b) => parseFloat(a) + parseFloat(b))).toFixed(2)
        totalPriceEl.innerText = `Total: $${cartItemsTotal} CAD`
        totalPricePaymentEl.innerText = `Total: $${cartItemsTotal} CAD`
    }
}

const updatePriceForEachItem = (cartItem) => {
    const b = parseFloat(document.querySelector(`#x-${cartItem.id}`).innerText).toFixed(2)
    let y = parseFloat(document.querySelector(`#qty${cartItem.id}`).value).toFixed(2)

    let sum = document.querySelector(`#item-price${cartItem.id}`)
    sum.innerHTML = `$${b * y}`
    // let cartItems = currentUser.items
    // calculateCartItemsSum(cartItems)
    calculateCartItemsSum()
}

//--------------------- rendering & updating User's cart -----------------------//


const updateCartWithItems = () => {
    cartDiv.innerHTML = ``
    let cartItems = currentUser.items
    cartItems.forEach(cartItem => renderCartWithEachItem(cartItem))
    calculateCartItemsSum()
}

const renderCartWithEachItem = cartItem => {
    const itemInCart = document.createElement('div')
    itemInCart.className = 'cart-item'

    if (cartItem.price === "0.0" || cartItem.price === null) return cartItem.price = 10.0
    // if (cartItem.price === "0.0") return cartItem.price = 


    itemInCart.innerHTML = `
        <div class="item-name-price">
            <h4 class="item-name">${cartItem.name}</h4>
            <p id="item-price${cartItem.id}" class="item-price">$${cartItem.price}</p>
        </div>
            <img class="cart-item-image" src="${cartItem.image_link}" style="height: 70px; width: 70px;">
        <div class="quantity-container">
            <div>
                Qty: <input class='quantity-input' id="qty${cartItem.id}" type="number" min='1' value="${cartItem.quantity}" name="qty" onKeyPress='isInputNumber(event)' />
                <button id='increase-button${cartItem.id}'>+</button>
                <button id='decrease-button${cartItem.id}'>-</button>
                <p id="x-${cartItem.id}" style="display: none;">${cartItem.price}</p>
            </div>
            <button class='delete-button' id='delete-button${cartItem.id}'>X</button>
        </div>
        `

    itemInCart.querySelector(`#delete-button${cartItem.id}`).addEventListener('click', () => deleteItemFromDOM(cartItem))    
    itemInCart.querySelector(`#increase-button${cartItem.id}`).addEventListener('click', () => increase_by_one(`qty${cartItem.id}`, cartItem))
    itemInCart.querySelector(`#decrease-button${cartItem.id}`).addEventListener('click', () => decrease_by_one(`qty${cartItem.id}`, cartItem))

    cartDiv.append(itemInCart)

}

//------------------ calling initialise function -----------------//

init()

