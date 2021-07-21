<template>
  <Transition name="fade">
    <div
        v-if="show"
        class="custom-modal fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
        @click.self="close"
    >
      <div class="modal__content relative max-w-2xl bg-white shadow-lg rounded-lg p-1">
        <slot/>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: {
      required: true,
      type: Boolean
    }
  },
  emits: ['close'],
  watch: {
    show(value) {
      if (value) {
        document.querySelector('body').style.paddingRight = '49px'
        document.querySelector('body').style.overflow = 'hidden'
      } else {
        document.querySelector('body').style.overflow = null
        document.querySelector('body').style.paddingRight = null
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.custom-modal {
  background: rgba(0, 0, 0, .5019607843137255);
  transition: visibility 0s linear .2s, opacity .2s 0s;
  height: 100vh;
  position: fixed;
  width: 100vw;
  z-index: 102;
}

.fade-enter-active,
.fade-leave-active {
  transition: visibility 0s linear 0s, opacity .2s 0s;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
