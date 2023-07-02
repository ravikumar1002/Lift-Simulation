
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

window.onload = () => {
    if (screen.width < 500) {
        liftCount.setAttribute("placeholder", "Max 3")
        liftCount.setAttribute("max", "5")

        floorCount.setAttribute("placeholder", "Max 8")
        floorCount.setAttribute("max", "8")

    } else if (screen.width < 800 && screen.width > 500) {
        liftCount.setAttribute("placeholder", "Max 5")
        liftCount.setAttribute("max", "5")

        floorCount.setAttribute("placeholder", "Max 12")
        floorCount.setAttribute("max", "12")

    } else if (screen.width < 1200 && screen.width > 800) {
        liftCount.setAttribute("placeholder", "Max 7")
        liftCount.setAttribute("max", "7")

        floorCount.setAttribute("placeholder", "Max 18")
        floorCount.setAttribute("max", "18")

    } else if (screen.width > 1200) {
        liftCount.setAttribute("placeholder", "Max 10")
        liftCount.setAttribute("max", "10")

        floorCount.setAttribute("placeholder", "Max 25")
        floorCount.setAttribute("max", "25")

    }
}


liftCount.addEventListener("keyup", (e) => {
    homeData.liftCount = e.target.value;
});

floorCount.addEventListener("keyup", (e) => {
    homeData.floorCount = e.target.value;
});


startBtn.addEventListener("click", (e) => {
    e.preventDefault();

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
    e.preventDefault()
    homeData.liftCount = 0
    homeData.floorCount = 0
    queue.length = 0
    liftCount.value = ""
    floorCount.value = ""
    topNav.classList.remove("top-nav")
    topNav.classList.add("hide")
    simulationsWrapper.classList.add("hide");
    homeWrapper.classList.remove("hide");
})

