
const moveLift = (i, floor, liftPosition, liftStatus, emptyLift) => {
    liftStatus[emptyLift] = true;

    const lift = document.querySelector(`#lift-num-${emptyLift}`);
    const liftDoors = document.querySelectorAll(`#lift-num-${emptyLift}>div`);
    let floorHeight = document.querySelector('.floor-details').offsetHeight

    const time = `${Math.abs(i - liftPosition[emptyLift]) * 2}`

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
