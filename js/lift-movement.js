
// ---------------- Lift move function--------

const moveLift = (i, liftPosition, liftStatus, emptyLift) => {
    liftStatus[emptyLift] = true;

    const lift = document.querySelector(`#lift-num-${emptyLift}`);
    const liftButtons = document.querySelectorAll(`button[data-floor="${i}"]`);
    const liftDoors = document.querySelectorAll(`#lift-num-${emptyLift}>div`);
    let floorHeight = document.querySelector(".floor-details").offsetHeight;
    // ---------Finding difference between call lift floor and empty lift floor ------------
    const time = `${Math.abs(i - liftPosition[emptyLift]) * 2}`;
    // ----- Moving  lift through css properties ---------
    lift.style.transform = `translateY(-${i * floorHeight}px)`;
    lift.style.transition = `transform ${time}s ease-in-out 0s`;

    // ----- Opening Doors -------
    setTimeout(() => {
        liftDoors[0].style.transform = `translateX(-95%)`;
        liftDoors[0].style.transition = `all 2s ease-in-out 1s`;

        liftDoors[1].style.transform = `translateX(95%)`;
        liftDoors[1].style.transition = `all 2s ease-in-out 1s`;
    }, +time * 1000 + 500);

    // ------closing Doors ---------
    setTimeout(() => {
        liftButtons[0].disabled = false;
        liftButtons[1].disabled = false;
        liftButtons[0].style.cursor = "pointer"
        liftButtons[1].style.cursor = "pointer"

        liftDoors[0].style.transform = `translateX(0%)`;
        liftDoors[0].style.transition = `all 2s ease-in-out 1s`;

        liftDoors[1].style.transform = `translateX(0%)`;
        liftDoors[1].style.transition = `all 2s ease-in-out 1s`;

        // ---- Changing Lift status, ture to false ----------
        setTimeout(() => {
            liftStatus[emptyLift] = false;
        }, 2500);
    }, (+time + 3.5) * 1000);

    // ------------ Set empty lift position floor ---------- 


    liftPosition[emptyLift] = i;
};
