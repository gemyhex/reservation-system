<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <h1>Restaurant Reservation System</h1>
      </div>
      <button
          v-if="activeBranches.length"
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
    methods: {
      async disableAllReservations() {
        try {
          await Promise.all(this.activeBranches.map(branch =>
              this.$store.dispatch('branches/updateBranch', {
                id: branch.id,
                payload: {accepts_reservations: false}
              })
          ))
        } catch (error) {
          alert('Failed to disable reservations')
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