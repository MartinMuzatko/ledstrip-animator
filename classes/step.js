import { ledstrip } from '../index'
import Pixel from './pixel'

export default class Step {
    
    constructor(pixels = [], options = {}) {
        this.pixels = pixels
        this.duration = parseFloat(options.duration) || 1
        this.fps = 50
        this.frame = 0
    }

    tick() {
        const fps = 1000 / this.fps
        this.tickTimer = setTimeout(
            () => {
                this.frame++
                this.tick()
            },
            fps
        )
    }

    async tween(nextStep) {
        let frames = this.getFrames()
        for (let frame of frames) {
            await new Promise(resolve => setTimeout(resolve, 1000 / this.fps))
            this.frame = frame.index
            // frame.percent
            let pixels = this.pixels.map((pixel, index) => {
                let next = nextStep.pixels[index]
                if (!next || !pixel) {
                    return new Pixel()
                }
                return pixel.mapColor(next, frame.percent)
            })
            ledstrip.set(pixels)
        }
    }

    * getFrames() {
        let frameLength = this.fps * this.duration
        yield* new Array(frameLength).fill().map((v, index) => {
            index += 1
            return {
                index,
                percent: 100 / frameLength * index,
            }
        })
    }

    resetTick() {
        clearTimeout(this.tickTimer)
    }
}