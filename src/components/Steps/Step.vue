<template>
	<div class="step">
		<Title :step="step" :maxStep="4" :subTitle="subtitle" :stepPre="stepPre" v-if="!disableTitle">
			{{ title }}
		</Title>
		<slot></slot>
	</div>
</template>

<script>
	import Title from './../UI/Title'

	export default {
		props: {
			step: Number,
			stepPre: null,
			title: String,
			subtitle: String,
			disableTitle: false
		},
		components: { Title }
	}
</script>