const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");

const homeWrapper = document.querySelector(".home-wrapper");
const simulationsWrapper = document.querySelector(".simulations-wrapper");

const liftCount = document.querySelector(".lift-count");
const floorCount = document.querySelector(".floor-count");

liftCount.addEventListener("change", (e) => {
  console.log(e.target.value, "liftCount");
});

floorCount.addEventListener("change", (e) => {
  console.log(e.target.value, "floorCount");
});

startBtn.addEventListener("click", () => {
  homeWrapper.classList.add("hide");
  simulationsWrapper.classList.remove("hide");
});

backBtn.addEventListener("click", () => {
  simulationsWrapper.classList.add("hide");
  homeWrapper.classList.remove("hide");
});
