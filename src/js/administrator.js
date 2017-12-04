import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/Administrator'
import administrator from 'components/administrator/administrator'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'administrator',
    component: administrator
  },
})

router.start(main, '#app')