const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");

const homeWrapper = document.querySelector(".home-wrapper");
const simulationsWrapper = document.querySelector(".simulations-wrapper");

const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");

const homeData = {
  liftCount: 0,
  floorCount: 0,
};

liftCount.addEventListener("change", (e) => {
  homeData.liftCount = e.target.value;
});

floorCount.addEventListener("change", (e) => {
  homeData.floorCount = e.target.value;
});

startBtn.addEventListener("click", () => {
  homeWrapper.classList.add("hide");
  simulationsWrapper.classList.remove("hide");
});

backBtn.addEventListener("click", () => {
  simulationsWrapper.classList.add("hide");
  homeWrapper.classList.remove("hide");
});
