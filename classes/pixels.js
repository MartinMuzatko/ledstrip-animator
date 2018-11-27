import ws281x from 'node-rpi-ws281x-native'
import util from '../fx_util'

const DEFAULT_CONFIG = {
    invert: 0,
    frequency: 400000,
}

/**
 * Controls setting and resetting LED strip information
 * 
 */
export default class {
    constructor(config = {}) {
        this.currentPixels = []
        this.size = config.size || 50
        this.rgborder = config.rgborder || 'gbr'
        config = Object.assign({}, DEFAULT_CONFIG, config)
        ws281x.init(this.size, config)
    }

    reset() {
        ws281x.reset()
    }

    get() {
        return this.currentPixels
    }

    set(pixels) {
        this.currentPixels = pixels
        let order = this.rgborder.split('')
        let pixelInts = new Uint32Array(pixels.map(pixel => util.rgb2Int(pixel[order[0]], pixel[order[1]], pixel[order[2]])))
        ws281x.render(pixelInts)
    }
}