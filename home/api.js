const API = "http://localhost:3000/data";
const APICART = "http://localhost:3000/cart";

import getData from "./dom.js";
import { getDataCard } from "./dom.js";

export default async function get() {
    try {
        let response = await fetch(API);
      
        let data = await response.json();
  
        getData(data);
    } catch (error) {
        console.error(error);
    }
}


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
        await fetch (`${APICART}/${id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify()
        })
    } catch (error) {
        console.log(error);
    }
}


async function postInCart(product) {
    let findProductInCart = cartData.find((el) => el.id == product.id)

    if (findProductInCart) {
        const editProduct = {
            ...findProductInCart,
            count: +findProductInCart.count + 1
        }
        try {
            await fetch(`${APICART}/${findProductInCart.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editProduct)
            })
        } catch (error) {
            console.error(error);

        }

    }
    else {
        const newProduct = {
            ...product,
            count: 1
        }
        try {
            await fetch(`${APICART}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            })
        } catch (error) {
            console.error(error);

        }
    }

}