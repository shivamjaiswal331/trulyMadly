const PlayersDao = require('../dao/players')
const SamplePlayersName = require('../constants/sampledata.json')
const random = require('../utils/random')
const uuid = require('uuid');

async function getTopPlayers(limit = 10, pageNum = 1, cb = () => { }) {
    try {
        const players = await PlayersDao.getPlayers(limit, pageNum)
        if (players.error) {
            throw players.error
        }
        cb(null, players.value)
        return { value: players.value }


    } catch (error) {
        console.log("error found", error)
        cb(error)
        return { error }
    }
}



async function createAndAddSampleDataSet() {
    try {
        const sampleDataSet = SamplePlayersName.data.map(name => {
            const playerId = uuid.v4()
            const playerScore = random.getRandomNumber() // score lies between 1 to 10000
            return {
                name,
                playerId,
                score: playerScore
            }
        })

        const addSampleDataRes = await PlayersDao.addSamplePlayers(sampleDataSet)


        console.log("sampleDataSet", addSampleDataRes)

    } catch (error) {
        console.log("error found in creating sample data", error)
    }
}




// createAndAddSampleDataSet()

module.exports = {
    getTopPlayers
}