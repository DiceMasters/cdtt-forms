<template>
	<div class="file">
		<p>Для подтверждения необходимо прикрепить следующие документы:</p>
		<ul>
			<li>Копия паспорта (родителя)</li>
			<li>Копия свидетельства о рождении / паспорта (ребенка)</li>
		</ul>
		<label class="file_target" :for="id" @click="fileEvent">
			<input type="file" :id="id" multiple>
			<strong>Прикрепить</strong> 
			<span :class="{ 'error': error }">{{ fileText }}</span>
		</label>
	</div>
</template>

<script>
	export default {
		props: {
			id: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				fileText: 'файлы до 5 мб. (JPG, BMP, PNG, PDF)',
				error: false
			}
		},
		methods: {
			fileEvent() {
				document.getElementById(this.id).focus()
			}
		},
		mounted() {
			document.getElementById(this.id).addEventListener('change', e => {
				this.error = false

				let mimeTypes = ['image/bmp', 'image/x-windows-bmp', 'image/jpeg', 'image/png', 'application/pdf']
				let targetMimeTypes = []
				let files = e.target.files
				let base64Files = []
				let isMimeTypeValid = false

				for (var i = 0; i < files.length; i++) {
					targetMimeTypes.push(files.item(i).type)
				}

				targetMimeTypes = Array.from( new Set(targetMimeTypes) )

				isMimeTypeValid = mimeTypes.some( val => {
					return targetMimeTypes.some( val2 => val == val2)
				})

				if ( isMimeTypeValid ) {
					if (e.target.value) this.fileText = e.target.value
					base64Files = []

					for (var i = 0; i < files.length; i++) {
						// base64Files.push({
						// 	name: files[i].name,
						// 	blob: new Blob( [files[i]], { type: files[i].type })
						// })
						
						//window.currentBase64FileName = files[i].name
						window.currentFileType = files[i].type

						let reader = new FileReader()
						reader.readAsDataURL(files[i])

						reader.onloadend = function() {
							base64Files.push({
								type: window.currentFileType,
								base64: reader.result
							})
						}

						reader.onerror = function(error) {
							console.log('Error: ', error)
						}
					}

					this.$emit('input', base64Files)

				} else {
					this.error = true
					this.fileText = 'файлы до 5 мб. (JPG, BMP, PNG, PDF)'

					this.$emit('input', null)
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.file {
		font-family: 'Roboto', sans-serif;
		font-weight: 300;

		p {
			font-size: 14px;
			margin: 0;
		}

		ul {
			padding: 0;
			margin: 0;
			padding-left: 16px;
			margin-top: 5px;
			margin-bottom: 12px;

			li { font-size: 12px; }
		}

		&_target {
			padding-left: 28px;
			position: relative;
			cursor: pointer;

			&:before {
				content: '';
				width: 15px;
				height: 15px;
				background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNS4zNTUiIGhlaWdodD0iMTQuMDc2IiB2aWV3Qm94PSIwIDAgMTUuMzU1IDE0LjA3NiI+DQogIDxnIGlkPSJzcXVhcmUtdXBsb2FkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xKSI+DQogICAgPHBhdGggaWQ9ItCa0L7QvdGC0YPRgF80NjQwIiBkYXRhLW5hbWU9ItCa0L7QvdGC0YPRgCA0NjQwIiBkPSJNNiw1LjQ3OSw5LjgzOSwxbDMuODM5LDQuNDc5aC0zLjJ2NS43NThIOS4yVjUuNDc5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIuMTYxKSIgZmlsbD0iIzA1MzZmZiIvPg0KICAgIDxwYXRoIGlkPSLQmtC+0L3RgtGD0YBfNDY0MSIgZGF0YS1uYW1lPSLQmtC+0L3RgtGD0YAgNDY0MSIgZD0iTTE0LjA3NiwxOC44MzlIMS4yOFYxNUgwdjQuNDc5YS42NC42NCwwLDAsMCwuNjQuNjRIMTQuNzE2YS42NC42NCwwLDAsMCwuNjQtLjY0VjE1aC0xLjI4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtNS4wNDMpIiBmaWxsPSIjMDUzNmZmIi8+DQogIDwvZz4NCjwvc3ZnPg0K");
				background-size: contain;
				position: absolute;
				top: 2px;
				left: 0;
			}

			input[type="file"] { display: none; }

			strong {
				display: inline-block;
				font-size: 14px;
				font-weight: 300;
				color: #0033FF;
				border-bottom: 1px dashed #0033FF;
			}

			span {
				display: inline-block;
				font-size: 10px;
				font-style: italic;
				color: black;
				margin-left: 20px;

				&.error { color: red; }
			}
		}
	}
</style>