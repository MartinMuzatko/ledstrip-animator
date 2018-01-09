import Step from './step'
import Pixel from './pixel'

export default class Scene {
    constructor(steps = []) {
        this.steps = [
            new Step(Array(50).fill().map(pixel => new Pixel(255, 0, 0))),
            new Step(Array(50).fill().map(pixel => new Pixel(0, 255, 0))),
            new Step(Array(50).fill().map(pixel => new Pixel(0, 0, 255))),
            new Step(Array(50).fill().map(pixel => new Pixel(0, 255, 0))),
            new Step(Array(50).fill().map(pixel => new Pixel(255, 0, 0))),
        ]
        // this.start(this.getSteps(this.steps))
        this.loop()
    }

    setSteps(steps) {
        this.steps = steps
        this.steps.push(steps[0])
    }
    
    * getSteps(steps) {
        yield* steps.map((step, index) => { return {
            index,
            step,
        }})
    }
    
    async loop() {
        await this.start(this.getSteps(this.steps))
        if (!this.steps.length) {
            return
        }
        this.loop()
    }

    async start(steps) {
        let lastStep = steps.next().value.step
        for (let step of steps) {
            // await new Promise(resolve => setTimeout(resolve, lastStep.duration * 1000))
            await lastStep.tween(step.step)
            lastStep = step.step
        }
        console.log('done')
    }



}