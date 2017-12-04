import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/Remind'
import remind from 'components/remind/remind'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'remind',
    component: remind
  },
})

router.start(main, '#app')