// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#7FA6F1'
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
