export default class Pixel {
    constructor(r = 0, g = 0, b = 0) {
        this.r = r
        this.g = g
        this.b = b
    }

    set(color) {
        this.r = color.r
        this.g = color.g
        this.b = color.b
    }

    map(a, b, percent) {
        percent = Math.min(100, Math.max(0, percent))
        return Math.floor((a * (100 - percent) + b * percent) / 100)
    }

    /** Returns a color, linearly mapped in RGB space between col1 and col2, with percent 0..100 */
    mapColor(pixel, percent) {
        return new Pixel(
            this.map(this.r, pixel.r, percent),
            this.map(this.g, pixel.g, percent),
            this.map(this.b, pixel.b, percent),
        )
    }
}
