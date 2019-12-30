"use strict"
const { curry, map, fromPairs, min, max, pipe } = require('ramda')

const getPixelArray = (pixels, rgborder = 'rgb') => {
    const order = rgborder.split('')
    const rgbByOrder = convertRgbToIntByOrder(order)
    return new Uint32Array(pipe(map(map(colorbitRange)), map(rgbByOrder))(pixels))
}

const colorbitRange = pipe(max(0), min(255))
const convertRgbToIntByOrder = curry((order, pixel) => rgbToInt(pixel[order[0]], pixel[order[1]], pixel[order[2]]))
const rgbToInt = (r, g, b) => ((r & 0x0ff) << 16) | ((g & 0x0ff) << 8) | (b & 0x0ff)
const rgb = (r = 0, g = 0, b = 0) => ({ r, g, b })
const fadeColor = (percent, a, b) => {
    const normalizedPercent = Math.min(100, Math.max(0, percent))
    return Math.floor((a * (100 - normalizedPercent) + b * normalizedPercent) / 100)
}
const mapRgb = curry((fn, rgb) => fromPairs(map(fn, Object.entries(rgb))))
const fadeRgb = (percent, a, b) =>
    mapRgb(([color, value]) =>
        [color, fadeColor(percent, value, b[color])], a)
const of = amount => [...Array(amount)]
const tween = (amount = 10, a = [{}], b = [{}]) => {
    if (amount <= 0) throw new Error(`cannot tween with zero steps (${amount})`)
    const steps = 100 / amount
    return of(amount).map((u, step) =>
        a.map((value, index) =>
            fadeRgb(step * steps, value, b[index])
        )
    )
}

const tick = (pixels, delay, event) => {
    if (!pixels.length) return event.emit('end')
    const newPixels = pixels.slice(1)
    const pixel = pixels[0]
    const timer = setTimeout(
        () => {
            event.emit('data', pixel)
            tick(newPixels, delay, event)
        },
        delay
    )
    event.removeAllListeners('stop')
    event.on('stop', () => {
        clearTimeout(timer)
        event.emit('stopped', { pixels: newPixels, delay })
    })
}

const fps = fps => Math.round(1000 / fps)

const eventloop = (pixels, event, frames = 30, startImmediate = true) => {
    event.emit('stop')
    event.removeAllListeners('start')
    event.on('start', () => tick(pixels, fps(frames), event))
    startImmediate && event.emit('start')
    event.removeAllListeners('end')
    event.on('end', () => {
        eventloop(pixels, event, frames, startImmediate)
    })
}

module.exports = {
    getPixelArray,
    convertRgbToIntByOrder,
    rgbToInt,
    fadeColor,
    tween,
    of,
    mapRgb,
    fadeRgb,
    eventloop,
    rgb,
    tick,
    colorbitRange,
}