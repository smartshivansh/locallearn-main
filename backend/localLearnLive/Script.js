"use strict";

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
// const card5 = document.getElementById("card5");
// const card6 = document.getElementById("card6");

const menuBtn = document.querySelector(".menuIcon");
const drawer = document.querySelector("#drawer");
const backdrop = document.querySelector("#backdrop");
const sidebar = document.querySelector("#sidebar");
const sidebarHeader = document.querySelector("#sidebar-header");
const xbutton = document.querySelector("#sidebar-xicon");

const login = document.querySelector(".details-Btn1");
const signin = document.querySelector(".details-Btn2");

let visible = true;

// login.addEventListener("click", function () {
//   console.log("ss");
//   fetch("http://localhost:5000/login");
// });

// login.addEventListener("click", function () {
//   fetch("http://localhost:5000/signup");
// });

function sliderFunction(newcard, oldcard) {
  newcard.style.opacity = 1;
  newcard.style.transition = "2s";
  newcard.style.transform = "translateX(0)";

  oldcard.style.transition = "2s";
  oldcard.style.transform = "translateX(-110%)";

  setTimeout(() => {
    oldcard.style.opacity = 0;
    oldcard.style.transform = "translateX(+110%)";
    oldcard.style.transition = "0s";
  }, 2000);
}

let No = 4;

card3.style.transform = "translateX(+110%)";
card4.style.transform = "translateX(0%)";

setInterval(() => {
  if (No === 0) {
    No = 4;
  }

  // if (No === 4) {
  //   sliderFunction(card5, card6);
  // } else if (No === 5) {
  //   sliderFunction(card4, card5);
  // }
  if (No === 4) {
    sliderFunction(card3, card4);
  } else if (No === 3) {
    sliderFunction(card2, card3);
  } else if (No === 2) {
    sliderFunction(card1, card2);
  } else if (No === 1) {
    sliderFunction(card4, card1);
  }
  No--;
}, 8000);

// const sidebarHandler = function () {
//   if (!visible) {
//     sidebar.style.transform = "translateX(0%)";
//     sidebar.style.transition = "1s";

//     backdrop.style.transform = "translateX(0%)";
//     backdrop.style.transition = "1s";

//     // sidebarHeader.style.display = "block";

//     visible = !visible;
//   } else {
//     sidebar.style.transform = "translateX(-110%)";
//     sidebar.style.transition = "1s";

//     backdrop.style.transform = "translateX(110%)";
//     backdrop.style.transition = "1s";

//     // sidebarHeader.style.display = "none";

//     visible = !visible;
//   }
// };

const sidebarHandler = () => {
  if (visible) {
    sidebar.style.display = "block";

    setTimeout(() => {
      backdrop.style.transform = "translateX(0)";
      backdrop.style.transition = "0.5s";

      drawer.style.transform = "translateX(0)";
      drawer.style.transition = "0.5s";

      sidebarHeader.style.opacity = 1;
      drawer.style.transition = "0.5s";
    }, 100);
  } else {
    backdrop.style.transform = "translateX(110%)";
    backdrop.style.transition = "0.5s";

    drawer.style.transform = "translateX(-110%)";
    drawer.style.transition = "0.5s";

    sidebarHeader.style.opacity = 0;
    drawer.style.transition = "0.5s";

    setTimeout(() => {
      sidebar.style.display = "none";
    }, 500);
  }

  visible = !visible;
};

menuBtn.addEventListener("click", sidebarHandler);
backdrop.addEventListener("click", sidebarHandler);
xbutton.addEventListener("click", sidebarHandler);
