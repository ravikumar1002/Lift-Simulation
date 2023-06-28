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

const createLiftforFloor = (totalLift) => {
  const floorDetails = document.querySelector("#ground-floor");
  const liftDetails = createElementAndAddAttr("div", "lift-details");
  for (let i = 0; i <= totalLift; i++) {
    const liftLayout = createElementAndAddAttr("div", "lift-layout");
    liftLayout.innerHTML = `<div></div><div></div>`;
    liftDetails.append(liftLayout);
  }
  floorDetails.append(liftDetails);
};

const createLayoutOfFloor = (floor, lift) => {
  simulationsWrapper.innerText = "";
  const floorLiftContainer = createElementAndAddAttr(
    "div",
    "floor-lift-container"
  );
  const liftDetails = createElementAndAddAttr("div", "lift-details");
  let floorDetails = "";

  for (let i = floor; i >= 0; i--) {
    if (i === 0) {
      const floorDetailsDummy = createElementAndAddAttr(
        "div",
        "floor-details",
        "ground-floor"
      );
      floorDetailsDummy.innerHTML = `<div><h2>Ground Floor</h2> <div class="lift-btn-container"> <button class="lift-btn"> ⬆ </button></div>`;
      floorDetails = floorDetailsDummy;
    } else if (i === floor) {
      const floorDetailsDummy = createElementAndAddAttr(
        "div",
        "floor-details",
        "last-floor"
      );
      floorDetailsDummy.innerHTML = `<div><h2>Floor ${i}</h2> <div class="lift-btn-container"> <button class="lift-btn"> ⬇</button></div></div>`;
      floorDetails = floorDetailsDummy;
    } else {
      const floorDetailsDummy = createElementAndAddAttr("div", "floor-details");
      floorDetailsDummy.innerHTML = `<div><h2>Floor ${i}</h2> <div class="lift-btn-container"> <button class="lift-btn"> ⬆ </button> <button class="lift-btn"> ⬇</button></div></div>`;
      floorDetails = floorDetailsDummy;
    }
    simulationsWrapper.append(floorLiftContainer);
    floorLiftContainer.append(floorDetails);
  }
  createLiftforFloor(lift);
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
  //   console.log("A");
  //   homeWrapper.classList.add("hide");
  //   simulationsWrapper.classList.remove("hide");
  createLayoutOfFloor(homeData.floorCount, homeData.liftCount);
});
