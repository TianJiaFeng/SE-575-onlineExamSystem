<template>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title" align="center">Finished</h3>
            </div>
            <div class="panel-body">
              <form role="form">
              <fieldset>
              <div align="center">
                <p><font size="5">Submitted!Thank you for attending this quiz! {{name}}</font></p>
                <p><font size="5">Your grade is {{grade}}.</font></p>
              </div>
              <a class="btn btn-lg btn-success btn-block" @click="confirm">Return to the initial page</a>
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
      studentID: 0,
      grade: '',
      name: '',
    }
  },
  methods:{
    confirm:function(){
      var vm = this
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
      if(keys) {  
          for(var i = keys.length; i--;)  
              document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
      }
      window.location.href='http://localhost:8000/login.html'
    },
  },
  created: function(){
    var vm = this
    var arr = document.cookie.split(";")
    vm.studentID = parseInt(arr[0])
    var url = serverConfig.serverApi+'Grade/getBystudentID'
    $.post(url,{studentID: vm.studentID},function(res){
      if(res.code == 0){
        vm.grade = res.data['percentage']
        vm.name = res.data['name']
      } else {
        vm.alertMsg = "cannot acquire grade"
        vm.$refs.pretoast.showToast('danger')
      }
    })
  },
}
</script>
