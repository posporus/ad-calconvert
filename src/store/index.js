import Vue from 'vue'
import Vuex from 'vuex'

import parseddata from './parseddata'
import tabcontrol from './tabcontrol'
import alert from './alert'

Vue.use(Vuex)

const VuexStore = new Vuex.Store({
    state: {
        errors: {},
    },
    getters: {
        errors(state) {
            return state.errors
        }
    },
    mutations: {
        SET_ERRORS(state, data) {
            state.errors = data;
        }
	},
	actions: {
        setErrors({ commit }, errors) {
            commit("SET_ERRORS", errors);
        }
    },
    modules: {
        parseddata,
        tabcontrol,
        alert,
    }
})

export default VuexStore
