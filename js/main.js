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

const createElementAndAddAttr = (elementTag, className, id) => {
  const element = document.createElement(elementTag);
  if (className) element.setAttribute("class", className);
  if (id) element.setAttribute("id", id);
  return element;
};

const createLiftforFloor = (totalLift, liftDetails) => {
  console.log(totalLift, liftDetails);
  for (let i = 0; i <= totalLift; i++) {
    const liftLayout = createElementAndAddAttr("div", "lift-layout");
    liftLayout.innerHTML = `<div></div><div></div>`;
    liftDetails.append(liftLayout);
  }
};

const createLayoutOfFloor = (floor, lift) => {
  simulationsWrapper.innerHTML = "";
  const floorLiftContainer = createElementAndAddAttr(
    "div",
    "floor-lift-container"
  );
  const floorDetails = createElementAndAddAttr("div", "floor-details");
  const liftBtnContainer = createElementAndAddAttr("div", "lift-btn-container");
  const liftDetails = createElementAndAddAttr("div", "lift-details");

  for (let i = 0; i <= floor; i++) {
    floorDetails.innerHTML = `<h2>Floor 1</h2> <div class="lift-btn-container"> <button class="lift-btn"> ⬆ </button> <button class="lift-btn"> ⬇</button></div>`;
    simulationsWrapper.append(floorLiftContainer);
    floorLiftContainer.append(floorDetails, liftDetails);
  }
  createLiftforFloor(lift, liftDetails);
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
  createLayoutOfFloor(homeData.floorCount, homeData.liftCount);
});

backBtn.addEventListener("click", () => {
  simulationsWrapper.classList.add("hide");
  homeWrapper.classList.remove("hide");
});

show.addEventListener("click", () => {
  console.log(homeData);
});
