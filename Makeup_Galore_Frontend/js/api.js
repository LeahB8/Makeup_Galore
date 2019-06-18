//-------------------------------- external API-------------------------------//

const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json'

const fetchAllMakeup = () =>{
    return fetch(BASE_URL)
        .then(resp => resp.json())
    }

const fetchBlushProducts = () => {
    return fetch(`${BASE_URL}?product_type=blush`)
        .then(resp => resp.json())
    }

const fetchBronzerProducts = () => {
    return fetch(`${BASE_URL}?product_type=bronzer`)
        .then(resp => resp.json())
    }

const fetchEyesProducts = () => {
    return fetch(`${BASE_URL}?product_type=eyeshadow`)
        .then(resp => resp.json())
    }

const fetchFoundationProducts = () => {
    return fetch(`${BASE_URL}?product_type=foundation`)
        .then(resp => resp.json())
    }

const fetchLipsProducts = () => {
    return fetch(`${BASE_URL}?product_type=lipstick`)
        .then(resp => resp.json())
    }

const fetchMascaraProducts = () => {
    return fetch(`${BASE_URL}?product_type=mascara`)
        .then(resp => resp.json())
    }

//-------------------------------- my rails API-------------------------------//

const RAILS_URL = 'http://localhost:3000'
const USER_URL = `${RAILS_URL}/users`
const ITEM_URL = `${RAILS_URL}/items`

const fetchUsers = () => {
    return fetch(USER_URL)
    .then(resp => resp.json())
}

const fetchUser = currentUserId => {
    return fetch(USER_URL + `/${currentUserId}`)
    .then(resp => resp.json())
}

const fetchItems = () => {
    return fetch(ITEM_URL)
    .then(resp => resp.json())
}

const addItemToServer = (item, currentUserId) => {
        return fetch(ITEM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: item.name,
            product_link: item.product_link,
            product_type: item.product_type,
            image_link: item.image_link,
            brand: item.brand,
            price: item.price,
            description: item.description,
            user_id: currentUserId,
            quantity: 1
        })
    }).then(resp => resp.json())
}

const editItemQuantityInServer = (cartItem) => {
    return fetch(ITEM_URL + `/${cartItem.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        quantity: cartItem.quantity
    })
}).then(resp => resp.json())
}

const deleteItemFromServer = item => {
    return fetch(ITEM_URL + `/${item.id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
}