
import { DELETE ,updateCartItem,getCard,postInCart,selectUser} from "./api.js";
let box1 = document.querySelector(".box1");


let priceRange = document.getElementById("priceRange");
let priceValue = document.getElementById("priceValue");






// let valueRange = null;
let dataCache = [];
let openBtn = document.querySelector(".openBtn");
let modal = document.querySelector(".modal");
let close_Btn = document.querySelector(".close_Btn");
let cart_item = document.querySelector(".cart_item");
// let remove_item = document.querySelector(".remove_item")
const cartCount = document.querySelector(".cartCount")
let Search = document.querySelector(".Search")

if (openBtn) openBtn.onclick = () => modal.showModal();
if (close_Btn) close_Btn.onclick = () => modal.close();


let modal_ab = document.querySelector(".modal_ab")
let closeBtn =document.querySelector(".closeBtn");
closeBtn.onclick = () => { modal_ab.close(); }
const diablo = document.querySelector(".diablo")
diablo.onclick = () => { modal_ab.showModal(); }



Search.oninput = () => {
    let ver = Search.value.trim().toLowerCase();
    selectUser(ver);
};



export function getData(dataCache) {
    box1.innerHTML = "";
    dataCache.forEach((e) => {
        let div = document.createElement("div");
        div.classList.add("product");
        
        let a=document.createElement("a")
        a.href=`./getBYid/getBYid.html?id=${e.id}`
        a.innerHTML="👁️"
        a.style.backgroundColor="transparent"
        a.style.border="0"
        a.style.borderBottom="0"

        a.style.boxShadow="4px 4px 10px black"
        a.style.borderRadius="5px"
        let name = document.createElement("h3");
        let img = document.createElement("img");
        img.classList.add("imgpr")
        img.src = e.img;
        let price = document.createElement("h5");
        let div1 = document.createElement('div')
        div1.classList.add('content')
        
        
        name.innerHTML = e.name;
        price.innerHTML = `$${e.price}`;
        name.style.color = "gray";
        let infoBtn = document.createElement('button')
        infoBtn.innerHTML = 'info'
        let addToCartBtn = document.createElement('button')
        addToCartBtn.innerHTML = 'add to cart'
         
        let getCar = document.createElement("button");
        getCar.innerHTML = "Add to Cart 🗑️";
        getCar.style.backgroundColor="transparent"
        getCar.style.border="0"
        getCar.style.borderBottom="1px solid black"
        getCar.style.boxShadow="4px 4px 10px black"
        getCar.style.borderRadius="5px"
        getCar.onclick = () => {
            postInCart(e)
            
        }
        let active = document.createElement("div")
        active.append(getCar,a)
        


        div1.append(infoBtn, addToCartBtn)
        div.append(div1,img, name, price,active);
        box1.append(div);
    });
}



priceRange.addEventListener("input", () => {
    priceValue.textContent = `$${priceRange.value}`;
});


export function getDataCard(cart) {
    cartCount.innerHTML = cart.length;
    cart_item.innerHTML = "";

    cart.forEach((e) => {
        let container = document.createElement("div");
        container.classList.add("container");
        let name = document.createElement("h1");
        name.innerHTML = e.name;

        let nameTd = document.createElement("div");
        let price = document.createElement("h3");
        price.innerHTML = `$${e.price}`;
        price.style.color = "gray";

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
        dele.innerHTML="❌"
        dele.classList.add("deleteBtn") 
        dele.onclick = async () => {
            await DELETE(e.id);
            getCard(); 
        };

        let active = document.createElement("div");
        active.style.display = "flex";
        active.classList.add("active")
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
        nameTd.append(name, price,active);
        container.append(img,nameTd,dele);
        cart_item.appendChild(container);
    });
}
