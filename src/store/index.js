import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		direction: null,
		payForm: null,
		unions: [],
		formData: null,
		age: null,
	},
	getters: {
		getDirection(state) { return state.direction },
		getPayForm(state) { return state.payForm },
		getUnions(state) { return state.unions },
		getFormData(state) { return state.formData },
		getAge(state) { return state.age }
	},
	mutations: {
		setDirection(state, direction) { state.direction = direction },
		setUnions(state, unions) { state.unions = unions },
		setPayForm(state, payForm) { state.payForm = payForm },
		setFormData(state, formData) { state.formData = formData },
		setAge(state, age) { state.age = age }
	},
	actions: {
	},
	modules: {
	}
})
