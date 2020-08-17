<template>
	<div class="title">
		<div class="title_main">
			<span><slot></slot></span>
			<div class="title_step">
				<div class="title_step_pre" v-if="stepPre">
					<p>{{ stepPre }}</p>
				</div>
				<div class="title_step_number">
					<strong>{{ step }}</strong>/{{ maxStep }}
				</div>
			</div>
		</div>
		<div class="title_subtitle">
			{{ subTitle }}
		</div>
		<div class="title_direction">
			<p>{{ stepPre }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			step: Number,
			stepPre: null,
			maxStep: Number,
			subTitle: String
		}
	}
</script>

<style lang="less">
	.title {
		margin-bottom: 20px;

		&_main {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			padding-bottom: 11px;
			border-bottom: 1px solid #E2E2E2;
			margin-bottom: 20px;

			@media screen and (max-width: 798px) { border-bottom: 5px solid #FFCC00; }

			span {
				display: inline-block;
				font-family: 'Roboto', sans-serif;
				font-weight: 300;
				font-size: 30px;
				position: relative;

				&:before {
					content: '';
					width: 100%;
					height: 5px;
					background-color: #FFCC00;
					position: absolute;
					bottom: -12px;
					left: 0;

					@media screen and (max-width: 798px) { content: unset; }
				}
			}
		}

		&_step {
			display: flex;
			align-items: center;
			font-family: 'Roboto', sans-serif;
			font-weight: 300;
			font-size: 30px;
			transform: translateY(10px);

			strong {
				font-weight: 300;
				font-size: 45px;
			}

			&_pre {
				margin-right: 44px;

				@media screen and (max-width: 798px) { display: none; }

				p { font-size: 14px; }
			}
		}

		&_subtitle {
			font-family: 'Roboto', sans-serif;
			font-weight: 300;
			font-size: 14px;
		}

		&_direction {
			display: none;
			font-family: 'Roboto', sans-serif;

			@media screen and (max-width: 798px) {
				display: block;
				margin-top: 20px;
			}

			p { font-size: 14px; }
		}
	}
</style>