<template>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title" align="center">NOTICE</h3>
            </div>
            <div class="panel-body">
              <form role="form">
              <fieldset>
              <div align="center">
                <p><font size="5">You just have 10 minutes to finish this Quiz</font></p>
                <p><font size="5">You have only one chance to take the exam and will not be able to change it after submitting it</font></p>
                <p><font size="5">...(as you want)</font></p>
              </div>
              <a class="btn btn-lg btn-success btn-block" @click="confirm">Confirm</a>
              </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  <alert :autoclose="true" :text="alertMsg" v-ref:pretoast id="pretoast"></alert>
</template>

<script>
import alert from 'components/common/Alert'
import serverConfig from 'assets/js/serverConfig.js'

export default {
  name: 'list',
  components: {
    alert,
    serverConfig,
  },
  data() {
    return {
      alertMsg: '',
    }
  },
  methods:{
    confirm:function(){
      var vm = this
      window.location.href='http://localhost:8000/exam.html'
    },
  },
  created: function(){
    var vm = this
  },
}
</script>
