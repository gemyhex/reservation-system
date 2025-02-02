<template>
  <div>
    <div v-if="isLoading" class="loading">
      Loading branches...
    </div>

    <div v-else-if="branches.length === 0" class="no-data-message">
      No branches available.
    </div>

    <table v-else class="demo-table">
      <thead>
      <tr>
        <th>Branch Name</th>
        <th>Reference</th>
        <th>Tables</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="branch in branches" :key="branch.id">
        <td>{{ branch.name }}</td>
        <td>{{ branch.reference }}</td>
        <td>{{ reservableTablesCount(branch) }}</td>
        <td>{{ branch.reservation_duration }} mins</td>
        <td>
          <button @click="$emit('edit', branch)">Settings</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    branches: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    reservableTablesCount(branch) {
      return (branch?.sections || []).reduce((count, section) => {
        return count + (section?.tables || []).filter(t =>
            t?.accepts_reservations
        ).length
      }, 0)
    }
  }
}
</script>