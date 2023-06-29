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

const queue = [];

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

const callLift = (i, floor, liftPosition, liftStatus) => {
  const btn = document.querySelectorAll(`button[data-floor="${i}"]`);
  btn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      console.log(index, floor, i, liftPosition, liftStatus, btn);
      
    });
  });
};

const createLift = (totalLift) => {
  const floorDetails = document.querySelector("#floor-0");
  const liftDetails = createElementAndAddAttr("div", "lift-details");

  for (let i = 0; i < totalLift; i++) {
    const liftLayout = createElementAndAddAttr(
      "div",
      "lift-layout",
      `lift-num-${i}`
    );
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

  let liftPosition = Array(+lift).fill(0);
  let liftStatus = Array(+lift).fill(false);

  for (let i = floor - 1; i >= 0; i--) {
    if (i === 0) {
      const floorDetailsDummy = createElementAndAddAttr(
        "div",
        "floor-details",
        `floor-${i}`
      );
      floorDetailsDummy.innerHTML = `<div><h2>Ground Floor</h2> <div class="lift-btn-container"> <button class="lift-btn up-btn"  data-floor=${i}> ⬆ </button></div>`;
      floorDetails = floorDetailsDummy;
    } else if (i === floor - 1) {
      const floorDetailsDummy = createElementAndAddAttr(
        "div",
        "floor-details",
        `floor-${i}`
      );
      floorDetailsDummy.innerHTML = `<div><h2>Floor ${i}</h2> <div class="lift-btn-container"> <button class="lift-btn down-btn" data-floor=${i}> ⬇</button></div></div>`;
      floorDetails = floorDetailsDummy;
    } else {
      const floorDetailsDummy = createElementAndAddAttr(
        "div",
        "floor-details",
        `floor-${i}`
      );
      floorDetailsDummy.innerHTML = `<div><h2>Floor ${i}</h2> <div class="lift-btn-container"> <button class="lift-btn up-btn"  data-floor=${i}> ⬆ </button> <button class="lift-btn down-btn"  data-floor=${i}> ⬇</button></div></div>`;
      floorDetails = floorDetailsDummy;
    }
    simulationsWrapper.append(floorLiftContainer);
    floorLiftContainer.append(floorDetails);
    callLift(i, floor, liftPosition, liftStatus);
  }
  createLift(lift);
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
