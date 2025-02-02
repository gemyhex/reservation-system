<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <h1>Restaurant Reservation System</h1>
      </div>
      <button
          v-if="activeBranches.length"
          :disabled="isLoading"
          @click="disableAllReservations"
          class="disable-all"
      >
        Disable All Reservations
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    activeBranches() {
      return this.$store.getters['branches/activeBranches']
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async disableAllReservations() {
      this.isLoading = true
      try {
        await Promise.all(this.activeBranches.map(branch =>
            this.$store.dispatch('branches/updateBranch', {
              id: branch.id,
              payload: {accepts_reservations: false}
            })
        ))
      } catch (error) {
        alert('Failed to disable reservations')
      } finally {
        this.isLoading = false
      }
    }
  }
};
</script>


<style lang="scss">
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #f5f5f5;
  padding: 0 20px;
}
</style>