
import { menuArray as menu } from './main-data.js'

const menuEl = document.getElementById('menu__items');
const orderListEl = document.getElementById('order__list');
const totalEl = document.getElementById('order');
const totalPrice = document.getElementById('total__price');
const checkoutForm = document.getElementById('checkout-form');
const payNow = document.getElementById('form-btn');
const modalEl = document.getElementById('modal');
const orderNumber = document.getElementById('order-number');
const modalInner = document.getElementById('modal-inner');


let order = [];
renderMenu(menu);

//identifies which button was clicked and calls the corresponding function
 document.addEventListener('click', function(e) {
     
     if(e.target.dataset.add) {
        addToOrder(e.target.dataset.add)
        totalEl.style.display = 'flex'
     } 
     else if(e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove);
     } 
     else if(e.target.dataset.payment) {
        orderNumber.innerHTML = `Order #${Math.floor(Math.random() * 100)}`
        payNow.innerHTML = `Pay $${renderOrder(order)}`
        modalEl.style.display = 'block';
     }
     else if(e.target.dataset.close) {
        modalEl.style.display = 'none';
     }
     else if(e.target.dataset.complete) {
        
        checkoutForm.innerHTML = `<h2 class="success-message">Success! Thank you for your order!</h2>`
        
     }
    
});



function addToOrder(itemId) {
    const targetAddItem = menu.filter(function(item){
        return itemId == item.id
    })[0]

    order.push(targetAddItem);
    renderOrder(order);

};


function removeFromOrder(itemId) {
    const targetRemoveItem = order.filter(function(item) {
        return itemId == item.id;
    })[0];

    order.splice(order.indexOf(targetRemoveItem),1);
    renderOrder(order);
};


function renderOrder(order) {
    let totalPriceNum = 0;
    let orderInner = '';

    order.forEach(function(orderEl){
        orderInner += 
        `
            <div class="order__item">
                <p class="order-name">${orderEl.name}</p>
                <button class="order__remove" data-remove="${orderEl.id}">remove</button>
                <p class="price">$${orderEl.price}</p>
            </div>
        ` 
        totalPriceNum += orderEl.price
    });

    totalPrice.innerHTML = `$${totalPriceNum}`
    orderListEl.innerHTML = orderInner
   
    if(order.length === 0) {
        totalEl.style.display = "none"
    }
    return totalPriceNum;
};



//get the menu items to render to the page
function renderMenu(menu) {

    let menuHtml = '';

    menu.forEach(function(item) {
        menuHtml += 
            ` 
                <div class="items">
                    <div class="menu__img">
                    <p class="menu__emoji">${item.emoji}</p>
                    </div>
                    <div class="menu__items--wrapper">
                        <h2 class="menu__items--title">${item.name}</h2>
                        <p class="menu__items--description">${item.ingredients}</p>
                        <p class="menu__items--price">$${item.price}</p>
                    </div>
                    <div class="menu__btn">
                    <button class="btn-add-item" id="btn-add-item"><span class="plus-sign" data-add="${item.id}" name="add">+</span></button>
                    </div>
                </div>
           
      
        `
    });
        menuEl.innerHTML = menuHtml;
};


