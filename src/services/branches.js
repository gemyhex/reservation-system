import api from './api'

const safeParse = (data, fallback) => {
    try {
        return JSON.parse(JSON.stringify(data)) || fallback
    } catch {
        return fallback
    }
}

export default {
    async getBranches() {
        try {
            const response = await api.get('/branches', {
                params: {
                    include: ['sections', 'sections.tables']
                }
            })
            return safeParse(response?.data?.data, [])
        } catch (error) {
            return []
        }
    },

    async updateBranch(id, payload) {
        try {
            const response = await api.put(`/branches/${id}`, payload)
            return safeParse(response?.data?.data, null)
        } catch (error) {
            throw new Error('Failed to update branch')
        }
    }
}