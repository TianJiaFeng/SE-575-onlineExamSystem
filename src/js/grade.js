import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/Grade'
import grade from 'components/grade/grade'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'grade',
    component: grade
  },
})

router.start(main, '#app')