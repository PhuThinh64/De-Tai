const listImg = document.querySelector(".list_img");
const imgs = document.querySelectorAll(".list_img img");
const imgThumbs = document.querySelectorAll(".list_thumb img");
const indexBanner = document.querySelectorAll(".index_banner .index");
// console.log(indexBanner);
let index = 0;

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


