<template>
  <div class="flex justify-center items-center h-screen bg-gray-200 px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-gray-700 text-sm">Email</span>
          <input
              type="email"
              class="mt-1 block w-full rounded-md focus:border-indigo-600"
              v-model="email"
          />
        </label>

        <label class="block mt-3">
          <span class="text-gray-700 text-sm">Password</span>
          <input
              type="password"
              class="mt-1 block w-full rounded-md focus:border-indigo-600"
              v-model="password"
              @keyup.enter="onSubmit"
          />
          <p class="invalid-msg text-red-500" v-if="err">{{ err }}</p>
        </label>

        <div class="mt-6">
          <button
              type="submit"
              class="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500"
              @click="onSubmit"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="js">
import {defineComponent, onMounted, reactive, watch, ref} from "vue";
import {useRouter} from "vue-router";
import { useStore } from '@/store'
import {login} from '@/helpers/auth'
import validateFormLogin from '@/validations/login'
import cash from "cash-dom";

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const err = ref('')
    const loading = ref(false)

    const form = reactive({
      email: '',
      password: ''
    })
    console.log(store.state.auth.isLoggedIn)
    const ruleLogin = validateFormLogin(form)
    const handleSubmit = ruleLogin.handleSubmit

    watch([ruleLogin.email, ruleLogin.password], () => {
      err.value = ''
    })

    onMounted(() => {
      // Redirect if logged
      setTimeout(() => {
        if (store.state.auth.isLoggedIn) {
          router.push("/");
        }
      }, 1000);

      cash("body")
          .removeClass("app")
          .removeClass("error-page")
          .addClass("login");
    });

    // Handler function submit form
    const onSubmit = handleSubmit((formData) => {
      err.value = ''
      loading.value = true
      login(formData)
          .then((res) => {
            store.dispatch('auth/loginSuccess', res)
            router.push('/dashboard')
            console.log(store.state.auth.isLoggedIn)
            loading.value = false
          })
          .catch((error) => {
            loading.value = false
              err.value = error.message
          })
    })

    return {
      ...ruleLogin,
      onSubmit,
      loading,
      err
    };
  },
});
</script>
