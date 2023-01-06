
export const ableToCheckIn = (lastLogin) => {
    // console.log(lastLogin);

    const givenDate = new Date(lastLogin);
    const nowDate = new Date(Date.now())

    // console.log(givenDate, nowDate)

    let dif = nowDate - givenDate
    // console.log(dif) // ms

    let difSeconds = dif/1000
    let difMins = difSeconds/60
    let difHours = difMins/60
    // console.log(difSeconds, difMins, difHours)

    // valid after 12 hours
    return difHours > 12;
}

