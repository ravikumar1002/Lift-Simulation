export const checkInputLliftValidation = (value, floorValue) => {
    console.log(value)
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
    } else if (screen.width < 800) {
        if (value > 5) {
            alert("Lift can,t be more than 5")
            return false
        }
    } else if (screen.width < 1200) {
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
}

export const checkInputLFloorValidation = (value) => {
    console.log(value)
    if (value <= 0) {
        alert("Value can't be zero or nagative")
        return false
    }

    if (screen.width < 500) {
        if (value > 3) {
            alert("Floor can't be more than 8")
            return false
        }
    } else if (screen.width < 800) {
        if (value > 5) {
            alert("Floor can't be more than 12")
            return false
        }
    } else if (screen.width < 1200) {
        if (value > 7) {
            alert("Floor can't be more than 18")
            return false
        }
    } else if (screen.width > 1200) {
        if (value > 10) {
            alert("Floor can't be more than 25")
            return false
        }
    }
}
