<template>
	<div class="counter">
		<span v-if="span">{{ span }}</span>
		<div class="counter_body">
			<button class="counter_controll" @click="minus">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2">
					<g transform="translate(-5 -11)">
						<path d="M19,13H5V11H19Z" fill="#03f"/>
					</g>
				</svg>
			</button>
			<div class="counter_input">
				<input type="text" v-model="inputText" disabled>
			</div>
			<button class="counter_controll" @click="plus">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
					<g transform="translate(-5 -5)">
						<path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" fill="#03f"/>
					</g>
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			span: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				count: 6
			}
		},
		methods: {
			minus() {
				if ( this.count > 6 )
					this.count--

				this.$emit('input', this.count)
			},
			plus() {
				this.count++
				this.$emit('input', this.count)
			}
		},
		computed: {
			inputText() {
				return this.count + ' лет'
			}
		},
		mounted() {
			this.$emit('input', this.count)
		}
	}
</script>

<style lang="less">
	.counter {
		display: flex;
		align-items: center;
		font-family: 'Roboto', sans-serif;

		span {
			font-weight: 300;
			font-size: 14px;
			margin-right: 20px;
		}

		&_body {
			display: flex;
			align-items: center;
			flex-shrink: 0;
		}

		&_controll {
			width: 14px;
			height: 14px;
			background-color: transparent;
			display: flex;
			align-items: center;
			flex-shrink: 0;
			padding: 0;
			border: none;
			cursor: pointer;

			&:first-child { margin-right: 10px; }
			&:last-child { margin-left: 10px; }

			&:focus { outline: none; }
		}

		&_input	{
			flex-shrink: 0;

			input {
				flex-shrink: 0;
				width: 80px;
				height: 28px;
				background-color: #F2F2F2;
				font-size: 14px;
				text-align: center;
				border: none;
				border-radius: 30px;
			}
		}
	}
</style>