<template>
	<div>
		<div>
			<q-select
				v-if="scenes"
				v-model="selectedScene"
				float-label="Existing Scenes"
				:options="scenes"
			/>
		</div>
		<div>
			<q-input type="text" v-model="scene" stack-label="Scene Name" />
			<q-btn icon="save" color="primary">Save</q-btn>
		</div>
		<q-input type="number" :min="1" :max="100" v-model="pixels" stack-label="Amount of Pixels" />
		<q-input type="number" :min="1" :max="50" v-model="fps" stack-label="Frames per second" />
		<q-input type="number" :min="1" :max="100" v-model="dim" stack-label="Dim" />
		<step :pixels="activeSequence" display :amount="pixels"></step>
		<div :key="index" v-for="(sequence, index) in sequences.frames">
			<step @remove="remove($event)" @clone="clone($event)" :index="index" :pixels="sequence" :amount="pixels"></step>
		</div>
		<q-card @click="addSequence" class="relative-position" v-ripple>
			<q-card-main class="row justify-center">
				<q-icon round name="note_add" size="2em" color="primary"></q-icon>
			</q-card-main>
		</q-card>
	</div>
</template>

<script>
import Axios from 'axios'
import extend from 'extend'
import Sequence from '../classes/sequence'
import Pixel from '../classes/pixel'

const BASEURL = 'http://192.168.255.52:8090'

const axios = Axios.create({
	baseURL: BASEURL
})

export default {
	data () {
		return {
			pixels: 15,
			fps: 1,
			dim: 100,
			sequences: {},
			activeSequence: {},
			activeFrame: 0,
			scenes: null,
			scene: null,
			selectedScene: null,
		}
	},
	watch: {
		sequences: {
			handler() {
				axios.post('/api/pixels', this.sequences)
			},
			deep: true
		},
		pixels() {
			this.sequences.size = this.pixels
		}
	},
	async created() {
		const { data: { scenes } } = await axios.get('/api/scenes')
		this.scenes = scenes
		this.sequences = new Sequence()
		this.renderSequence()
	},
	methods: {
		addSequence() {
			this.sequences.add(1, this.pixels)
		},
		getCurrentSequence(activeSequence) {
			let dimMultiplier = this.dim / 100
			activeSequence = extend(true, {}, activeSequence)
			activeSequence.pixels = activeSequence.pixels.map(pixel => {
				return new Pixel(
					parseInt(pixel.r * dimMultiplier),
					parseInt(pixel.g * dimMultiplier),
					parseInt(pixel.b * dimMultiplier),
				)
			})
			return activeSequence
		},
		renderSequence() {
			this.activeSequence = this.getCurrentSequence(this.sequences.frames[this.activeFrame % this.sequences.frames.length])

			this.activeFrame++
			setTimeout(this.renderSequence, 1000 / parseInt(this.fps))
		},
		remove(index) {
			this.sequences.remove(index)
		},
		clone(index) {
			this.sequences.frames.splice(index, 0, JSON.parse(JSON.stringify(this.sequences.frames[index])))
		}
	}
}
</script>

<style>
</style>
