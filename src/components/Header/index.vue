<template>
  <header
      class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button
          @click="isOpen = true"
          class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <button class="flex mx-4 text-gray-600 focus:outline-none">
        <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative">
        <button
            @click="dropdownOpen = !dropdownOpen"
            class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
        >
          <img
              class="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
              alt="Your avatar"
          />
        </button>

        <div
            v-show="dropdownOpen"
            @click="dropdownOpen = false"
            class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
            v-show="dropdownOpen"
            class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
        >
          <a
              @click="logout"
              href=""
              class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
          >
            Log Out
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const dropdownOpen = ref(false);
    const { isOpen } = ref(false);
    const router = useRouter()
    const store = useStore()

    const logout = () => {
      store.commit('auth/logout', false)
      const el = document.querySelector('.dropdown-box-profile')

      if (el != null) {
        if (el.classList.contains('show')) {
          el.classList.remove('show')
        }
      }
      setTimeout(function () {
        router.push('/login')
      }, 500)
    }

    return {
      logout,
      isOpen,
      dropdownOpen,
    };
  },
});
</script>