function getRandomNumber(upperRange = 1000) {
    return Math.floor((Math.random() * upperRange) + 1);
}

module.exports = {
    getRandomNumber
}