
import {getDataCard} from "./dom.js";
const APICART = "http://localhost:3000/cart";
// export async function get() {
//     try {
    
//         let {data} = await axios.get(API)
//        let  dataCache = data;
//         getData(dataCache);
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function getCard() {
    try {
        let response = await fetch(APICART);
        
        let cart = await response.json();
        getDataCard(cart);
        cartData = cart

    } catch (error) {
        console.error(error);
    }
}


export async function DELETE(id) {
    try {
        await fetch(`${APICART}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        getCard(); 
    } catch (error) {
        console.log(error);
    }
}

    



export async function postInCart(product) {
    let findProductInCart = cartData.find((el) => el.id == product.id);

    if (findProductInCart) {
        const editProduct = {
            ...findProductInCart,
            count: +findProductInCart.count + 1
        };
        try {
            await fetch(`${APICART}/${findProductInCart.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProduct)
            });
            getCard();
        } catch (error) {
            console.error(error);
        }
    } else {
        const newProduct = { ...product, count: 1 };
        try {
            await fetch(`${APICART}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });
            getCard(); 
        } catch (error) {
            console.error(error);
        }
    }
}



export async function updateCartItem(id, count) {
    try {
        await fetch(`${APICART}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count })
        });
        getCard()
    } catch (error) {
        console.error(error);
    }
}

