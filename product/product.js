let box1 = document.querySelector(".box1");
let inpSearch = document.querySelector(".inpSearch");

let priceRange = document.getElementById("priceRange");
let priceValue = document.getElementById("priceValue");
let API = "http://localhost:3000/data";
const APICART = "http://localhost:3000/cart";

let valueRange = null;
let dataCache = [];
let openBtn = document.querySelector(".openBtn");
let modal = document.querySelector(".modal");
let close_Btn = document.querySelector(".close_Btn");
let cart_item = document.querySelector(".cart_item");
let remove_item = document.querySelector(".remove_item")
const cartCount = document.querySelector(".cartCount")
// let cartData = []

if (openBtn) openBtn.onclick = () => modal.showModal();
if (close_Btn) close_Btn.onclick = () => modal.close();


let modal_ab = document.querySelector(".modal_ab")
let closeBtn =document.querySelector(".closeBtn");
closeBtn.onclick = () => { modal_ab.close(); }
const diablo = document.querySelector(".diablo")
diablo.onclick = () => { modal_ab.showModal(); }




async function get() {
    try {
    
        let {data} = await axios.get(API)
        dataCache = data;
        console.log(data);
        getData(data);
    } catch (error) {
        console.log(error);
    }
}
get();

inpSearch.oninput = () => {
    let filteredData = dataCache.filter((e) =>e.name.toLowerCase().includes(inpSearch.value.toLowerCase())
);
getData(filteredData);
};


priceRange.addEventListener("input", () => {
    priceValue.textContent = `$${priceRange.value}`;
});


async function getCard() {
    try {
        let response = await fetch(APICART);
        
        let cart = await response.json();
        getDataCard(cart);
        cartData = cart

    } catch (error) {
        console.error(error);
    }
}



async function postInCart(product) {
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





async function DELETE(id) {
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


function getDataCard(cart) {
    cartCount.innerHTML = cart.length;
    cart_item.innerHTML = "";

    cart.forEach((e) => {
        let container = document.createElement("div");
        let name = document.createElement("h1");
        name.innerHTML = e.name;

        let price = document.createElement("h3");
        price.innerHTML = `$${e.price}`;

        let img = document.createElement("img");
        img.src = e.img;
        img.alt = e.name;

        let plusBtn = document.createElement("button");
        plusBtn.innerHTML = "+";

        let total = document.createElement("p");
        total.innerHTML = e.count || 0;

        let minusBtn = document.createElement("button");
        minusBtn.innerHTML = "-";

        let dele = document.createElement("button");
        dele.innerHTML = "DELETE";
        dele.onclick = async () => {
            await DELETE(e.id);
            getCard(); 
        };

        let active = document.createElement("div");
        active.style.display = "flex";
        active.append(plusBtn, total, minusBtn);

        plusBtn.onclick = async () => {
            let newCount = parseInt(total.innerHTML) + 1;
            await updateCartItem(e.id, newCount);
            getCard();
        };

        minusBtn.onclick = async () => {
            let newCount = parseInt(total.innerHTML);
            if (newCount > 1) {
                newCount -= 1;
                await updateCartItem(e.id, newCount);
                getCard();
            } else {
                await DELETE(e.id);
                getCard();
            }
        };

        container.append(img, name, price, active, dele);
        cart_item.appendChild(container);
    });
}

async function updateCartItem(id, count) {
    try {
        await fetch(`${APICART}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count })
        });
    } catch (error) {
        console.error(error);
    }
}



function getData(data) {
    box1.innerHTML = "";
    data.forEach((e) => {
        let div = document.createElement("div");
        div.classList.add("product");
        
        let a=document.createElement("a")
        a.href=`./getBYid/getBYid.html?id=${e.id}`
        a.innerHTML="info"
        
        let name = document.createElement("h3");
        let img = document.createElement("img");
        img.classList.add("imgpr")
        let price = document.createElement("h5");
        let status = document.createElement("h4");

        status.innerHTML = e.status === true ? "Active" : "Inactive";
        img.src = e.img;
        name.innerHTML = e.name;
        price.innerHTML = `$${e.price}`;
        name.style.color = "gray";

        
     
        
        let getCar = document.createElement("button");
        getCar.innerHTML = "Add to Cart";
        getCar.onclick = () => {
            postInCart(e)
            
        }
        let active = document.createElement("div")
        active.append(getCar,a)


        div.append(img, name, price, status,active);
        box1.append(div);
    });
}

getCard();