const productImages = Array.from(document.querySelectorAll(".slider__img"));
const productImagesAbsolute = Array.from(
  document.querySelectorAll(".slider__img--absolute")
);
const prevImgBtn = document.querySelector(".btn__slider--left");
const nextImgBtn = document.querySelector(".btn__slider--right");
const prevImgBtnAbsolute = document.querySelector(
  ".btn__slider--left--absolute"
);
const nextImgBtnAbsolute = document.querySelector(
  ".btn__slider--right--absolute"
);
const quantityCountLess = document.querySelector(".quantity__count--less");
const quantityCountMore = document.querySelector(".quantity__count--more");
const numberCount = document.querySelector(".number__count");
const btnCart = document.querySelector(".btn--cart");
const cartIcon = document.querySelector(".cart__icon");
const cartContent = document.querySelector(".cart__content");
const cartNumber = document.querySelector(".cart__number");
let btnCartProducts = Array.from(
  document.querySelectorAll(".btn--cart__product")
);
const sliderAbsolute = document.querySelector(".slider__absolute ");
const overlay = document.querySelector(".overlay");
const iconCloseAbsolute = document.querySelector(".icon__close");

const productsCart = [];
let currentImg = 1;
let currentImgAbsolute = 1;
let currentQuantity = 0;

function lightBoxView() {

  if (window.innerWidth > 900) {
    productImages.map((img) =>
      img.addEventListener("click", function () {
        sliderAbsolute.style.display = "block";
        overlay.style.display = "block";
      })
    );
  }
}

window.addEventListener("load", lightBoxView);

window.addEventListener("resize", lightBoxView);

function hideSliderAbsolute() {
  overlay.style.display = "none";
  sliderAbsolute.style.display = "none";
  navMobile.classList.remove("display");
  burgerIcon.src = "images/icon-menu.svg";
  isOpen = false;
}

overlay.addEventListener("click", hideSliderAbsolute);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideSliderAbsolute();
  }
});

iconCloseAbsolute.addEventListener("click", hideSliderAbsolute);

function rightImg(num, array) {
  array.filter((img) =>
    +img.dataset.imageNumber !== num
      ? (img.style.display = "none")
      : (img.style.display = "block")
  );
}

rightImg(currentImg, productImages);
rightImg(currentImg, productImagesAbsolute);

function next(array) {
  if (currentImg >= 4) {
    currentImg = 1;
  } else {
    currentImg += 1;
  }
  rightImg(currentImg, array);
}

function prev(array) {
  if (currentImg === 1) {
    currentImg = 4;
  } else {
    currentImg -= 1;
  }

  rightImg(currentImg, array);
}

prevImgBtn.addEventListener("click", function () {
  prev(productImages);
});

nextImgBtn.addEventListener("click", function () {
  next(productImages);
});

nextImgBtnAbsolute.addEventListener("click", function () {
  next(productImagesAbsolute);
});

prevImgBtnAbsolute.addEventListener("click", function () {
  prev(productImagesAbsolute);
});

quantityCountLess.addEventListener("click", function () {
  if (currentQuantity === 0) return;
  numberCount.textContent = currentQuantity -= 1;
});

quantityCountMore.addEventListener("click", function () {
  numberCount.textContent = currentQuantity += 1;
});

btnCart.addEventListener("click", function () {
  if (currentQuantity === 0) return;
  productsCart.push({
    quantity: currentQuantity,
    price: currentQuantity * 125,
    id: new Date().getTime(),
  });
  cartNumber.style.display = "block";
  cartNumber.textContent = productsCart.length;
  insertProducts();
  numberCount.textContent = currentQuantity = 0;
  btnCartProducts = Array.from(
    document.querySelectorAll(".btn--cart__product")
  );
  console.log(btnCartProducts);
});

