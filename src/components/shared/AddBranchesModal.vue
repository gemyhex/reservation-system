<template>
  <AppModal :isOpen="isOpen" @close="close">
    <template #header>
      <h2 class="modal-title">Enable Reservations</h2>
    </template>

    <template #body>
      <div class="search-box">
        <input
            v-model.trim="searchQuery"
            placeholder="Search branches..."
            class="search-input"
            aria-label="Search branches"
        />
      </div>

      <div v-if="isLoading" class="loading">Loading...</div>

      <div v-else>
        <div v-if="filteredBranches.length" class="branch-grid">
          <div
              v-for="branch in filteredBranches"
              :key="branch.id"
              class="branch-card"
              :class="{ selected: selectedBranches.includes(branch.id) }"
              @click="toggleBranchSelection(branch.id)"
              role="button"
              tabindex="0"
              @keydown.enter="toggleBranchSelection(branch.id)"
          >
            <span class="branch-name">{{ branch.name || 'Unnamed Branch' }}</span>
            <span class="branch-reference">{{ branch.reference || 'No Reference' }}</span>
          </div>
        </div>

        <div v-else class="no-results">
          No branches available for activation
        </div>
      </div>
    </template>

    <template #footer>
      <button @click="close" class="btn btn-cancel">Cancel</button>
      <button
          @click="enableReservations"
          :disabled="!selectedBranches.length || isLoading"
          class="btn btn-save"
      >
        Enable Selected ({{ selectedBranches.length }})
      </button>
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/core/AppModal.vue'
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      selectedBranches: [],
      isLoading: false,
    };
  },
  components: {
    AppModal,
  },
  computed: {
    disabledBranches() {
      return (
          this.$store.getters['branches/inActiveBranches'] || []
      );
    },
    filteredBranches() {
      const query = this.searchQuery?.toLowerCase() || '';
      return this.disabledBranches.filter(
          (b) =>
              b?.name?.toLowerCase()?.includes(query) ||
              b?.reference?.toLowerCase()?.includes(query)
      );
    },
  },
  methods: {
    toggleBranchSelection(branchId) {
      const index = this.selectedBranches.indexOf(branchId);
      if (index === -1) {
        this.selectedBranches.push(branchId);
      } else {
        this.selectedBranches.splice(index, 1);
      }
    },
    async enableReservations() {
      this.isLoading = true;
      try {
        await Promise.all(
            this.selectedBranches.map((id) =>
                this.$store.dispatch('branches/updateBranch', {
                  id,
                  payload: { accepts_reservations: true },
                })
            )
        );
        this.close();
      } catch (error) {
        console.error('Activation failed:', error);
        alert('Failed to enable reservations. Please try again.');
      } finally {
        this.isLoading = false;
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>