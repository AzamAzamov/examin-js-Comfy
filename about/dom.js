
import { DELETE ,updateCartItem,getCard,postInCart} from "./api.js";

// const APICART = "http://localhost:3000/cart";

let modal_ab = document.querySelector(".modal_ab");
let closeBtn = document.querySelector(".closeBtn");
closeBtn.onclick = () => { modal_ab.close(); };

const diablo = document.querySelector(".diablo");
diablo.onclick = () => { modal_ab.showModal(); };

let modal = document.querySelector(".modal");
let openBtn = document.querySelector(".openBtn");
openBtn.onclick = () => { modal.showModal(); };

let close_Btn = document.querySelector(".close_Btn");
close_Btn.onclick = () => { modal.close(); };

const cartCount = document.querySelector(".cartCount");
const cart_item = document.querySelector(".cart_item");

// let cartData = [];





export function getDataCard(cart) {
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
        img.src = e.img;
        img.alt = e.name;
        img.style.width = "128px";
        img.style.height = "90px";

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
            let count = parseInt(total.innerHTML);
            if (count > 1) {
                await updateCartItem(e.id, count - 1);
                getCard();
            } else {
                await DELETE(e.id);
                getCard();
            }
        };

        let active = document.createElement("div");
        active.style.display = "flex";
        active.classList.add("active");
        active.append(plusBtn, total, minusBtn);

        naemtd.append(name, price, active);
        container.append(img, naemtd, dele);
        cart_item.appendChild(container);
    });
}