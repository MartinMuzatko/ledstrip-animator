const t = require('ava').default
const scene = require('../ledloop')

t('turn pixels into UIntArray', t => {
    const pixels = scene.getPixelArray([
        {r: 255, g: 0, b: 0},
        {r: 0, g: 255, b: 0},
        {r: 0, g: 0, b: 255},
    ])
    t.deepEqual(pixels, new Uint32Array([
        0xff0000,
        0x00ff00,
        0x0000ff,
    ]))
})

t('turn pixels into UIntArray with another order', t => {
    const pixels = scene.getPixelArray([
        {r: 255, g: 0, b: 0},
        {r: 0, g: 255, b: 0},
        {r: 0, g: 0, b: 255},
    ], 'bgr')
    t.deepEqual(pixels, new Uint32Array([
        0x0000ff,
        0x00ff00,
        0xff0000,
    ]))
})

t('turn rgb to int', t => {
    t.is(scene.rgbToInt(255, 0, 0), 0xff0000)
})

t('fade color between two colors with a given percentage', t => {
    t.is(scene.fadeColor(50, 0, 255), 127)
    t.is(scene.fadeColor(75, 0, 255), 191)
    t.is(scene.fadeColor(50, 100, 200), 150)
})

t('tween between two arrays', t => {
    const a = [{r: 0, g: 0, b: 0}, {r: 100, g: 0, b: 0}]
    const b = [{r: 100, g: 0, b: 0}, {r: 0, g: 0, b: 0}]
    const tweened = scene.tween(3, a, b)
    console.log(tweened)
    t.deepEqual(tweened, [
        [{r: 0, g: 0, b: 0}, {r: 100, g: 0, b: 0}],
        [{r: 33, g: 0, b: 0}, {r: 66, g: 0, b: 0}],
        [{r: 66, g: 0, b: 0}, {r: 33, g: 0, b: 0}],
        [{r: 100, g: 0, b: 0}, {r: 0, g: 0, b: 0}],
    ])
})

t('map rgb', t => {
    const x = ([color, value]) => [color, value * 2]
    const doubleRgb = scene.mapRgb(x, {r: 2, g: 4, b: 8})
    t.deepEqual(doubleRgb, {r: 4, g: 8, b: 16})
})

t('fade between two rgb objects', t => {
    const a = {r: 0, g: 0, b: 255}
    const b = {r: 255, g: 0, b: 0}
    t.deepEqual(scene.fadeRgb(50, a, b), {r: 127, g: 0, b: 127})
    t.deepEqual(scene.fadeRgb(30, a, b), {r: 76, g: 0, b: 178})
})
