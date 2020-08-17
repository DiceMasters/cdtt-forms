<template>
	<div class="form_wrapper">
		<div class="form">
			<div class="form_row" v-if="unions.length">
				<div class="form_title">
					<p>Вы выбрали:</p>
				</div>
				<ul class="form_list">
					<li v-for="(item, index) in unions" :key="index">
						{{ item.title }} ({{ direction(item.spec) }})
					</li>
				</ul>
			</div>
			<div class="form_row">
				<div class="form_title">
					<p>Данные кандидата:</p>
				</div>
				<div class="form_input_group">
					<div class="form_input require">
						<label for="fio"><span>Укажите Ф.И.О кандидата</span></label>
						<input type="text" v-model="fio" id="fio" placeholder="Введите Ф.И.О" required>
					</div>
					<div class="form_input require">
						<label for="borninfo"><span>Свидетельство о рождении / паспорт кандидата</span></label>
						<input type="text" v-model="bornInfo" id="borninfo" placeholder="Введите номер" required>
					</div>
					<div class="form_input require">
						<label for="borndate"><span>Дата рождения кандидата</span></label>
						<input type="text" v-model="bornDate" id="borndate" placeholder="__.__.____" required>
					</div>
					<div class="form_input require">
						<label for="healthlimits"><span>Ограничения по здоровью</span></label>
						<input type="text" v-model="healthLimits" id="healthlimits" placeholder="Укажите ограничения" required>
					</div>
					<div class="form_input require">
						<label for="citizenship"><span>Гражданство</span></label>
						<input type="text" v-model="citizenship" id="citizenship" placeholder="Российская Федерация" required>
					</div>
					<div class="form_input">
						<label for="school"><span>Укажите школу / детский сад, класс или группу</span></label>
						<input type="text" v-model="school" id="school" placeholder="Введите школу и класс кандидата">
					</div>
					<div class="form_input require">
						<label for="reg-address"><span>Адрес регистрации кандидата</span></label>
						<input type="text" v-model="regAddress" id="reg-address" placeholder="Введите адрес регистрации" required>
					</div>
					<div class="form_input">
						<label for="ruk-phone"><span>Контактный телефон классного руководителя</span></label>
						<input type="text" v-model="phone" id="ruk-phone" placeholder="+7 (___) ___-__-__" style="border-color: red">
					</div>
					<div class="form_input require">
						<label for="address"><span>Адрес проживания  кандидата</span></label>
						<input type="text" v-model="liveAddress" id="address" placeholder="Введите адрес проживания" required :disabled="addressMatch">
						<div class="form_input_checkbox">
							<input type="checkbox" v-model="addressMatch" id="address-check" @change="matchLiveAddress">
							<label for="address-check">адрес проживания совпадает с адресом регистрации</label>
						</div>
					</div>
					<div class="form_input">
						<File id="file" v-model="files"/>
					</div>
				</div>
			</div>
			<div class="form_row">
				<div class="form_title">
					<p>Данные о родителях:</p>
				</div>
				<div class="form_input_group">
					<div class="form_input require">
						<label for="parent-fio"><span>Укажите Ф.И.О родителя</span></label>
						<input type="text" v-model="parentFio" id="parent-fio" placeholder="Введите Ф.И.О" required>
					</div>
					<div class="form_input require">
						<label for="parent-email"><span>E-mail для оповещения</span></label>
						<input type="text" v-model="parentEmail" id="parent-email" placeholder="Укажите ваш e-mail" required>
					</div>
					<div class="form_input require">
						<label for="parent-phone"><span>Телефон для связи</span></label>
						<input type="text" v-model="parentPhone" id="parent-phone" placeholder="+7 (___)___-__-__" required>
					</div>
					<div class="form_input require">
						<label for="parent-address"><span>Адрес проживания  родителя</span></label>
						<input type="text" v-model="parentAddress" id="parent-address" placeholder="Введите адрес" required :disabled="parentAddressMatch">
						<div class="form_input_checkbox">
							<input type="checkbox" v-model="parentAddressMatch" id="parent-address-check" @change="matchParentAddress">
							<label for="parent-address-check">адрес проживания совпадает с адресом регистрации кандидата</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="form_submit">
			<div class="form_submit_info">
				<p><sup>*</sup>поля обязательны для заполнения</p>
				<div class="form_input_checkbox">
					<input type="checkbox" v-model="agree" id="agree">
					<label for="agree">Отправляя заявку, я соглашаюсь на <a href="#">обработку персональных данных</a></label>
				</div>
			</div>
			<div class="form_submit_controlls">
				<AppButton :types="['outline', 'gray']" @click="$emit('prevStep')">Назад</AppButton>
				<AppButton @click="goFinish" >Продолжить</AppButton>
			</div>
		</div>
	</div>
</template>

