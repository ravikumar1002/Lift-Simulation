const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");

const homeWrapper = document.querySelector(".home-wrapper");
const simulationsWrapper = document.querySelector(".simulations-wrapper");

const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");

const show = document.querySelector(".show");

const homeData = {
  liftCount: 0,
  floorCount: 0,
};

liftCount.addEventListener("keyup", (e) => {
  homeData.liftCount = e.target.value;
});

floorCount.addEventListener("change", (e) => {
  homeData.floorCount = e.target.value;
});

const createLayoutOfFloor = (lift, floor) => {
  simulationsWrapper.innerHTML = "";
  const floorContainer = document.createElement("div");
  const liftContainer = document.createElement("div");
  const liftBtnContainer = document.createElement("div");
  const liftUpBtn = document.createElement("button");
  const liftDownBtn = document.createElement("button");
};

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(homeData);
  if (homeData.floorCount <= 0 || homeData.floorCount > 50) {
    alert("please fill valid floor");
    return;
  } else if (homeData.liftCount <= 0 || homeData.liftCount > 10) {
    alert("please fill valid lift");
    return;
  }
  console.log("A");
  homeWrapper.classList.add("hide");
  simulationsWrapper.classList.remove("hide");
});

backBtn.addEventListener("click", () => {
  simulationsWrapper.classList.add("hide");
  homeWrapper.classList.remove("hide");
});

show.addEventListener("click", () => {
  console.log(homeData);
});
