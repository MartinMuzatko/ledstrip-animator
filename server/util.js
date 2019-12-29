const { default: Axios } = require('axios')

const axios = Axios.create({
    baseURL: 'http://192.168.255.52:8090'
})

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const setPixels = pixels => axios.post('/api/pixels/direct', pixels)

module.exports = {
    setPixels,
    random,
}