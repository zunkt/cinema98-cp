<template>
  <div class="container mx-auto bg-white">
    <div class="block p-3">
      <h1 class="text-xl text-left leading-6">Manager Movie</h1>
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
          <template v-if="modalType == 'edit'">
            <table class="table table--sm">
              <table class="table table--sm">
                <tbody>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Name</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.name"/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Trailer Url</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.trailer_url" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Director</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.director" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Language</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.language" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Actor</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.actor" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Year</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.year" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Long Time</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.long_time" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Rating</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.rating" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Description Content</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.descriptionContent" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Type</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.type" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">ImageText</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.imageText" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">Background Image</td>
                  <td class="border border-gray-600 ">
                    <input class="input form-control w-full border" v-model="state.updateMovie.backgroundImage" required/>
                  </td>
                </tr>
                <tr>
                  <td class="border border-gray-600 bg-gray-300">ReleaseDate</td>
                  <td class="border border-gray-600 ">
                    <input type="date" id="date-start" class="input form-control w-full border" v-model="state.updateMovie.releaseDate" required/>
                  </td>
                </tr>
                </tbody>
              </table>
            </table>
          </template>
          <template v-if="modalType == 'add'">
            <table class="table table--sm">
              <tbody>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Name</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.name"/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Trailer Url</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.trailer_url" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Director</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.director" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Language</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.language" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Actor</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.actor" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Year</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.year" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Long Time</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.long_time" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Rating</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.rating" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Description Content</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.descriptionContent" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Type</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.type" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">ImageText</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.imageText" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">Background Image</td>
                <td class="border border-gray-600 ">
                  <input class="input form-control w-full border" v-model="state.updateMovie.backgroundImage" required/>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-600 bg-gray-300">ReleaseDate</td>
                <td class="border border-gray-600 ">
                  <input type="date" id="date-start" class="input form-control w-full border" v-model="state.updateMovie.releaseDate" required/>
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
// import {defineComponent, onMounted, ref, reactive, watch} from 'vue'
import {defineComponent, onMounted, ref, reactive} from 'vue'
import {useTabulator} from '@/composables'
import cash from "cash-dom";
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
          width: '15%',
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
          title: 'Director',
          field: 'director',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().director)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Language',
          field: 'language',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().language)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Actor',
          field: 'actor',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().actor)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Year',
          field: 'year',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().year)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Long Time',
          field: 'long_time',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().long_time)}
              </div>`
          },
          cellClick: function (e, cell) {
            e.preventDefault()
            e.stopPropagation()
            openModal('edit', cell.getData().id, cell.getData());
          }
        },
        {
          title: 'Rating',
          field: 'rating',
          resizable: false,
          formatter(cell) {
            return `<div class="flex items-center justify-center">
                ${(cell.getData().rating)}
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
                  Delete Movie
                </div>`)
            cash(a).on('click', function () {
              openModal('delete', cell.getData().id, cell.getData());
            })

            return a[0]
          }
        }
      ]
      listTabulator.initTabulator('admin/movie/all?page=1?size=10', 'movie', columns, filter)
      listTabulator.reInitOnResizeWindow()
    })

    const loading = ref(false)
    const modalType = ref('')
    const showModal = ref(false)
    const deleteId = ref('')

    const option = ref([
      {key: 'id', value: 'id'},
      {key: 'name', value: 'name'}
    ])

    const filter = reactive({
      field: null,
      type: 'like',
      value: '',
      submitted: false
    })

    const state = reactive({
      user: {},
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
        state.updateMovie = {...item}
        state.image_url = item.image_url

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
      axios.post(`admin/movie/delete/${deleteId.value}`)
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
        const id = state.updateMovie.id
        axios.post(`admin/movie/update/${id}`, state.updateMovie)
            .then((res) => {
              if (res.status === 200) {
                const data = res.data.data.movie
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
      if (type === 'add') {
        axios.post(`admin/movie/store`, state.updateMovie)
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
              closeModal()
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

    // new Promise((resolve, reject) => {
    //   axios.post(`admin/movie/store`, state.updateMovie)
    //       .then((res) => {
    //         console.log(resolve);
    //         console.log(res);
    //       })
    //       .catch(err => {
    //         console.log(err.response.data);
    //         console.log(reject(err.response.data));
    //         reject(err.response.data)
    //       })
    // })

    // Filter function
    const onFilter = () => {
      filter.submitted = true
      tabulator.value.setFilter(filter.field, filter.type, filter.value)
    }

    // const imageFile = ref('')
    // const imageUrl = ref('')
    // var checkImage;
    // function updatePreview(e) {
    //   if (e.target.files.length === 0) {
    //     return
    //   }
    //   imageFile.value = e.target.files[0]
    //   state.updateMovie.image = e.target.files[0]
    //   state.selectedFile = e.target.files[0]
    //   checkImage = 1;
    // }
    //
    // watch(imageFile, (imageFile) => {
    //   const fileReader = new FileReader()
    //
    //   if (imageFile) {
    //     fileReader.readAsDataURL(imageFile)
    //     fileReader.addEventListener('load', () => {
    //       imageUrl.value = fileReader.result
    //     })
    //   }
    //   state.checkImage = 1
    // })

    // Add Movie

    return {
      showModal,
      state,
      openModal,
      option,
      loading,
      tableRef,
      filter,
      onFilter,
      modalType,
      // updatePreview,
      // imageUrl,
      submitModal
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
