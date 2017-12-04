import Vue from 'vue'
import Router from 'vue-router'
import Question from 'src/Question'
import edit from 'components/question/edit'
import content from 'components/question/content'
Vue.use(Router)
var router = new Router()

router.map({
    '/': {
      name: 'content',
      component: content
    },
    '/content': {
      name: 'content',
      component: content
    },
    '/add': {
      name: 'add',
      component: edit
    },
    '/edit/:questionID': {
      name: 'edit',
      component: edit
    },
});
router.start(Question, '#app')