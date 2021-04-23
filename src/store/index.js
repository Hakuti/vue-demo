import { createStore, createLogger } from 'vuex'
import cms from './modules/cms'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    cms 
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})