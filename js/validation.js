


// ----------- setting input's attribute when screen load according to screen size ------------
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


// ----------- Input floor validations ---------
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

// ----------- Input Lift validations ---------

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