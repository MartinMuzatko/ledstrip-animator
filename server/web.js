const express = require('express')
const { tween, eventloop } = require('./ledloop')
const scenes = require('./scenes')
const bodyParser = require('body-parser')

const CLIENTPATH = '../client/dist'

const init = ({ ledControl, ws281x, setup, port }) => {
    let currentScene = null
    // const cors = require('cors')
    const app = express()
    app.use(bodyParser.json())
    app.use('/', express.static(CLIENTPATH))
    app.get('/api/pixels/current', (req, res) => res.send(currentScene))
    app.post('/api/pixels', (req, res) => {
        const pixels = req.body.reduce((previous, current, index, items) => {
            const next = items[index + 1] || items[0]
            return [...previous, ...tween(30, current, next)]
        }, [])
        currentScene = pixels
        ledControl.emit('stop')
        eventloop(pixels, ledControl, 30, true)
        res.sendStatus(200)
    })

    app.get('/api/scenes', async (req, res) => {
        res.send(await scenes.list())
    })

    app.get('/api/scenes/:id', async (req, res) => {
        res.send(await scenes.get(req.params.id))
    })

    app.put('/api/scenes/:id', async (req, res) => {
        scenes.set(req.params.id, req.body) 
        res.sendStatus(204)
    })

    app.listen(port, () => console.log(`listening on 0.0.0.0:${port}`))
}

module.exports = {
    init,
}