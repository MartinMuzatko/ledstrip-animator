import Pixels from '../classes/pixels'
// import extend from 'extend'

export default class Sequence {
    constructor(amount = 1, size = 50) {
        this.size = size
        this.dim = 100
        this.frames = Array.from(Array(parseInt(amount)))
            .fill()
            .map(() => new Pixels(size))
    }

    add(newPixels) {
        let pixels = new Pixels(this.size)
        console.log(newPixels)
        if (newPixels) {
            pixels.pixels.forEach((pixel, index) => {
                pixel = newPixels[index]
            })
        }
        let previousFrame = this.frames[this.frames.length - 1]
        if (previousFrame) {
            // pixels.pixels = extend([], this.frames[this.frames.length -1].pixels)
        }
        this.frames.push(pixels)
    }

    remove(index) {
        this.frames.splice(index, 1)
    }
}
