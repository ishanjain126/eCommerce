// to add the product in the local storage
// to be used to add item in the card component
export const addItem = (item, next = f => f) => {
    let cart= []
    // ensure that we have a window object
    if(typeof window !== 'undefined'){
        // getItem method can be used to get the item from the local storage
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        // push method can be used to push the new object
        cart.push({
            ...item,
            count: 1
        })

        // ensure no duplicate
        // build an array with a new Set and turn it back into the array using Array.from
        // so that later we can re-map it
        // new set will allow only unique values into it
        // so pass the id of each product/ object
        // If the loop tries to add some value then it will be ignored again
        // ...with the arrays of id we got on the first map, run map() again to ensure that
        // actual product is returned from the cart.

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find( p => p._id === id);
        });

        // after this, we can set the cart back into our local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};


export const itemTotal = () => {
    if(typeof window!= 'undefined') {
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0; 
};


export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};


export const updateItem = (productId, count) => {
    let cart = []
    if(typeof window != 'undefined'){
        if(localStorage.getItem("cart")){

            // whatever items are there in the local storage we get them and include in the cart variable
            // then we map through each of them and match the product id

            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, i) => {
            if(product._id === productId){
                cart[i].count = count;
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart));
    }
}


export const removeItem = (productId) => {
    let cart = []
    if(typeof window != 'undefined'){
        if(localStorage.getItem("cart")){

            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, i) => {
            if(product._id === productId){
                cart.splice(i, 1)
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // if we dont return then it will update only the local storage
    return cart;
}

