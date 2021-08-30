<template>
  <div class="container mx-auto bg-white">
    <div class="block p-3">
      <h1 class="text-xl text-left leading-6">Manager Bill</h1>
    </div>

    <div class="block p-3 mt-0">
      <form @submit.prevent="onFilter">
        <div class="space-x-4 grid grid-cols-3">
          <div class="flex-1 relative text-gray-600">
            <select
                v-model="filter.field"
                class="min-w-full h-full py-2 text-sm border border-gray-600 focus:outline-none rounded pl-2 text-gray-900"
            >
              <option :value="null" disabled>Please Select Search: </option>
              <option
                  v-for="(item, index) in option"
                  :key="index"
                  :value="item.key"
              >
                {{ item.value }}
              </option>
            </select>
          </div>
          <div class="flex-1 relative text-gray-600">
            <input
                :disabled="filter.field === null"
                @keyup.enter="onFilter"
                v-model="filter.value"
                type="text"
                name="q"
                class="min-w-full h-full py-2 text-sm border border-gray-600 focus:outline-none rounded pl-2 text-gray-900"
                placeholder="Enter search"
                autocomplete="off"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pl-2">
              <button class="p-1" disabled style="cursor: default">
                <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    class="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>

    <div class="overflow-x-auto scrollbar-hidden px-3">
      <div
          id="tabulator"
          ref="tableRef"
          class="table-report table-report--tabulator"
      ></div>
    </div>
    <loading :active="loading" :z-index="101"></loading>

    <v-modal :show="showModal" @close="showModal = false">
      <div style="width:400px">
        <div class="p-5 text-center">
          <template v-if="modalType == 'edit'">
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Price</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateBill.price"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Status</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border"
                         v-model="state.updateBill.status"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Ticket</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border"
                         style="background-color: lightgrey"
                         onkeydown="return false"
                         v-model="state.updateBill.ticket.name"/>
                </td>
              </tr>
              </tbody>
            </table>
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Name</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border"
                         style="background-color: lightgrey"
                         onkeydown="return false"
                         v-model="state2.updateInfo.name"/>
                </td>
              </tr>
              <tr>
                <td class="w-1/3 border border-gray-600">Schedule</td>
                <td class="border bg-gray border-gray-600">
                  <input class="input form-control w-full border"
                         style="background-color: lightgrey"
                         onkeydown="return false"
                         v-model="state2.updateSchedule.time_start"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">User</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border"
                         style="background-color: lightgrey"
                         onkeydown="return false"
                         v-model="state2.updateUser.full_name"/>
                </td>
              </tr>
              </tbody>
            </table>
          </template>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
              type="button"
              class="btn w-24 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1"
              @click="showModal = false"
          >
            Cancel
          </button>
          <button
              type="button"
              class="btn w-24 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1"
              @click="submitModal(modalType)"
          >
            Update
          </button>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useTabulator } from '@/composables'
import cash from "cash-dom";
import axios from "axios";
import Toastify from "toastify-js";
import dayjs from "dayjs";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      const columns = [
        {
          title: 'Id',
          field: 'id',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().id)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Price',
          field: 'price',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().price)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Status',
          field: 'status',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                  ${(cell.getData().status)}
                </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Ticket',
          field: 'ticket_id',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().ticket.name)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Delete',
          field: 'id',
          resizable: false,
          formatter(cell) {
            const a = cash(`<div class="flex lg:justify-center items-center">
                <button
                  class="text-white right-1 active:bg-gray-600 font-bold w-40 text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none bg-gray-500"
                  type="button""
                >
                  Delete Bill
                </div>`)
            cash(a).on('click', function () {
              openModal('delete', cell.getData().id, cell.getData());
            })

            return a[0]
          }
        }
      ]
      listTabulator.initTabulator('admin/bill/all?page=1?size=10', 'bill', columns, filter)
      listTabulator.reInitOnResizeWindow()
    })

    const loading = ref(false)
    const option = ref([
      { key: 'id', value: 'id' },
      { key: 'email', value: 'email' }
    ])

    const filter = reactive({
      field: null,
      type: 'like',
      value: '',
      submitted: false
    })

    const state = reactive({
      updateBill: {
        id: '',
        price: '',
        status: '',
        ticket_id: '',
        ticket: '',
      }
    })

    const state2 = reactive({
      user: {},
      updateInfo: {
        id: '',
        name  : '',
        schedule_id: '',
        user_id: '',
      },
      updateSchedule: {
        id: '',
        name: '',
        time_start: '',
        time_end: '',
        movie_id: '',
      },
      updateUser: {
        id: '',
        email: '',
        full_name: '',
        identityNumber: '',
        address: '',
      },
    })

    const deleteId = ref('')

    // Open Modal
    const openModal = (type, id, item) => {
      if (type == 'edit') {
        state.updateBill = {...item}

        loading.value = true
        axios.get(`admin/ticket/show/${state.updateBill.ticket_id}`)
            .then((res) => {
              if (res.status === 200) {
                state2.updateInfo = {...res.data.data.ticket,
                  'schedule_id': res.data.data.ticket.schedule.id,
                  'user_id': res.data.data.ticket.user.id
                }

                state2.updateSchedule = {...res.data.data.ticket,
                  'time_start': dayjs(res.data.data.ticket.schedule.time_start).format('YYYY-MM-DD HH:mm:ss')
                }

                state2.updateUser = {...res.data.data.ticket.user}

                loading.value = false
              }
            })

        modalType.value = type

        showModal.value = true
      }
      if (type == 'delete') {
        deleteId.value = id
        submitDelete()
      }
    }

    const modalType = ref('')
    const showModal = ref(false)
    const closeModal = () => {
      showModal.value = false
    }
    const submitModal = (type) => {
      loading.value = true
      if (type === 'edit') {
        if (state.updateBill.status !== 'success' || state.updateBill.status !== "pending" ||  state.updateBill.status !== "booked") {
          Toastify({
            text: "Status not valid. Please check again",
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
          }).showToast();
          loading.value = false
        } else {
          const form = {...state.updateBill}
          const id = form.id
          axios.post(`admin/bill/update/${id}`, form)
              .then((res) => {
                if (res.status === 200) {
                  const data = res.data.data.bill
                  tabulator.value.updateData([data]).then(() => {
                    loading.value = false
                    Toastify({
                      text: res.data.message,
                      duration: 3000,
                      newWindow: false,
                      close: true,
                      gravity: "top",
                      position: "right",
                      stopOnFocus: true,
                    }).showToast();
                    closeModal()
                  })
                }
              })
        }
      }
    }

    // Delete
    const submitDelete = () => {
      loading.value = true
      axios.post(`admin/bill/delete/${deleteId.value}`)
          .then((res) => {
            loading.value = false
            Toastify({
              text: res.data.message,
              duration: 3000,
              newWindow: false,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
            }).showToast();
            tabulator.value.replaceData()
          })
    }



    const tableRef = ref()
    const tabulator = ref()
    const listTabulator = useTabulator(tabulator, tableRef)
    // Filter function
    const onFilter = () => {
      filter.submitted = true
      tabulator.value.setFilter(filter.field, filter.type, filter.value)
    }

    return {
      state2,
      state,
      openModal,
      submitModal,
      showModal,
      modalType,
      option,
      loading,
      tableRef,
      filter,
      onFilter
    }
  }
})
</script>

<style lang="scss">
.tabulator-header {
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity)) !important;
  transition: 0.25s;

  .tabulator-col:hover {
    background-color: rgba(209, 213, 219, var(--tw-bg-opacity)) !important;
  }
}
</style>
