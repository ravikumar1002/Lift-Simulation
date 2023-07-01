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

const moveLift = (i, floor, liftPosition, liftStatus, emptyLift) => {
    liftStatus[emptyLift] = true;

    const lift = document.querySelector(`#lift-num-${emptyLift}`);
    const liftDoors = document.querySelectorAll(`#lift-num-${emptyLift}>div`);
    let floorHeight = document.querySelector('.floor-details').offsetHeight
    console.log(floorHeight)
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
    const liftDetails = createElementAndAddAttr("div", "lift-details");

    let liftPosition = Array(+lift).fill(0);
    let liftStatus = Array(+lift).fill(false);

    for (let i = floor - 1; i >= 0; i--) {
        const floorDetailsDummy = createElementAndAddAttr(
            "div",
            "floor-details",
            `floor-${i}`
        );
        if (i === 0) {
            floorDetailsDummy.innerHTML = `<div><h2>Ground Floor</h2> <div class="lift-btn-container"> <button class="lift-btn up-btn"  data-floor=${i}> ⬆ </button></div>`;
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

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
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
