import Pixel from './pixel'
import extend from 'extend'

export default class Pixels {
    constructor(pixels) {
        this.duration = 1
        this.pixels = Array.from(Array(parseInt(pixels)))
            .fill()
            .map(pixel => pixel = new Pixel(0, 0, 0))
    }

    setSize(size) {
        let oldPixels = extend(true, {}, this.pixels)
        this.pixels.length = size
        this.pixels.fill(false)
        this.pixels = this.pixels.map((pixel, index) => {
            let oldPixel = oldPixels[index]
            if (oldPixel) {
                return oldPixel
            } else {
                return new Pixel(0, 0, 0)
            }
        })
    }

    moveLeft() {
        this.pixels.push(this.pixels.shift())
    }

    moveRight() {
        this.pixels.unshift(this.pixels.pop())
    }

    dither() {
        this.pixels.forEach((pixel, index) => {
            if (index % 2 == 0) {
                pixel.r = 0
                pixel.g = 0
                pixel.b = 0
            }
        })
    }

    fill(color) {
        this.pixels.forEach(pixel => {
            pixel.r = color.r
            pixel.g = color.g
            pixel.b = color.b
        })
    }

    randomize() {
        this.pixels.forEach(pixel => {
            pixel.set({
                r: Math.random() * 255 | 0,
                g: Math.random() * 255 | 0,
                b: Math.random() * 255 | 0,
            })
        })
    }

    get(index) {
        return this.pixels[index]
    }

    setAllPixels() {

    }

    set(slot, color) {
        this.pixels[slot].set(extend({}, color))
    }
}
