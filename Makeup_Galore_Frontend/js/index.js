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
const nailPolishBtn = document.querySelector('#nail-polish-button')

const blushDiv = document.querySelector('#blush-div')
const bronzerDiv = document.querySelector('#bronzer-div')
const eyesDiv = document.querySelector('#eyes-div')
const foundationDiv = document.querySelector('#foundation-div')
const lipsDiv = document.querySelector('#lips-div')
const mascaraDiv = document.querySelector('#mascara-div')

const cartDiv = document.querySelector('#cart-item-div')

const sidebar = document.querySelector('#mySidebar')

const refreshBtn = document.querySelector('#refresh-btn')

const totalPriceEl = document.querySelector('#total-price')

//------------------ global variables -----------------//

let pageNumber = 0
let currentUserId = 4
let currentUser = {}

//------------------ initialise function -----------------//

const init = () => {
    
    fetchUser(currentUserId).then(user => {
        currentUser = user
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

        // if (item.price === "0.0" || null ) {
        //     item.price = 10.0
        // } else if (item.description == null) {
        //     item.description = 'Click on the image to find out more.'
        // } else if (item.brand === null ) {
        //     item.brand = item.name
        // }

         if (item.price === "0.0" || item.price === null ) return item.price = 10.0
         if (item.description == null) item.description = 'Click on the image to find out more.'
         if (item.brand === null ) return item.brand = item.name
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
            <p> $ ${item.price} CAD </p>
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

//------------------------- User's cart -----------------------------//

const increase_by_one = (field) => {
    let quantityEl = document.getElementById(field)
    itemQuantity = parseInt(quantityEl.value)
    quantityEl.value = itemQuantity++
}
    
const decrease_by_one = (field) => {
    let quantityEl = document.getElementById(field)
    itemQuantity = parseInt(quantityEl.value)
    if (itemQuantity > 0) {
    if( (itemQuantity - 1) > 0) {
        quantityEl.value = itemQuantity--
    }
    }
} 

const updateCartWithItems = () => {
    cartDiv.innerHTML = ``
    let cartItems = currentUser.items
    cartItems.forEach(cartItem => renderCartWithEachItem(cartItem))

    calculateCartItemsSum(cartItems)
}

const renderCartWithEachItem = cartItem => {
    const itemInCart = document.createElement('div')
    itemInCart.className = 'cart-item'

    if (cartItem.price === "0.0" || cartItem.price === null) return cartItem.price = 10.0

    // if (item.image_link === 'https://static-assets.glossier.com/production/spree/images/attachments/000/001/241/portrait_normal/CP_PDP_02.jpg?1488382023') return item.image_link = 'https://i.ebayimg.com/images/g/UAMAAOSwbrZcdN31/s-l1600.jpg'

    itemInCart.innerHTML = `
        <h4>${cartItem.name}</h4>
        <img class='w3-display-container' src="${cartItem.image_link}" style="height: 70px; width: 70px;">
        <p> $ ${cartItem.price}</p>
        <div class='w3-display-container'>
            Qty: <input id="qty${cartItem.id}" type="number" min='1' value="1" name="qty" onKeyPress='isInputNumber(event)' />
            <button id='increase-button${cartItem.id}'>+</button>
            <button id='decrease-button${cartItem.id}'>-</button><br>
            <button id='delete-button${cartItem.id}'>X</button>
        </div>
    `

    itemInCart.querySelector(`#delete-button${cartItem.id}`).addEventListener('click', () => deleteItemFromDOM(cartItem))
    itemInCart.querySelector(`#increase-button${cartItem.id}`).addEventListener('click', () => increase_by_one(`qty${cartItem.id}`))
    itemInCart.querySelector(`#decrease-button${cartItem.id}`).addEventListener('click', () => decrease_by_one(`qty${cartItem.id}`))

    cartDiv.append(itemInCart)
  
}

const calculateCartItemsSum = cartItems => {
    let itemsArr = cartItems.map(cartItem => cartItem.price)
    if (itemsArr == 0) {
        cartDiv.innerText = 'Your cart is empty.'
        totalPriceEl.innerText = `Total: $0 CAD`
    } else {
        let cartItemsTotal = itemsArr.reduce((a,b) => parseFloat(a) + parseFloat(b))
        totalPriceEl.innerText = `Total: $${cartItemsTotal} CAD`
    }
}

const isInputNumber = (event) => {
   let x = String.fromCharCode(event.which)
   if(!(/[0-9]/.test(x))){
       alert("Please input a number.")
       event.preventDefault()
   }
}

refreshBtn.addEventListener('click', () => updateCartWithItems)

//------------------ forward/back button event listeners ----------------//

// forwardBtn.addEventListener('click', () => {
//     pageNumber++
//     backBtn.removeAttribute('disabled', true)
//     fetchAllMakeup().then(renderitems)
// })

// backBtn.addEventListener('click', () => {
//     if (pageNumber > 0) {
//         pageNumber-- 
//     } else {
//         backBtn.setAttribute('disabled', true)
//     }
//     fetchAllMakeup().then(renderitems)
// })


//------------------ calling initialise function -----------------//

init()

