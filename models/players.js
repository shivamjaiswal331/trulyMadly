const mongoose = require('mongoose')
const timeStamp = require('mongoose-timestamp')
const Schema = mongoose.Schema


const playersSchema = new Schema({
    name: { type: String, required: true },
    playerId: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
})

playersSchema.plugin(timeStamp)
playersSchema.index({ score: 1, })

playersModel = mongoose.model('players', playersSchema)

module.exports = playersModel

