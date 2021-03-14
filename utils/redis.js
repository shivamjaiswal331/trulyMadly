const redis = require("redis");
let client;

const cachingService = {

    connect() {
        return new Promise((resolve, reject) => {
            client = redis.createClient(process.env.APP_REDIS_URL, { connect_timeout: 2000 })
            client.on('connect', function () {
                resolve({ value: true })
            });
            client.on('error', function (err) {
                resolve({ error: { type: 'error', ...err.spread(), location: { file: __filename, function: 'connect' } } })
            });
        })
    },
    addData(key, value, cb = () => { }) {

        client.set(key, value, function (error, value) {
            cb(error, value)
        })

    },
    getData(key, cb = () => { }) {
        client.get(key, function (error, value) {
            cb(error, value)
        })
    }


}


module.exports = cachingService
