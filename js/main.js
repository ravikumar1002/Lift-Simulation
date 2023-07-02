
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

const moveLift = (i, floor, liftPosition, liftStatus, emptyLift) => {
    liftStatus[emptyLift] = true;

    const lift = document.querySelector(`#lift-num-${emptyLift}`);
    const liftDoors = document.querySelectorAll(`#lift-num-${emptyLift}>div`);
    let floorHeight = document.querySelector('.floor-details').offsetHeight

    const time = `${Math.abs(floor - liftPosition[emptyLift]) * 2}`

    lift.style.transform = `translateY(-${i * floorHeight}px)`
    lift.style.transition = `transform ${time}s ease-in-out 0s`;


    setTimeout(() => {
        liftDoors[0].style.transform = `translateX(-95%)`
        liftDoors[0].style.transition = `all 2s ease-in-out 1s`;

        liftDoors[1].style.transform = `translateX(95%)`
        liftDoors[1].style.transition = `all 2s ease-in-out 1s`;
    }, +time * 1000 + 500)

    setTimeout(() => {
        liftDoors[0].style.transform = `translateX(0%)`
        liftDoors[0].style.transition = `all 2s ease-in-out 1s`;

        liftDoors[1].style.transform = `translateX(0%)`
        liftDoors[1].style.transition = `all 2s ease-in-out 1s`;

        setTimeout(() => {
            liftStatus[emptyLift] = false;
        }, 2500)

    }, (+time + 3.5) * 1000)

    liftPosition[emptyLift] = i

};

const createElementAndAddAttr = (elementTag, className, id) => {
    const element = document.createElement(elementTag);
    if (className) element.setAttribute("class", className);
    if (id) element.setAttribute("id", id);
    return element;
};

const callLift = (i, floor, liftPosition, liftStatus) => {
    const btn = document.querySelectorAll(`button[data-floor="${i}"]`);
    btn.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (queue.length === 0) {
                const findEmptyLiftIn = liftStatus.findIndex((status) => status === false);
                if (findEmptyLiftIn + 1) {
                    moveLift(i, floor, liftPosition, liftStatus, findEmptyLiftIn);
                } else {
                    queue.push(i);
                }
            } else {
                if (!queue.includes(i)) queue.push(i);

                let timeout = setInterval(() => {
                    const findLiftEmptyIn = liftStatus.findIndex((status) => status === false);
                    if (findLiftEmptyIn + 1 && queue.length > 0) {
                        moveLift(queue[0], floor, liftPosition, liftStatus, findLiftEmptyIn);
                        queue.shift();
                    }
                }, 500)
                if (queue.length === 0)
                    clearInterval(timeout)
            }
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

    let liftPosition = Array(lift).fill(0);
    let liftStatus = Array(lift).fill(false);

    for (let i = floor - 1; i >= 0; i--) {
        const floorDetailsDummy = createElementAndAddAttr(
            "div",
            "floor-details",
            `floor-${i}`
        );
        if (i === 0) {
            floorDetailsDummy.innerHTML = `<div><h2>Ground</h2> <div class="lift-btn-container"> <button class="lift-btn up-btn"  data-floor=${i}> ⬆ </button></div>`;
        } else if (i === floor - 1) {
            floorDetailsDummy.innerHTML = `<div><h2>Floor ${i}</h2> <div class="lift-btn-container"> <button class="lift-btn down-btn" data-floor=${i}> ⬇</button></div></div>`;
        } else {
            floorDetailsDummy.innerHTML = `<div><h2>Floor ${i}</h2> <div class="lift-btn-container"> <button class="lift-btn up-btn"  data-floor=${i}> ⬆ </button> <button class="lift-btn down-btn"  data-floor=${i}> ⬇</button></div></div>`;
        }
        simulationsWrapper.append(floorLiftContainer);
        floorLiftContainer.append(floorDetailsDummy);
        callLift(i, floor, liftPosition, liftStatus);
    }
    createLift(lift);
};

const checkInputLliftValidation = (value, floorValue) => {
    if (value <= 0) {
        alert("Value can't be zero or nagative")
        return false
    }

    if (floorValue < value) {
        alert("Lift can't be more than floor")
        return false
    }

    if (screen.width < 500) {
        if (value > 3) {
            alert("Lift can,t be more than 3")
            return false
        }
    } else if (screen.width < 800 && screen.width > 500) {
        if (value > 5) {
            alert("Lift can,t be more than 5")
            return false
        }
    } else if (screen.width < 1200 && screen.width > 800) {
        if (value > 7) {
            alert("Lift can,t be more than 7")
            return false
        }
    } else if (screen.width > 1200) {
        if (value > 10) {
            alert("Lift can,t be more than 10")
            return false
        }
    }
    return true
}

const checkInputLFloorValidation = (value) => {

    if (value <= 0) {
        alert("Value can't be zero or nagative")
        return false
    }

    if (screen.width < 500) {
        if (value > 8) {
            alert("Floor can't be more than 8")
            return false
        }
    } else if (screen.width < 800 && screen.width > 500) {
        if (value > 12) {
            alert("Floor can't be more than 12")
            return false
        }
    } else if (screen.width < 1200 && screen.width > 800) {
        if (value > 18) {
            alert("Floor can't be more than 18")
            return false
        }
    } else if (screen.width > 1200) {
        if (value > 25) {
            alert("Floor can't be more than 25")
            return false
        }
    }

    return true
}


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

