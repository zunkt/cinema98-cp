<template>
  <div class="container mx-auto bg-white">
    <div class="block p-3">
      <h1 class="text-xl text-left leading-6">Manager Schedule</h1>
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
          <div class="flex relative justify-end text-gray-600">
            <button
                type="button"
                class="btn w-24 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1"
                @click="openModal('add')"
            >
              Add
            </button>
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
      <div style="height: 600px; width: 500px; overflow-y: scroll;">
        <div class="block overflow-y-auto scrollbar-hidden  p-5 text-center">
          <template v-if="modalType == 'add'">
            <h2>Schedule Add</h2>
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Movie Id</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateSchedule.movie_id"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Date Start</td>
                <td class="border border-gray-600 ">
                  <input type="date" class="input form-control w-full border" v-model="state.updateSchedule.date_start"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Time Start</td>
                <td class="border border-gray-600 ">
                  <input type="datetime-local" id="date-start-add" class="input form-control w-full border" v-model="state.updateSchedule.time_start"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Time End</td>
                <td class="border border-gray-600 ">
                  <input type="datetime-local" id="date-end-add" class="input form-control w-full border" v-model="state.updateSchedule.time_end"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Room Id</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateSchedule.room_id"/>
                </td>
              </tr>
              </tbody>
            </table>
          </template>
          <template v-if="modalType == 'edit'">
            <h2>Schedule Update</h2>
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Name</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.name"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Date Start</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateSchedule.date_start"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Time Start</td>
                <td class="border border-gray-600 ">
                  <input type="datetime-local" id="date-start" class="input form-control w-full border" v-model="state.updateSchedule.time_start"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Time End</td>
                <td class="border border-gray-600 ">
                  <input type="datetime-local" id="date-end" class="input form-control w-full border" v-model="state.updateSchedule.time_end"/>
                </td>
              </tr>
              </tbody>
            </table>
            <h2>Schedule Movie</h2>

            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Name</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.name"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Director</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.director"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Language</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.language"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Actor</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.actor"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Year</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.year"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Long Time</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.long_time"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Rating</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.rating"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Description Content</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.descriptionContent"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Type</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.type"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">ImageText</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.imageText"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Background Image</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.backgroundImage"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">ReleaseDate</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.releaseDate"/>
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
            {{ modalType == 'add' ? 'Add' : 'Update' }}
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
import dayjs from 'dayjs';
import moment from 'moment';
import axios from "axios";
import Toastify from "toastify-js";

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
          title: 'Name Movie',
          field: 'name',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().movie.name)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Time Start',
          field: 'time_start',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                    ${dayjs(cell.getData().time_start).format('HH:mm:ss YYYY-MM-DD')}
                </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Time End',
          field: 'time_end',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                    ${dayjs(cell.getData().time_end).format('HH:mm:ss YYYY-MM-DD')}
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
                  Delete Schedule
                </div>`)
            cash(a).on('click', function () {
              openModal('delete', cell.getData().id, cell.getData());
            })

            return a[0]
          }
        }
      ]
      listTabulator.initTabulator('admin/schedule/all?page=1?size=10', 'schedule', columns, filter)
      listTabulator.reInitOnResizeWindow()
    })

    const modalType = ref('')
    const showModal = ref(false)
    const deleteId = ref('')
    const loading = ref(false)
    const option = ref([
      {key: 'id', value: 'id'},
      {key: 'email', value: 'email'}
    ])

    const filter = reactive({
      field: null,
      type: 'like',
      value: '',
      submitted: false
    })

    const state = reactive({
      user: {},
      updateSchedule: {
        id: '',
        date_start: '',
        time_start: '',
        time_end: '',
        movie_id: '',
        room_id: '',
      },
      updateMovie: {
        id: '',
        name: '',
        image: '',
        director: '',
        language: '',
        actor: '',
        year: '',
        long_time: '',
        rating: '',
        descriptionContent: '',
        type: '',
        imageText: '',
        backgroundImage: '',
        releaseDate: ''
      },
      image_url: '',
      checkImage: 0,
      selectedFile: null
    })

    const tableRef = ref()
    const tabulator = ref()
    const listTabulator = useTabulator(tabulator, tableRef)

    const openModal = (type, id, item) => {
      if (type == 'edit') {
        state.updateSchedule = {...item,
          time_start: moment(new Date(item.time_start)).format('YYYY-MM-DDTHH:mm'),
          time_end: moment(new Date(item.time_end)).format('YYYY-MM-DDTHH:mm'),
          room_id: item.room.id
        }
        console.log(state.updateSchedule)
        state.updateMovie = {...item.movie}

        modalType.value = type
        showModal.value = true
      }
      if (type == 'delete') {
        deleteId.value = id
        submitDelete()
      }

      if (type == 'add') {
        modalType.value = type
        showModal.value = true
      }
    }

    // Delete
    const submitDelete = () => {
      loading.value = true
      axios.post(`admin/schedule/delete/${deleteId.value}`)
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

    const closeModal = () => {
      showModal.value = false
    }

    const submitModal = (type) => {
      loading.value = true
      if (type === 'edit') {
        const form = {
          date_start: state.updateSchedule.time_start,
          time_start: state.updateSchedule.time_start,
          time_end: state.updateSchedule.time_end,
          movie_id: state.updateMovie.id,
          room_id: state.updateSchedule.room_id
        }
        console.log()
        axios.post(`admin/schedule/update/${state.updateSchedule.id}`, form)
            .then((res) => {
              if (res.status === 200) {
                const data = res.data.data.schedule
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
      if (type === 'add') {
        const form = {
          date_start: state.updateSchedule.time_start,
          time_start: state.updateSchedule.time_start,
          time_end: state.updateSchedule.time_end,
          movie_id: state.updateSchedule.movie_id,
          room_id: state.updateSchedule.room_id
        }
        console.log(form);
        axios.post(`admin/schedule/store`, form)
            .then((res) => {
              if (res.status === 200) {
                // const data = res.data.data.movie
                Toastify({
                  text: res.data.message,
                  duration: 3000,
                  newWindow: false,
                  close: true,
                  gravity: "top",
                  position: "right",
                  stopOnFocus: true,
                }).showToast();
                closeModal();
                setTimeout(function () {
                  loading.value = false
                  window.location.reload();
                }, 500)
              }
            })
            .catch(err => {
              loading.value = false
              Toastify({
                text: err.response.data.message,
                duration: 3000,
                newWindow: false,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();
            })
      }
    }

    // Filter function
    const onFilter = () => {
      filter.submitted = true
      tabulator.value.setFilter(filter.field, filter.type, filter.value)
    }

    return {
      openModal,
      showModal,
      state,
      modalType,
      submitModal,
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
