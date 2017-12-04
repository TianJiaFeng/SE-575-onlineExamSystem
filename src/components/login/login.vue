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
                <label>StudentID:</label>
                <input class="form-control" placeholder="please input your studentID" name="studentID" v-model="studentID" type="text" autofocus>
              </div>
              <div align="right">
                <p><a @click="admin()">I am administrator</a></p>
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
      studentID: ''
    }
  },
  methods:{
    submit:function(){
      var vm = this
      if(vm.studentID == ''){
        vm.alertMsg = "Please input your studentID"
        vm.$refs.pretoast.showToast('danger')
        return
      }
      var url = serverConfig.serverApi+'User/verify'
      $.post(url,{studentID:vm.studentID},function(result){
          if(result.code == 0){
            //delete original cookie
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
            if(keys) {  
                for(var i = keys.length; i--;)  
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
            }  
            document.cookie=vm.studentID;  //set cookie
            window.location.href= serverConfig.urlConfig+'remind.html' // http://localhost:8000/remind.html'
          } else {
            vm.alertMsg = result.msg
            vm.$refs.pretoast.showToast('danger')
          }
      })
    },
    admin: function() {
      window.location.href= serverConfig.urlConfig+'administrator.html' // http://localhost:8000/administrator.html'
    }
  },
  created: function(){
    var vm = this
  },
}
</script>
