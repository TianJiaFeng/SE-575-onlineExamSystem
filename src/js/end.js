import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/End'
import end from 'components/end/end'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'end',
    component: end
  },
})

router.start(main, '#app')