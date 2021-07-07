import * as featherIcons from '@zhuowenli/vue-feather-icons'
import Loading from 'vue-loading-overlay'
import LoadingIcon from './loading-icon/Main.vue'
import Tippy from './tippy/Main.vue'
import TippyContent from './tippy-content/Main.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import Litepicker from './litepicker/Main.vue'

export default app => {
  app.component('Loading', Loading)
  app.component('LoadingIcon', LoadingIcon)
  app.component('Tippy', Tippy)
  app.component('TippyContent', TippyContent)
  app.component('Litepicker', Litepicker)

  for (const [key, icon] of Object.entries(featherIcons)) {
    icon.props.size.default = '24'
    app.component(key, icon)
  }
}
