<template>
  <div class="container">
    <div class="header">
      <h1>Branch Reservations</h1>
      <div class="header-actions">
        <button @click="openAddBranches">Add Branches</button>
      </div>
    </div>
    <BranchList :branches="activeBranches" :is-loading="isLoading" @edit="openSettings"/>

    <!--    Modals -->
    <AddBranchModal :isOpen="AddBranchDialog" @close="AddBranchDialog = false"/>
    <ReservationSettingsModal :branch="currentBranch" :isOpen="BranchSettingsDialog" @close="BranchSettingsDialog = false" />
  </div>
</template>

<script>
import AddBranchModal from '@/components/shared/AddBranchesModal.vue'
import ReservationSettingsModal from '@/components/shared/ReservationSettingsModal.vue'
import BranchList from '@/components/shared/BranchList'

export default {
  components: {BranchList, AddBranchModal, ReservationSettingsModal},
  computed: {
    activeBranches() {
      return this.$store.getters['branches/activeBranches']
    }
  },
  data() {
    return {
      currentBranch: {},
      isLoading: true,
      AddBranchDialog: false,
      BranchSettingsDialog: false,
    }
  },
  created() {
    this.$store.dispatch('branches/fetchBranches').then(() => this.isLoading = false)
  },
  methods: {
    openAddBranches() {
      this.AddBranchDialog = true
    },
    openSettings(branch) {
      this.currentBranch = branch
      this.BranchSettingsDialog = true
    },

  }
}
</script>