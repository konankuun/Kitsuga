module.exports = async prefix => {
    let caracters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"]
    let ID = [];
    for (let i = 0; i < 14; i++) ID.push(caracters[Math.floor(Math.random() * caracters.length)])

    return `${prefix}-${ID.join("")}`
}