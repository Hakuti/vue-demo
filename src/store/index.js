import { createStore, createLogger } from 'vuex'
import cms from './modules/cms';
import menu from './modules/menu';
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    cms, menu
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})