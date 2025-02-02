<template>
  <AppModal :isOpen="isOpen" @close="close">
    <template #header>
      <h2 class="modal-title">{{ branchTitle }}</h2>
    </template>

    <template #body>
      <div class="working-hours-hint">
        Working hours: {{ branch.opening_from }} - {{ branch.opening_to }}
      </div>

      <div class="section available-tables">
        <h3 class="section-title">Tables</h3>
        <div class="tables-dropdown" v-if="tablesList.length">
          <div class="dropdown">
            <div class="dropdown-header" @click="toggleDropdown">
              <span v-if="selectedTables.length === 0">Select Tables</span>
              <div class="tables-container" v-else>
                <div class="table-slot" v-for="table in selectedTableNames" :key="table.id">
                  {{ table }}
                </div>
              </div>
            </div>
            <div v-if="isDropdownOpen" class="dropdown-options">
              <div
                  v-for="table in tablesList"
                  :key="table.id"
                  class="dropdown-option"
                  @click="toggleTableSelection(table.id)"
              >
                <input
                    type="checkbox"
                    :checked="selectedTables.includes(table.id)"
                    class="checkbox"
                />
                <span>{{ table.label }}</span>
              </div>
            </div>
          </div>
        </div>
        <p v-else>No available tables</p>
      </div>

      <div class="section duration-input">
        <h3 class="section-title">Reservation Duration</h3>
        <input
            type="number"
            v-model="reservationDuration"
            placeholder="Enter duration in minutes"
            class="duration-input"
        />
      </div>

      <!-- Time Slots Section -->
      <div class="section time-slots">
        <div v-for="(day, index) in days" :key="day.value" class="day-slots">
          <div class="day-header">
            <h4 class="day-title">{{ day.label }}</h4>
            <button
                v-if="index === 0"
                @click="applyToAll"
                class="btn-apply-all"
            >
              Apply to All Days
            </button>
          </div>
          <div class="slot-container">
            <div class="time-slots_container">
              <div
                  v-for="(slot, index) in timeSlots[day.value]"
                  :key="index"
                  class="time-slot"
              >
                <div class="time-slot-input">
                  <input
                      type="text"
                      v-model="slot[0]"
                      placeholder="00 : 00"
                      class="time-input"
                      @input="formatTimeInput($event, slot, 0)"
                  />
                  <span class="time-separator">-</span>
                  <input
                      type="text"
                      v-model="slot[1]"
                      placeholder="00 : 00"
                      class="time-input"
                      @input="formatTimeInput($event, slot, 1)"
                  />
                </div>
                <button
                    @click="removeSlot(day.value, index)"
                    class="btn-remove"
                >
                  <span class="remove-icon">&times;</span>
                </button>
              </div>
            </div>
            <button
                @click="addSlot(day.value)"
                v-if="timeSlots[day.value].length < 3"
                class="btn-add"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="footer-actions">
        <button @click="disableReservations" :disabled="isLoading" class="btn btn-cancel-reservation">Disable Reservations</button>
        <div class="actions_btns">
          <button @click="close" class="btn btn-cancel">Cancel</button>
          <button
              @click="saveSettings"
              class="btn btn-save"
              :disabled="isLoading"
          >
            {{ isLoading ? 'Saving...' : 'Save Settings' }}
          </button>
        </div>
      </div>
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/core/AppModal.vue';

export default {
  name: 'ReservationSettingsModal',
  components: {
    AppModal,
  },
  props: {
    branch: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        reservation_times: {},
        sections: [],
      }),
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    branch: {
      immediate: true,
      handler() {
        this.days = this.generateDays()
        this.timeSlots = this.normalizeTimeSlots()
        this.selectedTables = this.getInitialSelectedTables()
        this.reservationDuration = this.branch.reservation_duration || 60;

      },
    },
  },
  data() {
    return {
      days: [],
      timeSlots: [],
      selectedTables: [],
      isLoading: false,
      isDropdownOpen: false,
      reservationDuration: 60,
      selectedTable: null,
    };
  },
  computed: {
    branchTitle() {
      return `Settings for ${this.branch?.name || ''}`;
    },
    tablesList() {
      return this.branch.sections?.flatMap((section) =>
          section.tables?.map((table) => ({
            id: table.id,
            label: `${section.name} - ${table.name}`,
          })) || []
      ) || [];
    },
    selectedTableNames() {
      return this.selectedTables.map((tableId) => {
        const table = this.tablesList.find((t) => t.id === tableId);
        return table ? table.label : '';
      });
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleTableSelection(tableId) {
      if (this.selectedTables.includes(tableId)) {
        this.selectedTables = this.selectedTables.filter((id) => id !== tableId);
      } else {
        this.selectedTables.push(tableId);
      }
    },
    generateDays() {
      const WEEK_DAYS = [
        'saturday',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
      ];

      return Object.keys(this.branch.reservation_times || {})
          .sort((a, b) => WEEK_DAYS.indexOf(a) - WEEK_DAYS.indexOf(b))
          .map((day) => ({
            value: day,
            label: day.charAt(0).toUpperCase() + day.slice(1),
          }));
    },
    normalizeTimeSlots() {
      return {...this.branch.reservation_times};
    },
    getInitialSelectedTables() {
      return this.branch.sections?.flatMap((section) =>
          section.tables
              ?.filter((table) => table.accepts_reservations)
              ?.map((table) => table.id) || []
      ) || [];
    },
    formatTimeInput(event, slot, index) {
      let value = event.target.value.replace(/[^0-9]/g, '');
      if (value.length > 4) value = value.substr(0, 4);
      if (value.length > 2) {
        value = value.substr(0, 2) + ' : ' + value.substr(2);
      }
      slot[index] = value;
    },
    addSlot(day) {
      if (this.timeSlots[day].length < 3) {
        this.timeSlots[day].push(['', '']);
      }
    },
    removeSlot(day, index) {
      this.timeSlots[day].splice(index, 1);
    },
    applyToAll() {
      const firstDaySlots = this.timeSlots.saturday;
      if (firstDaySlots.length > 0) {
        for (const day of this.days) {
          if (day.value !== 'saturday') {
            this.timeSlots[day.value] = JSON.parse(JSON.stringify(firstDaySlots));
          }
        }
      }
    },
    async disableReservations() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('branches/updateBranch', {
          id: this.branch.id,
          payload: {
            accepts_reservations: false
          },
        });
        this.close();
      } catch (error) {
        alert('Failed to disable reservations');
      } finally {
        this.isLoading = false;
      }
    },
    async saveSettings() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('branches/updateBranch', {
          id: this.branch.id,
          payload: {
            reservation_times: this.timeSlots,
            tables: this.selectedTables,
            reservation_duration: this.reservationDuration,
          },
        });
        this.close();
      } catch (error) {
        alert('Failed to save settings');
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

<style scoped>
.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.actions_btns {
  display: flex;
  gap: 10px;
}
</style>