<template>
  <div class="flex">
    <div
        class="fixed translate-x-0 ease-out z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <svg
              class="h-12 w-12"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                fill="#4C51BF"
                stroke="#4C51BF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                fill="white"
            />
          </svg>

          <span class="text-white text-2xl mx-2 font-semibold"
          >Cinema 98 - CP</span
          >
        </div>
      </div>

      <nav class="mt-4">
        <template v-for="(menu, menuKey) in formattedMenu">
          <li
              v-if="menu == 'devider'"
              :key="menu + menuKey"
              class="side-nav__devider my-6"
          ></li>
          <li v-else :key="menu + menuKey">
            <SideMenuTooltip
                tag="a"
                :content="$t(menu.title)"
                href="javascript:;"
                class="flex items-center side-menu duration-200 border-l-4"
                :class="{
                  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100': menu.active,
                  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100': !menu.active,
                  'side-menu--open': menu.activeDropdown,
                }"
                @click="linkTo(menu, router)"
            >
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  <span class="mx-4">{{ $t(menu.title) }}</span>
                </div>
            </SideMenuTooltip>
          </li>
        </template>
      </nav>
    </div>
  </div>
</template>

<script lang="js">
import { useI18n } from 'vue-i18n'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { helper as $h } from '@/utils/helper'
import { linkTo, nestedMenu, enter, leave } from './index'
import cash from "cash-dom";
import SideMenuTooltip from '@/components/side-menu-tooltip/Main.vue'

export default defineComponent({
  components: {
    SideMenuTooltip
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const formattedMenu = ref([])
    const sideMenu = computed(() =>
        nestedMenu(store.state.sideMenu.menu, route)
    )
    watch(
        computed(() => route.path),
        () => {
          console.log(1,sideMenu.value)
          formattedMenu.value = $h.toRaw(sideMenu.value)
        }
    )

    onMounted(() => {
      cash('body')
          .removeClass('error-page')
          .removeClass('login')
          .addClass('main')
      formattedMenu.value = $h.toRaw(sideMenu.value)
    })
    console.log(formattedMenu)
    return {
      t,
      formattedMenu,
      router,
      linkTo,
      enter,
      leave
    }
  }
})
</script>









<!--import { defineComponent, ref } from "vue";-->
<!--import { useSidebar } from "@/hooks/useSidebar";-->
<!--export default defineComponent({-->
<!--setup() {-->
<!--const { isOpen } = useSidebar();-->
<!--const activeClass = ref(-->
<!--"bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"-->
<!--);-->
<!--const inactiveClass = ref(-->
<!--"border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"-->
<!--);-->

<!--return {-->
<!--isOpen,-->
<!--activeClass,-->
<!--inactiveClass,-->
<!--};-->
<!--},-->
<!--});-->
