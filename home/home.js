

// const API = "http://localhost:3000/data";
// const APICART = "http://localhost:3000/cart";
// const box = document.querySelector(".box");


// async function get() {
//     try {
//         let response = await fetch(API);
      
//         let data = await response.json();
  
//         getData(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// const cartCount = document.querySelector(".cartCount")
// let cartData = []


// let openBtn = document.querySelector(".openBtn");
// if (openBtn) openBtn.onclick = () => modal.showModal();
// let modal = document.querySelector(".modal");
// let close_Btn = document.querySelector(".close_Btn");
// let cart_item = document.querySelector(".cart_item");
// let remove_item = document.querySelector(".remove_item")

// if (close_Btn) close_Btn.onclick = () => modal.close();

// let modal_ab = document.querySelector(".modal_ab")

// let closeBtn = document.querySelector(".closeBtn");
// closeBtn.onclick = () => { modal_ab.close(); }
// const diablo = document.querySelector(".diablo")
// diablo.onclick = () => { modal_ab.showModal(); }

// async function getCard() {
//     try {
//         let response = await fetch(APICART);
        
//         let cart = await response.json();
 
//         getDataCard(cart);
//         cartData = cart

//     } catch (error) {
//         console.error(error);
//     }
// }

// async function postInCart(product) {
//     let findProductInCart = cartData.find((el) => el.id == product.id)

//     if (findProductInCart) {
//         const editProduct = {
//             ...findProductInCart,
//             count: +findProductInCart.count + 1
//         }
//         try {
//             await fetch(`${APICART}/${findProductInCart.id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(editProduct)
//             })
//         } catch (error) {
//             console.error(error);

//         }

//     }
//     else {
//         const newProduct = {
//             ...product,
//             count: 1
//         }
//         try {
//             await fetch(`${APICART}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(newProduct)
//             })
//         } catch (error) {
//             console.error(error);

//         }
//     }

// }

// function getDataCard(cart) {
//     cartCount.innerHTML = cart.length
//     cart_item.innerHTML = "";
    
//     cart.forEach((e) => {
//         let container = document.createElement("div");
//         container.classList.add("container");

//         let naemtd = document.createElement("div");
//         let name = document.createElement("h1");
//         name.innerHTML = e.name;

//         let price = document.createElement("h3");
//         price.innerHTML = `$${e.price}`;

//         let img = document.createElement("img");
//         img.src = e.img;
//         img.alt = e.name;
//         img.style.width = "128px";
//         img.style.height = "90px";
//         let plusBtn = document.createElement("button");
//         plusBtn.innerHTML = "+";

//         let total = document.createElement("p");
//         total.innerHTML = e.count || 0;

//         let minusBtn = document.createElement("button");
//         minusBtn.innerHTML = "-";
        

//         let dele = document.createElement("button");
//         dele.innerHTML="❌"
//         dele.classList.add("deleteBtn")
//         dele.onclick=()=>{
//             DELETE(e.id)
//         }
//         let active = document.createElement("div");
//         active.style.display = "flex"
//         active.classList.add("active")

//         active.append(plusBtn, total, minusBtn);

//         plusBtn.onclick = () => {
//             total.innerHTML = parseInt(total.innerHTML) + 1;
//         };

//         minusBtn.onclick = () => {
//             let count = parseInt(total.innerHTML);
//             if (count > 0) {
//                 total.innerHTML = count - 1;
//             }
//         };
//         naemtd.append(name, price,active);

//         container.append(img,naemtd,dele);
//         cart_item.appendChild(container);
//     });
// }

// async function DELETE(id) {
//     try {
//         await fetch (`${APICART}/${id}`,{
//             method:"DELETE",
//             headers:{"Content-Type":"application/json"},
//             body:JSON.stringify()
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// function getData(data) {

//     box.innerHTML = "";
//     let uniqueItems = new Set();
//     while (uniqueItems.size < 3 && uniqueItems.size < data.length) {
//         let randomItem = data[Math.floor(Math.random() * data.length)];
//         uniqueItems.add(randomItem);
//     }

//     uniqueItems.forEach((e) => {
//         let div = document.createElement("div");
//         div.classList.add("biv");

//         let a = document.createElement("a");
//         a.href = `../product/getBYid/getBYid.html?id=${e.id}`;
//         a.innerHTML = "Info";

//         let name = document.createElement("h3");
//         let img = document.createElement("img");
//         let price = document.createElement("h5");
//         let status = document.createElement("h4");

//         status.innerHTML = e.status ? "Active" : "Inactive";
//         img.src = e.img;
//         img.alt = e.name;
//         name.innerHTML = e.name;
//         price.innerHTML = `$${e.price}`;
//         name.style.color = "gray";

//         let getCar = document.createElement("button");
//         getCar.innerHTML = "Add to Cart";
//         getCar.onclick = () => {
//             postInCart(e)

//         }

//         let active = document.createElement("div");
//         active.append(getCar, a);

//         div.append(img, name, price, status, active);
//         box.append(div);
//     });
// }



// getCard();
// get();
