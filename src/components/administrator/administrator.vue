<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title" align="center">Sign in</h3>
            </div>
            <div class="panel-body">
              <form role="form">
              <fieldset>
              <div class="form-group">
                <label>AccountID:</label>
                <input class="form-control" placeholder="please input your accountID" name="accountID" v-model="accountID" type="text" autofocus>
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input class="form-control" placeholder="please input your password" name="password" v-model="password" type="text" autofocus>
              </div>
              <a class="btn btn-lg btn-success btn-block" @click="submit">Sign in</a>
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
      accountID: '',
      password: ''
    }
  },
  methods:{
    submit:function(){
      var vm = this
      if(vm.accountID == '' || vm.password == ''){
        vm.alertMsg = "Please input your accountID and password"
        vm.$refs.pretoast.showToast('danger')
        return
      }
      var url = serverConfig.serverApi+'Administer/verify'
      $.post(url,{accountID:vm.accountID, password:vm.password},function(result){
          if(result.code == 0){
              window.location.href='http://localhost:8000/grade.html'
          } else {
            vm.alertMsg = result.msg
            vm.$refs.pretoast.showToast('danger')
          }
      })
    },
  },
  created: function(){
    var vm = this
  },
}
</script>
