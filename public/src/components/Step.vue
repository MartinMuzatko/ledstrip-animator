<template>
	<q-card>
		<q-card-title v-if="!display">
			Frame {{index}}
			<div slot="right">
				<q-btn @click="$emit('remove', index)" round color="negative" small icon="delete"></q-btn>
				<q-btn @click="$emit('clone', index)" round color="primary" small icon="content_copy"></q-btn>
			</div>
		</q-card-title>
		<q-card-title v-else>
			Preview
		</q-card-title>
		<q-card-main>
			<div class="row">
				<div>
					<template v-if="!display">
						<div>
							<q-btn class="q-ma-sm" icon="skip_previous" @click="pixels.moveLeft()" color="primary">Move left</q-btn>
							<q-btn class="q-ma-sm" icon="skip_next" @click="pixels.moveRight()" color="primary">Move right</q-btn>
						</div>
						<div>
							<q-btn class="q-ma-sm" icon="grain" @click="pixels.randomize()" color="primary">Randomize</q-btn>
							<q-btn class="q-ma-sm" icon="grain" @click="pixels.dither()" color="primary">Dither</q-btn>
							<q-btn class="q-ma-sm" icon="format_color_fill" @click="pixels.fill(color.rgba)" color="primary">Fill Color</q-btn>
						</div>
					</template>
					<div class="row pixels">
						<div
							v-for="(pixel, index) in pixels.pixels"
							@click="setActivePixel($event, index)"
							:key="index"
							:style="getPixelColor(pixel)"
							class="pixel"
							:class="isPixelActiveClass(pixel, index)">
						</div>
					</div>
				</div>
				<div v-if="selectedPixel && !display">
					<color-picker ref="colorpicker" v-model="color"></color-picker>
				</div>
			</div>
			<div v-if="!display">
				<q-input type="number" :min=".1" :max="10" v-model="duration" stack-label="Duration of the effect" />
			</div>
		</q-card-main>
	</q-card>
</template>

<script>
// import Pixel from '../classes/pixel'

export default {
	props: {
		amount: Number,
		pixels: {},
		index: Number,
		display: Boolean,
	},
	data () {
		return {
			duration: 1,
			selectedPixel: false,
			selectedPixelIndexes: [],
			color: {rgba: {r:0,g:0,b:0,a:1}},
		}
	},
	watch: {
		amount() {
			this.pixels.setSize(parseInt(this.amount))
		},
		color() {
			this.selectedPixel = {
				r: this.color.rgba.r,
				g: this.color.rgba.g,
				b: this.color.rgba.b,
			}
			this.selectedPixelIndexes.map(index =>
				this.pixels.set(index, this.selectedPixel)
			)
		},
		duration() {
			this.pixels.duration = parseFloat(this.duration) || 1
		},
	},
	methods: {
		isPixelActiveClass(pixel, index) {
			return {
				'pixel--selected': this.selectedPixelIndexes.includes(index)
			}
		},
		getPixelColor(pixel) {
			return { backgroundColor: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})` }
		},
		setActivePixel(event, index) {
			const pixel = this.pixels.get(index)
			this.selectedPixel = pixel
			if (!event.shiftKey) {
				this.selectedPixelIndexes = [index]
			} else {
				const startIndex = this.selectedPixelIndexes[0]
				const selectionLength = (startIndex > index ? startIndex - index : index - startIndex) + 1
				const directionUp = startIndex > index
				this.selectedPixelIndexes = [
					...this.selectedPixelIndexes[0],
					...Array.from(Array(selectionLength)).map((element, selectIndex) => index + (directionUp ? selectIndex : -selectIndex))
				]
			}
			this.color = {
				rgba: {
					r: pixel.r,
					g: pixel.g,
					b: pixel.b,
					a: 1
				}
			}
		},
	}
}
</script>

<style>

	.pixels {
		box-shadow: 0 0 .25em black;
	}

	.pixel {
		width: 1em;
		height: 1em;
	}

	.pixel--selected {
		position: relative;
		box-shadow: 0 0 .25em black;
		outline: 1px solid white;
	}

</style>
