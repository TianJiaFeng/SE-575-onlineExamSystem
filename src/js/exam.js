import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/Exam'
import exam from 'components/exam/exam'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'exam',
    component: exam
  },
})

router.start(main, '#app')