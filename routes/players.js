var express = require('express');
var router = express.Router();
const { celebrate } = require('celebrate');
const Schema = require('../requestschemas/players')
const PlayersService = require("../services/players.service")
const RedisService = require('../utils/redis')

router.get('/players', [celebrate(Schema.getTopPlayers)], function (req, res) {

    const { pageNum, limit } = req.query

    if ((!pageNum && !limit) || (pageNum === 1 && limit === 10)) {
        RedisService.getData("TOP_PLAYERS", async function (error, value) {
            if (value) {
                res.status(200).json({ response: JSON.parse(value), message: "Players list fetched successfully" })
            } else {
                const playersList = await PlayersService.getTopPlayers(pageNum, limit)
                if (playersList.error) {
                    res.status(500).json({ response: null, error })
                } else {
                    RedisService.addData("TOP_PLAYERS", JSON.stringify(playersList.value))
                    res.status(200).json({ response: playersList.value, message: "Players list fetched successfully" })
                }
            }
        })
    }
    else {
        PlayersService.getTopPlayers(limit, pageNum, function (error, value) {
            if (error) {
                res.status(500).json({ response: null, error })
            } else {
                res.status(200).json({ response: value, message: "Players list fetched successfully" })
            }
        })
    }


})




module.exports = router