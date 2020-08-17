<template>
	<transition name="fade">
		<div class="form_steps" id="js-form-steps">
			<Step
				:step="1"
				title="Выберите направление"
				subtitle="Пожалуйста, выберите направление, которому хотели бы обучаться"
				v-if="currentStep === 1"
			>
				<Step1 @nextStep="goToNextStep" @prevStep="goToPrevStep" />
			</Step>
			<Step
				:step="2"
				:stepPre="directionName(direction)"
				title="Форма обучения"
				subtitle="Пожалуйста,  укажите возраст и выберите объединения в которых хотели бы обучаться"
				v-if="currentStep === 2"
			>
				<Step2 @nextStep="goToNextStep" @prevStep="goToPrevStep" />
			</Step>
			<Step
				:step="3"
				:stepPre="directionName(direction)"
				title="Выберите объединение"
				subtitle="Пожалуйста, укажите возраст, выберите место обучения и объединения, в которых хотели бы обучаться."
				v-if="currentStep === 3"
			>
				<Step3 @nextStep="goToNextStep" @prevStep="goToPrevStep" @goToDirections="goToDirections" />
			</Step>
			<Step
				:step="4"
				:stepPre="directionName(direction)"
				title="Выберите объединение"
				subtitle="Пожалуйста, укажите возраст, выберите место обучения и объединения, в которых хотели бы обучаться."
				v-if="currentStep === 4"
			>
				<Step4 @nextStep="goToNextStep" @prevStep="goToPrevStep" />
			</Step>
			<Step
				:step="5"
				:disableTitle="true"
				v-if="currentStep === 5"
			>
				<Step5 @nextStep="goToNextStep" @prevStep="goToPrevStep" />
			</Step>
		</div>
	</transition>
</template>

<script>
	import Step from './Steps/Step'
	import Step1 from './Steps/Step1'
	import Step2 from './Steps/Step2'
	import Step3 from './Steps/Step3'
	import Step4 from './Steps/Step4'
	import Step5 from './Steps/Step5'

	export default {
		components: { Step, Step1, Step2, Step3, Step4, Step5 },
		data() {
			return {
				currentStep: 1,
				dataStep: []
			}
		},
		methods: {
			goToNextStep() {
				document.querySelector('#js-form-steps').scrollIntoView({
					block: 'start',
					behavior: 'smooth'
				})

				this.currentStep++
			},
			goToPrevStep() {
				document.querySelector('#js-form-steps').scrollIntoView({
					block: 'start',
					behavior: 'smooth'
				})

				if ( this.currentStep > 1 )
					this.currentStep--
			},
			goToDirections() {
				document.querySelector('#js-form-steps').scrollIntoView({
					block: 'start',
					behavior: 'smooth'
				})

				this.currentStep = 1
			},
			directionName(text) {
				let dir = ''

				switch (text) {
					case 'tech':
						dir = 'Техническая направленность'
						break
					case 'socped':
						dir = 'Социально-педагогическая направленность'
						break
					case 'esenscien':
						dir = 'Естественно-научная направленность'
						break
					case 'physsport':
						dir = 'Физкультурно-спортивная направленность'
						break
					default:
						dir = ''
				}

				return dir
			}
		},
		computed: {
			direction() {
				return this.$store.getters.getDirection
			}
		}
	}
</script>

<style lang="less" scoped>
	.form_steps {
		max-width: calc(100% - 140px);
		width: 795px;
		display: block;
		margin: 0 auto;

		@media screen and (max-width: 798px) {
			max-width: calc(100% - 20px);
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>