function insertProducts() {
  const html = `<p class="cart__text stay">Cart</p><div class="products__cart__container stay">${productsCart
    .map((product) => {
      return `<div class="cart__product ${product.id} stay">
      <div class="flex">
                <img src="images/image-product-1.jpg" alt="" class="cart__product--img stay">
                <div class="cart__product--content stay">
                  <p class="stay">Fall Limited Edition Sneakers</p>
                  <p class="stay">$125.00 X ${product.quantity} $${
        125 * product.quantity
      }.00</p>
                </div>
                </div>
                <button class="btn--cart__product stay delete__icon"><img class="stay delete__icon" src="images/icon-delete.svg" alt=""></button>
              </div>`;
    })
    .join("")}</div>
  <button class="btn--checkout stay">Checkout</button>`;
  cartContent.innerHTML = "";
  cartContent.insertAdjacentHTML("afterbegin", html);
}

cartIcon.addEventListener("click", function () {
  cartContent.style.display = "block";
  if (productsCart.length === 0) {
  } else {
    insertProducts();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete__icon")) {
    const product = e.target.closest(".cart__product");
    product.style.display = "none";
    const remove = productsCart.filter((p) => p.id === +product.classList[1]);

    const index = productsCart
      .map((x) => {
        return x.Id;
      })
      .indexOf(remove.id);

    productsCart.splice(index, 1);
    console.log(productsCart);
    cartNumber.textContent =
      productsCart.length === 0
        ? (cartNumber.style.display = "none")
        : productsCart.length;

    if (productsCart.length === 0) {
      cartContent.innerHTML =
        '<p class="cart__text stay">Cart</p><p class="cart__empty__text stay">Your cart is empty.</p>';
    }

    return;
  } else if (e.target.classList.contains("cart__icon") || e.target.classList.contains("stay")) return;

  cartContent.style.display = "none";
});

const sliderImgThumbnail = Array.from(
  document.querySelectorAll(".slider__img__thumbnail")
);

sliderImgThumbnail.map((img) =>
  console.log(
    +img.dataset.thumbnail ===
      +productImages[currentImg - 1].dataset.imageNumber
      ? img.classList.add("custom__highlight")
      : false
  )
);
// productImages
sliderImgThumbnail.map((img) =>
  img.addEventListener("click", function () {
    sliderImgThumbnail.map((img) => img.classList.remove("custom__highlight"));
    img.classList.add("custom__highlight");
    currentImg = +img.dataset.thumbnail;
    rightImg(currentImg, productImages);
  })
);

const sliderImgThumbnailAbsolute = Array.from(
  document.querySelectorAll(".slider__img__thumbnail--absolute")
);

sliderImgThumbnailAbsolute.map((img) =>
  console.log(
    +img.dataset.thumbnail ===
      +productImagesAbsolute[currentImg - 1].dataset.imageNumber
      ? img.classList.add("custom__highlight")
      : false
  )
);
// productImages
sliderImgThumbnailAbsolute.map((img) =>
  img.addEventListener("click", function () {
    sliderImgThumbnailAbsolute.map((img) =>
      img.classList.remove("custom__highlight")
    );
    img.classList.add("custom__highlight");
    currentImg = +img.dataset.thumbnail;
    rightImg(currentImg, productImagesAbsolute);
  })
);

const burgerIcon = document.querySelector(".burger__icon");
const navMobile = document.querySelector(".nav--mobile");
const navMobileUl = document.querySelector(".nav__ul--mobile");
let isOpen = false;
burgerIcon.addEventListener("click", function () {
  if (!isOpen) {
    overlay.style.display = "block";
    burgerIcon.src = "images/icon-close.svg";
    isOpen = true;
  } else {
    overlay.style.display = "none";
    burgerIcon.src = "images/icon-menu.svg";
    isOpen = false;
  }
  navMobile.classList.toggle("display");
  navMobileUl.classList.toggle("display");
});

const body = document.querySelector("body");
const bodySize = window.getComputedStyle(body);

window.addEventListener("load", function () {
  if (window.innerWidth <= 900) {
    overlay.style.height = bodySize.height;
    navMobile.style.height = bodySize.height;
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth <= 900) {
    overlay.style.height = bodySize.height;
    navMobile.style.height = bodySize.height;
  }
});
