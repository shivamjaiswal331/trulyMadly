const Players = require('../models/players')

async function getPlayers(limit = 10, pageNum = 1) {
    try {
        const players = await Players.find({}).sort({ score: -1 }).skip((pageNum - 1) * limit).limit(limit)
        return { value: players }

    } catch (error) {
        return { error }
    }
}

async function addSamplePlayers(dataSet) {
    try {
        const addRes = await Players.insertMany(dataSet)
        return { value: addRes }

    } catch (error) {
        return { errpr }
    }
}

module.exports = {
    getPlayers,
    addSamplePlayers
}