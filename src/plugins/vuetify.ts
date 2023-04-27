// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#171717'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'mainTheme',
    themes: {
      mainTheme
    }
  }
})
