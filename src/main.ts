import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

document.oncontextmenu = () => false

loadFonts()

const pinia = createPinia()


createApp(App)
.use(vuetify)
.use(pinia)
.mount('#app')

let customVH = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', customVH + 'px')
window.addEventListener('resize', () => {
  let customVH = window.innerHeight * 0.01
  document.documentElement.style.setProperty(
    '--vh',
    customVH + 'px',
  )
})
