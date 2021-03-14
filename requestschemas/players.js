const { Joi } = require('celebrate');


const getTopPlayers = {
    query: {
        pageNum: Joi.number().integer().greater(0),
        limit: Joi.number().integer().greater(-1)
    }
}


module.exports = {
    getTopPlayers
}