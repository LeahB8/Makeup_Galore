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

         if (item.price === "0.0" || item.price == null ) return item.price = 10.0
         if (item.description == null) return item.description = 'Click on the image to find out more.'
         if (item.brand == null ) return item.brand = item.name

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

const increase_by_one = (field, cartItem) => {
    let quantityEl = document.getElementById(field)
    itemQuantity = parseInt(quantityEl.value)
    quantityEl.value = itemQuantity + 1

    addItemToDOM(cartItem, currentUserId)

    updatePrice(cartItem)
}
    
const decrease_by_one = (field, cartItem) => {
    let quantityEl = document.getElementById(field)
    itemQuantity = parseInt(quantityEl.value)
    if (itemQuantity > 0) {
        if( (itemQuantity - 1) > 0) {
            quantityEl.value = itemQuantity - 1
           deleteItemFromDOM(cartItem)
        }
    }

    updatePrice(cartItem)

} 

const updatePrice = (cartItem) => {
    const b = parseInt(document.querySelector(`#x-${cartItem.id}`).innerText)
    let y = parseInt(document.querySelector(`#qty${cartItem.id}`).value)

    let sum = document.querySelector(`#item-price${cartItem.id}`)
    sum.innerHTML = `$ ${b * y}` 

    let cartItems = currentUser.items
    calculateCartItemsSum(cartItems)

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

    itemInCart.innerHTML = `
        <div class="item-name-price">
            <h4 class="item-name">${cartItem.name}</h4>
            <p id="item-price${cartItem.id}" class="item-price">$ ${cartItem.price}</p>
        </div>
            <img class="cart-item-image" src="${cartItem.image_link}" style="height: 70px; width: 70px;">
        <div class="quantity-container">
            <div>
                Qty: <input class='quantity-input' id="qty${cartItem.id}" type="number" min='1' value="1" name="qty" onKeyPress='isInputNumber(event)' />
                <button id='increase-button${cartItem.id}'>+</button>
                <button id='decrease-button${cartItem.id}'>-</button>
                <p id="x-${cartItem.id}" style="display: none;">${cartItem.price}</p>
            </div>
            <button class='delete-button' id='delete-button${cartItem.id}'>X</button>
        </div>
        `

        // let ItemNamePrice = document.createElement("div")
        // ItemNamePrice.className = "item-name-price"

        //         let ItemName = document.createElement("h4")
        //         ItemName.className = "item-name"
        //         ItemName.innerText = cartItem.name 
        //         ItemNamePrice.append(ItemName)

        //         let ItemPrice = document.createElement("h4")
        //         ItemPrice.id = `item-price${cartItem.id}`
        //         ItemPrice.className = `item-price`
        //         ItemPrice.innerHTML = `$ ${cartItem.price}`
        //         ItemNamePrice.append(ItemPrice)

        // itemInCart.append(ItemNamePrice)

        // let image = document.createElement("img")
        // image.className = "cart-item-image"
        // image.src = `${cartItem.image_link}`
        // image.style = "height: 70px; width: 70px;"

        // itemInCart.append(image)

        // let QtyContainer = document.createElement("div")
        // QtyContainer.className = "quantity-container"

        //          let div1 = document.createElement("div")


        //                 let qty = document.createElement("h4")
                       
        //                 qty.innerText = `Qty: ${cartItem.price}`

        //                 div1.append(qty)

        //                 let input = document.createElement("input")
        //                 input.className ="quantity-input"
        //                 input.id = `qty${cartItem.id}`
        //                 input.type = "number"
        //                 input.min = "1"
        //                 input.value ="1"
        //                 input.name="qty"
        //                 input.onkeypress ="isInputNumber(event)"
                        
        //                 div1.append(input)

        //                 let button1 = document.createElement("button")
        //                 button1.id = `increase-button${cartItem.id}`
        //                 button1.innerHTML = `+`

        //                 div1.append(button1)

        //                 let button2 = document.createElement("button")
        //                 button2.id = `decrease-button${cartItem.id}`
        //                 button2.innerHTML = `-`

        //                 div1.append(button2)
                    
        //         QtyContainer.append(div1)
        
        // let deleteBtn = document.createElement("button")
        // deleteBtn.className = "delete-button"
        // deleteBtn.id = `delete-button${cartItem.id}`
        // deleteBtn.innerHTML = `X`

        // itemInCart.append(deleteBtn)


        // itemInCart.append(QtyContainer)

        // let QtyNum = parseInt(document.querySelector(`#qty${cartItem.id}`))
        // let x = QtyNum.value

    // let singleItemQuantity  = parseInt(document.querySelector(`#qty${cartItem.id}`).value)
    // console.log(singleItemQuantity)

    itemInCart.querySelector(`#delete-button${cartItem.id}`).addEventListener('click', () => deleteItemFromDOM(cartItem))    
    itemInCart.querySelector(`#increase-button${cartItem.id}`).addEventListener('click', () => increase_by_one(`qty${cartItem.id}`, cartItem))
    itemInCart.querySelector(`#decrease-button${cartItem.id}`).addEventListener('click', () => decrease_by_one(`qty${cartItem.id}`, cartItem))

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
        totalPricePaymentEl.innerText = `Total: $${cartItemsTotal} CAD`
    }
}

const isInputNumber = (event) => {
   let x = String.fromCharCode(event.which)
   if(!(/[0-9]/.test(x))){
       alert("Please input a number.")
       event.preventDefault()
   }
}


//------------------ calling initialise function -----------------//

init()

