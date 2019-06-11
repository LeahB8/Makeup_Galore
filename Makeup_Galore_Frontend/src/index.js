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

const sidebar = document.querySelector('#mySidebar')

//------------------ global variables -----------------//

let pageNumber = 0

//------------------ initialise function -----------------//

const init = () => {
    fetchBlushProducts().then(renderBlushProducts)
    fetchBronzerProducts().then(renderBronzerProducts)
    fetchEyesProducts().then(renderEyesProducts)
    fetchFoundationProducts().then(renderFoundationProducts)
    fetchLipsProducts().then(renderLipsProducts)
    fetchMascaraProducts().then(renderMascaraProducts)
}

//------------------ render products -----------------//


const renderMakeupProduct = (makeupProduct, div) => {
        const makeupCard = document.createElement('div')
        makeupCard.className = 'polaroid'

        if (makeupProduct.price == 0.0) {
            makeupProduct.price = 10.0
        } else if (makeupProduct.description == null) {
            makeupProduct.description = 'Click on the image to find out more.'
        }

        const capitalize = (s) => {
            return s && s[0].toUpperCase() + s.slice(1);
        }

        makeupCard.innerHTML = `
            <h4>${makeupProduct.name}</h4>

            <a target="_blank" href="${makeupProduct.product_link}">
            <img src="${makeupProduct.image_link}">
            </a>
            <p>${capitalize(makeupProduct.brand)}</p>
            <p> $ ${makeupProduct.price}</p>
            <p>${makeupProduct.description}</p>
            <button class='w3-button w3-pink w3-round-large buy-button'>Add to cart</button>
        `
        div.append(makeupCard)

        // makeupCard.querySelector('.buy-button').addEventListener('click', () => {
        // })
}

const renderBlushProducts = makeupProducts => {
    makeupProducts.forEach(makeupProduct => renderMakeupProduct(makeupProduct, blushDiv))
}

const renderBronzerProducts = makeupProducts => {
    makeupProducts.forEach(makeupProduct => renderMakeupProduct(makeupProduct, bronzerDiv))
}

const renderEyesProducts = makeupProducts => {
    makeupProducts.forEach(makeupProduct => renderMakeupProduct(makeupProduct, eyesDiv))
}

const renderFoundationProducts = makeupProducts => {
    makeupProducts.forEach(makeupProduct => renderMakeupProduct(makeupProduct, foundationDiv))
}

const renderLipsProducts = makeupProducts => {
    makeupProducts.forEach(makeupProduct => renderMakeupProduct(makeupProduct, lipsDiv))
}

const renderMascaraProducts = makeupProducts => {
    makeupProducts.forEach(makeupProduct => renderMakeupProduct(makeupProduct, mascaraDiv))
}


//------------------ sidebar button event listeners ----------------//

// blushBtn.addEventListener('click', () => {
//     sidebar.style.display = 'none'
// })



//------------------ forward/back button event listeners ----------------//

// forwardBtn.addEventListener('click', () => {
//     pageNumber++
//     backBtn.removeAttribute('disabled', true)
//     fetchAllMakeup().then(renderMakeupProducts)
// })

// backBtn.addEventListener('click', () => {
//     if (pageNumber > 0) {
//         pageNumber-- 
//     } else {
//         backBtn.setAttribute('disabled', true)
//     }
//     fetchAllMakeup().then(renderMakeupProducts)
// })


//------------------ calling initialise function -----------------//

init()

