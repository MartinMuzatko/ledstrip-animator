import Step from '../classes/step'
import Pixel from '../classes/pixel'

export default function (amount) {
    const pixels = Array.from(Array(amount))
    let load = pixels.map((v, scene) => 
        new Step(pixels.map((k, pixel) => 
            new Pixel(scene <= pixel ? 255 : 0, 128, 0)
        ), { duration: .25})
    )
    return [
        ...load,
        // new Step(Array(amount).fill().map(pixel => new Pixel(255, 0, 0))),
        // new Step(Array(amount).fill().map(pixel => new Pixel(0, 255, 0))),
        // new Step(Array(amount).fill().map(pixel => new Pixel(0, 0, 255))),
        // new Step(Array(amount).fill().map(pixel => new Pixel(0, 255, 0))),
        // new Step(Array(amount).fill().map(pixel => new Pixel(255, 0, 0))),
    ]
}