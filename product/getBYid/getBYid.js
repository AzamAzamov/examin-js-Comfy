

let bot = document.querySelector(".bot");

let API = "http://localhost:3000/data";
const APICART = "http://localhost:3000/cart";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let modal_ab = document.querySelector(".modal_ab");
let closeBtn = document.querySelector(".closeBtn");
closeBtn.onclick = () => modal_ab.close();

const diablo = document.querySelector(".diablo");
diablo.onclick = () => modal_ab.showModal();

let modal = document.querySelector(".modal");
let openBtn = document.querySelector(".openBtn");
openBtn.onclick = () => modal.showModal();

const cart_item = document.querySelector(".cart_item");
const cartCount = document.querySelector(".cartCount");
let close_Btn = document.querySelector(".close_Btn")


close_Btn.onclick = () => {
    modal.close()
}

let cartData = [];

async function getCard() {
    try {
        let response = await fetch(APICART);
        let cart = await response.json();
        getDataCard(cart);
        cartData = cart;
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

async function updateCartItem(id, newCount) {
    const item = cartData.find((el) => el.id == id);
    if (!item) return;

    const updatedItem = { ...item, count: newCount };

    try {
        await fetch(`${APICART}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem)
        });
    } catch (error) {
        console.error(error);
    }
}

async function DELETE(id) {
    try {
        await fetch(`${APICART}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log(error);
    }
}

function getDataCard(cart) {
    cartCount.innerHTML = cart.length;
    cart_item.innerHTML = "";

    cart.forEach((e) => {
        let container = document.createElement("div");
        container.classList.add("container");



        let naemtd = document.createElement("div");


        let name = document.createElement("h1");
        name.innerHTML = e.name;

        let price = document.createElement("h3");
        price.innerHTML = `$${e.price}`;

        let img = document.createElement("img");
        // img.src = e.img;
        img.src = `../${e.img}`; 
        img.alt = e.name;
        // img.style.width = "128px";
        // img.style.height = "90px";

        let plusBtn = document.createElement("button");
        plusBtn.innerHTML = "+";

        let total = document.createElement("p");
        total.innerHTML = e.count || 0;

        let minusBtn = document.createElement("button");
        minusBtn.innerHTML = "-";

        let dele = document.createElement("button");
        dele.innerHTML = "❌";
        dele.classList.add("deleteBtn");
        dele.onclick = async () => {
            await DELETE(e.id);
            getCard();
        };

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
            } else {
                await DELETE(e.id);
            }
            getCard();
        };

        let active = document.createElement("div");
        active.classList.add("active");
        active.style.display = "flex";
        active.append(plusBtn, total, minusBtn);

        naemtd.append(name, price, active);
        container.append(img, naemtd, dele);
        
        cart_item.appendChild(container);
    });
}

async function getById() {
    try {
        let response = await fetch(`${API}/${productId}`);
        let data = await response.json();
        getDataById(data);
    } catch (error) {
        console.log(error);
    }
}
getById();

function getDataById(e) {
    bot.innerHTML = "";

    let div = document.createElement("div");
    div.classList.add("div");

    let name = document.createElement("h1");
    name.innerHTML = e.name;
    name.style.fontSize = "50px";

    let status = document.createElement("h2");
    status.innerHTML = e.status === true ? "Active" : "Inactive";
    status.style.color = "#90A8B9";

    let img = document.createElement("img");
    img.src = `../${e.img}`;
    img.classList.add("img");

    let price = document.createElement("p");
    price.innerHTML = e.price;
    price.style.color = "#235275";



    let about = document.createElement("div");
    about.classList.add("about");

    let tell = document.createElement("p");
    tell.innerHTML = e.tell;
    tell.style.color = "#235275";
    tell.classList.add("tell");

    let addBtn = document.createElement("button");
    addBtn.innerHTML = "ADD TO CART";
    addBtn.classList.add("addBtn");
    addBtn.onclick = () => {
        postInCart(e);
    };

    about.append(name, status, tell, addBtn);
    div.append(img, about);
    bot.append(div);
}

getCard();
