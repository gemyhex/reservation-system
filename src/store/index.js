import Vue from 'vue'
import Vuex from 'vuex'
import branches from './modules/branches'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        branches,
    }
})