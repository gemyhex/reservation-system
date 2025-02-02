import BranchesService from '@/services/branches'

const initialState = () => ({
    branches: [],
    loading: false,
    error: null
})

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        SET_BRANCHES(state, branches) {
            state.branches = Array.isArray(branches) ? branches : []
        },
        UPDATE_BRANCH(state, branch) {
            if (!branch?.id) return
            const index = state.branches.findIndex(b => b.id === branch.id)
            if (index !== -1) state.branches.splice(index, 1, branch)
        },
        SET_LOADING(state, loading) {
            state.loading = Boolean(loading)
        },
        SET_ERROR(state, error) {
            state.error = error?.message || 'Unknown error'
        },
        RESET(state) {
            Object.assign(state, initialState())
        }
    },
    actions: {
        async fetchBranches({ commit }) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const branches = await BranchesService.getBranches()
                commit('SET_BRANCHES', branches)
            } catch (error) {
                commit('SET_ERROR', error)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async updateBranch({ commit }, { id, payload }) {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const branch = await BranchesService.updateBranch(id, payload)
                if (branch) commit('UPDATE_BRANCH', branch)
                return branch
            } catch (error) {
                commit('SET_ERROR', error)
                throw error
            } finally {
                commit('SET_LOADING', false)
            }
        }
    },
    getters: {
        activeBranches: state =>
            state.branches.filter(b => b?.accepts_reservations === true),
        inActiveBranches: state =>
            state.branches.filter(b => b?.accepts_reservations === false),
        getBranchById: state => id =>
            state.branches.find(b => b?.id === id)
    }
}