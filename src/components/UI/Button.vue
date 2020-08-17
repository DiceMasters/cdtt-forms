<template>
	<button class="button" :class="classes" @click="$emit('click')">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'AppButton',
		props: {
			types: {
				type: Array,
				default: () => {
					return []
				}
			},
			
		},
		computed: {
			classes() {
				return this.types.map( val => `button_${val}`)
			}
		}
	}
</script>

<style lang="less" scoped>
	.button {
		min-width: 160px;
		height: 45px;
		background-color: #0033FF;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
		font-style: normal;
		color: white;
		text-align: center;
		padding: 10px 40px;
		border: none;
		border-radius: 40px;
		cursor: pointer;
		transition: all .25s;

		&_outline {
			background-color: transparent;
			border: 1px solid #0033FF;
			color: #0033FF;
		}

		&_lightgray {
			background-color: #F2F2F2;
			color: black;

			&.button_outline {
				background-color: transparent;
				border: 1px solid #F2F2F2;
				color: black;
			}
		}

		&_gray {
			background-color: #B5B5B5;
			color: black;

			&.button_outline {
				background-color: transparent;
				border: 1px solid #B5B5B5;
				color: #B5B5B5;
			}
		}

		&_small {
			min-width: unset;
			height: 28px;
			padding: 0 20px;
		}

		&[disabled] {
			opacity: .75;
			cursor: not-allowed;
		}

		&:hover, &:focus { outline: none }
	}
</style>