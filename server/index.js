const web = require('./web')
const ws281x = require('node-rpi-ws281x-native')
const EventEmitter = require('events')
const { eventloop, getPixelArray } = require('./ledloop')

const ledControl = new EventEmitter()

const setup = (amountPixels = 100, config = { invert: 1, frequency: 400000 }) => 
    ws281x.init(amountPixels, config)

web.init({ ledControl, ws281x, setup, port: process.env.PORT || 8090 })
eventloop([], ledControl, 30)
setup()
ledControl.on('data', data => ws281x.render(getPixelArray(data, 'rbg')))

