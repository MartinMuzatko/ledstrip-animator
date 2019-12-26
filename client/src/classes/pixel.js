export default class Pixel {
    constructor(r, g, b) {
        this.r = r
        this.g = g
        this.b = b
    }

    set(color) {
        this.r = color.r
        this.g = color.g
        this.b = color.b
    }
}
