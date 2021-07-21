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
          <template v-if="modalType == 'edit'">
            <h2>Schedule Update</h2>
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Name</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateSchedule.name"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Time Star</td>
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
                <td class="w-1/3 border border-gray-600 bg-gray-300">Image</td>
                <td class="border border-gray-600 ">
                  <img
                      v-if="state.image_url !== null && state.checkImage === 0"
                      class="w-auto mx-auto rounded-full object-cover object-center"
                      :src="state.updateMovie.image_url"
                      alt="Image Upload"
                  />
                  <img
                      v-else
                      class="w-auto mx-auto rounded-full object-cover object-center"
                      :src="imageUrl"
                      alt="Image Upload"
                  />
                  <label class="cursor-pointer mt-6">
                    <span class="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full">Select Image</span>
                    <input
                        type='file'
                        class="hidden"
                        name="avatar"
                        id="avatar"
                        @change="updatePreview"
                        style="display: none;"
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Trailer Url</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.trailer_url"/>
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
import {defineComponent, onMounted, ref, reactive, watch} from 'vue'
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
          title: 'Name',
          field: 'name',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().name)}
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
          title: 'Movie',
          field: 'movie_id',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().movie_id)}
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
        name: '',
        time_start: '',
        time_end: '',
        movie_id: '',
      },
      updateMovie: {
        id: '',
        name: '',
        image: '',
        trailer_url: '',
        director: '',
        language: '',
        actor: '',
        year: '',
        long_time: '',
        rating: '',
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
        }

        if (item.movie_id != 0) {
          state.updateMovie = item.movie_id

          axios.get(`admin/movie/show/${state.updateMovie}`)
              .then((res) => {
                if (res.status === 200) {
                  const data = res.data.data.movie
                  if (typeof(data) != undefined) {
                    state.updateMovie = {...data}
                    state.image_url = item.image_url
                  }
                  // console.log(state.updateMovie)
                }
              })
        }
        modalType.value = type
        showModal.value = true
      }
      if (type == 'delete') {
        deleteId.value = id
        submitDelete()
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

        // Update movie
        let data = new FormData;
        data.append('name', state.updateMovie.name)
        if (checkImage == 1)
          data.append('image', state.updateMovie.image)
        data.append('trailer_url', state.updateMovie.trailer_url)
        data.append('director', state.updateMovie.director)
        data.append('language', state.updateMovie.language)
        data.append('actor', state.updateMovie.actor)
        data.append('year', state.updateMovie.year)
        data.append('long_time', state.updateMovie.long_time)
        data.append('rating', state.updateMovie.rating)
        const id = state.updateMovie.id
        axios.post(`admin/movie/update/${id}`, data)
            .then((res) => {
              if (res.status === 200) {
                const data = res.data.data.movie
                console.log(data)
              }
            })
        const form = {...state.updateSchedule,
          movie_id: state.updateMovie.id
        }
        const idSchedule = form.id
        console.log(id)
        axios.post(`admin/schedule/update/${idSchedule}`, form)
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
    }

    // Filter function
    const onFilter = () => {
      filter.submitted = true
      tabulator.value.setFilter(filter.field, filter.type, filter.value)
    }

    // Movie
    const imageFile = ref('')
    const imageUrl = ref('')

    var checkImage;
    function updatePreview(e) {
      if (e.target.files.length === 0) {
        return
      }
      imageFile.value = e.target.files[0]
      state.updateMovie.image = e.target.files[0]
      state.selectedFile = e.target.files[0]
      checkImage = 1;
    }

    watch(imageFile, (imageFile) => {
      const fileReader = new FileReader()

      if (imageFile) {
        fileReader.readAsDataURL(imageFile)
        fileReader.addEventListener('load', () => {
          imageUrl.value = fileReader.result
        })
      }
      state.checkImage = 1
    })

    return {
      imageUrl,
      updatePreview,
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
