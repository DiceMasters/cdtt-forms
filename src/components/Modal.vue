<template>
	<div class="modal">
		<transition name="fade">
			<div class="modal_bg" v-if="show">
				<div class="modal_wrapper">
					<div class="modal_inner">
						<slot></slot>
						<div class="modal_close" @click="$emit('closeModal')">
							<svg xmlns="http://www.w3.org/2000/svg" width="35.828" height="35.828" viewBox="0 0 35.828 35.828">
								<g id="Сгруппировать_3397" transform="translate(-1297.086 -284.086)">
									<line id="Линия_84" x2="33" y2="33" transform="translate(1298.5 285.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"/>
									<line id="Линия_85" x1="33" y2="33" transform="translate(1298.5 285.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"/>
								</g>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			show: Boolean
		}
	}
</script>

<style lang="less" scoped>
	.modal {
		&_bg {
			width: 100%;
			height: 100vh;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			background-color: rgba(0, 0, 0, .88);
			position: absolute;
			top: 0;
			left: 0;
			overflow-y: auto;
			z-index: 999;
		}

		&_wrapper {
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 75px 0;
		}

		&_inner {
			max-width: calc(100% - 20px);
			display: flex;
			flex-basis: 1140px;
			justify-content: center;
			background-color: white;
			padding: 63px 0 40px 0;
			border-radius: 10px;
			position: relative;
		}

		&_close {
			position: absolute;
			top: 25px;
			right: 20px;
			cursor: pointer;
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>