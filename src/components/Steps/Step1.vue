<template>
	<div class="direction">
		<div class="direction_list">
			<div 
				class="direction_item direction_item--blue"
				:class="{ active: direction === 'tech' }"
				@click="changeDirection('tech')"
			>
				<img :src="`${publicPath}images/kid1.png`" alt="" class="direction_image">
				<div class="direction_info">
					<p>Техническая направленность</p>
				</div>
			</div>
			<div 
				class="direction_item direction_item--pink"
				:class="{ active: direction === 'socped' }"
				@click="changeDirection('socped')"
			>
				<img :src="`${publicPath}images/kid2.png`" alt="" class="direction_image">
				<div class="direction_info">
					<p>Социально-педагогическая направленность</p>
				</div>
			</div>
			<div 
				class="direction_item direction_item--orange"
				:class="{ active: direction === 'physsport' }"
				@click="changeDirection('physsport')"
			>
				<img :src="`${publicPath}images/kid3.png`" alt="" class="direction_image">
				<div class="direction_info">
					<p>Физкультурно-спортивная направленность</p>
				</div>
			</div>
			<div 
				class="direction_item direction_item--green"
				:class="{ active: direction === 'esenscien' }"
				@click="changeDirection('esenscien')"
			>
				<img :src="`${publicPath}images/kid4.png`" alt="" class="direction_image">
				<div class="direction_info">
					<p>Естественно-научная направленность</p>
				</div>
			</div>
		</div>
		<div class="direction_submit" id="js-direction-submit">
			<p>
				Затрудняетесь с выбором? Воспользуйтесь <a href="#">сервисом интеллектуального подбора объединения</a>
			</p>
			<!-- <div class="direction_submit_controlls">
				<AppButton :types="['outline', 'gray']" disabled>Назад</AppButton>
				<AppButton @click="$emit('nextStep')" :disabled="!direction">Продолжить</AppButton>
			</div> -->
		</div>
	</div>
</template>

<script>
	import AppButton from './../UI/Button'

	export default {
		components: { AppButton },
		data() {
			return {
				direction: null,
				publicPath: process.env.BASE_URL
			}
		},
		methods: {
			changeDirection(direction) {
				this.direction = direction
				this.$store.commit('setDirection', direction)

				this.$emit('nextStep')

				// document.querySelector('#js-direction-submit').scrollIntoView({
				// 	block: 'end',
				// 	behavior: 'smooth'
				// })
			}
		}
	}
</script>

<style lang="less">
	.direction {
		&_list {
			display: flex;
			flex-wrap: wrap;
			align-items: stretch;
			justify-content: space-between;
			margin-bottom: 53px;

			@media screen and (max-width: 798px) { margin-bottom: 0; }
		}

		&_item {
			width: calc(50% - 42px);
			height: 228px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 15px;
			margin-bottom: 27px;
			border-radius: 10px;
			position: relative;
			cursor: pointer;
			transition: all .3s;

			&:hover { transform: scale(1.02); }
			&:active { transform: scale(0.98); }

			&--blue {
				background-color: #0033FF;

				&.active { box-shadow: 0 30px 49px -30px #0033FF; }
			}
			&--pink {
				background-color: #FF006F;

				&.active { box-shadow: 0 30px 49px -30px #FF006F; }
			}
			&--orange {
				background-color: #FFB100;

				&.active { box-shadow: 0 30px 49px -30px #FFB100; }
			}
			&--green {
				background-color: #A4DE00;

				&.active { box-shadow: 0 30px 49px -30px #A4DE00; }
			}

			@media screen and (max-width: 798px) {
				width: 100%;
			}
		}

		&_image {
			height: calc(100% + 10px);
			width: auto;
			position: absolute;
			bottom: 0;
			left: 30px;
		}

		&_info {
			width: 44%;
			z-index: 5;

			p {
				font-family: 'Roboto', sans-serif;
				font-weight: 300;
				font-size: 14px;
				color: white;
			}
		}

		&_submit {
			display: flex;
			align-items: center;
			justify-content: space-between;

			@media screen and (max-width: 798px) {
				flex-direction: column;
				align-items: stretch;
			}

			p {
				font-family: 'Roboto', sans-serif;
				font-size: 14px;
				line-height: 20px;

				a {
					color: #0033FF;
					text-decoration: underline;
					text-decoration-color: #0033FF;
				}
			}

			&_controlls {
				display: flex;

				@media screen and (max-width: 798px) {
					flex-direction: column-reverse;
					align-items: stretch;
				}

				.button {
					flex-shrink: 0;

					&:not(:last-child) {
						margin-right: 20px;

						@media screen and (max-width: 798px) {
							margin-right: 0;
							margin-top: 20px;
						}
					}
				}
			}
		}
	}
</style>