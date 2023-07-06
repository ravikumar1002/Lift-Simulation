

// ----creating element through Js and adding necessary attribute-------
const createElementAndAddAttr = (elementTag, className, id) => {
    const element = document.createElement(elementTag);
    if (className) element.setAttribute("class", className);
    if (id) element.setAttribute("id", id);
    return element;
};



const findNearestEmptyLift = (calledFloor, liftStatus, liftPosition, totalFloor) => {
    let nearestLiftDiff = totalFloor + 1
    let emptyLiftIndex = -1

    liftStatus.forEach((status, i) => {
        const diff = Math.abs(+calledFloor - liftPosition[i])
        console.log(diff, calledFloor, liftStatus, liftPosition, totalFloor, status)
        if (status === false && diff < nearestLiftDiff) {
            console.log("near lift func")
            emptyLiftIndex = i
            nearestLiftDiff = diff
        }
    })

    console.log(emptyLiftIndex, nearestLiftDiff)

    return emptyLiftIndex
}


// ----- Call lift function for every floor button-----------
const callLift = (i, liftPosition, liftStatus, totalFloor) => {
    const liftButtons = document.querySelectorAll(`button[data-floor="${i}"]`);

    liftButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log(liftButtons)
            // ---- disabled that floor button because currently it's actived----------------
            liftButtons[0].disabled = true;
            liftButtons[0].style.cursor = "not-allowed"
            if (liftButtons[1]) {
                liftButtons[1].disabled = true;
                liftButtons[1].style.cursor = "not-allowed"
            }

            // ------ if queue is empty then this block will work and inside that if lift is empty then move lift will call otherwise this will  push to queue---
            if (queue.length === 0) {
                // const findEmptyLiftIn = liftStatus.findIndex((status) => status === false);
                const findEmptyLiftIn = findNearestEmptyLift(i, liftStatus, liftPosition, totalFloor)
                console.log(findEmptyLiftIn)
                if (findEmptyLiftIn + 1) {
                    console.log("lift avail")
                    moveLift(i, liftPosition, liftStatus, findEmptyLiftIn);
                } else {
                    console.log("lift busy")
                    queue.push(i);
                    console.log(queue)
                }
            } else {
                // --- finding that floor in queue
                if (!queue.includes(i)) queue.push(i);
                console.log(queue)
                // ----- setInterval for looping till queue will goes empty
                let timeout = setInterval(() => {
                    // console.log(findNearestEmptyLift(i, liftPosition, liftStatus, totalFloor))
                    // const findLiftEmptyIn = liftStatus.findIndex((status) => status === false);
                    const findLiftEmptyIn = findNearestEmptyLift(i, liftStatus, liftPosition, totalFloor)
                    console.log(findLiftEmptyIn, "timeout")
                    if (findLiftEmptyIn + 1 && queue.length > 0) {
                        console.log(queue, "queue move")
                        moveLift(queue[0], liftPosition, liftStatus, findLiftEmptyIn);
                        queue.shift();
                    }
                }, 500)

                // ------- Removing Interval
                if (queue.length === 0)
                    clearInterval(timeout)
            }
        });
    });
};


// ----- Creating Lift structure layout ---------
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


// ----- Creating Floor structure layout ---------
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
        callLift(i, liftPosition, liftStatus, floor);
    }
    createLift(lift);
};
