<template>
	<div class="union">
		<div class="union_controlls">
			<Counter span="Возраст кандидата:" v-model="age" />
			<div class="union_place">
				<span>Место обучения:</span>
				<AppButton
					:types="['small']"
					:class="{ 'button_lightgray': eduPlace !== 'kolpino' }"
					@click="eduPlace = 'kolpino'"
				>
					Колпино
				</AppButton>
				<AppButton
					:types="['small']"
					:class="{ 'button_lightgray': eduPlace !== 'metal' }"
					@click="eduPlace = 'metal'"
				>
					Металлострой
				</AppButton>
			</div>
		</div>
		<div class="union_list_wrapper">
			<VuePerfectScrollbar class="scroll-area">
				<div class="union_list">
					<div
						class="union_item"
						:class="{
							active: item.active,
							'disabled': !(age <= item.age[1] && age >= item.age[0])
						}"
						v-tooltip="`Для детей от ${item.age[0]} до ${item.age[1]} лет`"
						v-for="(item, index) in filteredUnions"
						:key="index"
						@click="toggleUnion(item, item.id, (age <= item.age[1] && age >= item.age[0]))"
					>
						<p>{{ item.title }}</p>
						<span>{{ item.description }}</span>
					</div>
				</div>
			</VuePerfectScrollbar>
		</div>
		<div class="union_submit">
			<div class="union_tags">
				<p v-if="toggledUnion.length">
					Выбрано ещё одно объединение: 
					<span
						class="union_tags_item"
						v-for="(item, index) in toggledUnion"
						:key="index"
					>{{ item.title }} <strong @click="toggleUnion(item, item.id)">x</strong></span>
				</p>
				<span class="union_tags_item" @click="$emit('goToDirections')">Выбрать объединение из другого направления</span>
			</div>
			<div class="union_submit_controlls">
				<AppButton :types="['outline', 'gray']" @click="$emit('prevStep')">Назад</AppButton>
				<AppButton @click="$emit('nextStep')" :disabled="!toggledUnion.length">Продолжить</AppButton>
			</div>
		</div>
	</div>
</template>

<script>
	import VuePerfectScrollbar from 'vue-perfect-scrollbar'
	import AppButton from './../UI/Button'
	import Counter from './../UI/Counter'

	import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'
	import { unions } from './../../unions.js'

	export default {
		components: { VuePerfectScrollbar, AppButton, Counter },
		data() {
			return {
				age: 0,
				eduPlace: 'kolpino',
				unions: [],
				toggledUnion: []
			}
		},
		methods: {
			toggleUnion(union, id, isAgeValid = true) {
				if (isAgeValid) {
					if ( !this.toggledUnion.some( val => val.title === union.title) ) {
						this.toggledUnion.push(union)
						this.unions.map( val => {
							if ( val.id == id ) val.active = true
							return val
						})
					} else {
						this.toggledUnion = this.toggledUnion.filter( val => val.title !== union.title)
						this.unions.map( val => {
							if ( val.id == id ) val.active = false
							return val
						})
					}

					this.$store.commit('setUnions', this.toggledUnion)
				}
			}
		},
		computed: {
			direction() {
				return this.$store.getters.getDirection
			},
			filteredUnions() {
				return (this.unions) ? this.unions.filter( val => {
					if ( val.spec == this.direction ) return true
				}).sort( (a, b) => {
					if ( Number(!(this.age <= a.age[1] && this.age >= a.age[0])) > Number(!(this.age <= b.age[1] && this.age >= b.age[0]) )) {
						return 1
					} else if ( Number(!(this.age <= a.age[1] && this.age >= a.age[0])) < Number(!(this.age <= b.age[1] && this.age >= b.age[0]) )) {
						return -1
					} else {
						return 0
					}
				}) : []
			}
		},
		mounted() {
			this.unions = unions
		},
		watch: {
			age(val) {
				this.$store.commit('setAge', val)
			}
		}
	}
</script>

<style lang="less">
	.union {
		&_controlls {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 53px;
			margin-bottom: 30px;

			@media screen and (max-width: 870px) {
				flex-direction: column;
				align-items: stretch;
				justify-content: flex-start;
			}
		}

		&_place {
			display: flex;
			align-items: center;
			font-family: 'Roboto', sans-serif;

			@media screen and (max-width: 870px) {
				margin-top: 11px;
			}

			span {
				font-weight: 300;
				font-size: 14px;
				margin-right: 23px;
			}

			.button:not(:last-child) { margin-right: 10px; }
		}

		&_list {
			display: flex;
			flex-direction: column;
			padding-right: 53px;
			padding-left: 10px;
			padding-bottom: 5px;

			&_wrapper {
				width: calc(100% + 10px);
				transform: translateX(-10px);
				margin-bottom: 40px;

				@media screen and (max-width: 870px) {
					width: 100%;
					transform: unset;
				}
			}
		}

		&_item {
			font-family: 'Roboto', sans-serif;
			padding: 14px 0;
			position: relative;
			cursor: pointer;

			&:not(:last-child) { margin-bottom: 10px; }

			p {
				font-size: 18px;
				margin-top: 0;
				margin-bottom: 6px;
			}

			span {
				font-weight: 300;
				font-size: 12px;
			}

			&.active:before {
				content: '';
				width: calc(100% + 20px);
				height: 100%;
				border: 1px solid #0033FF;
				border-radius: 10px;
				position: absolute;
				top: 0;
				left: -10px;
			}

			&.disabled {
				opacity: .5;
				cursor: not-allowed;
			}
		}

		&_submit {
			display: flex;
			justify-content: space-between;

			@media screen and (max-width: 870px) {
				flex-direction: column;
			}

			&_controlls {
				display: flex;

				@media screen and (max-width: 870px) {
					flex-direction: column-reverse;
					margin-top: 35px;
				}

				.button:not(:last-child) {
					margin-right: 20px;

					@media screen and (max-width: 870px) {
						margin-right: 0;
						margin-top: 20px;
					}
				}
			}
		}

		&_tags {
			font-family: 'Roboto', sans-serif;
			font-weight: 300;
			font-size: 14px;

			p { margin: 0; }

			&_item {
				color: #0033FF;
				text-decoration: underline;
				text-decoration-color: #0033FF;
				padding-right: 10px;
				cursor: pointer;

				strong { font-weight: 300; }
			}
		}
	}

	.scroll-area { max-height: 465px; }

	.ps__rail-y {
		width: 10px;
		display: block !important;
		background-color: #F2F2F2 !important;
		border-radius: 6px;
		opacity: 1 !important;

		.ps__thumb-y {
			width: 100%;
			background-color: #0033FF !important;
			right: 0;
		}
	}
</style>