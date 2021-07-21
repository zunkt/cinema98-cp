<template>
  <div class="container mx-auto bg-white">
    <div class="block p-3">
      <h1 class="text-xl text-left leading-6">Manager User</h1>
    </div>

    <div class="block p-3 mt-0">
      <form @submit.prevent="onFilter">
        <div class="space-x-4 grid grid-cols-3">
          <div class="flex-1 relative text-gray-600">
            <select
                v-model="filter.field"
                class="min-w-full h-full py-2 text-sm border border-gray-600 focus:outline-none rounded pl-2 text-gray-900"
            >
              <option :value="null" disabled>Please Select Search:</option>
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
    <loading :active="loading"></loading>

    <v-modal :show="showModal" @close="showModal = false">
      <div style="width:400px">
        <div class="p-5 text-center">
          <template v-if="modalType == 'edit'">
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Full Name</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateInfo.full_name"/>
                </td>
              </tr>
              <tr>
                <td class="w-1/3 border border-gray-600 bg-gray-300">Id Number</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateInfo.identityNumber"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Email</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateInfo.email"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Address</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateInfo.address"/>
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
import {defineComponent, onMounted, ref, reactive} from 'vue'
import {useTabulator} from '@/composables'
import cash from "cash-dom";
import axios from "axios";
import Toastify from "toastify-js"

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
          title: 'Email',
          field: 'email',
          width: '15%',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().email)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Full Name',
          field: 'full_name',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                  ${(cell.getData().full_name)}
                </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'identityNumber',
          field: 'identityNumber',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().identityNumber)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'address',
          field: 'address',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().address)}
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
                  Delete User
                </div>`)
            cash(a).on('click', function () {
              openModal('delete', cell.getData().id, cell.getData());
            })

            return a[0]
          }
        }
      ]
      listTabulator.initTabulator('admin/user/all?page=1?size=10', 'users', columns, filter)
      listTabulator.reInitOnResizeWindow()
    })

    const loading = ref(false)
    const option = ref([
      {key: 'id', value: 'id'},
      {key: 'email', value: 'email'}
    ])
    const deleteId = ref('')
    const modalType = ref('')
    const showModal = ref(false)

    const filter = reactive({
      field: null,
      type: 'like',
      value: '',
      submitted: false
    })

    const tableRef = ref()
    const tabulator = ref()
    const listTabulator = useTabulator(tabulator, tableRef)

    const state = reactive({
      user: {},
      updateInfo: {
        id: '',
        email: '',
        full_name: '',
        identityNumber: '',
        address: '',
      },
    })

    const openModal = (type, id, item) => {
      if (type == 'edit') {
        state.updateInfo = {...item}
      }
      if (type == 'delete') {
        deleteId.value = id
        submitDelete()
      }

      modalType.value = type

      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    // Delete
    const submitDelete = () => {
      loading.value = true
      axios.post(`admin/user/delete/${deleteId.value}`)
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

    const submitModal = (type) => {
      loading.value = true
      if (type === 'edit') {
        const form = {...state.updateInfo}
        const id = form.id
        axios.post(`admin/user/update/${id}`, form)
            .then((res) => {
              if (res.status === 200) {
                const data = res.data.data.user
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

    // Filter function
    const onFilter = () => {
      filter.submitted = true
      tabulator.value.setFilter(filter.field, filter.type, filter.value)
    }

    return {
      submitModal,
      openModal,
      option,
      loading,
      tableRef,
      filter,
      onFilter,
      modalType,
      showModal,
      state
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
