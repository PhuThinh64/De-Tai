const listImg = document.querySelector(".list_img");
const imgs = document.querySelectorAll(".list_img img");
const imgThumbs = document.querySelectorAll(".list_thumb img");
const indexBanner = document.querySelectorAll(".index_banner .index");
// console.log(indexBanner);
let index = 0;
if (listImg && imgs.length && imgThumbs.length && indexBanner.length) {
  changImg = () => {
    let width = imgs[0].offsetWidth;
    listImg.style.transition = "transform 0.5s";
    listImg.style.transform = `translateX(${width * -1 * index}px)`;

    imgThumbs.forEach((img) => img.classList.remove("active"));
    imgThumbs[index].classList.add("active");

    document.querySelector(".index.active").classList.remove("active");
    document.querySelector(".index" + index).classList.add("active");
  };

  let intervalId = setInterval(() => {
    index++;
    if (index >= imgs.length) index = 0;
    changImg();
  }, 1000);

  imgThumbs.forEach((img, i) => {
    img.addEventListener("click", () => {
      clearInterval(intervalId);
      index = i;

      changImg();

      intervalId = setInterval(() => {
        index++;
        if (index >= imgs.length) index = 0;
        changImg();
      }, 1000);
    });
  });

  document.querySelector(".btn_right").addEventListener("click", () => {
    clearInterval(intervalId);
    index++;
    if (index >= imgs.length) index = 0;
    changImg();

    intervalId = setInterval(() => {
      index++;
      if (index >= imgs.length) index = 0;
      changImg();
    }, 1000);
  });
  document.querySelector(".btn_left").addEventListener("click", () => {
    clearInterval(intervalId);

    index--;

    changImg();

    intervalId = setInterval(() => {
      index++;
      if (index >= imgs.length) index = 0;
      changImg();
    }, 1000);
  });
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      clearInterval(intervalId);

      index++;
      if (index >= imgs.length) index = 0;
      changImg();

      intervalId = setInterval(() => {
        index++;
        if (index >= imgs.length) index = 0;
        changImg();
      }, 1000);
    });
  });
  indexBanner.forEach((vt, i) => {
    vt.addEventListener("click", () => {
      clearInterval(intervalId);

      index = i;

      changImg();

      intervalId = setInterval(() => {
        index++;
        if (index >= imgs.length) index = 0;
        changImg();
      }, 1000);
    });
  });
}

const backToTop = document.getElementById("backToTop");
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};
backToTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  // Đảm bảo mỗi item đều có quantity là số
  const count = cart.reduce((sum, sp) => sum + (Number(sp.quantity) || 1), 0);
  document.querySelector(".count-item").textContent = count;
}

// Khi thêm vào giỏ hàng:
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.dataset.name;
    const price = this.dataset.price;
    const img = this.dataset.img;
    let found = cart.find((sp) => sp.name === name && sp.price === price);
    if (found) {
      found.quantity = (Number(found.quantity) || 1) + 1;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }
    saveCart();
  });
});

// Hiện popup khi hover vào icon giỏ hàng
const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cart-popup");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const viewCartBtn = document.getElementById("view-cart");

function formatPrice(str) {
  return Number(str.replace(/[^\d]/g, ""));
}
function formatPriceVND(num) {
  return num.toLocaleString("vi-VN") + "₫";
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Giỏ hàng trống</li>";
    cartTotal.textContent = "0₫";
    return;
  }
  cart.forEach((item, idx) => {
    let priceNum = formatPrice(item.price);
    total += priceNum * item.quantity;
    cartList.innerHTML += `
      <li style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <img src="${item.img}" alt="" style="width:60px;height:60px;object-fit:cover;">
        <div style="flex:1;">
          <div style="font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px;">${item.name}</div>
          <div>
            <button class="cart-minus" data-idx="${idx}" style="width:28px;">-</button>
            <span style="margin:0 8px;">${item.quantity}</span>
            <button class="cart-plus" data-idx="${idx}" style="width:28px;">+</button>
            × <span style="color:#FFD600;font-weight:bold;">${item.price}</span>
          </div>
        </div>
      </li>
    `;
  });
  cartTotal.textContent = formatPriceVND(total);

  // Gán sự kiện tăng/giảm số lượng
  cartList.querySelectorAll(".cart-minus").forEach((btn) => {
    btn.onclick = function () {
      let idx = +this.dataset.idx;
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1);
      }
      saveCart();
      renderCart();
    };
  });
  cartList.querySelectorAll(".cart-plus").forEach((btn) => {
    btn.onclick = function () {
      let idx = +this.dataset.idx;
      cart[idx].quantity++;
      saveCart();
      renderCart();
    };
  });
}

cartIcon.addEventListener("mouseenter", function () {
  renderCart();
  cartPopup.style.display = "block";
});
cartIcon.addEventListener("mouseleave", function () {
  setTimeout(() => {
    if (!cartPopup.matches(":hover")) cartPopup.style.display = "none";
  }, 200);
});
cartPopup.addEventListener("mouseleave", function () {
  cartPopup.style.display = "none";
});
cartPopup.addEventListener("mouseenter", function () {
  cartPopup.style.display = "block";
});

// Khi click vào "XEM GIỎ HÀNG" hoặc icon giỏ hàng, chuyển sang trang giỏ hàng
viewCartBtn.onclick = cartIcon.onclick = function () {
  window.location.href = "cart.html";
};

updateCartCount();
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.dataset.name;
    const price = this.dataset.price;
    const img = this.dataset.img;
    let found = cart.find((sp) => sp.name === name && sp.price === price);
    if (found) {
      found.quantity = Number(found.quantity) || 1;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }
    saveCart();
    alert("Đã thêm vào giỏ hàng!"); // Thêm dòng này
  });
});
