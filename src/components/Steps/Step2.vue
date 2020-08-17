<template>
	<div class="jumbotron_wrapper">
		<div class="jumbotron_list">
			<div class="jumbotron" :class="{ active: eduForm === 'free' }" @click="changeEducation('free')">
				<div class="jumbotron_inner">
					<div class="jumbotron_title">
						<p>Бесплатная форма обучения</p>
					</div>
					<div class="jumbotron_info">
						<p>
							Набор кандидатов для обучения на бюджетной основе осуществляется при условии наличия вакантных мест. Количество бесплатных мест ограничено. Каждый обучающийся имеет право подать документы не более, чем в два объединения.
						</p>
					</div>
				</div>
			</div>
			<div class="jumbotron jumbotron_primary" :class="{ active: eduForm === 'pay' }" @click="changeEducation('pay')">
				<div class="jumbotron_inner">
					<div class="jumbotron_title">
						<p>Платная форма обучения</p>
					</div>
					<div class="jumbotron_info">
						<p>
							Позволяет посещать занятия на платно-договорной основе более, чем в двух объединениях. Оплата услуг осуществляется в безналичной форме.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="jumbotron_controlls" id="js-edu-submit">
			<AppButton :types="['outline', 'gray']" @click="$emit('prevStep')">Назад</AppButton>
			<AppButton @click="$emit('nextStep')" :disabled="!eduForm">Продолжить</AppButton>
		</div>
	</div>
</template>

<script>
	import AppButton from './../UI/Button'

	export default {
		components: { AppButton },
		data() {
			return {
				eduForm: null
			}
		},
		methods: {
			changeEducation(form) {
				this.eduForm = form
				this.$store.commit('setPayForm', this.eduForm)

				document.querySelector('#js-edu-submit').scrollIntoView({
					block: 'end',
					behavior: 'smooth'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.jumbotron {
		min-height: 190px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		background-color: #F1F2F7;
		border-radius: 10px;
		font-family: 'Roboto', sans-serif;
		font-weight: 300;
		color: #0033FF;
		transition: all .25s;
		cursor: pointer;

		&:hover {
			box-shadow: 0 30px 49px -32px #C7CADE;
			transform: scale(1.02);
		}
		&:active { transform: scale(0.98); }

		&:not(:last-child) {
			margin-bottom: 35px;

			@media screen and (max-width: 798px) { margin-bottom: 30px; }
		}

		&.active { box-shadow: 0 30px 49px -32px #C7CADE; }

		p { margin: 0; }

		&_wrapper {
			display: flex;
			flex-direction: column;
		}

		&_list {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			margin-bottom: 120px;
		}

		&_inner {
			padding: 43px 41px;
		}

		&_title {
			margin-bottom: 10px;

			p { font-size: 30px; }
		}

		&_info {
			p { font-size: 14px; }
		}

		&_primary {
			background-color: #0033FF;
			color: white;
			
			&:hover, &.active { box-shadow: 0 30px 49px -32px #0033FF; }
		}

		&_controlls {
			display: flex;
			justify-content: center;

			.button:not(:last-child) { margin-right: 20px; }
		}
	}
</style>