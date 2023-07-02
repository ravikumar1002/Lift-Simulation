

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
