<template>
	<div id="app">
		<AppButton @click="openModal">Открыть модальное окно</AppButton>
		<Modal :show="showModal" @closeModal="closeModal">
			<FormSteps></FormSteps>
		</Modal>
	</div>
</template>

<script>
	import AppButton from './components/UI/Button'
	import Modal from './components/Modal'
	import FormSteps from './components/FormSteps'

	export default {
		name: 'App',
		components: { AppButton, Modal, FormSteps },
		data() {
			return {
				showModal: false
			}
		},
		methods: {
			openModal() {
				this.showModal = true

				document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
			},
			closeModal() {
				this.showModal = false

				document.getElementsByTagName('body')[0].style.overflowY = 'auto'
			}
		}
	}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

	html, body {
		padding: 0;
		margin: 0;
	}
</style>
