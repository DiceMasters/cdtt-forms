<template>
	<div class="badge" :class="buildedTypes">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			types: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		computed: {
			buildedTypes() {
				return this.types.map( val => `badge_${val}`)
			}
		}
	}
</script>

<style lang="less">
	.badge {
		height: 28px;
		display: flex;
		align-items: center;
		background-color: #0033FF;
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
		color: white;
		text-align: center;
		padding: 0 20px;
		border-radius: 30px;

		&_gray {
			background-color: #F2F2F2;
			color: black;
		}
	}
</style>