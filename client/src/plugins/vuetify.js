import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#212123',
        secondary: '#1a1a1c',
        accent: '#597ef1',
        error: '#c94e4e',
        info: '#77cea3',
        success: '#77cea3',
        warning: '#f2c44c',
        text: '#878789'
      },
    },
  },
})
