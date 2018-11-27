#!/usr/bin/node
import express from 'express'
import http from 'http'
import Pixels from './classes/pixels'
import Pixel from './classes/pixel'
import Scene from './classes/scene'
import Step from './classes/step'
import io from 'socket.io'


// const NUM_LEDS = parseInt(process.argv[2], 10) || 50
export const ledstrip = new Pixels({
    size: 50,
    rgborder: 'gbr',
    ledstrip: {
        invert: 0,
        frequency: 400000,
    }
})

let scene = new Scene()

process.on('SIGINT', () => {
    ledstrip.reset()
    process.nextTick(() => { process.exit(0) })
})

process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Promise rejection');
    console.log(p);
    console.log(reason);
});

const app = express()
const httpServer = http.Server(app)
const socketServer = http.createServer()
const socketIo = io(socketServer)


app.use('/', express.static(__dirname + '/public/dist'))

app.get('/scenario/:sId', (req, res) => {
	res.send('ok')
})

httpServer.listen(8080, () => {
    // console.log('listening on *:8080')
})

var latestClientId = 0
function getNewClientId() {
	return ++latestClientId
}


socketIo.on('connection', function(socket) {
    var clientId = getNewClientId()
    console.log('a user connected from ' + socket.client.conn.remoteAddress + ", clientId=" + clientId)

    socket.emit('current', JSON.stringify(ledstrip.get()))

    socket.on('setPixels', data => {
        ledstrip.set(JSON.parse(data))
    })

    socket.on('setScene', data => {
        data = JSON.parse(data)
        if (data.frames.length < 2) {
            return
        }
        let steps = data.frames
            .map(step => new Step(
                step.pixels.map(pixel => new Pixel(pixel.r, pixel.g, pixel.b)),
                {
                    duration: step.duration
                }
            )
        )
        scene.setSteps(steps)
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected, clientId=' + clientId)
    })
})

socketServer.listen(3000, () => {
    // console.log('socket started on 3000')
})

console.log('Press <ctrl>+C to exit.')