<script>
	import AppButton from './../UI/Button'
	import File from './../UI/File'

	export default {
		components: { AppButton, File },
		data() {
			return {
				fio: '',
				bornInfo: '',
				bornDate: '',
				healthLimits: '',
				citizenship: '',
				school: '',
				regAddress: '',
				phone: '',
				liveAddress: '',
				addressMatch: false,
				files: null,
				parentFio: '',
				parentEmail: '',
				parentPhone: '',
				parentAddress: '',
				parentAddressMatch: false,
				agree: ''
			}
		},
		methods: {
			direction(text) {
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
			},
			goFinish() {
				const formData = {
					fio: {
						title: 'Ф.И.О кандидата',
						val: this.fio
					},
					bornInfo: {
						title: 'Свидетельство о рождении / паспорт кандидата',
						val: this.bornInfo
					},
					bornDate: {
						title: 'Дата рождения кандидата',
						val: this.bornDate
					},
					healthLimits: {
						title: 'Ограничения по здоровью',
						val: this.healthLimits
					},
					citizenship: {
						title: 'Гражданство',
						val: this.citizenship
					},
					school: {
						title: 'Школа / детский сад, класс или группа',
						val: this.school
					},
					regAddress: {
						title: 'Адрес регистрации кандидата',
						val: this.regAddress
					},
					phone: {
						title: 'Контактный телефон классного руководителя',
						val: this.phone
					},
					liveAddress: {
						title: 'Адрес проживания кандидата',
						val: this.liveAddress
					},
					addressMatch: {
						title: 'Адрес проживания совпадает с адресом регистрации',
						val: (this.addressMatch) ? 'Да' : 'Нет'
					},
					files: {
						title: 'Копия паспорта (родителя), Копия свидетельства о рождении / паспорта (ребенка)',
						val: this.files
					},
					parentFio: {
						title: 'Ф.И.О родителя',
						val: this.parentFio
					},
					parentEmail: {
						title: 'E-mail для оповещения',
						val: this.parentEmail
					},
					parentPhone: {
						title: 'Телефон для связи',
						val: this.parentPhone
					},
					parentAddress: {
						title: 'Адрес проживания родителя',
						val: this.parentAddress
					},
					parentAddressMatch: {
						title: 'Адрес проживания совпадает с адресом регистрации кандидата',
						val: (this.parentAddressMatch) ? 'Да' : 'Нет'
					},
					agree: {
						title: 'Соглас(ен/на) на обработку персональных данных',
						val: (this.agree) ? 'Да' : 'Нет'
					},
					age: {
						title: 'Возраст',
						val: this.$store.getters.age
					}
				}

				this.$store.commit('setFormData', formData)
				this.$emit('nextStep')
			},
			matchLiveAddress() {
				if (this.addressMatch) this.liveAddress = this.regAddress
			},
			matchParentAddress() {
				if (this.parentAddressMatch) this.parentAddress = this.regAddress
			}
		},
		computed: {
			isValidForm() {
				let arr = [
					Boolean(this.fio),
					Boolean(this.bornInfo),
					Boolean(this.bornDate),
					Boolean(this.healthLimits),
					Boolean(this.citizenship),
					Boolean(this.regAddress),
					Boolean(this.liveAddress),
					Boolean(this.parentFio),
					Boolean(this.parentEmail),
					Boolean(this.parentPhone),
					Boolean(this.parentAddress),
					Boolean(this.agree)
				]

				arr = Array.from(new Set(arr))

				return (arr.some( val => val === false)) ? true : false
			},
			unions() {
				return this.$store.getters.getUnions
			}
		}
	}
</script>

<style lang="less">
	.form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		font-family: 'Roboto', sans-serif;

		&_row {
			padding-bottom: 5px;
			margin-bottom: 25px;

			&:not(:first-child):not(:last-child) { border-bottom: 1px solid #E2E2E2; }
		}

		&_title {
			margin-bottom: 15px;

			p {
				font-size: 18px;
				margin: 0;
			}
		}

		&_list {
			margin: 0;
			padding-left: 16px;

			li {
				font-weight: 300;
				font-size: 14px;
				line-height: 30px;
			}
		}

		&_input {
			width: 50%;
			display: flex;
			flex-direction: column;
			font-family: 'Roboto', sans-serif;
			font-weight: 300;
			font-size: 14px;
			margin-bottom: 25px;

			@media screen and (max-width: 768px) {
				width: 100%;
			}

			label { margin-bottom: 14px; }

			input[type="text"] {
				height: 40px;
				max-width: 277px;
				background-color: #F2F2F2;
				font-family: 'Roboto', sans-serif;
				font-weight: 300;
				font-size: 14px;
				padding: 0 20px;
				border: none;
				border-radius: 25px;

				@media screen and (max-width: 768px) {
					max-width: 100%;
					width: initial;
				}

				&:focus { outline: none; }
			}

			&_group {
				display: flex;
				flex-wrap: wrap;
				align-items: stretch;
				justify-content: space-between;
			}

			&.require {
				label span {
					position: relative;

					&:after {
						content: '*';
						font-size: 14px;
						color: red;
						position: absolute;
						top: -3px;
						right: -8px;
					}
				}
			}

			&_checkbox {
				max-width: 277px;
				display: flex;
				margin-top: 13px;

				input {
					flex-shrink: 0;
					margin-right: 10px;
					cursor: pointer;
				}

				label {
					margin-bottom: 0;
					cursor: pointer;
				}

				a {
					&, &:hover, &:focus {
						color: #0033FF;
						text-decoration: underline;
						text-decoration-color: #0033FF;
					}
				}
			}
		}

		&_submit {
			font-family: 'Roboto', sans-serif;
			font-weight: 300;
			font-size: 14px;

			&_info {
				display: flex;
				justify-content: space-between;
				margin-bottom: 42px;

				@media screen and (max-width: 768px) {
					flex-direction: column;
					margin-bottom: 35px;
				}

				p {
					padding: 0;
					margin: 0;

					@media screen and (max-width: 768px) {
						margin-bottom: 10px;
					}

					sup { color: red; }
				}

				.form_input_checkbox {
					max-width: unset;
					margin-top: 3px;
					margin-left: 20px;

					@media screen and (max-width: 768px) { margin-left: 0; }
				}
			}

			&_controlls {
				display: flex;
				justify-content: center;

				@media screen and (max-width: 768px) {
					flex-direction: column-reverse;
					align-items: stretch;
				}

				.button:not(:last-child) {
					margin-right: 20px;

					@media screen and (max-width: 768px) {
						margin-right: 0;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>