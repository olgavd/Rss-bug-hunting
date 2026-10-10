const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

let cart = [];
let discount = 0;

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const clearBtn = document.getElementById("clear-btn");

function renderProducts() {
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₽</p>`;
    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => addToCart(p.id));
    card.appendChild(btn);
    productsEl.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return;
  }

  const cartInsert = cart.find((p) => p.id === id);
  if (cartInsert) {
    increaseQty(cartInsert.id);
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }


  renderCart();
}

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  item.qty++;
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (item.qty === 1) return;
  item.qty--;
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function applyPromo() {
  if ((promoInput.value === "SALE10")) {
    discount = 0.1;
  }
  renderCart();
}

function clearCart() {
  cart.splice(0);
  renderCart();
}

function renderCart() {
  cartItemsEl.textContent = "";
  let total = 0;
  let countCards = 0;
  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    const li = document.createElement("li");
    li.classList.add('cart-item');
    const spanName = document.createElement('span');
    spanName.textContent = item.name;
    const buttonDec = document.createElement('button');
    buttonDec.classList.add('qty-btn');
    buttonDec.dataset.act = 'dec';
    buttonDec.textContent = '-';
    const spanQty = document.createElement('span');
    spanQty.classList.add('qty');
    spanQty.textContent = item.qty;
    const buttonInc = document.createElement('button');
    buttonInc.classList.add('qty-btn');
    buttonInc.dataset.act = 'inc';
    buttonInc.textContent = '+';
    const spanLine = document.createElement('span');
    spanLine.textContent = lineTotal;
    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('remove');
    buttonRemove.textContent = '✕';
    li.append(spanName, buttonDec, spanQty, buttonInc, spanLine, buttonRemove);
    li.querySelector('[data-act="inc"]').addEventListener("click", () => increaseQty(item.id));
    li.querySelector('[data-act="dec"]').addEventListener("click", () => decreaseQty(item.id));
    li.querySelector(".remove").addEventListener("click", () => removeItem(item.id));
    cartItemsEl.append(li);
    total += item.price * item.qty;
    countCards += item.qty;
  });

  if (discount) {
    total = total - total * discount;
  }

  badgeEl.textContent = countCards;
  totalEl.textContent = total;

  if (cart.length === 0) {
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;
  }
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
