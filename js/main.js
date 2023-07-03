
const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const homeWrapper = document.querySelector(".home-wrapper");
const simulationsWrapper = document.querySelector(".simulations-wrapper");
const topNav = document.querySelector("#back-nav")
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

floorCount.addEventListener("keyup", (e) => {
    homeData.floorCount = e.target.value;
});


startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    queue.length = 0
    liftCount.value = null
    floorCount.value = null
    // ---- If block for checking inputs value for lift and floor
    if (checkInputLliftValidation(+homeData.liftCount, +homeData.floorCount) && checkInputLFloorValidation(+homeData.floorCount)) {

        homeWrapper.classList.add("hide");
        simulationsWrapper.classList.remove("hide");
        topNav.classList.add("top-nav")
        topNav.classList.remove("hide")
        createLayoutOfFloor(+homeData.floorCount, +homeData.liftCount);
        const groundFloor = document.querySelector("#floor-0")
        groundFloor.scrollIntoView();
    }
});


backBtn.addEventListener("click", (e) => {
    // ----- resetting all  value-----
    e.preventDefault()
    homeData.liftCount = 0
    homeData.floorCount = 0
    queue.length = 0
    // liftCount.value = ""
    // floorCount.value = ""
    topNav.classList.remove("top-nav")
    topNav.classList.add("hide")
    simulationsWrapper.classList.add("hide");
    homeWrapper.classList.remove("hide");
})

